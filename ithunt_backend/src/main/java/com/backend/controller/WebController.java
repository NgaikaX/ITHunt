package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.common.enums.ResultCodeEnum;
import com.backend.entity.User;
import com.backend.exception.ServiceException;
import com.backend.mapper.UserMapper;
import com.backend.service.EmailService;
import com.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.UUID;

import static com.backend.common.enums.ResultCodeEnum.PARAM_LOST_ERROR;
import static com.backend.common.enums.ResultCodeEnum.USER_NOT_EXIST_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/19 23:26
 */

@RestController
public class WebController {
    @Resource
    UserService userService;

    @Resource
    UserMapper userMapper;

    @Resource
    EmailService emailService;

    @AuthAccess
    @RequestMapping
    public Result hello(String name){
        return Result.success(name);
    }

    @AuthAccess
    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        if (StrUtil.isBlank(user.getEmail()) || StrUtil.isBlank(user.getPassword())) {
            return Result.error(PARAM_LOST_ERROR);
        }
        try {
            user = userService.login(user);
            return Result.success(user);
        } catch (ServiceException e) {
            return Result.error(e.getCode(),e.getMessage());
        }
    }

    @AuthAccess
    @PostMapping("/register")
    public String registerUser(@RequestBody User user, HttpServletRequest request) {
        // send token for verification
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setEnabled(false);
        userService.addUser(user);

        // send verification
        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String verificationUrl = appUrl + "/verify?token=" + token;
        emailService.sendVerificationEmail(user.getEmail(), "Email Verification", "Click the link to verify your email: " + verificationUrl);

        return "Registration successful. Check your email for verification link.";
    }

    @AuthAccess
    @GetMapping("/verify")
    public String verifyUser(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        User user = userMapper.findByVerificationToken(token);
        if (user == null) {
            return "Invalid token.";
        }

        user.setEnabled(true);
        System.out.println("Before Update: " + userMapper.findByVerificationToken(token));
        user.setVerificationToken(""); // clear the verification token
        System.out.println("Updating user with ID: " + user.getId() + " Token: " + user.getVerificationToken());
        userMapper.updateById(user);
        System.out.println("User updated. Verification token set to null." +userMapper.findByVerificationToken(token));

        // turn to other pages
        response.sendRedirect("http://localhost:3000/login");
        return null;
    }

}

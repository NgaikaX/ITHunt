package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.User;
import com.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static com.backend.common.enums.ResultCodeEnum.PARAM_LOST_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/19 23:26
 */

@RestController
public class WebController {
    @Resource
    UserService userService;
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
        user = userService.login(user);

        return Result.success(user);
    }

    @AuthAccess
    @PostMapping("/signup")
    public Result signUp(@RequestBody User user) {
        if (StrUtil.isBlank(user.getEmail()) || StrUtil.isBlank(user.getPassword())) {
            return Result.error(PARAM_LOST_ERROR);
        }
        user = userService.login(user);

        return Result.success(user);
    }

}

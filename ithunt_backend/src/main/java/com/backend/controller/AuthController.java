package com.backend.controller;

import com.backend.mapper.UserMapper;
import com.backend.service.EmailService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/4 22:53
 */

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Resource
    EmailService emailService;

    @Resource
    UserMapper userMapper;

}

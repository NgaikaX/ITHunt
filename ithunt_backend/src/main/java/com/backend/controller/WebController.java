package com.backend.controller;

import com.backend.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/19 23:26
 */

@RestController
public class WebController {
    @RequestMapping
    public Result hello(String name){
        return Result.success(name);
    }
    @GetMapping("/test")
    public Result test(String name){
        return Result.success(name);
    }
}

package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.UserInfo;
import com.backend.service.UserInfoService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 03:23
 */
@RestController
@RequestMapping("/userinfo")
public class UserInfoController {
    @Resource
    UserInfoService userInfoService;

    @PostMapping("/add")
    public Result addUserInfo(@RequestBody UserInfo userInfo){
        userInfoService.saveOrUpdateInfo(userInfo);
        return Result.success();
    }

    @GetMapping("/getStudyPartners")
    public Result getStudyPartners(@RequestParam Integer user_id){
        List<UserInfo> studyPartners = userInfoService.getStudyPartner(user_id);
        return  Result.success(studyPartners);
    }

    @GetMapping("/getUserInfo")
    public Result getUserInfo(@RequestParam Integer user_id){
        UserInfo userInfo = userInfoService.infoExsit(user_id);
        return Result.success(userInfo);
    }
}

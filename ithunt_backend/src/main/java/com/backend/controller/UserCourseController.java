package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.UserCourse;
import com.backend.mapper.UserCourseMapper;
import com.backend.service.UserCourseService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/30 09:52
 */
@RestController
@RequestMapping("/userCourse")
public class UserCourseController {
    @Resource
    UserCourseService userCourseService;
    /**
     * get user course list by user id
     * */
    @AuthAccess
    @GetMapping("/UserCourseList")
    public Result getUserCourse(@RequestParam Integer user_id){
        List<UserCourse> userCourseList = userCourseService.getCoursesByUserId(user_id);
        return Result.success(userCourseList);
    }
    /**
     * get user courseCompletion by user id
     * */
    @AuthAccess
    @GetMapping("/courseCompletion")
    public Result getUserCourseCompletionRate(@RequestParam Integer user_id){
        int completionRate = userCourseService.getCourseCompletionRate(user_id);
        return Result.success(completionRate);
    }
}

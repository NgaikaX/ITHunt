package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.UserQuizResults;
import com.backend.service.UserQuizReusltsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/31 20:01
 */
@RestController
@RequestMapping("/userQuiz")
public class UserQuizResultsController {
    /**
     * get user quiz by user id
     * */

    @Resource
    UserQuizReusltsService userQuizReusltsService;
    @AuthAccess
    @GetMapping("/userQuizList")
    public Result getUserQuizList(@RequestParam Integer user_id){
        List<UserQuizResults> userQuizResults = userQuizReusltsService.getUserQuizResults(user_id);
        return Result.success(userQuizResults);
    }
    /**
     * get user quizCompletion by user id
     * */
    @AuthAccess
    @GetMapping("/quizCompletion")
    public Result getUserQuizCompletionRate(@RequestParam Integer user_id){
        int completionRate = userQuizReusltsService.getQuizCompletionRate(user_id);
        return Result.success(completionRate);
    }
}

package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.UserQuestion;
import com.backend.mapper.QuestionMapper;
import com.backend.service.UserQuestionService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/30 13:55
 */
@RestController
@RequestMapping("/userQuestion")
public class UserQuestionController {
    @Resource
    UserQuestionService userQuestionService;

    @GetMapping("/submitted")
    public Result hasSubmitted(@RequestParam Integer userId, @RequestParam Integer courseId) {
        boolean hasSubmitted = userQuestionService.hasSubmittedQuiz(userId, courseId);
        return Result.success(hasSubmitted);
    }
    /**
     * get user answer/question by user id
     * */
    @GetMapping("/UserQuestionList")
    //TODO:改成result page 回显
    public Result getUserCourse(@RequestParam Integer user_id){
        List<UserQuestion> userQuestionList = userQuestionService.getQuestionByUserId(user_id);
        return Result.success(userQuestionList);
    }
    /**
     * user submit quiz
     * */
    @PostMapping("/submitQuiz")
    public Result submitQuiz(@RequestBody List<UserQuestion> answers) {
        int userId = answers.get(0).getUserId();
        userQuestionService.submitQuizAnswers(userId, answers);
        return Result.success();
    }
}

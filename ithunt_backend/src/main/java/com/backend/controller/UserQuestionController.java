package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.UserQuestion;
import com.backend.entity.UserQuestionResult;
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
     * get user answer/question by user_id and course_id
     * */
    @AuthAccess
    @GetMapping("/getUserQuestionAnswer")
    public Result getUserQuestionAnswer(@RequestParam Integer userId,@RequestParam Integer courseId ){
        List<UserQuestionResult> userQuestionList = userQuestionService.getUserQuestionByCourse(userId,courseId);
        return Result.success(userQuestionList);
    }
    /**
     * user submit quiz
     * */
    @AuthAccess
    @PostMapping("/submitQuiz")
    public Result submitQuiz(@RequestBody List<UserQuestion> answers) {
        int userId = answers.get(0).getUserId();
        userQuestionService.submitQuizAnswers(userId, answers);
        return Result.success();
    }
}

package com.backend.service;

import com.backend.entity.Question;
import com.backend.entity.UserCourse;
import com.backend.entity.UserQuestion;
import com.backend.entity.UserQuestionResult;
import com.backend.mapper.QuestionMapper;
import com.backend.mapper.UserMapper;
import com.backend.mapper.UserQuestionMapper;
import com.backend.mapper.UserQuizResultsMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/30 13:53
 */
@Service
public class UserQuestionService extends ServiceImpl<UserQuestionMapper, UserQuestion> {
    @Resource
    UserQuestionMapper userQuestionMapper;
    @Resource
    QuestionMapper questionMapper;
    @Resource
    UserQuizResultsMapper userQuizResultsMapper;

    public boolean hasSubmittedQuiz(Integer userId, Integer courseId) {
        return userQuestionMapper.hasSubmitted(userId, courseId) > 0;
    }


    public List<UserQuestionResult> getUserQuestionByCourse(Integer userId, Integer courseId){
        //get user Answer by user_id and course_id
        QueryWrapper<UserQuestion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        queryWrapper.eq("course_id", courseId);
        List <UserQuestion> userQuestions = userQuestionMapper.selectList(queryWrapper);

        //create a UserQuestionResult ArrayList
        List<UserQuestionResult> results = new ArrayList<>();

        //set question to the result
        for (UserQuestion uq : userQuestions) {
            Question question = questionMapper.selectById(uq.getQuestionId());
            if (question != null) {
                UserQuestionResult result = new UserQuestionResult(question, uq);
                results.add(result);
            }
        }
        return results;
    }

    public void submitQuizAnswers(int userId, List<UserQuestion> answers) {
        // define if the answer is correct
        int correctAnswers = 0;
        for (UserQuestion answer : answers) {
            Question question = questionMapper.selectById(answer.getQuestionId());
            boolean isCorrect = question.getAnswer().equals(answer.getUserAnswer());
            if (isCorrect) {
                correctAnswers++;
            }
            userQuestionMapper.insertUserQuestion(userId, answer.getCourseId(), answer.getQuestionId(),
                    answer.getUserAnswer(), answer.getCoursename(), answer.getSubmitTime(),
                    (byte) (isCorrect ? 1 : 0));
        }
        // compute the score
        BigDecimal score = BigDecimal.valueOf((correctAnswers / (double) answers.size()) * 100);

        //update data in user_quiz_results
        userQuizResultsMapper.UpdateUserQuizResult(userId, answers.get(0).getCourseId(), score, true,
                answers.get(0).getSubmitTime(), answers.get(0).getCoursename());
    }


}

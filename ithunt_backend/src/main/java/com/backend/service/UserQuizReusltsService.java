package com.backend.service;

import com.backend.entity.UserCourse;
import com.backend.entity.UserQuestion;
import com.backend.entity.UserQuizResults;
import com.backend.mapper.UserQuizResultsMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/31 20:02
 */
@Service
public class UserQuizReusltsService extends ServiceImpl<UserQuizResultsMapper, UserQuizResults> {
    @Resource
    UserQuizResultsMapper userQuizResultsMapper;

    public List<UserQuizResults> getUserQuizResults(Integer userId){
        QueryWrapper<UserQuizResults> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return userQuizResultsMapper.selectList(queryWrapper);
    }

    public int getQuizCompletionRate(Integer userId){
        List<UserQuizResults> userQuizResults= getUserQuizResults(userId);
        long completedQuiz =  userQuizResults.stream().filter(UserQuizResults::isComplete).count();
        int completionRate = 100 * (int)completedQuiz / userQuizResults.size();
        return completionRate;
    }
}

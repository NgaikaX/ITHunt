package com.backend.service;

import com.backend.entity.*;
import com.backend.exception.ServiceException;
import com.backend.mapper.Sl_CourseMapper;
import com.backend.mapper.UserCourseMapper;
import com.backend.mapper.UserMapper;
import com.backend.mapper.UserQuizResultsMapper;
import com.backend.utils.TokenUtils;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/20 15:07
 */

@Service
public class UserService extends ServiceImpl<UserMapper,User> {
    @Resource
    UserMapper userMapper;
    @Resource
    Sl_CourseMapper sl_courseMapper;
    @Resource
    UserCourseMapper userCourseMapper;
    @Resource
    UserQuizResultsMapper userQuizResultsMapper;


    public User selectByEmail(String email) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
        // Query the user information in the database based on email
        return getOne(queryWrapper);
    }

    public User login(User user) {
        User dbUser = selectByEmail(user.getEmail());
        if (dbUser == null) {
            // Throw a custom exception
            throw new ServiceException("Wrong email or password");
        }
        if (!user.getPassword().equals(dbUser.getPassword())) {
            throw new ServiceException("Wrong email or password");
        }
        //create Token
        String token =TokenUtils.createToken(dbUser.getId().toString(),dbUser.getPassword());
        dbUser.setToken(token);
        return dbUser;
    }

    public void addUser(User user) {
        // 保存用户
        userMapper.insert(user);

        // 获取所有课程
        List<Sl_Course> courses = sl_courseMapper.selectList(null);

        // 获取所有有问题的课程
        List<Sl_Course> coursesWithQuestions = sl_courseMapper.selectCoursesWithQuestions();

      // 为每个课程创建用户课程关联
        for (Sl_Course course : courses) {
            UserCourse userCourse = new UserCourse();
            userCourse.setUserId(user.getId());
            userCourse.setCourseId(course.getId());
            userCourse.setCoursename(course.getCoursename());
            userCourse.setComplete(false);
            userCourseMapper.insert(userCourse);
        }

        // 为每个有问题的课程创建用户课程关联
        for (Sl_Course course : coursesWithQuestions) {
            UserQuizResults userQuizResults = new UserQuizResults();
            userQuizResults.setUserId(user.getId());
            userQuizResults.setCourseId(course.getId());
            userQuizResults.setScore(BigDecimal.ZERO);
            userQuizResults.setComplete(false);
            userQuizResults.setSubmitTime(null);
            userQuizResults.setCoursename(course.getCoursename());
            userQuizResultsMapper.insert(userQuizResults);
        }

    }

}

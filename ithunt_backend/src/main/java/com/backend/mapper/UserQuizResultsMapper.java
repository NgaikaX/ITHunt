package com.backend.mapper;

import com.backend.entity.UserQuizResults;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;

public interface UserQuizResultsMapper extends BaseMapper<UserQuizResults> {
    @Insert("INSERT INTO user_quiz_results (user_id, course_id, score, complete, submit_time, coursename) " +
            "VALUES (#{userId}, #{courseId}, #{score}, #{complete}, #{submitTime}, #{coursename}) " +
            "ON DUPLICATE KEY UPDATE " +
            "score = VALUES(score), " +
            "completed = VALUES(complete), " +
            "submit_time = VALUES(submit_time), " +
            "coursename = VALUES(coursename)")
    void UpdateUserQuizResult(@Param("userId") int userId, @Param("courseId") Integer courseId,
                              @Param("score") BigDecimal score, @Param("complete") boolean complete,
                              @Param("submitTime") String submitTime, @Param("coursename") String coursename);
}

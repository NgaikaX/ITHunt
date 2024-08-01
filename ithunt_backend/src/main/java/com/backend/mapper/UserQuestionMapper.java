package com.backend.mapper;

import com.backend.entity.UserQuestion;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.poi.hpsf.Decimal;

import java.math.BigDecimal;


public interface UserQuestionMapper extends BaseMapper<UserQuestion> {
    @Select("SELECT COUNT(*) FROM user_question WHERE user_id = #{userId} AND course_id = #{courseId}")
    int hasSubmitted(@Param("userId") Integer userId, @Param("courseId") Integer courseId);

    @Insert("INSERT INTO user_question (user_id, course_id, question_id, user_answer, coursename, submit_time, correct) " +
            "VALUES (#{userId}, #{courseId}, #{questionId}, #{userAnswer}, #{coursename}, #{submitTime}, #{correct})")
    void insertUserQuestion(@Param("userId") int userId, @Param("courseId") int courseId, @Param("questionId") int questionId,
                            @Param("userAnswer") String userAnswer, @Param("coursename") String coursename,
                            @Param("submitTime") String submitTime, @Param("correct") byte correct);


}

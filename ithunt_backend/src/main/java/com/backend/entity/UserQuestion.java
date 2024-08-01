package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function:user question submission enetity
 * Author: Yijia Xu
 * Date: 2024/7/30 13:50
 */
@Data
@TableName("user_question")
public class UserQuestion {
    @TableId(type= IdType.AUTO)
    private Integer id;
    @TableField("user_id")
    private Integer userId;
    @TableField("course_id")
    private Integer courseId;
    @TableField("question_id")
    private Integer questionId;
    @TableField("user_answer")
    private String userAnswer;
    private byte correct;
    @TableField("submit_time")
    private String submitTime;
    private String coursename;
}

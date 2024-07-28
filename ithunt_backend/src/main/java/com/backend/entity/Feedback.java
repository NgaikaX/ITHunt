package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function: Feedback entity
 * Author: Yijia Xu
 * Date: 2024/7/28 02:07
 */
@Data
@TableName("feedback")
public class Feedback {
    @TableId(type= IdType.AUTO)
    private Integer id;
    private Integer course_id;
    private Integer user_id;
    private String coursename;
    private String username;
    private String feedback;
    private String uploaddate;
}

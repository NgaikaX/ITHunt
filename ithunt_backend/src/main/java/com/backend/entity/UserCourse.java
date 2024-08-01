package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function:User's Course entity
 * Author: Yijia Xu
 * Date: 2024/7/30 08:13
 */
@Data
@TableName("user_course")
public class UserCourse {
    @TableId(type= IdType.AUTO)
    private Integer id;
    @TableField("user_id")
    private Integer userId;
    @TableField("course_id")
    private Integer courseId;
    private String coursename;
    private boolean complete;

    public boolean isComplete() {
        return complete;
    }
}

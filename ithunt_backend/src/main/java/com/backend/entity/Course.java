package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function: Course Entity
 * Author: Yijia Xu
 * Date: 2024/7/26 02:18
 */
@Data
@TableName("course")
public class Course {
    @TableId(type= IdType.AUTO)
    private Integer id;
    private String coursename;
    private String cover;
    private String description;
    private String uploaddate;
}

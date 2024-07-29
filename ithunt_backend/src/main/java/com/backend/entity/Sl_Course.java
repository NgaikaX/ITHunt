package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function:Selflearning course entity
 * Author: Yijia Xu
 * Date: 2024/7/28 18:05
 */
@Data
@TableName("sl_course")
public class Sl_Course {
    @TableId(type= IdType.AUTO)
    private Integer id;
    private String coursename;
    private String cover;
    private String videourl;
    private String description;
    private String uploaddate;
}

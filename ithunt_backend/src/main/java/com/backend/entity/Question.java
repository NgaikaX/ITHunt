package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@TableName(value = "question", autoResultMap = true)
public class Question {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer course_id;
    private String coursename;
    private String type;
    private Integer num;
    private String content;
    private String answer;
    private String uploaddate;

    @TableField(typeHandler = JacksonTypeHandler.class)//使用mybatis解析JSON数据
    private List<String> options;
}

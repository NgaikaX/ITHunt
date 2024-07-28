package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function: glossary entity
 * Author: Yijia Xu
 * Date: 2024/7/28 14:57
 */

@Data
@TableName("glossary")
public class Glossary {
    @TableId(type= IdType.AUTO)
    private Integer id;
    private String vocabulary;
    private String explanation;
    private String uploaddate;
}

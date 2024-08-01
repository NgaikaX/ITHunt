package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 03:19
 */
@Data
@TableName("user_info")
public class UserInfo {
    @TableId(type= IdType.AUTO)
    private Integer id;
    @TableField("user_id")
    private Integer userId;
    private String username;
    private String interest;
    private String language;
    private String contact;
}

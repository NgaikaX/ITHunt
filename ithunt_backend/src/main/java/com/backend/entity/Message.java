package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 11:59
 */
@Data
@TableName("message")
public class Message {
    @TableId(type= IdType.AUTO)
    private Integer id;
    @TableField("sender_id")
    private Integer senderId;
    @TableField("reciever_id")
    private Integer recieverId;
    @TableField("sender_name")
    private String senderName;
    @TableField("senttime")
    private String sentTime;
    @TableField("`read`")
    private boolean read;
    private String contact;
    private String interest;
    private String language;
}

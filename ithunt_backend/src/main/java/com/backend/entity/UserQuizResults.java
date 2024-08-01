package com.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.poi.hpsf.Decimal;

import java.math.BigDecimal;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/31 01:56
 */
@Data
@TableName("user_quiz_results")
public class UserQuizResults {
    @TableId(type= IdType.AUTO)
    private Integer id;
    @TableField("user_id")
    private Integer userId;
    @TableField("course_id")
    private Integer courseId;
    private BigDecimal score;
    private boolean complete;
    @TableField("submit_time")
    private String submitTime;
    private String coursename;

    public boolean isComplete() {
        return complete;
    }
}

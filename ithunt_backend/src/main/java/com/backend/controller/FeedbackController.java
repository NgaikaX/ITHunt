package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Course;
import com.backend.entity.Feedback;
import com.backend.entity.User;
import com.backend.service.FeedbackService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import com.backend.entity.Feedback;

import javax.annotation.Resource;
import java.util.List;

import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/28 02:38
 */
@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    @Resource
    FeedbackService feedbackService;

    /**
     * get course feedback
     * */
    @GetMapping("/courseFeedback/{course_id}")
    public Result getCourseFeedbackList(@PathVariable Integer course_id){
        QueryWrapper<Feedback> queryWrapper = new QueryWrapper<Feedback>().orderByDesc("id");
        queryWrapper.eq("course_id", course_id);
        List<Feedback> feedbackList = feedbackService.list(queryWrapper);
        return Result.success(feedbackList);
    }
    /**
     * get feedback list
     * */
    @GetMapping("/feedbackList")
    public Result getCourseList(@RequestParam(required = false) String coursename, @RequestParam Integer current, @RequestParam Integer pageSize){
        QueryWrapper<Feedback> queryWrapper = new QueryWrapper<Feedback>().orderByDesc("id");
        if (StrUtil.isNotBlank(coursename)) {
            queryWrapper.eq("coursename", coursename);
        }
        Page<Feedback> page = feedbackService.page(new Page<>(current, pageSize), queryWrapper);
        return Result.success(page);
    }

    /**
     * delete feedback
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        feedbackService.removeById(id);
        return Result.success();
    }
    /**
     * Add feedback
     * */
    @AuthAccess
    @PostMapping("/add")
    public Result add(@RequestBody Feedback feedback){
        try {
            feedbackService.save(feedback);
        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }
}

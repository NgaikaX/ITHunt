package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Glossary;
import com.backend.entity.Question;
import com.backend.entity.Sl_Course;
import com.backend.service.QuesitonService;
import com.backend.service.Sl_CourseService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/29 10:37
 */
@RestController
@RequestMapping("/question")
public class QestionController {
    @Resource
    QuesitonService quesitonService;
    @Resource
    Sl_CourseService sl_courseService;
    /**
     * query question List
     * */
    @AuthAccess
    @GetMapping("/questionList")
    public Result getQuestionList(@RequestParam(required = false) String coursename,@RequestParam(required = false) String type, @RequestParam Integer current, @RequestParam Integer pageSize){
        QueryWrapper<Question> queryWrapper = new QueryWrapper<Question>().orderByDesc("id");
        if (StrUtil.isNotBlank(coursename)) {
            queryWrapper.eq("coursename", coursename);
        }
        if (StrUtil.isNotBlank(type)) {
            queryWrapper.eq("type", type);
        }
        Page<Question> page = quesitonService.page(new Page<>(current, pageSize), queryWrapper);
        return Result.success(page);
    }
    /**
     * get question by course_id
     * */
    @AuthAccess
    @GetMapping("/getQuestion/{course_id}")
    public Result getQuestion(@PathVariable Integer course_id) {
        QueryWrapper<Question> queryWrapper = new QueryWrapper<Question>().orderByDesc("id");
        queryWrapper.eq("course_id", course_id);
        List<Question> questionList = quesitonService.list(queryWrapper);

        return Result.success(questionList);
    }
    /**
     * add a new question
     * */
    @AuthAccess
    @PostMapping("/add")
    public Result add(@RequestBody Question question){
        //get course_id
        QueryWrapper<Sl_Course> queryWrapper = new QueryWrapper<Sl_Course>();
        String coursename = question.getCoursename();
        queryWrapper.eq("coursename", coursename);
        Sl_Course sl_course = sl_courseService.getOne(queryWrapper);
        int course_id = sl_course.getId();
        question.setCourse_id(course_id);//set question's course_id

        //get question count
        QueryWrapper<Question> questionQueryWrapper = new QueryWrapper<Question>().eq("course_id", course_id);
        int count = (int)quesitonService.count(questionQueryWrapper);
        question.setNum(count + 1);

        //save question
        try {quesitonService.save(question);

        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }
    /**
     * delete a question
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        quesitonService.removeById(id);
        return Result.success();
    }
    /**
     * get question details by id
     * */
    @GetMapping ("/details/{id}")
    public Result details(@PathVariable Integer id) {
        Question question = quesitonService.getById(id);
        return Result.success(question);
    }

    /**
     * edit question
     * */
    @PutMapping("/update")
    public Result update(@RequestBody Question question){
        quesitonService.updateById(question);
        return Result.success();
    }
}

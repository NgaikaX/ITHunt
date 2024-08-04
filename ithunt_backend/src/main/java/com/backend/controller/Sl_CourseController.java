package com.backend.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Course;
import com.backend.entity.Sl_Course;
import com.backend.service.Sl_CourseService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/28 18:09
 */
@RestController
@RequestMapping("/sl_course")
public class Sl_CourseController {

    @Value("${ip:localhost}")
    String ip;

    @Value("${server.port}")
    String port;

    @Resource
    Sl_CourseService sl_courseService;

    /**
     * query sl_course List
     * */
    @GetMapping("/sl_courseList")
    public Result getSl_CourseList(@RequestParam(required = false) String coursename, @RequestParam Integer current, @RequestParam Integer pageSize){
        QueryWrapper<Sl_Course> queryWrapper = new QueryWrapper<Sl_Course>().orderByDesc("id");
        if (StrUtil.isNotBlank(coursename)) {
            queryWrapper.eq("coursename", coursename);
        }
        Page<Sl_Course> page = sl_courseService.page(new Page<>(current, pageSize), queryWrapper);
        return Result.success(page);
    }
    /**
     * get all self-learning course
     * */

    @GetMapping("/allSl_Course")
    public Result getAllSl_CourseList(){
        List<Sl_Course> sl_courseList = sl_courseService.list(new QueryWrapper<Sl_Course>().orderByDesc("id"));
        return Result.success(sl_courseList);
    }

    /**
     * edit self-learning course
     * */
    @PutMapping("/update")
    public Result edit(@RequestBody Sl_Course sl_course){
        sl_courseService.updateById(sl_course);
        return Result.success();
    }
    /**
     * delete self-learning course
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        sl_courseService.deleteCourse(id);
        return Result.success();
    }

    /**
     * get self-learning course details by id
     * */
    @GetMapping ("/details/{id}")
    public Result details(@PathVariable Integer id) {
        Sl_Course sl_course = sl_courseService.getById(id);
        return Result.success(sl_course);
    }

    /**
     * add a new self-learning course
     * */
    @PostMapping("/add")
    public Result add(@RequestBody Sl_Course sl_course){
        try {
            sl_courseService.addCourse(sl_course);

        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }
    private static final String ROOT_PATH = System.getProperty("user.dir") + File.separator + "files";

}

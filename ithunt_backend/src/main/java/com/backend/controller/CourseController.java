package com.backend.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Course;
import com.backend.entity.Feedback;
import com.backend.entity.User;
import com.backend.service.CourseService;
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

import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/26 01:48
 */
@RestController
@RequestMapping("/course")
public class CourseController {
    @Value("${ip:localhost}")
    String ip;

    @Value("${server.port}")
    String port;

    @Resource
    CourseService courseService;

    /**
     * query course List
     * */
    @GetMapping("/courseList")
        public Result getCourseList(@RequestParam(required = false) String coursename,@RequestParam Integer current,@RequestParam Integer pageSize){
        QueryWrapper<Course> queryWrapper = new QueryWrapper<Course>().orderByDesc("id");
        if (StrUtil.isNotBlank(coursename)) {
            queryWrapper.eq("coursename", coursename);
        }
        //List<Course> courseList = courseService.list(queryWrapper);
        Page<Course> page = courseService.page(new Page<>(current, pageSize), queryWrapper);
        return Result.success(page);
    }
    /**
     * get all course
     * */
    @GetMapping("/allCourse")
    public Result getAllCourseList(){
        List<Course> courseList = courseService.list(new QueryWrapper<Course>().orderByDesc("id"));
        return Result.success(courseList);
    }

    /**
     * edit course
     * */
    @PutMapping("/update")
    public Result edit(@RequestBody Course course){
        courseService.updateById(course);
        return Result.success();
    }

    /**
     * delete course
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        courseService.removeById(id);
        return Result.success();
    }
    /**
     * get course details by id
     * */
    @GetMapping ("/details/{id}")
    public Result details(@PathVariable Integer id) {
        Course course = courseService.getById(id);
        return Result.success(course);
    }
    /**
     * add a new course
     * */
    @PostMapping("/add")
    public Result add(@RequestBody Course course){
        try {courseService.save(course);

        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }

    private static final String ROOT_PATH =  System.getProperty("user.dir") + File.separator + "files";
    /**
     * upload a new cover
     * */
    @PostMapping("/upload")
    public Result upload(@RequestParam("cover") MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();//文件原始名称
        String mainName = FileUtil.mainName(originalFilename);//文件名称 e.g.aaa
        String extName = FileUtil.extName("文件的后缀");//文件后缀 e.g. png
        if(!FileUtil.exist(ROOT_PATH)){//父级文件是否存在
            FileUtil.mkdir(ROOT_PATH);//当前文件的父级目录不存在，就创建
        }
        if(FileUtil.exist(ROOT_PATH + File.separator + originalFilename)){//如果当前目录存在一个重名的文件
            originalFilename = System.currentTimeMillis() + mainName + "."+ extName;
        }

        File saveFile = new File(ROOT_PATH + File.separator + originalFilename);
        file.transferTo(saveFile);
        String url = "http://"+ ip + ":"+ port + "/file/download/" + originalFilename;

        return Result.success(url);//file download link

    }
    /**
     * download a cover
     * */
    @GetMapping("/download/{fileName}")
    public void download(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        String filePath = ROOT_PATH + File.separator + fileName;
        if(!FileUtil.exist(filePath)){
            return;
        }
        byte[] bytes = FileUtil.readBytes(filePath);
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);//字节流数组
        outputStream.flush();//刷新
        outputStream.close();
    }
    /**
     * get course feedback
     * */
    @GetMapping("/feedback")
    public Result getCourseFeedbackList(@PathVariable Integer course_id){
        //List<Feedback> feedbackList = courseService.getById(course_id);
        return Result.success();
    }
}

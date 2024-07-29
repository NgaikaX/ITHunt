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
        sl_courseService.removeById(id);
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
        try {sl_courseService.save(sl_course);

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
    //a way of upload file
    public String uplpadFile(MultipartFile file) throws IOException{
        String originalFilename = file.getOriginalFilename();//文件原始名称
        String mainName = FileUtil.mainName(originalFilename);//文件名称 e.g.aaa
        String extName = FileUtil.extName(originalFilename);//文件后缀 e.g. png
        if(!FileUtil.exist(ROOT_PATH)){//父级文件是否存在
            FileUtil.mkdir(ROOT_PATH);//当前文件的父级目录不存在，就创建
        }
        if(FileUtil.exist(ROOT_PATH + File.separator + originalFilename)){//如果当前目录存在一个重名的文件
            originalFilename = System.currentTimeMillis() + "_" + mainName + "." + extName;
        }
        File saveFile = new File(ROOT_PATH + File.separator + originalFilename);
        file.transferTo(saveFile);
        String url = "http://"+ ip + ":"+ port + "/file/download/" + originalFilename;
        return url;
    }
    /**
     * upload a new cover of self-learning course
     * */
    @AuthAccess
    @PostMapping("/upload")
    public Result upload(@RequestParam("cover") MultipartFile file) throws IOException {
        String url = uplpadFile(file);
        return Result.success(url);//file download link
    }

    /**
     * upload a video of self-learning course
     * */
    @AuthAccess
    @PostMapping("/uploadVideo")
    public Result uploadVideo(@RequestParam("video") MultipartFile file) throws IOException {
        String url = uplpadFile(file);
        return Result.success(url);//file download link
    }

    /**
     * download a file
     * */
    @AuthAccess
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
}

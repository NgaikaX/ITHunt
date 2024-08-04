package com.backend.service;

import cn.hutool.core.util.StrUtil;
import com.backend.entity.Course;
import com.backend.entity.Sl_Course;
import com.backend.mapper.CourseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/26 02:29
 */

@Service
public class CourseService extends ServiceImpl<CourseMapper, Course> {
    @Resource
    CourseMapper courseMapper;

    private static final String ROOT_PATH =  System.getProperty("user.dir") + File.separator + "files";

    public void deleteCourse(Integer id){
        Course course = courseMapper.selectById(id);
        if(course !=null){
            deleteCourseCover(course);
            courseMapper.deleteById(id);
        }

    }

    public void deleteCourseCover(Course course){
        String coverPath = course.getCover();

        // convert url to a file path
        String absoluteCoverPath = ROOT_PATH + File.separator + coverPath.substring(coverPath.lastIndexOf("/") + 1);

        //delete cover
        if (StrUtil.isNotBlank(absoluteCoverPath)) {
            File coverFile = new File(absoluteCoverPath);
            if (coverFile.exists()) {
                coverFile.delete();
            }
        }
    }
}

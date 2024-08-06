package com.backend.service;

import cn.hutool.core.util.StrUtil;
import com.backend.entity.Sl_Course;
import com.backend.entity.User;
import com.backend.entity.UserCourse;
import com.backend.mapper.Sl_CourseMapper;
import com.backend.mapper.UserCourseMapper;
import com.backend.mapper.UserMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/28 18:08
 */
@Service
public class Sl_CourseService extends ServiceImpl<Sl_CourseMapper, Sl_Course> {
    @Resource
    Sl_CourseMapper sl_courseMapper;
    @Resource
    UserMapper userMapper;
    @Resource
    UserCourseMapper userCourseMapper;

    private static final String ROOT_PATH =  System.getProperty("user.dir") + File.separator + "files";

    public void addCourse(Sl_Course course){
        sl_courseMapper.insert(course);

        List<User> users = userMapper.selectList(null);

        for (User user: users){
            UserCourse userCourse = new UserCourse();
            userCourse.setUserId(user.getId());
            userCourse.setCourseId(course.getId());
            userCourse.setCoursename(course.getCoursename());
            userCourse.setComplete(false);
            userCourseMapper.insert(userCourse);
        }
    }

    public void deleteCourse(Integer id){
        //delete file from `files`
        Sl_Course course = sl_courseMapper.selectById(id);
        if (course != null) {
            deleteSlCourseFile(course);
            //delete the course from the database
            sl_courseMapper.deleteById(id);
        }
    }
    public void deleteSlCourseFile(Sl_Course course){
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

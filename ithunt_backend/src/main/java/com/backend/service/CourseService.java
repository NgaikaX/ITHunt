package com.backend.service;

import com.backend.entity.Course;
import com.backend.mapper.CourseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/26 02:29
 */

@Service
public class CourseService extends ServiceImpl<CourseMapper, Course> {
    @Resource
    CourseMapper courseMapper;
}

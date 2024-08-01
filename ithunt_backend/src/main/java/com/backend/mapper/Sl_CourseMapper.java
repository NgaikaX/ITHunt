package com.backend.mapper;

import com.backend.entity.Sl_Course;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface Sl_CourseMapper extends BaseMapper<Sl_Course> {

    @Select("SELECT DISTINCT c.* " +
            "FROM sl_course c " +
            "INNER JOIN question q ON c.id = q.course_id")
    List<Sl_Course> selectCoursesWithQuestions();

}

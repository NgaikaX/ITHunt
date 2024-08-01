package com.backend.service;

import com.backend.entity.Question;
import com.backend.mapper.QuestionMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/29 10:36
 */
@Service
public class QuesitonService extends ServiceImpl<QuestionMapper, Question> {
}

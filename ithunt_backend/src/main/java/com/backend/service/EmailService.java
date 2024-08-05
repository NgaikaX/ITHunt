package com.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;

/**
 * Function: sent email verification
 * Author: Yijia Xu
 * Date: 2024/8/4 21:06
 */

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Resource
    JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        // 添加标准化内容
        String emailContent = "Dear User,\n\n" + text + "\n\nBest regards,\nYour Company";
        message.setText(emailContent);
        message.setFrom("ithuntstudent@outlook.com");
        mailSender.send(message);


    }

}

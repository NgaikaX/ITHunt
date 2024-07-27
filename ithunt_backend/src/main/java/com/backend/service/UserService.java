package com.backend.service;

import com.backend.entity.User;
import com.backend.exception.ServiceException;
import com.backend.mapper.UserMapper;
import com.backend.utils.TokenUtils;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/20 15:07
 */

@Service
public class UserService extends ServiceImpl<UserMapper,User> {
    @Resource
    UserMapper userMapper;

    public User selectByEmail(String email) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email", email);
        // Query the user information in the database based on email
        return getOne(queryWrapper);
    }
    public User login(User user) {
        User dbUser = selectByEmail(user.getEmail());
        if (dbUser == null) {
            // Throw a custom exception
            throw new ServiceException("Wrong email or password");
        }
        if (!user.getPassword().equals(dbUser.getPassword())) {
            throw new ServiceException("Wrong email or password");
        }
        //create Token
        String token =TokenUtils.createToken(dbUser.getId().toString(),dbUser.getPassword());
        dbUser.setToken(token);
        return dbUser;
    }


}

package com.backend.service;

import com.backend.common.Page;
import com.backend.entity.User;
import com.backend.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/20 15:07
 */

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;
    public void insterUser(User user){
        userMapper.insert(user);
    }

    public void editUser(User user) {
        userMapper.edit(user);
    }

    public void deleteUser(Integer id) {
        userMapper.delet(id);
    }

    public List<User> selectAllUser() {
       return userMapper.selectAllUser();
    }

    public User selectByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    public List<User> selectByRole(String role) {
        return userMapper.selectByRole(role);
    }

    public List<User> selectByMul(String username, String role) {
        return userMapper.selectByMul(username,role);
    }

    public Page<User> selectByPage( String username, String role,Integer pageNum, Integer pageSize) {
        Integer skipNum = (pageNum-1)*pageSize;

        Page<User> page = new Page<>();
        List<User> userList =userMapper.selectByPage(username,role,skipNum,pageSize);
        Integer total =userMapper.selectCountByPage(username,role);
        page.setList(userList);
        page.setTotal(total);
        return page;
    }
}

package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.User;
import com.backend.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;
import static com.baomidou.mybatisplus.extension.toolkit.Db.getOne;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/20 11:48
 */

@CrossOrigin
@RestController

@RequestMapping("/user")
public class UserController {
    @Resource
    UserService userService;
    /**
     * Add user
     * */
    @PostMapping("/add")
    public Result add(@RequestBody User user){
        try {
            userService.save(user);

        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }

    /**
     * edit user
     * */
    @PutMapping("/update")
    public Result edit(@RequestBody User user){

        userService.updateById(user);
        return Result.success();
    }

    /**
     * delete user
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){

        userService.removeById(id);
        return Result.success();
    }

    /**
     * query all user
     * */
    @GetMapping ("/selectAll")
    public Result selectAll(){
        List<User> userList = userService.list(new QueryWrapper<User>().orderByDesc("id"));
        return Result.success(userList);
    }

    /**
     * pagination
     * */
    @GetMapping ("/selectByPage")
    public Result selectByPage( @RequestParam(required = false) String username, @RequestParam(required = false) String role,@RequestParam Integer pageNum,@RequestParam Integer pageSize){
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>().orderByDesc("id");
        if (StrUtil.isNotBlank(username)) {
            queryWrapper.eq("username", username);
        }
        if (StrUtil.isNotBlank(role)) {
            queryWrapper.eq("role", role);
        }

        Page<User> page = userService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }
    /**
     * get user details by id
     * */
    @GetMapping ("/details/{id}")
    public Result details(@PathVariable Integer id) {
        User user = userService.getById(id);
        return Result.success(user);
    }


}

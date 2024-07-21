package com.backend.controller;

import com.backend.common.Page;
import com.backend.common.Result;
import com.backend.entity.User;
import com.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;

import java.util.List;


import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/20 11:48
 */

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    /**
     * Add user
     * */
    @PostMapping("/add")
    public Result add(@RequestBody User user){
        try {
            userService.insterUser(user);

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
    @PutMapping("/edit")
    public Result edit(@RequestBody User user){

        userService.editUser(user);
        return Result.success();
    }

    /**
     * delete user
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){

        userService.deleteUser(id);
        return Result.success();
    }

    /**
     * query all user
     * */
    @GetMapping ("/selectAll")
    public Result selectAll(){

        List<User> userList =userService.selectAllUser();
        return Result.success(userList);
    }

    /**
     * query user by username or role
     * */
    @GetMapping ("/selectByMul")
    public Result selectByMul(@RequestParam String username,@RequestParam String role){

        List<User> userList =userService.selectByMul(username,role);
        return Result.success(userList);
    }
    /**
     * pagination
     * */
    @GetMapping ("/selectByPage")
    public Result selectByPage( @RequestParam String username, @RequestParam String role,@RequestParam Integer pageNum,@RequestParam Integer pageSize){
        Page<User> page = userService.selectByPage(username,role,pageNum,pageSize);
        return Result.success(page);
    }
}

package com.backend.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * Function: User entity
 * Author: Yijia Xu
 * Date: 2024/7/20 11:40
 */
@TableName("user")
public class User {
    @TableId(type= IdType.AUTO)
    private Integer id;
    private String username;
    private String password;
    private String role;
    private String email;
    private String status;
    private String uploaddate;

    @TableField(exist = false)
    private String token;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUploaddate() {
        return uploaddate;
    }

    public void setUploaddate(String uploaddate) {
        this.uploaddate = uploaddate;
    }
}
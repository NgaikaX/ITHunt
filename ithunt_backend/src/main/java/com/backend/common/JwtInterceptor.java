package com.backend.common;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/22 10:20
 */
import cn.hutool.core.util.StrUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.backend.entity.User;
import com.backend.exception.ServiceException;
import com.backend.mapper.UserMapper;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.annotation.*;

public class JwtInterceptor implements HandlerInterceptor {
    @Resource
    private UserMapper userMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");  //  header里面传过来的参数
        if (StrUtil.isBlank(token)) {
            token = request.getParameter("token");  // url参数  ?token=xxxx
        }
        // 如果不是映射到方法直接通过
        if (handler instanceof HandlerMethod) {
            AuthAccess annotation = ((HandlerMethod) handler).getMethodAnnotation(AuthAccess.class);
            if (annotation != null) {
                return true;
            }
        }
        // 执行认证
        if (StrUtil.isBlank(token)) {
            throw new ServiceException("401", "Please log in");
        }
        // 获取 token 中的 user id
        String userId;
        try {
            userId = JWT.decode(token).getAudience().get(0);   // JWT.decode(token) 解码  jwt token
        } catch (JWTDecodeException j) {
            throw new ServiceException("401", "获取id");
        }
        // 根据token中的userid查询数据库
        User user = userMapper.selectById(Integer.valueOf(userId));
        if (user == null) {
            throw new ServiceException("401", "查询id");
        }
        // 通过用户密码加密之后生成一个验证器
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try {
            jwtVerifier.verify(token); // 验证token
        } catch (JWTVerificationException e) {
            throw new ServiceException("401", "验证token");
        }
        return true;
    }
}

package com.backend.mapper;


import com.backend.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT * FROM user WHERE verification_token = #{verificationToken}")
    User findByVerificationToken(String verificationToken);
}

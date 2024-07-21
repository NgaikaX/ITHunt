package com.backend.mapper;


import com.backend.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("insert into `user`(username,password,role,email,status,uploaddate) " +
            "values(#{username},#{password},#{role},#{email},#{status},#{uploaddate})" )
    void insert(User user);

    @Update("update `user` set username=#{username}, password = #{password}, role = #{role}, email = #{email}, " +
            "status = #{status}, uploaddate = #{uploaddate} where id = #{id}")
    void edit(User user);

    @Delete("delete from `user` where id = #{id}")
    void delet(Integer id);

    @Select("select * from `user` order by id desc ")
    List<User> selectAllUser();

    @Select("select * from `user` where username = #{username}order by id desc ")
    User selectByUsername(String username);

    @Select("select * from `user` where role = #{role} order by id desc ")
    List<User> selectByRole(String role);

    @Select("select * from `user` where username = #{username} or role = #{role} order by id desc ")
    List<User> selectByMul(@Param("username") String username, @Param("role") String role);

    @Select("select * from `user` where username = #{username} or role = #{role} order by id desc " +
            "limit #{skipNum}, #{pageSize}")
    List<User> selectByPage(@Param("username")String username, @Param("role")String role,@Param("skipNum")Integer skipNum, @Param("pageSize")Integer pageSize);
    @Select("select count(id) from `user` where username = #{username} and role = #{role} order by id desc ")
    Integer selectCountByPage(@Param("username")String username, @Param("role")String role);
}

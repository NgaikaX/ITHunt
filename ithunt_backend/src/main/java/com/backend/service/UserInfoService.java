package com.backend.service;

import com.backend.entity.User;
import com.backend.entity.UserInfo;
import com.backend.mapper.UserInfoMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 03:22
 */
@Service
public class UserInfoService extends ServiceImpl<UserInfoMapper, UserInfo> {
    @Resource
    UserInfoMapper userInfoMapper;

    public UserInfo infoExsit(Integer user_id){
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",user_id);
        return  userInfoMapper.selectOne(queryWrapper);
    }

    public void saveOrUpdateInfo(UserInfo userInfo){
        //if the user already in the table user_info
        UserInfo exsitUserInfo = infoExsit(userInfo.getUserId());

        if (exsitUserInfo !=null){//if so update the data by id
            userInfo.setId(exsitUserInfo.getId());
            userInfoMapper.updateById(userInfo);
        }else{
            userInfoMapper.insert(userInfo);//if not add a new user info
        }
    }

    public List<UserInfo> getStudyPartner(Integer user_id){
        //if the user already submit the user info
        UserInfo exsitUserInfo = infoExsit(user_id);

        List<UserInfo> studyPartners = new ArrayList<UserInfo>();
        if (exsitUserInfo !=null){//if user has already submitted their info
            QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
            queryWrapper.ne("user_id", exsitUserInfo.getUserId()) // 排除当前用户
                    .and(wrapper -> wrapper
                            .eq("interest", exsitUserInfo.getInterest())
                            .or()
                            .eq("language", exsitUserInfo.getLanguage()));
            studyPartners =userInfoMapper.selectList(queryWrapper);
        }else{//if user hasn't submitted their info
            studyPartners =userInfoMapper.selectList(new QueryWrapper<UserInfo>().orderByDesc("id"));
        }
        return studyPartners;
    }


}

package com.backend.service;

import com.backend.entity.Message;
import com.backend.mapper.MessageMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 12:04
 */
@Service
public class MessageService extends ServiceImpl<MessageMapper, Message> {
    @Resource
    MessageMapper messageMapper;

    public void sendMessage(Message message){
        messageMapper.insert(message);
    }

    public List<Message> getUserMessage(@RequestParam Integer user_id){
        QueryWrapper<Message> queryWrapper = new QueryWrapper<Message>();
        queryWrapper.eq("reciever_id",user_id);
        List<Message> userMessageList = messageMapper.selectList(queryWrapper);
        return userMessageList;
    }

    public void updateUserMessage(@RequestParam Integer id) {
        Message readMessage = messageMapper.selectById(id);
        readMessage.setRead(true);
        messageMapper.updateById(readMessage);
    }

    public void deleteMessage(@RequestParam Integer id){
        messageMapper.deleteById(id);
    }
}

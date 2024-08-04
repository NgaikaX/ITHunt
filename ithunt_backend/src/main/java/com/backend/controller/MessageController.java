package com.backend.controller;

import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Message;
import com.backend.service.MessageService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/8/1 12:08
 */
@RestController
@RequestMapping("/message")
public class MessageController {
    @Resource
    MessageService messageService;

    @PostMapping("/add")
    public Result sendMessage(@RequestBody Message message){
        messageService.sendMessage(message);
        return Result.success();
    }
    @AuthAccess
    @GetMapping("/getMessage")
    public Result getUserMessage(@RequestParam Integer user_id){
        List<Message> userMessageList = messageService.getUserMessage(user_id);
        return  Result.success(userMessageList);
    }
    @AuthAccess
    @PutMapping("/updateUserMessage")
    public Result updateUserMessage(@RequestParam Integer id){
        messageService.updateUserMessage(id);
        return Result.success();
    }

    @AuthAccess
    @DeleteMapping("/delete")
    public Result deleteMessage(@RequestParam Integer id){
        messageService.deleteMessage(id);
        return Result.success();
    }
}

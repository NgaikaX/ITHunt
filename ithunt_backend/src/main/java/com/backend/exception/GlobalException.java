package com.backend.exception;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/22 08:50
 */

import com.backend.common.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(ServiceException.class)
    @ResponseBody
    public Result serviceException(ServiceException e) {
        return Result.error(e.getCode(), e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result globalException(Exception e) {
        e.printStackTrace();
        return Result.error("500", "system error");
    }

}
package com.backend.exception;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/22 08:51
 */

import lombok.Getter;

@Getter
public class ServiceException extends RuntimeException {

    private final String code;

    public ServiceException(String msg) {
        super(msg);
        this.code = "500";
    }

    public ServiceException(String code, String msg) {
        super(msg);
        this.code = code;
    }

}

package com.backend.common.enums;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/19 23:36
 */

public enum ResultCodeEnum {
    SUCCESS("200", "success"),

    PARAM_ERROR("400", "Parameter abnormality"),
    TOKEN_INVALID_ERROR("401", "Invalid token"),
    TOKEN_CHECK_ERROR("401", "Token verification failed, please log in again"),
    PARAM_LOST_ERROR("4001", "Missing parameters"),

    SYSTEM_ERROR("500", "system error"),
    USER_EXIST_ERROR("5001", "Email already exists"),
    USER_NOT_ACTIVATED("5002", "User is not activated"),
    USER_ACCOUNT_ERROR("5003", "Incorrect email or password"),
    USER_NOT_EXIST_ERROR("5004", "User does not exist"),
    PARAM_PASSWORD_ERROR("5005", "The original password was entered incorrectly."),

    ;

    public String code;
    public String msg;

    ResultCodeEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}


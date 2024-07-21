package com.backend.common;

import java.util.List;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/21 00:12
 */

public class Page<T> {
    private Integer total;
    private List<T> list;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
}

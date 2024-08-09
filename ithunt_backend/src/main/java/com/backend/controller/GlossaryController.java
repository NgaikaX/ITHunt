package com.backend.controller;

import cn.hutool.core.util.StrUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import com.backend.entity.Glossary;
import com.backend.service.GlossaryService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import java.util.List;

import static com.backend.common.enums.ResultCodeEnum.SYSTEM_ERROR;

/**
 * Function:
 * Author: Yijia Xu
 * Date: 2024/7/28 15:04
 */

@RestController
@RequestMapping("/glossary")
public class GlossaryController {
    @Resource
    GlossaryService glossaryService;

    /**
     * get glossary list
     * */
    @AuthAccess
    @GetMapping("/glossaryList")
    public Result getCourseList(@RequestParam(required = false) String vocabulary, @RequestParam Integer current, @RequestParam Integer pageSize){
        QueryWrapper<Glossary> queryWrapper = new QueryWrapper<Glossary>().orderByDesc("id");
        if (StrUtil.isNotBlank(vocabulary)) {
            queryWrapper.eq("vocabulary", vocabulary);
        }
        Page<Glossary> page = glossaryService.page(new Page<>(current, pageSize), queryWrapper);
        return Result.success(page);
    }
    /**
     * Add user
     * */
    @PostMapping("/add")
    public Result add(@RequestBody Glossary glossary){
        try {
            glossaryService.save(glossary);
        }catch (Exception e){
            if(e instanceof DuplicateKeyException){
                return Result.error("500","insert data error");
            }else{
                return Result.error(SYSTEM_ERROR);
            }
        }
        return Result.success();
    }
    /**
     * edit glossary
     * */
    @PutMapping("/update")
    public Result update(@RequestBody Glossary glossary){
        glossaryService.updateById(glossary);
        return Result.success();
    }
    /**
     * delete glossary
     * */
    @DeleteMapping ("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        glossaryService.removeById(id);
        return Result.success();
    }
    /**
     * query all glossary
     * */
    @GetMapping ("/allGlossary")
    public Result selectAll(){
        List<Glossary> glossaryList = glossaryService.list(new QueryWrapper<Glossary>().orderByDesc("id"));
        return Result.success(glossaryList);
    }
    /**
     * get glossary details by id
     * */

    @AuthAccess
    @GetMapping ("/details/{id}")
    public Result details(@PathVariable Integer id) {
        Glossary glossary = glossaryService.getById(id);
        return Result.success(glossary);
    }
}


package com.backend.controller;

import cn.hutool.core.io.FileUtil;
import com.backend.common.AuthAccess;
import com.backend.common.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

/**
 * Function: upload file and download file
 * Author: Yijia Xu
 * Date: 2024/7/25 15:28
 */

@RestController
@RequestMapping("/file")
public class FileController {
    @Value("${ip:localhost}")
    String ip;

    @Value("${server.port}")
    String port;

    private static final String ROOT_PATH =  System.getProperty("user.dir") + File.separator + "files";

    //a way of upload file
    public String uplpadFile(MultipartFile file) throws IOException{
        String originalFilename = file.getOriginalFilename();//文件原始名称
        String mainName = FileUtil.mainName(originalFilename);//文件名称 e.g.aaa
        String extName = FileUtil.extName(originalFilename);//文件后缀 e.g. png
        if(!FileUtil.exist(ROOT_PATH)){//父级文件是否存在
            FileUtil.mkdir(ROOT_PATH);//当前文件的父级目录不存在，就创建
        }
        if(FileUtil.exist(ROOT_PATH + File.separator + originalFilename)){//如果当前目录存在一个重名的文件
            originalFilename = System.currentTimeMillis() + "_" + mainName + "." + extName;
        }
        File saveFile = new File(ROOT_PATH + File.separator + originalFilename);
        file.transferTo(saveFile);
        String url = "http://"+ ip + ":"+ port + "/file/download/" + originalFilename;
        return url;
    }
    /**
     * upload a new cover
     * */
    @AuthAccess
    @PostMapping("/upload")
    public Result upload(@RequestParam("cover") MultipartFile file) throws IOException {
        String url = uplpadFile(file);
        return Result.success(url);//file download link
    }

    /**
     * upload a video
    @AuthAccess
    @PostMapping("/uploadVideo")
    public Result uploadVideo(@RequestParam("video") MultipartFile file) throws IOException {
        String url = uplpadFile(file);
        return Result.success(url);//file download link
    }*/

    @AuthAccess
    @GetMapping("/download/{fileName}")
    public void download(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        String filePath = ROOT_PATH + File.separator + fileName;
        if(!FileUtil.exist(filePath)){
            return;
        }
        byte[] bytes = FileUtil.readBytes(filePath);
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);//字节流数组
        outputStream.flush();//刷新
        outputStream.close();
    }
}

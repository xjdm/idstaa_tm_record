package com.idstaa.tm.controller;

import com.idstaa.tm.entity.TmRecord;
import com.idstaa.tm.service.TmRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author chenjie
 * @date 2021/3/24 19:08
 */
@RequestMapping("/record")
@RestController
public class TmRecordController {
    @Autowired
    private TmRecordService tmRecordService;

    @RequestMapping("/query")
    public String query(){
        TmRecord tmRecord = tmRecordService.selectByPrimaryKey(1L);
        return tmRecord.toString();
    }
}

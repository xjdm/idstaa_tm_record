package com.idstaa.tm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.idstaa.tm.entity.TmRecord;
import com.idstaa.tm.mapper.TmRecordMapper;
import com.idstaa.tm.result.AppResult;
import com.idstaa.tm.result.ReturnWrapper;
import com.idstaa.tm.view.TmRecordQueryParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author chenjie
 * @date 2021/3/24 19:08
 */
@RequestMapping("/record")
@Controller
public class TmRecordController {
    @Autowired
    private TmRecordMapper tmRecordMapper;

    @RequestMapping("/recordListView")
    public String queryListView() {
        return "moudles/record/question-list";
    }

    /**
     * 分页查询
     * @param param
     * @return
     */
    @PostMapping("/query")
    @ResponseBody
    public AppResult<PageInfo> query(TmRecordQueryParams param) {
        // 分页参数封装
        int currentPage = 1;
        int pageSize = 10;
        if(param.getPageSize()!=null && param.getPageSize()!=0){
            pageSize = param.getPageSize();
        }
        if(param.getCurrentPage()!=null && param.getCurrentPage()!=0){
            currentPage = param.getCurrentPage();
        }
        // 使用PageHelper分页，接下来的第一条查询语句会走分页查询
        TmRecord tmRecord = new TmRecord();
        tmRecord.setEffective(true);
        PageHelper.startPage(currentPage, pageSize);
        List<TmRecord> tmRecords = tmRecordMapper.select(tmRecord);
        PageInfo<TmRecord> of = PageInfo.of(tmRecords);
        return new ReturnWrapper<PageInfo>(of).success("success");
    }

    @GetMapping("/view/{id}")
    @ResponseBody
    public AppResult<TmRecord> view(@PathVariable Long id) {
        TmRecord tmRecord = new TmRecord(id);
        tmRecord.setEffective(true);
        TmRecord tmRecords = tmRecordMapper.selectOne(tmRecord);
        return new ReturnWrapper<TmRecord>(tmRecords).success("success");
    }
}

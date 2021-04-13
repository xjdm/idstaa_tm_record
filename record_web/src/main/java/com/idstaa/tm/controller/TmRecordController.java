package com.idstaa.tm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.idstaa.tm.entity.TmRecord;
import com.idstaa.tm.exception.IdstaaGlobalException;
import com.idstaa.tm.mapper.TmRecordMapper;
import com.idstaa.tm.result.AppResult;
import com.idstaa.tm.result.Constant;
import com.idstaa.tm.result.ReturnWrapper;
import com.idstaa.tm.view.TmRecordQueryParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Example;

import javax.servlet.http.HttpServletRequest;
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

    @Autowired
    private HttpServletRequest request;

    @RequestMapping("/recordListView")
    public String queryListView() {
        return "/moudles/record/record-list";
    }

    /**
     * 分页查询
     * @param param
     * @return
     */
    @PostMapping("/query")
    @ResponseBody
    public AppResult<PageInfo> query(@RequestBody TmRecordQueryParams param) {
        // 分页参数封装
        int currentPage = 1;
        int pageSize = 1;
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
        request.setAttribute("tmRecord", tmRecord);
        return new ReturnWrapper<TmRecord>(tmRecords).success("success");
    }

    @GetMapping("/editView/{isAdd}/{id}")
    public String editView(@PathVariable Long isAdd,@PathVariable(required = false) Long id) {
        if(isAdd==1){
            request.setAttribute("isAdd", 1);
            return "moudles/record/record-edit";
        }else{
            TmRecord tmRecord = new TmRecord(id);
            tmRecord.setEffective(true);
            TmRecord tmRecords = tmRecordMapper.selectOne(tmRecord);
            request.setAttribute("tmRecord", tmRecords);
        }
        return "moudles/record/record-edit";
    }


    @PostMapping("/add")
    @ResponseBody
    public AppResult<String> add(@RequestBody TmRecord tmRecord) {
        tmRecord.setEffective(true);
        if(tmRecord.getId()!=null){
            Example example = new Example(TmRecord.class);
            Example.Criteria criteria = example.createCriteria();
            criteria.andCondition("id="+tmRecord.getId());
            tmRecordMapper.updateByExample(tmRecord,example);
        }else {
            tmRecordMapper.insertSelective(tmRecord);
        }
        return new ReturnWrapper<String>().success("success");
    }

    @PostMapping("/delete/{id}")
    @ResponseBody
    public AppResult<String> add(@PathVariable Long id) throws IdstaaGlobalException {
        TmRecord tmRecord = new TmRecord(id);
        TmRecord query = tmRecordMapper.selectOne(tmRecord);
        if (query==null){
            throw new IdstaaGlobalException(Constant.ACCESS_CODE.FAILED.getCode(),"该数据已删除");
        }
        int i = tmRecordMapper.delete(tmRecord);
        return new ReturnWrapper<String>().success("success");
    }
}

package com.idstaa.tm.service.impl;

import com.idstaa.tm.entity.TmRecord;
import com.idstaa.tm.mapper.TmRecordMapper;
import com.idstaa.tm.service.TmRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author chenjie
 * @date 2021/3/24 19:59
 */
@Service
public class TmRecordServiceImpl  implements TmRecordService {
    @Autowired
    private TmRecordMapper tmRecordMapper;
    @Override
    public void insert(TmRecord tmRecord){
        tmRecordMapper.insert(tmRecord);
    }

    @Override
    public TmRecord selectByPrimaryKey(Long id) {
        return tmRecordMapper.selectOne(new TmRecord(id));
    }
}

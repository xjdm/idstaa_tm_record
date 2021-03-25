package com.idstaa.tm.service;

import com.idstaa.tm.entity.TmRecord;

/**
 * @author chenjie
 * @date 2021/3/24 20:01
 */
public interface TmRecordService {
    public void insert(TmRecord tmRecord);
    TmRecord selectByPrimaryKey(Long id);

}

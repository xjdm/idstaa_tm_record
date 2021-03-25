package com.idstaa.tm.mapper;

import com.idstaa.tm.entity.TmRecord;

public interface TmRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TmRecord record);

    int insertSelective(TmRecord record);

    TmRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TmRecord record);

    int updateByPrimaryKey(TmRecord record);
}
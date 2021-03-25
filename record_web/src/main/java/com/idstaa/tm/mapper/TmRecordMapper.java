package com.idstaa.tm.mapper;

import com.idstaa.tm.entity.TmRecord;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TmRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TmRecord record);

    int insertSelective(TmRecord record);

    //@Select("SELECT * FROM tm_record limit 1")
    TmRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TmRecord record);

    int updateByPrimaryKey(TmRecord record);
}
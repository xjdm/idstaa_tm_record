package com.idstaa.tm.view;

import com.idstaa.tm.entity.TmRecord;
import lombok.Data;

/**
 * @author chenjie
 * @date 2021/4/12 14:29
 */
@Data
public class TmRecordQueryParams extends TmRecord {
    private Integer currentPage;
    private Integer pageSize;
}

package com.idstaa.tm.view;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.idstaa.tm.entity.TmRecord;
import lombok.Data;

/**
 * @author chenjie
 * @date 2021/4/12 14:29
 */
@Data
public class TmRecordQueryParams extends TmRecord {
    @JsonProperty("page")
    private Integer currentPage;
    @JsonProperty("limit")
    private Integer pageSize;
}

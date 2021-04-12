package com.idstaa.tm.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "tm_record")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TmRecord {
    private Long id;

    @JsonProperty("iWho")
    private String iWho;

    @JsonProperty("iWhen")
    private Date iWhen;

    @JsonProperty("iWhere")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String iWhere;

    @JsonProperty("iWhat")
    private String iWhat;

    @JsonProperty("iWhy")
    private String iWhy;

    @JsonProperty("iHow")
    private String iHow;

    private String remark;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createTime;

    private String createUser;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updateTime;

    private String updateUser;

    private Boolean effective;

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("{");
        sb.append("\"id\":")
                .append(id);
        sb.append(",\"iWho\":\"")
                .append(iWho).append('\"');
        sb.append(",\"iWhen\":\"")
                .append(iWhen).append('\"');
        sb.append(",\"iWhere\":\"")
                .append(iWhere).append('\"');
        sb.append(",\"iWhat\":\"")
                .append(iWhat).append('\"');
        sb.append(",\"iWhy\":\"")
                .append(iWhy).append('\"');
        sb.append(",\"iHow\":\"")
                .append(iHow).append('\"');
        sb.append(",\"remark\":\"")
                .append(remark).append('\"');
        sb.append(",\"createTime\":\"")
                .append(createTime).append('\"');
        sb.append(",\"createUser\":\"")
                .append(createUser).append('\"');
        sb.append(",\"updateTime\":\"")
                .append(updateTime).append('\"');
        sb.append(",\"updateUser\":\"")
                .append(updateUser).append('\"');
        sb.append(",\"effective\":")
                .append(effective);
        sb.append('}');
        return sb.toString();
    }

    public TmRecord(Long id) {
        this.id = id;
    }

    public TmRecord() {
    }
}
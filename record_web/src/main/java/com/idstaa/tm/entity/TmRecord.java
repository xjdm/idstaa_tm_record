package com.idstaa.tm.entity;

import lombok.Data;

import java.util.Date;

@Data
public class TmRecord {
    private Long id;

    private String iWho;

    private Date iWhen;

    private String iWhere;

    private String iWhat;

    private String iWhy;

    private String iHow;

    private String remark;

    private Date createTime;

    private String createUser;

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
}
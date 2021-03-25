package com.idstaa.tm.entity;

import java.util.Date;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getiWho() {
        return iWho;
    }

    public void setiWho(String iWho) {
        this.iWho = iWho == null ? null : iWho.trim();
    }

    public Date getiWhen() {
        return iWhen;
    }

    public void setiWhen(Date iWhen) {
        this.iWhen = iWhen;
    }

    public String getiWhere() {
        return iWhere;
    }

    public void setiWhere(String iWhere) {
        this.iWhere = iWhere == null ? null : iWhere.trim();
    }

    public String getiWhat() {
        return iWhat;
    }

    public void setiWhat(String iWhat) {
        this.iWhat = iWhat == null ? null : iWhat.trim();
    }

    public String getiWhy() {
        return iWhy;
    }

    public void setiWhy(String iWhy) {
        this.iWhy = iWhy == null ? null : iWhy.trim();
    }

    public String getiHow() {
        return iHow;
    }

    public void setiHow(String iHow) {
        this.iHow = iHow == null ? null : iHow.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser == null ? null : updateUser.trim();
    }

    public Boolean getEffective() {
        return effective;
    }

    public void setEffective(Boolean effective) {
        this.effective = effective;
    }
}
package com.idstaa.tm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @author chenjie
 * @date 2020/11/29 10:30
 */
@Controller
public class LoginController {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    HttpServletResponse response;
    /**
     * 获取并封装当前年份跳转到登录页login.html
     */
    @RequestMapping("/login")
    public String loginView(Model model) {
        return "login";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(String username,String password) throws IOException {
        if("admin".equalsIgnoreCase(username)&&"admin".equalsIgnoreCase(password)){
            HttpSession session = request.getSession();
            session.setAttribute("username","cj");
            session.setAttribute("userType","超级管理员");
            System.out.println("用户已登陆");
        }
        return "index";
    }
}

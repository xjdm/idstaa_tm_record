package com.idstaa.tm.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author chenjie
 * @date 2021/4/11 14:53
 */
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        if(session.getAttribute("username")==null){
            System.out.println("用户未登录，无权限访问");
            request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
            return false;
        }
        return true;
    }
}


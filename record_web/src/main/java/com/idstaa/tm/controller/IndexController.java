package com.idstaa.tm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author chenjie
 * @date 2021/4/5 19:45
 */
@Controller
public class IndexController {
    @RequestMapping({"/index", ""})
    public String main() {
        return "index";
    }
}

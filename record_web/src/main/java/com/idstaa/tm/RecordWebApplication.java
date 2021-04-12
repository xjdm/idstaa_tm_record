package com.idstaa.tm;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.idstaa.tm.mapper")
public class RecordWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecordWebApplication.class, args);
    }

}

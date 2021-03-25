package com.idstaa.tm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.idstaa.tm.mapper")
public class RecordWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecordWebApplication.class, args);
    }

}

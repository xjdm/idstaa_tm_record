/*
SQLyog v10.2 
MySQL - 5.7.30-log : Database - idstaa_tm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`idstaa_tm` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `idstaa_tm`;

/*Table structure for table `tm_record` */

DROP TABLE IF EXISTS `tm_record`;

CREATE TABLE `tm_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `i_who` varchar(20) DEFAULT NULL COMMENT '何人',
  `i_when` date DEFAULT NULL COMMENT '何时',
  `i_where` varchar(20) DEFAULT NULL COMMENT '何地',
  `i_what` varchar(500) DEFAULT NULL COMMENT '何事',
  `i_why` varchar(500) DEFAULT NULL COMMENT '为何',
  `i_how` varchar(500) DEFAULT NULL COMMENT '怎么样',
  `remark` varchar(500) DEFAULT NULL COMMENT '补充',
  `create_time` date DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(20) DEFAULT NULL COMMENT '创建人',
  `update_time` date DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(20) DEFAULT NULL COMMENT '更新人',
  `effective` tinyint(1) DEFAULT NULL COMMENT '是否有效{1:有效;0:无效}',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `tm_record` */

insert  into `tm_record`(`id`,`i_who`,`i_when`,`i_where`,`i_what`,`i_why`,`i_how`,`remark`,`create_time`,`create_user`,`update_time`,`update_user`,`effective`) values (1,'Apache','2002-01-16','apache','2010年6月16日，iBATIS从Apache软件基金会退役（retired），项目的初创团队已经转移到MyBatis项目。','开源一个项目有助于让项目的质量变得更高。 除了上面所说的之外，共享你的工作和项目还能从另一个方面提高你的工作和项目的质量：反馈。 ... 在开源代码方面，反馈所发挥的作用就更加强大，因为它本身就是一种获取同行审查的方式。 正是基于这个原因，开源已经成为开发复杂和关键的软件系统的一个标准，例如安全稳定、操作系统和编程语言的开源。','MyBatis是一个Java持久化框架，它通过XML描述符或注解把对象与存储过程或SQL语句关联起来，映射成数据库内对应的纪录。',NULL,'2021-03-24','jianyi',NULL,NULL,1),(2,'Clinton Begin','2001-01-01','武圣东里1','开源ibatis',NULL,'小蓝田很懒1','','2021-03-24','jianyi',NULL,'',1),(3,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

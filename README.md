# Index Page

![License](https://img.shields.io/badge/License-MIT-dark_green)

一个用于索引端口和服务的页面

后端项目[在这里](https://github.com/Zhoucheng133/Index-Page-Core)

## 截图

## 使用方法

推荐使用Docker部署项目

1. 将本项目中的docker文件夹复制到服务器上
2. 使用下面的命令生成Image
```bash
sudo docker build -t index <复制的docker文件夹位置>
```
3. 使用下面的命令生成Container
```bash
sudo docker run -d --restart always -p <主机端口号>:8081 -v <主机数据库存储位置>:/app/db --name index index
```
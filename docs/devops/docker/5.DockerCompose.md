# Docker Compose

Docker Compose 是用来管理一组容器的启动和关闭等操作的，它使用 `yaml` 格式描述容器的服务定义、网络、卷等信息。

用它可以一次性启动/停止一组相关的容器，而不需要每个容器都单独的 `docker run`。



## 常用命令

| 常用命令                      | 作用                     |
| ----------------------------- | ------------------------ |
| docker compose up -d          | 后台启动所有服务         |
| docker compose down           | 停止并删除容器、网络、卷 |
| docker compose start | 启动已创建的容器       |
| docker compose stop     | 停止运行的容器        |
| docker compose restart | 重启服务                 |
| docker compose rm -f   | 删除已停止的服务容器     |
| docker compose ps             | 查看容器运行状态         |
| docker compose logs -f        | 查看所有服务日志         |



## 常见配置项

| 配置项                    | 作用                        |
| :------------------------ | :-------------------------- |
| **name**                  | 名称                        |
| **services**              | 服务                        |
| - services.image          | 镜像名                      |
| - services.build          | 指定 Dockerfile 构建        |
| - services.container_name | 容器名                      |
| - services.ports          | 端口映射，格式为：宿主:容器 |
| - services.volumes        | 数据卷挂载                  |
| - services.envieonment    | 环境变量                    |
| - services.depends_on     | 当前服务依赖哪个服务        |
| - services.restart        | 容器容器策略                |
| **networks**              | 网络                        |
| **volumes**               | 卷                          |
| **configs**               | 配置                        |
| **secrets**               | 密钥                        |

基础示例：

```yaml [compose.yaml]
name: myCompose

services:
  db:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: test
      MYSQL_USER: admin
      MYSQL_PASSWORD: 1234
    volumes:
      - mysql-data:/var/lib/mysql
      - /app/mysqlConf:/etc/mysql/conf.d
    # 重启策略，always表示开机启动
    restart: always
    # 自定义网络
    networks:
      - mynet

  web:
    image: nginx:latest
    container_name: webApp
    ports:
      - "80:80"
    volumes:
      - nginx-conf:/etc/nginx
      - /app/nginxHtml:/usr/share/nginx/html/
    restart: always
    networks:
      - mynet

# 但凡 services 中用到的卷，都必须在 volumes 下配置
volumes:
  # mysql用到了卷，所以这里必须定义一下，但可以不对卷做其他配置
  mysql-data:
  nginx-conf:

# 但凡 services 中用到的网络，都必须在 networks 下配置
networks:
  mynet:
```

一键启动 `compose.yaml`：

```bash
# 一键启动
docker compose -f compose.yaml up -d
# 配置参数:
# -f : 指定 compose 配置文件，默认名称就是 compose.yaml
# -d : 后台一键启动

# 查看容器状态
docker compose ps

# 一键停止
docker compose down
```

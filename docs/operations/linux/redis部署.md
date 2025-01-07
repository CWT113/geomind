# Redis部署

>视频教学：https://www.bilibili.com/video/BV1H54y13768



## 单机部署

**第 1 步：**

安装 `gcc` 编译器，然后下载 redis 最新的 tar 包：

```shell
# 安装 `gcc` 编译器
yum install -y gcc-c++
# 安装 wget 在线下载redis包
wget http://download.redis.io/releases/redis-7.4.0.tar.gz
# 查看下载的 redis 包位置
whereis redis-7.4.0.tar.gz
```

>redis 历史版本查看：http://download.redis.io/releases/



**第 2 步：**

移动 `redis-7.4.0.tar.gz` 包到 `/usr/` 下，并进行解压：

```shell
# 移动 redis 包
mv redis-7.4.0.tar.gz /usr/redis-7.4.0.tar.gz
# 解压 redis 包
tar -xzf redis-7.4.0.tar.gz
```

进入解压后的 redis 文件夹内，使用 `make` 命令编译：

```shell
cd redis-7.4.0
# 编译并安装
make && make install		# 默认安装目录为 /usr/local/bin
```



**第 3 步：**

复制 `redis.conf` 文件到 `/usr/local/bin` 目录下：

```shell
cp /usr/redis-7.4.0/redis.conf /usr/local/bin/redis-7.4.0/
```

修改 `redis.conf` 文件：

```shell
# 修改 bind 可允许的连接客户端
# bind 127.0.0.1  # 默认只允许 127.0.0.1
bind 0.0.0.0      # 修改为允许所有客户端

# 修改是否后台启动，并设置密码
# daemonize no		# 默认不启动
daemonize yes			# 设置为后台启动

# 设置密码
requirepass redis@1234
```



**第 4 步：**

切换到 `/usr/local/bin/redis-7.4.0` 文件夹，启动 redis ：

```shell
# 启动 redis-server
./redis-server redis.conf
# 启动 redis-cli 测试启动是否成功
./redis-cli
# 进入 redis 命令行就表示 redis 启动成功
127.0.0.1:6379>
```

::: warning 警告

如果启动 redis 服务端的时候报警告：WARNING Memory overcommit must be enabled! 

解决方法：

- 编辑 `/etc/sysctl.conf` 文件（或在某些系统上，可能是 `/etc/sysctl.d/` 目录下的文件）

  ```shell
  vm.overcommit_memory = 1
  ```

- 保存文件，并使用 `sudo sysctl -p` 重启系统。 

:::



**第 4 步：**

修改防火墙，并向外暴漏 6379 端口：

```shell
# 向外暴漏 6379 端口
firewall-cmd --zone=public --add-port=6379/tcp --permanent
# 重启防火墙
systemctl restart firewalld
```

window 上面使用 redis 可视化工具连接，其中 redis 服务器地址可以使用命令查看：

```shell
# 查看服务器ip, 找到 ens33 中 inet 后面的就是服务器地址
ip addr			# 192.168.111.128
```

设置 redis-server 开机自启：

```shell
# 新建 redis 系统服务
vim /etc/systemd/system/redis.service
```

```shell {7}
[Unit]
Description=redis-server
After=network.target
 
[Service]
Type=forking
ExecStart= /usr/local/bin/redis-server /usr/local/bin/redis.conf
PrivateTmp=true
 
[Install]
WantedBy=multi-user.target
```

```shell
# 重载服务
systemctl daemon-reload
# 启动服务
sudo systemctl start redis
# 查看服务状态
sudo systemctl status redis
# 设置开机自启
systemctl enable redis
```

::: warning 警告

如果使用 start 命令，启动 redis 时报错，提示启动失败，可以先查看 6379 端口是否已被占用，如果被占用，停止改进程。

解决方案：

```shell
# 查看 6379 端口是否被占用
lsof -i:6379
# 杀死进程
kill -9 PID
```

:::



## 集群部署

>参考博客：https://blog.csdn.net/qq_39017153/article/details/133899805

[利用chatgpt解决单主机多实例模式Redis主从配置的报错问题：Error condition on socket for SYNC: Connection refused - xycccode - 博客园 (cnblogs.com)](https://www.cnblogs.com/wekenyblog/p/17503696.html)

[# Error condition on socket for SYNC: Connection refused-CSDN博客](https://blog.csdn.net/weixin_68919548/article/details/133024653)






































# Redis部署

>视频教学：https://www.bilibili.com/video/BV1H54y13768



## 单机部署

**第 1 步：**

安装 `gcc` 编译器：

```shell
# 安装 `gcc` 编译器
yum -y install gcc
```

```shell
# 安装 wget 在线下载redis包
wget http://download.redis.io/releases/redis-7.4.0.tar.gz
```

>redis 历史版本查看：http://download.redis.io/releases/

默认 redis 的包是安装在` /root` 文件夹下，使用 `cd ~`，然后 `ls` 即可查看到包。



**第 2 步：**

在 `/usr/` 下新建 myproject 文件夹，存放安装的程序，然后将 redis 压缩包移动到该文件夹下，并解压：

```shell
# 新建文件夹
mkdir /usr/myproject
# 移动 redis 包
mv redis-7.4.0.tar.gz /usr/myproject
# 解压 redis 包
tar -zxf redis-7.4.0.tar.gz
```

进入解压后的 redis 文件夹内，使用 `make` 命令编译：

```shell
cd redis-7.4.0
# 编译并安装
make && make install		# 默认安装目录为 /usr/local/bin
# 切换到默认的安装目录
cd /usr/local/bin
```



**第 3 步：**

复制 `redis.conf` 文件到 `/usr/local/bin` 目录下：

```shell
cp /usr/myproject/redis-7.4.0/redis.conf /usr/local/bin/redis-7.4.0/
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
firewall-cmd --zone=public --add-port=6379/tcp --permanent
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
vi /etc/systemd/system/redis.service
```

```shell
[Unit]
Description=redis-server
After=network.target
 
[Service]
Type=forking
ExecStart= /usr/local/bin/redis-server /usr/local/bin/myredis/redis.conf	# 注意路径替换
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
sudo systemctl start redis
# 设置开机自启
systemctl enable redis
```



## 集群部署
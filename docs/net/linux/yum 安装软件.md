# 系统命令

### 安装软件 yum

作用：rpm 包软件管理器，可以在 linux 命令行中自动化安装并配置 linux 软件，并自动解决依赖问题。

::: warning 注意

yum 命令需要 root 管理员权限，且需要联网！

:::

```shell
yum [-y] [install | remove | search] 软件名称
```

| 参数    | 描述     |
| :------ | :------- |
| -y      | 自动安装 |
| install | 安装     |
| remove  | 卸载     |
| search  | 搜索     |

示例：

```shell
# 搜索 wget 软件
yum search wget
# 安装 wget 软件
yum -y install wget
# 卸载 wget 软件
yum -y remove wget
```



### 管理系统服务 systemctl

linux 系统很多软件（内置或第三方）均支持使用 `systemctl` 命令控制，例如启动、停止、开机自启等。能够被  `systemctl` 管理的软件，一般称之为 服务。

linux 系统内置的服务比较多，比如：

- NetworkManager：主网络服务

- network：副网络服务

- firewalld：防火墙服务

- sshd、ssh服务：finalshell 远程登录 linux 就是用的这个服务

除了内置的服务，还有安装时自动集成的第三方服务，如：

- ntp 软件
- httpd 软件



作用：控制服务 启动、关闭、查看运行状态、开机自启、关闭开机自启。

```shell
systemctl start | stop | status | enable | disable 服务名称
```

| 参数    | 描述             |
| ------- | ---------------- |
| start   | 开启服务         |
| stop    | 关闭服务         |
| status  | 查看服务运行状态 |
| enable  | 启用开机自启     |
| disable | 关闭开机自启     |

示例：

```shell
# 查看 firewalld 的状态
systemctl status firewalld
# 关闭 firewalld
systemctl stop firewalld
# 开启 firewalld
systemctl start firewalld
# 关闭 firewalld 开机自启
systemctl disable firewalld
# 开启 firewalld 开机自启
systemctl enable firewalld
```



### 软链接 ln

作用：将文件、文件夹链接到其他位置，类似于 windows 的快捷方式。

```shell
ln -s 源文件 目标路径
```

| 参数 | 描述           |
| ---- | -------------- |
| -s   | 表示创建软链接 |

示例：

```shell
# 查看 /etc/yum 文件夹
ls -l /etc/yum

# 将 /etc/yum 软链接到 home 目录
ln -s /etc/yum /home
```



### 查看时区 date

作用：查看系统时间。

```shell
date [-d] [+格式化字符串]
```

| 参数 | 描述                                       |
| ---- | ------------------------------------------ |
| -d   | 按照给定的字符串显示时间，一般用于日期计算 |

| 格式化字符串 | 描述                     |
| ------------ | ------------------------ |
| %Y           | 年                       |
| %y           | 年份的后两位数字         |
| %m           | 月                       |
| %d           | 日                       |
| %H           | 小时                     |
| %M           | 分钟                     |
| %S           | 秒                       |
| %s           | 1970-01-01到现在的时间戳 |

示例：

```shell
# 使用 date 命令，无参数，查看当前时间
date
# 按照 YYYY-MM-DD 的格式显示日期
date "+%Y-%m-%d"
# 按照 YYYY-MM-DD HH:mm:ss 的格式显示日期
date "+%Y-%M-%d %H:%M:%S"
```

`-d` 选项，一般用于参数计算：

```shell
# 在当前时间的基础上加一天
date -d "+1Day"
# 在当前月份的基础上加一月
date -d "+1Month"
# 在当前年份的基础上加一年
date -d "+1Year"
# 在当前小时、分钟的基础上 加一小时三十分钟
date -d "+1hour +30minute"
```



### 修改时区/时间校准

通过上面的 `date` 命令查看的日期是不准确的，因为 linux 系统默认的时区是非中国的东八区。

使用 root 权限，执行如下命令，可修改时区为东八区：

```shell
# 移除 默认时区
rm -f /etc/localtime

# 切换时区为亚洲/上海
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

::: info ntp程序

作用：ntp 程序可以自动校准系统时间。

```shell
# 安装
yum -y install ntp

# 设置开机自启
systemctl enable ntpd

# root 权限下，手动校准
ntpdate -u ntp.aliyun.com
```

:::



### 查看ip地址 ifconfig

每台联网的电脑都会有一个地址，用于和其他计算机进行通讯。

```shell
# 查看本机 ip
ifconfig
```



### 固定 ip 地址





### 修改主机名 hostnamectl

```shell
# 查看主机名
hostname

# 修改主机名
hostnamectl set-hostname 新主机名
```


































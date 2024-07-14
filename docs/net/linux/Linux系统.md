# Linux 系统

## yum -- 安装软件

注意：yum 命令需要 root 管理员权限，且需要联网哦！

作用：rpm包软件管理器，可在 linux 命令行中自动化安装配置 linux 软件，并可以自动解决依赖问题。

语法：**`yum [-y] [install | remove | search] 软件名称`**

参数：

- -y：自动确认，无需手动安装

  

- install：安装

- remove：卸载

- search：搜索

示例：

```SQL
-- 搜索 wget 软件
yum search wget
-- 安装 wget 软件
yum -y install wget
-- 卸载 wget 软件
yum -y remove wget
```



## systemctl -- 控制软件

Linux 系统很多软件（内置或第三方）均支持使用 systemctl 命令控制：启动、停止、开机自启。

能够被systemctl管理的软件，一般称之为：服务



作用：控制软件启动、关闭、查看状态、开机自启、关闭开机自启。

语法：**`systemctl start | stop | status | enable | disable 服务名`**



系统内置的服务比较多，比如说：

- NetworkManager：主网络服务

- network：副网络服务

- firewalld：防火墙服务

- sshd、ssh服务：finalshell 远程登录 linux 就是用的这个服务

除了内置服务，还有安装时自动集成的 第三方软件，比如说：

- ntp 软件

- httpd 软件

```SQL
-- 查看 firewalld 的状态
systemctl status firewalld
-- 关闭 firewalld
systemctl stop firewalld
-- 开启 firewalld
systemctl start firewalld
-- 关闭 firewalld 开机自启
systemctl disable firewalld
-- 开启 firewalld 开机自启
 systemctl enable firewalld
```

```SQL
-- 安装 httpd 软件
yum -y install httpd
-- 查看 httpd 的状态（默认关闭）
systemctl status httpd
-- 开启 httpd
systemctl start httpd
-- 开启 httpd 开机自启
systemctl enable httpd
-- 关闭 httpd 开机自启
systemctl stop httpd
```



## ln -- 软链接

作用：将文件、文件夹链接到其他位置，类似于 windows 中的 快捷方式。

语法：**`ln -s 参数1 参数2`**

参数：

- -s：创建软链接

- 参数1：被链接的文件或文件夹

- 参数2：要链接去的目的地

```SQL
-- 查看 /etc/yum.conf 文件
ls -l /etc/yum.conf
-- 将 /etc/yum.conf 软链接到 home 目录
ln -s /etc/yum.conf /home
-- 查看 /etc/yum 文件夹
ls -l /etc/yum
-- 将 /etc/yum 软链接到 home 目录 
ln -s /etc/yum /home
```



## date -- 查看时区

作用：查看系统时间

语法：**`date [-d] [+格式化字符串]`**

参数：

- -d：按照给定的字符串显示日期，一般用于日期计算

- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式

    - %Y：年

    - %y：年份后两位数组

    - %m：月

    - %d：日

    - %H：小时

    - %M：分钟

    - %S：秒

    - %s：1970-01-01到现在的时间戳

```SQL
-- 使用 date 命令，无参数，查看当前时间
date
-- 按照 YYYY-MM-DD 的格式显示日期
date "+%Y-%m-%d"
-- 按照 YYYY-MM-DD HH:mm:ss 的格式显示日期
date "+%Y-%M-%d %H:%M:%S"
```

-d选项，一般用于参数计算：

```SQL
-- 在 当前时间 的基础上 加一天
date -d "+1Day"
-- 在 当前月份 的基础上 加一月
date -d "+1Month"
-- 在 当前年份 的基础上 加一年
date -d "+1Year"
-- 在 当前小时、分钟 的基础上 加一小时三十分钟
date -d "+1hour +30minute"
```



## 修改时区

通过上面的 date 命令查看的日期是不准确的，这是因为：系统默认的时区非中国的 东八区。

使用 root 权限，执行如下命令，可修改时区为东八区时区：

```SQL
-- 移除 默认时区
rm -f /etc/localtime

-- 切换时区为 亚洲/上海
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



### **ntp程序**

作用：可以自动校准系统时间

安装：**`yum -y install ntp`**、**`systemctl enable ntpd`**

- 当设置开机自启之后，ntpd就会帮我们 联网 自动校准。

- 也可以手动校准，需要root权限，命令：**`ntpdate -u ntp.aliyun.com`**



## ifconfig -- IP地址

每台联网的电脑都会有一个地址，用于和其他计算机进行通讯。

IP地址中的IPv4就是我们要的地址，地址格式为 a.b.c.d，例如：192.168.88.101。

查看本机 IP：**`ifconfig`**



## hostnamectl -- 修改主机名

查看主机名：**`hostname`**

修改主机名：**`hostnamectl set-hostname 主机名`**

重新启动 linux ，即可看到主机名已更改。



## 固定IP地址

- 在 VMware 软件中，工具栏选择“虚拟网络编辑器”，设置“子网”为 `192.168.88.0`，“子网掩码“为`255.255.255.0`，点击“NAT设置”，设置“网关”为 `192.168.88.2`。

- 在 linux 中，使用 root 权限，编辑 `/etc/sysconfig/network-scripts/ifcfg-ens33` 文件，修改如下内容：

    - 修改 BOOTPRORO="dhcp"  →  BOOTPRORO="static"

    - 新增如下内容：

    ```SQL
    IPADDR="192.168.88.222" -- IP地址，前三位固定，最后一位可选：0~254
    NETMASK="255.255.255.0" -- 子网掩码
    GATEWAY="192.168.88.2"  -- 网关
    DNS1="192.168.88.2"     -- 也设置为网关即可
    ```

- 执行 **`systemctl restart network`**，重启  linux 即可看到 IP 固定。



## ping -- 连通服务器

作用：检查指定的网络服务器是否是可联通状态。

语法：**`ping [-c num] ip或主机名`**

参数：

- -c：检查的次数，num就是指定次数，不写表示无限次持续检查

- ip或主机名：被检查的服务器的ip地址或主机名地址

```SQL
-- 检查到 baidu.com 是否联通
ping baidu.com
-- 检查到 29.156.66.10 是否联通，并检查 3次
ping -c 3 29.156.66.10
-- 检查到 192.168.66.123 是否联通（地址不存在）
ping 192.168.66.123
```



## wget -- 下载网络文件

作用：命令行内下载网络文件

语法：**`wget [-b] url`**

参数：

- -b：后台下载，会将日志写入到当前工作目录的 wget-log 文件

- url：下载链接

示例：

```SQL
-- 前台下载 apache-hadoop3.3.0
-- url：https://archive.apache.org/dist/hadoop/common/hadoop-3.0.0/hadoop-3.0.0.tar.gz

wget https://archive.apache.org/dist/hadoop/common/.....
-- 后台下载 apache-hadoop3.3.0
wget -b https://archive.apache.org/dist/hadoop/common/.....

-- 使用 tail 命令查看后台下载进度
tail -f wget-log
```



## curl -- 发起网络请求

作用：发起网络请求，可用于：下载文件、获取信息。

语法：**`curl [-O] url`**

参数：

- -O：用于下载文件，当 url 是下载链接时，可以使用此选项保存文件。等同于 **`wget url`**。

- url：下载链接

```SQL
-- 向 cip.cc 发起网络请求
curl cip.cc
-- 向 python.itheima.com 发起网络请求
curl python.itheima.com
-- 使用 curl 下载 apache-hadoop3.3.0
curl https://archive.apache.org/dist/hadoop/common/...
```



## 端口

端口，是设备与外界 通讯交流的出入口，端口可分为 物理端口 和 **虚拟端口** 两类。

linux 系统是一个超大号小区，可以支持 65535 个端口，这么多端口可分为3类使用：

- 公认端口：1~1023，通常用于一些系统内置或知名程序的预留使用。如SSH的22端口，HTTPS的443端口，非特殊需要，不要占用这个范围的端口。

- 注册端口：1024~49151，通常可以随意使用，用于松散的绑定一个程序。

- 动态端口：49152~65535，通常当程序对外进行网络链接时，用于临时使用。

![image.png](./images/image.png)

如图中，计算机A的微信连接计算机B的微信，A使用的50001即动态端口，临时找一个端口作为出口，计算机B的微信使用端口5678，即注册端口，长期绑定此端口等待别人连接。



### **查看端口占用：**

使用 nmap 命令，安装 nmap：**`yum -y install nmap`**

语法：**`nmap 被查看的端口号`**

示例：

```SQL
-- 查看 127.0.0.1 IP的端口被占用情况
nmap 127.0.0.1
```



**查看指定端口的占用**

使用 netstat 命令，安装 netstat：**`yum -y install net-tools`**

语法：**`netstat -anp | grep 端口号`**

示例：

```SQL
-- 查看 6000 端口被占用情况
netstat -anp | grep 6000
-- 查看 12345 端口被占用情况（没有任何输出，表示未被占用）
netstat -anp | grep 12345
```



## ps -- 查看进程

作用：查看系统中的 进程 信息。

语法：**`ps [-e -f]`**

参数：

- -e：显示出全部的进程

- -f：以完全格式化的形式展示信息（展示全部信息）

<img src="./images/image 1.png" alt="image.png" style="zoom:50%;" />

- UID：进程所属的用户ID

- PID：进程的进程号ID

- PPID：进程的父ID

- C：此进程的CPU占用率

- STIME：进程的启动时间

- TTY：启动此进程的终端序号，？表示非终端启动

- TIME：进程占用CPU的时间

- CMD：进程对应的名称或启动路径或启动命令

示例：

```SQL
-- 查看所有进程
ps -ef
-- 启动 tail 命令，通过 管道符 过滤出 tail 命令
tail
ps -e | grep tail

-- 通过 管道符 过滤出 进程ID 为 xxxxx 的进程信息
ps -ef | grep 15463
```



## **kill -- 关闭进程**

作用：关闭进程

语法：**`kill [-9] 进程ID`**

参数：

- -9：强制关闭进程

示例：

```SQL
-- 启动 tail 进程，然后关闭 tail 进程
-- 1、查看 tail 进程的ID
ps -ef | grep tail -- 17371
-- 2、关闭进程（提示“已终止”）
kill 17371
-- 启动 tail 进程，然后强制关闭 tail 进程（提示“已杀死”）
kill -9 17371
```



## top -- 查看系统资源占用

作用：查看系统CPU、内存的使用情况。

语法：**`top`**



## df -- 磁盘信息监控

作用：查看磁盘的使用情况

语法：**`df -h`**

参数：

- -h：带上单位



## iostat -- 查看磁盘信息

作用：查看 CPU、磁盘的相关信息

语法：**`iostat [-x] num1 num2`**

参数：

- -x：显示更多信息

- num1：刷新间隔

- num2：刷新几次



## sar -- 查看网络信息

作用：查看网络相关的统计

语法：**`sar -n DEV num1 num2`**

参数：

- -n：查看网络

- DEV：表示查看网络接口



## 环境变量

环境变量 是操作系统在运行的时候，记录的一些关键性信息，用以辅助系统运行。

在 linux 系统中，查看环境变量的命令：**`env`**

我们无论在工作目录的那一层，都能执行某些命令，其实借助的就是环境变量中的PATH。

查看环境变量 PATH 的值：**`echo $PATH`**



## 上传和下载

Finalshell中提供了可视化的上传和下载操作，在 下方的文件夹可视化面板中，选择要下载的文件，右击“下载”即可，上传文件时，将文件拖拽到文件夹可视化面板中即可。

当然，linux 也提供了命令的方式，下载和上传，执行命令：**`yum -y install lrzsz`**

**rz：**

作用：上传文件（速度较慢，推荐使用可视化面板拖拽）

语法：**`rz`** → 弹出提示框选择文件

**sz：**

作用：下载文件

语法：**`sz 文件名`**



## 压缩和解压

Linux 和 Mac 系统常用的有两种压缩格式，分别是：

- .tar：称之为 tarball 归档文件，即把简单的文件组装到一个 .tar 文件内，并没有太大的体积减少，指示简单的归档。

- .gz：gzip格式压缩文件，常见的 .tar.gz 文件，它是使用 gzip 压缩算法将文件进行压缩，体积可以极大的减少。



**tar命令：**

作用：压缩和解压 .tar 和 .tar.gz 两种文件。

语法：**`tar [-z -c -x -v -f -C] 参数1 参数2 .....`**

参数：

- -z：gzip模式，不使用就是简单的 .tar 格式

- -c：创建压缩文件，用于压缩操作

- -x：解压模式

- -v：显示压缩、解压过程

- -f：要压缩为的文件名称，或被解压的文件名称

- -C：压缩的目的地，用于指定解压目录

示例：

```SQL
-- 将 1.txt 2.txt 3.txt 压缩为 .tar 格式，取名为 test.tar
tar -cvf test.tar 1.txt 2.txt 3.txt
-- 将 1.txt 2.txt 3.txt 压缩为 .tar.gz 格式，取名为 test.tar.gz
tar -zcvf test.tar.gz 1.txt 2.txt 3.txt
-- 将 test.tar 和 test.tar.gz 分别解压
tar -xvf test.tar
tar -zxvf test.tar.gz
-- 将 test.tar.gz 解压到 good 目录下
tar -zxvf test.tar.gz -C good/
```



**zip命令：**

作用：压缩文件为 zip 压缩包

语法：**`zip [-r] 参数1 参数2 参数3`**

参数：

- -r：被压缩的内容包含文件夹时使用

实例：

```SQL
-- 将 1.txt 2.txt 3.txt 压缩为 .zip 格式，取名为 test.zip
zip test.zip 1.txt 2.txt 3.txt
-- 将 good 1.txt 2.txt 3.txt 压缩为 .zip 格式，取名为 test1.zip
zip -r test1.zip good 1.txt 2.txt 3.txt
```



**unzip命令：**

注意：解压时如果有同名的文件，会直接覆盖！

作用：解压 .zip 压缩包

语法：**`unzip 压缩包 [-d] 目录`**

参数：

- -d：压缩到指定的目录

实例：

```SQL
-- 将压缩的 test.zip 解压
unzip test.zip
-- 将压缩的 test1.zip 解压到 good 文件夹
unzip test1.zip -d good/
```


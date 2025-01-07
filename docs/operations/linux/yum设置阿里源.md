# yum设置阿里源

**第 1 步：**

备份 `yum.repos.d` 文件夹下的文件：

```shell 
cd /etc

# 备份文件
cp -r yum.repos.d/ yum.repos.d.back/
```



**第 2 步：**

设置淘宝源镜像：

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

curl -o /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo
```



**第 3 步：**

```shell
# 清理缓存
yum clean all

# 生成缓存
yum makecache
```
# Docker部署

**第 1 步：**

卸载系统之前可能安装过的 docker：

```shell
# 卸载旧 docker
sudo yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
# 重新安装 docker 环境
sudo yum install -y yum-utilsdevice-mapper-persistent-data lvm2
# 配置 docker 阿里云镜像
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
yum makecache fast
```



**第 2 步：**

```shell
# 安装 docker
sudo yum install docker-ce docker-ce-cli containerd.io
# 启动 docker
sudo systemctl start docker
# 查看 docker 服务状态
sudo systemctl status docker
# 设置 docker 开机自启
sudo systemctl enable docker
```


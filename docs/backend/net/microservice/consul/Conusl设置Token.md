# Consul开启登录ACL

## 新增ACL配置文件

在 Consul 目录下，新创建 config/dir 目录，新增 acl.json 文件，写入一下内容：

```json
{
  "acl": {
    "enabled": true,
    "default_policy": "deny",
    "enable_token_persistence": true
  }
}
```

|           参数           | 作用                                                         |
| :----------------------: | ------------------------------------------------------------ |
|         enabled          | 是否开启 ACL token                                           |
|      default_policy      | 可选项：<br />allow 模式：ACL是黑名单，允许任何未明确禁止的操作；<br />deny 模式：ACL是白名单，阻止任何未明确允许的操作； |
| enable_token_persistence | 启用令牌持久化，避免因重启电脑导致 token 变化                |



## 创建 bat 启动

新增 consul_start.bat 脚本，写入一下内容：

```bat
```










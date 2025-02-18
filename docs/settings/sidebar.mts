/**
 * 侧边栏配置
 */
export const sidebar = {
  "/frontend/css/": [
    {
      text: "基础使用",
      items: [
        { text: "基础使用", link: "/frontend/css/css-basic/基础使用.md" },
        { text: "flex布局", link: "/frontend/css/css-basic/flex布局.md" },
        { text: "grid布局", link: "/frontend/css/css-basic/grid布局.md" }
      ]
    },
    {
      text: "预处理器",
      items: [
        { text: "Less", link: "/frontend/css/css-preprocessor/Less.md" },
        { text: "Sass", link: "/frontend/css/css-preprocessor/Sass.md" },
        { text: "Stylus", link: "/frontend/css/css-preprocessor/Stylus.md" }
      ]
    },
    {
      text: "第三方库",
      items: [
        { text: "UnoCSS", link: "/frontend/css/css-package/UnoCSS.md" },
        { text: "WindiCSS", link: "/frontend/css/css-package/WindiCSS.md" },
        {
          text: "TailwindCSS",
          link: "/frontend/css/css-package/TailwindCSS.md"
        }
      ]
    }
  ],

  "/frontend/javascript/": [
    {
      text: "基础使用",
      items: [
        { text: "基础使用", link: "/frontend/javascript/Javascript.md" },
        { text: "数组方法", link: "/frontend/javascript/数组.md" },
        { text: "闭包", link: "/frontend/javascript/闭包.md" },
        { text: "事件循环", link: "/frontend/javascript/事件循环.md" },
        { text: "防抖与节流", link: "/frontend/javascript/防抖与节流.md" },
        { text: "原型与原型链", link: "/frontend/javascript/原型与原型链.md" },
        { text: "正则表达式", link: "/frontend/javascript/正则表达式.md" },
        { text: "Promise", link: "/frontend/javascript/Promise.md" },
        { text: "垃圾回收机制", link: "/frontend/javascript/垃圾回收机制.md" },
        { text: "WeakMap和Map", link: "/frontend/javascript/WeakMap和Map.md" },
        { text: "WeakSet和Set", link: "/frontend/javascript/WeakSet和Set.md" },
        {
          text: "ResizeObserver",
          link: "/frontend/javascript/ResizeObserver.md"
        }
      ]
    },
    {
      text: "ES6",
      items: []
    },
    {
      text: "第三方库",
      items: [
        { text: "Lodash", link: "/frontend/javascript/lodash.md" },
        { text: "Radash", link: "" }
      ]
    },
    {
      text: "文件上传",
      items: [
        {
          text: "单文件上次",
          link: ""
        },
        {
          text: "大文件分片上传",
          link: "/frontend/javascript/大文件分片上传.md"
        }
      ]
    }
  ],

  "/frontend/git/": [
    {
      text: "Git Flow",
      items: [{ text: "分支简介", link: "/frontend/git/分支分类.md" }]
    },
    {
      text: "Git 代理",
      items: [{ text: "Git代理", link: "/frontend/git/Git代理.md" }]
    }
  ],

  "/frontend/node/": [
    {
      text: "Node.js",
      items: [{ text: "基础使用", link: "/frontend/node/基础使用.md" }]
    },
    {
      text: "网络通信",
      items: [
        { text: "Axios", link: "/frontend/node/Axios.md" },
        { text: "HTTP", link: "/frontend/node/HTTP.md" }
      ]
    },
    {
      text: "包管理工具",
      items: [
        { text: "pnpm", link: "" },
        { text: "Monorepo", link: "/frontend/node/Monorepo.md" }
      ]
    },
    {
      text: "其他",
      items: [
        { text: "包管理器", link: "/frontend/node/包管理器.md" },
        { text: "NVM的使用", link: "/frontend/node/nvm.md" }
      ]
    }
  ],

  "/frontend/visual/": [
    {
      text: "ECharts",
      items: [
        { text: "基础使用", link: "/frontend/visual/Echarts/基础使用.md" }
      ]
    }
  ],

  "/frontend/other/": [
    { text: "Postman", link: "/frontend/other/Postman全局配置token.md" },
    { text: "Typora", link: "/frontend/other/Typora.md" }
  ],

  "/frontend/vue/": [
    {
      text: "TypeScript",
      items: [
        { text: "基础使用", link: "/frontend/vue/typescript/基础使用.md" },
        {
          text: "一些技巧",
          link: "/frontend/vue/typescript/一些技巧.md"
        }
      ]
    },
    {
      text: "Vue3",
      items: [
        { text: "基础使用", link: "/frontend/vue/vue-basic/基本使用.md" },
        { text: "ref家族", link: "/frontend/vue/vue-basic/ref函数.md" },
        { text: "编译器宏", link: "/frontend/vue/vue-basic/宏.md" },
        { text: "组件传值", link: "/frontend/vue/vue-basic/组件传值.md" },
        { text: "计算属性", link: "/frontend/vue/vue-basic/计算属性.md" },
        { text: "侦听器", link: "/frontend/vue/vue-basic/侦听器.md" },
        { text: "插槽", link: "/frontend/vue/vue-basic/插槽.md" },
        { text: "组合式函数", link: "/frontend/vue/vue-basic/组合式函数.md" },
        { text: "自定义指令", link: "/frontend/vue/vue-basic/自定义指令.md" },
        { text: "异步组件", link: "/frontend/vue/vue-basic/异步组件.md" },
        { text: "KeepAlive", link: "/frontend/vue/vue-basic/KeepAlive.md" },
        { text: "模板引用", link: "/frontend/vue/vue-basic/模板引用.md" },
        { text: "h函数", link: "/frontend/vue/vue-basic/h渲染函数.md" },
        { text: "jsx语法", link: "/frontend/vue/vue-basic/JSX语法.md" },
        { text: "路由传参", link: "/frontend/vue/vue-basic/路由传参.md" }
      ]
    },
    {
      text: "第三方库",
      items: [
        { text: "Ant-Design-Vue", link: "" },
        { text: "dayjs", link: "/frontend/vue/vue-utils/dayjs.md" },
        { text: "ECharts", link: "/frontend/vue/vue-utils/ECharts.md" },
        { text: "alasql", link: "/frontend/vue/vue-utils/alasql.md" },
        { text: "LZ-String", link: "/frontend/vue/vue-utils/LZ-String.md" },
        { text: "Pubsub-JS", link: "/frontend/vue/vue-utils/Pubsub-JS.md" },
        { text: "Websocket", link: "/frontend/vue/vue-utils/WebSocket.md" },
        { text: "localForAge", link: "/frontend/vue/vue-utils/localForAge.md" },
        { text: "文字转语音", link: "/frontend/vue/vue-utils/文字转语音.md" },
        {
          text: "西瓜视频播放器",
          link: "/frontend/vue/vue-utils/西瓜视频播放器.md"
        },
        {
          text: "vue-esign手写签字",
          link: "/frontend/vue/vue-utils/vue-esign手写签字.md"
        }
      ]
    }
  ],

  "/frontend/store/": [
    {
      text: "pinia",
      items: [
        { text: "基础使用", link: "/frontend/pinia/基础使用.md" },
        {
          text: "persistedstate",
          link: "/frontend/pinia/persistedstate.md"
        },
        {
          text: "useLocalStorage",
          link: "/frontend/pinia/useLocalStorage.md"
        }
      ]
    },
    {
      text: "vuex",
      items: [{ text: "基础使用", link: "/frontend/store/vuex/基础使用.md" }]
    }
  ],

  "/frontend/wxprogram/": [
    {
      text: "基础使用",
      items: [{ text: "基础使用", link: "/frontend/wxprogram/基础使用.md" }]
    }
  ],

  "/frontend/react/": [
    {
      text: "基础使用",
      items: [
        { text: "基础使用", link: "/frontend/react/react-basic/基础使用.md" }
      ]
    }
  ],

  "/database/mysql/": [
    {
      text: "MySQL基础",
      items: [
        { text: "基本SQL语句", link: "/database/mysql/基本SQL语句.md" },
        {
          text: "函数/约束/多表查询/事务",
          link: "/database/mysql/函数约束多表查询事务.md"
        },
        {
          text: "存储引擎/InnoDB引擎",
          link: "/database/mysql/存储引擎InnoDB引擎.md"
        },
        { text: "索引/SQL优化", link: "/database/mysql/索引SQL优化.md" },
        { text: "视图/存储过程", link: "/database/mysql/视图存储过程.md" },
        { text: "锁", link: "/database/mysql/锁.md" }
      ]
    },
    { text: "MySQL进阶", items: [] }
  ],

  "/database/postgres/": [
    {
      text: "PostgreSQL基础",
      items: [
        { text: "基本使用", link: "/database/postgres/基本使用.md" },
        { text: "分区表", link: "/database/postgres/分区表.md" },
        { text: "TimescaleDB", link: "/database/postgres/TimescaleDB.md" },
        { text: "WKB格式转为WKT", link: "/database/postgres/WKB格式转为WKT.md" }
      ]
    },
    { text: "PostgreSQL进阶", items: [] }
  ],

  "/database/sqlite/": [
    {
      text: "SQLite基础",
      items: [{ text: "基本使用", link: "/database/postgres/SQLite.md" }]
    },
    { text: "SQLite进阶", items: [] }
  ],

  "/operations/linux/": [
    {
      text: "基础命令",
      items: [
        { text: "常用命令", link: "/operations/linux/常用命令.md" },
        { text: "系统命令", link: "/operations/linux/系统命令.md" },
        { text: "用户和权限", link: "/operations/linux/用户和权限.md" },
        { text: "vim", link: "/operations/linux/vim.md" },
        { text: "固定IP地址", link: "/operations/linux/固定IP地址.md" },
        { text: "yum设置阿里源", link: "/operations/linux/yum设置阿里源.md" }
      ]
    },
    {
      text: "服务部署",
      items: [
        { text: "Redis部署", link: "/operations/linux/Redis部署.md" },
        { text: "Nginx部署", link: "/operations/linux/Nginx部署.md" },
        { text: "MySQL部署", link: "/operations/linux/MySQL部署.md" },
        { text: "Docker部署", link: "/operations/linux/Docker部署.md" },
        { text: "Consul部署", link: "/operations/linux/Consul部署.md" },
        { text: "RabbitMQ部署", link: "/operations/linux/RabbitMQ部署.md" },
        { text: "Postgres部署", link: "/operations/linux/Postgres部署.md" }
      ]
    },
    {
      text: "其他拓展",
      items: [{ text: "bat脚本", link: "/operations/linux/bat脚本.md" }]
    }
  ],

  "/backend/net/CSharp/": [
    {
      text: "C#基础",
      items: [
        {
          text: "方法与数组",
          link: "/backend/net/CSharp/CSharpBasic/方法与数组.md"
        },
        {
          text: "class类",
          link: "/backend/net/CSharp/CSharpBasic/class类.md"
        },
        {
          text: "面向对象高级",
          link: "/backend/net/CSharp/CSharpBasic/面向对象高级.md"
        }
      ]
    },
    {
      text: "C#扩展",
      items: [
        {
          text: "文件IO操作",
          link: "/backend/net/CSharp/CSharpSkill/文件IO操作.md"
        },
        {
          text: "文件上传",
          link: "/backend/net/CSharp/CSharpSkill/文件上传.md"
        },
        {
          text: "线程安全类",
          link: "/backend/net/CSharp/CSharpSkill/线程安全类.md"
        },
        {
          text: "键值对集合",
          link: "/backend/net/CSharp/CSharpSkill/键值对集合.md"
        },
        {
          text: "字典集合",
          link: "/backend/net/CSharp/CSharpSkill/字典集合.md"
        },
        {
          text: "元组",
          link: "/backend/net/CSharp/CSharpSkill/元组.md"
        },
        {
          text: "模式匹配",
          link: "/backend/net/CSharp/CSharpSkill/模式匹配.md"
        },
        {
          text: "关于null的语法糖",
          link: "/backend/net/CSharp/CSharpSkill/关于null的语法糖.md"
        },
        {
          text: "序列化与反序列化",
          link: "/backend/net/CSharp/CSharpSkill/序列化与反序列化.md"
        },
        {
          text: "迪卡斯杰拉算法",
          link: "/backend/net/CSharp/CSharpSkill/迪卡斯杰拉算法.md"
        }
      ]
    }
  ],

  "/backend/net/webapi/": [
    {
      text: "WebAPI基础",
      items: [
        { text: "异步编程", link: "/backend/net/webapi/异步编程.md" },
        { text: "LINQ查询", link: "/backend/net/webapi/LINQ查询.md" },
        { text: "依赖注入", link: "/backend/net/webapi/依赖注入.md" },
        { text: "雪花Id", link: "/backend/net/webapi/雪花Id.md" },
        { text: "读取配置文件", link: "/backend/net/webapi/读取配置文件.md" },
        { text: "Swagger配置", link: "/backend/net/webapi/Swagger配置.md" }
      ]
    }
  ],

  "/backend/net/microservice/": [
    { text: "微服务概念", link: "/backend/net/microservice/微服务概念.md" },
    {
      text: "ORM框架",
      items: [
        { text: "EFCore", link: "/backend/net/microservice/orm/EFCore.md" }
      ]
    },
    {
      text: "对象映射",
      items: [
        {
          text: "AutoMapper",
          link: "/backend/net/microservice/mapper/AutoMapper.md"
        },
        { text: "Mapster", link: "/backend/net/microservice/mapper/Mapster.md" }
      ]
    },
    {
      text: "任务调度",
      items: [
        {
          text: "QuartZ",
          link: "/backend/net/microservice/scheduling/QuartZ.md"
        },
        {
          text: "Hangfire",
          link: "/backend/net/microservice/scheduling/Hangfire.md"
        }
      ]
    },
    {
      text: "消息传递",
      items: [
        {
          text: "MediatR",
          link: "/backend/net/microservice/eventBus/MediatR.md"
        },
        { text: "CAP", link: "/backend/net/microservice/eventBus/Cap.md" }
      ]
    },
    {
      text: "MQ",
      items: [
        { text: "ActiveMQ", link: "/backend/net/microservice/mq/ActiveMQ.md" },
        { text: "RabbitMQ", link: "/backend/net/microservice/mq/RabbitMQ.md" }
      ]
    },
    {
      text: "注册发现",
      items: [
        {
          text: "consul",
          link: "/backend/net/microservice/consul/Consul和nacos.md"
        }
      ]
    },
    {
      text: "缓存",
      items: [
        { text: "Redis", link: "/backend/net/microservice/redis/Redis.md" },
        { text: "CSRedis", link: "/backend/net/microservice/redis/CSRedis.md" }
      ]
    },
    {
      text: "日志",
      items: [
        { text: "Serilog", link: "/backend/net/microservice/log/Serilog.md" },
        { text: "Nlog", link: "/backend/net/microservice/log/Nlog.md" },
        { text: "Log4Net", link: "/backend/net/microservice/log/Log4Net.md" },
        { text: "ELK", link: "/backend/net/microservice/log/ELK.md" }
      ]
    },
    {
      text: "依赖注入",
      items: [
        {
          text: "依赖注入",
          link: "/backend/net/microservice/dependencyInjection/依赖注入.md"
        }
      ]
    },
    {
      text: "熔断降级",
      items: [
        { text: "Polly", link: "/backend/net/microservice/polly/Polly.md" }
      ]
    },
    {
      text: "其他",
      items: [
        {
          text: "FluentResults",
          link: "/backend/net/microservice/other/FluentResults.md"
        },
        {
          text: "MinIO安装教程",
          link: "/backend/net/microservice/other/MinIO安装教程.md"
        }
      ]
    },
    {
      text: "发布部署",
      items: [
        {
          text: "浏览器不支持WebGL",
          link: "/backend/net/microservice/systemPublish/解决服务器不支持WebGL.md"
        }
      ]
    }
  ],

  "/backend/java/java-basic/": [
    {
      text: "Java基础",
      collapsed: true,
      items: [
        { text: "数据类型", link: "/backend/java/java-basic/数据类型.md" },
        { text: "数组", link: "/backend/java/java-basic/数组.md" },
        {
          text: "面向对象",
          link: "/backend/java/java-basic/面向对象.md",
          items: [
            { text: "继承", link: "/backend/java/java-basic/继承.md" },
            { text: "封装", link: "/backend/java/java-basic/封装.md" },
            { text: "多态", link: "/backend/java/java-basic/多态.md" }
          ]
        },
        { text: "重写与重载", link: "/backend/java/java-basic/重写和重载.md" },
        { text: "静态类", link: "/backend/java/java-basic/静态类.md" },
        { text: "抽象类", link: "/backend/java/java-basic/抽象类.md" },
        { text: "接口", link: "/backend/java/java-basic/接口.md" },
        { text: "泛型", link: "/backend/java/java-basic/泛型.md" },
        { text: "内部类", link: "/backend/java/java-basic/内部类.md" },
        { text: "枚举", link: "/backend/java/java-basic/枚举.md" },
        { text: "注解", link: "/backend/java/java-basic/注解.md" },
        { text: "单元测试", link: "/backend/java/java-basic/Junit单元测试.md" },
        { text: "包装类", link: "/backend/java/java-basic/包装类.md" }
      ]
    },
    {
      text: "常用类和核心API",
      collapsed: true,
      items: [
        { text: "String类", link: "/backend/java/java-basic/String.md" },
        {
          text: "String处理类",
          link: "/backend/java/java-basic/String处理类.md"
        },
        {
          text: "日期时间类",
          items: [
            { text: "JDK8之前", link: "/backend/java/java-basic/JDK8之前.md" },
            { text: "JDK8之后", link: "/backend/java/java-basic/JDK8之后.md" }
          ]
        },
        { text: "排序类", link: "/backend/java/java-basic/排序类.md" },
        { text: "record类", link: "/backend/java/java-basic/record.md" },
        { text: "常用工具类", link: "/backend/java/java-basic/常用工具类.md" }
      ]
    },
    {
      text: "异常处理",
      collapsed: true,
      items: [
        { text: "异常简介", link: "/backend/java/java-basic/异常简介.md" },
        { text: "异常捕获", link: "/backend/java/java-basic/异常捕获.md" },
        { text: "日志系统", link: "/backend/java/java-basic/日志系统.md" }
      ]
    },
    {
      text: "多线程",
      collapsed: true,
      items: [
        { text: "进程与线程", link: "/backend/java/java-basic/多线程基础.md" },
        { text: "多线程调用", link: "/backend/java/java-basic/多线程调用.md" },
        {
          text: "线程生命周期",
          link: "/backend/java/java-basic/线程生命周期.md"
        },
        { text: "线程同步", link: "/backend/java/java-basic/线程同步.md" },
        { text: "线程通信", link: "/backend/java/java-basic/线程通信.md" },
        { text: "线程池", link: "/backend/java/java-basic/线程池.md" },
        { text: "线程中断", link: "/backend/java/java-basic/线程中断.md" },
        { text: "线程守护", link: "/backend/java/java-basic/线程守护.md" }
      ]
    },
    {
      text: "集合类",
      collapsed: true,
      items: [
        { text: "集合简介", link: "/backend/java/java-basic/集合框架.md" },
        {
          text: "Collection",
          link: "/backend/java/java-basic/Collection.md",
          items: [
            { text: "List 接口", link: "/backend/java/java-basic/List.md" },
            { text: "Set 接口", link: "/backend/java/java-basic/Set.md" }
          ]
        },
        {
          text: "Map",
          link: "/backend/java/java-basic/Map.md"
        }
      ]
    },
    {
      text: "File和IO流",
      collapsed: true,
      items: [
        {
          text: "File类",
          link: "/backend/java/java-basic/File类.md"
        },
        {
          text: "IO流",
          link: "/backend/java/java-basic/IO流.md",
          items: [
            { text: "缓冲流", link: "/backend/java/java-basic/缓冲流.md" },
            { text: "转换流", link: "/backend/java/java-basic/转换流.md" },
            { text: "序列化流", link: "/backend/java/java-basic/序列化流.md" },
            { text: "打印流", link: "/backend/java/java-basic/打印流.md" }
          ]
        }
      ]
    },
    {
      text: "网络编程",
      collapsed: false,
      items: []
    },
    {
      text: "反射",
      collapsed: false,
      items: []
    },
    {
      text: "JDK8-17新特性",
      collapsed: false,
      items: []
    }
  ],

  "/gis/mapbox/": [
    {
      text: "Mapbox",
      items: [
        { text: "快速入门", link: "/gis/mapbox/快速入门.md" },
        { text: "Style属性", link: "/gis/mapbox/Style样式.md" },
        { text: "Map的常用方法", link: "/gis/mapbox/Map方法.md" },
        { text: "Map的常用事件", link: "/gis/mapbox/Map事件.md" },
        { text: "图层表达式", link: "/gis/mapbox/表达式.md" },
        { text: "练习案例", link: "/gis/mapbox/练习案例.md" }
      ]
    },
    {
      text: "Maplibre",
      items: [{ text: "快速入门", link: "/gis/mapbox/maplibre.md" }]
    },
    {
      text: "Mapbox插件",
      items: [
        { text: "MapboxDraw", link: "/gis/mapbox/MapboxDraw.md" },
        { text: "Threebox", link: "/gis/mapbox/ThreeBox.md" },
        { text: "Antv L7 Map", link: "/gis/mapbox/Antv L7.md" }
      ]
    },
    {
      text: "其他",
      items: [{ text: "瓦片地图url", link: "/gis/mapbox/瓦片地图url.md" }]
    }
  ],

  "/gis/cesium/": [
    {
      text: "Cesium基础",
      items: [
        { text: "快速入门", link: "/gis/cesium/cesium-primary/快速入门.md" },
        { text: "坐标系", link: "/gis/cesium/cesium-primary/坐标系.md" },
        { text: "相机视角", link: "/gis/cesium/cesium-primary/相机视角.md" },
        {
          text: "Entity 实体",
          link: "/gis/cesium/cesium-primary/Entity实体.md",
          items: [
            {
              text: "Entity 管理",
              link: "/gis/cesium/cesium-primary/Entity 管理.md"
            },
            {
              text: "Entity 拾取",
              link: "/gis/cesium/cesium-primary/Entity 拾取.md"
            }
          ]
        },
        {
          text: "Primitive 图元",
          link: "/gis/cesium/cesium-primary/Primitive图元.md"
        },
        {
          text: "加载三维数据",
          link: "/gis/cesium/加载三维数据.md",
          items: [
            {
              text: "影像数据",
              link: "/gis/cesium/cesium-primary/影像地图.md"
            },
            {
              text: "地形数据",
              link: "/gis/cesium/cesium-primary/地形数据.md"
            },
            {
              text: "矢量数据",
              link: "/gis/cesium/cesium-primary/矢量数据.md"
            },
            {
              text: "三维模型",
              link: "/gis/cesium/cesium-primary/三维模型.md"
            },
            { text: "三维瓦片", link: "/gis/cesium/cesium-primary/三维瓦片.md" }
          ]
        },
        {
          text: "组件重写",
          link: "/gis/cesium/cesium-primary/组件重写.md"
        },
        { text: "事件应用", link: "/gis/cesium/cesium-primary/鼠标事件.md" },
        {
          text: "量测工具和调试面板",
          link: "/gis/cesium/cesium-primary/量测工具和调试面板.md"
        },
        {
          text: "CallBackProperty",
          link: "/gis/cesium/cesium-primary/CallBackProperty.md"
        },
        { text: "粒子系统", link: "/gis/cesium/cesium-primary/粒子系统.md" },
        {
          text: "模型动画效果",
          link: "/gis/cesium/cesium-primary/模型动画效果.md"
        },
        { text: "热力图", link: "/gis/cesium/cesium-primary/热力图.md" },
        { text: "风力图", link: "/gis/cesium/cesium-primary/风力图.md" },
        { text: "地图导出", link: "/gis/cesium/cesium-primary/地图导出.md" }
      ]
    },
    {
      text: "Cesium高级",
      items: [
        {
          text: "常见渲染引擎",
          link: "/gis/cesium/cesium-senior/常见渲染引擎.md"
        }
      ]
    }
  ],

  "/gis/leaflet/": [
    {
      text: "Leaflet",
      items: [{ text: "快速入门", link: "/gis/leaflet/leaflet.md" }]
    }
  ],

  "/gis/openlayers/": [
    {
      text: "OpenLayers",
      items: [
        { text: "快速入门", link: "/gis/openlayers/快速入门.md" },
        { text: "地图操作", link: "/gis/openlayers/地图操作.md" },
        { text: "影像地图", link: "/gis/openlayers/影像地图.md" },
        { text: "矢量地图", link: "/gis/openlayers/矢量地图.md" },
        { text: "地图控件", link: "/gis/openlayers/地图控件.md" }
      ]
    }
  ],

  "/gis/arcgis-js-api/": [
    {
      text: "ArcGIS Javascript API",
      items: [{ text: "快速入门", link: "/gis/arcgis-js-api/index.md" }]
    }
  ],

  "/gis/webgl/": [
    {
      text: "WebGL",
      items: [
        { text: "快速入门", link: "/gis/webgl/基础入门.md" },
        { text: "类型化数组", link: "/gis/webgl/类型化数组.md" },
        { text: "着色器", link: "/gis/webgl/着色器.md" },
        { text: "WebGL API", link: "/gis/webgl/WebGL API.md" }
      ]
    }
  ],

  "/gis/three/": [
    {
      text: "Three.js",
      items: [
        { text: "快速入门", link: "/gis/three/基础入门.md" },
        { text: "场景", link: "/gis/three/场景.md" },
        { text: "几何体", link: "/gis/three/物体.md" },
        { text: "轨道控制器", link: "/gis/three/轨道控制器.md" },
        { text: "lil-gui", link: "/gis/three/lil-gui.md" },
        { text: "物体材质", link: "/gis/three/物体材质.md" },
        { text: "gltf加载器", link: "/gis/three/gltf加载器.md" },
        {
          text: "包围盒与世界矩阵",
          link: "/gis/three/包围盒与世界矩阵转换.md"
        },
        {
          text: "边缘集合体与线框几何体",
          link: "/gis/three/边缘集合体和线框几何体.md"
        },
        { text: "灯光与阴影", link: "/gis/three/灯光与阴影.md" }
      ]
    }
  ],

  "/gis/geoserver/": [
    {
      text: "GeoServer",
      items: [
        { text: "快速入门", link: "/gis/geoserver/环境安装.md" },
        { text: "坐标系", link: "/gis/geoserver/坐标系.md" },
        { text: "OGC服务", link: "/gis/geoserver/OGC服务.md" },
        { text: "发布shp数据", link: "/gis/geoserver/发布shp数据.md" },
        { text: "发布tif数据", link: "/gis/geoserver/发布tif数据.md" },
        { text: "Layer Group", link: "/gis/geoserver/Layer Group.md" },
        { text: "SLD样式", link: "/gis/geoserver/SLD样式.md" },
        { text: "数据请求", link: "/gis/geoserver/数据请求.md" }
      ]
    }
  ]
}

/**
 * 侧边栏配置
 */
export const sidebar = {
  "/javascript/": [
    {
      text: "Javascript",
      items: [
        { text: "Javascript", link: "/javascript/Javascript.md" },
        { text: "数组", link: "/javascript/数组.md" },
        { text: "垃圾回收机制", link: "/javascript/垃圾回收机制.md" },
        { text: "WeakMap和Map", link: "/javascript/WeakMap和Map.md" },
        { text: "WeakSet和Set", link: "/javascript/WeakSet和Set.md" }
      ]
    },
    {
      text: "Node.js",
      items: [
        { text: "Git", link: "/javascript/node/git.md" },
        { text: "包管理工具", link: "/javascript/node/包管理工具.md" },
        {
          text: "postman配置token",
          link: "/javascript/node/Postman全局配置token.md"
        },
        { text: "nvm", link: "/javascript/node/nvm.md" },
        { text: "Typora", link: "/javascript/node/Typora.md" }
      ]
    }
  ],

  "/vue3/": [
    {
      text: "TypeScript",
      items: [{ text: "TypeScript", link: "/vue3/typescript/TypeScript.md" }]
    },
    {
      text: "Vue3",
      items: [
        { text: "基本使用", link: "/vue3/vue3.md" },
        { text: "h 函数", link: "/vue3/h渲染函数.md" },
        { text: "jsx 语法", link: "/vue3/JSX语法.md" },
        { text: "ref 全家桶", link: "/vue3/ref函数.md" },
        { text: "路由传参", link: "/vue3/路由传参.md" }
      ]
    },
    {
      text: "第三方工具集",
      items: [
        { text: "alasql", link: "/vue3/utils/alasql.md" },
        { text: "LZ-String", link: "/vue3/utils/LZ-String.md" },
        { text: "Pubsub-JS", link: "/vue3/utils/Pubsub-JS.md" },
        { text: "Websocket", link: "/vue3/utils/WebSocket.md" },
        { text: "localForAge", link: "/vue3/utils/localForAge.md" },
        { text: "文字转语音", link: "/vue3/utils/文字转语音.md" },
        { text: "西瓜视频播放器", link: "/vue3/utils/西瓜视频播放器.md" }
      ]
    }
  ],

  "/sql/": [
    {
      text: "MySQL",
      items: [
        { text: "基本SQL语句", link: "/sql/mysql/基本SQL语句.md" },
        {
          text: "函数/约束/多表查询/事务",
          link: "/sql/mysql/函数约束多表查询事务.md"
        },
        {
          text: "存储引擎/InnoDB引擎",
          link: "/sql/mysql/存储引擎InnoDB引擎.md"
        },
        { text: "索引/SQL优化", link: "/sql/mysql/索引SQL优化.md" },
        { text: "视图/存储过程", link: "/sql/mysql/视图存储过程.md" },
        { text: "锁", link: "/sql/mysql/锁.md" }
      ]
    },
    {
      text: "SQLite",
      items: [{ text: "SQLite", link: "/sql/sqlite/SQLite.md" }]
    },
    {
      text: "Postgresql",
      items: [
        { text: "基本使用", link: "/sql/postgres/基本使用.md" },
        { text: "分区表", link: "/sql/postgres/分区表.md" }
      ]
    }
  ],

  "/net/CSharp/": [
    {
      text: "C# 基础",
      items: [
        { text: "方法与数组", link: "/net/CSharp/CSharpBasic/方法与数组.md" },
        { text: "class类", link: "/net/CSharp/CSharpBasic/class类.md" },
        {
          text: "面向对象高级",
          link: "/net/CSharp/CSharpBasic/面向对象高级.md"
        }
      ]
    },
    {
      text: "C# 扩展",
      items: [
        { text: "字典", link: "/net/CSharp/CSharpSkill/字典.md" },
        { text: "元组", link: "/net/CSharp/CSharpSkill/元组.md" },
        { text: "模式匹配", link: "/net/CSharp/CSharpSkill/模式匹配.md" },
        { text: "线程安全类", link: "/net/CSharp/CSharpSkill/线程安全类.md" },
        { text: "HashTable", link: "/net/CSharp/CSharpSkill/HashTable.md" },
        {
          text: "检查null语法糖",
          link: "/net/CSharp/CSharpSkill/检查null语法糖.md"
        },
        {
          text: "序列化与反序列化",
          link: "/net/CSharp/CSharpSkill/序列化与反序列化.md"
        },
        {
          text: "迪卡斯杰拉算法",
          link: "/net/CSharp/CSharpSkill/迪卡斯杰拉算法.md"
        }
      ]
    }
  ],

  "/net/aspnetcore/": [
    {
      text: "ASP.net Core",
      items: [
        { text: "异步编程", link: "/net/aspnetcore/异步编程.md" },
        { text: "LINQ查询", link: "/net/aspnetcore/LINQ查询.md" },
        { text: "依赖注入", link: "/net/aspnetcore/依赖注入.md" },
        { text: "雪花Id", link: "/net/aspnetcore/雪花ID.md" },
        { text: "读取配置文件", link: "/net/aspnetcore/读取配置文件.md" }
      ]
    }
  ],

  "/net/microservice/": [
    { text: "微服务概念", link: "/net/microservice/微服务概念.md" },
    {
      text: "ORM框架",
      items: [{ text: "EFCore", link: "/net/microservice/orm/EFCore.md" }]
    },
    {
      text: "对象映射",
      items: [
        { text: "AutoMapper", link: "/net/microservice/mapper/AutoMapper.md" },
        { text: "Mapster", link: "/net/microservice/mapper/Mapster.md" }
      ]
    },
    {
      text: "任务调度",
      items: [
        { text: "QuartZ", link: "/net/microservice/scheduling/QuartZ.md" },
        { text: "Hangfire", link: "/net/microservice/scheduling/Hangfire.md" }
      ]
    },
    {
      text: "消息传递",
      items: [
        { text: "MediatR", link: "/net/microservice/eventBus/MediatR.md" },
        { text: "CAP", link: "/net/microservice/eventBus/Cap.md" }
      ]
    },
    {
      text: "MQ",
      items: [
        { text: "ActiveMQ", link: "/net/microservice/mq/ActiveMQ.md" },
        { text: "RabbitMQ", link: "/net/microservice/mq/RabbitMQ.md" }
      ]
    },
    {
      text: "注册发现",
      items: [
        { text: "consul", link: "/net/microservice/consul/Consul和nacos.md" }
      ]
    },
    {
      text: "缓存",
      items: [
        { text: "Redis", link: "/net/microservice/redis/Redis.md" },
        { text: "CSRedis", link: "/net/microservice/redis/CSRedis.md" }
      ]
    },
    {
      text: "日志",
      items: [
        { text: "Serilog", link: "/net/microservice/log/Serilog.md" },
        { text: "Nlog", link: "/net/microservice/log/Nlog.md" },
        { text: "Log4Net", link: "/net/microservice/log/Log4Net.md" }
      ]
    },
    {
      text: "依赖注入",
      items: [
        {
          text: "依赖注入",
          link: "/net/microservice/dependencyInjection/依赖注入.md"
        }
      ]
    },
    {
      text: "熔断降级",
      items: [{ text: "Polly", link: "/net/microservice/polly/Polly.md" }]
    },
    {
      text: "发布部署",
      items: [
        {
          text: "浏览器不支持WebGL",
          link: "/net/microservice/systemPublish/解决服务器不支持WebGL.md"
        }
      ]
    }
  ],

  "/net/linux": [
    {
      text: "基础使用",
      items: [
        { text: "常用命令", link: "/net/linux/常用命令.md" },
        { text: "系统命令", link: "/net/linux/系统命令.md" },
        { text: "用户和权限", link: "/net/linux/用户和权限.md" },
        { text: "vim", link: "/net/linux/vim.md" },
        { text: "固定IP地址", link: "/net/linux/linux固定IP地址.md" },
        { text: "yum设置阿里源", link: "/net/linux/yum设置阿里源.md" }
      ]
    },
    {
      text: "服务部署",
      items: [
        { text: "Redis部署", link: "/net/linux/redis部署.md" },
        { text: "Nginx部署", link: "/net/linux/nginx部署.md" },
        { text: "MySQL部署", link: "/net/linux/mySQL部署.md" },
        { text: "Docker部署", link: "/net/linux/docker部署.md" },
        { text: "Consul部署", link: "/net/linux/consul部署.md" },
        { text: "RabbitMQ部署", link: "/net/linux/rabbitMQ部署.md" },
        { text: "Postgres部署", link: "/net/linux/postgres部署.md" }
      ]
    },
    {
      text: "其他拓展",
      items: [{ text: "bat脚本", link: "/net/linux/bat脚本.md" }]
    }
  ],

  "/gis/mapbox/": [
    {
      text: "Mapbox",
      items: [
        { text: "快速入门", link: "/gis/mapbox/快速入门.md" },
        { text: "Style 样式", link: "/gis/mapbox/Style样式.md" },
        { text: "Map 方法", link: "/gis/mapbox/Map方法.md" },
        { text: "Map 事件", link: "/gis/mapbox/Map事件.md" },
        { text: "表达式", link: "/gis/mapbox/表达式.md" },
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
      text: "Cesium",
      items: [
        { text: "快速入门", link: "/gis/cesium/快速入门.md" },
        { text: "坐标系", link: "/gis/cesium/坐标系.md" },
        { text: "相机视角", link: "/gis/cesium/相机视角.md" },
        {
          text: "Entity 实体",
          link: "/gis/cesium/Entity实体.md",
          items: [
            { text: "Entity 管理", link: "/gis/cesium/Entity 管理.md" },
            { text: "Entity 拾取", link: "/gis/cesium/Entity 拾取.md" }
          ]
        },
        { text: "Primitive 图元", link: "/gis/cesium/Primitive图元.md" },
        {
          text: "加载三维数据",
          link: "/gis/cesium/加载三维数据.md",
          items: [
            { text: "影像数据", link: "/gis/cesium/影像地图.md" },
            { text: "地形数据", link: "/gis/cesium/地形数据.md" },
            { text: "矢量数据", link: "/gis/cesium/矢量数据.md" },
            { text: "三维模型", link: "/gis/cesium/三维模型.md" },
            { text: "三维瓦片", link: "/gis/cesium/三维瓦片.md" }
          ]
        },
        {
          text: "CallBackProperty",
          link: "/gis/cesium/CallBackProperty.md"
        },
        { text: "鼠标事件", link: "/gis/cesium/鼠标事件.md" },
        { text: "粒子系统", link: "/gis/cesium/粒子系统.md" }
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
  ],

  "/java/basic/": [
    {
      text: "Java基础",
      collapsed: true,
      items: [
        { text: "数据类型", link: "/java/basic/数据类型.md" },
        { text: "数组", link: "/java/basic/数组.md" },
        {
          text: "面向对象",
          link: "/java/basic/面向对象.md",
          items: [
            { text: "继承", link: "/java/basic/继承.md" },
            { text: "封装", link: "/java/basic/封装.md" },
            { text: "多态", link: "/java/basic/多态.md" },
            { text: "抽象类", link: "/java/basic/抽象类.md" },
            { text: "接口", link: "/java/basic/接口.md" },
            { text: "重写和重载", link: "/java/basic/重写和重载.md" },
            {
              text: "静态字段和静态方法",
              link: "/java/basic/静态字段和静态方法.md"
            }
          ]
        },
        { text: "枚举", link: "/java/basic/枚举.md" },
        { text: "注解", link: "/java/basic/注解.md" },
        { text: "单元测试", link: "/java/basic/JUnit单元测试.md" },
        { text: "包装类", link: "/java/basic/包装类.md" }
      ]
    },
    {
      text: "Java核心类",
      collapsed: false,
      items: [
        { text: "String", link: "/java/basic/String.md" },
        { text: "StringBuilder", link: "/java/basic/StringBuilder.md" },
        { text: "StringJoiner", link: "/java/basic/StringJoiner.md" },
        { text: "record", link: "/java/basic/record.md" },
        { text: "常用工具类", link: "/java/basic/常用工具类.md" }
      ]
    },
    {
      text: "异常处理",
      collapsed: false,
      items: [
        { text: "异常简介", link: "/java/basic/异常简介.md" },
        { text: "异常捕获", link: "/java/basic/异常捕获.md" },
        { text: "日志系统", link: "/java/basic/日志系统.md" }
      ]
    },
    {
      text: "Java高级",
      collapsed: false,
      items: [
        {
          text: "多线程基础",
          link: "/java/basic/多线程基础.md"
        },
        {
          text: "多线程调用",
          link: "/java/basic/多线程调用.md"
        },
        {
          text: "线程安全",
          link: "/java/basic/线程安全.md"
        }
      ]
    }
  ],

  "/c/": [{ text: "基础入门", link: "/c/基础入门.md" }]
}

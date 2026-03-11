export const sidebar = {
  // 前端模块 - CSS
  "/frontend/css/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        {
          text: "基础使用",
          link: "/frontend/css/1.基础使用.md",
        },
        {
          text: "Flex布局",
          link: "/frontend/css/2.flex布局.md",
        },
        {
          text: "Grid布局",
          link: "/frontend/css/3.grid布局.md",
        },
      ],
    },
    {
      text: "预处理语言",
      collapsed: false,
      items: [
        {
          text: "Less",
          link: "/frontend/css/4.Less.md",
        },
        {
          text: "Sass",
          link: "/frontend/css/5.Sass.md",
        },
        {
          text: "Tailwind CSS",
          link: "/frontend/css/6.TailwindCSS.md",
        },
        {
          text: "UnoCSS",
          link: "/frontend/css/7.UnoCSS.md",
        },
      ],
    },
    {
      text: "旁门小记",
      collapsed: false,
      items: [
        {
          text: "艺术字体",
          link: "/frontend/css/8.艺术字体.md",
        },
      ],
    },
  ],

  // 前端模块 - JavaScript
  "/frontend/javascript/": [
    {
      text: "基础知识",
      items: [
        {
          text: "嫌隙小记",
          link: "/frontend/javascript/1.嫌隙小记.md",
        },
        {
          text: "数组",
          link: "/frontend/javascript/2.数组.md",
        },
        {
          text: "对象",
          link: "/frontend/javascript/3.对象.md",
        },
        {
          text: "闭包",
          link: "/frontend/javascript/4.闭包.md",
        },
        {
          text: "Proxy",
          link: "/frontend/javascript/10.Proxy.md",
        },
        {
          text: "Reflect",
          link: "/frontend/javascript/11.Reflect.md",
        },
        {
          text: "Promise",
          link: "/frontend/javascript/6.Promise.md",
        },
        {
          text: "事件循环",
          link: "/frontend/javascript/5.事件循环.md",
        },
        {
          text: "防抖与节流",
          link: "/frontend/javascript/7.防抖与节流.md",
        },
        {
          text: "正则表达式",
          link: "/frontend/javascript/8.正则表达式.md",
        },
        {
          text: "Set和Map数据结构",
          link: "/frontend/javascript/9.Set和Map数据结构.md",
        },

      ],
    },
  ],

  // 前端模块 - Vue
  "/frontend/vue/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        {
          text: "组件传值",
          link: "/frontend/Vue/1.组件传值.md",
        },
        {
          text: "类型标注",
          link: "/frontend/Vue/2.类型标注.md",
        },
        {
          text: "自定义指令",
          link: "/frontend/Vue/3.自定义指令.md",
        },
        {
          text: "自定义插件",
          link: "/frontend/Vue/4.自定义插件.md",
        },
      ],
    },
  ],

  // 前端模块 - Pinia
  "/frontend/pinia/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        {
          text: "简介",
          link: "/frontend/pinia/1.简介.md",
        },
        {
          text: "定义Store",
          link: "/frontend/pinia/2.定义Store.md",
        },
        {
          text: "State",
          link: "/frontend/pinia/3.State.md",
        },
        {
          text: "Getter",
          link: "/frontend/pinia/4.Getter.md",
        },
        {
          text: "Actions",
          link: "/frontend/pinia/5.Actions.md",
        },
      ],
    },
  ],

  // Java模块 - Java8新特性
  "/backend/java/java-feature": [
    {
      text: "Java8 新特性",
      collapsed: false,
      items: [
        {
          text: "Collectors 收集器",
          link: "/backend/java/java-feature/java8/1.Collectors收集器.md",
        },
        {
          text: "Base64 编解码",
          link: "/backend/java/java-feature/java8/2.Base64编码解码.md",
        },
        {
          text: "Lambda 表达式",
          link: "/backend/java/java-feature/java8/3.Lambda表达式.md",
        },
        {
          text: "方法引用",
          link: "/backend/java/java-feature/java8/4.方法引用.md",
        },
        {
          text: "Optional 类",
          link: "/backend/java/java-feature/java8/5.Optional.md",
        },
        {
          text: "时间日期类",
          link: "/backend/java/java-feature/java8/6.时间日期类.md",
        },
        {
          text: "Stream 流",
          link: "/backend/java/java-feature/java8/7.Stream流.md",
        },
      ],
    },
    {
      text: "Java11 新特性",
      collapsed: false,
      items: [
        {
          text: "HttpClient",
          link: "/backend/java/java-feature/java11/1.HttpClient.md",
        },
        {
          text: "String 扩展方法",
          link: "/backend/java/java-feature/java11/2.String.md",
        },
      ],
    },
    {
      text: "Java17 新特性",
      collapsed: false,
      items: [
        {
          text: "密封类",
          link: "/backend/java/java-feature/java17/1.密封类.md",
        },
      ],
    },
    {
      text: "Java21 新特性",
      collapsed: true,
      items: [
        {
          text: "测试",
          link: "/a.md",
        },
      ],
    },
    {
      text: "Java25 新特性",
      collapsed: true,
      items: [
        {
          text: "测试",
          link: "/a.md",
        },
      ],
    },
  ],

  // Java模块 - 数据解构和算法
  "/backend/java/data-structure/": [
    {
      text: "基础数据结构篇",
      collapsed: false,
      items: [
        {
          text: "算法复杂度分析",
          link: "/backend/java/data-structure/basic-structure/1.算法复杂度分析.md",
        },
        {
          text: "二分查找",
          link: "/backend/java/data-structure/basic-structure/2.二分查找.md",
        },
        {
          text: "数组",
          link: "/backend/java/data-structure/basic-structure/3.数组.md",
        },
        {
          text: "链表",
          link: "/backend/java/data-structure/basic-structure/4.链表.md",
        },
        {
          text: "递归",
          link: "/backend/java/data-structure/basic-structure/5.递归.md",
        },
        {
          text: "队列",
          link: "/backend/java/data-structure/basic-structure/6.队列.md",
          items: [
            {
              text: "双端队列",
              link: "/backend/java/data-structure/basic-structure/10.双端队列.md",
            },
            {
              text: "优先级队列",
              link: "/backend/java/data-structure/basic-structure/11.优先级队列.md",
            },
            {
              text: "阻塞队列",
              link: "/backend/java/data-structure/basic-structure/12.阻塞队列.md",
            },
          ],
        },
        {
          text: "栈",
          link: "/backend/java/data-structure/basic-structure/7.栈.md",
        },
        {
          text: "堆",
          link: "/backend/java/data-structure/basic-structure/8.堆.md",
        },
        {
          text: "二叉树",
          link: "/backend/java/data-structure/basic-structure/9.二叉树.md",
        },
      ],
    },
    {
      text: "基础算法篇",
      collapsed: false,
      items: [
        {
          text: "查找算法",
          items: [
            {
              text: "二叉搜索树",
              link: "/backend/java/data-structure/basic-algorithm/1.二叉搜索树.md",
            },
            {
              text: "AVL 树",
              link: "/backend/java/data-structure/basic-algorithm/2.AVL树.md",
            },
            {
              text: "红黑树",
              link: "/backend/java/data-structure/basic-algorithm/3.红黑树.md",
            },
            {
              text: "B 树",
              link: "/backend/java/data-structure/basic-algorithm/4.B树.md",
            },
            {
              text: "跳表",
              link: "/backend/java/data-structure/basic-algorithm/5.跳表.md",
            },
            {
              text: "散列表",
              link: "/backend/java/data-structure/basic-algorithm/6.散列表.md",
            },
          ],
        },
        {
          text: "排序算法",
          items: [
            {
              text: "插入排序",
              link: "/backend/java/data-structure/basic-algorithm/7.插入排序.md",
            },
            {
              text: "希尔排序",
              link: "/backend/java/data-structure/basic-algorithm/8.希尔排序.md",
            },
            {
              text: "快速排序",
              link: "/backend/java/data-structure/basic-algorithm/9.快速排序.md",
            },
            {
              text: "归并排序",
              link: "/backend/java/data-structure/basic-algorithm/10.归并排序.md",
            },
            {
              text: "堆排序",
              link: "/backend/java/data-structure/basic-algorithm/11.堆排序.md",
            },
            {
              text: "计数排序",
              link: "/backend/java/data-structure/basic-algorithm/12.计数排序.md",
            },
            {
              text: "桶排序",
              link: "/backend/java/data-structure/basic-algorithm/13.桶排序.md",
            },
          ],
        },
      ],
    },
    {
      text: "进阶算法篇",
      collapsed: true,
      items: [
        {
          text: "进阶算法",
          items: [
            {
              text: "图",
              items: [
                {
                  text: "拓扑排序",
                  link: "",
                },
                {
                  text: "Dijkstra",
                  link: "",
                },
              ],
            },
          ],
        },
        {
          text: "算法思想",
          items: [
            {
              text: "贪心算法",
              link: "",
            },
            {
              text: "回溯算法",
              link: "",
            },
            {
              text: "动态规划算法",
              link: "",
            },
            {
              text: "分治算法",
              link: "",
            },
          ],
        },
      ],
    },
  ],

  // Java模块 - 服务注册与发现
  "/backend/java/discovery/": [
    {
      text: "Consul",
      collapsed: false,
      items: [
        {
          text: "安装",
          link: "/backend/java/discovery/consul/1.注册中心.md",
        },
      ],
    },
    {
      text: "Nacos",
      collapsed: false,
      items: [
        {
          text: "安装",
          link: "/backend/java/discovery/nacos/1.注册中心.md",
        },
      ],
    },
  ],

  // GIS模块 - Cesium
  "/gis/cesium/": [
    {
      text: "基础知识",
      items: [
        {
          text: "基础使用",
          link: "/gis/Cesium/1.基础使用.md",
        },
        {
          text: "坐标系统",
          link: "/gis/cesium/2.坐标系统.md",
        },
        {
          text: "相机视角",
          link: "/gis/cesium/3.相机视角.md",
        },
        {
          text: "地图事件",
          link: "/gis/cesium/4.地图事件.md",
        },
        {
          text: "加载影像图层",
          link: "/gis/cesium/5.加载影像图层.md",
        },
        {
          text: "加载地形图层",
          link: "/gis/cesium/6.加载地形图层.md",
        },
        {
          text: "加载矢量数据",
          link: "/gis/cesium/7.加载矢量数据.md",
        },
        {
          text: "加载三维模型",
          link: "/gis/cesium/8.加载三维模型.md",
        },
        {
          text: "加载三维瓦片",
          link: "/gis/cesium/9.加载三维瓦片.md",
        },
        {
          text: "绘制 Entity 实体",
          link: "/gis/cesium/10.绘制Entity实体.md",
        },
        {
          text: "绘制 Primitive 图元",
          link: "/gis/cesium/11.绘制Primitive图元.md",
        },
      ],
    },
    {
      text: "进阶案例",
      items: [
        {
          text: "导航插件",
          link: "/gis/cesium/17.导航插件.md",
        },
        {
          text: "飞行漫游",
          link: "/gis/cesium/12.飞行漫游.md",
        },
        {
          text: "自然天气",
          link: "/gis/cesium/13.自然天气.md",
        },
        {
          text: "粒子系统",
          link: "/gis/cesium/14.粒子系统.md",
        },
        {
          text: "热力图",
          link: "/gis/cesium/15.热力图.md",
        },
        {
          text: "风场图",
          link: "/gis/cesium/16.风场图.md",
        },
        {
          text: "场景截图和录屏",
          link: "/gis/cesium/18.场景截图和录屏.md",
        },
      ],
    },
  ],

  // GIS模块-Mars3D
  "/gis/mars3d/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        {
          text: "基础入门",
          link: "/gis/mars3d/1.基础入门.md",
        },
        {
          text: "三维场景",
          link: "/gis/mars3d/2.三维场景.md",
        },
        {
          text: "飞行视角",
          link: "/gis/mars3d/3.飞行视角.md",
        },
        {
          text: "三维地形",
          link: "/gis/mars3d/4.三维地形.md",
        },
      ],
    },
  ],

  // GIS模块 - WebGL
  "/gis/webgl/": [
    {
      text: "基础知识",
      collapsed: false,
      items: [
        {
          text: "WebGL概述",
          link: "/gis/webgl/1.WebGL概述.md",
        },
        {
          text: "坐标系",
          link: "/gis/webgl/2.坐标系.md",
        },
        {
          text: "着色器",
          link: "/gis/webgl/3.着色器.md",
          items: [
            {
              text: "为attribute变量赋值",
              link: "/gis/webgl/3.1.为attribute变量赋值.md",
            },
            {
              text: "为uniform变量赋值",
              link: "/gis/webgl/3.2.为uniform变量赋值.md",
            },
          ],
        },
        {
          text: "缓冲区对象",
          link: "/gis/webgl/4.缓冲区对象.md",
        },
        {
          text: "移动、旋转和缩放",
          link: "/gis/webgl/5.移动、旋转和缩放.md",
        },
        {
          text: "高级变换和动画效果",
          link: "/gis/webgl/6.高级变换和动画效果.md",
        },
      ],
    },
  ],
};

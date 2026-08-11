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
	  text: "基础使用",
	  collapsed: false,
	  items: [
		{ text: "基本数据类型", link: "/frontend/javascript/基本数据类型.md" },
		{ text: "数组", link: "/frontend/javascript/数组.md" },
		{ text: "对象", link: "/frontend/javascript/对象.md" },
		{ text: "闭包", link: "/frontend/javascript/闭包.md" },
		{ text: "ES6新特性", link: "/frontend/javascript/ES6新特性.md" },
		{ text: "this关键字", link: "/frontend/javascript/this关键字.md" },
		{ text: "防抖与节流", link: "/frontend/javascript/防抖与节流.md" },
		{ text: "回流与重绘", link: "/frontend/javascript/回流与重绘.md" },
		{ text: "原型与原型链", link: "/frontend/javascript/原型与原型链.md" },
		{ text: "Map结构", link: "/frontend/javascript/Map结构.md" },
		{ text: "Set结构", link: "/frontend/javascript/Set结构.md" },
		{ text: "Proxy", link: "/frontend/javascript/Proxy.md" },
		{ text: "Reflect", link: "/frontend/javascript/Reflect.md" },
		{ text: "Promise", link: "/frontend/javascript/Promise.md" },
		{ text: "正则表达式", link: "/frontend/javascript/正则表达式.md" },
		{ text: "模块化原理", link: "/frontend/javascript/模块化原理.md" },
		{ text: "发布订阅模式", link: "/frontend/javascript/发布订阅模式.md" },
		{ text: "浅拷贝与深拷贝", link: "/frontend/javascript/浅拷贝与深拷贝.md" },
		{ text: "JWT", link: "/frontend/javascript/JWT.md" },
	  ],
	},
	{
	  text: "浏览器模型",
	  collapsed: false,
	  items: [
		{ text: "window对象", link: "/frontend/javascript/window对象.md" },
		{ text: "URL对象", link: "/frontend/javascript/URL对象.md" },
		{ text: "事件对象", link: "/frontend/javascript/事件对象.md" },
		{ text: "字节流对象", link: "/frontend/javascript/字节流对象.md" },
		{ text: "FormData对象", link: "/frontend/javascript/FormData对象.md" },
		{ text: "同源策略与CORS跨域", link: "/frontend/javascript/同源策略与CORS跨域.md" },
		{ text: "IndexedDB", link: "/frontend/javascript/IndexedDB.md" },
		{ text: "Web Worker", link: "/frontend/javascript/Web Worker.md" },
	  ],
	},
	{
	  text: "高级进阶",
	  collapsed: false,
	  items: [
		{ text: "事件循环", link: "/frontend/javascript/事件循环.md" },
		{ text: "高阶函数", link: "/frontend/javascript/高阶函数.md" },
		{ text: "函数柯里化", link: "/frontend/javascript/函数柯里化.md" },
		{ text: "函数记忆化", link: "/frontend/javascript/函数记忆化.md" },
		{ text: "线程与进程", link: "/frontend/javascript/线程与进程.md" },
		{ text: "WebAssembly", link: "/frontend/javascript/WebAssembly.md" },
		{ text: "V8渲染引擎原理", link: "/frontend/javascript/V8渲染引擎原理.md" },
	  ],
	},
  ],

  // 前端模块 - TypeScript
  "/frontend/typescript/": [
	{
	  text: "基础使用",
	  collapsed: false,
	  items: [
		{ text: "基本类型", link: "/frontend/typescript/基本类型.md" },
		{ text: "字面量类型", link: "/frontend/typescript/字面量类型.md" },
		{ text: "数组与元组", link: "/frontend/typescript/数组与元组.md" },
		{ text: "枚举", link: "/frontend/typescript/枚举.md" },
		{ text: "类型别名", link: "/frontend/typescript/类型别名.md" },
		{ text: "接口", link: "/frontend/typescript/接口.md" },
		{ text: "泛型", link: "/frontend/typescript/泛型.md" },
	  ],
	},
	{
	  text: "进阶使用",
	  collapsed: false,
	  items: [
		{ text: "类型断言", link: "/frontend/typescript/类型断言.md" },
		{ text: "类型守卫", link: "/frontend/typescript/类型守卫.md" },
		{ text: "类型收窄", link: "/frontend/typescript/类型收窄.md" },
		{ text: "类型映射", link: "/frontend/typescript/类型映射.md" },
		{ text: "类型运算符", link: "/frontend/typescript/类型运算符.md" },
		{ text: "特殊类型", link: "/frontend/typescript/特殊类型.md" },
		{ text: "联合类型", link: "/frontend/typescript/联合类型.md" },
		{ text: "交叉类型", link: "/frontend/typescript/交叉类型.md" },
		{ text: "条件类型", link: "/frontend/typescript/条件类型.md" },
		{ text: "索引类型", link: "/frontend/typescript/索引类型.md" },
		{ text: "递归类型", link: "/frontend/typescript/递归类型.md" },
		{ text: "类的类型", link: "/frontend/typescript/类的类型.md" },
		{ text: "工具类型", link: "/frontend/typescript/工具类型.md" },
		{ text: "协变与逆变", link: "/frontend/typescript/协变与逆变.md" },
		{ text: "模块", link: "/frontend/typescript/模块.md" },
		{ text: "装饰器", link: "/frontend/typescript/装饰器.md" },
		{ text: "命名空间", link: "/frontend/typescript/命名空间.md" },
		{ text: "infer关键字", link: "/frontend/typescript/infer关键字.md" },
		{ text: "注释指令", link: "/frontend/typescript/注释指令.md" },
	  ],
	},
	{
	  text: "工程化",
	  collapsed: false,
	  items: [
		{ text: "tsconfig.json", link: "/frontend/typescript/tsconfig.json.md" },
		{ text: "类型声明文件", link: "/frontend/typescript/类型声明文件.md" },
	  ],
	},
  ],

  // 前端模块 - Vue
  "/frontend/vue/": [
	{
	  text: "基础使用",
	  collapsed: false,
	  items: [
		{ text: "ref家族", link: "/frontend/vue/ref家族.md" },
		{ text: "组件传值", link: "/frontend/vue/组件传值.md" },
		{ text: "属性透传", link: "/frontend/vue/属性透传.md" },
		{ text: "类型标注", link: "/frontend/vue/类型标注.md" },
		{ text: "插槽", link: "/frontend/vue/插槽.md" },
		{ text: "侦听器", link: "/frontend/vue/侦听器.md" },
		{ text: "计算属性", link: "/frontend/vue/计算属性.md" },
		{ text: "h函数", link: "/frontend/vue/h函数.md" },
		{ text: "render函数", link: "/frontend/vue/render函数.md" },
		{ text: "Hooks函数", link: "/frontend/vue/Hooks函数.md" },
		{ text: "JSX语法", link: "/frontend/vue/JSX语法.md" },
		{ text: "异步组件", link: "/frontend/vue/异步组件.md" },
		{ text: "动态组件", link: "/frontend/vue/动态组件.md" },
		{ text: "自定义指令", link: "/frontend/Vue/自定义指令.md" },
		{ text: "自定义插件", link: "/frontend/Vue/自定义插件.md" },
		{ text: "KeepAlive", link: "/frontend/vue/KeepAlive.md" },
		{ text: "Transition", link: "/frontend/vue/Transition.md" },
	  ],
	},
	{
	  text: "高级进阶",
	  collapsed: false,
	  items: [
		{ text: "响应式原理", link: "/frontend/vue/响应式原理.md" },
		{ text: "虚拟DOM与Diff算法", link: "/frontend/vue/虚拟DOM与Diff算法.md" },
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

  // 前端模块 - 项目协作
  "/frontend/monorepo/": [
	{
	  text: "基础知识",
	  collapsed: false,
	  items: [
		{
		  text: "Monorepo介绍",
		  link: "/frontend/monorepo/基础简介.md",
		},
	  ],
	},
  ],

  // 前端模块 - 微前端
  "/frontend/micro-frontend/": [
	{
	  text: "基础知识",
	  collapsed: false,
	  items: [
		{ text: "iframe", link: "/frontend/micro-frontend/iframe.md" },
		{ text: "single-spa", link: "/frontend/micro-frontend/single-spa.md" },
		{ text: "无界", link: "/frontend/micro-frontend/无界.md" },
		{ text: "qiankun", link: "/frontend/micro-frontend/qiankun.md" },
		{ text: "garfish", link: "/frontend/micro-frontend/garfish.md" },
	  ],
	},
  ],

  // Java模块 - JavaEE
  "/backend/java/javaee/": [
	{
	  text: "基础知识",
	  collapsed: false,
	  items: [
		{ text: "数据类型", link: "/backend/java/javaee/数据类型.md" },
		{ text: "流程控制", link: "/backend/java/javaee/流程控制.md" },
		{ text: "数组", link: "/backend/java/javaee/数组.md" },
		{ text: "包装类", link: "/backend/java/javaee/包装类.md" },
		{ text: "String 类", link: "/backend/java/javaee/String类.md" },
		{ text: "日期时间", link: "/backend/java/javaee/日期时间.md" },
		{ text: "异常处理", link: "/backend/java/javaee/异常处理.md" },
		{ text: "正则表达式", link: "/backend/java/javaee/正则表达式.md" },
		{ text: "Lambda表达式", link: "/backend/java/javaee/Lambda表达式.md" },
		{ text: "方法引用", link: "/backend/java/javaee/方法引用.md" },
	  ],
	},
	{
	  text: "面向对象",
	  collapsed: true,
	  items: [
		{ text: "继承", link: "/backend/java/javaee/继承.md" },
		{ text: "封装", link: "/backend/java/javaee/封装.md" },
		{ text: "多态", link: "/backend/java/javaee/多态.md" },
		{ text: "抽象类", link: "/backend/java/javaee/抽象类.md" },
		{ text: "泛型", link: "/backend/java/javaee/泛型.md" },
		{ text: "接口", link: "/backend/java/javaee/接口.md" },
		{ text: "枚举", link: "/backend/java/javaee/枚举.md" },
	  ],
	},
	{
	  text: "集合框架",
	  collapsed: true,
	  items: [
		{ text: "集合简介", link: "/backend/java/javaee/集合简介.md" },
		{ text: "Iterator 迭代器接口", link: "/backend/java/javaee/Iterator.md" },
		{ text: "Collection 集合根接口", link: "/backend/java/javaee/Collection.md" },
		{ text: "List 集合", link: "/backend/java/javaee/List.md" },
		{ text: "Set 集合", link: "/backend/java/javaee/Set.md" },
		{ text: "Queue 队列", link: "/backend/java/javaee/Queue.md" },
		{ text: "Map 映射", link: "/backend/java/javaee/Map.md" },
		{ text: "集合工具类", link: "/backend/java/javaee/集合工具类.md" },
	  ],
	},
	{
	  text: "高级进阶",
	  collapsed: true,
	  items: [
		{ text: "反射", link: "/backend/java/javaee/反射.md" },
		{ text: "Stream 流", link: "/backend/java/javaee/Stream流.md" },
		{ text: "File类和Path类", link: "/backend/java/javaee/File类和Path类.md" },
		{ text: "IO 流", link: "/backend/java/javaee/IO流.md" },
		{ text: "多线程", link: "/backend/java/javaee/多线程.md" },
		{ text: "网络编程", link: "/backend/java/javaee/网络编程.md" },
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
		  text: "Base64 编码解码",
		  link: "/backend/java/java-feature/java8/2.Base64编码解码.md",
		},
		{
		  text: "Optional 工具类",
		  link: "/backend/java/java-feature/java8/3.Optional工具类.md",
		},
	  ],
	},
	{
	  text: "Java11 新特性",
	  collapsed: true,
	  items: [
		{
		  text: "HttpClient",
		  link: "/backend/java/java-feature/java11/1.HttpClient.md",
		},
		{
		  text: "String扩展",
		  link: "/backend/java/java-feature/java11/2.String扩展.md",
		},
	  ],
	},
	{
	  text: "Java17 新特性",
	  collapsed: true,
	  items: [
		{
		  text: "密封类",
		  link: "/backend/java/java-feature/java17/密封类.md",
		},
	  ],
	},
	{
	  text: "Java21 新特性",
	  collapsed: true,
	  items: [
		{
		  text: "Record模式",
		  link: "/backend/java/java-feature/java21/Record模式.md",
		},
		{
		  text: "Switch模式匹配",
		  link: "/backend/java/java-feature/java21/Switch模式匹配.md",
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

  "/backend/java/mybatis/": [
	{
	  text: "MyBatis",
	  collapsed: false,
	  items: [
		{
		  text: "基础使用",
		  link: "/backend/java/mybatis/core/基础使用.md",
		},
	  ],
	},
	{
	  text: "MyBatis Plus",
	  collapsed: false,
	  items: [
		{
		  text: "基础使用",
		  link: "/backend/java/mybatis/plus/基础使用.md",
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

  // GIS模块 - 基础知识
  "/gis/knowledge/": [
	{
	  text: "基础知识",
	  items: [
		{ text: "地理坐标系", link: "/gis/knowledge/地理坐标系.md" },
		{ text: "投影坐标系", link: "/gis/knowledge/投影坐标系.md" },
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
		  link: "/gis/cesium/基础使用.md",
		},
		{
		  text: "坐标系统",
		  link: "/gis/cesium/坐标系统.md",
		},
		{
		  text: "相机视角",
		  link: "/gis/cesium/相机视角.md",
		},
		{
		  text: "地图事件",
		  link: "/gis/cesium/地图事件.md",
		},
		{
		  text: "加载影像图层",
		  link: "/gis/cesium/加载影像图层.md",
		},
		{
		  text: "加载地形图层",
		  link: "/gis/cesium/加载地形图层.md",
		},
		{
		  text: "加载矢量数据",
		  link: "/gis/cesium/加载矢量数据.md",
		},
		{
		  text: "加载三维模型",
		  link: "/gis/cesium/加载三维模型.md",
		},
		{
		  text: "加载三维瓦片",
		  link: "/gis/cesium/加载三维瓦片.md",
		},
		{
		  text: "Entity实体",
		  collapsed: false,
		  items: [
			{
			  text: "Material材质",
			  link: "/gis/cesium/Material材质.md",
			},
			{
			  text: "Entity绘制",
			  link: "/gis/cesium/Entity绘制.md",
			},
			{
			  text: "Entity管理",
			  link: "/gis/cesium/Entity管理.md",
			},
		  ],
		},
		{
		  text: "Primitive图元",
		  collapsed: false,
		  items: [
			{
			  text: "Appearance外观",
			  link: "/gis/cesium/Appearance外观.md",
			},
			{
			  text: "Primitive绘制",
			  link: "/gis/cesium/Primitive绘制.md",
			},
			{
			  text: "GroundPrimitive绘制",
			  link: "/gis/cesium/GroundPrimitive绘制.md",
			},
			{
			  text: "Primitive管理",
			  link: "/gis/cesium/Primitive管理.md",
			},
		  ],
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

  // GIS模块-GLSL
  "/gis/glsl/": [
	{
	  text: "基础知识",
	  collapsed: false,
	  items: [
		{
		  text: "基础变量",
		  link: "/gis/glsl/基础变量.md",
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

  "/backend/python/basic/": [
	{
	  text: "基础知识",
	  items: [
		{ text: "基础入门", link: "/backend/python/basic/基础入门.md" },
	  ],
	},
  ],

  // 服务端模块 - Docker
  "/devops/docker/": [
	{
	  text: "基础知识",
	  items: [
		{
		  text: "镜像与容器",
		  link: "/devops/docker/1.镜像与容器.md",
		},
		{
		  text: "目录挂载",
		  link: "/devops/docker/2.目录挂载.md",
		},
		{
		  text: "自定义网络",
		  link: "/devops/docker/3.自定义网络.md",
		},
		{
		  text: "Dockerfile",
		  link: "/devops/docker/4.Dockerfile.md",
		},
		{
		  text: "DockerCompose",
		  link: "/devops/docker/5.DockerCompose.md",
		},
	  ],
	},
	{
	  text: "服务部署手册",
	  items: [
		{
		  text: "安装 Docker",
		  link: "/devops/docker/11.安装Docker.md",
		},
		{
		  text: "安装 Nginx",
		  link: "/devops/docker/6.安装Nginx.md",
		},
		{
		  text: "安装 Redis",
		  link: "/devops/docker/7.安装Redis.md",
		},
		{
		  text: "安装 MySQL",
		  link: "/devops/docker/8.安装MySQL.md",
		},
		{
		  text: "安装 PostgreSQL",
		  link: "/devops/docker/9.安装PostgreSQL.md",
		},
		{
		  text: "安装 Portainer",
		  link: "/devops/docker/10.安装Portainer.md",
		},
		{
		  text: "安装 Nacos",
		  link: "/devops/docker/12.安装Nacos.md",
		},
		{
		  text: "安装 Consul",
		  link: "/devops/docker/13.安装Consul.md",
		},
		{
		  text: "安装 RabbitMQ",
		  link: "/devops/docker/14.安装RabbitMQ.md",
		},
		{
		  text: "安装 Elasticsearch",
		  link: "/devops/docker/15.安装Elasticsearch.md",
		},
		{
		  text: "安装 MinIO",
		  link: "/devops/docker/16.安装MinIO.md",
		},
		{
		  text: "安装 kkFileView",
		  link: "/devops/docker/17.安装kkFileView.md",
		},
	  ],
	},
  ],

  // AI智能体 - LangChain
  "/ai/langChain/": [
	{
	  text: "基础知识",
	  items: [
		{ text: "基础使用", link: "/ai/langChain/基础使用.md" },
	  ],
	},
  ],
};

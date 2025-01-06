/**
 * 顶部导航条相关
 */
export const nav = [
  { text: "首页", link: "/" },

  {
    text: "前端",
    items: [
      { text: "CSS", link: "/frontend/css/css.md" },
      { text: "Javascript", link: "/frontend/javascript/Javascript.md" },
      { text: "Git", link: "/frontend/git/分支分类.md" },
      { text: "Node.js", link: "/frontend/node/包管理工具.md" },
      { text: "其他", link: "/frontend/other/Postman全局配置token.md" }
    ]
  },

  {
    text: "vue",
    items: [
      { text: "typascript", link: "/frontend/typescript/TypeScript.md" },
      {
        text: "vue",
        items: [{ text: "Vue3", link: "/frontend/vue/vue3.md" }]
      }
    ]
  },

  {
    text: "数据库",
    items: [
      { text: "MySQL", link: "" },
      { text: "PostgreSQL", link: "" },
      { text: "SQLite", link: "" }
    ]
  },

  {
    text: "Linux",
    link: ""
  },
  {
    text: "C#",
    items: [
      { text: "C#基础", link: "" },
      { text: "WebAPI", link: "" },
      { text: "微服务模块", link: "" }
    ]
  },

  {
    text: "Java",
    items: [
      {
        text: "基础内容",
        items: [{ text: "Java基础", link: "" }]
      }
    ]
  },

  {
    text: "GIS",
    items: [
      {
        text: "二维地图",
        items: [
          { text: "Mapbox", link: "" },
          { text: "Leaflet", link: "" },
          { text: "OpenLayers", link: "" }
          // { text: "ArcGIS API", link: "" },
        ]
      },
      {
        text: "三维地图",
        items: [
          { text: "WebGL", link: "" },
          { text: "Cesium", link: "" },
          { text: "Three.js", link: "" }
        ]
      },
      {
        text: "地图发布",
        items: [{ text: "GeoServer", link: "" }]
      }
    ]
  }

  // { text: "Vue", link: "/vue3/vue3.md" },

  // { text: "JavaScript", link: "/javascript/Javascript.md" },

  // { text: "Vue3", link: "/vue3/vue3.md" },

  // { text: "数据库", link: "/sql/mysql/基本SQL语句.md" },

  // {
  //   text: ".NET",
  //   items: [
  //     { text: "C# 基础", link: "/net/CSharp/CSharpBasic/方法与数组.md" },
  //     { text: "WebAPI", link: "/net/aspnetcore/异步编程.md" },
  //     { text: "微服务", link: "/net/microservice/微服务概念.md" },
  //     { text: "Linux", link: "/net/linux/软件安装.md" }
  //   ]
  // },

  // {
  //   text: "Java",
  //   items: [
  //     {
  //       text: "核心知识",
  //       items: [{ text: "Java基础", link: "/java/basic/数据类型.md" }]
  //     }
  //   ]
  // },

  // {
  //   text: "C语言",
  //   items: [{ text: "C语言基础", link: "/c/基础入门.md" }]
  // },

  // {
  //   text: "GIS",
  //   items: [
  //     { text: "Mapbox", link: "/gis/mapbox/快速入门.md" },
  //     { text: "Cesium", link: "/gis/cesium/快速入门.md" },
  //     { text: "Leaflet", link: "/gis/leaflet/leaflet.md" },
  //     { text: "OpenLayers", link: "/gis/openlayers/快速入门.md" },
  //     { text: "ArcGIS API", link: "/gis/arcgis-js-api/index.md" },
  //     { text: "WebGL", link: "/gis/webgl/基础入门.md" },
  //     { text: "Three.js", link: "/gis/three/基础入门.md" },
  //     { text: "GeoServer", link: "/gis/geoserver/环境安装.md" }
  //   ]
  // }
]

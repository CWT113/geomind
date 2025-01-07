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
      { text: "typescript", link: "/frontend/typescript/TypeScript.md" },
      {
        text: "vue",
        items: [{ text: "Vue3", link: "/frontend/vue/vue3.md" }]
      }
    ]
  },

  {
    text: "数据库",
    items: [
      { text: "MySQL", link: "/database/mysql/基本SQL语句.md" },
      { text: "PostgreSQL", link: "/database/postgres/基本使用.md" },
      { text: "SQLite", link: "/database/sqlite/SQLite.md" }
    ]
  },

  {
    text: "Linux",
    link: "/operations/linux/软件安装.md"
  },

  {
    text: "C#",
    items: [
      { text: "C#基础", link: "/backend/net/CSharp/CSharpBasic/class类.md" },
      { text: "WebAPI", link: "/backend/net/webapi/雪花ID.md" },
      { text: "微服务模块", link: "/backend/net/microservice/微服务概念.md" }
    ]
  },

  {
    text: "Java",
    items: [
      {
        text: "基础内容",
        items: [{ text: "Java基础", link: "/backend/java/basic/数据类型.md" }]
      }
    ]
  },

  {
    text: "GIS",
    items: [
      {
        text: "二维地图",
        items: [
          { text: "Mapbox", link: "/gis/mapbox/快速入门.md" },
          { text: "Leaflet", link: "/gis/leaflet/leaflet.md" },
          { text: "OpenLayers", link: "/gis/openlayers/快速入门.md" }
          // { text: "ArcGIS API", link: "" },
        ]
      },
      {
        text: "三维地图",
        items: [
          { text: "WebGL", link: "/gis/webgl/基础入门.md" },
          { text: "Cesium", link: "/gis/cesium/快速入门.md" },
          { text: "Three.js", link: "/gis/three/基础入门.md" }
        ]
      },
      {
        text: "地图部署",
        items: [{ text: "GeoServer", link: "/gis/geoserver/环境安装.md" }]
      }
    ]
  }
];

/**
 * 顶部导航条相关
 */
export const nav = [
  { text: "首页", link: "/" },

  { text: "JavaScript", link: "/javascript/Javascript.md" },

  { text: "Vue3", link: "/vue3/vue3.md" },

  { text: "数据库", link: "/sql/mysql/基本SQL语句.md" },

  {
    text: ".NET",
    items: [
      { text: "C# 基础", link: "/net/CSharp/CSharpBasic/方法与数组.md" },
      { text: "WebAPI", link: "/net/aspnetcore/异步编程.md" },
      { text: "微服务", link: "/net/microservice/微服务概念.md" },
      { text: "Linux", link: "/net/linux/软件安装.md" }
    ]
  },

  {
    text: "Java",
    items: [
      {
        text: "核心知识",
        items: [
          { text: "Java基础", link: "/java/basic/数据类型.md" },
          { text: "JDBC", link: "/java/" },
          { text: "JavaWeb", link: "/java/" },
          { text: "JUC", link: "/java/" },
          { text: "JVM", link: "/java/" },
        ]
      },
      {
        text: "SSM",
        items: [
          { text: "Spring6", link: "/java/" },
          { text: "SpringMVC", link: "/java/" },
          { text: "MyBatis", link: "/java/" },
        ]
      },
      {
        text: "分布式和微服务",
        items: [
          { text: "SpringBoot3", link: "/java/" },
          { text: "SpringCloud", link: "/java/" },
          { text: "Spring Security", link: "/java/" },
          { text: "Maven", link: "/java/" },
          { text: "Redis", link: "/java/" },
          { text: "消息中间件", link: "/java/" },
        ]
      },
      {
        text: "运维",
        items: [
          { text: "Linux", link: "/java/" },
          { text: "Docker", link: "/java/" },
          { text: "Nginx", link: "/java/" },
          { text: "K8S", link: "/java/" },
        ]
      }
    ]
  },

  {
    text: "C语言",
    items: [{ text: "C语言基础", link: "/c/基础入门.md" }]
  },

  {
    text: "GIS",
    items: [
      { text: "Mapbox", link: "/gis/mapbox/快速入门.md" },
      { text: "Cesium", link: "/gis/cesium/快速入门.md" },
      { text: "Leaflet", link: "/gis/leaflet/leaflet.md" },
      { text: "OpenLayers", link: "/gis/openlayers/快速入门.md" },
      { text: "ArcGIS API", link: "/gis/arcgis-js-api/index.md" },
      { text: "WebGL", link: "/gis/webgl/基础入门.md" },
      { text: "Three.js", link: "/gis/three/基础入门.md" },
      { text: "GeoServer", link: "/gis/geoserver/环境安装.md" }
    ]
  }
]

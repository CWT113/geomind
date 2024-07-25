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
      { text: "ASP.NET Core", link: "/net/AspNetCore/异步编程.md" },
      { text: ".NET 微服务", link: "/net/Microservice/微服务概念.md" },
      { text: "Linux", link: "/net/Linux/软件安装.md" }
    ]
  },

  {
    text: "Java",
    items: [{ text: "Java基础", link: "/java/basic/数据类型.md" }]
  },

  // {
  //   text: "C语言",
  //   items: [{ text: "C语言基础", link: "/c/基础入门.md" }]
  // },

  {
    text: "GIS",
    items: [
      { text: "Mapbox", link: "/gis/mapbox/快速入门.md" },
      { text: "Cesium", link: "/gis/cesium/快速入门.md" },
      { text: "Leaflet", link: "/gis/leaflet/leaflet.md" },
      { text: "OpenLayers", link: "/gis/openlayers/快速入门.md" },
      { text: "Three.js", link: "/gis/three/基础入门.md" },
      { text: "GeoServer", link: "/gis/geoserver/环境安装.md" }
    ]
  }
]

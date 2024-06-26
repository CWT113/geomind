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
      { text: "C# 基础", link: "/net/csharp/basicCsharp/方法与数组.md" },
      { text: ".NET Core", link: "/net/aspnetcore/基本使用.md" },
      { text: ".NET 微服务", link: "/net/microservice/orm/EFCore.md" },
      { text: "Linux", link: "/net/linux/软件安装.md" }
    ]
  },

  {
    text: "Java",
    items: [{ text: "Java基础", link: "/java/basic/数据类型.md" }]
  },

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

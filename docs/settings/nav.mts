/**
 * 顶部导航条相关
 */
export const nav = [
  { text: "首页", link: "/" },

  {
    text: "前端",
    items: [
      { text: "JavaScript", link: "/fontend/javascript/Javascript.md" },
      { text: "Vue", link: "/fontend/vue3/vue3.md" }
    ]
  },

  {
    text: "C#",
    link: "/csharp/basicCsharp/面向过程.md"
  },

  {
    text: "数据库",
    link: "/sql/mysql/基本SQL语句.md"
  },

  {
    text: ".NET微服务",
    link: "/net/orm/EFCore.md"
  },

  {
    text: "Java",
    items: [{ text: "基础语法", link: "/java/basic/java基础.md" }]
  },

  {
    text: "GIS",
    items: [
      { text: "Mapbox", link: "/gis/mapbox/快速入门.md" },
      { text: "Cesium", link: "/gis/cesium/快速入门.md" },
      { text: "OpenLayers", link: "/gis/openlayers/快速入门.md" }
    ]
  }
]

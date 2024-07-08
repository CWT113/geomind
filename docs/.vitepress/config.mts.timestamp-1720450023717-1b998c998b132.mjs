// docs/.vitepress/config.mts
import { defineConfig } from "file:///E:/Github.Projects/Alikaid/node_modules/.pnpm/vitepress@1.0.0-rc.36_@algolia+client-search@4.22.1_search-insights@2.13.0/node_modules/vitepress/dist/node/index.js";

// docs/settings/nav.mts
var nav = [
  { text: "\u9996\u9875", link: "/" },
  { text: "JavaScript", link: "/javascript/Javascript.md" },
  { text: "Vue3", link: "/vue3/vue3.md" },
  { text: "\u6570\u636E\u5E93", link: "/sql/mysql/\u57FA\u672CSQL\u8BED\u53E5.md" },
  {
    text: ".NET",
    items: [
      { text: "C# \u57FA\u7840", link: "/net/csharp/basicCsharp/\u65B9\u6CD5\u4E0E\u6570\u7EC4.md" },
      { text: ".NET Core", link: "/net/aspnetcore/\u57FA\u672C\u4F7F\u7528.md" },
      { text: ".NET \u5FAE\u670D\u52A1", link: "/net/microservice/orm/EFCore.md" },
      { text: "Linux", link: "/net/linux/\u8F6F\u4EF6\u5B89\u88C5.md" }
    ]
  },
  {
    text: "Java",
    items: [{ text: "Java\u57FA\u7840", link: "/java/basic/\u6570\u636E\u7C7B\u578B.md" }]
  },
  {
    text: "C\u8BED\u8A00",
    items: [
      { text: "C\u8BED\u8A00\u57FA\u7840", link: "/c/\u57FA\u7840\u5165\u95E8.md" }
    ]
  },
  {
    text: "GIS",
    items: [
      { text: "Mapbox", link: "/gis/mapbox/\u5FEB\u901F\u5165\u95E8.md" },
      { text: "Cesium", link: "/gis/cesium/\u5FEB\u901F\u5165\u95E8.md" },
      { text: "Leaflet", link: "/gis/leaflet/leaflet.md" },
      { text: "OpenLayers", link: "/gis/openlayers/\u5FEB\u901F\u5165\u95E8.md" },
      { text: "Three.js", link: "/gis/three/\u57FA\u7840\u5165\u95E8.md" },
      { text: "GeoServer", link: "/gis/geoserver/\u73AF\u5883\u5B89\u88C5.md" }
    ]
  }
];

// docs/settings/sidebar.mts
var sidebar = {
  "/javascript/": [
    {
      text: "Javascript",
      items: [
        { text: "Javascript", link: "/javascript/Javascript.md" },
        { text: "\u6570\u7EC4", link: "/javascript/\u6570\u7EC4.md" },
        { text: "\u5783\u573E\u56DE\u6536\u673A\u5236", link: "/javascript/\u5783\u573E\u56DE\u6536\u673A\u5236.md" },
        { text: "WeakMap\u548CMap", link: "/javascript/WeakMap\u548CMap.md" },
        { text: "WeakSet\u548CSet", link: "/javascript/WeakSet\u548CSet.md" }
      ]
    },
    {
      text: "Node.js",
      items: [
        { text: "Git", link: "/javascript/node/git.md" },
        { text: "\u5305\u7BA1\u7406\u5DE5\u5177", link: "/javascript/node/\u5305\u7BA1\u7406\u5DE5\u5177.md" },
        {
          text: "postman\u914D\u7F6Etoken",
          link: "/javascript/node/Postman\u5168\u5C40\u914D\u7F6Etoken.md"
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
        { text: "\u57FA\u672C\u4F7F\u7528", link: "/vue3/vue3.md" },
        { text: "h \u51FD\u6570", link: "/vue3/h\u6E32\u67D3\u51FD\u6570.md" },
        { text: "jsx \u8BED\u6CD5", link: "/vue3/JSX\u8BED\u6CD5.md" },
        { text: "ref \u5168\u5BB6\u6876", link: "/vue3/ref\u51FD\u6570.md" },
        { text: "\u8DEF\u7531\u4F20\u53C2", link: "/vue3/\u8DEF\u7531\u4F20\u53C2.md" }
      ]
    },
    {
      text: "\u7B2C\u4E09\u65B9\u5DE5\u5177\u96C6",
      items: [
        { text: "alasql", link: "/vue3/utils/alasql.md" },
        { text: "LZ-String", link: "/vue3/utils/LZ-String.md" },
        { text: "Pubsub-JS", link: "/vue3/utils/Pubsub-JS.md" },
        { text: "Websocket", link: "/vue3/utils/WebSocket.md" },
        { text: "localForAge", link: "/vue3/utils/localForAge.md" },
        { text: "\u6587\u5B57\u8F6C\u8BED\u97F3", link: "/vue3/utils/\u6587\u5B57\u8F6C\u8BED\u97F3.md" },
        { text: "\u897F\u74DC\u89C6\u9891\u64AD\u653E\u5668", link: "/vue3/utils/\u897F\u74DC\u89C6\u9891\u64AD\u653E\u5668.md" }
      ]
    }
  ],
  "/sql/": [
    {
      text: "MySQL",
      items: [
        { text: "\u57FA\u672CSQL\u8BED\u53E5", link: "/sql/mysql/\u57FA\u672CSQL\u8BED\u53E5.md" },
        {
          text: "\u51FD\u6570/\u7EA6\u675F/\u591A\u8868\u67E5\u8BE2/\u4E8B\u52A1",
          link: "/sql/mysql/\u51FD\u6570\u7EA6\u675F\u591A\u8868\u67E5\u8BE2\u4E8B\u52A1.md"
        },
        {
          text: "\u5B58\u50A8\u5F15\u64CE/InnoDB\u5F15\u64CE",
          link: "/sql/mysql/\u5B58\u50A8\u5F15\u64CEInnoDB\u5F15\u64CE.md"
        },
        { text: "\u7D22\u5F15/SQL\u4F18\u5316", link: "/sql/mysql/\u7D22\u5F15SQL\u4F18\u5316.md" },
        { text: "\u89C6\u56FE/\u5B58\u50A8\u8FC7\u7A0B", link: "/sql/mysql/\u89C6\u56FE\u5B58\u50A8\u8FC7\u7A0B.md" },
        { text: "\u9501", link: "/sql/mysql/\u9501.md" }
      ]
    },
    {
      text: "SQLite",
      items: [{ text: "SQLite", link: "/sql/sqlite/SQLite.md" }]
    },
    {
      text: "Postgresql",
      items: [
        { text: "\u57FA\u672C\u4F7F\u7528", link: "/sql/postgres/\u57FA\u672C\u4F7F\u7528.md" },
        { text: "\u5206\u533A\u8868", link: "/sql/postgres/\u5206\u533A\u8868.md" }
      ]
    }
  ],
  "/net/csharp/": [
    {
      text: "C# \u57FA\u7840",
      items: [
        { text: "\u65B9\u6CD5\u4E0E\u6570\u7EC4", link: "/net/csharp/basicCsharp/\u65B9\u6CD5\u4E0E\u6570\u7EC4.md" },
        { text: "class\u7C7B", link: "/net/csharp/basicCsharp/class\u7C7B.md" },
        {
          text: "\u9762\u5411\u5BF9\u8C61\u9AD8\u7EA7",
          link: "/net/csharp/basicCsharp/\u9762\u5411\u5BF9\u8C61\u9AD8\u7EA7.md"
        }
      ]
    },
    {
      text: "C# \u6269\u5C55",
      items: [
        { text: "\u5B57\u5178", link: "/net/csharp/skillCsharp/\u5B57\u5178\u7684CURD.md" },
        { text: "\u5143\u7EC4", link: "/net/csharp/skillCsharp/\u5143\u7EC4.md" },
        { text: "\u6A21\u5F0F\u5339\u914D", link: "/net/csharp/skillCsharp/\u6A21\u5F0F\u5339\u914D.md" },
        {
          text: "\u68C0\u67E5null\u8BED\u6CD5\u7CD6",
          link: "/net/csharp/skillCsharp/\u68C0\u67E5null\u8BED\u6CD5\u7CD6.md"
        },
        {
          text: "\u5E8F\u5217\u5316\u4E0E\u53CD\u5E8F\u5217\u5316",
          link: "/net/csharp/skillCsharp/\u5E8F\u5217\u5316\u4E0E\u53CD\u5E8F\u5217\u5316.md"
        },
        { text: "\u7EBF\u7A0B\u5B89\u5168\u7C7B", link: "/net/csharp/skillCsharp/\u7EBF\u7A0B\u5B89\u5168\u7C7B.md" },
        { text: "HashTable", link: "/net/csharp/skillCsharp/HashTable.md" },
        {
          text: "\u8FEA\u5361\u65AF\u6770\u62C9\u7B97\u6CD5",
          link: "/net/csharp/skillCsharp/\u8FEA\u5361\u65AF\u6770\u62C9\u7B97\u6CD5.md"
        }
      ]
    }
  ],
  "/net/aspnetcore/": [
    {
      text: "ASP.NET Core",
      items: [
        { text: "\u57FA\u672C\u4F7F\u7528", link: "/net/aspnetcore/\u57FA\u672C\u4F7F\u7528.md" },
        { text: "LINQ\u67E5\u8BE2", link: "/net/aspnetcore/LINQ\u67E5\u8BE2.md" },
        { text: "\u96EA\u82B1 Id", link: "/net/aspnetcore/\u96EA\u82B1ID.md" }
      ]
    }
  ],
  "/net/microservice/": [
    { text: "\u5FAE\u670D\u52A1\u6982\u5FF5", link: "/net/microservice/\u5FAE\u670D\u52A1\u6982\u5FF5.md" },
    {
      text: "ORM",
      items: [{ text: "EFCore", link: "/net/microservice/orm/EFCore.md" }]
    },
    {
      text: "\u5BF9\u8C61\u6620\u5C04",
      items: [
        { text: "AutoMapper", link: "/net/microservice/mapper/AutoMapper.md" },
        { text: "Mapster", link: "/net/microservice/mapper/Mapster.md" }
      ]
    },
    {
      text: "\u4EFB\u52A1\u8C03\u5EA6",
      items: [
        { text: "QuartZ", link: "/net/microservice/scheduling/QuartZ.md" },
        { text: "Hangfire", link: "/net/microservice/scheduling/Hangfire.md" }
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
      text: "\u6CE8\u518C\u53D1\u73B0",
      items: [
        { text: "consul", link: "/net/microservice/consul/Consul\u548Cnacos.md" }
      ]
    },
    {
      text: "\u7F13\u5B58",
      items: [
        { text: "Redis", link: "/net/microservice/redis/Redis.md" },
        { text: "CSRedis", link: "/net/microservice/redis/CSRedis.md" }
      ]
    },
    {
      text: "\u65E5\u5FD7",
      items: [
        { text: "Serilog", link: "/net/microservice/log/Serilog.md" },
        { text: "Nlog", link: "/net/microservice/log/Nlog.md" },
        { text: "Log4Net", link: "/net/microservice/log/Log4Net.md" }
      ]
    },
    {
      text: "\u4F9D\u8D56\u6CE8\u5165",
      items: [
        {
          text: "\u4F9D\u8D56\u6CE8\u5165",
          link: "/net/microservice/DependencyInjection/\u4F9D\u8D56\u6CE8\u5165.md"
        }
      ]
    },
    {
      text: "\u7194\u65AD\u964D\u7EA7",
      items: [{ text: "Polly", link: "/net/microservice/polly/Polly.md" }]
    }
  ],
  "/net/linux": [
    { text: "\u8F6F\u4EF6\u5B89\u88C5", link: "/net/linux/\u8F6F\u4EF6\u5B89\u88C5.md" },
    { text: "Linux\u547D\u4EE4", link: "/net/linux/Linux\u547D\u4EE4.md" },
    { text: "Linux\u7CFB\u7EDF", link: "/net/linux/Linux\u7CFB\u7EDF.md" },
    { text: "bat\u811A\u672C", link: "/net/linux/bat\u811A\u672C.md" }
  ],
  "/gis/mapbox/": [
    {
      text: "Mapbox",
      items: [
        { text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/mapbox/\u5FEB\u901F\u5165\u95E8.md" },
        { text: "Style \u6837\u5F0F", link: "/gis/mapbox/Style\u6837\u5F0F.md" },
        { text: "Map \u65B9\u6CD5", link: "/gis/mapbox/Map\u65B9\u6CD5.md" },
        { text: "Map \u4E8B\u4EF6", link: "/gis/mapbox/Map\u4E8B\u4EF6.md" },
        { text: "\u8868\u8FBE\u5F0F", link: "/gis/mapbox/\u8868\u8FBE\u5F0F.md" },
        { text: "\u7EC3\u4E60\u6848\u4F8B", link: "/gis/mapbox/\u7EC3\u4E60\u6848\u4F8B.md" }
      ]
    },
    {
      text: "Maplibre",
      items: [{ text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/mapbox/maplibre.md" }]
    },
    {
      text: "Mapbox\u63D2\u4EF6",
      items: [
        { text: "MapboxDraw", link: "/gis/mapbox/MapboxDraw.md" },
        { text: "Threebox", link: "/gis/mapbox/ThreeBox.md" },
        { text: "Antv L7 Map", link: "/gis/mapbox/Antv L7.md" }
      ]
    },
    {
      text: "\u5176\u4ED6",
      items: [{ text: "\u74E6\u7247\u5730\u56FEurl", link: "/gis/mapbox/\u74E6\u7247\u5730\u56FEurl.md" }]
    }
  ],
  "/gis/cesium/": [
    {
      text: "Cesium",
      items: [
        { text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/cesium/\u5FEB\u901F\u5165\u95E8.md" },
        { text: "\u5750\u6807\u7CFB", link: "/gis/cesium/\u5750\u6807\u7CFB.md" },
        { text: "\u76F8\u673A\u89C6\u89D2", link: "/gis/cesium/\u76F8\u673A\u89C6\u89D2.md" },
        {
          text: "Entity \u5B9E\u4F53",
          link: "/gis/cesium/Entity\u5B9E\u4F53.md",
          items: [
            { text: "Entity \u7BA1\u7406", link: "/gis/cesium/Entity \u7BA1\u7406.md" },
            { text: "Entity \u62FE\u53D6", link: "/gis/cesium/Entity \u62FE\u53D6.md" }
          ]
        },
        { text: "Primitive \u56FE\u5143", link: "/gis/cesium/Primitive\u56FE\u5143.md" },
        {
          text: "\u52A0\u8F7D\u4E09\u7EF4\u6570\u636E",
          link: "/gis/cesium/\u52A0\u8F7D\u4E09\u7EF4\u6570\u636E.md",
          items: [
            { text: "\u5F71\u50CF\u6570\u636E", link: "/gis/cesium/\u5F71\u50CF\u5730\u56FE.md" },
            { text: "\u5730\u5F62\u6570\u636E", link: "/gis/cesium/\u5730\u5F62\u6570\u636E.md" },
            { text: "\u77E2\u91CF\u6570\u636E", link: "/gis/cesium/\u77E2\u91CF\u6570\u636E.md" },
            { text: "\u4E09\u7EF4\u6A21\u578B", link: "/gis/cesium/\u4E09\u7EF4\u6A21\u578B.md" },
            { text: "\u4E09\u7EF4\u74E6\u7247", link: "/gis/cesium/\u4E09\u7EF4\u74E6\u7247.md" }
          ]
        },
        {
          text: "CallBackProperty",
          link: "/gis/cesium/CallBackProperty.md"
        },
        { text: "\u9F20\u6807\u4E8B\u4EF6", link: "/gis/cesium/\u9F20\u6807\u4E8B\u4EF6.md" },
        { text: "\u7C92\u5B50\u7CFB\u7EDF", link: "/gis/cesium/\u7C92\u5B50\u7CFB\u7EDF.md" }
      ]
    }
  ],
  "/gis/leaflet/": [
    {
      text: "Leaflet",
      items: [{ text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/leaflet/leaflet.md" }]
    }
  ],
  "/gis/openlayers/": [
    {
      text: "OpenLayers",
      items: [
        { text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/openlayers/\u5FEB\u901F\u5165\u95E8.md" },
        { text: "\u5730\u56FE\u64CD\u4F5C", link: "/gis/openlayers/\u5730\u56FE\u64CD\u4F5C.md" },
        { text: "\u5F71\u50CF\u5730\u56FE", link: "/gis/openlayers/\u5F71\u50CF\u5730\u56FE.md" },
        { text: "\u77E2\u91CF\u5730\u56FE", link: "/gis/openlayers/\u77E2\u91CF\u5730\u56FE.md" },
        { text: "\u5730\u56FE\u63A7\u4EF6", link: "/gis/openlayers/\u5730\u56FE\u63A7\u4EF6.md" }
      ]
    }
  ],
  "/gis/three/": [
    {
      text: "Three.js",
      items: [
        { text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/three/\u57FA\u7840\u5165\u95E8.md" },
        { text: "\u573A\u666F", link: "/gis/three/\u573A\u666F.md" },
        { text: "\u51E0\u4F55\u4F53", link: "/gis/three/\u7269\u4F53.md" },
        { text: "\u8F68\u9053\u63A7\u5236\u5668", link: "/gis/three/\u8F68\u9053\u63A7\u5236\u5668.md" },
        { text: "lil-gui", link: "/gis/three/lil-gui.md" },
        { text: "\u7269\u4F53\u6750\u8D28", link: "/gis/three/\u7269\u4F53\u6750\u8D28.md" },
        { text: "gltf\u52A0\u8F7D\u5668", link: "/gis/three/gltf\u52A0\u8F7D\u5668.md" },
        {
          text: "\u5305\u56F4\u76D2\u4E0E\u4E16\u754C\u77E9\u9635",
          link: "/gis/three/\u5305\u56F4\u76D2\u4E0E\u4E16\u754C\u77E9\u9635\u8F6C\u6362.md"
        },
        {
          text: "\u8FB9\u7F18\u96C6\u5408\u4F53\u4E0E\u7EBF\u6846\u51E0\u4F55\u4F53",
          link: "/gis/three/\u8FB9\u7F18\u96C6\u5408\u4F53\u548C\u7EBF\u6846\u51E0\u4F55\u4F53.md"
        },
        { text: "\u706F\u5149\u4E0E\u9634\u5F71", link: "/gis/three/\u706F\u5149\u4E0E\u9634\u5F71.md" }
      ]
    }
  ],
  "/gis/geoserver/": [
    {
      text: "GeoServer",
      items: [
        { text: "\u5FEB\u901F\u5165\u95E8", link: "/gis/geoserver/\u73AF\u5883\u5B89\u88C5.md" },
        { text: "\u5750\u6807\u7CFB", link: "/gis/geoserver/\u5750\u6807\u7CFB.md" },
        { text: "OGC\u670D\u52A1", link: "/gis/geoserver/OGC\u670D\u52A1.md" },
        { text: "\u53D1\u5E03shp\u6570\u636E", link: "/gis/geoserver/\u53D1\u5E03shp\u6570\u636E.md" },
        { text: "\u53D1\u5E03tif\u6570\u636E", link: "/gis/geoserver/\u53D1\u5E03tif\u6570\u636E.md" },
        { text: "Layer Group", link: "/gis/geoserver/Layer Group.md" },
        { text: "SLD\u6837\u5F0F", link: "/gis/geoserver/SLD\u6837\u5F0F.md" },
        { text: "\u6570\u636E\u8BF7\u6C42", link: "/gis/geoserver/\u6570\u636E\u8BF7\u6C42.md" }
      ]
    }
  ],
  "/java/basic/": [
    {
      text: "Java\u57FA\u7840",
      collapsed: true,
      items: [
        { text: "\u6570\u636E\u7C7B\u578B", link: "/java/basic/\u6570\u636E\u7C7B\u578B.md" },
        { text: "\u6570\u7EC4", link: "/java/basic/\u6570\u7EC4.md" },
        {
          text: "\u9762\u5411\u5BF9\u8C61",
          link: "/java/basic/\u9762\u5411\u5BF9\u8C61.md",
          items: [
            { text: "\u7EE7\u627F", link: "/java/basic/\u7EE7\u627F.md" },
            { text: "\u5C01\u88C5", link: "/java/basic/\u5C01\u88C5.md" },
            { text: "\u591A\u6001", link: "/java/basic/\u591A\u6001.md" },
            { text: "\u62BD\u8C61\u7C7B", link: "/java/basic/\u62BD\u8C61\u7C7B.md" },
            { text: "\u63A5\u53E3", link: "/java/basic/\u63A5\u53E3.md" },
            { text: "\u91CD\u5199\u548C\u91CD\u8F7D", link: "/java/basic/\u91CD\u5199\u548C\u91CD\u8F7D.md" },
            {
              text: "\u9759\u6001\u5B57\u6BB5\u548C\u9759\u6001\u65B9\u6CD5",
              link: "/java/basic/\u9759\u6001\u5B57\u6BB5\u548C\u9759\u6001\u65B9\u6CD5.md"
            }
          ]
        },
        { text: "\u679A\u4E3E", link: "/java/basic/\u679A\u4E3E.md" }
      ]
    },
    {
      text: "Java\u6838\u5FC3\u7C7B",
      collapsed: false,
      items: [
        { text: "String", link: "/java/basic/String.md" },
        { text: "StringBuilder", link: "/java/basic/StringBuilder.md" },
        { text: "StringJoiner", link: "/java/basic/StringJoiner.md" },
        { text: "record", link: "/java/basic/record.md" },
        { text: "\u5E38\u7528\u5DE5\u5177\u7C7B", link: "/java/basic/\u5E38\u7528\u5DE5\u5177\u7C7B.md" }
      ]
    },
    {
      text: "\u5F02\u5E38\u5904\u7406",
      collapsed: false,
      items: [
        { text: "\u5F02\u5E38\u7B80\u4ECB", link: "/java/basic/\u5F02\u5E38\u7B80\u4ECB.md" },
        { text: "\u5F02\u5E38\u6355\u83B7", link: "/java/basic/\u5F02\u5E38\u6355\u83B7.md" },
        { text: "\u65E5\u5FD7\u7CFB\u7EDF", link: "/java/basic/\u65E5\u5FD7\u7CFB\u7EDF.md" }
      ]
    }
  ],
  "/c/": [{ text: "C\u8BED\u8A00\u57FA\u7840", link: "/c/\u57FA\u7840\u5165\u95E8.md" }]
};

// docs/settings/socialLinks.mts
var socialLink = [
  { icon: "github", link: "https://github.com/CWT113" },
  {
    icon: {
      svg: '<svg t="1705206474284" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4475" width="200" height="200"><path d="M414.175191 414.175191v-36.119929c-12.641975-1.805996-25.283951-2.407995-38.527925-3.009995-156.519694 0-284.745444 125.215755-284.745444 279.327455 0 94.513815 48.159906 178.191652 121.603763 228.759553-48.761905-51.1699-76.453851-119.195767-76.453851-190.231628 0.601999-151.703704 124.613757-275.113463 278.123457-278.725456" fill="#20F4F2" p-id="4476"></path><path d="M420.797178 821.126396c69.831864 0 127.021752-54.781893 129.429747-122.80776V89.697825h113.175779c-2.407995-12.641975-3.611993-25.885949-3.611993-38.527925H505.679012v608.620811c-2.407995 68.025867-59.597884 122.80776-129.429747 122.80776-21.069959 0-41.537919-4.815991-60.199882-14.447971 24.079953 33.109935 63.209877 52.975897 104.747795 52.975896m454.509112-524.942974v-33.711935c-41.537919 0-82.473839-12.039976-117.38977-34.313933 31.303939 34.915932 72.239859 58.393886 117.38977 68.025868" fill="#20F4F2" p-id="4477"></path><path d="M758.518519 228.157554c-33.711934-37.925926-52.975897-87.28983-52.975897-138.459729h-41.537919c10.835979 57.189888 45.149912 107.155791 94.513816 138.459729M375.647266 527.35097c-71.63786 0-130.031746 57.189888-130.031746 127.623751 0 48.761905 28.293945 91.503821 69.831864 113.175779-16.253968-21.671958-24.681952-47.557907-24.681952-74.647854C290.765432 623.068783 349.159318 565.878895 420.797178 565.878895c13.243974 0 25.885949 1.805996 38.527925 6.019988V416.583186c-12.641975-1.805996-25.283951-2.407995-38.527925-3.009994h-6.621987v119.195767c-12.641975-3.611993-25.283951-5.417989-38.527925-5.417989" fill="#FD1A52" p-id="4478"></path><path d="M875.30629 296.183422v117.991769c-77.05585 0-152.305703-23.477954-214.91358-68.025867v308.223398c0 154.111699-127.623751 279.327454-284.745444 279.327454-58.393886 0-114.981775-17.457966-163.141681-50.567901 54.179894 57.189888 129.429747 89.095826 208.291593 89.095826 157.121693 0 284.745444-125.215755 284.745444-279.327454V384.677249c63.209877 44.547913 137.857731 68.025867 214.91358 68.025867V300.999412c-15.049971 0-30.099941-1.805996-45.149912-4.81599" fill="#FD1A52" p-id="4479"></path><path d="M660.39271 654.974721V346.149324c63.209877 44.547913 137.857731 68.025867 214.91358 68.025867V296.183422c-45.149912-9.631981-86.085832-33.109935-117.38977-68.025868-49.363904-31.303939-83.075838-81.269841-94.513816-138.459729H550.828924V698.318636c-2.407995 68.025867-59.597884 122.80776-129.429747 122.80776-41.537919 0-80.667842-19.865961-105.349794-52.975896-42.741917-21.671958-69.229865-65.015873-69.831864-113.175779 0-70.433862 58.393886-127.623751 130.031746-127.623751 13.243974 0 25.885949 1.805996 38.527925 6.019988V414.175191c-153.5097 3.611993-278.123457 127.623751-278.123457 279.327455 0 71.035861 27.691946 139.061728 76.453851 190.231628 48.159906 33.109935 104.747795 50.567901 163.141681 50.567901 156.519694 0 284.143445-125.215755 284.143445-279.327454" fill="#231916" p-id="4480"></path></svg>'
    },
    link: "https://www.douyin.com"
  }
];

// docs/settings/search.mts
var search = {
  provider: "local",
  options: {
    translations: {
      button: {
        buttonText: "\u641C\u7D22\u6587\u6863",
        buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
      },
      modal: {
        noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
        resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
        footer: {
          selectText: "\u9009\u62E9",
          navigateText: "\u5207\u6362"
        }
      }
    }
  }
};

// docs/.vitepress/config.mts
var config_default = defineConfig({
  title: "Butterfly",
  description: "Salvation lies within.",
  base: "/Alikaid/",
  head: [["link", { rel: "icon", href: "/Alikaid/butterfly-logo.png" }]],
  lastUpdated: true,
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: "github-light",
      dark: "vitesse-dark"
    },
    image: {
      lazyLoading: true
    },
    lineNumbers: true
  },
  themeConfig: {
    logo: "/badminton-logo.png",
    outlineTitle: "\u76EE\u5F55",
    outline: [2, 6],
    docFooter: {
      prev: "\u4E0A\u4E00\u7BC7",
      next: "\u4E0B\u4E00\u7BC7"
    },
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    nav,
    sidebar,
    socialLinks: socialLink,
    search,
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright \xA9 2024-present Yibo wang"
    },
    editLink: {
      pattern: "https://github.com",
      text: "Edit this page on GitHub"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy9zZXR0aW5ncy9uYXYubXRzIiwgImRvY3Mvc2V0dGluZ3Mvc2lkZWJhci5tdHMiLCAiZG9jcy9zZXR0aW5ncy9zb2NpYWxMaW5rcy5tdHMiLCAiZG9jcy9zZXR0aW5ncy9zZWFyY2gubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxHaXRodWIuUHJvamVjdHNcXFxcQWxpa2FpZFxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovR2l0aHViLlByb2plY3RzL0FsaWthaWQvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XHJcbmltcG9ydCB7IG5hdiB9IGZyb20gXCIuLi9zZXR0aW5ncy9uYXYubXRzXCI7XHJcbmltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwiLi4vc2V0dGluZ3Mvc2lkZWJhci5tdHNcIjtcclxuaW1wb3J0IHsgc29jaWFsTGluayB9IGZyb20gXCIuLi9zZXR0aW5ncy9zb2NpYWxMaW5rcy5tdHNcIjtcclxuaW1wb3J0IHsgc2VhcmNoIH0gZnJvbSBcIi4uL3NldHRpbmdzL3NlYXJjaC5tdHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgdGl0bGU6IFwiQnV0dGVyZmx5XCIsXHJcbiAgZGVzY3JpcHRpb246IFwiU2FsdmF0aW9uIGxpZXMgd2l0aGluLlwiLFxyXG4gIGJhc2U6IFwiL0FsaWthaWQvXCIsXHJcbiAgaGVhZDogW1tcImxpbmtcIiwgeyByZWw6IFwiaWNvblwiLCBocmVmOiBcIi9BbGlrYWlkL2J1dHRlcmZseS1sb2dvLnBuZ1wiIH1dXSxcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBpZ25vcmVEZWFkTGlua3M6IHRydWUsXHJcbiAgbWFya2Rvd246IHtcclxuICAgIHRoZW1lOiB7XHJcbiAgICAgIGxpZ2h0OiBcImdpdGh1Yi1saWdodFwiLFxyXG4gICAgICBkYXJrOiBcInZpdGVzc2UtZGFya1wiXHJcbiAgICB9LFxyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgbGF6eUxvYWRpbmc6IHRydWVcclxuICAgIH0sXHJcbiAgICBsaW5lTnVtYmVyczogdHJ1ZVxyXG4gIH0sXHJcblxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICBsb2dvOiBcIi9iYWRtaW50b24tbG9nby5wbmdcIixcclxuICAgIG91dGxpbmVUaXRsZTogXCJcdTc2RUVcdTVGNTVcIixcclxuICAgIG91dGxpbmU6IFsyLCA2XSxcclxuICAgIGRvY0Zvb3Rlcjoge1xyXG4gICAgICBwcmV2OiBcIlx1NEUwQVx1NEUwMFx1N0JDN1wiLFxyXG4gICAgICBuZXh0OiBcIlx1NEUwQlx1NEUwMFx1N0JDN1wiXHJcbiAgICB9LFxyXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogXCJcdThGRDRcdTU2REVcdTk4NzZcdTkwRThcIixcclxuXHJcbiAgICBuYXY6IG5hdixcclxuXHJcbiAgICBzaWRlYmFyOiBzaWRlYmFyLFxyXG5cclxuICAgIHNvY2lhbExpbmtzOiBzb2NpYWxMaW5rIGFzIGFueSxcclxuXHJcbiAgICBzZWFyY2g6IHNlYXJjaCBhcyBhbnksXHJcblxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6IFwiUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlwiLFxyXG4gICAgICBjb3B5cmlnaHQ6IFwiQ29weXJpZ2h0IFx1MDBBOSAyMDI0LXByZXNlbnQgWWlibyB3YW5nXCJcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdExpbms6IHtcclxuICAgICAgcGF0dGVybjogXCJodHRwczovL2dpdGh1Yi5jb21cIixcclxuICAgICAgdGV4dDogXCJFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWJcIlxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1xcXFxuYXYubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9HaXRodWIuUHJvamVjdHMvQWxpa2FpZC9kb2NzL3NldHRpbmdzL25hdi5tdHNcIjsvKipcclxuICogXHU5ODc2XHU5MEU4XHU1QkZDXHU4MjJBXHU2NzYxXHU3NkY4XHU1MTczXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbmF2ID0gW1xyXG4gIHsgdGV4dDogXCJcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIgfSxcclxuXHJcbiAgeyB0ZXh0OiBcIkphdmFTY3JpcHRcIiwgbGluazogXCIvamF2YXNjcmlwdC9KYXZhc2NyaXB0Lm1kXCIgfSxcclxuXHJcbiAgeyB0ZXh0OiBcIlZ1ZTNcIiwgbGluazogXCIvdnVlMy92dWUzLm1kXCIgfSxcclxuXHJcbiAgeyB0ZXh0OiBcIlx1NjU3MFx1NjM2RVx1NUU5M1wiLCBsaW5rOiBcIi9zcWwvbXlzcWwvXHU1N0ZBXHU2NzJDU1FMXHU4QkVEXHU1M0U1Lm1kXCIgfSxcclxuXHJcbiAge1xyXG4gICAgdGV4dDogXCIuTkVUXCIsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7IHRleHQ6IFwiQyMgXHU1N0ZBXHU3ODQwXCIsIGxpbms6IFwiL25ldC9jc2hhcnAvYmFzaWNDc2hhcnAvXHU2NUI5XHU2Q0Q1XHU0RTBFXHU2NTcwXHU3RUM0Lm1kXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIi5ORVQgQ29yZVwiLCBsaW5rOiBcIi9uZXQvYXNwbmV0Y29yZS9cdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjgubWRcIiB9LFxyXG4gICAgICB7IHRleHQ6IFwiLk5FVCBcdTVGQUVcdTY3MERcdTUyQTFcIiwgbGluazogXCIvbmV0L21pY3Jvc2VydmljZS9vcm0vRUZDb3JlLm1kXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIkxpbnV4XCIsIGxpbms6IFwiL25ldC9saW51eC9cdThGNkZcdTRFRjZcdTVCODlcdTg4QzUubWRcIiB9XHJcbiAgICBdXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgdGV4dDogXCJKYXZhXCIsXHJcbiAgICBpdGVtczogW3sgdGV4dDogXCJKYXZhXHU1N0ZBXHU3ODQwXCIsIGxpbms6IFwiL2phdmEvYmFzaWMvXHU2NTcwXHU2MzZFXHU3QzdCXHU1NzhCLm1kXCIgfV1cclxuICB9LFxyXG5cclxuICB7XHJcbiAgICB0ZXh0OiBcIkNcdThCRURcdThBMDBcIixcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHsgdGV4dDogXCJDXHU4QkVEXHU4QTAwXHU1N0ZBXHU3ODQwXCIsIGxpbms6IFwiL2MvXHU1N0ZBXHU3ODQwXHU1MTY1XHU5NUU4Lm1kXCIgfVxyXG4gICAgXVxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIHRleHQ6IFwiR0lTXCIsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7IHRleHQ6IFwiTWFwYm94XCIsIGxpbms6IFwiL2dpcy9tYXBib3gvXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4Lm1kXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIkNlc2l1bVwiLCBsaW5rOiBcIi9naXMvY2VzaXVtL1x1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOC5tZFwiIH0sXHJcbiAgICAgIHsgdGV4dDogXCJMZWFmbGV0XCIsIGxpbms6IFwiL2dpcy9sZWFmbGV0L2xlYWZsZXQubWRcIiB9LFxyXG4gICAgICB7IHRleHQ6IFwiT3BlbkxheWVyc1wiLCBsaW5rOiBcIi9naXMvb3BlbmxheWVycy9cdTVGRUJcdTkwMUZcdTUxNjVcdTk1RTgubWRcIiB9LFxyXG4gICAgICB7IHRleHQ6IFwiVGhyZWUuanNcIiwgbGluazogXCIvZ2lzL3RocmVlL1x1NTdGQVx1Nzg0MFx1NTE2NVx1OTVFOC5tZFwiIH0sXHJcbiAgICAgIHsgdGV4dDogXCJHZW9TZXJ2ZXJcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9cdTczQUZcdTU4ODNcdTVCODlcdTg4QzUubWRcIiB9XHJcbiAgICBdXHJcbiAgfVxyXG5dXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1xcXFxzaWRlYmFyLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovR2l0aHViLlByb2plY3RzL0FsaWthaWQvZG9jcy9zZXR0aW5ncy9zaWRlYmFyLm10c1wiOy8qKlxyXG4gKiBcdTRGQTdcdThGQjlcdTY4MEZcdTkxNERcdTdGNkVcclxuICovXHJcbmV4cG9ydCBjb25zdCBzaWRlYmFyID0ge1xyXG4gIFwiL2phdmFzY3JpcHQvXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJKYXZhc2NyaXB0XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIkphdmFzY3JpcHRcIiwgbGluazogXCIvamF2YXNjcmlwdC9KYXZhc2NyaXB0Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NTcwXHU3RUM0XCIsIGxpbms6IFwiL2phdmFzY3JpcHQvXHU2NTcwXHU3RUM0Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1NzgzXHU1NzNFXHU1NkRFXHU2NTM2XHU2NzNBXHU1MjM2XCIsIGxpbms6IFwiL2phdmFzY3JpcHQvXHU1NzgzXHU1NzNFXHU1NkRFXHU2NTM2XHU2NzNBXHU1MjM2Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiV2Vha01hcFx1NTQ4Q01hcFwiLCBsaW5rOiBcIi9qYXZhc2NyaXB0L1dlYWtNYXBcdTU0OENNYXAubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJXZWFrU2V0XHU1NDhDU2V0XCIsIGxpbms6IFwiL2phdmFzY3JpcHQvV2Vha1NldFx1NTQ4Q1NldC5tZFwiIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJOb2RlLmpzXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIkdpdFwiLCBsaW5rOiBcIi9qYXZhc2NyaXB0L25vZGUvZ2l0Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1MzA1XHU3QkExXHU3NDA2XHU1REU1XHU1MTc3XCIsIGxpbms6IFwiL2phdmFzY3JpcHQvbm9kZS9cdTUzMDVcdTdCQTFcdTc0MDZcdTVERTVcdTUxNzcubWRcIiB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwicG9zdG1hblx1OTE0RFx1N0Y2RXRva2VuXCIsXHJcbiAgICAgICAgICBsaW5rOiBcIi9qYXZhc2NyaXB0L25vZGUvUG9zdG1hblx1NTE2OFx1NUM0MFx1OTE0RFx1N0Y2RXRva2VuLm1kXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJudm1cIiwgbGluazogXCIvamF2YXNjcmlwdC9ub2RlL252bS5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlR5cG9yYVwiLCBsaW5rOiBcIi9qYXZhc2NyaXB0L25vZGUvVHlwb3JhLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuXHJcbiAgXCIvdnVlMy9cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlR5cGVTY3JpcHRcIixcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiVHlwZVNjcmlwdFwiLCBsaW5rOiBcIi92dWUzL3R5cGVzY3JpcHQvVHlwZVNjcmlwdC5tZFwiIH1dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlZ1ZTNcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU1N0ZBXHU2NzJDXHU0RjdGXHU3NTI4XCIsIGxpbms6IFwiL3Z1ZTMvdnVlMy5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImggXHU1MUZEXHU2NTcwXCIsIGxpbms6IFwiL3Z1ZTMvaFx1NkUzMlx1NjdEM1x1NTFGRFx1NjU3MC5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcImpzeCBcdThCRURcdTZDRDVcIiwgbGluazogXCIvdnVlMy9KU1hcdThCRURcdTZDRDUubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJyZWYgXHU1MTY4XHU1QkI2XHU2ODc2XCIsIGxpbms6IFwiL3Z1ZTMvcmVmXHU1MUZEXHU2NTcwLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU4REVGXHU3NTMxXHU0RjIwXHU1M0MyXCIsIGxpbms6IFwiL3Z1ZTMvXHU4REVGXHU3NTMxXHU0RjIwXHU1M0MyLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1N0IyQ1x1NEUwOVx1NjVCOVx1NURFNVx1NTE3N1x1OTZDNlwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJhbGFzcWxcIiwgbGluazogXCIvdnVlMy91dGlscy9hbGFzcWwubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJMWi1TdHJpbmdcIiwgbGluazogXCIvdnVlMy91dGlscy9MWi1TdHJpbmcubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJQdWJzdWItSlNcIiwgbGluazogXCIvdnVlMy91dGlscy9QdWJzdWItSlMubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJXZWJzb2NrZXRcIiwgbGluazogXCIvdnVlMy91dGlscy9XZWJTb2NrZXQubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJsb2NhbEZvckFnZVwiLCBsaW5rOiBcIi92dWUzL3V0aWxzL2xvY2FsRm9yQWdlLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NTg3XHU1QjU3XHU4RjZDXHU4QkVEXHU5N0YzXCIsIGxpbms6IFwiL3Z1ZTMvdXRpbHMvXHU2NTg3XHU1QjU3XHU4RjZDXHU4QkVEXHU5N0YzLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU4OTdGXHU3NERDXHU4OUM2XHU5ODkxXHU2NEFEXHU2NTNFXHU1NjY4XCIsIGxpbms6IFwiL3Z1ZTMvdXRpbHMvXHU4OTdGXHU3NERDXHU4OUM2XHU5ODkxXHU2NEFEXHU2NTNFXHU1NjY4Lm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuXHJcbiAgXCIvc3FsL1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiTXlTUUxcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU1N0ZBXHU2NzJDU1FMXHU4QkVEXHU1M0U1XCIsIGxpbms6IFwiL3NxbC9teXNxbC9cdTU3RkFcdTY3MkNTUUxcdThCRURcdTUzRTUubWRcIiB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU1MUZEXHU2NTcwL1x1N0VBNlx1Njc1Ri9cdTU5MUFcdTg4NjhcdTY3RTVcdThCRTIvXHU0RThCXHU1MkExXCIsXHJcbiAgICAgICAgICBsaW5rOiBcIi9zcWwvbXlzcWwvXHU1MUZEXHU2NTcwXHU3RUE2XHU2NzVGXHU1OTFBXHU4ODY4XHU2N0U1XHU4QkUyXHU0RThCXHU1MkExLm1kXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU1QjU4XHU1MEE4XHU1RjE1XHU2NENFL0lubm9EQlx1NUYxNVx1NjRDRVwiLFxyXG4gICAgICAgICAgbGluazogXCIvc3FsL215c3FsL1x1NUI1OFx1NTBBOFx1NUYxNVx1NjRDRUlubm9EQlx1NUYxNVx1NjRDRS5tZFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU3RDIyXHU1RjE1L1NRTFx1NEYxOFx1NTMxNlwiLCBsaW5rOiBcIi9zcWwvbXlzcWwvXHU3RDIyXHU1RjE1U1FMXHU0RjE4XHU1MzE2Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU4OUM2XHU1NkZFL1x1NUI1OFx1NTBBOFx1OEZDN1x1N0EwQlwiLCBsaW5rOiBcIi9zcWwvbXlzcWwvXHU4OUM2XHU1NkZFXHU1QjU4XHU1MEE4XHU4RkM3XHU3QTBCLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU5NTAxXCIsIGxpbms6IFwiL3NxbC9teXNxbC9cdTk1MDEubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiU1FMaXRlXCIsXHJcbiAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIlNRTGl0ZVwiLCBsaW5rOiBcIi9zcWwvc3FsaXRlL1NRTGl0ZS5tZFwiIH1dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlBvc3RncmVzcWxcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU1N0ZBXHU2NzJDXHU0RjdGXHU3NTI4XCIsIGxpbms6IFwiL3NxbC9wb3N0Z3Jlcy9cdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjgubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUyMDZcdTUzM0FcdTg4NjhcIiwgbGluazogXCIvc3FsL3Bvc3RncmVzL1x1NTIwNlx1NTMzQVx1ODg2OC5tZFwiIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL25ldC9jc2hhcnAvXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJDIyBcdTU3RkFcdTc4NDBcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NUI5XHU2Q0Q1XHU0RTBFXHU2NTcwXHU3RUM0XCIsIGxpbms6IFwiL25ldC9jc2hhcnAvYmFzaWNDc2hhcnAvXHU2NUI5XHU2Q0Q1XHU0RTBFXHU2NTcwXHU3RUM0Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiY2xhc3NcdTdDN0JcIiwgbGluazogXCIvbmV0L2NzaGFycC9iYXNpY0NzaGFycC9jbGFzc1x1N0M3Qi5tZFwiIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdTk3NjJcdTU0MTFcdTVCRjlcdThDNjFcdTlBRDhcdTdFQTdcIixcclxuICAgICAgICAgIGxpbms6IFwiL25ldC9jc2hhcnAvYmFzaWNDc2hhcnAvXHU5NzYyXHU1NDExXHU1QkY5XHU4QzYxXHU5QUQ4XHU3RUE3Lm1kXCJcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiQyMgXHU2MjY5XHU1QzU1XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUI1N1x1NTE3OFwiLCBsaW5rOiBcIi9uZXQvY3NoYXJwL3NraWxsQ3NoYXJwL1x1NUI1N1x1NTE3OFx1NzY4NENVUkQubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUxNDNcdTdFQzRcIiwgbGluazogXCIvbmV0L2NzaGFycC9za2lsbENzaGFycC9cdTUxNDNcdTdFQzQubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTZBMjFcdTVGMEZcdTUzMzlcdTkxNERcIiwgbGluazogXCIvbmV0L2NzaGFycC9za2lsbENzaGFycC9cdTZBMjFcdTVGMEZcdTUzMzlcdTkxNEQubWRcIiB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU2OEMwXHU2N0U1bnVsbFx1OEJFRFx1NkNENVx1N0NENlwiLFxyXG4gICAgICAgICAgbGluazogXCIvbmV0L2NzaGFycC9za2lsbENzaGFycC9cdTY4QzBcdTY3RTVudWxsXHU4QkVEXHU2Q0Q1XHU3Q0Q2Lm1kXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU1RThGXHU1MjE3XHU1MzE2XHU0RTBFXHU1M0NEXHU1RThGXHU1MjE3XHU1MzE2XCIsXHJcbiAgICAgICAgICBsaW5rOiBcIi9uZXQvY3NoYXJwL3NraWxsQ3NoYXJwL1x1NUU4Rlx1NTIxN1x1NTMxNlx1NEUwRVx1NTNDRFx1NUU4Rlx1NTIxN1x1NTMxNi5tZFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU3RUJGXHU3QTBCXHU1Qjg5XHU1MTY4XHU3QzdCXCIsIGxpbms6IFwiL25ldC9jc2hhcnAvc2tpbGxDc2hhcnAvXHU3RUJGXHU3QTBCXHU1Qjg5XHU1MTY4XHU3QzdCLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiSGFzaFRhYmxlXCIsIGxpbms6IFwiL25ldC9jc2hhcnAvc2tpbGxDc2hhcnAvSGFzaFRhYmxlLm1kXCIgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1OEZFQVx1NTM2MVx1NjVBRlx1Njc3MFx1NjJDOVx1N0I5N1x1NkNENVwiLFxyXG4gICAgICAgICAgbGluazogXCIvbmV0L2NzaGFycC9za2lsbENzaGFycC9cdThGRUFcdTUzNjFcdTY1QUZcdTY3NzBcdTYyQzlcdTdCOTdcdTZDRDUubWRcIlxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL25ldC9hc3BuZXRjb3JlL1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiQVNQLk5FVCBDb3JlXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NTdGQVx1NjcyQ1x1NEY3Rlx1NzUyOFwiLCBsaW5rOiBcIi9uZXQvYXNwbmV0Y29yZS9cdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjgubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJMSU5RXHU2N0U1XHU4QkUyXCIsIGxpbms6IFwiL25ldC9hc3BuZXRjb3JlL0xJTlFcdTY3RTVcdThCRTIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTk2RUFcdTgyQjEgSWRcIiwgbGluazogXCIvbmV0L2FzcG5ldGNvcmUvXHU5NkVBXHU4MkIxSUQubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG5cclxuICBcIi9uZXQvbWljcm9zZXJ2aWNlL1wiOiBbXHJcbiAgICB7IHRleHQ6IFwiXHU1RkFFXHU2NzBEXHU1MkExXHU2OTgyXHU1RkY1XCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvXHU1RkFFXHU2NzBEXHU1MkExXHU2OTgyXHU1RkY1Lm1kXCIgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJPUk1cIixcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiRUZDb3JlXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2Uvb3JtL0VGQ29yZS5tZFwiIH1dXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NUJGOVx1OEM2MVx1NjYyMFx1NUMwNFwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJBdXRvTWFwcGVyXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvbWFwcGVyL0F1dG9NYXBwZXIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJNYXBzdGVyXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvbWFwcGVyL01hcHN0ZXIubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU0RUZCXHU1MkExXHU4QzAzXHU1RUE2XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlF1YXJ0WlwiLCBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL3NjaGVkdWxpbmcvUXVhcnRaLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiSGFuZ2ZpcmVcIiwgbGluazogXCIvbmV0L21pY3Jvc2VydmljZS9zY2hlZHVsaW5nL0hhbmdmaXJlLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIk1RXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIkFjdGl2ZU1RXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvbXEvQWN0aXZlTVEubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJSYWJiaXRNUVwiLCBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL21xL1JhYmJpdE1RLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NkNFOFx1NTE4Q1x1NTNEMVx1NzNCMFwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJjb25zdWxcIiwgbGluazogXCIvbmV0L21pY3Jvc2VydmljZS9jb25zdWwvQ29uc3VsXHU1NDhDbmFjb3MubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU3RjEzXHU1QjU4XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlJlZGlzXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvcmVkaXMvUmVkaXMubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJDU1JlZGlzXCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvcmVkaXMvQ1NSZWRpcy5tZFwiIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTY1RTVcdTVGRDdcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiU2VyaWxvZ1wiLCBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL2xvZy9TZXJpbG9nLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTmxvZ1wiLCBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL2xvZy9ObG9nLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTG9nNE5ldFwiLCBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL2xvZy9Mb2c0TmV0Lm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NEY5RFx1OEQ1Nlx1NkNFOFx1NTE2NVwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU0RjlEXHU4RDU2XHU2Q0U4XHU1MTY1XCIsXHJcbiAgICAgICAgICBsaW5rOiBcIi9uZXQvbWljcm9zZXJ2aWNlL0RlcGVuZGVuY3lJbmplY3Rpb24vXHU0RjlEXHU4RDU2XHU2Q0U4XHU1MTY1Lm1kXCJcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU3MTk0XHU2NUFEXHU5NjREXHU3RUE3XCIsXHJcbiAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIlBvbGx5XCIsIGxpbms6IFwiL25ldC9taWNyb3NlcnZpY2UvcG9sbHkvUG9sbHkubWRcIiB9XVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL25ldC9saW51eFwiOiBbXHJcbiAgICB7IHRleHQ6IFwiXHU4RjZGXHU0RUY2XHU1Qjg5XHU4OEM1XCIsIGxpbms6IFwiL25ldC9saW51eC9cdThGNkZcdTRFRjZcdTVCODlcdTg4QzUubWRcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIkxpbnV4XHU1NDdEXHU0RUU0XCIsIGxpbms6IFwiL25ldC9saW51eC9MaW51eFx1NTQ3RFx1NEVFNC5tZFwiIH0sXHJcbiAgICB7IHRleHQ6IFwiTGludXhcdTdDRkJcdTdFREZcIiwgbGluazogXCIvbmV0L2xpbnV4L0xpbnV4XHU3Q0ZCXHU3RURGLm1kXCIgfSxcclxuICAgIHsgdGV4dDogXCJiYXRcdTgxMUFcdTY3MkNcIiwgbGluazogXCIvbmV0L2xpbnV4L2JhdFx1ODExQVx1NjcyQy5tZFwiIH1cclxuICBdLFxyXG5cclxuICBcIi9naXMvbWFwYm94L1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiTWFwYm94XCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOFwiLCBsaW5rOiBcIi9naXMvbWFwYm94L1x1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOC5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlN0eWxlIFx1NjgzN1x1NUYwRlwiLCBsaW5rOiBcIi9naXMvbWFwYm94L1N0eWxlXHU2ODM3XHU1RjBGLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiTWFwIFx1NjVCOVx1NkNENVwiLCBsaW5rOiBcIi9naXMvbWFwYm94L01hcFx1NjVCOVx1NkNENS5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIk1hcCBcdTRFOEJcdTRFRjZcIiwgbGluazogXCIvZ2lzL21hcGJveC9NYXBcdTRFOEJcdTRFRjYubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTg4NjhcdThGQkVcdTVGMEZcIiwgbGluazogXCIvZ2lzL21hcGJveC9cdTg4NjhcdThGQkVcdTVGMEYubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTdFQzNcdTRFNjBcdTY4NDhcdTRGOEJcIiwgbGluazogXCIvZ2lzL21hcGJveC9cdTdFQzNcdTRFNjBcdTY4NDhcdTRGOEIubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiTWFwbGlicmVcIixcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4XCIsIGxpbms6IFwiL2dpcy9tYXBib3gvbWFwbGlicmUubWRcIiB9XVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJNYXBib3hcdTYzRDJcdTRFRjZcIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiTWFwYm94RHJhd1wiLCBsaW5rOiBcIi9naXMvbWFwYm94L01hcGJveERyYXcubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJUaHJlZWJveFwiLCBsaW5rOiBcIi9naXMvbWFwYm94L1RocmVlQm94Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiQW50diBMNyBNYXBcIiwgbGluazogXCIvZ2lzL21hcGJveC9BbnR2IEw3Lm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTE3Nlx1NEVENlwiLFxyXG4gICAgICBpdGVtczogW3sgdGV4dDogXCJcdTc0RTZcdTcyNDdcdTU3MzBcdTU2RkV1cmxcIiwgbGluazogXCIvZ2lzL21hcGJveC9cdTc0RTZcdTcyNDdcdTU3MzBcdTU2RkV1cmwubWRcIiB9XVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL2dpcy9jZXNpdW0vXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJDZXNpdW1cIixcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4XCIsIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1NzUwXHU2ODA3XHU3Q0ZCXCIsIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU1NzUwXHU2ODA3XHU3Q0ZCLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU3NkY4XHU2NzNBXHU4OUM2XHU4OUQyXCIsIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU3NkY4XHU2NzNBXHU4OUM2XHU4OUQyLm1kXCIgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIkVudGl0eSBcdTVCOUVcdTRGNTNcIixcclxuICAgICAgICAgIGxpbms6IFwiL2dpcy9jZXNpdW0vRW50aXR5XHU1QjlFXHU0RjUzLm1kXCIsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7IHRleHQ6IFwiRW50aXR5IFx1N0JBMVx1NzQwNlwiLCBsaW5rOiBcIi9naXMvY2VzaXVtL0VudGl0eSBcdTdCQTFcdTc0MDYubWRcIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiRW50aXR5IFx1NjJGRVx1NTNENlwiLCBsaW5rOiBcIi9naXMvY2VzaXVtL0VudGl0eSBcdTYyRkVcdTUzRDYubWRcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6IFwiUHJpbWl0aXZlIFx1NTZGRVx1NTE0M1wiLCBsaW5rOiBcIi9naXMvY2VzaXVtL1ByaW1pdGl2ZVx1NTZGRVx1NTE0My5tZFwiIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdTUyQTBcdThGN0RcdTRFMDlcdTdFRjRcdTY1NzBcdTYzNkVcIixcclxuICAgICAgICAgIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU1MkEwXHU4RjdEXHU0RTA5XHU3RUY0XHU2NTcwXHU2MzZFLm1kXCIsXHJcbiAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU1RjcxXHU1MENGXHU2NTcwXHU2MzZFXCIsIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU1RjcxXHU1MENGXHU1NzMwXHU1NkZFLm1kXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NTczMFx1NUY2Mlx1NjU3MFx1NjM2RVwiLCBsaW5rOiBcIi9naXMvY2VzaXVtL1x1NTczMFx1NUY2Mlx1NjU3MFx1NjM2RS5tZFwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJcdTc3RTJcdTkxQ0ZcdTY1NzBcdTYzNkVcIiwgbGluazogXCIvZ2lzL2Nlc2l1bS9cdTc3RTJcdTkxQ0ZcdTY1NzBcdTYzNkUubWRcIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU0RTA5XHU3RUY0XHU2QTIxXHU1NzhCXCIsIGxpbms6IFwiL2dpcy9jZXNpdW0vXHU0RTA5XHU3RUY0XHU2QTIxXHU1NzhCLm1kXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NEUwOVx1N0VGNFx1NzRFNlx1NzI0N1wiLCBsaW5rOiBcIi9naXMvY2VzaXVtL1x1NEUwOVx1N0VGNFx1NzRFNlx1NzI0Ny5tZFwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiQ2FsbEJhY2tQcm9wZXJ0eVwiLFxyXG4gICAgICAgICAgbGluazogXCIvZ2lzL2Nlc2l1bS9DYWxsQmFja1Byb3BlcnR5Lm1kXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTlGMjBcdTY4MDdcdTRFOEJcdTRFRjZcIiwgbGluazogXCIvZ2lzL2Nlc2l1bS9cdTlGMjBcdTY4MDdcdTRFOEJcdTRFRjYubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTdDOTJcdTVCNTBcdTdDRkJcdTdFREZcIiwgbGluazogXCIvZ2lzL2Nlc2l1bS9cdTdDOTJcdTVCNTBcdTdDRkJcdTdFREYubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG5cclxuICBcIi9naXMvbGVhZmxldC9cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkxlYWZsZXRcIixcclxuICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4XCIsIGxpbms6IFwiL2dpcy9sZWFmbGV0L2xlYWZsZXQubWRcIiB9XVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL2dpcy9vcGVubGF5ZXJzL1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiT3BlbkxheWVyc1wiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTVGRUJcdTkwMUZcdTUxNjVcdTk1RThcIiwgbGluazogXCIvZ2lzL29wZW5sYXllcnMvXHU1RkVCXHU5MDFGXHU1MTY1XHU5NUU4Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1NzMwXHU1NkZFXHU2NENEXHU0RjVDXCIsIGxpbms6IFwiL2dpcy9vcGVubGF5ZXJzL1x1NTczMFx1NTZGRVx1NjRDRFx1NEY1Qy5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUY3MVx1NTBDRlx1NTczMFx1NTZGRVwiLCBsaW5rOiBcIi9naXMvb3BlbmxheWVycy9cdTVGNzFcdTUwQ0ZcdTU3MzBcdTU2RkUubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTc3RTJcdTkxQ0ZcdTU3MzBcdTU2RkVcIiwgbGluazogXCIvZ2lzL29wZW5sYXllcnMvXHU3N0UyXHU5MUNGXHU1NzMwXHU1NkZFLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1NzMwXHU1NkZFXHU2M0E3XHU0RUY2XCIsIGxpbms6IFwiL2dpcy9vcGVubGF5ZXJzL1x1NTczMFx1NTZGRVx1NjNBN1x1NEVGNi5tZFwiIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcblxyXG4gIFwiL2dpcy90aHJlZS9cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlRocmVlLmpzXCIsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUZFQlx1OTAxRlx1NTE2NVx1OTVFOFwiLCBsaW5rOiBcIi9naXMvdGhyZWUvXHU1N0ZBXHU3ODQwXHU1MTY1XHU5NUU4Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU1NzNBXHU2NjZGXCIsIGxpbms6IFwiL2dpcy90aHJlZS9cdTU3M0FcdTY2NkYubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUxRTBcdTRGNTVcdTRGNTNcIiwgbGluazogXCIvZ2lzL3RocmVlL1x1NzI2OVx1NEY1My5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1OEY2OFx1OTA1M1x1NjNBN1x1NTIzNlx1NTY2OFwiLCBsaW5rOiBcIi9naXMvdGhyZWUvXHU4RjY4XHU5MDUzXHU2M0E3XHU1MjM2XHU1NjY4Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwibGlsLWd1aVwiLCBsaW5rOiBcIi9naXMvdGhyZWUvbGlsLWd1aS5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NzI2OVx1NEY1M1x1Njc1MFx1OEQyOFwiLCBsaW5rOiBcIi9naXMvdGhyZWUvXHU3MjY5XHU0RjUzXHU2NzUwXHU4RDI4Lm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiZ2x0Zlx1NTJBMFx1OEY3RFx1NTY2OFwiLCBsaW5rOiBcIi9naXMvdGhyZWUvZ2x0Zlx1NTJBMFx1OEY3RFx1NTY2OC5tZFwiIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdTUzMDVcdTU2RjRcdTc2RDJcdTRFMEVcdTRFMTZcdTc1NENcdTc3RTlcdTk2MzVcIixcclxuICAgICAgICAgIGxpbms6IFwiL2dpcy90aHJlZS9cdTUzMDVcdTU2RjRcdTc2RDJcdTRFMEVcdTRFMTZcdTc1NENcdTc3RTlcdTk2MzVcdThGNkNcdTYzNjIubWRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdThGQjlcdTdGMThcdTk2QzZcdTU0MDhcdTRGNTNcdTRFMEVcdTdFQkZcdTY4NDZcdTUxRTBcdTRGNTVcdTRGNTNcIixcclxuICAgICAgICAgIGxpbms6IFwiL2dpcy90aHJlZS9cdThGQjlcdTdGMThcdTk2QzZcdTU0MDhcdTRGNTNcdTU0OENcdTdFQkZcdTY4NDZcdTUxRTBcdTRGNTVcdTRGNTMubWRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NzA2Rlx1NTE0OVx1NEUwRVx1OTYzNFx1NUY3MVwiLCBsaW5rOiBcIi9naXMvdGhyZWUvXHU3MDZGXHU1MTQ5XHU0RTBFXHU5NjM0XHU1RjcxLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuXHJcbiAgXCIvZ2lzL2dlb3NlcnZlci9cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkdlb1NlcnZlclwiLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTVGRUJcdTkwMUZcdTUxNjVcdTk1RThcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9cdTczQUZcdTU4ODNcdTVCODlcdTg4QzUubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTU3NTBcdTY4MDdcdTdDRkJcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9cdTU3NTBcdTY4MDdcdTdDRkIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJPR0NcdTY3MERcdTUyQTFcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9PR0NcdTY3MERcdTUyQTEubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUzRDFcdTVFMDNzaHBcdTY1NzBcdTYzNkVcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9cdTUzRDFcdTVFMDNzaHBcdTY1NzBcdTYzNkUubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTUzRDFcdTVFMDN0aWZcdTY1NzBcdTYzNkVcIiwgbGluazogXCIvZ2lzL2dlb3NlcnZlci9cdTUzRDFcdTVFMDN0aWZcdTY1NzBcdTYzNkUubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJMYXllciBHcm91cFwiLCBsaW5rOiBcIi9naXMvZ2Vvc2VydmVyL0xheWVyIEdyb3VwLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiU0xEXHU2ODM3XHU1RjBGXCIsIGxpbms6IFwiL2dpcy9nZW9zZXJ2ZXIvU0xEXHU2ODM3XHU1RjBGLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NTcwXHU2MzZFXHU4QkY3XHU2QzQyXCIsIGxpbms6IFwiL2dpcy9nZW9zZXJ2ZXIvXHU2NTcwXHU2MzZFXHU4QkY3XHU2QzQyLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuXHJcbiAgXCIvamF2YS9iYXNpYy9cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkphdmFcdTU3RkFcdTc4NDBcIixcclxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICBpdGVtczogW1xyXG4gICAgICAgIHsgdGV4dDogXCJcdTY1NzBcdTYzNkVcdTdDN0JcdTU3OEJcIiwgbGluazogXCIvamF2YS9iYXNpYy9cdTY1NzBcdTYzNkVcdTdDN0JcdTU3OEIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTY1NzBcdTdFQzRcIiwgbGluazogXCIvamF2YS9iYXNpYy9cdTY1NzBcdTdFQzQubWRcIiB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU5NzYyXHU1NDExXHU1QkY5XHU4QzYxXCIsXHJcbiAgICAgICAgICBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1OTc2Mlx1NTQxMVx1NUJGOVx1OEM2MS5tZFwiLFxyXG4gICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlx1N0VFN1x1NjI3RlwiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1N0VFN1x1NjI3Ri5tZFwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJcdTVDMDFcdTg4QzVcIiwgbGluazogXCIvamF2YS9iYXNpYy9cdTVDMDFcdTg4QzUubWRcIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU1OTFBXHU2MDAxXCIsIGxpbms6IFwiL2phdmEvYmFzaWMvXHU1OTFBXHU2MDAxLm1kXCIgfSxcclxuICAgICAgICAgICAgeyB0ZXh0OiBcIlx1NjJCRFx1OEM2MVx1N0M3QlwiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1NjJCRFx1OEM2MVx1N0M3Qi5tZFwiIH0sXHJcbiAgICAgICAgICAgIHsgdGV4dDogXCJcdTYzQTVcdTUzRTNcIiwgbGluazogXCIvamF2YS9iYXNpYy9cdTYzQTVcdTUzRTMubWRcIiB9LFxyXG4gICAgICAgICAgICB7IHRleHQ6IFwiXHU5MUNEXHU1MTk5XHU1NDhDXHU5MUNEXHU4RjdEXCIsIGxpbms6IFwiL2phdmEvYmFzaWMvXHU5MUNEXHU1MTk5XHU1NDhDXHU5MUNEXHU4RjdELm1kXCIgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiXHU5NzU5XHU2MDAxXHU1QjU3XHU2QkI1XHU1NDhDXHU5NzU5XHU2MDAxXHU2NUI5XHU2Q0Q1XCIsXHJcbiAgICAgICAgICAgICAgbGluazogXCIvamF2YS9iYXNpYy9cdTk3NTlcdTYwMDFcdTVCNTdcdTZCQjVcdTU0OENcdTk3NTlcdTYwMDFcdTY1QjlcdTZDRDUubWRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHRleHQ6IFwiXHU2NzlBXHU0RTNFXCIsIGxpbms6IFwiL2phdmEvYmFzaWMvXHU2NzlBXHU0RTNFLm1kXCIgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkphdmFcdTY4MzhcdTVGQzNcdTdDN0JcIixcclxuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7IHRleHQ6IFwiU3RyaW5nXCIsIGxpbms6IFwiL2phdmEvYmFzaWMvU3RyaW5nLm1kXCIgfSxcclxuICAgICAgICB7IHRleHQ6IFwiU3RyaW5nQnVpbGRlclwiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1N0cmluZ0J1aWxkZXIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJTdHJpbmdKb2luZXJcIiwgbGluazogXCIvamF2YS9iYXNpYy9TdHJpbmdKb2luZXIubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJyZWNvcmRcIiwgbGluazogXCIvamF2YS9iYXNpYy9yZWNvcmQubWRcIiB9LFxyXG4gICAgICAgIHsgdGV4dDogXCJcdTVFMzhcdTc1MjhcdTVERTVcdTUxNzdcdTdDN0JcIiwgbGluazogXCIvamF2YS9iYXNpYy9cdTVFMzhcdTc1MjhcdTVERTVcdTUxNzdcdTdDN0IubWRcIiB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU1RjAyXHU1RTM4XHU1OTA0XHU3NDA2XCIsXHJcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUYwMlx1NUUzOFx1N0I4MFx1NEVDQlwiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1NUYwMlx1NUUzOFx1N0I4MFx1NEVDQi5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NUYwMlx1NUUzOFx1NjM1NVx1ODNCN1wiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1NUYwMlx1NUUzOFx1NjM1NVx1ODNCNy5tZFwiIH0sXHJcbiAgICAgICAgeyB0ZXh0OiBcIlx1NjVFNVx1NUZEN1x1N0NGQlx1N0VERlwiLCBsaW5rOiBcIi9qYXZhL2Jhc2ljL1x1NjVFNVx1NUZEN1x1N0NGQlx1N0VERi5tZFwiIH0sXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG5cclxuICBcIi9jL1wiOiBbeyB0ZXh0OiBcIkNcdThCRURcdThBMDBcdTU3RkFcdTc4NDBcIiwgbGluazogXCIvYy9cdTU3RkFcdTc4NDBcdTUxNjVcdTk1RTgubWRcIiB9XVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcR2l0aHViLlByb2plY3RzXFxcXEFsaWthaWRcXFxcZG9jc1xcXFxzZXR0aW5nc1xcXFxzb2NpYWxMaW5rcy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0dpdGh1Yi5Qcm9qZWN0cy9BbGlrYWlkL2RvY3Mvc2V0dGluZ3Mvc29jaWFsTGlua3MubXRzXCI7LyoqXHJcbiAqIFx1N0FEOVx1NTkxNlx1OTRGRVx1NjNBNVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNvY2lhbExpbmsgPSBbXHJcbiAgeyBpY29uOiBcImdpdGh1YlwiLCBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9DV1QxMTNcIiB9LFxyXG4gIHtcclxuICAgIGljb246IHtcclxuICAgICAgc3ZnOiAnPHN2ZyB0PVwiMTcwNTIwNjQ3NDI4NFwiIGNsYXNzPVwiaWNvblwiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBwLWlkPVwiNDQ3NVwiIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMjAwXCI+PHBhdGggZD1cIk00MTQuMTc1MTkxIDQxNC4xNzUxOTF2LTM2LjExOTkyOWMtMTIuNjQxOTc1LTEuODA1OTk2LTI1LjI4Mzk1MS0yLjQwNzk5NS0zOC41Mjc5MjUtMy4wMDk5OTUtMTU2LjUxOTY5NCAwLTI4NC43NDU0NDQgMTI1LjIxNTc1NS0yODQuNzQ1NDQ0IDI3OS4zMjc0NTUgMCA5NC41MTM4MTUgNDguMTU5OTA2IDE3OC4xOTE2NTIgMTIxLjYwMzc2MyAyMjguNzU5NTUzLTQ4Ljc2MTkwNS01MS4xNjk5LTc2LjQ1Mzg1MS0xMTkuMTk1NzY3LTc2LjQ1Mzg1MS0xOTAuMjMxNjI4IDAuNjAxOTk5LTE1MS43MDM3MDQgMTI0LjYxMzc1Ny0yNzUuMTEzNDYzIDI3OC4xMjM0NTctMjc4LjcyNTQ1NlwiIGZpbGw9XCIjMjBGNEYyXCIgcC1pZD1cIjQ0NzZcIj48L3BhdGg+PHBhdGggZD1cIk00MjAuNzk3MTc4IDgyMS4xMjYzOTZjNjkuODMxODY0IDAgMTI3LjAyMTc1Mi01NC43ODE4OTMgMTI5LjQyOTc0Ny0xMjIuODA3NzZWODkuNjk3ODI1aDExMy4xNzU3NzljLTIuNDA3OTk1LTEyLjY0MTk3NS0zLjYxMTk5My0yNS44ODU5NDktMy42MTE5OTMtMzguNTI3OTI1SDUwNS42NzkwMTJ2NjA4LjYyMDgxMWMtMi40MDc5OTUgNjguMDI1ODY3LTU5LjU5Nzg4NCAxMjIuODA3NzYtMTI5LjQyOTc0NyAxMjIuODA3NzYtMjEuMDY5OTU5IDAtNDEuNTM3OTE5LTQuODE1OTkxLTYwLjE5OTg4Mi0xNC40NDc5NzEgMjQuMDc5OTUzIDMzLjEwOTkzNSA2My4yMDk4NzcgNTIuOTc1ODk3IDEwNC43NDc3OTUgNTIuOTc1ODk2bTQ1NC41MDkxMTItNTI0Ljk0Mjk3NHYtMzMuNzExOTM1Yy00MS41Mzc5MTkgMC04Mi40NzM4MzktMTIuMDM5OTc2LTExNy4zODk3Ny0zNC4zMTM5MzMgMzEuMzAzOTM5IDM0LjkxNTkzMiA3Mi4yMzk4NTkgNTguMzkzODg2IDExNy4zODk3NyA2OC4wMjU4NjhcIiBmaWxsPVwiIzIwRjRGMlwiIHAtaWQ9XCI0NDc3XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNzU4LjUxODUxOSAyMjguMTU3NTU0Yy0zMy43MTE5MzQtMzcuOTI1OTI2LTUyLjk3NTg5Ny04Ny4yODk4My01Mi45NzU4OTctMTM4LjQ1OTcyOWgtNDEuNTM3OTE5YzEwLjgzNTk3OSA1Ny4xODk4ODggNDUuMTQ5OTEyIDEwNy4xNTU3OTEgOTQuNTEzODE2IDEzOC40NTk3MjlNMzc1LjY0NzI2NiA1MjcuMzUwOTdjLTcxLjYzNzg2IDAtMTMwLjAzMTc0NiA1Ny4xODk4ODgtMTMwLjAzMTc0NiAxMjcuNjIzNzUxIDAgNDguNzYxOTA1IDI4LjI5Mzk0NSA5MS41MDM4MjEgNjkuODMxODY0IDExMy4xNzU3NzktMTYuMjUzOTY4LTIxLjY3MTk1OC0yNC42ODE5NTItNDcuNTU3OTA3LTI0LjY4MTk1Mi03NC42NDc4NTRDMjkwLjc2NTQzMiA2MjMuMDY4NzgzIDM0OS4xNTkzMTggNTY1Ljg3ODg5NSA0MjAuNzk3MTc4IDU2NS44Nzg4OTVjMTMuMjQzOTc0IDAgMjUuODg1OTQ5IDEuODA1OTk2IDM4LjUyNzkyNSA2LjAxOTk4OFY0MTYuNTgzMTg2Yy0xMi42NDE5NzUtMS44MDU5OTYtMjUuMjgzOTUxLTIuNDA3OTk1LTM4LjUyNzkyNS0zLjAwOTk5NGgtNi42MjE5ODd2MTE5LjE5NTc2N2MtMTIuNjQxOTc1LTMuNjExOTkzLTI1LjI4Mzk1MS01LjQxNzk4OS0zOC41Mjc5MjUtNS40MTc5ODlcIiBmaWxsPVwiI0ZEMUE1MlwiIHAtaWQ9XCI0NDc4XCI+PC9wYXRoPjxwYXRoIGQ9XCJNODc1LjMwNjI5IDI5Ni4xODM0MjJ2MTE3Ljk5MTc2OWMtNzcuMDU1ODUgMC0xNTIuMzA1NzAzLTIzLjQ3Nzk1NC0yMTQuOTEzNTgtNjguMDI1ODY3djMwOC4yMjMzOThjMCAxNTQuMTExNjk5LTEyNy42MjM3NTEgMjc5LjMyNzQ1NC0yODQuNzQ1NDQ0IDI3OS4zMjc0NTQtNTguMzkzODg2IDAtMTE0Ljk4MTc3NS0xNy40NTc5NjYtMTYzLjE0MTY4MS01MC41Njc5MDEgNTQuMTc5ODk0IDU3LjE4OTg4OCAxMjkuNDI5NzQ3IDg5LjA5NTgyNiAyMDguMjkxNTkzIDg5LjA5NTgyNiAxNTcuMTIxNjkzIDAgMjg0Ljc0NTQ0NC0xMjUuMjE1NzU1IDI4NC43NDU0NDQtMjc5LjMyNzQ1NFYzODQuNjc3MjQ5YzYzLjIwOTg3NyA0NC41NDc5MTMgMTM3Ljg1NzczMSA2OC4wMjU4NjcgMjE0LjkxMzU4IDY4LjAyNTg2N1YzMDAuOTk5NDEyYy0xNS4wNDk5NzEgMC0zMC4wOTk5NDEtMS44MDU5OTYtNDUuMTQ5OTEyLTQuODE1OTlcIiBmaWxsPVwiI0ZEMUE1MlwiIHAtaWQ9XCI0NDc5XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNjYwLjM5MjcxIDY1NC45NzQ3MjFWMzQ2LjE0OTMyNGM2My4yMDk4NzcgNDQuNTQ3OTEzIDEzNy44NTc3MzEgNjguMDI1ODY3IDIxNC45MTM1OCA2OC4wMjU4NjdWMjk2LjE4MzQyMmMtNDUuMTQ5OTEyLTkuNjMxOTgxLTg2LjA4NTgzMi0zMy4xMDk5MzUtMTE3LjM4OTc3LTY4LjAyNTg2OC00OS4zNjM5MDQtMzEuMzAzOTM5LTgzLjA3NTgzOC04MS4yNjk4NDEtOTQuNTEzODE2LTEzOC40NTk3MjlINTUwLjgyODkyNFY2OTguMzE4NjM2Yy0yLjQwNzk5NSA2OC4wMjU4NjctNTkuNTk3ODg0IDEyMi44MDc3Ni0xMjkuNDI5NzQ3IDEyMi44MDc3Ni00MS41Mzc5MTkgMC04MC42Njc4NDItMTkuODY1OTYxLTEwNS4zNDk3OTQtNTIuOTc1ODk2LTQyLjc0MTkxNy0yMS42NzE5NTgtNjkuMjI5ODY1LTY1LjAxNTg3My02OS44MzE4NjQtMTEzLjE3NTc3OSAwLTcwLjQzMzg2MiA1OC4zOTM4ODYtMTI3LjYyMzc1MSAxMzAuMDMxNzQ2LTEyNy42MjM3NTEgMTMuMjQzOTc0IDAgMjUuODg1OTQ5IDEuODA1OTk2IDM4LjUyNzkyNSA2LjAxOTk4OFY0MTQuMTc1MTkxYy0xNTMuNTA5NyAzLjYxMTk5My0yNzguMTIzNDU3IDEyNy42MjM3NTEtMjc4LjEyMzQ1NyAyNzkuMzI3NDU1IDAgNzEuMDM1ODYxIDI3LjY5MTk0NiAxMzkuMDYxNzI4IDc2LjQ1Mzg1MSAxOTAuMjMxNjI4IDQ4LjE1OTkwNiAzMy4xMDk5MzUgMTA0Ljc0Nzc5NSA1MC41Njc5MDEgMTYzLjE0MTY4MSA1MC41Njc5MDEgMTU2LjUxOTY5NCAwIDI4NC4xNDM0NDUtMTI1LjIxNTc1NSAyODQuMTQzNDQ1LTI3OS4zMjc0NTRcIiBmaWxsPVwiIzIzMTkxNlwiIHAtaWQ9XCI0NDgwXCI+PC9wYXRoPjwvc3ZnPidcclxuICAgIH0sXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vd3d3LmRvdXlpbi5jb21cIlxyXG4gIH1cclxuXTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxHaXRodWIuUHJvamVjdHNcXFxcQWxpa2FpZFxcXFxkb2NzXFxcXHNldHRpbmdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxHaXRodWIuUHJvamVjdHNcXFxcQWxpa2FpZFxcXFxkb2NzXFxcXHNldHRpbmdzXFxcXHNlYXJjaC5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0dpdGh1Yi5Qcm9qZWN0cy9BbGlrYWlkL2RvY3Mvc2V0dGluZ3Mvc2VhcmNoLm10c1wiOy8qKlxyXG4gKiBcdTY0MUNcdTdEMjJcdTY4NDZcclxuICovXHJcbmV4cG9ydCBjb25zdCBzZWFyY2ggPSB7XHJcbiAgcHJvdmlkZXI6IFwibG9jYWxcIixcclxuICBvcHRpb25zOiB7XHJcbiAgICB0cmFuc2xhdGlvbnM6IHtcclxuICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgYnV0dG9uVGV4dDogXCJcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjNcIixcclxuICAgICAgICBidXR0b25BcmlhTGFiZWw6IFwiXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzXCJcclxuICAgICAgfSxcclxuICAgICAgbW9kYWw6IHtcclxuICAgICAgICBub1Jlc3VsdHNUZXh0OiBcIlx1NjVFMFx1NkNENVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5Q1wiLFxyXG4gICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6IFwiXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2XCIsXHJcbiAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICBzZWxlY3RUZXh0OiBcIlx1OTAwOVx1NjJFOVwiLFxyXG4gICAgICAgICAgbmF2aWdhdGVUZXh0OiBcIlx1NTIwN1x1NjM2MlwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFx1OTg3NVx1ODExQVx1NzI0OFx1Njc0M1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZvb3RlciA9IHtcclxuICAvLyBtZXNzYWdlOiBcIlJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cIixcclxuICAvLyBjb3B5cmlnaHQ6IFwiQ29weXJpZ2h0IFx1MDBBOSAyMDI0LXByZXNlbnQgQWxrYWlkXCJcclxufTtcclxuIl0sCiAgIm1hcHBp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

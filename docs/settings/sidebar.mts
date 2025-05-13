/**
 * 侧边栏配置
 */
export const sidebar = {
  "/backend/java/jdbc": [
    {
      text: "JDBC",
      items: [{ text: "", link: "" }]
    }
  ],

  "/backend/java/springMVC": [
    {
      text: "Spring MVC",
      items: [
        {
          text: "MVC理论基础",
          link: "/backend/java/springMVC/MVC理论基础.md"
        },
        {
          text: "项目搭建和环境配置",
          link: "/backend/java/springMVC/项目搭建和环境配置.md"
        }
      ]
    }
  ],

  "/backend/java/spring": [
    {
      text: "Spring6",
      items: [
        {
          text: "Spring简介",
          link: "/backend/java/spring/Spring简介.md"
        },
        {
          text: "IoC模块",
          link: "/backend/java/spring/IoC.md",
          items: [
            {
              text: "基于XML注入Bean",
              link: "/backend/java/spring/基于XML注入Bean.md"
            },
            {
              text: "基于注解注入Bean",
              link: "/backend/java/spring/基于注解注入Bean.md"
            }
          ]
        },
        {
          text: "手写依赖注入",
          // collapsed: false,
          items: [
            {
              text: "回顾反射",
              link: "/backend/java/spring/回顾反射.md"
            },
            {
              text: "实现依赖注入",
              link: "/backend/java/spring/实现依赖注入.md"
            }
          ]
        },
        {
          text: "AOP",
          link: "/backend/java/spring/AOP.md"
        },
        {
          text: "单元测试",
          link: "/backend/java/spring/单元测试.md"
        },
        {
          text: "JdbcTemplate",
          link: "/backend/java/spring/JdbcTemplate.md"
        },
        {
          text: "声明性事务",
          link: "/backend/java/spring/声明性事务.md"
        },
        {
          text: "资源操作",
          link: "/backend/java/spring/资源操作.md"
        },
        {
          text: "i18n国际化",
          link: "/backend/java/spring/i18n国际化.md"
        },
        {
          text: "数据校验",
          link: "/backend/java/spring/数据校验.md"
        }
      ]
    }
  ]
}

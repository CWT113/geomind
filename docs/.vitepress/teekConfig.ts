// @ts-ignore
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  // 是否启用博客首页
  teekHome: true,
  // 是否显示 vitepress 首页
  vpHome: false,
  // 是否全局给部分元素启用视图渐入过渡效果
  windowTransition: true,
  // 是否开启侧边栏折叠功能
  sidebarTrigger: true,
  // 页面 loading 加载动画
  loading: true,
  // 作者信息
  author: { name: "王一博", link: "" },
  // 锚点动画
  anchorScroll: true,
  // 站点尺寸
  themeSize: "medium",
  // 文章页配置
  pageStyle: "default",
  // 主题颜色切换动画
  viewTransition: {
    enabled: true,
    mode: "out-in",
    duration: 300,
    easing: "ease-in",
  },
  // 回到顶部
  backTop: {
    enabled: true,
    content: "progress",
    // done: TkMessage => TkMessage.success("返回顶部成功"),
  },
  // 滚动到评论区配置
  toComment: {
    enabled: false,
    // done: TkMessage => TkMessage.success("滚动到评论区成功"),
  },
  // 页脚信息
  footerInfo: {
    theme: {
      name: `基于 Teek@${version} 搭建的个人知识库`,
    },
    copyright: {
      createYear: 2025,
      suffix: "YiBo Wang",
    },
  },
  // 代码块配置
  codeBlock: {
    enabled: true,
    collapseHeight: 700,
    langTextTransform: "lowercase",
    // copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
  },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  // 主题增强
  themeEnhance: {
    enabled: true,
    position: "top",
    layoutSwitch: {
      disabled: false,
      defaultMode: "bothWidthAdjustable",
      disableHelp: true,
      disableAnimation: false,
      defaultDocMaxWidth: 95,
      disableDocMaxWidthHelp: true,
      defaultPageMaxWidth: 95,
      disablePageMaxWidthHelp: true,
    },
    themeColor: {
      // disabled: false,
      defaultColorName: "vp-green",
      defaultSpread: true,
      disableHelp: true,
      // disabledInMobile: false,
    },
    spotlight: {
      disabled: false,
      defaultStyle: "aside",
      disableHelp: true,
      defaultValue: false,
    },
  },
  // 面包屑配置
  breadcrumb: {
    enabled: true,
    showCurrentName: false,
    separator: "/",
    homeLabel: "首页",
  },
  // 文章分享配置
  articleShare: {
    enabled: true,
    text: "分享此页面",
    copiedText: "链接已复制",
    query: false,
    hash: false,
  },
  // 文章页底部的最近更新栏配置
  articleUpdate: {
    enabled: false,
    limit: 3,
  },

  // 博客风首页配置
  banner: {
    enabled: true,
    name: "🎉 welcome 王一博的博客",
    bgStyle: "fullImg",
    pureBgColor: "#28282d",
    imgSrc: createImgSrc(11),
    imgInterval: 10000,
    imgShuffle: true,
    imgWaves: true,
    mask: true,
    maskBg: "rgba(0, 0, 0, 0.2)",
    textColor: "#ffffff",
    titleFontSize: "3.2rem",
    descFontSize: "1.4rem",
    descStyle: "switch",
    description: [
      "无数个Moment，拼起来就是Forever —— 来自 Yibo Wang",
      "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
      "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
    ],
    switchTime: 4000,
    switchShuffle: false,
    typesInTime: 200,
    typesOutTime: 100,
    typesNextTime: 800,
    typesShuffle: false,
    features: [{ title: "", details: "", link: "", image: "" }],
    featureCarousel: 4000,
  },
  // 壁纸模式
  wallpaper: {
    enabled: true,
    hideBanner: false,
    hideMask: true,
  },
  // 文章配置
  post: {
    postStyle: "list",
    excerptPosition: "top",
    showMore: true,
    moreLabel: "阅读全文 >",
    emptyLabel: "暂无文章",
    coverImgMode: "default",
    showCapture: false,
    splitSeparator: false,
    transition: true,
    transitionName: "tk-slide-fade",
    listStyleTitleTagPosition: "right",
    cardStyleTitleTagPosition: "left",
    defaultCoverImg: [],
  },
  // 分页配置
  page: {
    disabled: false,
    pageSize: 10,
    pagerCount: 7,
    layout: "prev, pager, next, jumper, ->, total",
    size: "default",
    background: true,
    hideOnSinglePage: true,
  },
  // 标签背景色
  tagColor: [
    { border: "#bfdbfe", bg: "#eff6ff", text: "#2563eb" },
    { border: "#e9d5ff", bg: "#faf5ff", text: "#9333ea" },
    { border: "#fbcfe8", bg: "#fdf2f8", text: "#db2777" },
    { border: "#a7f3d0", bg: "#ecfdf5", text: "#059669" },
    { border: "#fde68a", bg: "#fffbeb", text: "#d97706" },
    { border: "#a5f3fc", bg: "#ecfeff", text: "#0891b2" },
    { border: "#c7d2fe", bg: "#eef2ff", text: "#4f46e5" },
  ],
  // 博主信息，显示在首页左边第一个卡片。
  blogger: {
    name: "王一博",
    slogan: "救赎之道，就在其中。",
    avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
    shape: "circle-rotate",
    circleBgImg: "/blog/bg4.webp",
    circleBgMask: true,
    circleSize: 100,
    color: "#ffffff",
    status: {
      icon: "😪",
      size: 24,
      title: "小小年纪就一把年纪，睡了。",
    },
  },
  // 精选文章卡片配置
  topArticle: {
    enabled: true, // 是否启用精选文章卡片
    title: "精选文章", // 卡片标题
    emptyLabel: "暂无精选文章", // 精选文章为空时的标签
    limit: 5, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
    dateFormat: "yyyy-MM-dd hh:mm:ss", // 精选文章的日期格式
  },
  // 分类卡片配置
  category: {
    enabled: true, // 是否启用分类卡片
    path: "/categories", // 分类页访问地址
    pageTitle: "全部分类", // 分类页卡片标题
    homeTitle: "文章分类", // 卡片标题
    moreLabel: "更多 ...", // 查看更多分类标签
    emptyLabel: "暂无文章分类", // 分类为空时的标签
    limit: 5, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  // 标签卡片配置
  tag: {
    enabled: true, // 是否启用标签卡片
    path: "/tags", // 标签页访问地址
    pageTitle: "全部标签", // 标签页页卡片标题
    homeTitle: "热门标签", // 卡片标题
    moreLabel: "更多 ...", //  查看更多分类标签
    emptyLabel: "暂无标签", // 标签为空时的标签
    limit: 21, // 一页显示的数量
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  // 友情链接卡片配置
  friendLink: {
    enabled: true,
    list: [
      {
        name: "Teeker",
        desc: "朝圣的使徒，正在走向编程的至高殿堂！",
        avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
        link: "http://notes.teek.top/",
      },
    ],
    title: "友情链接",
    emptyLabel: "暂无友情链接",
    limit: 5,
    autoScroll: false,
    scrollSpeed: 2500,
    autoPage: false,
    pageSpeed: 4000,
  },
});

function createImgSrc(total: number) {
  const imgArr = [];
  for (let i = 1; i <= total; i++) {
    imgArr.push(`/img/bg${i}.png`);
  }
  return imgArr;
}
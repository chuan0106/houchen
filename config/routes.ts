export default [
    {
        path: "/", // 首页路径
        redirect: "/ipad", // 重定向到 /houchen 页面
    },
    {
        path: "/ipad", component: "@/pages/Ipad", title: 'Ipad', layout: false
    },
    {
        path: "/resume", component: "index", title: 'Resume', layout: true
    },
    {
        path: "/houchen", component: "@/pages/houchen", title: '后陈', layout: false
    },
]
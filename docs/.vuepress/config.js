module.exports = {
  title: '首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '前端记录', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', {rel: 'icon', href: '/egg.png'}],  //浏览器的标签栏的网页图标
  ],
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  themeConfig: {
    logo: '/egg.png',
    lastUpdated: 'lastUpdate', // string | boolean
    nav: [
      {text: '首页', link: '/'},
      {
        text: '分类',
        ariaLabel: '分类',
        items: [
          {text: '文章', link: '/pages/folder1/test1.md'},
          {text: '琐碎', link: '/pages/folder2/test4.md'},
        ]
      },
      {text: '功能演示', link: '/pages/folder1/test3.md'},
      {text: 'Github', link: 'https://github.com/dwanda'},
    ],
    // sidebar: {
    //   '/pages/vue': [
    //     {
    //       title: 'vue',
    //       collapsable: true, // 可选的, 默认值是 true,
    //       sidebarDepth: 1,    // 可选的, 默认值是 1
    //       children: [
    //         ['vue2.md', '子菜单1'],
    //       ]
    //     }
    //   ]
    // }
    sidebar:[
      {
        title:'vue',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          ['/pages/vue/vue1.md','初始化配置文件'],
          ['/pages/vue/vue2.md','在vue中使用md5加密'],
          ['/pages/vue/vue3.md','vue-cli3  区分测试环境和生产环境'],
          ['/pages/vue/vue4.md','vue对象中的属性改变视图不更新'],
          ['/pages/vue/vue5.md','输入框只能输入正整数的最简实现'],
          ['/pages/vue/vue6.md','弹出数字键盘，只能输入数字'],
          ['/pages/vue/vue7.md','记住账号和密码'],
          ['/pages/vue/vue8.md','公共函数'],
          ['/pages/vue/vue9.md','页面缓存'],
        ]
      },
      {
                    title: 'javascript/jquery',
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                },
    ]
    //   sidebar: {
    //       '/pages/vue/':[
    //           {
    //               title: 'vue',   // 必要的
    //               collapsable: true, // 可选的, 默认值是 true,
    //               sidebarDepth: 1,    // 可选的, 默认值是 1
    //               children: [
    //                   ['vue2.md', '子菜单1'],
    //                   // ['test3.md', '子菜单2']
    //               ]
    //           },
    //           {
    //               title: 'javascript/jquery',
    //               collapsable: true, // 可选的, 默认值是 true,
    //               children: [
    //                   ['test2.md', '子菜单1']
    //               ]
    //           },
    //         {
    //           title: '小程序',
    //           collapsable: true, // 可选的, 默认值是 true,
    //           children: [
    //             ['test2.md', '子菜单1']
    //           ]
    //         },
    //         {
    //           title: 'css',
    //           collapsable: true, // 可选的, 默认值是 true,
    //           children: [
    //             ['test2.md', '子菜单1']
    //           ]
    //         },
    //         {
    //           title: '兼容性',
    //           collapsable: true, // 可选的, 默认值是 true,
    //           children: [
    //             ['test2.md', '子菜单1']
    //           ]
    //         }
    //       ],
    //   }
  }
}

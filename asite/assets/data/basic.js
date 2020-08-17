const introText = [{
        id: 1,
        text: [{
                l: '',
                t: '我是 —— '
            }, {
                l: 'https://juejin.im/user/5bcd67a8e51d457947022910',
                t: '掘金安东尼',
                s: "font-weight:700"
            },
            {
                l: '',
                t: '，一名',
            },
            {
                l: 'https://www.zhihu.com/question/19589966',
                t: ' 前端开发工程师 ',
            }
        ]
    },
    {
        id: 2,
        text: [{
            l: '',
            t: '我使用 GitHub Page 托管'
        }, {
            l: 'https://tuaran.github.io',
            t: ' 我的博客 ',
        }, {
            t: '用于分享交流技术与生活'
        }]
    },
    {
        id: 3,
        text: [{
            l: '',
            t: '非常欢迎你能到我的'
        }, {
            l: 'https://github.com/TUARAN',
            t: ' 仓库主页 ',
        }, {
            t: '互相 follow !⭐star⭐！'
        }]
    },
    {
        id: 4,
        text: [{
                l: '',
                t: '你也可在这些地方找到我：'
            }, {
                l: 'https://juejin.im/user/5bcd67a8e51d457947022910',
                t: ' 掘金 ',
            },
            {
                t: '、',
            },
            {
                l: 'https://www.zhihu.com/people/tu-tu-tu-tu-tu-25-1',
                t: ' 知乎 ',
            }, {
                t: '、',
            },

            {
                l: 'https://blog.csdn.net/qq_37969897/',
                t: ' CSDN ',
            }, {
                t: '、',
            },
            {
                l: 'https://www.huxiu.com/member/2412214.html',
                t: ' 虎嗅 ',
            },
            {
                t: '、',
            }, {
                l: 'https://leetcode-cn.com/u/tuaran/',
                t: '力扣',
            }
        ]
    },
    {
        id: 5,
        text: [{
            l: '',
            t: '我将努力在这些平台保持活跃，你愿意与我同行吗？',
        }]
    }
]
const articleArr = [{
        item: "《Vue(v2.6.11)万行源码生啃，就硬刚！》",
        link: 'https://juejin.im/post/5f02f0bdf265da22ef7dbe5d',
        view: '2.5w+',
        like: '1k+'
    },
    {
        item: "《内鬼消息：串联高频面试问题，值得一看！》",
        link: 'https://juejin.im/post/5f0aa7ac6fb9a07e654fa26b',
        view: '4.5k+',
        like: '70+'
    },
    {
        item: "《腾讯面试四问，Are you OK?》",
        link: 'https://juejin.im/post/6854899692178948109',
        view: '6k+',
        like: '200+'
    },
    {
        item: "《作为一个卑微的前端仔，我收集了哪些网站链接？》",
        link: 'https://juejin.im/post/6844903940094590984',
        view: '',
        like: ''
    },
    {
        item: "《重读 ES6 标准入门（第3版）》",
        link: 'https://juejin.im/post/6844903944297119751',
        view: '1.6k+',
        like: ''
    },
    {
        item: "《《程序员幽默指南》，你是那个弄潮儿吗？》",
        link: 'https://juejin.im/post/6847902224866082824',
        view: '',
        like: ''
    },
    {
        item: "《即使路的终点是迷宫，也请吾辈迎风向前 | 掘金征文》",
        link: 'https://juejin.im/post/6854573215151292430',
        view: '',
        like: ''
    }

]
const focusArr = [{
        "关注": '科哲神学',
        "备注": "feat.量子力学",
    },
    {
        "关注": '电影解说',
        "备注": "也想当个电影解说的 youtuber",
    },
    {
        "关注": '微信读书',
        "备注": "向五百小时进发！",
    },
    {
        "关注": '股票',
        "备注": "A股虐我千百遍，我待A股如初恋",
    },
    {
        "关注": '壁纸制作',
        "备注": "https://wallhaven.cc/user/paperhawen"
    },

    {
        "关注": 'JRS',
        "备注": "玩梗别认真"
    },
    {
        "关注": '祖安狂人',
        "备注": "我亚索真的挺6"
    },
];
const performanceTime = [{
        dimension: 'DNS查询耗时',
        time: performance.timing.domainLookupEnd - performance.timing.domainLookupStart
    },
    {
        dimension: 'TCP链接耗时',
        time: performance.timing.connectEnd - performance.timing.connectStart
    },
    {
        dimension: 'request请求耗时',
        time: performance.timing.responseEnd - performance.timing.responseStart
    },
    {
        dimension: '解析DOM树耗时',
        time: performance.timing.domComplete - performance.timing.domInteractive
    },
    {
        dimension: '白屏时间',
        time: performance.timing.responseStart - performance.timing.navigationStart
    },
    {
        dimension: 'domready时间用户可操作时间节点',
        time: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
    },
    {
        dimension: 'onload时间总下载时间',
        time: performance.timing.loadEventEnd - performance.timing.navigationStart
    }
]
export {
    introText,
    articleArr,
    focusArr,
    performanceTime
}
// feat - 新功能 feature
// fix - 修复 bug
// docs - 文档注释
// style - 代码格式
// refactor - 重构、优化
// perf - 性能优化
// test - 增加测试
// chore - 构建过程或辅助工具的变动
// revert - 回退
// build - 打包

// done - 完成
// delay - 推迟
// fail - 失败

const plan = {
    site: {
        pre: {
            '07-29': [
                'feat: 新增显示加群图片'
            ],
            '07-30': [
                "feat: 新增侧边抽屉展示日历功能",
                "refactor: 优化“近期计划”Tab栏目"
            ],
            '08-01': [
                "feat: 新增文章滚动推荐",
            ]
        },
        check: {
            '07-30': [
                "done: 完成新增侧边抽屉展示日历功能",
                "done: 完成优化“近期计划”Tab栏目"
            ]
        }
    },
    write: {
        pre: {
            '07-29': [
                'feat: 新增掘金文章输出：拒绝 CV 系列之原型链相关'
            ],
        },
        check: {
            '07-29': [
                'delay: 改为撰文《腾讯面试四问，Are you OK?》（已完成）'
            ],
        }
    },
    study: {
        pre: {
            '08-03': [
                'feat: 新增“基于 Vue3 的后台管理系统模板-套娃”落地计划'
            ],
            '08-05': [
                'feat: 新增“TS 系列学习”落地计划'
            ]
        },
        check: {

        }
    },
    life: {
        pre: {
            '07-30': [
                "init: 公众号基础功能初始化"
            ],
            '08-02': [
                "init: 公众号基础介绍，热点文章搬运"
            ]
        },
        check: {
            '07-30': [
                "fail：时间用于个站维护"
            ]
        }
    },
    read: {
        pre: {},
        check: {}
    },
    walk: {
        pre: {},
        check: {}
    },
}
export {
    plan
}
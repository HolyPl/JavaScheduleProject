import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import ShowSchedule from '../components/ShowSchedule.vue'

// 不要在 router.js 中单独创建 Pinia 实例
// 在组件中正常导入 defineUser() 并调用它即可，Pinia 会自动使用全局注册的那个实例。
// 因为 Vue App 已经通过 app.use(pinia) 注册了全局 Pinia 实例。
// 如果此处再导入pinia，会导致你使用的 store 和 Vue 组件中的是两个不同的实例，数据不会同步！

import { defineUser} from '../store/userStore'


const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            // redirect:"showSchedule"
            // 下面我们添加了路由的全局前置守卫，以防止直接进入showSchedule
            // 因此这里需要直接进入showSchedule，不然/还是能进入showSchedule而不做判断
            component:Login
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/regist",
            component:Regist
        },
        {
            path:"/showSchedule",
            component:ShowSchedule
        }
    ]
})

// 添加路由全局前置守卫，判断是否可以访问showSchedule
router.beforeEach((to,from,next)=>{
    const sysUser=defineUser() // 自动使用 app.use(pinia) 注入的实例
    if(to.path=='/showSchedule'){
        // 登录则放行
        // 没登入要回到login
        if(sysUser.username==''){
            next("/login")
        }
        else{
            next()
        }
    }
    else{
        next()

    }
})

export default router
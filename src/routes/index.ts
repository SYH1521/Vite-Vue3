import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ElMessage } from "element-plus";
import { getToken } from "@/store/modules/auto";

export const Layout = () => import('@/layout/index.vue')

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/dashboard',
    component: Layout,
    meta: { title: '首页', icon: 'homepage', affix: true },
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/view/redirect/index.vue'),
      meta: { title: '首页', icon: 'homepage', affix: true },
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/view/user/index.vue'),
      meta: { title: '用户列表', icon: 'homepage', affix: true },
    },{
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/view/schedule/index.vue'),
      meta: { title: '日程管理', icon: 'homepage', affix: true },
    }]
  },
  {
    path: '/login',
    name: 'login',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import('@/view/login/index.vue')
  },
  {
    // 配置404页面
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/view/error-page/404.vue'),
  }
]
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = getToken();
    if (token) {
      next();
    } else {
      next('/login')
    }
  }
});

// 导出
export default router 
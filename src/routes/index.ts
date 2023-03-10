import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ElMessage } from "element-plus";

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'redirect',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import('@/view/redirect/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import('@/view/login/index.vue')
  },
  {
    // 配置404页面
    path: '/404',
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
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     // 登录或者注册才可以往下进行
//     next();
//   } else {
//     // 获取 token
//     // const token = localStorage.getItem('Authorization');
//     // token 不存在
//     ElMessage.error('您还没有登录，请先登录');
//     next('/login');

//   }
// });

// 导出
export default router 
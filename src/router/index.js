import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/Home')
// 两个端的路由
const studentHome = () => import('../components/student/studentHome')
const teacherHome = () => import('../components/teacher/teacherHome')

// studentHome页面下的子组件
const personalCenter = () => import("../components/student/personalCenter");
const readyContent = () => import("../components/student/readyContent");
const instructor = () => import("../components/student/instructor");

// teacherHome页面下的子组件
const myTopic = () => import("../components/teacher/myTopic");
const newlyAdded = () => import("../components/teacher/newlyAdded");
const topicManage = () => import("../components/teacher/topicManage");
const personalCenter2 = () => import("../components/teacher/personalCenter");

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: home,
    children: [
      {
        path: 'studentHome',
        name: 'stuHome',
        component: studentHome,
        children: [
          {
            path: '/',
            meta: {title: '首页'},
            component: () => import('../components/student/index')
          },
          {
            path: 'personalCenter',
            meta: {title: '个人中心'},
            component: personalCenter
          },
          {
            path: 'readyContent',
            meta: {title: '我的预选'},
            component: readyContent
          },
          {
            path: 'myTopic',
            meta: {title: '我的课题'},
            component: () => import('../components/student/myTopic')
          },
          {
            path: 'instructor',
            component: instructor
          }
        ]
      },
      {
        path: 'teacherHome',
        component: teacherHome,
        children: [
          {
            path: '/',
            name: 'TeaHome',
            meta: {title: '首页'},
            component: () => import('../components/student/index')
          },
          {
            path: 'myTopic',
            meta: {title: '我的课题'},
            component: myTopic
          },
          {
            path: 'newlyAdded',
            meta: {title: '添加课题'},
            component: newlyAdded
          },
          {
            path: 'topicManage',
            meta: {title: '管理课题'},
            component: topicManage
          },
          {
            path: 'personalCenter',
            meta: {title: '个人中心'},
            component: personalCenter2
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {title: '登录'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/password/update',
    name: 'passwordUpdate',
    meta: {title: '密码修改'},
    component: () => import(/* webpackChunkName: "about" */ '../views/passwordUpdate')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(( to, from, next) => {
  if(to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
})

export default router

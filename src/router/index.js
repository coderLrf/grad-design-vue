import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/Home')
// 两个端的路由
const studentHome = () => import('../components/student/studentHome')
const teacherHome = () => import('../components/teacher/teacherHome')

// studentHome页面下的子组件
const personalCenter = () => import("../components/student/personalCenter")
const readyContent = () => import("../components/student/readyContent")
const instructor = () => import("../components/student/instructor")

// teacherHome页面下的子组件
const myTopic = () => import("../components/teacher/myTopic")
const newlyAdded = () => import("../components/teacher/newlyAdded")
const topicManage = () => import("../components/teacher/topicManage")
const personalCenter2 = () => import("../components/teacher/personalCenter")
const myStudent = () => import('../components/teacher/myStudent')

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
            path: 'communicate',
            meta: {title: '沟通'},
            component: () => import('../components/student/communicate')
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
          {
            path: 'myStudent',
            meta: {title: '我的学生'},
            component: myStudent
          }
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
/**
 * 路由导航守卫
 */
router.beforeEach(( to, from, next) => {
  if(to.meta.title) {
    window.document.title = to.meta.title
  }
  if(to.path === '/' || to.path === '/login' || to.path=== '/password/update') {
    // 如果是首页或者登录页面，直接放行
    return next()
  }
  // 从session中取出user对象，判断是否存在，如果不存在，未登录
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果存在用户
  if(user) {
    // 从user对象中取出身份
    const identity = user.identity
    // 身份拦截
    if(to.path.indexOf(identity) === -1) {
      // 如果身份错误
      Vue.prototype.$message.warning('请正确的访问路径哟~')
      // 返回刚才进入的路径
      return setTimeout(() => {
        history.back()
      }, 800)
    }
  } else { // 如果还没有登录，请先登录
    Vue.prototype.$message.warning('您还未登录，请先登录哟~')
    next('/login')
  }
  next()
})

export default router

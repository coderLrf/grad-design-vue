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
const topicManagment = () => import("../components/teacher/topicManagement");
const personalCenter2 = () => import("../components/teacher/personalCenter");



Vue.use(VueRouter)

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  // if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: home,
    children: [
      {
        path: 'studenthome',
        component: studentHome,
        children: [
          {
            path: 'personalCenter',
            component: personalCenter
          },
          {
            path: 'readyContent',
            component: readyContent
          },
          {
            path: 'instructor',
            component: instructor
          }
        ]
      },
      {
        path: 'teacherhome',
        component: teacherHome,
        children: [
          {
            path: 'mytopic',
            component: myTopic
          },
          {
            path: 'newlyAdded',
            component: newlyAdded
          },
          {
            path: 'topicmanagment',
            component: topicManagment
          },
          {
            path: 'personalcenter',
            component: personalCenter2
          },
        ]
      },
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(( to, from, next) => {
//   if(to.name == 'studenthome'){
//     console.log(1)
//   }
// })

export default router

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// window.addEventListener('storage', () => {
//   console.log('监听了变化')
// }, false)

const state = {
  // 登录账号对象
  userForm: JSON.parse(window.localStorage.getItem('user'))
}
const actions = {
  //这里面的方法是用来异步触发mutations里面的方法,context与store 实例具有相同方法和属性
  resetVuex(context) {
    context.commit('outLogin')
  },
  updateUser(context, user) { // 更新用户对象
    // 更新vuex用户对象之前，先更新local的user对象
    window.localStorage.setItem('user', JSON.stringify(user))
    context.commit('updateUser', user)
  }
};

const mutations = {
  login(state, form) {
    state.userForm = form
  },
  outLogin(state) {
    state.userForm = null
  },
  updateUser(state, user) {
    state.userForm = user
  }
}

const getters = {
  user(state) {
    return state.userForm
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  // 登录账号对象
  userForm: null
}
const actions = {
  //这里面的方法是用来异步触发mutations里面的方法,context与store 实例具有相同方法和属性
  resetVuex(context) {
    context.commit('outLogin')
  },
  updateUser(context, user) { // 更新用户对象
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
  getters,
  plugins: [createPersistedState()]
})
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    count: 0,
    // 学生或老师id
    top: '',
    // 学生或老师的名字
    name: '',
    // topic id
    id: 0,
    // 学生子组件状态
    stuhomeState: '',
    // home侧边导航栏高亮索引
    heightLightIndex: "1",
    // 教师子组件状态
    teacherState: '',
}
const mutations = {
    changeTop(state, t = '') {
        return (state.top = t)
    },
    changeName(state, n = '') {
        return (state.name = n)
    }, 
    changeId(state, i = '') {
        return (state.id = i)
    },
    changeState(state,[path,token] ){
        return (
            state.stuhomeState = path,
            state.heightLightIndex = token
            )
    },
    changeTeacherState(state, path){
        return state.changeTeacherState = path
    }
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [createPersistedState()]
})
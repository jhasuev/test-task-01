import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state(){
    return {
      acctPos: [],
      opEntry: [],
    }
  },
  getters: {
    getAcctPos: state => state.acctPos,
    getOpEntry: state => state.opEntry,
  },
  mutations: {
    setData(state, { fileName, data }) {
      state[fileName] = data
    },
  },
  actions: {
    async loadFile({ commit }, fileName) {
      const data = await require(`@/server/${fileName}`)
      commit('setData', { fileName, data })
    },
  },
})

export default store

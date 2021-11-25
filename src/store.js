import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state(){
    return {
      acctPos: null,
      opEntry: null,
      opDate: null,
    }
  },
  getters: {
    getAcctPos: state => state.acctPos || [],
    getOpEntry: state => state.opEntry || [],
    getOpDate: state => state.opDate || [],
    getStoreItemByParams: state => (storeName, id) => (state[storeName] || []).find(item => item.id == id),
  },
  mutations: {
    SET_DATA(state, { fileName, data }) {
      state[fileName] = data
    },

    REMOVE_ITEM(state, { storeName, id }) {
      state[storeName] = state[storeName].filter(item => item.id != id)
    },

    EDIT_ITEM(state, { storeName, id, items }) {
      const editingItem = state[storeName].find(item => item.id === id)
      for(let key in items) {
        editingItem[key] = items[key]
      }
    },

    ADD_ITEM(state, { storeName, items }) {
      state[storeName].push(items)
    },
  },
  actions: {
    async loadFile({ commit, state }, fileName) {
      if (!state[fileName]) {
        let data = await require(`@/server/${fileName}`)
        data = data.map((item, index) => ({ ...item, id: index + 1 }))
        commit('SET_DATA', { fileName, data })
      }
    },

    removeItem({ commit }, payload) {
      commit('REMOVE_ITEM', payload)
    },

    editItem({ commit }, payload) {
      commit('EDIT_ITEM', payload)
    },

    addItem({ commit }, payload) {
      commit('ADD_ITEM', payload)
    },
  },
})

export default store

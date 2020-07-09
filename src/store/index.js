import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputData:"",
    radioLabel:0,
  },
  mutations: {
    increment(state, payload){
      state.inputData = payload.newInput;
      state.radioLabel = payload.newLabel;
    }
  },
  actions: {
  },
  modules: {
  }
})

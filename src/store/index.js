import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputData:"",
    radioLabel:0,
    year:'',
    venue:'',
    type:'',
    authors:[],
    host:"http://192.168.3.5:8080",

    refineData:'',
    typeArry:[],
  },
  mutations: {
    increment(state, payload){
      state.inputData = payload.newInput;
      state.radioLabel = payload.newLabel;
    },
    incrementRadio(state,payload){
      state.radioLabel = payload.newLabel;
    },
    incrementType(state,payload){
      state.type = payload.newType;
    },
    incrementCleanType(state){
      state.type = '';
    },
    incrementVenue(state,payload){
      state.venue = payload.newVenue;
    },
    incrementCleanVenue(state){
      state.venue = '';
    },
    incrementYear(state,payload){
      state.year = payload.newYear;
    },
    incrementCleanYear(state){
      state.year = '';
    },
    incrementAuthor(state, payload){
      state.authors.push(payload.newAuthor);
    },
    incrementCleanAuthor(state, payload){
      state.authors.splice(state.authors.indexOf(payload.moveAuthor),1);
    },
    incrementRefineData(state, payload){
      state.refineData.push(payload.newFilter);
    },
    incrementTypeArray(state, payload){
      state.typeArry = payload.newTypeArray;
    },

  },
  actions: {
  },
  modules: {
  }
})

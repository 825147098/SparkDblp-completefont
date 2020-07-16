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
    // filterOb:{
    //   venue:'',
    //   authors:[],
    //   search:'',
    //   'book and thesis':'',
    //   'conference and workshop':'',
    //   'series':'',
    //   'informal':'',
    //   'incollection':'',
    //   'journals article':''
    // },


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
    incrementRefineData(state, payload){
      state.refineData.push(payload.newFilter);
    },


  },
  actions: {
  },
  modules: {
  }
})

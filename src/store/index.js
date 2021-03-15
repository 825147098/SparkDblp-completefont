import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        radioLabel: 0,
        inputfalg: false,

        backgroundEffect: true,

        // host: "http://192.168.100.44:8080",
        host: "http://localhost:8080",

        showObj: {
            authorflag: true,
            venueflag: true,
        },

        //出版物搜索的搜索条件
        queryObj: {
            title: '',
            RSQLArray: [],
        },

        //出版物搜索返回的列表
        returnList: [],
        //作者refineList
        authorRefineList: [],
        //type refineList
        typeRefineList: [],
        //YearRefineList
        yearRefineList: [],
        //venueRefineList
        venueRefineList: [],
        serchObj: {
            year: '',
            venue: '',
            type: '',
            authors: [],
            title: '',
            filter: '',
            yearflag: false,
            autflag: false,
            typeflag: false,
            venflag: false,
            conflag: false,
        }

    },
    mutations: {
        setQueryObj(state, payload) {
            state.queryObj = payload
        },
        setReturnList(state, payload) {
            state.returnList = payload
        },
        setTypeRefineList(state, payload) {
            state.typeRefineList = payload
        },
        setYearRefineList(state, payload) {
            state.yearRefineList = payload
        },
        setVenueRefineList(state, payload) {
            state.venueRefineList = payload
        },
        setAuthorRefineList(state, payload) {
            state.authorRefineList = payload
        },
        increment(state, payload) {
            state.serchObj.title = '';
            state.serchObj.venue = '';
            state.serchObj.type = '';
            state.serchObj.authors = [];
            state.serchObj.year = '';

            state.radioLabel = payload.newLabel;
            state.serchObj.title = payload.newInput.title;
            state.serchObj.filter = payload.newInput.filter;
            // state.serchObj.venue = payload.newInput.venue;
            // state.serchObj.type = payload.newInput.type;
            // state.serchObj.authors = payload.newInput.author;
            // state.serchObj.year = payload.newInput.year;
            state.serchObj.yearflag = true;
            state.serchObj.autflag = true;
            state.serchObj.typeflag = true;
            state.serchObj.venflag = true;
            state.serchObj.conflag = true
            state.inputfalg = true;
        },
        incrementRadio(state, payload) {
            state.radioLabel = payload.newLabel;
        },
        incrementType(state, payload) {
            state.serchObj.type = payload.newType;
            state.inputfalg = true;
        },
        incrementCleanType(state) {
            state.serchObj.type = '';
            state.inputfalg = true;
        },
        incrementVenue(state, payload) {
            state.serchObj.venue = payload.newVenue;
            state.inputfalg = true;
        },
        incrementCleanVenue(state) {
            state.serchObj.venue = '';
            state.inputfalg = true;
        },
        incrementYear(state, payload) {
            state.serchObj.year = payload.newYear;
            state.inputfalg = true;
        },
        incrementCleanYear(state) {
            state.serchObj.year = '';
            state.inputfalg = true;
        },
        incrementAuthor(state, payload) {
            state.serchObj.authors.push(payload.newAuthor)
            state.inputfalg = true;
        },
        incrementCleanAuthor(state, payload) {
            state.serchObj.authors.splice(state.serchObj.authors.indexOf(payload.moveAuthor, 1))
            state.inputfalg = true;
        },
        incrementCleanFlag(state, payload) {
            state.serchObj[payload.flag] = false;
        },
        incrementCleanInputFlag(state) {
            state.inputfalg = false;
        },
        incrementInputData(state, payload) {
            state.inputData = payload.data;
        },
        incrementSetSerchAut(state) {
            state.showObj.authorflag = true
        },
        incrementCleanSerchAut(state) {
            state.showObj.authorflag = false
        },
        incrementSetSerchVen(state) {
            state.showObj.venueflag = true
        },
        incrementCleanSerchVen(state) {
            state.showObj.venueflag = false
        },
        turnOnbackgroundEffect(state) {
            state.backgroundEffect = true;
        },
        turnOffbackgroundEffect(state) {
            state.backgroundEffect = false;
        }


    },
    actions: {},
    modules: {}
})

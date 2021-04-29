import Vue from 'vue'
import Vuex from 'vuex'
import gpa from "./modules/gpa";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        gpa
    },
    plugins: [createPersistedState()]
})

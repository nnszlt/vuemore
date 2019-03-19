import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import event from './modules/event'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations,
  getters,
  actions,
  modules: { event }
})

export default store

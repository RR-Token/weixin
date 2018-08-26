import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as actions from './action.js'
import * as mutations from './mutation.js'

console.log('store/index.js>>>>', state)

const state = {
    token: window.localStorage.getItem('token'),
    loginUser: null,
    tokenList: null,
    tokenDetail: null,
    tokenid: null, //   这个id指用户发布那个token的详情id
    likers: null,
    balance: null,
    flow: null,
    owerList: null,
    reward: null,
    fee: null,
    qrurl: '',
    addToken: null
}
export default new Vuex.Store({
    state,
    actions: actions,
    mutations: mutations.default,
});

 
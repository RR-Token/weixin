import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as actions from './action.js'
import * as mutations from './mutation.js'

// 缓存token，后续修改浏览器url需要用到
let _token = window.location.search.split('=')[1];
_token && _token.length > 0 && window.localStorage.setItem('token', window.location.search.split('=')[1]);

console.log('store/index.js>>>>', state)
console.log('token:>>>>>>>>>', window.localStorage.getItem('token'));

const state = {
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjVkZGMxOGE0ODMzOTAwMGY5Y2ZiMzIiLCJpYXQiOjE1MzM0MzgwNDUsImV4cCI6MTUzNjAzMDA0NX0.pYaRkOMkGQFV7VEP-ilDoFh-lA0dpbc7pVmlSxKViSI',
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
    fee: null
}
export default new Vuex.Store({
    state,
    actions: actions,
    mutations: mutations.default,
});

 
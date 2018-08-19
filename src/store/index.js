import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as actions from './action.js'
import * as mutations from './mutation.js'

// 用于授权的apid
let appid = 'wxad6f9eeeede1e65b'
// 授权成功后重定向的地址
let redirect_uri = 'https://mindflow.pro/login/rrtoken'
// 标识
let wx_state = 'rrtoken-mp'
// 登录授权链接
let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${wx_state}#wechat_redirect`


// 缓存token，后续修改浏览器url需要用到
let _token = window.location.search.split('=')[1];
_token && _token.length > 0 && window.localStorage.setItem('token', window.location.search.split('=')[1]);

// token存在时说明已经授权过了
// alert(typeof window.localStorage.getItem('token').toString());
if(!window.localStorage.getItem('token')) {
    alert('准备授权：'+authUrl)
    window.location.href = authUrl;
} else {
    alert('授权成功:'+window.localStorage.getItem('token'));
}

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
    fee: null,
    qrurl: ''
}
export default new Vuex.Store({
    state,
    actions: actions,
    mutations: mutations.default,
});

 
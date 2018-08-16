// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

console.log('main.js>>>>>>>>>>>>>>>', store);

// app启动后修改url,防止分享url暴露的用户token
history.replaceState({
	key: 'first load'
}, 'catch token', window.location.hash === '#/' ? '/' : window.location.hash)

// 要先记录用户第一次进来的页面，授权成功后，重定向到记录页面；没有记录说明是首页
// 如果是授权成功回调的链接不需要缓存
let _search = window.location.search
	,_s_tag = _search != '' ? true : false
	,_hash = window.location.hash
	,_h_tag = _hash != '' ? true : false;

// 分享进来的url，如果不是授权url，就缓存起来，授权成功后跳转
if (!_s_tag && _h_tag) {
	console.log('有hash', router);
	window.localStorage.setItem('RRT_HASH_SHARE_PAGE', _hash);
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { App }
})

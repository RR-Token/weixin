<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
	name: "app",
	created() {
		// 应用启动的时候判断是否有缓存的hash，如果有，说明是分享进来的，那么久跳转过去，然后清空hash
		if(window.location.hash === '#/senddetail') {
			// this.$router.push('/detail')
		}
		// 再获取登录信息
		this.$store.dispatch('getUser');
	}
};
</script>

<style lang="less">
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		background-color: #eef1f6;
		width: 100vw;
		height: 100vh;
		overflow: auto;
	}
</style>

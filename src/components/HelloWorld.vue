<template>
	<div class="hello">
		<div class="header">{{ wxTitle }}</div>

		<div class="card">
			<div class="title border-bottom">这里其实什么都没有</div>
			<router-link class="title border-bottom" tag="div" :to="{path: 'list'}">直接开始开发吧</router-link>
		</div>
		
	</div>
</template>

<script>
export default {
  	name: "HelloWorld",
	data() {
		return {
			wxTitle: "基础开发环境"
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>

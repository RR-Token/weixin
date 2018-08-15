<template>
	<div class="hello">
		<div class="container">
			<scroller>
				帮助文档
			</scroller>
		</div>
	</div>
</template>

<script>
export default {
  	name: "Helper",
	data() {
		return {
			wxTitle: "帮助"
		};
	},
	methods: {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.container {
		height: 100vh;
		background-color: rgba(242,244,248,1);
		overflow: hidden;
		position: relative;
	}
</style>

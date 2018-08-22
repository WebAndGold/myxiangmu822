<template>
	<div class="xiaoxi">
		<div>
			<div class="xiaoxi-fanhui" @click="xiaoxifanhui()">
				<i class="icon iconfont icon-zuojiantou"></i>
			</div>
			<h1>我的消息页面</h1>
		</div>
		<p>界面暂时未完成!!!!</p>
	</div>
</template>

<script>
	export default{
		name:'xiaoxi',
		data(){
			return {
				
			}
		},
		methods:{
			xiaoxifanhui(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.xiaoxi h1{
		width: 100%;
		height: 4rem;
		background: #ddd;
		text-align: center;
		line-height: 4rem;
	}
	.xiaoxi p{
		text-align: center;
	}
	.xiaoxi-fanhui{
		float: left;
		margin-left: 1rem;
		line-height: 4rem;
		height: 100%;
	}
	.xiaoxi-fanhui i{
		font-size: 2rem;
	}
</style>
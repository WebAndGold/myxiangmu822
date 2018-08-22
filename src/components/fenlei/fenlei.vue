<template>
	<div class="register-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			分类
		</div>
		<h1>分类</h1>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	methods:{
			loginback(){
				this.$router.go(-1);
			},
	}
}
</script>

<style>
.register-main{
    color: #616161;
    font-size: .17rem;
    z-index: 999;
    text-align: center;
    font-size: 1rem;
    background: #fff;
    background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
}
.register-top{
	width: 100%;
	background: #f9f9f9;
	height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #bbb;
}
.register-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
</style>
<template>
	<div class="home">
		
		<router-view></router-view>
		<div class="tab">
			<router-link to="/homenews" tag="div" class="tab-item">
				<i class="icon iconfont icon-zhuye"></i>				
				<span class="text">首页</span>
			</router-link>
			<router-link to="/fenlei" tag="div" class="tab-item">
				<i class="icon iconfont icon-leimupinleifenleileibie1"></i>				
				<span class="text">分类</span>
			</router-link>			
			<router-link to="/faxian" tag="div" class="tab-item">
				<i class="icon iconfont icon-faxian"></i>
				
				<span class="text">发现</span>
			</router-link>			
			<router-link to="/cart" tag="div" class="tab-item">
				<i class="icon iconfont icon-icon1"></i>
				
				<span class="text">购物车</span>
			</router-link>
			
			<router-link to="/login" tag="div" class="tab-item" v-show="!loginState">
				<i class="icon iconfont icon-denglu"></i>					
				<span class="text">未登陆</span>
			</router-link>
			
			
			<router-link to="/user" tag="div" class="tab-item" v-show="loginState">
				<i class="icon iconfont icon-yonghuzhongxin"></i>					
				<span class="text">用户中心</span>
			</router-link>
			
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutation,mapAction} from 'vuex'
	
	export default{
		name:'home',
		data(){
			return {
				
			}
		},
		components:{			
		},
		computed:{
			...mapState(['user','showLeftFlag','loginState'])
		},
		mounted(){
			this.$store.dispatch('logined')
		}
	}
</script>

<style>
	.tab{
		border-top-color: #E4E4E4;
    	background-color: #fff;
    	line-height: 1.5!important;
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	z-index: 1000;
    	border-top: 1px solid #e4e4e4;
		clear:both;
		width:100%;
		height:50px;
		display: flex;		
	}
	.tab-item{
		/*width: 20%;*/
		flex: 1;
		text-align:center;
		height: 49px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.tab-item i{
		font-size: 25px;
		color: #999;
	}
	.tab-item .text{
		font-size: 12px;
	}
	.router-link-active{
		color: red;
	}
	.router-link-active i{
		color: red;
	}
</style>
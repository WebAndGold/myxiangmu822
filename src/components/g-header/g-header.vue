<template>
	<div class="header">
		<div class="fenlei" @click="showLeftBar">
			<i class="icon iconfont icon-mulu"></i>
		</div>
		<router-link to="/search" tag="div" class="go-seach">
			<div class="going-seach">
				<i class="icon iconfont icon-sousuo"></i>
				<input type="text" placeholder="用劵满199减40"/>
			</div>
		</router-link>
		<router-link to="cart" class="to-cart">
			<i class="icon iconfont icon-icon1"></i>
		</router-link>
		
		<left-bar></left-bar>
	</div>
</template>

<script>
	import leftBar from '@/components/leftbar/leftbar'
	import { mapState,mapMutations,mapActions } from 'vuex'
	import store from '../../store/store.js'
	
	export default{
		name:'g-header',
		data(){
			return {}
		},
		methods:{
			showLeftBar(){
				store.dispatch('showLeftA')
				console.log(123)
			}
		},
		components:{
			leftBar
		},
		computed:{
			...mapState(['user','showLeftFlag','loginState'])
			
		}
	}
</script>

<style>
	.header{
		height: 45px;
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		color: #fff;
		background: rgba(208,36,29,0.5);
		display: flex;
		color: #fff;
		z-index: 10;
	}
	.fenlei{
		height: 100%;
		width: 10%;
		/*background: #42B983;*/
		display: flex;
		justify-content: center;
		text-align: center;
		line-height: 2;
		font-size: 22px;
	}
	.fenlei i{
		font-size: 22px;
		color: #fff;
	}
	.go-seach{
		height: 100%;
		width: 80%;
	}
	.going-seach{
		border-radius: 15px;
		background: #ddd;
		width: 95%;
		height: 70%;
		margin: auto auto;
		margin-top: 8px;
	}
	.going-seach>i{
		font-size: 22px;
		text-align: center;
		vertical-align: middle;
		margin-left: 3px;
	}
	.going-seach>input{
		outline: none;
		border: none;
		height: 85%;
		width: 80%;
		background: #ddd;
		font-weight: 400;
		margin-left: 10px;
		color: #fff;
		font-size: 1rem;
	}
	.to-cart{
		width: 10%;
		height: 100%;
		text-decoration: none;
	}
	.to-cart i{
		display: flex;
		justify-content: center;
		text-align: center;
		line-height: 2;
		font-size: 22px;
		color: #fff;
	}	
</style>
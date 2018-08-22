<template>
	<div class="page-swipe">
		<mt-swipe :show-indicators="false" :auto='3000'>
			<mt-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
				<router-link to="">
					<img v-lazy="item.imageUrl" alt="" @click="sorry"/>
				</router-link>
				<div class="item-title">{{item.title}}</div>
			</mt-swipe-item>
			
		</mt-swipe>
	</div>
</template>

<script>
	import {Toast,ImagePreview} from 'vant'
	import { Swipe, SwipeItem } from 'mint-ui'	
	import url from '@/urlRouter.js'
	import axios from 'axios'
	
	export default{
		name:'',
		data(){
			return {
				bannerPicArray:[]
			}
		},
		components:{
			Swipe,
			SwipeItem
		},
		methods:{
			sorry() {
			    Toast('暂无后续逻辑~');
			},
		},
		created(){
			axios({
				method:'get',
				url:'http://132.232.106.129/allPHP/phpbases/g_banner.php',
				responseType:'json'
			}).then((response)=>{
				for(var i=0;i<response.data.length;i++){
					this.bannerPicArray.push(response.data[i])
				}
				console.log(this.bannerPicArray)
			})
		}
	}
</script>

<style>
	.mint-swipe{
		height: 140px;
	}
	.mint-swipe-item img{
		width: 100%;
		height: 100%;
	}
	.item-title{
		color:#fff;
        font-size:15px;
        text-indent:10px;
        text-align:center;
        position:absolute;
        width:100%;
        height:30px;
        bottom:0px;
        line-height:30px;
        left:0px;
        display:block;
        background-color:rgba(0,0,0,0.5);
	}
	.page-swipe{
		height: 140px;
	}
</style>
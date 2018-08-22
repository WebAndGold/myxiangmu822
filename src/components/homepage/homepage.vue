<template>
	<div class="homepage">
		<gBanner></gBanner>
		<div class="homeImg">
			<img src="./jd2.jpg" alt="" />
		</div>
		<g-homebar :homebarData="category"></g-homebar>
		<gSeckill :seckillData="recommendGoods"></gSeckill>
		<gCommendfollr :floorData="floor1" :floorNames="floorName.floor1"></gCommendfollr>
		<gCommendfollr :floorData="floor2" :floorNames="floorName.floor2"></gCommendfollr>
		<gCommendfollr :floorData="floor2" :floorNames="floorName.floor3"></gCommendfollr>
		<gHotgoods :hotgoodsData="hotGoods"></gHotgoods>
	</div>
</template>

<script>
	import gBanner from '@/components/g-banner/g-banner'
	import gHomebar from '@/components/g-homebar/g-homebar'
	import gSeckill from '@/components/g-seckill/g-seckill.vue'
	import gCommendfollr from '@/components/g-commendfollr/g-commendfollr'
	import gHotgoods from '@/components/g-hotgoods/g-hotgoods'
	import url from '@/urlRouter.js'
	import axios from 'axios'
	
	export default{
		name:'homepage',
		data(){
			return {
				recommendGoods:null,
				category:null,
				floor1:'',
				floor2:null,
				floor0:null,
				floorName:null,
				hotGoods:null,
			}
		},
		components:{
			gBanner,
			gHomebar,
			gSeckill,
			gCommendfollr,
			gHotgoods
		},
		created(){
			axios({
				method:'get',
				url:'http://132.232.106.129/allPHP/phpbases/g_home.php',
				responseType:'json'
			}).then((response)=>{
				if(response.status==200){
					this.recommendGoods=response.data.data.recommend
					this.category=response.data.data.category;
					this.floor1=response.data.data.floor1;
	            	this.floor2=response.data.data.floor2;
	            	this.floor3=response.data.data.floor3;
	            	this.floorName=response.data.data.floorName;
	            	this.hotGoods=response.data.data.hotGoods;
					console.log(response.data.data.recommend[0])
				}
				console.log(response)
			})
		}
	}
</script>

<style>
	.homepage{
		/*background: red;*/
		margin-top:45px;
		width:100%;
	}
	.homeImg{
		width: 100%;
		overflow: hidden;
	}
	.homeImg img{
		width: 100%;
	}
</style>
<template>
		<div class="recommend-area">
			<div class="recommend-title" :style="backgroundDiv">
				秒杀专场
				<span>
					拖拉查看
					<i class="icon iconfont icon-xiangyoujiantou"></i>
				</span>
			</div>
			<div class="recommend-body">
				<swiper :options="swiperOption">
				    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
				        <div class="recommend-item">
				            <router-link :to="{name:'rearticle',params:{id:item.id}}">
				                <img :src="item.img" width="80%" />
				                <div class="recommend-title-div1">{{item.name}}</div>
				                <div class="recommend-title-div3">￥{{item.price|moneyFilter}} <span class="recommend-title-div2">(￥{{item.mallPrice|moneyFilter}})</span></div>
				            </router-link>    
				        </div>
				    </swiper-slide>
				    
				</swiper> 
			</div>
		</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import {toMoney} from '@/filter/moneyFilter.js'
import axios from 'axios'

export default{
	name:'g-seckill',
	data(){
		return {
			swiperOption:{
	            loop:true,
	            slidesPerView:2,
	            freeMode:false,
	            mousewheel:true
	        },
	        backgroundDiv:{
				backgroundImage: 'url('+require('./miaosha.jpg')+')',				
			},
			recommendGoods:null,
		}
	},
	components:{
		swiper,
		swiperSlide
	},
	created(){
		axios({
			method:'get',
			url:'http://132.232.106.129/allPHP/phpbases/g-recommend.php'
		}).then((response)=>{
			this.recommendGoods=response.data;
			console.log(this.recommendGoods[0])
		})
	},
	watch:{
		
   },
   filters:{
   		moneyFilter(money){
    		return toMoney(money)
    	}
   }
}

</script>

<style>
  .recommend-area{
  	background-color: #fff;
  	margin-top: 0.5rem;
  	text-align: left;
  	margin-top: 0px;	
  }
  .recommend-title{
  	border-bottom:1px solid #eee;
  	font-size: 14px;
  	padding: 0.5rem;
  	color: #e5017d;
  	font-weight: 600;
  	background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
  }
  .recommend-title span{
  	float: right;
  	color: red;
  	font-weight: 400;
  	font-size: 0.7rem;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }
 
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .recommend-title-div1{
  	color: #000;
  }
  .recommend-title-div3{
  	font-weight: 600;
  	color: #E13032;
  }
  .recommend-title-div2{
  	color: #2C3E50; 	
  	text-decoration: line-through;
  	font-weight: 400;
  }
</style>
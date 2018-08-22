<template>
	<div class="rearticle-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			商品详情
		</div>
		
		<van-swipe class="goods-swipe" :autoplay="3000">
	      <van-swipe-item v-for="(item,index) in imgs" :key="index">
	        <img v-lazy="item" @click="showImagePreview(1)">
	      </van-swipe-item>
	    </van-swipe>
	    
	    <van-cell-group class="goodname">
	      <van-cell>
	        <div class="goods-title">{{list.name}}</div>
	        <div class="goods-price">￥{{list.price}}</div>
	      </van-cell>
	      <van-cell class="goods-express">
	        <van-col span="10">运费：{{ list.express }}</van-col>
	        <van-col span="14">剩余：{{ list.remain }}</van-col>
	      </van-cell>
	    </van-cell-group>
	    
	    <van-cell-group class="goods-cell-group">
	      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
	        <template slot="title">
	          <span class="van-cell-text">有赞的店</span>
	          <van-tag type="danger">官方</van-tag>
	        </template>
	      </van-cell>
	      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
	    </van-cell-group>
	    
	    <van-cell-group class="goods-cell-group goods-cell-group2">
	      <van-cell title="查看同类商品" is-link @click="sorry" />
	    </van-cell-group>
	    
	    <div class="kongbai"></div>
		
		<van-goods-action>
		      <van-goods-action-mini-btn icon="chat" @click="sorry">
		        客服
		      </van-goods-action-mini-btn>
		      <van-goods-action-mini-btn icon="cart" :info="infosum">
		        <router-link :to="{name:'cart',params:{uid:user.userId}}">
		        	购物车
		        </router-link>
		      </van-goods-action-mini-btn>
		      <van-goods-action-big-btn @click="addcart()">
		        加入购物车
		      </van-goods-action-big-btn>
		      <van-goods-action-big-btn primary @click="sorry">
		        立即购买
		      </van-goods-action-big-btn>
    	</van-goods-action>
	</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {Toast,ImagePreview} from 'vant'
import {mapState,mapMutation,mapAction} from 'vuex'
	
export default{
	name:'rearticle',
	data(){
		return {
			list:'',
			imgs:'',
			infosum:0
		}
	},
	created(){
		let idData=qs.stringify({
			id:this.$route.params.id
		})
		axios({
			method:'post',
			url:'http://132.232.106.129/allPHP/phpbases/recommend_article.php',
			data:idData,
			responseType:'json'
		}).then((response)=>{
			console.log(response.data)
			this.list=response.data[0]		
		})
		
		axios({
			method:'post',
			url:'http://132.232.106.129/allPHP/phpbases/recommend_article1.php',
			data:idData,
			responseType:'json'
		}).then((response)=>{
			console.log(response.data)
			this.imgs=response.data		
		})
		
		let idData1=qs.stringify({
			uid:this.user.userId
		})
		console.log(this.user)
		axios({
			method:'post',
			url:'http://132.232.106.129/allPHP/phpbases/getCart.php',
			data:idData1,
			responseType:'json'
		}).then((response)=>{
			console.log(this.infosum)
					
			for (var i=0;i<response.data.length;i++) {
//				console.log(this.infosum)
				console.log(parseInt(response.data[i].count))
				this.infosum+=parseInt(response.data[i].count)
			}
		})
	},
	methods:{
		loginback(){
			this.$router.go(-1)
		},
		formatPrice() {
		    return '¥' + (this.goods.price / 100).toFixed(2);
		},
		onClickCart() {
			console.log(123)		    
		    this.$router.push({ path:'/cart'})
		},
		sorry() {
		    Toast('暂无后续逻辑~');
		},
		showImagePreview(position){
			ImagePreview(this.imgs, typeof position === 'number' ? position : 0);
		},
		addcart(){
			let idData1=qs.stringify({
				uid:this.user.userId,
				product_id:this.$route.params.id
			})
//			console.log(idData1)
			axios({
				method:'post',
				url:'http://132.232.106.129/allPHP/phpbases/addCart.php',
				data:idData1,
				responseType:'json'
			}).then((response)=>{
				
				let idData2=qs.stringify({
					uid:this.user.userId
				})
//				console.log(this.user)
				axios({
					method:'post',
					url:'http://132.232.106.129/allPHP/phpbases/getCart.php',
					data:idData2,
					responseType:'json'
				}).then((response)=>{
					this.infosum=0;
					for (var i=0;i<response.data.length;i++) {
//						console.log(parseInt(response.data[i].count))
						this.infosum+=parseInt(response.data[i].count)
					}
				})
			})
		}
	},
	computed:{
		...mapState(['user','showLeftFlag','loginState'])
	},
}
</script>

<style>
.rearticle-main{
    color: #616161;
    font-size: .17rem;
    z-index: 999;
    font-size: 1rem;
    background: #F8F8F8;
    background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
  	width: 100%;
  	/*height: 30rem;*/
  	position: relative;
}
.register-top{
	width: 100%;
	background: #f9f9f9;
	height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #bbb;
    
    text-align: center;
    margin: 0 0;
}
.register-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
.goods-swipe{
	width: 100%;
	height: 15rem;
}
.goods-swipe img{
	width: 100%;
	display: block;
	height: 15rem;
	margin: 0 0;
}
.goodname{
	width: 100%;
	
	margin: 0 0;
}
.goods-title{
    font-size: 16px;
}
.goods-price{
    color: #f44;
}
.goods-express{
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
}
.goods-cell-group{
	width: 100%;
	margin: .8rem 0 .8rem 0;
}
.kongbai{
	width: 100%;
	height: 50px;
}
</style>
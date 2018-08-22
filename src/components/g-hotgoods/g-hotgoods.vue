<template>
	<div class="hot-area">
		<div class="hot-title" :style="backgroundDiv">
			为您推荐
		</div>
		<div class="hot-goods">
			<van-list v-model="loading" :finished="finished" @load="onLoad" :offset="300" :loading-text="loadingText">
				<van-row gutter="0">
					<van-col v-for="(item,index) in list" :key='index' span="12">
						<div class="good-info" @click="sorry">
							<div class="goods-image">
								<img v-lazy="item.image" width="90%" alt="" />
							</div>
							<div class="goods-name">{{item.name}}</div>
							<div class="goods-price">￥{{item.price|MoneyFilter}}</div>
						</div>
					</van-col>
				</van-row>
				<van-row v-show="isButtom" class="goods-buttom">
					<div>已到底部、看看去别的吧...</div>
				</van-row>
			</van-list>
		</div>
		<div class="goods-blank"></div>
	</div>
</template>

<script>
	import {toMoney} from '@/filter/moneyFilter.js'
	import {Toast,ImagePreview} from 'vant'
	
	export default{
		props:['hotgoodsData'],
		name:'g-hotgoods',
		data(){
			return {
				hotGoods:null,
				backgroundDiv:{
					backgroundImage: 'url('+require('./teshe.jpg')+')',				
				},
				list:[],
				loading:false,
				finished:false,
				loadingText:"正在加载中哦...",
				isButtom:false
			}
		},
		methods:{
			onLoad(){
				setTimeout(()=>{
					for(let i=10;this.list.length<20;i++){
						this.list.push(this.hotGoods[i])
					}
					this.loading=false;
					if(this.list.length>=20){
						this.finished=true
						this.isButtom=true
					}
				},2000)
			},
			sorry() {
			    Toast('暂无后续逻辑~');
			},
		},
		components:{
			
		},
		created(){
			this.hotGoods=this.hotgoodsData
			console.log(this.hotGoods)
			this.list=this.hotGoods.slice(0,10)
		},
		watch:{
            hotgoodsData:function(val){
                this.hotGoods=this.hotgoodsData
				console.log(this.hotGoods) 
            }
       },
       filters:{
       		MoneyFilter(money){
       			return toMoney(money)
       		}
       }
	}
</script>

<style>
.hot-title{
	text-align: left;
	border-bottom:1px solid #eee;
  	font-size: 14px;
  	padding: 0.5rem;
  	color: #e5017d;
  	font-weight: 600;
  	background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
}
.hot-area{
  	text-align: center;
  	font-size: 14px;
  	height: 1.3rem;
  	line-height: 1.3rem;
}
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
.goods-price{
	font-weight: 530;
    color: #E13032;
}
.hot-goods .good-info:nth-child(odd){
	border: 1px solid #fff;
	border-bottom: 1px solid #ddd;
	border-right: 1px solid #ddd;
}
.goods-buttom div{
	height: 1.8rem;
	line-height: 1.8rem;
	color: #A8A8A8;
}
.goods-blank{
		width: 100%;
		height: 50px;
		background: #fff;
		/*clear: both;*/
	}
</style>
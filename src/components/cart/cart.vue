<template>
	<div class="rearticle-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			购物车
		</div>
		 <nogoods-cart v-show="goodstatus"></nogoods-cart>
		<div class="goods_list" v-show="goodsstatus">
			<van-checkbox-group class="card-goods" v-model="checkedGoods">
		      <van-checkbox
		        class="card-goods__item"
		        v-for="item in goods"
		        :key="item.product_id"
	        	:name="item.product_id"
		      >
		        <van-card
		          :title="item.name_title"
		          :desc="item.name_spec"
		          :num="item.count"
		          :price="formatPrice(item.price)"
		          :thumb="item.img"
		        >
		        	<div slot="footer">
		        		<i class="sanchu">删除</i>
					    <van-button size="mini"><i class="icon iconfont icon-jianhao"></i></van-button>
					    <van-button size="mini"><i class="icon iconfont icon-jiahao1"></i></van-button>
					    
					</div>
				</van-card>
		      </van-checkbox>
		    </van-checkbox-group>
		    
		    <div class="kongbai"></div>
			
			<van-submit-bar
		      :price="totalPrice"
		      :disabled="!checkedGoods.length"
		      :button-text="submitBarText"
		      @submit="onSubmit"
		    >
		    	<van-checkbox v-model="checked" @submit="onSubmit"><van-cell>全选</van-cell></van-checkbox>
		    </van-submit-bar>
		</div>
	    <nologin-cart v-show="loginstatus"></nologin-cart>
	    
	</div>
</template>

<script>
import {Toast} from 'vant'
import axios from 'axios'
import qs from 'qs'
import {mapState,mapMutation,mapAction} from 'vuex'
import nologinCart from '@/components/nologincart/nologincart'
import nogoodsCart from '@/components/nologincart/nogoodscart'

export default{
	name:"crt",
	data(){
		return {
			checkedGoods:[],
			goods:null,
//			checked:true
			loginstatus:false,
			goodsstatus:true,
			goodstatus:false,
		}
	},
	methods:{
		loginback(){
			this.$router.go(-1)
		},
		onSubmit() {
	      Toast('点击结算,暂无后续逻辑');
	    },
	    formatPrice(price) {
	      return (price*100 / 100).toFixed(2);
	    },
	    handechecked(){
	    	if(this.checked){
	    		this.checkedGoods=[];
	    	}
	    	console.log("good")
	    }
	},
	created(){
		let idData=qs.stringify({
			uid:this.user.userId,
		})
		console.log(this.user.userId=="")
		if(this.user.userId==""||this.user.userId==null){
			console.log(15874)
			this.loginstatus=true
			this.goodsstatus=false
			console.log(this.loginState)
		}
		axios({
			method:'post',
			url:'http://132.232.106.129/allPHP/phpbases/getCart.php',
			data:idData,
			responseType:'json'
		}).then((response)=>{
			
			this.goods=response.data
			console.log(response.data)
			for(var i=0;i<response.data.length;i++){
				this.checkedGoods.push(response.data[i].product_id)
			}
			console.log(this.checkedGoods)
			if(response.data.length==0){
				this.goodstatus=true
			}
		})		
	},
	computed: {
	    submitBarText() {
	      console.log(this.checkedGoods)
	      console.log(this.goods)
	      var count=0;
	      for(var i=0;i<this.checkedGoods.length;i++){
	      	for(var j=0;j<this.goods.length;j++){
				if(parseInt(this.checkedGoods[i])==parseInt(this.goods[j].product_id)){
					count+=parseInt(this.goods[j].count);
				}
	      	}
	      }
	      return '结算' + (count ? `(${count})` : '');
	    },
	    totalPrice() {
		  return this.goods.reduce((total, item) => total + parseFloat((this.checkedGoods.indexOf(item.product_id) !== -1 ? item.price*item.count : 0))*100, 0);
	    },
	    checked(){
	    	//全选监控
	    	return this.checkedGoods.length==this.goods.length?true:false;
	    },
	    ...mapState(['user','showLeftFlag','loginState'])
	},
	components:{
		nologinCart,
		nogoodsCart
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
.card-goods {
  padding: 10px 0;
  background-color: #fff;
}
.card-goods__item {
    position: relative;
    background-color: #fafafa;
    margin-bottom: 10px;
    margin-top: 0;
}
.van-checkbox__label {
    width: 100%;
    padding: 0 10px 0 15px;
    box-sizing: border-box;
}
.van-checkbox__icon {
    top: 50%;
    left: 10px;
    z-index: 1;
    position: absolute;
    margin-top: -10px;
}
.sanchu{
	font-size: 12px;
	color: #616161;
	text-align: center;
}
.van-card__price{
	color: #FF4444;
}
.kongbai{
	width: 100%;
	height: 55px;
	background-color: #fff;
}
</style>
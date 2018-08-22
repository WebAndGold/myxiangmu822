<template>
	<div class="wrap" ref="wrap">
		<div class="wrap-header">
			<div class="wrap-fanhui" @click="fanhui()">
				<i class="icon iconfont icon-zuojiantou"></i>
			</div>
			<div class="search">
				<i class="icon iconfont icon-sousuo"></i>
				<input type="text" v-model="inputData" :placeholder="pHolder" autofocus="autofocus"/>
				<i class="icon iconfont icon-shanchu" v-show="isData" @click="clearData()"></i>
			</div>
			<div class="queren">
				<van-button type="danger" size="small" @click="search()">搜索</van-button>
			</div>
		</div>
		
		<div class="xianshi">
			<div class="xianshi-title">
				热门搜索
			</div>
			<div class="hotsearch">
				<p @click="search(item.wrapName)" v-for="(item,index) in hotwrap">
					{{item.wrapName}}
				</p>
			</div>
			<div class="nodata" v-show="noData">
				<i class="icon iconfont icon-neirongbucunzai"></i>
				<span>搜索的商品暂时不存在，再逛逛别的吧...</span>
			</div>
			<ul class="listul">
				<router-link v-for="(itemnews,index) in searchlist" :key="index" to="">
					<li @click="sorry">{{itemnews.title}}</li>
				</router-link>
			</ul>
		</div>
		
		<mt-popup v-model="showModel" :modal="modal" position="" class="popup" popup-transition="popup-fade">
			<div>
				{{searchMes}}
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	import {Popup} from 'mint-ui'
	import {Toast,ImagePreview} from 'vant'
	
	export default{
		name:'search',
		data(){
			return {
				inputData:'',
				pHolder:'618感恩回馈',
				isData:false,
				hotwrap:[
					{"wrapName":"小米"},
					{"wrapName":"置物架"},
					{"wrapName":"精制筷子"},
					{"wrapName":"可口可乐"},
					{"wrapName":"卫龙零食"},
					{"wrapName":"华硕"},
					{"wrapName":"小新玩具"},
					{"wrapName":"..."},
				],
				noData:false,
				searchlist:[],
				modal:false,
				searchMes:'',
				showModel:false,
			}
		},
		methods:{
			sorry() {
			    Toast('暂无后续逻辑~');
			},
			search(name){
				if(name){
					this.inputData=name
				}
				if(this.inputData.length!=0){
					let searchData=qs.stringify({
						kw:this.inputData
					})
					axios({
						method:'post',
						url:'http://132.232.106.129/allPHP/phpbases/autocomplete.php',
						data:searchData,
						responseType:'json'
					}).then((response)=>{
						if(response.data.length>0){
							this.searchlist=response.data
							this.noData=false
							this.showModel=false
						}else{
							this.searchlist=[];
							this.noData=true;
						}
					})
				}else{
					console.log(123)
					this.showModel=true
					this.searchMes="请输入想要的商品..."
					this.closesearch();
				}
			},
			closesearch(){
				setTimeout(()=>{
					this.showModel=false
					this.searchMes=''
				},2000)
			},
			clearData(){
				this.inputData=[];
				this.isData=false
			},
			fanhui(){
				this.$router.go(-1)
			}
		},
		components:{
			Popup,
		},
		watch:{			
			inputData:function(val){
				if(val!==""){
					this.isData=true
				}else{
					this.isData=false
				}
				return this.isData
			}
		},
		created(){
			console.log(this.inputData) 
		}
	}
</script>

<style>
.wrap{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	z-index: 99;
	background: #efefef;
	height: 2.5rem;
	line-height: 2.5rem;
	border-bottom: 1px solid #ddd;
	font-size: 0.6rem;
}
.wrap-fanhui{
	position: absolute;
	left: .8rem;
	top: 0;
	width: 10%;
	height: 1.8rem;
	color: #353d44;
}
.wrap-fanhui i{
	font-size: 1.2rem;
}
.search{
	position: absolute;
	left: 2.8rem;
	top:.3rem;
	width: 65%;
	height: 1.8rem;
	color: #ddd;
	background: #fff;
	border-radius: 1rem;
	border: 1px solid #ddd;
}
.search input{
	width: 80%;
	height: 50%;
	position: absolute;
	border: none;
	left:2rem;
	top:.5rem;
	font-size: .7rem;
}
.search i:first-child{
	height: 50%;
	position: absolute;
	width: 15%;
	left: .5rem;
	top: -0.3rem;
	font-size: 1.1rem;
}
.search i:last-child{
	height: 50%;
	position: absolute;
	width: 15%;
	right: 0rem;
	top: -0.3rem;
	font-size: .8rem;
	z-index: 10;
}
.queren{
	position: absolute;
	top:0;
	right: .5rem;
}
.hotsearch{
	
}
.xianshi{
	position: absolute;
	top:2.5rem;
	left: 0;
	width: 100%;
}
.xianshi-title{
	margin-left: 0.5rem;
	font-size: 1rem;
	font-weight: 600;
	border-bottom: .1px solid #686868;
}
.hotsearch{
	padding: .5rem;
}
.hotsearch p{
	float: left;
	border: 1px solid #ddd;
	padding: 0 .5rem;
	text-align: center;
	height: 1.5rem;
	line-height: 1.5rem;
	font-size: .8rem;
	color: #686868;
	border-radius: .3rem;
	background: #ddd;
	margin: .2rem;
}
.nodata{
	clear: both;
	color: #686868;
	font-size: .9rem;
	text-align: center;
	background: #ddd;
}
.nodata>i{
	font-size: 1rem;
}
.listul{
	clear: both;
	
}
.listul li{
	color: #333;
	padding: 10px 10px;
	height: 2rem;
	line-height: 1rem;
	border-bottom: 1px solid #ecf1f0;
	font-size: .6rem;
	background-color: #fff;
}
.popup{
	height: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	background: rgba(72,61,139,.6);
	z-index: 100;
	width: 80%;
	border-radius: 0.3rem;
	margin: auto auto;
	font-size: 1rem;
	color: #FFF0F5;
}
</style>
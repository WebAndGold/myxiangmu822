<template>
	<div class="register-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			发现
		</div>
		<van-tabs v-model="active" sticky swipeable class="tabs">
			<van-tab v-for='index in tabdatas'>
				<div slot='title' class="vant-tab">
					<i class="icon iconfont" :class="index.icons"></i>{{index.title}}
				</div>
				
				<div class="index1" v-show="index.ip==1">
					<van-swipe :autoplay="3000">
					  <van-swipe-item v-for="(image, index) in images" :key="index">
					    <img v-lazy="image" />
					  </van-swipe-item>
					</van-swipe>
					<faxianBanner></faxianBanner>
				</div>
				
				<div class="index2" v-show="index.ip==2">
					<ul class="example-list">
						<router-link to="/linshi" v-for="(item,index) in gwlist" :key="index">
							<li class="example-listitem example-listitem2">
								<div class="listitem listitem1 listitem-gw listitemtwo">
									<div class="items-title1">{{item.title}}</div>
									<div class="items-body1">{{item.body}}</div>
									<div class="items-sum1">{{item.sum}}人阅读</div>
								</div>
								<div class="listitem listitem2 listitemtwo2">
									<img v-lazy="item.img" alt="" />
								</div>
							</li>
						</router-link>
					</ul>
					<div class="kongbai" v-show="iskongbai"></div>
				</div>
				
				<div class="index3" v-show="index.ip==3">
					<ul class="example-list">
						<router-link to="/linshi" v-for="(item,index) in hwdlist" :key="index">
							<li class="example-listitem">
								<div class="listitem listitem1 listitem-gw">
									<div class="index3-title">{{item.title}}</div>
									<div class="index3-author">
										<img v-lazy="item.pimg" alt="" />
										<span>{{item.pname}}</span>
									</div>
								</div>
								<div class="listitem listitem2">
									<img v-lazy="item.img" alt="" />
								</div>
							</li>
						</router-link>
					</ul>
					<div class="kongbai" v-show="iskongbai"></div>
				</div>
				
				<div class="index4" v-show="index.ip==4">
					<ul class="example-list">
						<router-link to="/linshi" v-for="(item,index) in hkdlist" :key="index">
							<li class="example-listitem">
								<div class="listitem listitem1 listitem-gw">
									<div class="index3-title">{{item.title}}</div>
									<div class="index3-author">
										<img v-lazy="item.pimg" alt="" />
										<span>{{item.pname}}</span>
									</div>
								</div>
								<div class="listitem listitem2">
									<img v-lazy="item.img" alt="" />
								</div>
							</li>
						</router-link>
					</ul>
					<div class="kongbai" v-show="iskongbai"></div>
				</div>
				
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
//	var tabs=document.getElementsByClassName('tabs')[0]
//	window.onscroll=function(){
//		if(document.documentElement.scrollTop>document.documentElement.clientWidth){
//			console.log(123)
//			tabs.classList.add("tabs-position")
//		}else{
//			tabs.classList.remove("tabs-position")
//		}
//		
//	}
	
	import { Loadmore} from 'mint-ui'
	import	axios from 'axios'
	import qs from 'qs'
	import faxianBanner from '@/components/faxianbanner/faxianbanner'
	
	export default{
		name:"faxian",
		data(){
			return {
				active:0,
				tabdatas:[{"title":'精选',"icons":'icon-shoucang1','ip':1},
				{"title":'购物百科',"icons":'icon-baike','ip':2},
				{"title":'好玩的',"icons":'icon-shiwu','ip':3},
				{"title":'好看的',"icons":'icon-huazhuang','ip':4}
				],
				images:['http://132.232.106.129/my-xingmuImg/faxian-banner1.png','http://132.232.106.129/my-xingmuImg/faxian-banner2.png','http://132.232.106.129/my-xingmuImg/faxian-banner3.png'],
				list: [],
		      	allLoaded: false,
		     	topStatus: '',
		      	topAllLoaded: false,
		      	showLoading:true,
				pno:1,
				gwlist:[],
				iskongbai:true,
				hwdlist:[],
				hkdlist:[],
			}
		},
		methods:{
			loginback(){
				this.$router.go(-1);
			},
			handleTopChange(status){
				this.topStatus = status;
			},
			loadTop(id){
				setTimeout(()=>{
					if(this.topAllLoaded == false){
						var pnoData=qs.stringify({
							pno:this.pno
						})
						axios({
							method:'post',
							url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php',
							data:pnoData,
							responseType:'json'
						}).then((response)=>{
							for(var i=0;i<response.data.data.length;i++){
								this.list.unshift(response.data.data[i])
							}
							this.pno++;
							this.$refs.top.onTopLoaded(id);
			            	this.topAllLoaded = true
						});
					}
					this.$refs.top.onTopLoaded(id);
					
				},500)
			},
			loadBottom(id) {
				setTimeout(() => {
					if(this.allLoaded == false){
						var pnoData=qs.stringify({
							pno:this.pno
						})
						axios({
							moehod:'post',
							url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php',
							data:pnoData,
							responseType:'json',
						}).then((response)=>{
							for(var i=0;i<response.data.data.length;i++){
								this.list.push(response.data.data[i])
							}
							this.pno++;
							this.$refs.top.onBottomLoaded(id);
	            			this.allLoaded = true
						})
					}
				},500)
			}
		},
		components:{
			Loadmore,
			faxianBanner,
		},
		created(){
			var pnoData=qs.stringify({
						pno:this.pno
				})					
			axios({
				moehod:'post',
				url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php?pno='+this.pno,
				data:pnoData,
				responseType:'json',
			}).then((response)=>{
				if(response.data.data.length!=0){
					for(var i=0;i<response.data.data.length;i++){
						this.list.unshift(response.data.data[i])
					}
				}				
				this.pno++;
				console.log(this.pno);
			})
			
			axios({
				moehod:'get',
				url:'http://132.232.106.129/allPHP/phpbases/faxian_gw.php',
				responseType:'json',
			}).then((response)=>{
//				console.log(response.data)
				if(response.data.length!=0){
					for(var i=0;i<response.data.length;i++){
						this.gwlist.push(response.data[i])
					}
//					console.log(this.gwlist)
				}
			})
			
			
			axios({
				moehod:'get',
				url:'http://132.232.106.129/allPHP/phpbases/faxian_hwd.php',
				responseType:'json',
			}).then((response)=>{
//				console.log(response.data)
				if(response.data.length!=0){
					for(var i=0;i<response.data.length;i++){
						this.hwdlist.push(response.data[i])
					}
//					console.log(this.hwdlist)
				}
			})
			
			axios({
				moehod:'get',
				url:'http://132.232.106.129/allPHP/phpbases/faxian_hkd.php',
				responseType:'json',
			}).then((response)=>{
//				console.log(response.data)
				if(response.data.length!=0){
					for(var i=0;i<response.data.length;i++){
						this.hkdlist.push(response.data[i])
					}
					console.log(this.hkdlist)
				}
			})
		}
	}
</script>

<style>	
.tabs-position{
	position: fixed;
}	
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
.vant-tab i{
	margin-right: 0.1rem;
}
.tab-main{
	width: 100%;
}
.van-swipe{
	height: 140px;
}
.van-swipe-item img{
	width: 100%;
	height: 100%;
}
.jx_main{
	width: 100%;
	background: #F7F7F7;
}
.example-list{
	width: 90%;
	margin: auto auto;
	background: #F7F7F7;
}
.example-listitem{
	width: 100%;
	margin-top: .7rem;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	background: #fff;
}
.example-listitem2{
	height: 6.7659rem;
}
.listitem{
	
}
.listitem1{
	width: 47%;
	display: flex;
	flex-direction: column;
    justify-content: space-between;
}
.listitemtwo{
	height: 100%;
}
.listitemtwo2{
	height: 100%;
}
.listitem1 h1{
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: auto;
    line-height: 24px;
    padding: 0 .6rem;
    padding-top: .5rem;
    white-space: normal;
    font-size: .8rem;
    margin: 0;
    color: #333;
}
.listitem2{
	width: 53%;
}
.listitem2 img{
	width: 100%;
	height: 100%;
}
.author{
	width: 100%;
    padding-bottom: .3rem;
    line-height: 2rem;
    height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
}
.author img{
	height: 80%;
	border-radius: 50%;
	float: left;
	margin-top: .1rem;
	margin-left: .6rem;
}
.author div{
	font-size: .7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2rem;
    float: left;
    margin-bottom: 0rem;
    margin-left: .6rem;
    color: #999;
    width: 40%;
}
.index2{
	background: #F7F7F7;
}
..kongbai{
	height: 50px;
	width: 100%;
	z-index: 0;
	background: #fff;
}
.listitem-gw{
	margin-left: .6rem;
	text-align: left;
}
.items-title1{
	margin-top: .5rem;
	color: #000;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 22%;
	line-height: 1.5rem;
	font-size: 1rem;
}	
.items-body1{
	width: 100%;
	padding: .1rem;
	padding-left: 0px;
	text-overflow: ellipsis;
	font-size: .7rem;
	color: #999;
	height: 42%;
	line-height: normal;
}
.items-sum1{
	width: 90%;
	text-align: end;
	padding-bottom: .3rem;
	font-size: .7rem;
	color: #999;
	height: 17%;
	line-height: normal;
}
.index4{
	background: #F7F7F7;
}	
.index3{
	background: #F7F7F7;
}	
.index3-author{
	width: 100%;
	height: 1.3rem;
	line-height: 1.3rem;
	margin-bottom: .6rem;
	color: #999;
	font-size: .7rem;
}
.index3-author img{
	height: 95%;
	border-radius: 50%;
	float: left;
}
.index3-author span{
	float: left;
	margin-left: .3rem;
}
.index3-title{
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: auto;
    line-height: 24px;
    padding: 0 .5rem;
    padding-top: .5rem;
    white-space: normal;
    color: #333;
    font-size: .9rem;
}

</style>
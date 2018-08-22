<template>
	<div>
		<mt-loadmore
			:top-method="loadTop" 
			:bottom-method='loadBottom' 
			:topDistance="50" 
			:bottomDistance='40'
			@top-status-change="handleTopChange" 
			:autoFill=false 
        	bottomLoadingText="更多内容" 
			ref="top" 
			cancelable='true' 
		>
			<!--<ul v-for="(item,index) in list" :key="index">
				<li>{{item}}</li>
			</ul>-->
			<ul class="example-list">
								<router-link to="" v-for="(item,index) in list" :key="index">
									<li class="example-listitem">
										<!--{{item}}-->
										<div class="listitem listitem1">
											<h1>{{item.title}}</h1>
											<div class="author">
												<img :src="item.pimg" alt="" />
												<div>{{item.pname}}</div>
											</div>
										</div>
										<div class="listitem listitem2">
											<img :src="item.img" alt="" />
										</div>
									</li>
								</router-link>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import { Loadmore} from 'mint-ui'
	import	axios from 'axios'
	import qs from 'qs'
	
	export default{
		name:'kongai',
		data(){
			return {
				list: [],
				newlist:[],
		      	allLoaded:false,
		     	topStatus: '',
		      	topAllLoaded: false,
		      	showLoading:true,
				pno:1,
			}
		},
		methods:{
			handleTopChange(){
				this.topStatus = status;
			},
			loadTop(id){
				console.log(123)
				
				this.$refs.top.onTopLoaded(id);
			},
			loadBottom(id){
				console.log(456)
				
				this.$refs.top.onBottomLoaded(id);
			}
		},
		conponents:{
			Loadmore,
		},
		created(){
				let pnoData=qs.stringify({
					pno:this.pno
				})
				axios({
						method:'post',
						url:'http://127.0.0.1/allPHP/phpbases/daxianloadmore.php?pno='+this.pno,
						responseType:'json'
				}).then((response)=>{
				if(response.data.data.length!=0){
					for(var i=0;i<response.data.data.length;i++){
						this.list.push(response.data.data[i])
					}
				}				
				this.pno++;
				console.log(this.list);
			})
		},
	}
</script>

<style>
	li{
		text-align: center;
		height: 5.2rem;
		line-height: 5.2rem;
		color: #000;
		background: #686868;
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
	background: #fff;
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
.listitem{
	
}
.listitem1{
	width: 47%;
	display: flex;
	flex-direction: column;
    justify-content: space-between;
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
</style>
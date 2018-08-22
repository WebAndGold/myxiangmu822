<template>
	<div>
		<div class="jx_main" >
						<mt-loadmore 
		  	  			cancelable='true'
			  			:top-method="loadTop"  
			  			@top-status-change="handleTopChange" 
			  			:bottom-method="loadBottom"
			  			:bottom-all-loaded="allLoaded"
        				:bottomDistance="50"
       			 		:topDistance="40"
        				:autoFill=false
        				bottomLoadingText="更多内容"
			  			ref="top"
		  	  				>
							<ul class="example-list">
								<router-link :to="{name:'article',params:{lid:item.lid}}" v-for="(item,index) in list" :key="index">
									<li class="example-listitem">
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
						<van-list v-model="loading" :finished="finished" @load="onLoad" :offset="offset" loading-text="正在拼命加载中...">
							<ul class="example-list">
								<router-link :to="{name:'article',params:{lid:item.lid}}" v-for="(item,index) in newlist" :key="index">
									<li class="example-listitem">
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
							<van-row v-show="isButtom" class="goods-buttom">
								<div>我是有底线的、看看别的呗</div>
							</van-row>
						</van-list>
						<div class="kongbai" v-show="iskongbai"></div>
		</div>
	</div>  
</template>

<script>
	import { Loadmore} from 'mint-ui'
	import	axios from 'axios'
	import qs from 'qs'
	
	export default{
		name:"faxian",
		data(){
			return {
				list: [],
				newlist:[],
		      	allLoaded:false,
		     	topStatus: '',
		      	topAllLoaded: false,
		      	showLoading:true,
				pno:1,
				loading:false,
				finished: false,
				offset:200,
				newpno:1,
				isButtom:false,
				iskongbai:true,
			}
		},
		methods:{
			onLoad(){
				setTimeout(()=>{
					var pnodata=qs.stringify({
							pno:this.newpno
						})
					axios({
						method:'post',
						url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php',
						data:pnodata,
						responseType:'json'
					}).then((output)=>{
						console.log(output.data.data)
						if(output.data.data.length!=0){
							for(var i=0;i<output.data.data.length;i++){
								this.newlist.push(output.data.data[i])
							}
							this.loading=false;
						}else{
							console.log("自动加载数据为0")	
//							this.finished = true;
							this.isButtom=true;
//							console.log(this.finished)
							this.iskongbai=false;
						}
						this.newpno++;
					})
				},800)
			},
			loginback(){
				this.$router.go(-1);
			},
			handleTopChange(status){
				this.topStatus = status;
			},
			loadTop(id){
				setTimeout(()=>{
					console.log(123)
					
					if(this.topAllLoaded==false){
						var pnodata=qs.stringify({
							pno:this.pno
						})
						axios({
							method:'post',
							url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php',
							data:pnodata,
							responseType:'json'
						}).then((output)=>{
							console.log(output.data.data)
							if(output.data.data.length!=0){
								for(var i=0;i<output.data.data.length;i++){
									this.list.unshift(output.data.data[i])
								}
							}else{
								console.log("下拉数据没了")
//								this.topAllLoaded=true;
							}
							console.log(this.list)
							this.pno++;
						})
					}					
					this.$refs.top.onTopLoaded(id);											
				},500)
			},
			loadBottom(id) {
				setTimeout(() => {
					console.log(456)
					if(this.allLoaded==false){
						var pnodata2=qs.stringify({
							pno:this.pno
						})
						axios({
							method:'post',
							url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php',
							data:pnodata2,
							responseType:'json'
						}).then((output)=>{
							console.log(output.data.data)
							if(output.data.data.length!=0){
								for(var i=0;i<output.data.data.length;i++){
									this.list.push(output.data.data[i])
								}
							}else{
								console.log("上拉数据没了")
								this.allLoaded = true
							}
							console.log(this.list)
							this.pno++;
						})
					}
					this.$refs.top.onBottomLoaded(id);
	            	
				},500)
			}
		},
		components:{
			Loadmore,
		},
		created(){
				let pnoData=qs.stringify({
					pno:this.pno
				})
				axios({
						method:'post',
						url:'http://132.232.106.129/allPHP/phpbases/daxianloadmore.php?pno='+this.pno,
//						data:pnoData,
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
		mounted(){
			let faxianJx = document.getElementsByClassName('jx_main')[0]
			faxianJx.style.height = document.documentElement.clientHeight - 140 - 40 - 50 + 'px'
		}
	}
</script>

<style>	
.jx_main{
	width: 100%;
	background: #F7F7F7;
}
.example-list{
	width: 90%;
	margin: auto auto;
	background: #F7F7F7;
	padding: 0;
}
.example-listitem{
	width: 100%;
	margin-top: .7rem;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	background: #fff;
	/*height: 5.2rem;
	line-height: 5.2rem;*/
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
.kongbai{
	height: 50px;
	width: 100%;
	z-index: 0;
	background: #fff;
}
.goods-buttom div{
	height: 1.8rem;
	line-height: 1.8rem;
	color: #A8A8A8;
}
</style>

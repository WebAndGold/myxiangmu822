<template>
	<div class="register-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			精选文章
		</div>
		<div class="article-header">
			<h1 class="article-title">{{title}}</h1>
			<div class="article-author">
				<img :src="pimg" alt="" />
				<span>{{pname}}</span>
			</div>
			<div class="article-container">
				<div>
					<p>{{phase}}</p>
				</div>
				<div>
					<img :src="img" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name:'article',
		data(){
			return {
				title:'',
				pimg:'',
				pname:'',
				phase:'',
				img:'',
			}
		},
		methods:{
			loginback(){
				this.$router.go(-1);
			}
		},
		created(){
			console.log(this.$route.params.lid)
			var lidData=qs.stringify({
					lid:this.$route.params.lid
				})
				axios({
					method:'post',
					url:'http://132.232.106.129/allPHP/phpbases/faxian_article.php',
					data:lidData,
					responseType:'json'
				}).then((output)=>{
					console.log(output.data[0])
					this.title=output.data[0].title
					this.pimg=output.data[0].pimg
					this.pname=output.data[0].pname
					this.phase=output.data[0].phase
					this.img=output.data[0].img
				})
		}
	}
</script>

<style>
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
    
    top: 0;
    left: 0;
    right: 0;
}
.register-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
.article-header{	
	width: 100%;
	margin: auto auto;
	margin-top: 2.5rem;
}
.article-title{
	font-size: 1.1rem;
    line-height: 1.5;
    font-weight: 600;
    text-align: left;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .7rem;
    margin-top: 1rem;
    margin-bottom: .75rem;
    color: #000;
    font-size: 1.2rem;
}
.article-author{
	margin-bottom: 1rem;
	height: 1.5rem;
	line-height: 1.5rem;
	width: 90%;
	margin: auto;
}
.article-author img{
	border-radius: 50%;
	height: 80%;
	float: left;
}
.article-author span{
	color: #989898;
	line-height: 1.2rem;
	font-size: .6rem;
	float: left;
	margin-left: .2rem;
}
.article-container{
	width: 95%;
	margin: auto;
	font-size: .8rem;
	color: #404040;
}
.article-container img{
	width: 100%;
}
.article-container p{
	text-align: left;
}
</style>
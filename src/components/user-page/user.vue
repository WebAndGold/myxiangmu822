<template>
	<div class="register-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			个人中心
		</div>
		<div class="user-body">
			<div class="header-kongbai">
				<div class="user-header">
					<div class="user-img">
						<img :src="userImg" alt="" />
					</div>
					<div class="user-name">
						<div class="username">昵称:{{user.username}}</div>
						<div class="usertime">注册时间:2018-05-06</div>
						<div class="user3">
							<span> <router-link to="/register" class="zhucespan"><i class="icon iconfont icon-denglu"></i> 注册</router-link></span>
							<span> 会员福利<i class="icon iconfont icon-iconfonti"></i></span>
						</div>
					</div>
				 	<div class="user-shezhi">
				 		<i class="icon iconfont icon-shezhi1"></i>
				 		账号管理
					</div>
					<div class="user-member">
						<div class="member1">
							<i class="icon iconfont icon-huangguan"></i>
							尊贵会员
						</div>
						<div class="member2">
							尊贵会员特权
							<i class="icon iconfont icon-iconfonti"></i>
						</div>
					</div>
				</div>
				
				<div class="genre1 genre">
					<div class="genre-div">
						<i class="icon iconfont icon-qianbao-"></i>
						<span>待收款</span>
					</div>
					<div class="genre-div">
						<i class="icon iconfont icon-daishouhuo"></i>
						<span>待收货</span>
					</div>
					<div class="genre-div">
						<i class="icon iconfont icon-shouhoutuikuan"></i>
						<span>退换/售后</span>
					</div>
					<div class="genre-div">
						<i class="icon iconfont icon-quanbudingdan"></i>
						<span>全部订单</span>
					</div>
				</div>
				
				<div class="genre2 genre">
					<div class="genre-div">
						<a><i>0</i>个</a>
						<span>商场豆</span>
					</div>
					<div class="genre-div">
						<a><i>0</i>张</a>
						<span>优惠券</span>
					</div>
					<div class="genre-div">
						<a><i>0</i>元</a>
						<span>开通白条</span>
					</div>
					<div class="genre-div">
						<i class="icon iconfont icon-zichan"></i>
						<span>全部资产</span>
					</div>
				</div>
				
				<div class="genre3 genre">
					<div class="genre-div">
						<a>0</a>
						<span>关注的商品</span>
					</div>
					<div class="genre-div">
						<a>0</a>
						<span>关注的店铺</span>
					</div>
					<div class="genre-div">
						<a>2</a>
						<span>我的足迹</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState,mapMutation,mapAction} from 'vuex'

export default{
	name:'user',
	data(){
		return {
			userImg:"http://132.232.106.129/allPHP/user2.jpg",
		}
	},
	methods:{
		loginback(){
			this.$router.go(-1)
		}
	},
	mounted(){
		this.$store.dispatch('logined')
	},
	computed:{
		...mapState(['user','showLeftFlag','loginState'])
	},
}

</script>

<style>
.genre{
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 4.5rem;
	overflow: hidden;
	line-height: 4.5rem;
	background: #fff;
	margin-top: 1rem;
}
.genre-div{
	width: 24%;
	height: 100%;
}
.genre-div>i{
	color: #DD9E58;
	font-weight: bold;
	font-size: 18px;
	position: relative;
	top: -10px;
	left: 40%;
	margin-left: -25px;
}
.genre-div span{
	position: relative;
	top:14px;
	font-size: 13px;
	text-align: center;
}
 .genre>.genre-div:last-child>i{
	color: #E93B3D;
}
.genre-div a{
	position: relative;
	top: -10px;
	left: 40%;
	margin-left: -25px;
	font-size: 14px;
}
.genre-div a i{
	color: #E93B3D;
	margin-right: 4px;
	font-size: 18px;
}
.genre3{
	color: #000;
	margin-left: 10px;
}
.genre3 span{
	color: #616161;
}

.member1{
	font-size: .5rem;
	text-align: left;
	margin: 2px;
	margin-left: 8px;
	color: #cead68;
}
.member2{
	margin-left: 5px;
	padding: 1px 5px 1px 2px;
	width: 80%;
    height: 13px;
    line-height: 11px;
    border-radius: 12px;
    font-size: 8px;
    color: #cead68;
    background-color: hsla(0,0%,85%,.1);
}
.user-member{
	position: absolute;
	right: -0.2rem;
	bottom: -0.4rem;
	height: 45%;
	width: 30%;
	border-radius:7px;
	background: #333;
	transform: rotate(11deg);
}
.user-shezhi{
	position: absolute;
	padding: 0 0.5rem;
	font-size: .7rem;
	top: .7rem;
	right: .6rem;
	color: rgba(76,0,0,.7);
}
.user-shezhi i{
	font-size: 1rem;
}
.user3{
	float: left;
	margin-top: .2rem;
	color: #fff;
}
.zhucespan{
	color: #fff;
}
.user3 span{
	float: left;
	padding: 1px 4px;
	background: #9f3838;
	border-radius: 15px;
	font-size: .7rem;
	color: #fff;
}
.user3 span i{
	color: #fff;
}
.user3 span:last-child{
	margin-left: .2rem;
	background: rgba(180,50,27,.3);
}
.username{
	float: left;
	font-size: .9rem;
	color: #fff;
}
.usertime{
	float: left;
	font-size: .6rem;
	color: #D4BFBE;
	margin-top: .1rem;
}
.user-body{
	background: #f9f9f9;
}
.header-kongbai{
	width: 100%;
}
.user-header{
	width: 93%;
	height: 7rem;
	margin: auto;
	margin-top: .6rem;
	position: relative;
    border-radius: 6px;
    overflow: hidden;
    background: linear-gradient(90deg,#eb3c3c,#ff7459);
}
.user-img{
	position: absolute;
	top: 50%;
	margin-top: -1.5rem;
	left: 1rem;
}
.user-img img{
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
}
.user-name{
	width: 50%;
	position: absolute;
	left: 50%;
	top:50%;
	transform: translate(-50%,-50%);
	margin-left: .8rem;
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
	height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #bbb;
}
.register-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
</style>
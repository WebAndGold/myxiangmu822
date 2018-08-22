<template>
	<div>
		<div class="wrapleft" @click="colseLeft()" v-show="showLeftFlag"></div>
		<transition name="fade">
			<div class="leftbar" v-show="showLeftFlag">
				<div class="leftbar-header">
					<span>商城菜单</span>
					<i class="icon iconfont icon-shanchu1" @click="colseLeft()"></i>
				</div>
				
				<div class="logo-area" :style="backgroundDiv">					
					<div v-show='!loginState' class="logined">
						<router-link to="/login">
							<div class="loginImg">
								<img src="./userdefault.png" alt="" />
								<p class="username">请先登录</p>
							</div>
						</router-link>
					</div>
					<div v-show="loginState" class="logined">
						<router-link to="/user">
							<div class="loginImg">
								<img src="./user2.jpg" alt="" />
								<p class="username">欢迎登录:{{user.username}}</p>
							</div>
						</router-link>						
					</div>
					
				</div>
				<van-notice-bar :scrollable="true" mode="closeable">
						商城消息：(开发者:曹金国)欢迎来到我的商城、项目为练习作品、更多功能不断完善中... 谢谢体验(･ω･)ﾉ！！！
				</van-notice-bar>
				<div class="item-scroll">
									
					<van-cell-group>
						<van-cell is-link to="/login" icon="contact" value="前往" v-show="!loginState">
							<template slot="title">
								用户登录
							</template>
						</van-cell>
					</van-cell-group>
					<van-collapse v-model="collapseNmae" accordion>
						<van-collapse-item name="1" title="我的消息">
							<div slot="title" class="collTitle">
								<i class="icon iconfont icon-xiaoxi"></i>
								我的消息
								<van-tag type="danger">查看</van-tag>
							</div>
							<router-link to="/xiaoxi">
								<van-notice-bar :scrollable="true" mode="link" class="notice" background="#D8BFD8">
								  	现在购物有优惠哦！快来抢购吧
								</van-notice-bar>
							</router-link>
							<router-link to="/xiaoxi">
								<van-notice-bar :scrollable="true" mode="link" class="notice" background="#D8BFD8">
								  	欢迎来到我的商城
								</van-notice-bar>
							</router-link>
							<router-link to="/xiaoxi">
								<van-notice-bar :scrollable="true" mode="link" class="notice" background="#D8BFD8">
								  	新老用户感恩回馈，就在今天
								</van-notice-bar>
							</router-link>
							<router-link to="/xiaoxi">
								<van-notice-bar :scrollable="true" mode="link" class="notice" background="#D8BFD8">
								  	练习项目、谢谢体验
								</van-notice-bar>
							</router-link>						
						</van-collapse-item>
						<van-collapse-item name="2">
							<div slot="title" class="collTitle"><i class="icon iconfont icon-shoucang1"></i>我的收藏</div>
							<div class="cell">收藏内容1</div>
							<div class="cell">收藏内容2</div>
							<div class="cell">收藏内容3</div>
						</van-collapse-item>
						<van-collapse-item name="3">
							<div slot="title" class="collTitle"><i class="icon iconfont icon-shezhi"></i> 设置</div>
							<div class="slider">
								<p>屏幕亮度(功能未实现)</p>
								<van-slider v-model="value" @change="onChange" />
							</div>
							<div class="dialog">
								<p>{{this.dialogData}}</p>
								<van-switch :value="checked" size="20px" @input="onInput" />
							</div>
						</van-collapse-item>
					</van-collapse>
					
					<van-cell-group>
						<van-cell icon="search" value="前往" is-link to="/search">
							<template slot='title'>
								<span class="van-cell-text">搜索更多...</span>
							</template>
						</van-cell>
						<!--<van-cell @click="loginout()" v-show="loginstate">
							<template slot="title">
								<i class="icon iconfont icon-zhuxiao"></i>
								<span class="van-cell-text">退出登录</span>
							</template>
						</van-cell>-->
					</van-cell-group>
					<div class="kongbai">
						
					</div>
				</div>
				
				<div class="login">
					<div class="loginout">
						
						<van-button type="danger" size="small" @click="loginout()" v-show="loginState">
							<i class="icon iconfont icon-zhuxiao"></i>
							退出登录
						</van-button>
					</div>
					<div class="regis">
						
						<router-link to="/register">
							<van-button size="small" type="primary">
								<i class="icon iconfont icon-zhuce"></i>
								账号注册
							</van-button>
						</router-link>
					</div>
				</div>
			</div>
			
		</transition>
	</div>
</template>

<script>
import { Collapse, CollapseItem } from 'vant';
import {Dialog} from 'vant'
import {mapState,mapMutation,mapAction} from 'vuex'
import {MessageBox} from 'mint-ui'
import qs from 'qs'
import axios from 'axios'

export default{
	name:'leftbar',
	data(){
		return {
//			loginState:false,
//			showLeftFlag:true,
			backgroundDiv:{
				backgroundImage: 'url('+require('./timg.jpg')+')',				
			},			
			collapseNmae:'',
			value:30,
			checked:true,
			dialogmes:'开启消息提醒获得更快咨询，确认关闭？',
			dialogData:'关闭消息提醒',
		}
	},
	methods:{
		colseLeft(){
			this.$store.dispatch('closeLeftA')
		},
		loginout(){
			console.log(this.loginState)
			MessageBox.confirm('确认立即退出登录吗').then((active)=>{
				if(localStorage.token!==undefined){
					console.log(localStorage.token)
					var tmp=localStorage.token
					var tokenkey=tmp[0]
					var userData=qs.stringify({
						'uname':tmp[1],
						'uid':tokenkey
					})
					console.log(userData)
					axios({
						method:'post',
						url:'http://132.232.106.129/allPHP/phpbases/loginOut.php',
						data:userData,
						responseType:'json'
					}).then((response)=>{//1为失败、2为成功
						console.log(response.data)
						if(response.data==1){
							localStorage.removeItem('token')
							//localStorage.clear()
							MessageBox.alert('退出登录成功').then(()=>{
								this.$router.push({'path':'/'})
								this.$store.dispatch('closeLeftA')
								this.$store.dispatch('clearLoginMes')
								console.log("执行退出登录"+response.data)
							})
						}
					})
				}
			})
		},
		onChange(val){
			this.$toast('当前值亮度：' + val+'%');
		},
		onInput(checked){
			 Dialog.confirm({
				title:'提示',
				message:this.dialogmes
			}).then(()=>{
				this.checked=checked
				this.dialogmes='想获取更快咨询，请确认开启！！'
				if(this.checked==true){
					this.dialogData='关闭消息提醒'
				}else{
					this.dialogData='开启消息提醒'
				}
			})
		}
	},
	components:{
		Collapse,
		CollapseItem
	},
	computed:{
		...mapState(['user','showLeftFlag','loginState'])
	},
	mounted(){
		this.$store.dispatch('logined')
	}
}
</script>

<style>
.fade-enter-active{
  transition:all .3s linear;
}
.fade-leave-active {
  transition:all .2s linear;
}
.fade-enter {
  transform:translateX(-300px);
}
.fade-leave-active {
  transform: translateX(-300px);
}
.wrapleft{
	position: fixed;
  	top: 0;
  	right: 0;
  	bottom: 0;
  	left: 0;
  	background-color: rgba(0,0,0,.3);
  	z-index: 100;
}
.kongbai{
	width: 100%;
	height: 2rem;
}
.leftbar{
	position: fixed;
	top:0;
	left: 0;
	bottom: 0;
	width: 80%;
	z-index: 101;
	background: #fff;
}
.leftbar-header{
	width: 100%;
	height: 3rem;
	background: linear-gradient(#D3D3D3,#fff,#D3D3D3);
	line-height: 3rem;
	border-bottom: 1px solid #686868;
	color: #696969;
}
.leftbar-header i{
	float: right;
	margin-right: 1.2rem;
	font-size: 1rem;
	color: #696969;
}
.leftbar-header span{
	margin-left: .5rem;
}
.item-scroll{
	height: 57%;
	overflow-x: hidden;
    overflow-y: scroll;
}
.logo-area{
	width: 100%;
	height: 150px;
	text-align: center;
	color: #fff;
	background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
}
.loginImg{
	border-radius: 50%;
}
.loginImg img{
	width: 90px;
	height: 90px;
	border: 3px solid #00ac77;
	border-radius: 50%;
	margin-top: 10px;
	/*margin-left: 50%;*/
	right: -45px;
}
.loginImg p{
	font-size: 1rem;
	margin:0px;
	color: #fff;
	width: 100%;
}
.cell{
	font-size: .8rem;
	color: #001100;
	
}
.collTitle i{
	font-size: 1rem;
}
.login{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 50px;
	color: #000000;
	font-size: 1rem;
	padding: 10px 0px;
	background: #fff;
	z-index: 102;
}
.loginout i{
	font-size: .9rem;
}
.loginout{
	float: right;
	margin-right: 1rem;
	font-size: 1rem;
	font-size: .8rem;
}

.regis{
	float: left;
	margin-left: 1rem;
	font-size: 1rem;
}
.regis i{
	font-size: 1.1rem;
}
.notice{
	margin-top: 3px;
}
.slider{
	color: #f60;
}
.slider p{
	margin: .2rem 0 .5rem 0;
	font-size: .8rem;
}
.dialog{
	margin-top: 25px;
	/*border-top: 1px solid #686868;*/
	height: 2rem;
}
.dialog p{
	margin: .2rem 0 .5rem 0;
	font-size: .8rem;
	color: #f60;
	float: left;
}
.van-switch{
	float: right;
}
</style>
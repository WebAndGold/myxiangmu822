<template>
	<div class="login-main">
		<div class="login-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			用户登录
		</div>
		<van-tabs v-model="active">
			<van-tab v-for='(item,index) in tabData' :key="index">
				<div slot="title">
					{{item}}
				</div>
				<div v-show='index==0' class="pwdtesdiv">
					<!--密码验证,index:{{index}}-->
					<div class="pwdtest" @change="handleBtn">
						<mt-field label="账号:" placeholder="用户名/邮箱/已验证手机" class="testdiv" v-model="username"></mt-field>
						<mt-field label="密码:" placeholder="请输入密码" class="testdiv" v-model="password" type="password"></mt-field>
						<div class="testMes">
							{{testMes}}
						</div>
					</div>
				</div>
				<div v-show='index==1' class="pwdtesdiv">
					<!--短信验证,index:{{index}}-->
					<div class="pwdtest">
						<mt-field placeholder="请输入手机号" class="testdiv" v-model="phonetest">
							<span class="yz-fist yz">|</span>
							<span class="yz-last yz">获取验证码</span>
						</mt-field>
						<mt-field placeholder="请输入收到的验证码" class="testdiv" v-model="gaptest" type="password"></mt-field>
						<div class="testMes">
							{{testMes}}
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
		<div class="buttondiv">
			<mt-button type="danger" size="large" :disabled="isbtn" class='loginBtn' @click="handleClick">登录</mt-button>
			<mt-button type="" size="large" :disabled="false" class='loginBtn loginBtn2' @click="sorry">一键登录</mt-button>
			<div class="pwd-manage">
				<router-link to="/linshi">
					<span class="pwd-forget">
						<i class="icon iconfont icon-wangjimima"></i>
						忘记密码
					</span>
				</router-link>
				<router-link to="/register">
					<span class="pwd-regis">
						<i class="icon iconfont icon-shouji1"></i>
						手机快速注册
					</span>
				</router-link>
			</div>
		</div>
		<div class="login-bottom">
			<div class="bottom-title">
				<!--<span class="gap gap-left"></span>
				
				<span class="gap gap-right"></span>-->
				<div class="title-kongbai"></div>
				<span>其他方式登录</span>
			</div>
			
			<div class="bottom-image">
				<router-link to="/linshi">
					<i class="icon iconfont icon-qq"></i>
				</router-link>
				<router-link to="/linshi">
					<i class="icon iconfont icon-icon"></i>
				</router-link>								
			</div>
			
			<div class="bottom-p">
				登录即表示同意本商场 <router-link to="/linshi">隐私政策</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import {Button,Popup,Field} from 'mint-ui'
import qs from 'qs'
import axios from 'axios'
import {Toast} from 'vant'

export default{
	name:'login',
	data(){
		return {
			active:2,
			tabData:['账号验证登录','短信验证登录'],
			testMes:'',
			username:'',
			password:'',
			phonetest:'',
			gaptest:'',
			isbtn:true,
			isbtn1:0,
			isbtn2:0,
			isbtns:0,
		}
	},
	methods:{
		sorry() {
			    Toast('暂无后续逻辑~');
		},
		handleBtn(){
			
		},
		loginback(){
			this.$router.go(-1);
		},
		panduan(){
			if(index==1){
				return true
			}else if(index==2){
				return false
			}
		},
		handleClick(){
			if(this.username!==""&&this.password!==""){
				var loginData=qs.stringify({
					uname:this.username,
					upwd:this.password
				})
				axios({
					method:'post',
					url:'http://132.232.106.129/allPHP/phpbases/login.php',
					data:loginData,
					responseType:'json'
				}).then((response)=>{
//					console.log(response.data)
					if(response.data.status==1){
//						console.log("登录成功")
						this.testMes=""
						
						const toast = Toast.loading({
						  duration: 0,       // 持续展示 toast
						  forbidClick: true, // 禁用背景点击
						  loadingType: 'spinner', //可选值circular、spinner
						  message: '账号登录成功!3秒后返回'
						});
						
						let second = 3;
						const timer = setInterval(() => {
						  second--;
						  if (second) {
						    toast.message = `账号登录成功!${second}秒后返回 `;
						  } else {
						    clearInterval(timer);
						    Toast.clear();
						    var info=response.data.usertoken
							localStorage.setItem('token',JSON.stringify(info))
							this.$store.dispatch('logined')
							this.$router.go(-1)
							this.$store.dispatch('closeLeftA')
						  }
						}, 1000);
						
					}else{
//						console.log("登录失败")
						this.testMes="用户名或密码验证错误"
						Toast.fail('登录失败');
					}
				})
			}
		}
	},
	components:{
		mtButton:Button,
		mtPopup:Popup,
		mtField:Field,
		Toast
	},
	watch:{
		username:function(val){
//			console.log(val)
			if(val!==''){
				this.isbtn1=1
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}else{
				this.isbtn1=0
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}
		},
		password:function(val){
//			console.log(val)
			if(val!==''){
				this.isbtn2=1
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}else{
				this.isbtn2=0
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}
		}
	}
}
</script>

<style>	
.login-top{
	height: 2.5rem;
    line-height: 2.5rem;
    background: #f9f9f9;
    color: #616161;
    font-size: .17rem;
    border-bottom: 1px solid #bbb;
    z-index: 999;
    text-align: center;
    font-size: 1rem;
}
.login-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
.pwdtesdiv{
	width: 100%;
}
.pwdtest{
	width: 90%;
	margin: auto auto;
}
.testdiv{
	border-bottom: 1px solid #d7d7d7;
	height: 3rem;
}
.testdiv .mintui-field-error{
	font-size: 1rem;
}
.testMes{
	height: 2rem;
	line-height: 2rem;
	color: #f23030;
	font-size: .8rem;
	text-align: center;
}
.buttondiv{
	width: 100%;
}
.loginBtn{
	width: 90%;
	margin: auto;
	margin-bottom: .5rem;
}
.loginBtn2{
	color: #ef4f4f;
	background: #fff;
	border:1px solid #ef4f4f;
}
.pwd-manage{
	width: 90%;
	margin: auto;
	margin-top: 1rem;
}
.pwd-manage .pwd-forget{
	float: left;
	color: #333;
	font-size: .7rem;
}
.pwd-manage .pwd-forget i{
	font-size: .8rem;
}
.pwd-manage .pwd-regis{
	float: right;
	color: #333;
	font-size: .7rem;
}
.pwd-manage .pwd-regis i{
	font-size: 1rem;
}
.login-bottom{
	width: 100%;
	margin-top: 4rem;
	height: 6rem;
}	
.login-bottom>div{
	width: 90%;
	margin: auto auto;
}
.bottom-title{
	font-size: .9rem;
	font-weight: 600;
	text-align: center;
	height: 2rem;
	line-height: 2rem;
	color: #bfbfbf;
}	
/*.gap{
	width: 30%;
	border:1px solid #bfbfbf;
	margin-top: 1rem;
}
.gap-left{
	float: left;
}
.gap-right{
	float: right;
}*/
.title-kongbai{
	width: 100%;
	border:.75px solid #bfbfbf;
	background-color: #bfbfbf;
	overflow: hidden;
}
.bottom-title>span{
	background: #fff;
	width: 6.5rem;
	margin: auto auto;
	display: block;
	margin-top: -20px;
}
.bottom-image{
	display: flex;
	justify-content: space-between;
	padding-top: 1rem;
}
.bottom-image i{
	font-size: 1.5rem;
}
.bottom-image i:first-child{
	margin-left: 4rem;
	color: #64B0FF;
}
.bottom-image i:last-child{
	margin-right: 4rem;
	color: #92D67D;
}
.bottom-p{
	text-align: center;
	font-size: .8rem;
	padding-top: 2.5rem;
	color: #333;
}
.yz{
	color: #686868;
}
.yz-last{
	margin-left: 1rem;
}
</style>
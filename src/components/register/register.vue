<template>
	<div class="register-main">
		<div class="register-top">
			<i class="icon iconfont icon-xiangzuo" @click="loginback()" ></i>
			用户注册
		</div>
		
		<div class="register-body">
			<mt-field label='用户名:' v-model='nameData' :state='nameStatus' @change='nameTest()' placeholder='请输入用户名' type='text' name='username' class="testdiv"></mt-field>
			<p class="inputmes">{{isNnameExist}}{{nameComputedTest.nameTestEorr}}</p>
			
			<mt-field label='密码:' v-model='passData' :state='passStatus' placeholder="请输入密码" type='password' name='password' class="testdiv"></mt-field>
			<p class="inputmes">{{passComputedTest.passTestEorr}}</p>
			
			<mt-field label='确认密码:' v-model='passConfirmData' :state='passConfirmStatus' placeholder='请输入确认密码' @change='passConfirmTest()' type='password' class="testdiv"></mt-field>
			<p class="inputmes">{{passConfirmError}}</p>
			
			<mt-field label='邮箱:' v-model='emailData' :state='emailStatus' placeholder='请输入邮箱地址' @change='emailTest()' name='email' type='email' class="testdiv"></mt-field>
			<p class="inputmes">{{emailError}}</p>
			
			<mt-field label="手机号码:" type="text" v-model='phoneData' :state='phoneStatus' placeholder="请输入手机号" @change="phoneTest()" name="phone" class="testdiv"></mt-field>
			<p class="inputmes">{{phoneError}}</p>
			
			<mt-button type="primary" size="large" class='loginBtn' @click="handleClick">注册</mt-button>
		</div>
		<mt-popup class="popup" v-model="popupData" position="top" :modal='modal'>
			<div>{{loginMes}}</div>
		</mt-popup>
	</div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import {Toast} from 'vant'
import {Button,Popup,Field} from 'mint-ui'
	
export default{
	name:'register',
	data(){
		return {
			backgroundDiv:{
				backgroundImage: 'url('+require('./timg3.jpg')+')',
				
			},
			nameData:'', //姓名数据
			passData:'',  //密码数据
			passConfirmData:'',  //密码确认数据
			emailData:'',  //邮箱数据
			phoneData:'',   //手机数据
			nameStatus:'',   //姓名框状态
			passStatus:'',    //密码框状态
			passConfirmStatus:'',  //确认密码框状态
			emailStatus:'',   //邮箱框状态
			phoneStatus:'',   //手机框框状态
			isNnameExist:'',    //姓名格式提示
			passConfirmError:'',   //密码确认一致提示
			emailError:'',   //邮箱格式提示
			phoneError:'',    //手机格式提示
			nameFlag:false,     //姓名格式验证状态
			nameRepeatFlag:false,  //姓名存在通过验证状态
			passFlag:false,    //密码通过状态
			passConfirmFlag:false,  //密码确认一致通过状态
			emailFlag:false,   //邮箱通过状态
			phoneFlag:false,   //手机通过状态
			loginMes:'',   //注册结果提示1
			popupData:false,  //是否关闭popup
			modal:false,   //popup是否创建一个遮罩层
		}
	},
	methods:{
		loginback(){
			this.$router.go(-1)
		},
		nameTest(){
			if(this.nameFlag){
					//console.log(this.nameData)
				var uname=qs.stringify({
						uname:this.nameData
					})
			}
				axios({
					method:'post',
					url:'http://132.232.106.129/allPHP/phpbases/vail.php',
					data:uname,
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
				}).then((response)=>{
					//console.log(response.data)
					if(response.data==1){
						//console.log('执行用户名存在')
						this.isNnameExist='用户名已存在'
						this.nameStatus='error'
						this.nameRepeatFlag=false
					}else if(response.data==2){
						//console.log('执行用户名不存在')
						this.isNnameExist=''
						this.nameStatus='suceess'
						this.nameRepeatFlag=true
					}
				})
		},
		passConfirmTest(){
			if(this.passConfirmData!==this.passData){
					this.passConfirmError='两次密码输入不一致'
					this.passConfirmStatus='error'
					this.passConfirmFlag=false
			}else{
					this.passConfirmError=''
					this.passConfirmStatus='success'
					this.passConfirmFlag=true
			}
		},
		emailTest(){
			var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
				if(!reg.test(this.emailData)){
					this.emailError='邮箱格式错误'
					this.emailFlag=false
					this.emailStatus='warning'
			}else{
					this.emailError=''
					this.emailFlag=true
					this.emailStatus='success'
			}
		},
		phoneTest(){
			var reg=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
				if(!reg.test(this.phoneData)){
					this.phoneError='手机号码格式不正确'
					this.phoneFlag=false
					this.phoneStatus='warning'
				}else{
					this.phoneError=''
					this.phoneFlag=true
					this.phoneStatus='success'
				}
		},
		handleClick(){
				if(this.nameRepeatFlag&&this.passFlag&&this.passConfirmFlag&&this.emailFlag&&this.phoneFlag){
					var loginData=qs.stringify({
						uname:this.nameData,
						password:this.passData,
						email:this.emailData,
						phone:this.phoneData
					})	
					axios({
						method:'post',
						url:'http://132.232.106.129/allPHP/phpbases/register.php',
						data:loginData,
					}).then((response)=>{
						console.log(response)
						if(response.data==2){//1为注册失败，2为注册成功
							this.popupData=true
							this.loginMes='注册成功，赶快去登陆吧！'
							setTimeout(()=>{
								this.$router.push({path:'/'})
							},2000)
						}
					})
				}else{
					this.popupData=true
					this.loginMes="注册失败、请填写正确信息"
					this.closePopup()
				}
		},
		closePopup(){
				if(this.popupData){
					setTimeout(()=>{
						this.popupData=false;
						this.loginMes="";
					},2000)
				}
		}
	},
	component:{
		mtButton:Button,
		mtPopup:Popup,
		mtField:Field,
		Toast,	
	},
	computed:{
		nameComputedTest(){
			let nameTestEorr=''
			if(/[ @#\$%\^&\*]+/g.test(this.nameData)){
					nameTestEorr='用户名不得含有空格等特殊字符'
					this.nameStatus='error'
					this.nameFlag=false
				}else if(this.nameData.length>0){
					if(this.nameData.length<3||this.nameData.length>12){
						nameTestEorr='用户名不得小于3或大于12位'
						this.nameStatus='error'
						this.nameFlag=false
					}else{
						nameTestEorr=''
						this.nameStatus='success'
						this.nameFlag=true
					}
				}
			return {
				nameTestEorr
			}
		},
		passComputedTest(){
			let passTestEorr=''
			let passType=0
				   	if(/[A-Z]/.test(this.passData)){
				   		passType+=1
				   	}
				   	if(/[a-z]/.test(this.passData)){
				   		passType+=1
				   	}
				   	if(/[0-9]/.test(this.passData)){
				   		passType+=1
				   	}
				if(this.passData.length>0){
					if(/\s/.test(this.passData)){
						this.passStatus='warning'
						passTestEorr='密码不得含有空格'
						this.passFlag=false
					}else if(this.passData.length<6||this.passData.length>12){
						this.passStatus='warning'
						passTestEorr='密码必须大于6位且小于12位'
						this.passFlag=false
					}else if(passType<2){
						passTestEorr='密码类型过于简单，必须包含大写字母、小写字母、数字两种及以上'
						this.passFlag=false
						this.passStatus='warning'
					}else{
						passTestEorr=''
						this.passFlag=true
						this.passStatus='success'
					}
				}else{
					passTestEorr=''
					this.passFlag=false
					this.passStatus=''
				}
			return {
				passTestEorr
			}
		}
	},
	created(){
		
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
}
.register-top i{
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;
}
.reg-mes{
	height:30px;
    line-height:30px;
    text-align:center;
    font-size:14px;
    color:#d9534f;
}
.register-body{
	width: 90%;
	margin: auto auto;
	
}
.register-body>p{
	font-size: 14px;
    text-align: center;
    color: #d9534f;
}
.testdiv{
	/*border-top: none;
	border-bottom: 1px solid #d7d7d7;
	height: 3rem;*/
	border-bottom: 1px solid #d7d7d7;
}
.testdiv .mintui-field-error{
	font-size: 1rem;
}
.popup{
  	height:45px;
  	background-color:rgba(0,0,0,.7) !important;
 	width:100%;
  	color:#fff;
 	text-align:center;
  	line-height:45px;
 	transition:all .5s linear;
}
  
</style>
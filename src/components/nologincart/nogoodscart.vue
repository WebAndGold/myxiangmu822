<template>
	<div class="noplogin">
		<div class="noplogin-img">
			<img src="http://132.232.106.129/allPHP/imgs/5a93c51cN3bb5e37b.png" alt="" />
		</div>
		<div class="noplogin-p">
			购物车空空如也，去逛逛吧~
		</div>
		
	</div>

</template>

<script>
export default{
	name:'nogoodscart',
	data(){
		return {
			
		}
	},
	methods:{
		
	},
}
</script>


<style>
.noplogin{
	padding: 30px 0 50px;
	background-color: #F7F7F7;
}
.noplogin-img img{
	width: 90px;
    height: 90px;
    margin-left: 38%;
}
.noplogin-p{
	text-align: center;
	font-size: 16px;
    color: rgba(51,51,51,.66);
    margin: 11px 0;
}
.noplogin-btn{
	margin: 14px;
	width: 100%;
}
.noplogin-botton{
	border: 1px solid #e4393c;
    color: #e4393c;
	position: absolute;
	margin-left: 50%;
	left: -30px;
}
</style>
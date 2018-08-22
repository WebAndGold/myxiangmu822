<template>
	<div>
		<g-header></g-header>
		<home-page></home-page>
	</div>
</template>

<script>
	import gHeader from '@/components/g-header/g-header'
	import homePage from '@/components/homepage/homepage'
	import {mapState,mapMutation,mapAction} from 'vuex'
	
	export default{
		name:'home',
		data(){
			return {
				
			}
		},
		components:{
			gHeader,
			homePage
		},
		computed:{
			...mapState(['user','showLeftFlag','loginState'])
		},
	}
</script>

<style>
</style>
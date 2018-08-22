<template>
	<div class="floor">
		<div class="floor-title" :style="backgroundDiv">{{floorName}}</div>
		<div class="floor-anomaly">
			<div class="floor-one"><img :src="floorData0.image" alt="" width="100%" @click="sorry"/></div>
			<div>
				<img :src="floorData1.image" alt="" width="100%"@click="sorry"/>
				<img :src="floorData2.image" alt=""  width="100%"@click="sorry"/>
			</div>
		</div>
		<div class="floor-rule">
            <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                <img :src="item.image" width="100%"@click="sorry"/>
            </div>
        </div>
	</div>
</template>

<script>
	import {Toast,ImagePreview} from 'vant'
	
	export default{
		props:['floorData','floorNames'],
		name:'commendfollr',
		data(){
			return {
				backgroundDiv:{
					backgroundImage: 'url('+require('./floor.jpg')+')',				
				},
			}
		},
		methods:{
			sorry() {
			    Toast('暂无后续逻辑~');
			},
		},
		components:{
			
		},
		created(){
			this.floorData0=this.floorData[0]
			this.floorData1=this.floorData[1]
			this.floorData2=this.floorData[2]
			this.floorName=this.floorNames
			//console.log(this.floorNames)
		},
		watch:{
			floorData:function(val){
				//console.log(this.floorName)
				this.floorData0=this.floorData[0]
				this.floorData1=this.floorData[1]
				this.floorData2=this.floorData[2]
			},
			floorNames:function(val){
				this.floorName=this.floorNames;
				//console.log(this.floorName)
			}
		}
	}
</script>

<style>
  .floor-title{
  	border-bottom:1px solid #eee;
  	font-size: 14px;
  	padding: 0.5rem;
  	color: #e5017d;
  	font-weight: 600;
  	background-repeat: no-repeat;
  	background-size: cover;
  	background-position: center 0;
  }
  .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;
    
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;
      
  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
  
  .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      background-color: #fff;
 
  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }
</style>
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Search from '@/components/search/search'
import Xiaoxi from '@/components/xiaoxi/xiaoxi'
import Login from '@/components/login/login'
import 	Linshi from '@/components/linxhi/linshi'
import Register from '@/components/register/register'
import 	Fenlei from '@/components/fenlei/fenlei'
import 	Faxian from '@/components/faxian/faxian'
import 	Cart from '@/components/cart/cart'
import HomeNews from '@/components/homenews/homenews'
import faixanbBanner from '@/components/faxianbanner/faxianbanner'
import kongBai from '@/components/faxianbanner/kongbai'
import Article from '@/components/article/article'
import User from '@/components/user-page/user'
import Rearticle from '@/components/rearticle/rearticle'
import Nologincart from '@/components/nologincart/nologincart'
import Nogoodscart from '@/components/nologincart/nogoodscart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/homenews',
      component: Home,
      children:[
      	{
      		name:'homenews',
      		path:'homenews',
      		component:HomeNews
      	},
      	{
      		name:'fenlei',
      		path:'fenlei',
      		component:Fenlei
      	},
      	{
      		name:'faxian',
      		path:'faxian',
      		component:Faxian
      	},
      ]
    },
    {
    	name:'search',
    	path:'/search',
    	component:Search
    },
    {
      name:'cart',
      path:'/cart',
      component:Cart
    },
    {
    	name:'xiaoxi',
    	path:'/xiaoxi',
    	component:Xiaoxi
    },
    {
    	name:'login',
      path:'/login',
      component:Login
    },
    {
    	name:'linshi',
    	path:'/linshi',
    	component:Linshi
    },
    {
    	name:'register',
    	path:'/register',
    	component:Register
    },
    {
    	name:'faxianbanner',
    	path:'/faxianbanner',
    	component:faixanbBanner,
    },
    {
    	name:'kongbai',
    	path:'/kongbai',
    	component:kongBai,
    },
    {
    	name:'article',
    	path:'/article/:lid',
    	component: Article
    },
    {
    	name:'user',
    	path:'/user',
    	component: User
    },
    {
    	name:'rearticle',
    	path:'/rearticle/:id',
    	component: Rearticle
    },
    {
    	name:'nologincart',
    	path:'/nologincart',
    	component: Nologincart
    },
    {
    	name:'nogoodscart',
    	path:'/nogoodscart',
    	component: Nogoodscart
    }
  ]
})

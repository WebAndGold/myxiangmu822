// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import 'mint-ui/lib/style.css'
import store from './store/store'
import { List,Row,Col,Button, Collapse, CollapseItem, Cell, CellGroup,Icon,Tag, Badge, BadgeGroup, NoticeBar,Slider, Toast,Switch, Tab, Tabs,Swipe, SwipeItem,GoodsAction,  GoodsActionBigBtn,  GoodsActionMiniBtn, SubmitBar, Card,Checkbox, CheckboxGroup} from 'vant'

Vue.config.productionTip = false

Vue.use(VueLazyload,{
	loading: require('./component/image/gloading.gif')
}).use(Mint).use(List).use(Row).use(Col).use(Button).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(Icon).use(Tag).use(Badge).use(BadgeGroup).use(NoticeBar).use(Slider).use(Toast).use(Switch).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(SubmitBar).use(Card).use(Checkbox).use(CheckboxGroup);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

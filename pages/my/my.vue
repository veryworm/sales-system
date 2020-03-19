<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#64d9d6" color="#ffffff"  @clickRight="setting" right-text="设置" title="我的信息" ></uni-nav-bar>
		</view>
		<view class="my_header">
			<view class="my_image">
				<img style="width: 60px; height:60px ; border-radius: 50%;" :src="info.avatar" alt="">
			</view>
			<view class="my_name">
				<text v-if="info.id!== undefined">
					{{info.name}}
				</text>
				<text @click="toLoginOrRegister" v-else>
					<text>登录/注册 ></text>
				</text>
			</view>
		</view>
		<view class="my_order_total">
			<ul>
				<li @click="toOrderStatus(item,index)" v-for="(item,index) in ordersort1" :key="item.name">
					<view style="position: relative; left: 80%;">
						<uni-badge :text="item.length" type="error" :inverted="false"></uni-badge>
					</view>
					<img style="width:20px; height: 20px;" :class="item.length=='0'?'onePadding':''" :src="item.imgsrc" alt=""> <br>
					{{item.name}}
				</li>
			</ul>
		</view> 
		<view class="other_message">
			<uni-list>
			    <uni-list-item title="标题文字" note="描述信息"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { setToken, getToken, removeToken } from '../../utiles/auth.js'
	import { mixStatus } from '../../store/modules/mix.js'
	export default {
		mixins:[mixStatus],
		components: {
			uniNavBar,
			uniBadge,
			uniList,
			uniListItem
		},
		created() {
			this.allrefreshtoken()
			// this.manyOrder()
			this.findAllOrder()
		},
		computed:{
			...mapState("user",["info"]),
			...mapState('order',['currentCustomerOrder','refreshCommentOfVoidData','allContent','ordersort1'])
		},
		data() {
			return {
			
			}
		},
		methods:{
			...mapActions('user',['info1']),
			...mapActions('order',['findAllOrder','findAllComments']),
			// 跳转订单状态页面
			toOrderStatus(item,index){
				item.index = index
				uni.navigateTo({
					url:'../order/orderstatus?item='+JSON.stringify(item)
				})
			},
			setting(){
				uni.navigateTo({
					url:'./myAccount' 
				})
			},
			// 登录,注册
			toLoginOrRegister(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			manyOrder(){
				let watingListLength = this.currentCustomerOrder.filter((item)=>{
					return item.status == '待派单'
				})
				this.myOrderStatus[0].length = watingListLength.length
				
				let watingComfirmLength = this.currentCustomerOrder.filter((item)=>{
					return item.status == '待确认'
				})
				this.myOrderStatus[1].length = watingComfirmLength.length
				console.log(this.myOrderStatus[1].length)
				let haveFinishLength = this.currentCustomerOrder.filter((item)=>{
					return item.status == '已完成'
				}) 
				this.myOrderStatus[2].length = haveFinishLength.length
				// let watingCommentLength = this.cur rentCustomerOrder.filter((item)=>{
				// 	return item.status == '待派单'
				// })
				// let AllOrderLength = this.currentCustomerOrder.filter((item)=>{
				// 	return item
				// })
				
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #F2F2F2;
		padding-bottom: 10px;
	}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	}
	.my_header{
		padding: 5px 10px 20px 10px;
		background-image:url('../../static/obscureimg.jpg');
		// background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
	}
	.my_image{
		border-radius: 50%;
		float: left;
		width: 18%;
		height: 60px;
		// background-color: #007AFF;
	}
	.my_header::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_name{
		color: #FFFFFF;
		margin-left: 80px;
		font-size: 16px;
	}
	.my_order_total{
		margin-top: 10px; 
		background-color: #FFFFFF;
		padding: 5px 0 5px 0;
		border-radius: 10px;
	}
	.my_order_total>ul{
		list-style: none;
		margin: 0;
		padding: 0 0 10px 10px;
	}
	.my_order_total>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_order_total>ul>li{
		float: left;
		width: 18%;
		font-size: 12px;
		text-align: center;
		line-height: 1.5em;
	}
	.other_message{
		margin-top: 10px;
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 10px;
	}
	.onePadding{
		padding-top: 20px;
	}
</style>


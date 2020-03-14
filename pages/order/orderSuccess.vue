<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#892225" color="#ffffff" rightText="完成" @clickRight="closepage" ></uni-nav-bar>
		</view>
		<view class="order_success">
			<view class="pay_success_message">
				<ul>
					<li>√</li>
					<li>支付成功</li>
				</ul>
			</view>
			<view class="pay_success_price">
				<ul>
					<li>¥{{selectPrice}}</li>
					<li>微信支付</li>
				</ul>
			</view>
			<view class="obsecure_order">
				<ul>
					<li><button @click="toOrderStatus" type="primary" size="mini">查看订单</button></li>
					<li><button type="primary" size="mini">品质放心购</button></li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		components: {
			uniNavBar
		},
		data(){
			return {
				
			}
		},
		computed:{
			...mapState('shopcar',['selectPrice'])
		},
		methods:{
			closepage(){
				uni.switchTab({
					url:'../home/home'
				})
			},
			// 跳到订单详情
			toOrderStatus(){
				uni.navigateTo({
					url:'./orderstatus'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		height: 30%;
		background-color: #892225;
		border-bottom-left-radius: 10%;
		border-bottom-right-radius: 10%;
		padding-bottom: 25px;
		text-align: center;
	}
	.order_success{
		color: #FFFFFF;
	}
	.pay_success_message{
		font-size: 20px;
		margin-left: 33%;
	}
	ul{
		list-style: none;
		padding: 0;
		padding: 0;
	}
	ul::after{
		content: "";
		display: block;
		clear:both
	}
	button{
		border-radius: 15px;
	}
	.pay_success_message>ul>li{
		float: left;
	}
	.pay_success_message>ul>li:first-child{
			width: 22px;
			height: 22px;
			background-color: #7f1f21;
			padding: 3px;
			border-radius: 50%;
			margin-right: 8px;
	}
	.pay_success_message>ul>li:last-child{
		color: #FFFFFF;
		font-size: 20px;
	}
	.pay_success_price{
		margin-top: 25px;
	}
	.pay_success_price>ul>li:last-child{
		font-size: 12px;
	}
	.obsecure_order{
		margin-top: 25px;
		padding-left: 30px;
	}
	.obsecure_order>ul{
		width: 240px;
		list-style: none;
		margin: 0 auto;
		padding: 0;
	}
	.obsecure_order>ul>li{
		float: left;
	}
	.obsecure_order>ul>li:last-child{
		margin-left: 15px;
	}
	.obsecure_order>ul>li>button{
		float: left;
	}
	.obsecure_order>ul>li:last-child>button{
		color: #892225;
		background-color: #FFFFFF;
	}
</style>

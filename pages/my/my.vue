<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#ff474a" color="#ffffff"  @clickRight="setting" right-text="设置" ></uni-nav-bar>
		</view>
		<view class="my_header">
			<view class="my_image">
				
			</view>
			<view class="my_name">
				name
			</view>
		</view>
		<view class="my_order_total">
			<ul>
				<li @click="toOrderStatus(index)" v-for="(item,index) in myOrderStatus" :key="item.name">
					<img :src="item.imgsrc" alt=""> <br>
					{{item.name}}
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				myOrderStatus:[
					{
						name:'待确认',
						imgsrc:'../../static/waiting_pay.png'
					},
					{
						name:'已完成',
						imgsrc:'../../static/have_finished.png'
					},
					{ 
						name:'待评价',
						imgsrc:'../../static/waiting_describe.png'
					},
					{
						name:'全部订单',
						imgsrc:'../../static/all_order.png'
					}
				]
			}
		},
		methods:{
			// 跳转订单状态页面
			toOrderStatus(index){
				uni.navigateTo({
					url:'../order/orderstatus?index='+index
				})
			},
			setting(){
				uni.navigateTo({
					url:'./myAccount'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #F2F2F2;
		padding-bottom: 10px;
	}
	.my_header{
		width: 95%;
		padding: 5px 10px 20px 10px;
		background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
	}
	.my_image{
		border-radius: 50%;
		float: left;
		width: 18%;
		height: 60px;
		background-color: #007AFF;
	}
	.my_header::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_name{
		color: #FFFFFF;
		margin-left: 80px;
	}
	.my_order_total{
		margin-top: 10px; 
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 10px;
	}
	.my_order_total>ul{
		list-style: none;
		margin: 0;
		padding: 0;
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
		margin-left: 20px;
		text-align: center;
		line-height: 1.5em;
	}
</style>


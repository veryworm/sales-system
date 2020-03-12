<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar @clickLeft="backbeforepage" @clickRight="searchOrder" left-icon="back" left-text="返回" right-icon="search" title="我的订单"></uni-nav-bar>
		</view>
		<view class="order_status_sort">
			<uni-segmented-control
			 :current="current" 
			 :orderstatus="orderstatus"
			 :values="items" 
			 @clickItem="onClickItem" 
			 style-type="text" 
			 active-color="#ff0000">
			 </uni-segmented-control>
			 <view v-if="current==0" class="waiting_confirm">
			 	<view class="order_one_header">
					<ul>
						<li><img src="../../static/goods_logo.png" alt=""></li>
						<li>名字></li>
						<li><img src="../../static/trash2.png" alt=""></li>
						<li>状态</li>
					</ul>
				</view>
				<view class="product_totalMessage">
					<ul>
						<li>图</li>
						<li>订单编号</li>
						<li>下单时间</li>
						<li>名字</li>
						<li>¥</li>
					</ul>
				</view>
			 </view>
			 <view v-if="current==1" class="have_finished">
			 	2
			 </view>
			 <view v-if="current==2" class="waiting_desciption">
			 	3
			 </view>
			 <view v-if="current==3" class="all_order">
			 	4
			 </view>
		</view>
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{	
		components: {
			uniSegmentedControl,
			uniNavBar
		},
		data(){
			return{
				orderstatus:0,
				items: ['待确认','已完成','待评价','全部订单'],
				current: 0
			}
		},
		onLoad(index) {
			this.orderstatus = index.index
		},
		created() {
			this.loadIndex()
		},
		methods:{
			// 让传来的数值变为number，否则传值错误 2.刚加载页面默认让currentIndex为0
			loadIndex(){
				let index = Number(this.orderstatus)
				this.current = index
				if(this.orderstatus == undefined){
					this.current = 0
				}
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			backbeforepage(){
				uni.switchTab({
					url:'../my/my'
				})
			},
			// 搜索订单
			searchOrder(){
				uni.navigateTo({
					url:'./searchorder'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
		padding-bottom: 10px;
	}
	.order_status_sort{
		background-color: #ffffff;
	}
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	}
	.waiting_confirm{
		padding: 0 10px 10px 10px;
	}
	.order_one_header{
		line-height: 1.7em;
	}
	.order_one_header>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.order_one_header>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.order_one_header>ul>li{
		float: left;
		font-size: 14px;
		
	}
	
	.order_one_header>ul>li:nth-child(2){
		margin-left: 5px;
		font-weight: 550;
	}
	.order_one_header>ul>li:nth-child(4){
		float: right;
		margin-right: 15px;
	}
	.order_one_header>ul>li:nth-child(3){
		float: right;
	}
	.product_totalMessage>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.product_totalMessage>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.product_totalMessage>ul>li{
		font-size: 14px;
	}
	.product_totalMessage>ul>li:nth-child(1){
		width: 25%;
		background-color: #007AFF;
		height: 70px;
		border-radius: 10px;
		float: left;
	}
	.product_totalMessage>ul>li:nth-child(2){
		float: left;
		margin-left: 10px;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(3){
		text-align: right;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(4){
		font-size: 14px;
		float: left;
		margin-left: 10px;
	}
	.product_totalMessage>ul>li:nth-child(5){
		float: right;
		font-size: 17px;
	}
</style>

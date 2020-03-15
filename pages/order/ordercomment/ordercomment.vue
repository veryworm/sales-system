<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar  @clickLeft="backbeforepage" @clickRight="submitComment" left-icon="back" right-text="提交" color="#fd0b58"></uni-nav-bar>
		</view>
		<view class="order_commont_total">
			<ul>
				<li>
					<img style="width: 60px; height: 60px; border-radius: 10px;" src="../../../static/loadfailed.gif" alt="">
				</li>
				<li>商品评价</li>
				<li></li>
				<li><uni-rate size="16" active-color="#f40e30" margin="6" color="#9c9c9c" value="2"></uni-rate></li>
				<li></li>
			</ul>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniNavBar,
			uniRate 
		},
		data() {
			return {
				orderItem:[]
			};
		},
		onLoad(val) {
			this.orderItem = [JSON.parse(val.item)]
		},
		methods:{
			backbeforepage(){
				uni.navigateTo({
					url:'../orderstatus'
				})
			},
			submitComment(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
		padding-bottom: 10px;
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul::after{
		content: "";
		display: block;
		clear: both;
	}
	
	.order_commont_total>ul>li{
		font-size: 14px;
	}
	.order_commont_total>ul>li:nth-child(1){
		width: 55px;
		height: 55px;
		border-radius: 10px;
		float: left;
	}
	.order_commont_total>ul>li:nth-child(2){
		margin-left: 65px;
		font-weight: 550;
	}
	.order_commont_total>ul>li:nth-child(3){
		// float: right;
	}
</style>

<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#64d9d6" color="#ffffff" leftIcon="back"  @clickLeft="backtopage"  title="填写订单" ></uni-nav-bar>
		</view>
		<!-- 地址部分,判断当前遍历的值是默认地址还是修改后的地址 -->
		<view v-for="item in choiceAddress.length!==0 ? choiceAddress : defaultAddress" @click="ToEditAddress" :key="item.id" class="address_content">
			<view class="address_header">
				<ul>
					<li>默认</li>
					<li>{{item.province + item.city + item.area}}</li>
				</ul>
			</view>
			<view class="address_apprently_Name">
				<text>{{item.province + item.city + item.area}}</text>
			</view>
			<view class="address_name_number">
				<text>{{item.realname}}   {{item.telephone}}</text>
				<text style="font-weight: 700; font-size: 16px; float: right;">></text>
			</view>
		</view>
		<view class="pay_ways">
			<ul>
				<li>支付方式</li>
				<li>在线支付</li>
			</ul>
		</view>
		<!-- favourable goods -->
		<view class="body_content">
			<view class="card_content">
				<ul v-for="item of orderLines2.values()" :key="item.productId"  class="card_logo">
					<li>
						<img style="width: 100%;height: 100%;border-radius: 10px;" :src="item.photo" alt="">
					</li>
					<li>
						<text>{{item.productName}}</text>
					</li>
					<li>
						<text style="color: red;">￥{{item.price}}</text>
					</li>
					<li>
						<!-- <text>总价格:{{price.price}}</text> -->
					</li>
					<li>
						<text>共{{item.number}}件</text>
					</li>
				</ul>
			</view> 
		</view>
		<view class="submit_order">
			<view class="submit_order_totalprice">
				<text style="font-size: 16px;">¥</text>{{total3}}
			</view>
			<view class="submit_order_button">
				<button class="mini-btn" type="warn" size="mini">确定订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar,
		},
		data() {
			return {
				choiceAddress:[],
				defaultAddress:[]
			}
		},
		onLoad(item) {
			if(item.val){
				this.choiceAddress = [JSON.parse(item.val)]
			}
		},
		created() {
			this.defaultAddress = [this.addresses[0]]
		},
		computed:{
			...mapState('shopcar',['orderLines2']),
			...mapState('user',['addresses','newresponse']),
			...mapGetters('shopcar',['total3'])
		},
		methods:{
			ToEditAddress(){
				uni.navigateTo({
					url:'../address/address?val='+ '真'
				})
			},
			backtopage(){
				uni.switchTab({
					url:'../shoppingcar/shoppingcar'
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
	.address_content{
		padding: 10px 10px 20px 10px;
		background-color: #FFFFFF;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		border-bottom: 2px dashed #6eb8f0;
	}
	.address_header{
		padding: 5px;
		
	}
	.address_header>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.address_header>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.address_header>ul>li{
		font-size: 12px;
		padding: 0px 3px 0px 3px;
	}
	.address_header>ul>li:nth-child(1){
		float: left;
		border-radius: 3px;
		background-color: red;
		color: #FFFFFF;
	}
	.address_header>ul>li:nth-child(2){
		margin-left: 30px;
	}
	.address_apprently_Name{
		line-height: 2em;
	}
	.address_name_number{
		font-size: 13px;
	}
	.pay_ways{
		margin-top: 10px;
		line-height: 3.5em;
		padding:0 10px 0  10px;
		font-size: 13px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.pay_ways>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.pay_ways>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.pay_ways>ul>li{
		float: left;
	}
	.pay_ways>ul>li:last-child{
		float: right;
	}
	.body_content{
		margin-top: 10px;
		padding: 10px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.card_content{
		background-color: #FFFFFF;
		padding: 0 .6rem .5rem .3rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		border-radius: 10px;
	}
	.card_logo{
		list-style: none;
		margin: 0;
		padding: 0;
		color: #3a414c;
		margin-top: 10px;
		font-size: 13px;
		font-weight: 400;
		border-bottom: 1px solid #f2f2f2;
	}
	.card_logo>li{
		display: inline-block;
		padding-left: 10px;
		border-radius: 10px;
	}
	.card_logo>li:nth-child(1){
		height: 75px;
		width: 25%;
		float: left;
	}
	.card_logo::after{
		content: '';
		display: block;
		clear: both;
	}
	.card_logo>li:nth-child(2){
		width: 50%;
		height: 35px;
	}
	.card_logo>li:nth-child(3){
		height: 20px;
		width: 50%;
		background-color: #FFFFFF;
		color: #f3270c;
		font-size: 16px;
		font-weight: 400;
	}
	.card_logo>li:nth-child(4){
		width: 60%;
	}
	.card_logo>li:nth-child(5){
		text-align: right;
		width: 60%;
		margin-bottom: 5px;
	}
	.submit_order{
		background-color: #ededed;
		padding: 10px;
		position: fixed;
		width:95%;
		bottom: 0;
	}
	.submit_order_totalprice{
		float: left;
		font-size: 24px;
		color: red;
	}
	.submit_order_button{
		float: right;
	}
</style>

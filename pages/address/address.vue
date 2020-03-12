<template>
	<view class="content">
		<view class="my_address">
			<ul v-for="item in addresses" :key="item.id">
				<li>{{newresponse.realname}}</li>
				<li>{{newresponse.telephone}}</li>
				<li>家</li>
				<li></li>
				<li>{{item.province + item.city + item.area + item.address }}</li>
				<li @click="editAddressMessage(item,newresponse.realname)">
					<img src="../../static/editAddress.png" alt="">
				</li>
			</ul>
		</view>
		<view class="my_addTakeAddress">
			<button @click="toAddAddress" style="font-size: 14px; border-radius: 25px;" type="warn"><text style="font-weight: 550;">+</text>新增收货地址</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		computed:{
			...mapState('user',['addresses','newresponse'])
		},
		methods:{
			editAddressMessage(item,realname){
				item.realname = realname
				uni.navigateTo({
					url:'./editAddress?val='+JSON.stringify(item)
				})
			},
			toAddAddress(){
				uni.navigateTo({
					url:'./editAddress?val='+ '新增地址'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10px;
	}
	.my_address>ul{
		list-style: none;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid #F2F2F2;
	}
	.my_address>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_address>ul>li{
		line-height: 1.5em;
		font-size: 14px;
		float: left;
	}
	.my_address>ul>li:nth-child(1){
		width: 80px;
		font-weight: 550;
	}
	.my_address>ul>li:nth-child(2){
		font-weight: 550;
	}
	.my_address>ul>li:nth-child(3){
		font-weight: 550;
		padding: 0px 4px 0px 4px;
		background-color: #007AFF;
		color: #FFFFFF;
		width: 15px;
		margin-left: 10px;
	}
	.my_address>ul>li:nth-child(4){
		clear: both;
	}
	.my_address>ul>li:nth-child(5){
		float: left;
		margin-top: 6px;
	}
	.my_address>ul>li:nth-child(6){
		float: right;
		margin-top: 6px;
	}
	.my_addTakeAddress{
		width: 200px;
		position: absolute;
		bottom: 10px;
		left: 50%;
		margin-left: -100px;
	}
</style>

<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#79a7d9" color="#ffffff" leftIcon="back"  @clickLeft="backToAddress" title="收货地址" ></uni-nav-bar>
		</view>
		<view v-if="info.id!== undefined">
			<view class="my_address">
				<ul v-for="(item,index) in addresses" :key="item.id">
					<li>
						<view v-if="index==isorcurrentindex" class="isIndex">
							√
						</view>
					</li>
					<li v-if="newresponse[0]!==undefined">{{newresponse[0].realname}}</li>
					<li v-if="newresponse[0]!==undefined">{{newresponse[0].telephone}}</li>
					<li>家</li> 
					<li></li>
					<li @click="choiceAddress(item,index)">{{item.province + item.city + item.area + item.address }}</li>
					<li @click="editAddressMessage(item,newresponse[0].realname)">
						<img src="../../static/editAddress.png" alt="">
					</li>
					<li >
						<!-- <img @click="deleteAddress(item.id)" src="../../static/trash.png" style="width:28px; height: 28px;" alt=""> -->
					</li>
				</ul>
			</view>
			<view class="my_addTakeAddress">
				<button @click="toAddAddress" style="font-size: 14px; border-radius: 25px;" type="warn"><text style="font-weight: 550;">+</text>新增收货地址</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { setToken, getToken, removeToken } from '../../utiles/auth.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mixStatus } from '../../store/modules/mix.js'
	export default {
		mixins:[mixStatus],
		components: {
			uniNavBar
		},
		data() {
			return {
				isChoiceAddress:'假'
			}
		},
		onLoad(item) {
			if(item.val == '真'){
				this.isChoiceAddress = '真'
			}else if(item.val == '真的'){
				this.isChoiceAddress = '真的'
			}else{
				this.isChoiceAddress = '假'
			}
		},
		created() {
			this.allrefreshtoken()
			if(this.info.id== undefined){
				uni.navigateTo({
					url:"../login/login"
				})
			}
		},
		computed:{
			...mapState('user',['addresses','newresponse','info']),
			...mapGetters('shopcar',['isorcurrentindex'])
		},
		methods:{
			...mapActions('user',['info1','deleteAddressByUserId']),
			...mapMutations('shopcar',['deterIndex']),
			...mapMutations('user',['refreshSelectAddressId']),
			editAddressMessage(item,realname){
				if(item.customerId!==undefined){
					item.realname = realname
					uni.navigateTo({
						url:'./editAddress?val='+JSON.stringify(item)
					})
				}
			},
			// 选地址跳回订单
			choiceAddress(item,index){
				this.deterIndex(index)
				this.refreshSelectAddressId(item.id)
				item.name = this.newresponse[0].realname
				item.telephone = this.newresponse[0].telephone
				if(this.isChoiceAddress== '真'){
					uni.navigateTo({
						url:'../order/order?val=' + JSON.stringify(item)
					})
				}else if(this.isChoiceAddress == '真的'){
					// 跳回模态框地址部分
					uni.navigateTo({
						url:'../good_all_function/good_all_function?val='+ JSON.stringify(item)
					})
				}
			},
			toAddAddress(){
				uni.navigateTo({
					url:'./editAddress?val='+ '新增地址'
				})
			},
			// 删除地址
			deleteAddress(id){
				this.deleteAddressByUserId(id)
				.then(()=>{
					alert('删除成功')
				})
				.catch((res)=>{
					alert(res)
				})
			},
			backToAddress(){
				if(this.isChoiceAddress == '真'){
					uni.navigateTo({
						url:'../order/order'
					})
				}else if(this.isChoiceAddress == '真的'){
					uni.navigateTo({
						url:'../good_all_function/good_all_function'
					})
				}else{
					uni.navigateTo({
						url:'../my/myAccount'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding-bottom: 10px;
	}
	.my_address>ul{
		list-style: none;
		margin: 0;
		border-bottom: 1px solid #F2F2F2;
		margin-top: 5px;
		padding:0 10px 10px 10px;
		
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
	.my_address>ul>li:nth-child(2){
		width: 80px;
		font-weight: 550;
	}
	.my_address>ul>li:nth-child(3){
		font-weight: 550;
	}
	.my_address>ul>li:nth-child(4){
		font-weight: 550;
		padding: 0px 4px 0px 4px;
		background-color: #007AFF;
		color: #FFFFFF;
		width: 15px;
		margin-left: 10px;
	}
	.my_address>ul>li:nth-child(5){
		clear: both;
	}
	.my_address>ul>li:nth-child(6){
		float: left;
		margin-top: 6px;
	}
	.my_address>ul>li:nth-child(7){
		float: right;
		margin-top: 6px;
	}
	.my_address>ul>li:nth-child(8){
		float: right;
		margin-top: 1px;
	}
	.my_addTakeAddress{
		width: 200px;
		position: absolute;
		bottom: 10px;
		left: 50%;
		margin-left: -100px;
	}
	.isIndex{
		width: 20px; 
		height: 20px; 
		background-color: red; 
		color: #FFFFFF; 
		border-radius: 50%;
		text-align: center;
		margin-right: 10px;
	}
</style>

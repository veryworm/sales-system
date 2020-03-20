<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#79a7d9" color="#ffffff" leftIcon="back"  @clickLeft="backToAddress" title="账户设置" ></uni-nav-bar>
		</view>
		<view class="my_account_header">
			<ul>
				<li>
					<img style="width: 55px; height: 55px; border-radius: 50%;" :src="info.avatar" alt="">
				</li>
				<li>
					<text v-if="info.id !== undefined">{{info.name}}</text>
					<text v-else>登录/注册</text>
				</li>
			</ul>
			<view @click="toAddressMessage" class="my_account_address">
				<text>地址管理</text>
				<text style="float: right;">></text>
			</view>
		</view>
		<view class="my_account_other">
			<view class="my_account_other_one">
				<text>其他</text>
				<text style="float: right;">></text>
			</view>
		</view>
		<view class="my_account_other">
			<view @click="logoutUser" class="my_account_text">
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { setToken, getToken, removeToken } from '../../utiles/auth.js'
	import { mixStatus } from '../../store/modules/mix.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		mixins:[mixStatus],
		components: {
			uniNavBar
		},
		data(){
			return {
				
			}
		},
		computed:{
			...mapState("user",["info"])
		},
		created() {
			let token = getToken()
			if(token){
				this.info1(token)
			}else{
				
			}
		},
		methods:{
			...mapActions('user',['logout','info1']),
			toAddressMessage(){
				uni.navigateTo({
					url:'../address/address'
				})
			},
			logoutUser(){
				this.logout()
				.then(()=>{
					this.logoutnsuccess()
				})
			},
			backToAddress(){
				uni.switchTab({
					url:'./my'
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
	.my_account_header{
		border-bottom: 1px solid #F2F2F2;
		background-color: #FFFFFF;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding:10px 10px 0 10px;
	}
	.my_account_header>ul{
		list-style: none;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid #F2F2F2;
	}
	.my_account_header>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_account_header>ul>li:nth-child(1){
		width: 16%;
		height: 55px;
		float: left;
		border-radius: 50px;
		padding: 5px;
		margin-bottom: 10px;
	}
	.my_account_header>ul>li:nth-child(2){
		font-size: 14px;
		line-height: 2.5em;
		margin-left: 80px;
	}
	.my_account_address{
		background-color: #FFFFFF;
		padding: 10px 0 10px 0;
	} 
	.my_account_other{
		border-radius: 10px;
		padding: 10px;
		margin-top: 10px;
		background-color: #FFFFFF;
	}
	.my_account_other_one{
		line-height: 1.5em;
	}
	.my_account_text{
		line-height: 1.5em;
		text-align: center;
	}
</style>


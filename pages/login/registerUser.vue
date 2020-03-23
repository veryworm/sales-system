<template>
	<view class="content">
		<view class="register_step">
			<uni-steps :options="options1" :active="active1"></uni-steps>
		</view>
		<view v-if="active1==0||active1==1" class="isUsertelephone">
			<form @submit="formsubmit">
				 <view v-if="active1==0" class="uni-form-item uni-column">
					<view class="title">手机号</view>
						<input @input="telephonekeyup1" class="uni-input" v-model="formData.telephone" placeholder="请输入您的手机号" />
						<p v-if="!istestIsTelephone" style="color: red; font-size: 12px; margin-left: 10px;">{{prompt}}</p>
					<view class="title">用户名</view>
						<input @input="userNamekeyup1" class="uni-input" v-model="formData.username" placeholder="请输入您的用户名" />
						<p v-if="!istestIsUserName" style="color: red; font-size: 12px; margin-left: 10px;">{{prompt}}</p>
					<view class="title">姓名</view>
						<input class="uni-input" v-model="formData.realname" placeholder="请输入您的姓名" />
					<view class="title">密码</view>
						<input @input="passwordkeyup1" class="uni-input" v-model="formData.password" placeholder="请输入您的密码" />
						<p v-if="!istestIspassword" style="color: red; font-size: 12px; margin-left: 10px;">{{prompt}}</p>
					<view class="uni-btn-v">
						<button size="mini" type="primary" form-type="submit">下一步</button>
					</view>
				 </view>
				<view v-if="active1==1" class="total">
					<view class="registerSuccess">
						<view class="registerSuccess_header">
							 <ul>
							 	<li>
									<img style="width: 25px; height: 25px;" src="../../static/success.png" alt="">
								</li>
							 	<li>
									尊敬的用户，您已成功注册零食客，请<span @click="toLogin" style="color: #007AFF;">点击登录!</span>
								</li>
							 </ul>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
	    components: {uniSteps},
		data(){
			return {
				options1:[{title: '验证个人信息'}, {title: '注册成功'}],
				active1:0,
				formData:{
					telephone:'',
					username:'',
					realname:'',
					password:'',
				},
				prompt:"",
				testIsTelephone:true,
				testIsUserName:true,
				testIspassword:true
			}
		},
		computed:{
			istestIsTelephone(){
				return this.testIsTelephone
			},
			istestIsUserName(){
				return this.testIsUserName
			},
			istestIsRealname(){
				return this.testIsRealname
			},
			istestIspassword(){
				return this.testIspassword
			}
		},
		methods:{
			...mapActions('customer',['AddCustomer']),
			telephonekeyup1(val){
				let istelephoneReg = /^\d{8,11}$/g
				this.testIsTelephone = istelephoneReg.test(val.detail.value)
				if(this.testIsTelephone){
					this.prompt = ""
				}else{
					this.prompt = "请输入8-11位数字"
				}
			},
			userNamekeyup1(val){
				// let isuserReg = /^[a-z|A-Z]{2}\d+$/
				let isuserReg = /^[a-z0-9]{3,8}$/i
				this.testIsUserName = isuserReg.test(val.detail.value)
				if(this.testIsUserName){
					this.prompt = ""
				}else{
					this.prompt = "请输入3-8位字母或数字，不区分大小写"
				}
			},
			passwordkeyup1(val){
				let isPasswordReg = [/^[a-z0-9]{5,8}$/i,/[A-Z]/,/[0-9]/]
				this.testIspassword = isPasswordReg.every(e=>e.test(val.detail.value))
				if(this.testIspassword){
					this.prompt = ""
				}else{
					this.prompt = "请输入6-10位必须由大小写字母，和数字组成的密码"
				}
			},
			formsubmit(e){ 
				if(this.formData.telephone == ""){
					this.testIsTelephone = false
					this.prompt = "电话号不能为空"
					uni.showToast({
						title:'电话号不能为空',
						icon:"none"
					})
					setTimeout(()=>{
						uni.hideToast()
						this.testIsTelephone = true
					},1200)
				}else if(this.formData.username==""){
					this.testIsUserName = false
					this.prompt = "用户名不能为空"
					uni.showToast({
						title:'用户名不能为空',
						icon:"none"
					})
					setTimeout(()=>{
						this.testIsUserName = true
						uni.hideToast()
					},1200)
				}else if(this.formData.realname==""){
					this.testIsRealname = false
					this.prompt = "姓名不能为空"
					uni.showToast({
						title:'姓名不能为空',
						icon:"none"
					})
					setTimeout(()=>{
						this.testIsRealname = true 
						uni.hideToast()
					},1200)
				}else if(this.formData.password==""){
					this.prompt = "密码不能为空"
					uni.showToast({
						title:'密码不能为空',
						icon:"none"
					})
					setTimeout(()=>{
						this.testIspassword = false 
						uni.hideToast()
					},1200)
				}else{
					this.AddCustomer(this.formData)
					.then((res)=>{
						this.active1++
					})
					.catch((res)=>{
						alert(res)
					})
				}
			},
			toLogin(){
				uni.navigateTo({
					url:"login"
				})
			}
		}
	}
</script>

<style>
	.content{
		padding-bottom: 10px;
	}
	.register_step{
		margin-top: 10px;
		background-color: #FFFFFF;
	}
	.register_step::after{
		margin-top: 10px;
		border-bottom: 1px solid #dddddd;
		display: block;
		content: "";
	}
	.isUsertelephone{
		background-color: #FFFFFF;
		margin-top: 40px;
		padding: 10px;
	}
	.title{
		font-size: 14px;
		padding: 10px;
		
	}
	.uni-input{
		border-bottom: 1px solid #dddddd;
		padding: 10px;
	}
	.uni-btn-v{
		margin-top: 10px;
		float: right;
	}
	.registerSuccess{
		border-bottom: 1px dotted #007AFF;
	}
	.registerSuccess_header>ul{
		list-style: none;
		padding:20px 0 20px 0;
		margin: 0;
		
	}
	.registerSuccess_header>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.registerSuccess_header>ul>li:first-child{
		float: left;
	}
	.registerSuccess_header>ul>li:last-child{
		margin-left: 30px;
	}
	.foot{
		font-size: 13px;
		padding: 20px;
	}
</style>

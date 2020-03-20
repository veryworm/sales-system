<template>
	<view class="content">
		<view class="register_step">
			<uni-steps :options="options1" :active="active1"></uni-steps>
		</view>
		<view v-if="active1==0||active1==1||active1==2||active1==3" class="isUsertelephone">
			<form @submit="formsubmit">
				 <view v-if="active1==0" class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="telephone" v-model="formData.telephone" placeholder="请输入您的手机号" />
				 </view>
				 <view v-if="active1==1" class="uni-form-item uni-column">
					<view class="title">用户名</view>
					<input class="uni-input" name="username" v-model="formData.username" placeholder="请输入您的用户名" />
					<view class="title">姓名</view>
					<input class="uni-input" name="realname" placeholder="请输入您的姓名" />
				 </view>
				 <view class="uni-btn-v">
					 <button form-type="submit">下一步</button>
				 </view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
	    components: {uniSteps},
		data(){
			return {
				options1:[{title: '验证手机号'}, {title: '校验用户名与姓名'}, {title: '请输入原密码'}, {title: '请输入新密码'}],
				active1:0,
				formData:{
					telephone:'',
					username:'',
					realname:'',
					password:''
				}
			}
		},
		methods:{
			formsubmit(e){
				console.log(e.detail)
				if(e.detail.value.telephone!==""){
					this.formData.telephone = e.detail.value.telephone
					this.active1++
				}else{
					alert('电话号不能为空')
				}
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
		float: left;
		font-size: 16px;
		padding: 10px;
	}
	.uni-input{
		margin-left: 70px;
		border-bottom: 1px solid #dddddd;
		padding: 10px;
	}
</style>

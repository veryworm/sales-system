<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar color="#626262"  @clickRight="setting" right-text="帮助">
				<view slot="left">
					<text @click="closeCurrentPage" style="font-size: 26px; font-weight: 550;">×</text>
				</view>
			</uni-nav-bar>
		</view>
		<view class="login_total">
			<view class="login_logo">
				<img style="position: absolute; left: 50%; top: 15%; margin-left: -75px; width: 150px; height: 100px;" src="../../static/logo.png" alt="">
			</view>
			<view class="login_message">
				<form @submit="formSubmit" @reset="formReset">
				 	<view class="uni-form-item one uni-column">
				 		<view class="form_title_city">国家/地区</view>
				 		<view class="form_title_city_tel">中国(+86) ></view>
				 	</view>
				 	<view class="uni-form-item uni-column">
				 		<input class="uni-input" name="username" placeholder="请输入用户名" />
				 	</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" name="password" password type="text" placeholder="请输入密码" />
					</view>
					<view class="form_submit">
						<button form-type="submit" style="border-radius: 25px;" type="warn">登录</button>
					</view>
					<view class="user_register">
						<text>新用户注册</text>
					</view>
				</form>
			</view>
			<view class="bottom_auth">
				<text>登录即代表您已同意 <text style="color: #007AFF;">《佳购隐私政策》</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	import { setToken, getToken, removeToken } from '../../utiles/auth.js'
	export default {
		mixins:[mixStatus],
		components: {
			uniNavBar,
			uniIndexedList
		},
		data() {
			return {
				form:{
					type:"customer"
				}
			}
		},
		methods:{
			...mapActions('user',['Login']),
			// 登录
			formSubmit(e){
				this.form.username = e.detail.value.username
				this.form.password = e.detail.value.password
				this.Login(this.form)
				.then(()=>{
					this.loginsuccess()
				})
				.catch((res)=>{
					
				})
			},
			closeCurrentPage(){
				uni.switchTab({
					url:'../my/my'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 0 15px 15px 15px;
	}
	.status_bar {
		 height: var(--status-bar-height);
		 width: 100%;
	}
	.my_header{
		width: 100%;
		padding: 5px 10px 20px 10px;
		background-image:url('../../static/obscureimg.jpg');
		// background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
	}
	.login_logo{
		width: 100%;
		height: 200px;
		// background-color: #2C405A;
		margin-bottom: 10px;
	}
	.uni-input{
		background-color: #FFFFFF;
		padding: 10px 10px 10px 0;
		border-bottom: 1px solid #F2F2F2;
	}
	.one{
		border-bottom: 1px solid #F2F2F2;
		font-size: 17px;
	}
	.form_title_city{
		float: left;
	}
	.form_title_city_tel{
		text-align: right;
	}
	.form_submit{
		width: 95%;
		margin-left: 10px;
		margin-top: 20px;
	}
	.user_register{
		margin-top: 20px;
		float: right;
		font-size: 14px;
		color: #808080;
	}
	.bottom_auth{
		position: absolute;
		bottom: 50px;
		width: 100%;
		text-align: center;
		font-size: 12px;
	}
</style>

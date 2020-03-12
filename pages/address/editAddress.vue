<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar background-color="#244147" color="#ffffff" leftIcon="back"  @clickLeft="backToAddress" :title="title1" ></uni-nav-bar>
		</view>
		<view class="my_address">
				<form class="fo" @submit="formSubmit" ref="formMessage" :model="addressmessage">
					<ul>
						<li>
							<text>收货人</text>
						</li>
						<li style="margin-left: 15px;">
							<input v-model="useLessUserName.realname" class="uni-input" placeholder="请填写收货人姓名" />
						</li>
					</ul>
					<ul>
						<li>
							<text>手机号码</text>
						</li>
						<li>
							<input class="uni-input" name="telephone" v-model="addressmessage.telephone"  placeholder="请输入收货人手机号" />
						</li>
					</ul>
					<ul>
						<li>
							<text>所在地区</text>
						</li>
						<li>
							<text class="address_one" v-if="ispickerText"  @tap="openAddres">省市区县、乡镇等</text>
							<text class="address_two" @tap="openAddres">{{pickerText}}</text>
							<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
						</li>
						<li>
							<!-- <text style="font-size: 14px;">定位</text> -->
						</li>
					</ul>
					<ul>
						<li>
							<text>详细地址</text>
						</li>
						<li>
							<view class="uni-textarea">
								<textarea v-model="addressmessage.address" @blur="bindTextAreaBlur" placeholder-style="color:#C0C0C0" placeholder="街道,楼牌号等"/>
							</view>
						</li>
					</ul>
					<ul>
						<li>
							<text>标签</text>
						</li>
						<li>
							<ul class="address_label">
								<li :class="[index == currentIndex ? 'labeltwo':'labelone']" v-for="(item,index) in addresslabel" @click="clicklabel(item,index)" :key="item.name">
									{{item.name}}
								</li>
							</ul>
						</li>
					</ul>
					{{editAddressMessage}}
					<ul class="defalut_address">
						<li>设置默认地址</li>
						<li>提醒：每次下单会默认推荐使用该地址</li>
						<li><switch @change="switch1Change" /></li>
					</ul>
					<view class="submit_address_message">
						<button form-type="submit" style="font-size: 14px; border-radius: 25px;" type="warn">保存</button>
					</view>
				</form>
		</view>
	</view>
</template>

<script>
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { setToken, getToken, removeToken } from '../../utiles/auth.js'
	export default {
		components: {
		    simpleAddress,
			uniNavBar
		},
		data() {
			return {
				addressmessage:{
					telephone:'',
					province:'',
					city:'',
					area:'',
					address:'',
					telephone:''
				},
				useLessUserName:{
					realname:''
				},
				editAddressMessage:[],
				addresslabel:[{name:'家'},{name:'公司'},{name:'学校'}],
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				currentIndex:''
			}
		},
		computed:{
			...mapState("user",["info"]),
			ispickerText(){
				return this.pickerText == '' ? true:false
			},
			title1(){
				return this.editAddressMessage.length == 0 ? '新增收货地址' : '编辑收货地址'
			}
		},
		created() {
			let token = getToken()
			if(token){
				this.info1(token)
			}else{
				uni.showToast({
					title:"token失效,请重新登录",
					icon:'none'
				})
				setTimeout(()=>{
					uni.hideToast()
				},1000)
			}
		},
		onLoad(value) {
			if(value.val== "新增地址"){
				this.isAdd(value.val)
			}else{
				this.editAddressMessage = [JSON.parse(value.val)]
			}
		},
		mounted() {
			
		},
		methods:{
			...mapActions('user',['info1']),
			// 与picker省市区双向数据绑定
			bindTextAreaBlur(e){
				this.addressmessage.province = e.detail.value
			},
			// 打开picker选省市区
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			// picker选省市区确认按钮
			onConfirm(e) {
				this.addressmessage.province = e.label.province
				this.addressmessage.city = e.label.city
				this.addressmessage.area = e.label.area
				this.addressmessage.address = e.label.address
				this.pickerText = e.label.address
			},
			// 选地址所属规划
			clicklabel(item,index){
				console.log(index)
				this.currentIndex = index
			},
			// 地址是否默认选择
			switch1Change(e){
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			// 提交表单
			formSubmit(e){
				// 新增
				if(this.editAddressMessage.length == 0){
					
				}else{
					// 修改
					this.addressmessage.id = this.editAddressMessage[0].id
					this.addressmessage.customerId = this.info.id
					let value = Object.assign(this.addressmessage,e.detail.value)
				}
			},
			// 判断当前是修改还是新增，如果是新增，输入框的值为当前传的值
			isAdd(val){
				if( val== '新增地址' ){
					this.useLessUserName.realname = ''
					this.addressmessage.telephone = ''
				}else{
					this.useLessUserName.realname = editAddressMessage[0].realname
					this.addressmessage.telephone = editAddressMessage[0].telephone
				}
			},
			// 返回上页
			backToAddress(){
				uni.navigateTo({
					url:'../my/myAccount'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 0 10px 10px 0px;
	}
	.my_address ul{
		list-style: none;
		margin: 0;
		padding: 0;
		margin-bottom: 10px;
		border-bottom: 1px solid #F2F2F2;
	}
	.my_address ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_address ul>li{
		float: left;
		padding: 10px;
	}
	.my_address ul>li:nth-child(1){
		font-size: 14px;
		margin-right: 15px;
	}
	.uni-input{
		font-size: 14px;
		color: #C0C0C0;
	}
	.address_one{
		color: #C0C0C0;
		font-size: 14px;
	}
	.address_two{
		font-weight: 550;
		font-size: 14px;
	}
	ul.address_label{
		border-bottom: none;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul.address_label::after{
		content: "";
		display: block;
		clear: both;
	}
	ul.address_label>li{
		float: left;
		font-size: 14px;
		margin-left: 10px;
		padding: 2px 20px 2px 20px;
	}
	.labelone{
		border: 1px solid #e5e5e5;
		border-radius: 15px;
	}
	.labeltwo{
		border: 1px solid #e5e5e5;
		border-radius: 15px;
		background-color: #007AFF;
		color: #FFFFFF;
	}
	.submit_address_message{
		width: 200px;
		position: absolute;
		bottom: 10px;
		left: 50%;
		margin-left: -100px;
	}
	ul.defalut_address>li:nth-child(2){
		clear: left;
		font-size: 12px;
	}
	ul.defalut_address>li:nth-child(3){
		float: right;
	}
</style>

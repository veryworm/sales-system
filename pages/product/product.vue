<template>
	<view style="background-color: #F2F2F2;">
	<view v-for="itemss in productvalue" :key="itemss.id" >
		<view v-for="items in productvalue" :key="items.id" class="product_total">
			<view class="product_header">
				<img  style="width:705upx; height: 750upx;" :src="items.photo" alt="">
			</view>
			<view class="product_header">
				<text style="font-size: 30px; color: #fa240c;">¥{{items.price}}</text>
			</view>
			<view class="product_header">
				<text style="font-size: 16px; font-weight: 400;">{{items.name}}  {{items.description}}</text>
			</view>
		</view>
		<view style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;" class="product_header">
			<view class="address_To">
				<text>送至</text>
			</view>
			<view class="my_address">
				清徐县
			</view>
		</view>
		<view class="description">
			<view class="description_title">
				评价 
			</view>
			<view class="description_content">
				清徐县
			</view>
		</view>
		<view class="bottom_navBar">
				 <button @click="JoinTheCar(itemss)" style="width: 130px;  float: left; margin-left: 20%;margin-right: 10px;" type="primary">加入购物车</button>
				 <button @click="GoShop" style="width: 130px; margin-left: 10px;" type="warn">立即购买</button>
		</view>
	</view>
		<!-- 加入购入车弹框 -->
		<uniPopup ref="popup" type="bottom">
			<view class="popup_Total" v-for="item in productvalue" :key="item.id">
				<view class="popup_img">
					<img style="width: 100px; height: 100px;" :src="item.photo" alt="">
				</view>
				<view style="margin-top: 55px;">
					<text style=" font-size: 20px;">¥{{item.price}}</text>
				</view>
				<!-- 选择数量 -->
				<view style="margin-top: 20px;padding:10px;">
					<view class="popup_img">
						<text>数量</text>
					</view>
					<view class="popup_numberHandler"> 
						<uni-number-box  :min="0"  @change="changeValue"></uni-number-box>
					</view> 
				</view>
				<view class="popup_confirm">
					 <button @click="submitSendmixData" style="border-radius: 25px " type="warn">确定</button>
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import { mixStatus } from '../../store/modules/mix.js'
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		mixins:[mixStatus],
		components: {uniPopup,uniNumberBox},
		data() {
			return {
				productvalue:[],
				sendOn:false,
				assignData:{}
			}
		},
		onLoad(value) {
			this.productvalue = [JSON.parse(value.val)]
		},
		computed:{
			...mapGetters ('shopcar',['total'])
		},
		methods: {
			...mapMutations('shopcar',['addShopCar']),
			// 加入购物车
			JoinTheCar(item){
				this.$refs.popup.open()
			},
			GoShop(){
				
			},
			// 改变数量
			changeValue(val){
				this.productvalue[0].number = val
			},
			submitSendmixData(){
				let newarr = Object.assign(...this.productvalue)
				let orderLine = {
					productId:newarr.id,
					productName:newarr.name,
					price:newarr.price,
					number:newarr.number,
					photo:newarr.photo,
					checkone:newarr.checkone
				}
				this.addShopCar(orderLine)
				uni.showToast({
				    title: '添加成功',
				    duration: 2000
				});
				setTimeout(()=>{
					uni.hideToast()
				},1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product_total{}
	.product_header{
		background-color: #FFFFFF;
		padding-left: 10px;
		
	}
	.address_To{
		float: left;
		width: 15%;
		height: 20px;
		padding: 10px 10px 15px 10px;
	}
	.my_address{
		height: 20px;
		padding: 10px 10px 15px 10px;
		border-bottom: 1px solid #ededed;
	}
	.description{
		margin-top:10px;
		padding-left: 10px;
		border-bottom: 1px solid #ededed;
		border-radius: 10px;
		padding:10px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
	}
	.description_title{
		background-color: #FFFFFF;
		padding: 10px 16px 5px 10px;
		font-size: 22px;
		font-weight: 350;
		border-bottom: 1px solid #ededed
	}
	.description_content{
		padding-top: 10px;
	}
	.bottom_navBar{
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 1;
		background-color: #ededed;
	}
	.popup_Total{
		background-color: #FFFFFF;
		padding:10px;
	}
	.popup_Total::after{
		content: "";
		display: block;
		clear: both;
	}
	.popup_img{
		float: left;
		width: 30%;
	}
	.popup_numberHandler{
		float: right;
	}
	
</style>

<template>
	<view class="content">
		<view v-if="info.id!==undefined" class="islogin">
			<view class="body_content">
				<view class="card_content">
					<ul v-for="item in orderLines.values()" :key="item.productId"  class="card_logo">
						<li>
							<img style="width: 100%;height: 100%;border-radius: 10px;" :src="item.photo" alt="">
						</li>
						<li>
							<text style="font-weight:550;">{{item.productName}}</text>
						</li>
						<li>
							<text>￥{{item.price}}</text>
						</li>
						<li style="text-align: right;">
							<text>× {{item.number}} 件</text>
						</li>
					</ul>
				</view> 
				<!-- 选择商品 -->
				<view class="uni-list">
					<view @click="lop" class="choice_goods">
						选取您喜欢的商品哦
					</view>
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(itemss,indexx) in orderLines.values()" :key="itemss.productName">
							<checkbox :value="itemss.productName" :key="itemss.productName" :checked="itemss.checked" />
							<text style="font-size: 13px; font-weight:550;">{{itemss.productName}}</text></br>
						</label>
					</checkbox-group>
				</view>
			</view>
			<!-- 选取商品价格总额，结算 -->
			<view class="confirm_order">
				<view class="order_total">
					合计	:¥ <text>{{total3 ? total3 : '0'}}.00</text>
				</view>
				<view class="order_confirm">
					<button :disabled="selectData.length==0" @click="ToComputePrice" class="mini-btn" type="warn" size="mini">去结算({{selectData.length}})</button>
				</view>
			</view>
		</view>
		<view v-else class="notLogin">
			<p @click="toLoginPage" style="width: 200px; height: 15px; position: absolute; left: 50%; margin-left: -45px; top: 40%; margin-top: -15px; color: #151515;">未登录,去登录?</p>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	export default {
		mixins:[mixStatus],
		data() {
			return {
				selectData:[]
			}
		},
		computed:{
			...mapState('shopcar',['orderLines','orderLines2']),
			...mapGetters('product',['productFilter']),
			...mapGetters('shopcar',['total','total2','total3']),
			...mapState('user',['info'])
		}, 
		created() { 
			this.allrefreshtoken()
			this.isLoginUser()
		},
		methods: {
			...mapMutations('shopcar',['TobuyShop','selectGoodsTotal']),
			lop(){
				uni.navigateTo({
					url:'../order/orderSuccess'
				})
			},
			checkboxChange(e){
				let arr = Array.from(this.orderLines.values())
				this.selectData = e.detail.value
				let result = 0
				// 先把选中的数据带到确认订单
				if(e.detail.value.length!==0){
					let result = 0
					for( let i=0; i<e.detail.value.length; i++) {
						const item = arr[i]
						if(e.detail.value.includes(item.productName)){
							let orderLine2 = {
								productId:item.productId,  //id
								productName:item.productName,
								price:item.price,
								number:item.number,
								photo:item.photo
							} 	
							this.TobuyShop(orderLine2)
						}
					} 
				}
				// 对所选取的商品的价格进行计算
				if(e.detail.value.length!==0){
					e.detail.value.forEach((item)=>{
						let newarr = arr.filter((item2)=>{
							return item2.productName == item
						})
						for(let i=0;i<newarr.length;i++){
							result += newarr[i].number * newarr[i].price
						}
						// this.totalprice = result
						this.selectGoodsTotal(result)
					})
				}
			},
			// 跳转下单页面
			ToComputePrice(){
				uni.navigateTo({
					url:'../order/order'
				})
			},
			isLoginUser(){
				if(this.info.id == undefined){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
				}
			},
			toLoginPage(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	.content{
		background-color: #f2f2f2;
		padding: 5px 0 20px 0 ;
		
	}
	.uni-list{
		padding:0 0 10px 10px;
		font-weight: 400;
	}
	.body_content{
		margin-top: 15px;
		padding-top: 5px;
		margin-left: 4%;
		width: 92%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-bottom: 10px;
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
		border-bottom: 1px solid #EDEDED;
		font-weight: 400;
	}
	.card_logo>li{
		display: inline-block;
		padding-left: 10px;
		padding-bottom: 10px;
	}
	.card_logo>li:nth-child(1){
		height: 80px;
		width: 26%;
		float: left;
		border-radius: 10px;
	}
	.card_logo>li:nth-child(2){
		height: 20px;
	}
	.card_logo::after{
		content: '';
		display: block;
		clear: both;
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
		padding-top: 5px;
		float: right;
	}
	.confirm_order{
		background-color: #ededed;
		padding: 10px;
		position: fixed;
		width:95%;
		bottom: 50px;
	}
	.order_total{
		float: left;
		padding-left: 20px;
	}
	.order_confirm{
		float: right;
	}
	.sele{
		border: 1px solid black;
		width: 15px;
		height: 15px;
	}
	.choice_goods{
		width: 96%;
		border-radius: 5px;
		background-color: #eeeeee;
		font-size: 14px;
		color: #F3270C;
		text-align: center;
		padding: 5px;
		font-weight: bolder;
	}
	.notLogin{
		width: 100%;
		height: 520px;
	}
</style>

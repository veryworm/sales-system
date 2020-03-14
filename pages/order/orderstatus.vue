<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar  @clickLeft="backbeforepage" @clickRight="searchOrder" left-icon="back" left-text="返回" right-icon="search" title="我的订单"></uni-nav-bar>
		</view>
			<view style="background-color: #FFFFFF;	">
				<uni-segmented-control
				 :current="current" 
				 :orderstatus="orderstatus"
				 :values="items" 
				 @clickItem="onClickItem" 
				 style-type="text" 
				 active-color="#ff0000">
				 </uni-segmented-control>
			</view>
		<view class="order_status_sort">
			<view v-if="current==0||current ==1 || current ==2 || current ==3 || current ==4" class="waiting_confirm">
			 	<view v-for="item in currentCustomerOrder && current == 4? currentAllOrder : currentCustomerOrder" :key="item.id" class="total_order">
			 		<view class="order_one_header">
						<view v-if="item.status !== '已完成' && item.status !== '待服务'" class="order_detail">
							<ul>
								<li>
									<text>正在出库</text>
								</li>
								<li>
									<img style="width: 14px; height: 14px; margin-right: 6px;" src="../../static/frieghtcar.png" alt="">
									您的订单已进入第三方卖家车库，准备出库 </br>
									<text style="color: #808080; font-size: 13px;">
										{{item.orderTime | datefmt}}
									 </text>
								 </li>
							</ul>
						</view>
						<ul>
							<li><img src="../../static/goods_logo.png" alt=""></li>
							<li>名字></li>
							<li><img src="../../static/trash2.png" alt=""></li>
							<li>{{item.status}}</li>
						</ul>
					</view>
					<view class="product_totalMessage">
						<ul>
							<li>图</li>
							<li>{{item.id}}</li>
							<li>{{item.orderTime | datefmt}}</li>
							<li>名字</li>
							<li>¥{{item.total}}</li>
							<li><button v-if="item.status=='待服务'" @click="gotGoods(item.id)" class="mini-btn" size="mini">确认收货</button></li>
						</ul>
					</view>
			 	</view>
			 </view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	export default{	
		mixins:[mixStatus],
		components: {
			uniSegmentedControl,
			uniNavBar
		},
		data(){
			return{
				orderstatus:0,
				items: ['待派单','待确认','已完成','待评价','全部订单'],
				current: 0
			}
		},
		onLoad(index) {
			this.orderstatus = index.index
		},
		computed:{
			...mapState('order',['currentCustomerOrder','currentAllOrder'])
		},
		created() {
			this.loadIndex()
			this.allrefreshtoken()
			this.findAllOrder('待派单')
		},
		methods:{
			...mapActions('order',['findAllOrder','confirmOrderes']),
			// 让传来的数值变为number，否则传值错误 2.刚加载页面默认让currentIndex为0
			loadIndex(){
				let index = Number(this.orderstatus)
				this.current = index
				if(this.orderstatus == undefined){
					this.current = 0
				}
			},
			onClickItem(e) {
				let status;
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(e.currentIndex == 0){
					status = '待派单'
					this.findAllOrder(status)
				}else if(e.currentIndex == 1){
					status = '待服务'
					this.findAllOrder(status)
				}else if(e.currentIndex == 2){
					status = '已完成'
					this.findAllOrder(status)
				}else if(e.currentIndex == 3){
					status = '待评价'
					this.findAllOrder(status)
				}else{
					this.findAllOrder()
				}
			},
			backbeforepage(){
				uni.switchTab({
					url:'../my/my'
				})
			},
			// 搜索订单
			searchOrder(){
				uni.navigateTo({
					url:'./searchorder'
				})
			},
			// 确认收货
			gotGoods(id){
				this.confirmOrderes(id)
				.then(()=>{
					this.findAllOrder('待服务')
					uni.showToast({
						title:'确认成功'
					})
					setTimeout(()=>{
						uni.hideToast()
					},1300)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
		height:100%;
		padding-bottom: 10px;
		overflow:hidden
	}
	.order_status_sort{
		background-color: #ffffff;
		border-radius: 10px;
		
	}
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	}
	.total_order{
		margin-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f2f2f2;
	}
	.waiting_confirm{
		padding: 0 10px 10px 10px;
		margin-top: 10px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.order_detail{
		line-height: 2em;
		// background-color: #EDEDED;
		padding: 10px;
		margin-top: 5px;
	}
	.order_detail>ul>li:first-child{
		text-align: center;
		font-size: 14px;
		color: red;
	}
	.order_detail>ul>li:nth-child(2){
		padding: 8px;
		font-size: 13px;
		border-radius: 10px;
		box-shadow: 5px 8px 15px #dddddd;
	}
	.order_one_header{
		line-height: 1.7em;
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.order_one_header>ul>li{
		float: left;
		font-size: 14px;
		
	}
	.order_one_header>ul>li:nth-child(2){
		margin-left: 5px;
		font-weight: 550;
	}
	.order_one_header>ul>li:nth-child(4){
		float: right;
		margin-right: 15px;
	}
	.order_one_header>ul>li:nth-child(3){
		float: right;
	}
	.product_totalMessage>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.product_totalMessage>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.product_totalMessage>ul>li{
		font-size: 14px;
	}
	.product_totalMessage>ul>li:nth-child(1){
		width: 25%;
		background-color: #007AFF;
		height: 70px;
		border-radius: 10px;
		float: left;
	}
	.product_totalMessage>ul>li:nth-child(2){
		float: left;
		margin-left: 10px;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(3){
		text-align: right;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(4){
		font-size: 14px;
		float: left;
		margin-left: 10px;
	}
	.product_totalMessage>ul>li:nth-child(5){
		float: right;
		font-size: 17px;
	}
	.product_totalMessage>ul>li:nth-child(6){
		clear: both;
		float: right;
	}
	.mini-btn{
		border-radius: 25px;
		color:#ff5500 ;
		border: 1px solid #ff5500;
	}
</style>

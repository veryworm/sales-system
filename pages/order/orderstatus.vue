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
			<view v-if="current==0||current ==1 || current ==2 || current ==4" class="waiting_confirm">
			 	<view v-for="item in currentCustomerOrder" :key="item.id" class="total_order">
			 		<view class="order_one_header">
						<view v-if="item.status !== '已完成' && item.status !== '待确认' && item.status !== '待评价'" class="order_detail">
							<ul>
								<li>
									<text>正在出库</text>
								</li>
								<li>
									<img  style="width: 14px; height: 14px; margin-right: 6px;" src="../../static/frieghtcar.png" alt="">
									您的订单已进入第三方卖家车库，准备出库 </br>
									<text style="color: #808080; font-size: 13px;">
										{{item.orderTime | datefmt}}
									 </text>
								 </li>
							</ul>
						</view>
						<ul>
							<li><img src="../../static/goods_logo.png" alt=""></li>
							<li></li>
							<li></li>
							<li>{{item.status}}</li>
						</ul>
					</view>
					<view class="product_totalMessage">
						<ul>
							<li><img style="width: 90px; height: 70px;" :src="item.photo?item.photo : '../../static/loadfailed.gif'" alt=""></li>
							<li>{{item.id}}</li>
							<li>{{item.orderTime | datefmt}}</li>
							<li>名字</li>
							<li>¥{{item.total}}</li>
							<li><button v-if="item.status=='待确认'" @click="gotGoods(item.id)" class="mini-btn" size="mini">确认收货</button></li>
						</ul>
					</view>
			 	</view>
			 </view>
			 <!-- 评价栏目 -->
			 <view v-if="current== 3" class="order_commont">
				 <view class="comment_total">
				 	<view class="comment_header">
				 		<ul>
				 			<li :style="{ fontWeight:index == commentIndex ? 'bolder' : '' }" @click="iscommentIndex(currentCustomerOrder[0].status=='已完成' ? currentCustomerOrder : currentCustomerOrder ,index)" :class="[index==commentIndex ? 'st':'']" v-for=" (myitem,index) in ordercommentItem" :key="myitem">
								{{myitem}}
							</li>
				 		</ul>
				 	</view>
					<!-- 待评价里面的全部评价和已评价 -->
					<view style="margin-top: 10px;" v-for="(myitem1,index) in refreshCommentOfVoidData" :key="myitem1.orderTime" v-if="commentIndex==0">
						<ul class="orderdescription">
							<li>
								<img style="width: 80px; height: 80px; border-radius: 10px;" :src="myitem1.photo==null ? '../../static/loadfailed.gif': myitem1.photo" alt="">
							</li>
							<li>单号:{{myitem1.id}}</li>
							<li>
								<button :disabled="myitem1.iscontent == true?true:false" :class="[myitem1.iscontent==true?'description_style1':'description_style']"  size="mini" @click="description(myitem1)">{{myitem1.iscontent==true?'已评价':'去评价'}}</button>
							</li>
						</ul>
					</view>
					<view v-for="myitem2 in HaveComment.length !==0 ? HaveComment : []" :key="myitem2.orderId"  style="margin-top: 10px;">
						<ul v-if="commentIndex==1" class="orderdescription1">
							<li>
								<img style="width: 60px; height: 60px; border-radius: 10px;" src="../../static/loadfailed.gif" alt="">
							</li>
							<li>{{myitem2.id}}</li>
							<li style="font-weight: bolder; font-size: 20px;" @click="lookmore()">...</li>
							<li>
								<p style="float: left; line-height: .3em;">评分</p>
								<uni-rate size="16" active-color="#f40e30" margin="6" color="#9c9c9c" value="2"></uni-rate>
							</li>
							 <li><text>{{myitem2.content == undefined ? '您还没有评价商品' : myitem2.content }}</text></li>
							 <view class="comment_button">
								<button class="description_style" type="primary" size="mini" @click="savedescription(myitem2)">追加评价</button>
							 </view>
						</ul>
					</view>
				 </view>
			 </view>
		</view>
		<view style="text-align: center; margin-top: 20px;">
			<img style="width: 50px; height: 50px; "  src="../../static/bear.png" alt="">
			<p style="font-size: 12px; color: #bfbfbf;">没有更多啦~</p>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	export default{	
		mixins:[mixStatus],
		components: {
			uniSegmentedControl,
			uniNavBar,
			uniRate 
		},
		data(){
			return{
				orderstatus:0,
				items: ['待派单','待确认','已完成','待评价','全部订单'],
				current: 0,
				ordercommentItem:['全部评价','已评价'],
				commentIndex:0
			}
		},
		onLoad(val) {
			if(val.item!==undefined && val.item!==null &&val.item!==""){
				let newval = JSON.parse(val.item)
				this.orderstatus = newval.index
				this.findAllOrder(newval.name)
			}
		},
		computed:{
			...mapState('order',['currentCustomerOrder','refreshCommentOfVoidData','HaveComment'])
		},
		created() {
			this.loadIndex()
			this.allrefreshtoken()
			this.findAllOrder('待派单')
		},
		methods:{
			...mapActions('order',['findAllOrder','confirmOrderes','findAllComments']),
			...mapMutations('order',['compareNotOrYesContent']),
			// 让传来的数值变为number，否则传值错误 2.刚加载页面默认让currentIndex为0
			loadIndex(){
				let index = Number(this.orderstatus)
				this.current = index
				if(this.orderstatus == undefined){
					this.current = 0
				}
			},
			// 点击订单每一项加载数据
			onClickItem(e) {
				let status;
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(e.currentIndex == 0){
					status = '待派单'
					this.findAllOrder(status)
					
				}else if(e.currentIndex == 1){
					status = '待确认'
					this.findAllOrder(status)
				}else if(e.currentIndex == 2){
					status = '已完成'
					this.findAllOrder(status)
				}else if(e.currentIndex == 3){
					status = '已完成'
					this.findAllOrder(status)
				}else{
					this.findAllOrder()
				}
			},
			// 返回
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
					this.findAllOrder("待服务")
					uni.showToast({
						title:'确认成功'
					})
					setTimeout(()=>{
						uni.hideToast()
					},1300)
				})
			},
			// 待评价下面的两个节点
			iscommentIndex(myitem,index){
				this.commentIndex = index
				if(index==0){
					this.findAllComments(myitem)
				}else{
					// 这里把已完成的订单项传过去
					this.findAllComments(myitem)
				}
			},
			// 评价
			description(myitem1){
				uni.navigateTo({
					url:'./ordercomment/ordercomment?item='+JSON.stringify(myitem1)
				})
			},
			// 追评
			savedescription(myitem2){
				uni.navigateTo({
					url:'./ordercomment/ordercomment?item='+JSON.stringify(myitem2)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
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
	.comment_total{
		padding: 10px;
		// line-height: 1.5em;
	}
	.order_commont{
		margin-top: 10px;
	}
	.comment_header>ul>li{
		width: 50%;
		float: left;
		text-align: center;
		font-size: 14px;
	}
	.comment_header>ul>li:last-child{
		width: 50%;
	}
	.st::after{
		content:"___";
		font-weight: bolder;
		color: red;
		display: block;
		clear: both;
	}
	.description_style{
		border: 1px solid #FF0000;
		background-color: #FFFFFF;
		border-radius: 20px;
		color: #FF0000;
	}
	.description_style1{
		border: 1px solid #c2c2c2;
		color: #FFFFFF;
		background-color: #FFFFFF;
		border-radius: 20px;
	}
	.orderdescription{
		margin-top: 15px;
		font-size: 14px;
	}
	
	.orderdescription>li:nth-child(1){
		float: left;
		width: 80px;
		height: 80px;
		border-radius: 10px;
	}
	.orderdescription>li:nth-child(2){
		margin-left: 90px;
	}
	.orderdescription>li:nth-child(3){
		float: right;
		padding-top: 30px;
	}
	
	.orderdescription1{
		font-size: 13px;
	}
	.orderdescription1>li:nth-child(1){
		width: 60px;
		height: 60px;
		border-radius: 10px;
		float: left;
	}
	.orderdescription1>li:nth-child(2){
		color: #969696;
		float: left;
		margin-left: 10px;
	}
	.orderdescription1>li:nth-child(3){
		color: #969696;
		text-align: right;
	}
	.orderdescription1>li:nth-child(4){
		margin-left: 70px;
		margin: 10px 0 30px 70px;
	}
	.orderdescription1>li:nth-child(5){
	}
	.comment_button{
		text-align: right;
	}
</style>

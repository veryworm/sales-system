<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<uni-nav-bar  @clickLeft="backbeforepage" @clickRight="submitComment" left-icon="back" right-text="提交" color="#fd0b58"></uni-nav-bar>
		</view>
		<view class="order_commont_total">
			<ul v-for="item in orderItem.length==0?orderItem1:orderItem" :key="item.id">
				<li>
					<img style="width: 60px; height: 60px; border-radius: 10px;" src="../../../static/loadfailed.gif" alt="">
				</li>
				<li>商品评价</li>
				<li>订单号:{{item.id}}</li>
				<li><uni-rate size="22" active-color="#f40e30" margin="6"  color="#9c9c9c" value="2"></uni-rate></li>
				<li>非常好</li>
			</ul>
		</view>
		<view class="comment_wrapper">
			<view class="comment_header">
				<view class="header_style">评价官</view>
			</view>
			<view class="commont_textarea">
				<textarea v-model="CommentForm.content" @blur="bindTextAreaBlur" placeholder-style="color:#C0C0C0" placeholder="请留下您的评价"/>
			</view>
		</view>
		<view v-if="orderItem1.length == 0" class="comment_takeYouStar">
			<view class="comment_price">
				<ul>
					<li>
						<img  style="width: 14px; height: 14px; margin-right: 6px;" src="./frieghtcar.png" alt="">
					</li>
					<li>物流服务评价</li>
					<li>满意请给5星哦</li>
				</ul>
			</view>
			<view class="comment_star">
				<ul>
					<li>商品符合度</li>
					<li><uni-rate size="22" active-color="#f40e30" margin="6"  color="#9c9c9c" value="2"></uni-rate></li>
					<li>快递配送速度</li>
					<li><uni-rate size="22" active-color="#f40e30" margin="6"  color="#9c9c9c" value="2"></uni-rate></li>
					<li>快递员服务</li>
					<li><uni-rate size="22" active-color="#f40e30" margin="6"  color="#9c9c9c" value="2"></uni-rate></li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		components: {
			uniNavBar,
			uniRate 
		},
		data() {
			return {
				orderItem:[],
				orderItem1:[],
				CommentForm:{
					content:'',
					orderId:'',
					commentTime:''
					
				}
			}
		},
		onLoad(val) {
			let newval = [JSON.parse(val.item)]
			if(newval[0].content !== undefined){
				// 如果评价不为空，要追加评价
				this.orderItem1 = newval
			}else{
				this.orderItem = newval
			}
		},
		methods:{
			...mapActions('order',['addOrEditComment']),
			backbeforepage(){
				uni.navigateTo({
					url:'../orderstatus'
				})
			},
			submitComment(){
				this.CommentForm.commentTime = Date.parse(new Date())
				if(this.orderItem1.length !==0){
					this.CommentForm.id = this.orderItem1[0].id
					this.CommentForm.orderId = this.orderItem1[0].orderId
					this.addOrEditComment(this.CommentForm)
					.then(()=>{
						uni.showToast({
							title:'评价成功'
						})
						setTimeout(()=>{
							uni.hideToast()
							uni.navigateTo({
								url:'../orderstatus'
							})
						},1400)
					})
					.catch((res)=>{
						console.log(res)
					})
				}else{
					this.CommentForm.orderId = this.orderItem[0].id
					this.addOrEditComment(this.CommentForm)
					.then(()=>{
						uni.showToast({
							title:'评价成功'
						})
						setTimeout(()=>{
							uni.hideToast()
							uni.navigateTo({
								url:'../orderstatus'
							})
						},1400)
					})
					.catch((res)=>{
						console.log(res)
					})
				}
			},
			bindTextAreaBlur(e){
				this.CommentForm.content = e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
		padding-bottom: 10px;
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 10px;
		background-color: #FFFFFF;
		border-right-radius: 10px;
		border-left-radius: 10px;
	}
	ul::after{
		content: "";
		display: block;
		clear: both;
	}
	
	.order_commont_total>ul>li{
		font-size: 14px;
	}
	.order_commont_total>ul>li:nth-child(1){
		width: 55px;
		height: 55px;
		border-radius: 10px;
		float: left;
	}
	.order_commont_total>ul>li:nth-child(2){
		margin-left: 75px;
		font-weight: 550;
	}
	.order_commont_total>ul>li:nth-child(3){
		margin-left: 75px;
		font-weight: 550;
		font-size: 12px;
	}
	.order_commont_total>ul>li:nth-child(4){
		margin-top: 20px;
		margin-left: 15px;
		float: left;
		color: #969696;
		font-size: 14px;
	}
	.order_commont_total>ul>li:nth-child(5){
		color: #969696;
		font-size: 12px;
		margin-left: 220px;
		margin-top: 15px;
	}
	.comment_wrapper{
		padding-left: 10px;
		margin-top: 10px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.header_style{
		width: 30px;
		font-size: 10px;
		padding: 3px;
		color: #FFFFFF;
		border-radius: 3px;
		background-color: #ff4f1a;
	}
	.comment_header{
		border-top-right-radius: 10px;
		background: linear-gradient(to right, white , #ecdede);
		padding:5px 0 5px 10px;
	}
	.commont_textarea{
		padding: 10px;
	}
	.comment_takeYouStar{
		margin-top: 10px;
		border-radius: 10px;
	}
	.comment_price{
		// border-radius: 10px;
	}
	.comment_price>ul>li{
		float: left;
	}
	.comment_price>ul>li:nth-child(2){
		font-size: 14px;
		line-height: 2em;
	}
	.comment_price>ul>li:last-child{
		float: right;
		font-size: 12px;
		color: #969696;
		line-height: 2.5em;
	}
	.comment_star>ul>li{
		font-size: 14px;
		margin-left: 20px;
	}
	.comment_star>ul>li:nth-child(3),.comment_star>ul>li:nth-child(4),.comment_star>ul>li:nth-child(5),.comment_star>ul>li:nth-child(6){
		margin-top: 30px;
	}
	.comment_star>ul>li:nth-child(1),.comment_star>ul>li:nth-child(3),.comment_star>ul>li:nth-child(5){
		float: left;
		line-height:.2em ;
		margin-right: 10px;
		
	}
	.comment_star>ul>li:nth-child(1),.comment_star>ul>li:nth-child(5){
		margin-right: 25px;
	}
	
</style>

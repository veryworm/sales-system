
<template>
	<view>
		<view class="body_content">
			<view class="card_header">
				<view class="xiahua">
					  <h4 class="h41"></h4>
					  <h4 class="h4">水果商城</h4>
				</view>
			</view>
			<view class="card_content">
				<ul class="card_logo">
					<li @click="skipGoodsAllHandler(item,index)" v-for="(item,index) in categoryData" :key="item.id">
						<view class="img">
							<img :src="item.photo" alt="">
						</view>
						<view>{{item.name}}</view>
					</li>
					<li @click="con1">
						<view style="background-color: #00e097;" class="img">
							<img style="width: 20px; height: 20px; padding:10px 0 0 10px; border-radius: unset;" src="../../static/all_fruit.png" alt="">
						</view>
						<view>全部水果</view>
					</li>
				</ul>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			categoryData:{
				type: Array,
				default (){
					return ['加载中..']
				}
			}
		},
		watch:{
			categoryData(){
				
			}
		},
		methods:{
			skipGoodsAllHandler(item,index){
				// uni.showLoading({
				//     title: '加载中'
				// });
				uni.navigateTo({
				    url: '../../pages/good_all_function/good_all_function?item='+ JSON.stringify(item)
				})
				// setTimeout(function () {
				// 	uni.navigateTo({
				// 	    url: '../../pages/good_all_function/good_all_function?item='+ JSON.stringify(item)
				// 	})
				//     uni.hideLoading();
				// }, 2000);
				
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style>
	/* 卡片 */
	.body_content{ 
		margin-left: 4%;
		height: 100%;
		width: 92%;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.xiahua{
		margin-left: 4%;
		border-bottom: 1px solid #f2f4f3;
	}  
	.card_header{
		padding-right: 10px;
	}
	h4{
		display: inline-block;
		line-height: 1.9rem;
	}
	.h41{
		background-color: #000000;
		padding-top: 1rpx;
		width: .1em;
		height: 11px;
		line-height: 1em;
	}
	.h4{
		padding-left: 3%;
		font-size: 14px;
	}
	.card_content{
		border-radius: 10px;
		background-color: #FFFFFF;
		padding: .4rem .2rem .5rem .2rem;
		box-sizing: content-box;
		font-size: 12px;
	}
	.card_logo{
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		color: #0a1019;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-weight: 500;
	}
	.card_logo>li{
		background-color: #FFFFFF;
		width: 24%;
		border: 1px solid #FFFFFF;
		text-align: center;
		display: inline-block;
	}
	.img{
		padding-top: 35%;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		width:86rpx;
		height: 30rpx;
		border-radius: 50%;
		position: relative;
	} 
	.img>img{
		position: absolute; 
		left: 50%; 
		top: 50%; 
		margin-top: -20px; 
		margin-left:-20px;
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
</style>
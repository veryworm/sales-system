
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
						<view class="img">
							<text>{{item.name}}</text>
						</view>
					</li>
					<!-- <li @click="con1">
						<view style="background-color: #00e097;">
							<img  alt="">
						</view>
						<view>{{categoryData.length}}</view>
					</li> -->
				</ul>
			</view> 
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				test:{}
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
		computed:{
			
		},
		watch:{
			categoryData:{
				immediate:true,
				deep:true,
				handler(val){
					console.log('22')
					this.categoryData = val
				}
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
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style>
	/* 卡片 */
	.body_content{ 
		width: 92%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin:20px 0 10px 15px;
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
		/* padding: 0 .2rem .5rem .2rem; */
		font-size: 12px;
	}
	.card_logo{
		list-style: none;
		color: #0a1019;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-weight: 500;
		/* padding-bottom: 15px; */
		text-align: center;
		margin: 0;
		padding: 0;
	}
	ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.card_logo>li{
		background-color: #FFFFFF;
		border: 1px solid #FFFFFF;
		margin-top: 20px;
		float: left;
		padding: 10px;
	}
	.img>img{
		border-radius: 50%;
		width: 50px;
		height: 50px;
	}
</style>
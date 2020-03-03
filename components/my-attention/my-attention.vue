
<template>
	<view>
		<view class="body_content">
			<view class="card_header">
				<view class="xiahua">
					  <h4 class="h41"></h4>
					  <h4 class="h4">我的关注</h4>
					  <h4 style="float: right; font-size: 12px; font-weight:400;">
						  发现更多频道
						  <h4 style=" padding: 3px; vertical-align: middle; margin-left: 10px; background-color: #ef2b2c;  border-radius: 50%;">
							  <img style="float: right;" src="../../static/right.png" alt="">
						  </h4>
					  </h4>
				</view>
			</view>
			<view class="card_content">
				<ul class="card_logo">
					<li>
						<view style="width: 40px; height: 25px; background-color: teal;" class="img">
							
						</view>
						<view>佳佳生鲜</view>
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
			
		},
		watch:{
			
		},
		methods:{
			
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
		width: 60px;
		border: 1px solid #FFFFFF;
		text-align: center;
		display: inline-block;
	}
	.img{
		padding-top: 35%;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		width:100rpx;
		height: 50rpx;
		border-radius: 50%;
		position: relative;
	} 
	.img>img{
		position: absolute; 
		left: 50%; 
		top: 50%; 
		margin-top: -10px; 
		margin-left:-10px ;
		width: 20px;
		height: 20px;
	}
</style>
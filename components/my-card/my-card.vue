
<template>
	<view>
		<view class="body_content">
			<view class="card_header">
				<view class="xiahua">
					  <h4 class="h41"></h4>
					  <h4 class="h4">常用应用</h4>
				</view>
			</view>
			<view class="card_content">
				<ul class="card_logo">
					<li v-for="item in cardContent" :key="item.name">
						<view :style="{backgroundColor:item.style1.background}" class="img">
							<!-- <img :src="item.imgsrc" alt=""> -->
						</view>
						<view>{{item.name}}</view>
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
				cardContent:[
					{ 
						name:'日程代办',
						imgsrc:'../../static/day_arrange.png',
						style1:{
							background:'#478fe8'
						}
					},
					{
						name:'代办工作',
						imgsrc:'../../static/agency.png',
						style1:{
							background:'#ff7a54'
						}
					},
					{
						name:'内部邮件',
						imgsrc:'../../static/email.png',
						style1:{
							background:'#6ad47c'
						}
					},
					{
						name:'公司发文 ',
						imgsrc:'../../static/dispatch.png',
						style1:{
							background:'#1ed1b7'
						}
					},
					{
						name:'公司收文',
						imgsrc:'../../static/day_arrange.png',
						style1:{
							background:'#478fe8'
						}
					},
					{
						name:'公司签报',
						imgsrc:'../../static/receipt.png',
						style1:{
							background:'#ef6252'
						}
					},
					{
						name:'出差申请',
						imgsrc:'../../static/luggage.png',
						style1:{
							background:'#22b6fa'
						}
					},
					{
						name:'考勤管理',
						imgsrc:'../../static/checkwork.png',
						style1:{
							background:'#f7a465'
						}
					}
				]
			};
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
		margin-top: -10px; 
		margin-left:-10px ;
		width: 20px;
		height: 20px;
	}
</style>
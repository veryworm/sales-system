
<template>
	<view>
		<view class="body_content">
				<view class="xiahua">
					  <p>精选</h4>
					  <p>为您推荐</p>
					  <img style="vertical-align: top;" src="../../static/quxian.png" alt="">
				</view>
			<view class="card_content">
				<ul class="card_logo">
					<li v-for="item in products" :key="item.id">
						<img style="width: 100%; height: 100%;" :src="item.photo" alt="">
						<view class="desc">
							{{item.description}}
						</view>
						<view class="price">
							￥{{item.price}}
						</view>
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
			products:{
				immediate:true
			}
		},
		watch:{
			
		},
		onLoad() {
		
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
		background-color: #f6f6f6;
		border-radius: 10px;
	}
	.xiahua{
		margin-left: 4%;
		text-align: center;
		color: #ef2b2c;
	}  
	.xiahua>p:nth-child(2){
		font-size: 12px;
	}
	.card_content{
		border-radius: 10px;
		background-color: #FFFFFF;
		box-sizing: content-box;
		font-size: 12px;
	}
	.card_logo{
		list-style: none;
		margin: 0;
		padding: 0;
		color: #0a1019;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-weight: 500;
		width: 100%;
	}
	.card_logo>li{
		float: left;
		width: 46%;
		background-color: #FFFFFF;
		border: 5px solid #f6f6f6 ;
	}
	.desc{
		padding-top: 5px;
		font-size: 14px
	}
	.price{
		color: #e82d24;
	}
	
</style>
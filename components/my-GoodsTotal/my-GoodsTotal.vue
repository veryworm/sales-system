
<template>
	<view>
		<view class="body_content">
				<view class="xiahua">
					  <p>精选</h4>
					  <p>为您推荐</p>
					  <img style="vertical-align: top; height: 20px; width: 30px;" src="../../static/quxian.png" alt="">
				</view>
			<view class="card_content">
				<ul class="card_logo">
					<li v-for="item in products" :key="item.id">
						<img style="width: 150px; height: 190px;" :src="item.photo" alt="">
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
		font-size: 12px;
	}
	.card_logo{
		list-style: none;
		margin: 0;
		padding: 0;
		color: #0a1019;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-weight: 500;
		display: flex;
		flex-wrap: wrap;
		background-color: #F2F2F2;
	}
	.card_logo>li{
		float: left;
		width: 150px;
		height: 210px;
		background-color: #FFFFFF;
		border: 3px solid #f6f6f6 ;
		padding-bottom: 30px;
	}
	.desc{
		padding-top: 5px;
		font-size: 14px
	}
	.price{
		color: #e82d24;
	}
	
</style>
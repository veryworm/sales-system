<template>
	<view class="content">
		
	</view>
</template>

<script>
	import {Categoryapi,Productapi} from "@/utiles/apiController.js"
	import { mapState, mapActions, mapGetters } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	export default {
		// mixins:[mixStatus],
		data() {
			return {
				mainData:[]
			};
		},
		watch:{
			
		},
		mounted() {
			
		},
		computed:{
			// ...mapGetters('product',['productFilter'])
		},
		methods:{
			// ...mapActions('product',['searchProducts']),
		},
		
	}
</script>

<style lang="scss">
	.body_content{
		margin-top: 15px;
		margin-left: 4%;
		height: 100%;
		width: 92%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.card_content{
		background-color: #FFFFFF;
		padding: 0 .6rem .5rem .3rem;
		box-sizing: content-box;
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
		font-weight: 400;
	}
	.card_logo>li{
		display: inline-block;
		padding-left: 10px;
		border-radius: 10px;
	}
	.card_logo>li:nth-child(1){
		height: 100px;
		width: 32%;
		float: left;
	}
	.card_logo::after{
		content: '';
		display: block;
		clear: both;
	}
	.card_logo>li:nth-child(2){
		width: 50%;
		height: 35px;
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
		width: 60%;
	}
	.card_logo>li:nth-child(5){
		text-align: right;
		width: 60%;
		border-bottom: 1px solid #f2f2f2;
		margin-top: 8px;
	}
	.img{
		padding-top: 35%;
		margin: 0 auto;
		margin-top: 10%;
		text-align: center;
		width:80rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
	}
</style>

<template>
	<view class="content"> 
		<!-- 搜索框 -->
		<view class="header">
			<uniNavBar left-icon="person-filled" right-icon="scan" color="#ffffff" fixed="true" background-color="#d42319" status-bar="true">
				<view slot="default">
					<img class="header_search" src="../../static/search.png" alt="">
					<input class="search_input" type="text" placeholder="请输入搜索内容"></li>
				</view>
			</uniNavBar>
		</view>
		<view class="category_rows">
			<uni-segmented-control
				:current="current"
				:values="categories"
				@clickItem="onClickItem"
				@click= "click1(item)"
				style-type="text" 
				active-color="#ffffff"
			>
			</uni-segmented-control>
		</view>
		<view style="padding: 120px 0 10px 0">
			<!-- 轮播图 -->
			<view v-if="current == '0'">
				<view class="uni-padding-wrap">
					<view  class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item v-for="item in FilterProductImg" :key="item.id">
									<view class="swiper-item">
										<img style="width: 100%; height: 100%; border-radius: 10px;" :src="item.photo" alt="">
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<myCard :categoryData="categoryData">
					<!-- 分类卡片 -->
				</myCard>
				<view style="margin-top: 10px;">
					<!-- 我的关注 -->
					<myAttention></myAttention>
				</view>
				<view style="margin-top: 10px;">
					<!-- 所有产品 -->
					<myGoods :products="products"></myGoods>
				</view>
			</view>
			<view v-if="current == '1'">
				<!-- 家庭养护:{{categoryData}} -->
			</view>
			<view v-if="current == '2'">
				<!-- 庭微信{{categoryData}} -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import myCard from '@/components/my-card/my-card.vue'
	import myAttention from '@/components/my-attention/my-attention.vue'
	import myGoods from '@/components/my-GoodsTotal/my-GoodsTotal.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import {Categoryapi,Productapi} from "@/utiles/apiController.js"
	export default {
		components: {
			uniNavBar,
			uniIcons,
			uniSegmentedControl,
			myCard,
			myAttention,
			myGoods
		},
		data() {
			return {
				indicatorDots: true,		
				autoplay: true,
				interval: 2000,
				duration: 500,
				swiperContent:[ 
					{
						imgsrc:'../../static/swiper/1.jpg'
					},
					{
						imgsrc:'../../static/swiper/2.jpg'
					},
					{
						imgsrc:'../../static/swiper/3.jpg'
					}
				],
				current:0,
				categories:[],
				categoryData:[],
				products:[]
			}  
		},
		watch:{
			
		},
		computed:{
			FilterProductImg(){
				return this.products.filter(item=>item.photo !== null)
			}
		},
		onLoad() {
			this.searchCategory()
			this.searchProducts()
		}, 
		methods: {
			// 加载分类
			searchCategory(){
				uni.request({
				    url: Productapi.ProductFindAll.api, 
					method: Productapi.ProductFindAll.methods,
				    header: {
				        'Accept': 'application/json'
				    },
				    success: (res) => {
				        this.products = res.data.data
				    },
					fail: (res) =>{
						
					}
				})
			},
			// 加载所有商品
			searchProducts(){
				uni.request({
				    url: Categoryapi.CategoryFindAll.api, 
					method: Categoryapi.CategoryFindAll.methods,
				    header: {
				        'Accept': 'application/json'
				    },
				    success: (res) => {
				        this.categories = res.data.data
						if(this.categories[0].id){
							this.categoryFindByCategoryId(this.categories[0].id)
						}
				    },
					fail: (res) =>{
						
					}
				})
			},
			// 根据分类ID去查找商品
			categoryFindByCategoryId(CategoryId){
				uni.request({
					url:Categoryapi.CategoryFindByCategoryId.api, 
					method: Categoryapi.CategoryFindAll.methods,
					data:{id:CategoryId},
					header: {
					    'Accept': 'application/json'
					},
					success: (res) => {
					    this.categoryData= res.data.data
						console.log(this.categoryData,'data')
					},
					fail:(res)=>{
						
					}
				})
			},
			onClickItem(item,index){
				this.current = item.currentIndex
				this.categoryFindByCategoryId(item.item1.id)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #f2f3fb;
	}
	.uni-nav-bar-text {
	    font-size: 10px;
	}
	.search_input{
		padding: .3em 4em .3em 2.2em;
		border-radius: 30px;
		background-color: #FFFFFF;
		font-size: 13px;
		width: 65%;
	}
	.header_search{
		position: absolute;
		width: 16px;
		height: 15px;
		top: 28upx;
		left: 187upx;
	}
	// 商品分类
	.category_rows{
		background-color: #d42319;
		box-sizing: content-box;
		width: 100%;
		padding: 5px 0 60px 0;
	}
	
	/* 轮播 */
	.uni-padding-wrap{
		position: absolute;
		top: 100px;
		border-radius: 10px;
		width: 91.5%;
		left: 35upx;
	}
	.swiper-item{
		width: 100%;
		border-radius: 10px;
		height: 150px;
		z-index: 2;
	}
	
	
	
</style>

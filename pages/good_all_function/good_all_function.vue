<template>
	<view class="content">
		<view class="header">
			<uniNavBar @clickLeft="clickLeft" left-icon="back" right-icon="bars" @clickRight="clickright" fixed="true" background-color="#ffffff" status-bar="true">
					<img class="header_search" src="../../static/search.png" alt="">
					<input @confirm="confirmData" class="search_input" type="text" placeholder="请输入搜索内容">
			</uniNavBar>
		</view>
		  <uni-segmented-control :drawerAddress="!drawerAddress.length==0?drawerAddress:[]" :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#d96b4f"></uni-segmented-control>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar1/uni-nav-bar.vue"
	import uniSegmentedControl from "@/components/uni-segmented-control2/uni-segmented-control.vue"
	import mygoodsswip from "@/components/my-goodsswip/mygoodsswip.vue"
	import { mixStatus } from '../../store/modules/mix.js'
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default {
		mixins:[mixStatus],
		components:{
			uniNavBar,
			uniSegmentedControl,
			mygoodsswip
		},
		data() {
			return {
				drawerAddress:[],
				items: ['销量','价格','筛选'],
				current: 0,
				uniqueval:'goods',
				productData:[],
				filterprimaryproduct:[],
				searchOn:false
			}
		},
		watch:{
			
		},
		mounted() {
			this.searchProducts()
			this.productData = this.products
		},
		computed:{
			...mapState('product',['products'])
		},
		methods:{
			...mapActions('product',['searchProducts']),
			searchBody(){
				if(this.searchOn){
					return this.filterprimaryproduct
					console.log(this.filterprimaryproduct,'filter')
				}else{
					console.log(this.products,'pro')
					return this.products
				}
			},
			confirmData(event){
				console.log(this.ShoppingData,'kkk')
				// this.searchOn = true 
				// let resp = this.$store.getters.productFilter3(
				// 	event.detail.value,
				// ) 
				// this.filterprimaryproduct = resp
				// this.search()
			},
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
				if(this.current == 2){
					this.current = 0
				}
			},
			clickLeft(){
				uni.switchTab({
					url:'../home/home'
				})
			},
			
			clickright(){
				
			}
		},
		onLoad(option) {
			if(option.val!==undefined){
				this.drawerAddress = [JSON.parse(option.val)]
			}else{
				return []
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
	.search_input{
		padding: .3em 4em .3em 2.5em;
		border-radius: 30px;
		background-color: #F2F2F2;
		font-size: 13px;
		width: 200px;
		color: black;
	}
	.header_search{
		position: absolute;
		width: 16px;
		height: 15px;
		line-height: 1em;
	}
</style>

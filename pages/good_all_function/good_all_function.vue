<template>
	<view class="content">
		<view class="header">
			<uniNavBar @clickLeft="clickLeft" left-icon="back" right-icon="reload" fixed="true" background-color="#ffffff" status-bar="true">
				<view slot="default">
					<img class="header_search" src="../../static/search.png" alt="">
					<input class="search_input" type="text" placeholder="请输入搜索内容"></li>
				</view>
			</uniNavBar>
		</view>
		  <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#d96b4f"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				选项卡1的内容
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar1/uni-nav-bar.vue"
	import uniSegmentedControl from "@/components/uni-segmented-control2/uni-segmented-control.vue"
	export default {
		components:{
			uniNavBar,
			uniSegmentedControl
		},
		data() {
			return {
				newoption1:{},
				items: ['销量','价格','筛选'],
				current: 0,
				uniqueval:'goods'
			};
		},
		methods:{
			onClickItem(index) {
				if (this.current !== index.currentIndex) {
					this.current = index.currentIndex;
				}
			},
			clickLeft(){
				uni.switchTab({
					url:'../home/home'
				})
			}
		},
		onLoad(option) {
			if(option){
				let newoption = JSON.parse(option.item)
				this.newoption1 = newoption
				// let newoption2 = {sort:'红双喜'}
				// this.newoption1 =  Object.assign(this.newoption1,newoption2)
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
</style>

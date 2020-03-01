<template>
	<view :class="[styleType === 'text'?'segmented-control--text' : 'segmented-control--button' ]" :style="{ borderColor: styleType === 'text' ? '' : activeColor }" class="segmented-control">
		<view v-for="(item, index) in values" :class="[ styleType === 'text'?'segmented-control__item--text': 'segmented-control__item--button' , index === currentIndex&&styleType === 'button'?'segmented-control__item--button--active': '' , index === 0&&styleType === 'button'?'segmented-control__item--button--first': '',index === values.length - 1&&styleType === 'button'?'segmented-control__item--button--last': '' ]" :key="index" :style="{
        backgroundColor: index === currentIndex && styleType === 'button' ? activeColor : '',borderColor: index === currentIndex&&styleType === 'text'||styleType === 'button'?activeColor:'transparent'
      }" class="segmented-control__item" @click="_onClick(index)">
			<text :style="{color:
          index === currentIndex
            ? styleType === 'text'
              ? activeColor
              : '#fff'
            : styleType === 'text'
              ? '#000'
              : activeColor}" class="segmented-control__text">{{ item }} <text @click="kii" v-if="item=='筛选'"><img src="../../static/shaixuan.png" alt=""></text></text>
			  <!-- <view style="margin-left: 3px;" v-if="item == '价格'">
				  <img src="../../static/top_bottom.png" alt="">
			  </view>
			  <view @click="kii" style="margin-left: 3px;" v-if="item == '筛选'">
				  <img src="../../static/shaixuan.png" alt="">
			  </view> -->
		</view>
		<uni-drawer mode="right" :visible="visible" @close="closeDrawer">
		    <view style="padding:30rpx; background-color: #FFFFFF;border-radius: 10px">
		        <view style="font-weight: bold" class="uni-title">
					<uni-icons type="location" size="25"></uni-icons>
					<text style="font-size: 14px;">地址</text>
					<text style="font-size: 14px; vertical-align: sub; color: red;">修改</text>
				</view>
				<!-- drawer 产品name -->
				<ul class="ull">
					<li @click="productChoice(item,index)" v-for="(item,index) in productFilter" :key="item.id" :class="['drawer_brand',index == currentIndex2 ? 'drawer_brand_style': '']">
						{{item.name}}
					</li>
				</ul>
				<!-- drawer 产品价格 -->
				<view style="margin-top: 10px; font-weight: bold;" class="uni-title">
					<text style="font-size: 14px;">价格区间</text>
				</view>
				<view class="pricestyle">
					<form :model="formDrawer" ref="formDrawer2">
						<view style="float: left;" class="uni-form-item uni-column">
							<input class="uni-input" v-model="formDrawer.lowestprice" name="lowestprice" placeholder="最低价" />
						</view>
						<view style="float: left;">
							<text>-</text>
						</view>
						<view class="uni-form-item uni-column">
							<input class="uni-input"  v-model="formDrawer.highsetprice" name="highsetprice" placeholder="最高价" />
						</view>
						<view style=" position: absolute; bottom: 0; left: 7%; " class="uni-btn-v">
							<button class="beautbutton2" @click="formReset">重置</button>
							<button class="beautbutton1" @click="submitData(formDrawer)">确定({{'一共'+filterprimaryproduct.length + '件商品'}})</button>
						</view>
					</form>
				</view>
		    </view>
			<!-- <view style="margin-top: 10px; background-color: #FFFFFF; border-radius: 10px;" class="uni-title">
				<text style="font-size: 14px;">地址</text>
				<view class="drawer_brand">
					21
				</view>
			</view> -->
		</uni-drawer>
		<mygoodsswip v-if="show1" :onedata="onedata1"></mygoodsswip>
	</view>
</template>


<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mygoodsswip from "@/components/my-goodsswip/mygoodsswip.vue"
	import { mapState, mapActions, mapGetters } from 'vuex'
	import { mixStatus } from '../../store/modules/mix.js'
	export default {
		mixins:[mixStatus],
		components:{uniDrawer,uniIcons,mygoodsswip},
		name: 'UniSegmentedControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			}
		},
		data() {
			return {
				currentIndex: 0,
				currentIndex2:null,
				visible:false,
				show1:false,
				formDrawer:{
					name:'',
					lowestprice:'',
					highsetprice:''
				},
				filterprimaryproduct:[],
				onedata1:[]
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		computed:{
			...mapGetters('product',['productFilter']),
		},
		created() {
			this.currentIndex = this.current
			this.$store.dispatch('searchProducts')
		},
		mounted() {
			this.searchProducts()
			this.onedata1 = this.productFilter
			console.log(this.onedata1,'lokloi')
		},
		methods: {
			...mapActions('product',['searchProducts']),
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {
						currentIndex: index
					})
				}
			},
			// 选择产品name
			productChoice(item,index){
				console.log(this.onedata,'on1121221')
				this.currentIndex2 = index
				this.formDrawer.name = item.name
				if(this.formDrawer.name!== ''){
					let resp1 = this.$store.getters.productFilter3(
						this.formDrawer.name
					)
					this.filterprimaryproduct = resp1
					console.log(this.filterprimaryproduct,'55')
				}
			},
			// 弹出模态框
			kii(){
				this.visible = true
			},
			// 关闭模态框
			closeDrawer(){
				this.visible = false
			},
			// 提交表单
			submitData(e){
				this.searchOn = true
				if(e.name !== '' || e.lowestprice!=='' || e.highsetprice!==''){
					let resp = this.$store.getters.productFilter3(
						e.name,
						e.lowestprice,
						e.highsetprice
					)
					this.filterprimaryproduct = resp
					this.onedata1 = resp
					console.log(this.filterprimaryproduct,'0')
					
				}else if(e.name!== '' && e.lowestprice !== ''){
					let resp1 = this.$store.getters.productFilter3(
						e.name,
						e.lowestprice
					)
					this.filterprimaryproduct = resp1
					this.onedata1 = resp1
					console.log(this.filterprimaryproduct,'1')
				}else if(e.name!== ''){
					let resp1 = this.$store.getters.productFilter3(
						e.name
					)
					this.filterprimaryproduct = resp1
					this.onedata1 = resp1
					console.log(this.filterprimaryproduct,'2')
				}
				
			},
			// 清空表单
			formReset(e){
				e.detail.value = ''
				this.currentIndex2 = null
			}
			
		}
	}
</script>

<style scoped>
	.segmented-control {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		height: 36px;
		overflow: hidden;
	}

	.segmented-control__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		/* #endif */
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.segmented-control__item--button {
		border-style: solid;
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-left-width: 0;
	}

	.segmented-control__item--button--first {
		border-left-width: 1px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.segmented-control__item--button--last {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.segmented-control__item--text {
		border-bottom-style: solid;
		border-bottom-width: 3px;
		background-color: #FFFFFF;
	}

	.segmented-control__text {
		font-size: 14px;
		line-height: 20px;
		text-align: center;
	}
	.ull{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.ull::after{
		content: '';
		display: block;
		clear: both;
	}
	.drawer_brand{
		float: left;
		background-color: #f2f2f2;
		border-radius: 10px;
		font-size: 14px;
		padding: 10px;
		margin-top: 10px;
		margin-left: 5px;
	}
	.drawer_brand_style{
		border: 1px solid red;
		color: #ff7660;
	}
	.uni-input{
		background-color: #F2F2F2;
		width: 66px;
		padding: 2px 10px 2px 26px;
		border-radius: 10px;
	}
	.beautbutton1{
		border-radius: 50px;
		height: 30px;
		line-height: 1.8em;
		font-size: 16px;
		background-color: #FFFFFF;
		color: #FFFFFF;
		background-color: #f11e0b;
		padding-left: 20px;
		padding-right: 20px;
	}
	.beautbutton2{
		border-radius: 50px;
		height: 30px;
		padding-left: 20px;
		padding-right: 20px;
		line-height: 1.8em;
		font-size: 16px;
		background-color: #FFFFFF;
		float: left;
		border: 1px solid #8c8c8c;
	}
</style>
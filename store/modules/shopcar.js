import _ from 'lodash'
export default {
	namespaced:true,
	state:{
		orderLines:new Map(),
		orderLines2:new Map(), //下单
		selectPrice:'',
		currentIndex:0
	},
	getters:{
		total(state){
			let result = 0;
			for (let value of state.orderLines.values()) {
				result += value.number * value.price
			}
			return result
		},
		// 下单
		total2(state){
			let result = 0;
			for (let value of state.orderLines2.values()) {
				result += value.number * value.price
			}
			return result
		},
		total3(state){
			return state.selectPrice
		},
		isorcurrentindex(state){
			return state.currentIndex
		}
	},
	mutations:{
		addShopCar(state,orderline){
			state.orderLines.set(orderline.productId,orderline)
			// 克隆对象,改变引用地址,目的是为了让监听机制监听到orderLines的改变
			state.orderLines = _.clone(state.orderLines)
		},
		// 挑选商品的map
		TobuyShop(state,orderline2){
			state.orderLines2.set(orderline2.productId,orderline2)
			// 克隆对象,改变引用地址,目的是为了让监听机制监听到orderLines的改变
			state.orderLines2 = _.clone(state.orderLines2)
		},
		// 挑选商品的总额
		selectGoodsTotal(state,price){
			console.log(price,'sd')
			state.selectPrice = price
			state.selectPrice = _.clone(state.selectPrice)
		},
		deterIndex(state,index){
			state.currentIndex = index
		}
	}
}
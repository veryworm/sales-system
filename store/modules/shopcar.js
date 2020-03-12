import _ from 'lodash'
export default {
	namespaced:true,
	state:{
		orderLines:new Map(),
		orderLines2:new Map() //下单
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
		}
	},
	mutations:{
		addShopCar(state,orderline){
			state.orderLines.set(orderline.productId,orderline)
			// 克隆对象,改变引用地址,目的是为了让监听机制监听到orderLines的改变
			state.orderLines = _.clone(state.orderLines)
		},
		// 下单
		TobuyShop(state,orderline2){
			state.orderLines2.set(orderline2.productId,orderline2)
			// 克隆对象,改变引用地址,目的是为了让监听机制监听到orderLines的改变
			state.orderLines2 = _.clone(state.orderLines2)
			console.log(state.orderLines2,'orderline2')
		}
	}
}
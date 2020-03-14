import _ from 'lodash'
import { post_array, post_json, post_obj_array, get, post} from '../../http/axios.js'
import { Orderapi } from '../../utiles/apiController.js'
export default {
	namespaced:true,
	state:{
		currentCustomerOrder:[],
		currentAllOrder:[]
	},
	getters:{
		
	},
	mutations:{
		refreshCustomerOrder(state,currentCustomerOrder){
			state.currentCustomerOrder = currentCustomerOrder
		},
		refreshCustomerAllOrder(state,currentAllOrder){
			state.currentAllOrder = currentAllOrder
		}
	},
	actions:{
		async saveOrder({commit,rootState},id){
			let data = {
				customerId:rootState.user.info.id,
				// 判断当前地址是否为默认地址,如果不是就地址ID就为用户选择的地址
				addressId:rootState.user.selectAddressId == '' ? id : rootState.user.selectAddressId,
				orderLines:Array.from(rootState.shopcar.orderLines2.values())
			}
			let response = await post_obj_array(Orderapi.OrderSave.api,data)
			return response
		},
		async findAllOrder({commit,rootState},status){
			let response = await get(Orderapi.OrderFindAll.api)
			// 过滤出与当前顾客id相同的订单
			let currentAllOrder = response.data.filter((item)=>{
				return item.customerId == rootState.user.info.id
			})
			let currentCustomerOrder = response.data.filter((item)=>{
				return item.customerId == rootState.user.info.id && item.status ==  status
			})
			commit("refreshCustomerOrder",currentCustomerOrder)
			commit("refreshCustomerAllOrder",currentAllOrder)
			return currentCustomerOrder
		},
		async confirmOrderes({commit},id){
			let response= await get(Orderapi.OrderConfirm.api+id)
			return response
		}
	}
}
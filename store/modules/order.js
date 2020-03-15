import _ from 'lodash'
import { post_array, post_json, post_obj_array, get, post} from '../../http/axios.js'
import { Orderapi, Commentapi } from '../../utiles/apiController.js'
export default {
	namespaced:true,
	state:{
		currentCustomerOrder:[],
		refreshCommentOfVoidData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshCustomerOrder(state,currentCustomerOrder){
			state.currentCustomerOrder = currentCustomerOrder
		},
		refreshCommentOfVoid(state,refreshCommentOfVoidData){
			state.refreshCommentOfVoidData = refreshCommentOfVoidData
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
		async findAllOrder({commit,dispatch,rootState},status){
			let response = await get(Orderapi.OrderFindAll.api)
			for(let i=0;i<rootState.product.productsImg.length;i++){
				response.data[i].photo = rootState.product.productsImg[i].photo
			}
			// 过滤出与当前顾客id所有的订单
			if(status == undefined){
				let currentAllOrder = response.data.filter((item)=>{
					return item.customerId == rootState.user.info.id
				})
				commit("refreshCustomerOrder",currentAllOrder)
			}else{
				// 过滤出与当前顾客订单状态相符的订单
				let currentCustomerOrder = response.data.filter((item)=>{
					return item.customerId == rootState.user.info.id && item.status ==  status
				})
				commit("refreshCustomerOrder",currentCustomerOrder)
			}
		},
		async confirmOrderes({commit},id){
			let response= await get(Orderapi.OrderConfirm.api+id)
			return response
		},
		// 查评论
		async findAllComments({commit},myitem){
			let arr = [];
			let response= await get(Commentapi.CommentFind.api)
			// 双重遍历,第一次拿到与commentId相同的订单评论的id,第二次把通过的值push到arr里
			for(let item3 of myitem){
				let result = response.data.filter((item)=>{
					return item.orderId !== null && item.orderId == item3.id
				})
				for(let item4 of result){
					arr.push(item4)
				}
			}
			commit("refreshCommentOfVoid",arr)
		}
	}
}
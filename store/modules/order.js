import _ from 'lodash'
import { post_array, post_json, post_obj_array, get, post} from '../../http/axios.js'
import { Orderapi, Commentapi , Productapi } from '../../utiles/apiController.js'
export default {
	namespaced:true,
	state:{
		currentCustomerOrder:[],
		refreshCommentOfVoidData:[],
		allContent:[],
		ordersort1:[],
		searchOrderData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshCustomerOrder(state,currentCustomerOrder){
			state.currentCustomerOrder = currentCustomerOrder
		},
		refreshCommentOfVoid(state,refreshCommentOfVoidData){
			state.refreshCommentOfVoidData = refreshCommentOfVoidData
		},
		refreshallContent(state,allContent){
			state.allContent = allContent
		},
		// 查询订单数据
		refreshSearchOrder(state,searchOrderData){
			state.searchOrderData = searchOrderData
		},
		refreshOrderSort(state,currentAllOrder){
			if(currentAllOrder.length!==0){
				let ordersort1 = [
					// length要为一个字符串类型,否则length会未定义
					{
						name:'待派单',
						imgsrc:'../../static/waiting_pay.png',
						length:""
					},
					{
						name:'待确认',
						imgsrc:'../../static/waiting_pay.png',
						length:""
					},
					{
						name:'已完成',
						imgsrc:'../../static/have_finished.png',
						length:""
					},
					{ 
						name:'待评价',
						imgsrc:'../../static/waiting_describe.png',
						length:""
					},
					{
						name:'全部订单',
						imgsrc:'../../static/all_order.png',
						length:""
					}
				]
				// 待派单
				let watingListLength = currentAllOrder.filter((item)=>{
					return item.status == '待派单'
				})
				ordersort1[0].length = watingListLength.length
				
				// 待确认
				let watingComfirmLength = currentAllOrder.filter((item)=>{
					return item.status == '待确认'
				})
				ordersort1[1].length = watingComfirmLength.length
				
				// 已完成
				let haveFinishLength = currentAllOrder.filter((item)=>{
					return item.status == '已完成'
				}) 
				ordersort1[2].length = haveFinishLength.length
				
				// 未评价
				let noCommentLength = state.allContent.filter((item)=>{
					return item.iscontent !== true
				}) 
				ordersort1[3].length = noCommentLength.length
				
				// 全部
				ordersort1[4].length = state.currentCustomerOrder.length
				state.ordersort1 = ordersort1
			}
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
				// commit("refreshOrderSort",currentAllOrder)
				// 未评价订单数量
				let notCommentNumber = response.data.filter((item)=>{
					return item.customerId == rootState.user.info.id && item.status ==  "已完成"
				})
				
				await dispatch("findAllComments",notCommentNumber)
				commit("refreshOrderSort",currentAllOrder)
			}else{
				// 过滤出与当前顾客订单状态相符的订单
				let currentCustomerOrder = response.data.filter((item)=>{
					return item.customerId == rootState.user.info.id && item.status ==  status
				})
				commit("refreshCustomerOrder",currentCustomerOrder)
				if(status == '已完成'){
					dispatch("findAllComments",currentCustomerOrder)
				}
			}
		},
		async confirmOrderes({commit},id){
			let response= await get(Orderapi.OrderConfirm.api+id)
			return response
		},
		// 查评论
		async findAllComments({commit},myitem){
			// myitem为已完成订单项的数据
			let arr = [];
			let response = await get(Commentapi.CommentFind.api)
			// 双重遍历,第一次拿到完成订单orderId与订单评论完成的orderId, 第二次把通过的值push到arr里
			for(let item3 of myitem){
				let result = response.data.filter((item)=>{
					return item.orderId !== null && item.orderId == item3.id
				})
				for(let item4 of result){
					arr.push(item4)
				}
			}
			commit("refreshCommentOfVoid",arr)
			// 把已完成订单和评价完的订单的数据做一次整合
			let arr1 = []
			myitem.forEach(i => {
			    arr.forEach(j => {
			        if (i.id == j.orderId){
			            i.iscontent = true
						arr1.push(myitem)
			        }
			    })
			})
			commit("refreshallContent",arr1[0])
		},
		// 新增修改评论
		async addOrEditComment({commit},CommentData){
			let response = await post(Commentapi.CommenSaveOrUpdate.api,CommentData)
			return response
		},
		async deleteOrderHandler({commit},id){
			let response = await get(Orderapi.OrderDeleteById.api+id)
			return response
		},
		// 根据id搜索订单
		async searchOrderHandler({commit,rootState,dispatch},id){
			let response = await get(Orderapi.OrderFindById.api+id)
			dispatch("findProduct",response.data)
		},
		async findProduct({commit,dispatch},searchOrderData){
			let response = await get(Productapi.ProductFindAll.api)
			let arr1 = []
			// 因为搜到的数据没有产品的图片和产品的name,这里过滤出来与product的id相同的数据,然后拼接到搜到的数据中
			searchOrderData.forEach(i => {
			    response.data.forEach(j => {
			        if (i.productId == j.id){
			            i.name = j.name
						i.proto = j.photo
						arr1.push(i)
			        }
			    })
			})
			commit("refreshSearchOrder",arr1)
		}
	}
}
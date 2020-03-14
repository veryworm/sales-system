import { Userapi, UserAddressapi, Customerapi } from '../../utiles/apiController.js'
import { post_array, post_json, get, post} from '../../http/axios.js'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
export default {
	namespaced:true,
	state:{
		 token:getToken(),
		 info:{},
		 // 用户地址
		 addresses:[],
		 // 查出当前用户的所有地址
		 newresponse:[],
		 selectAddressId:''
	},
	getters:{
		
	},
	mutations:{
		refreshToken(state,token){
			state.token = token
			console.log(state.token)
		},
		refreshInfo(state,info){
			state.info = info
		},
		refreshAddress(state,address){
			state.addresses = address
		},
		// 返回顾客的所有信息
		refreshCustomerAllMes(state,newresponse){
			state.newresponse = newresponse
		},
		refreshSelectAddressId(state,selectAddressId){
			state.selectAddressId = selectAddressId
			console.log(state.selectAddressId,'id')
		}
	},
	actions:{
		// 登录拿info
		async Login({commit,dispatch},payload){
			let response = await post_json(Userapi.UserLogin.api,payload)
			let token = response.data.token
			setToken(token)
			await dispatch("info1",token)
		},
		// 根据token拿info
		async info1({commit,dispatch},token){
			let response = await get(Userapi.Userinfo.api,{token})
			commit("refreshInfo",response.data)
			dispatch('findUserAddressById',response.data.id)
			dispatch('customerFindAll',response.data.id)
			return response.data
		},
		// 根据用户id拿地址
		async findUserAddressById({context,commit,dispatch},id){
			let response = await get(UserAddressapi.UserfindById.api+id)
			commit("refreshAddress",response.data)
		},
		// 根据用户id删除
		async deleteAddressByUserId({dispatch},id){
			let response = await get(UserAddressapi.UserDeleteId.api+id)
			dispatch('findUserAddressById',id)
			return response
		},
		// 根据用户id用户所有信息
		async customerFindAll({commit,dispatch},id){
			let response = await get(Customerapi.CustomerFind.api)
			let newresponse = response.data.filter((item)=>{
				return item.id == id
			})
			commit("refreshCustomerAllMes", newresponse)
		},
		// 保存或更新地址
		async SaveOrUpdateAddress({commit,dispatch},address){
			let response = await post_array(UserAddressapi.UsersaveOrUpdate.api,address)
			commit("refreshAddress",response.data)
			return response
		},
		async logout({commit}){
			await post(Userapi.UserLogout.api);
			removeToken();
			commit('refreshToken','');
			commit('refreshInfo',{});
		}
	}
}
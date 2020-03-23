import {Customerapi} from '../../utiles/apiController.js'
import { post_json, post} from '../../http/axios.js'
export default {
	namespaced:true,
	state:{
		
	},
	mutations:{
		
	},
	actions:{
		async AddCustomer({dispatch},customerData){
			let response = await post(Customerapi.CustomerSave.api,customerData)
			return response
		}
	}
}
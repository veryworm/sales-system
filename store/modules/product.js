import {Categoryapi,Productapi} from "@/utiles/apiController.js"
export default {
  namespaced:true,
  state: {
    products:[]
  },
  getters:{
    productFilter(state){
       return state.products.filter(item=>item.status === '100')
    }
	// productFilter1:(state)=>(status)=>{return state.products.filter(item=>item.status== 'status')}
  },
  mutations: {
    refreshProducts(state,products){
      state.products = products;
    }
  },
  actions: {
      searchProducts({state,commit,getters }){
      	uni.request({
      	    url: Productapi.ProductFindAll.api, 
      		method: Productapi.ProductFindAll.methods,
      	    header: {
      	        'Accept': 'application/json'
      	    },
      	    success: (res) => {
				commit('refreshProducts',res.data.data)
      	    },
      		fail: (res) =>{
				alert(res)
      			// 功能注册
      		}
      	})
      }
  }
}
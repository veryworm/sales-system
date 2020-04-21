import {Categoryapi,Productapi} from "@/utiles/apiController.js"
export default {
  namespaced:true,
  state: {
    products:[],
    productsImg:[]
  },
  getters:{
    productFilter(state){
       return state.products.filter(item=>item.status === '100'||item.status === '正常')
    }
  },
  mutations: {
    refreshProducts(state,products){
      state.products = products;
    },
	refreshProductsImg(state,productsImg){
	  let arr = productsImg.filter((item)=>{
		  return item.photo !== null
	  })
	  state.productsImg = arr
	}
  },
  actions: {
      searchProducts({state,commit }){
      	uni.request({
      	    url: Productapi.ProductFindAll.api, 
      		method: Productapi.ProductFindAll.methods,
      	    header: {
      	        'Accept': 'application/json'
      	    },
      	    success: (res) => {
				commit('refreshProducts',res.data.data)
				commit('refreshProductsImg',res.data.data)
      	    },
      		fail: (res) =>{
      			// 功能注册
      		}
      	})
      }
  }
}
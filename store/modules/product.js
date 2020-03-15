import {Categoryapi,Productapi} from "@/utiles/apiController.js"
export default {
  namespaced:true,
  state: {
    products:[],
    productsImg:[]
  },
  getters:{
    productFilter(state){
       return state.products.filter(item=>item.status === '100')
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
      searchProducts({state,commit,getters }){
      	uni.request({
      	    url: Productapi.ProductFindAll.api, 
      		method: Productapi.ProductFindAll.methods,
      	    header: {
      	        'Accept': 'application/json'
      	    },
      	    success: (res) => {
				res.data.data.forEach(item=>{
					item.number = 0,
					item.checkone = true
				})
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
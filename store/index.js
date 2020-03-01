import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import user from './modules/user'
// import order from './modules/order'
// import category from './modules/category'
// import shopcar from './modules/shopcar'
import product from './modules/product'
import {Categoryapi,Productapi} from "@/utiles/apiController.js"

const store = new Vuex.Store({
   state:{
      name2:'zhangsan',
	  products:[]
   },
   getters:{
	  productFilter3(state){
		return (name,lowestprice,highsetprice)=>{
			return state.products.filter( item =>item.name == name || item.price>lowestprice || item.price<highsetprice )
		}
	  }
   },
   mutations:{
	    refreshProducts(state,products){
	      state.products = products;
	    }
   },
   actions:{
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
	   			
	   		}
	   	})
	   }
   },
   modules: {
    // user,
    // order,
    // category,
    product,
    // shopcar
 }
})

export default store

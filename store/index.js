import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import order from './modules/order'
import customer from './modules/customer'
import shopcar from './modules/shopcar'
import product from './modules/product'
import {Categoryapi,Productapi} from "@/utiles/apiController.js"

const store = new Vuex.Store({
   state:{
	  products:[]
   },
   getters:{
	  productFilter3(state){
		return (name,lowestprice,highsetprice,status)=>{
			if(name !=='' && lowestprice !== ''){
				return state.products.filter(item=>item.name == name && item.price>lowestprice  && item.status == status )
			}else if(lowestprice !== '' && highsetprice !== '' ){
				return state.products.filter(item=>item.price >= lowestprice && item.price <= highsetprice && item.status == status)
			}else if(highsetprice !== '' ){
				return state.products.filter(item=>item.price <= highsetprice && item.status == status)
			}else if(lowestprice !== ''){
				return state.products.filter(item=>item.price >= lowestprice && item.status == status)
			}else if(name !==''){
				return state.products.filter(item=>item.name == name)
			}
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
				res.data.data.forEach(item=>{
					item.number = 0,
					item.checkone = true
				})
	   			commit('refreshProducts',res.data.data)
	   	    },
	   		fail: (res) =>{
	   			
	   		}
	   	})
	   }
   },
   modules: {
    user,
    order,
    customer,
    product,
	shopcar
    // shopcar
 }
})

export default store

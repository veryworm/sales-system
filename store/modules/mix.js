import { mapState, mapActions, mapGetters } from 'vuex'
export const mixStatus = {
	data(){
		return {
			gridData:[]
		}
	},
	computed:{
		...mapGetters('product',['productFilter']),
		gridList(){
			if(this.gridData){
				return this.gridData
			}
		}
	},
	watch:{
		// gridData:{
		// 	immediate:true,
		// 	handler(val){
		// 		if(val){
		// 			this.search()
		// 		}else{
		// 			this.search()
		// 		}
		// 	}
		// }
	},
	created(){
		this.searchProducts()
	},
	methods:{
		...mapActions('product',['searchProducts']),
		search(){
			let resp =  this.searchBody.call(this)
			console.log(resp,'resp')
			if(resp){
				return (this.gridData = resp)
			}else{
				return null
			}
		}
	}
}
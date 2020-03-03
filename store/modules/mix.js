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
			}else{
			}
		}
	},
	watch:{
		gridData:{
			immediate:true,
			handler(){
				this.search()
			}
		}
	},
	created(){
		this.searchProducts()
	},
	methods:{
		...mapActions('product',['searchProducts']),
		search(){
			let resp =  this.searchBody.call(this)
			if(resp){
				return (this.gridData = resp)
			}else{
				return null
			}
			return null
		}
	}
}
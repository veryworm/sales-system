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
		
	},
	created(){
		this.searchProducts()
	},
	methods:{
		...mapActions('product',['searchProducts']),
		async search(){
			let resp =  await this.searchBody.call(this)
			if(resp){
				return (this.gridData = resp)
			}else{
				return null
			}
			return null
		}
	}
}
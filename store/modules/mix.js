import { mapState, mapActions, mapGetters } from 'vuex'
export const mixStatus = {
	data(){
		return {
			searchOn:false,
			productFilter2:[]
		}
	},
	computed:{
		...mapGetters('product',['productFilter']),
		newproduct(){
			if(this.searchOn){
				console.log(this.searchOn)
				return this.$store.getters.productFilter3()
			}else{
				console.log('112')
				return this.productFilter2
				
			}
		}
	},
	watch:{
		searchOn:{
			immediate:true,
			handler(val){
				if(val){
					this.confinedata()
					console.log(val,'if1')
				}else{
					this.confinedata()
					console.log(val,'else2')
				}
			}
		}
	},
	created(){
		this.searchProducts()
	},
	methods:{
		...mapActions('product',['searchProducts']),
		confinedata(){
			if(this.searchOn){
				this.productFilter2 = this.$store.getters.productFilter3()
				console.log(this.productFilter2,'confinedata11')
			}else{
				this.productFilter2 = this.productFilter
				console.log(this.productFilter2,'confinedata22')
			}
		}
	}
}
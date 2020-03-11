import { mapState, mapActions, mapGetters } from 'vuex'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
export const mixStatus = {
	data(){
		return {
			gridData:[],
			info:{}
		}
	},
	computed:{
		...mapGetters('product',['productFilter']),
		gridList(){
			if(this.gridData){
				return this.gridData
			}else{
			}
		},
		mixinfo(){
			if(this.info){
				return this.info
			}else{
				return {}
				// alert('no')
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
		...mapActions('user',['info1']),
		async search(){
			let resp =  await this.searchBody.call(this)
			if(resp){
				return (this.gridData = resp)
			}else{
				return null
			}
			return null
		},
		getUserMessage(){
			let token = getToken()
			if(token){
				let resp = this.info1(token)
				resp.then((val)=>{
					this.info = val
				})
			}else{
				this.info = {}
			}
		}
	}
}
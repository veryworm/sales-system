import { mapState, mapActions, mapGetters } from 'vuex'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
export const mixStatus = {
	data(){
		return {
			gridData:[],
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
		// 登录成功提示信息
		loginsuccess(){
			uni.showToast({
				title:'欢迎来到美食客!',
				icon:'none'
			})
			setTimeout(()=>{
				uni.hideToast()
				uni.switchTab({
					url:'../../pages/my/my'
				})
			},1500)
		},
		// 登录失败提示信息
		loginfailed(){
			
		},
		// 退出成功
		logoutnsuccess(){
			uni.showToast({
				title:'退出成功!',
				icon:'none'
			})
			setTimeout(()=>{
				uni.switchTab({
					url:'../../pages/my/my'
				})
			},1500)
		},
		allrefreshtoken(){
			let token = getToken()
			if(token){
				this.info1(token)
			}else{
				uni.showToast({
					title:"token失效,请重新登录",
					icon:'none'
				})
				setTimeout(()=>{
					uni.hideToast()
				},1000)
			}
		}
	}
}
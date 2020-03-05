<template>
	<view>
		<button @click="ll">clickme </button>
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState('shopcar',['orderLines']),
			...mapGetters('product',['productFilter'])
		}, 
		mounted() {
			// this.searchShopData()
		},
		methods: {
			ll(){
				console.log(this.productFilter,'thisff')
			}
		}
	}
</script>

<style>

</style>

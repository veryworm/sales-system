// export function setToken(token){
//     localStorage.setItem("token",token);
// }
// export function getToken(token){
//     return localStorage.getItem("token");
// }
// export function removeToken(token){
//     return localStorage.removeItem("token")
// }
export function setToken(token) {
	uni.setStorage({
		key: 'storage_Token',
		data: token,
		success: function () {
			console.log(token,'success');
		}
	})
} 
export function getToken() {
	let token1;
	uni.getStorage({
		key: 'storage_Token',
		success: function (res) {
			token1 = res.data
		}
	})
	return token1
}
export function removeToken(token) {
	uni.removeStorage({
		key: 'storage_Token',
		success: function (res) {
			console.log('removesuccess');
		}
	})
}
const baseURL = 'http://182.92.66.130:6677'
const Categoryapi= {
	CategoryFindAll:{api:baseURL + '/category/findAll',methods:'GET'},
	CategoryFindByCategoryId:{api:baseURL + '/product/findByCategoryId',methods:'GET'}
}
const Productapi= {
	ProductFindAll:{api:baseURL + '/product/findAll',methods:'GET'},
	ProductFindById:{api:baseURL + '/product/findById',methods:'GET'}
}
const Userapi = {
	Userinfo:{api:'/user/info',methods:'GET'},
	UserLogin:{api:'/user/login',methods:'POST'},
	UserLogout:{api:'/user/logout',methods:'POST'}
}
const UserAddressapi = {
	UserDeleteId:{api:baseURL + '/address/deleteById?id=',methods:'GET'},
	UserfindById:{api:baseURL + '/address/findByCustomerId?id=',methods:'GET'},
	UsersaveOrUpdate:{api:baseURL + '/address/saveOrUpdate',methods:'POST'}
}
const Customerapi = {
	CustomerFind:{api:baseURL + '/customer/findAll',methods:'GET'},
}
const Orderapi = {
	OrderSave:{api:baseURL + '/order/save',methods:'POST'},
	OrderConfirm:{api:baseURL + '/order/takeOrder?orderId=',methods:'GET'},
	OrderFindAll:{api:baseURL + '/order/findAll',methods:'GET'}
}
export {
	Categoryapi,
	Productapi,
	Userapi,
	UserAddressapi,
	Customerapi,
	Orderapi
	
}
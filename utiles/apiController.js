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
	UserDeleteId:{api:'/address/deleteById?id='},
	UserfindById:{api:baseURL + '/address/findByCustomerId?id=',methods:'GET'},
	UsersaveOrUpdate:{api:baseURL + '/address/saveOrUpdate',methods:'POST'}
}
const Customerapi = {
	CustomerFind:{api:baseURL + '/customer/findAll',methods:'GET'},
	CustomerSave:{api:'/customer/saveOrUpdate'}
}
const Commentapi = {
	CommentFind:{api:'/comment/findAll',methods:'GET'},
	CommenSaveOrUpdate:{api:'/comment/saveOrUpdate'}
}
const Orderapi = {
	OrderSave:{api:'/order/save'},
	OrderConfirm:{api:'/order/confirmOrder?orderId='},
	OrderFindAll:{api:baseURL + '/order/findAll'},
	OrderFindById:{api:'/order/getOrderLinesByOrderId?orderId='},
	OrderDeleteById:{api:'/order/deleteById?id='}
}
export {
	Categoryapi,
	Productapi,
	Userapi,
	UserAddressapi,
	Customerapi,
	Orderapi,
	Commentapi
	
}
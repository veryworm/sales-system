const baseURL = 'http://182.92.66.130:6677'
const Categoryapi= {
	CategoryFindAll:{api:baseURL + '/category/findAll',methods:'GET'},
	CategoryFindByCategoryId:{api:baseURL + '/product/findByCategoryId',methods:'GET'}
}
const Productapi= {
	ProductFindAll:{api:baseURL + '/product/findAll',methods:'GET'},
	ProductFindById:{api:baseURL + '/product/findById',methods:'GET'}
} 
export {
	Categoryapi,
	Productapi
}
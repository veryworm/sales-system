(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-nav-bar1/uni-nav-bar"],{"2e09":function(t,n,e){},5264:function(t,n,e){"use strict";var i=e("2e09"),u=e.n(i);u.a},"60e4":function(t,n,e){"use strict";var i,u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",function(){return u}),e.d(n,"c",function(){return o}),e.d(n,"a",function(){return i})},6650:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){return e.e("components/uni-status-bar/uni-status-bar").then(e.bind(null,"c1e9"))},u=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"e412"))},o={name:"UniNavBar",components:{uniStatusBar:i,uniIcons:u},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[String,Boolean],default:!1},border:{type:[String,Boolean],default:!0}},mounted:function(){t.report&&""!==this.title&&t.report("title",this.title)},methods:{onClickLeft:function(){this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")}}};n.default=o}).call(this,e("543d")["default"])},"6b8b":function(t,n,e){"use strict";e.r(n);var i=e("6650"),u=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);n["default"]=u.a},c409:function(t,n,e){"use strict";e.r(n);var i=e("60e4"),u=e("6b8b");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("5264");var r,a=e("f0c5"),c=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"a81e2fe8",null,!1,i["a"],r);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-nav-bar1/uni-nav-bar-create-component',
    {
        'components/uni-nav-bar1/uni-nav-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c409"))
        })
    },
    [['components/uni-nav-bar1/uni-nav-bar-create-component']]
]);

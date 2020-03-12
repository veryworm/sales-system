(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-card/my-card"],{"509c":function(t,n,o){},"5c76":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;o("2f62");var c={data:function(){return{test:{}}},props:{categoryData:{type:Array,default:function(){return["加载中.."]}}},computed:{},watch:{},methods:{skipGoodsAllHandler:function(n,o){console.log(n,"item"),t.navigateTo({url:"../../pages/good_all_function/good_all_function?item="+JSON.stringify(n)})},scroll:function(t){console.log(t),this.old.scrollTop=t.detail.scrollTop}}};n.default=c}).call(this,o("543d")["default"])},c0cc:function(t,n,o){"use strict";o.r(n);var c=o("c705"),e=o("daf7");for(var a in e)"default"!==a&&function(t){o.d(n,t,function(){return e[t]})}(a);o("f5f2");var u,r=o("f0c5"),l=Object(r["a"])(e["default"],c["b"],c["c"],!1,null,null,null,!1,c["a"],u);n["default"]=l.exports},c705:function(t,n,o){"use strict";var c,e=function(){var t=this,n=t.$createElement,c=(t._self._c,o("f589"));t.$mp.data=Object.assign({},{$root:{m0:c}})},a=[];o.d(n,"b",function(){return e}),o.d(n,"c",function(){return a}),o.d(n,"a",function(){return c})},daf7:function(t,n,o){"use strict";o.r(n);var c=o("5c76"),e=o.n(c);for(var a in c)"default"!==a&&function(t){o.d(n,t,function(){return c[t]})}(a);n["default"]=e.a},f5f2:function(t,n,o){"use strict";var c=o("509c"),e=o.n(c);e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-card/my-card-create-component',
    {
        'components/my-card/my-card-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c0cc"))
        })
    },
    [['components/my-card/my-card-create-component']]
]);

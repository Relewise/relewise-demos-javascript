"use strict";(self["webpackChunkrelewise_demo"]=self["webpackChunkrelewise_demo"]||[]).push([[224],{89:function(e,a){a.Z=(e,a)=>{const t=e.__vccOpts||e;for(const[l,r]of a)t[l]=r;return t}},1471:function(e,a,t){t.d(a,{Z:function(){return k}});var l=t(3396),r=t(4870),s=t(7139),i=t(9242),n=t(1107);function u(e,a){return(0,l.wg)(),(0,l.iD)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[(0,l._)("path",{"fill-rule":"evenodd",d:"M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 11-1.06 1.06L18 10.81V21a.75.75 0 01-1.5 0V10.81l-2.47 2.47a.75.75 0 11-1.06-1.06l3.75-3.75zM2.25 9A.75.75 0 013 8.25h9.75a.75.75 0 010 1.5H3A.75.75 0 012.25 9zm0 4.5a.75.75 0 01.75-.75h5.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z","clip-rule":"evenodd"})])}function o(e,a){return(0,l.wg)(),(0,l.iD)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[(0,l._)("path",{"fill-rule":"evenodd",d:"M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 8.25h9.75a.75.75 0 010 1.5H3A.75.75 0 012.25 9zm15-.75A.75.75 0 0118 9v10.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V9a.75.75 0 01.75-.75zm-15 5.25a.75.75 0 01.75-.75h9.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z","clip-rule":"evenodd"})])}const c=["src"],d={class:"block text-gray-500"},p={class:"text-xs"},v={class:"flex gap-2 items-center"},g={class:"text-xs font-semibold"},w={key:0,class:"line-through text-gray-500 mr-2"},m={key:0,class:"bg-gray-100 text-gray-700 text-sm p-3 my-3"};var f=(0,l.aZ)({__name:"Products",props:{products:{type:Array}},setup(e){const a=e,t=n.Z.context,f=(0,r.iH)(null),{products:h}=(0,r.BK)(a);function y(e){f.value===e.productId?f.value=null:f.value=e.productId}function k(e){return JSON.stringify(e,void 0,4)}return(e,a)=>{const n=(0,l.up)("router-link");return(0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,r.SU)(h),(a=>((0,l.wg)(),(0,l.iD)("div",{key:a.productId,class:"mb-1 pb-1 flex border-b border-solid border-gray-300"},[a.data&&(0,r.SU)(t).imageUrlDataKey?((0,l.wg)(),(0,l.iD)("img",{key:0,height:"75",width:"75",src:a.data[(0,r.SU)(t).imageUrlDataKey]?.value??"/512x512.png",class:"mr-3"},null,8,c)):(0,l.kq)("",!0),(0,l._)("div",null,[(0,l._)("span",d,[(0,l.Uk)((0,s.zw)(a.productId)+" ",1),(0,l._)("span",p,"(Rank: "+(0,s.zw)(a.rank)+")",1)]),(0,l._)("div",v,[(0,l.Wm)(n,{to:{name:"product",query:{id:a.productId}},class:(0,s.C_)(a.displayName?"":"italic")},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(a.displayName??"No DisplayName"),1)])),_:2},1032,["to","class"]),f.value==a.productId?((0,l.wg)(),(0,l.j4)((0,r.SU)(u),{key:0,onClick:e=>y(a),class:"h-4 w-4 text-gray-500 inline-block cursor-pointer"},null,8,["onClick"])):((0,l.wg)(),(0,l.j4)((0,r.SU)(o),{key:1,onClick:e=>y(a),class:"h-4 w-4 text-gray-500 inline-block cursor-pointer"},null,8,["onClick"]))]),(0,l._)("div",g,[a.salesPrice!==a.listPrice?((0,l.wg)(),(0,l.iD)("span",w,(0,s.zw)(e.$format(a.listPrice)),1)):(0,l.kq)("",!0),(0,l._)("span",null,(0,s.zw)(e.$format(a.salesPrice)),1)]),(0,l.Wm)(i.uT,null,{default:(0,l.w5)((()=>[f.value==a.productId?((0,l.wg)(),(0,l.iD)("pre",m,(0,s.zw)(k(a)),1)):(0,l.kq)("",!0)])),_:2},1024)])])))),128)}}}),h=t(89);const y=(0,h.Z)(f,[["__scopeId","data-v-e82cbfd0"]]);var k=y},2461:function(e,a,t){t.r(a),t.d(a,{default:function(){return h}});var l=t(3396),r=t(7139),s=t(9242),i=t(3791),n=t(4870),u=t(1471),o=t(1107);const c={class:"search"},d={class:"mb-5"},p=(0,l._)("option",{value:null,disabled:""},"Choose a category",-1),v=["value"],g={key:0},w={class:"text-xl font-semibold mb-2"};var m=(0,l.aZ)({__name:"ProductsInCategorySearch",setup(e){const a=(0,n.iH)(null),t=(0,n.iH)(null),m=(0,n.iH)(null),f=o.Z.getSearcher();async function h(){const e=m.value?.value?.id;if(!e)return;const t=new i.ProductSearchBuilder(o.Z.defaultSettings).setSelectedProductProperties(o.Z.selectedProductProperties).setSelectedVariantProperties({allData:!0,displayName:!0}).pagination((e=>e.setPageSize(30))).filters((a=>a.addProductCategoryIdFilter("ImmediateParent",[e]))).build(),l=await f.searchProducts(t);o.Z.assertApiCall(l),l&&(a.value=l)}async function y(){const e=new i.ProductSearchBuilder(o.Z.defaultSettings).setSelectedProductProperties(o.Z.selectedProductProperties).setSelectedVariantProperties({allData:!0,displayName:!0}).facets((e=>e.addCategoryFacet("ImmediateParent"))).pagination((e=>e.setPageSize(30))).build(),a=await f.searchProducts(e);if(o.Z.assertApiCall(a),a?.facets?.items&&a?.facets?.items[0]){const e=a?.facets?.items[0];e.available=e.available?.sort(((e,a)=>k(e).localeCompare(k(a))??0)),t.value=e}}function k(e){return e.value?.displayName??e.value?.id??""}return y(),(e,i)=>((0,l.wg)(),(0,l.iD)("div",c,[(0,l._)("div",d,[t.value?(0,l.wy)(((0,l.wg)(),(0,l.iD)("select",{key:0,"onUpdate:modelValue":i[0]||(i[0]=e=>m.value=e),onChange:h},[p,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.value.available,(e=>((0,l.wg)(),(0,l.iD)("option",{value:e,key:e.value?.id??""},(0,r.zw)(k(e))+" ("+(0,r.zw)(e.hits)+")",9,v)))),128))],544)),[[s.bM,m.value]]):(0,l.kq)("",!0)]),m.value&&a.value&&a.value?.results&&a.value.results.length>0?((0,l.wg)(),(0,l.iD)("div",g,[(0,l._)("h2",w,"Showing results in '"+(0,r.zw)(k(m.value))+"' ("+(0,r.zw)(a.value.results.length)+" of "+(0,r.zw)(a.value.hits)+")",1),(0,l.Wm)(u.Z,{products:a.value?.results},null,8,["products"])])):(0,l.kq)("",!0)]))}});const f=m;var h=f}}]);
//# sourceMappingURL=ProductsInCategorySearch.3b9a30dd.js.map
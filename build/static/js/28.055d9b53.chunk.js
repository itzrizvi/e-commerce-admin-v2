(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[28],{1019:function(e,t,a){"use strict";a.r(t);a(307);var n=a(82),l=(a(376),a(652)),i=(a(374),a(302)),r=(a(277),a(90)),d=(a(377),a(308)),o=(a(143),a(74)),u=(a(201),a(65)),s=(a(131),a(63)),c=(a(306),a(222)),m=(a(132),a(47)),p=(a(133),a(73)),v=a(60),E=(a(119),a(41)),b=(a(167),a(35)),g=a(92),f=a(107),y=a(7),h=(a(200),a(27)),O=a(15),_=(a(673),a(679)),S=a(0),j=a.n(S),A=a(22),C=a.n(A),T=a(120),I=a(101),D=a(100),P=a(99),q=a(59),x=a(10),R=a(33),z=a(632),N=a(31),B=a(23),k=a(156),w=a(217),U=a(700),L=a(48),G=a(305),$=["id","createdAt","updatedAt","__typename","type","isDefault"],V=["id","createdAt","updatedAt","__typename","type","isDefault"],M=_.a.Text,F=_.a.Paragraph,H={id:"",prod_name:"",quantity:1,price:0};t.default=function(){var e,t,a,A,Z,Q,Y,J,K,W,X,ee,te,ae,ne,le,ie,re,de,oe,ue,se,ce,me,pe,ve,Ee,be,ge,fe,ye,he,Oe;Object(B.c)("order");var _e=Object(q.useHistory)(),Se=Object(S.useState)(!1),je=Object(O.a)(Se,2),Ae=je[0],Ce=je[1],Te=Object(L.d)((function(e){return e.auth.token})),Ie=h.a.useForm(),De=Object(O.a)(Ie,1)[0],Pe=h.a.useForm(),qe=Object(O.a)(Pe,1)[0],xe=Object(q.useParams)(),Re=Object(S.useState)([]),ze=Object(O.a)(Re,2),Ne=ze[0],Be=ze[1],ke=Object(S.useState)({}),we=Object(O.a)(ke,2),Ue=we[0],Le=we[1],Ge=Object(S.useState)([]),$e=Object(O.a)(Ge,2),Ve=$e[0],Me=$e[1],Fe=Object(S.useState)([]),He=Object(O.a)(Fe,2),Ze=He[0],Qe=He[1],Ye=Object(S.useState)([]),Je=Object(O.a)(Ye,2),Ke=Je[0],We=Je[1],Xe=Object(S.useRef)(),et=Object(S.useState)([]),tt=Object(O.a)(et,2),at=tt[0],nt=tt[1],lt=Object(S.useState)(null),it=Object(O.a)(lt,2),rt=it[0],dt=it[1],ot=Object(S.useState)("00.0"),ut=Object(O.a)(ot,2),st=ut[0],ct=ut[1],mt=Object(S.useState)([]),pt=Object(O.a)(mt,2),vt=pt[0],Et=pt[1],bt=Object(S.useState)([]),gt=Object(O.a)(bt,2),ft=gt[0],yt=gt[1],ht=Object(S.useState)(null),Ot=Object(O.a)(ht,2),_t=Ot[0],St=Ot[1],jt=Object(S.useState)(0),At=Object(O.a)(jt,2),Ct=At[0],Tt=At[1],It=Object(S.useState)({data:{},isLoading:!0}),Dt=Object(O.a)(It,2),Pt=Dt[0],qt=Dt[1],xt=Object(S.useState)(!1),Rt=Object(O.a)(xt,2),zt=Rt[0],Nt=Rt[1],Bt=Object(S.useState)(!1),kt=Object(O.a)(Bt,2),wt=kt[0],Ut=kt[1],Lt=Object(S.useState)(null),Gt=Object(O.a)(Lt,2),$t=Gt[0],Vt=Gt[1],Mt=Object(S.useState)(!1),Ft=Object(O.a)(Mt,2),Ht=Ft[0],Zt=Ft[1],Qt=Object(S.useState)(null),Yt=Object(O.a)(Qt,2),Jt=Yt[0],Kt=Yt[1],Wt=Object(S.useState)(null),Xt=Object(O.a)(Wt,2),ea=Xt[0],ta=Xt[1],aa=Object(S.useState)(null),na=Object(O.a)(aa,2),la=na[0],ia=na[1],ra=Object(S.useState)(!1),da=Object(O.a)(ra,2),oa=da[0],ua=da[1],sa=Object(S.useState)(null),ca=Object(O.a)(sa,2),ma=ca[0],pa=ca[1],va=[{title:"Product",dataIndex:"prod_name",key:"prod_name",width:400,render:function(e,t){return j.a.createElement(b.a,{placeholder:"Select Product",options:at,defaultValue:t.prod_name,showSearch:!0,allowClear:!0,optionFilterProp:"label",style:{width:400},onSearch:function(e){e.length>3?R.j.query({query:U.a.SEARCH_PRODUCT,variables:{query:{searchQuery:e}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSearchedProducts;a.status&&nt(a.data.map((function(e){return Object(y.a)({label:null===e||void 0===e?void 0:e.prod_name,value:null===e||void 0===e?void 0:e.id},e)})))})):nt([])},onSelect:function(e,a){var n,l=Object(f.a)(Ke);try{for(l.s();!(n=l.n()).done;){if(n.value.id===a.id)return We((function(e){return e.filter((function(e){return e.id!==rt}))})),N.b.info("Duplicate Product Found!")}}catch(i){l.e(i)}finally{l.f()}We((function(e){return[].concat(Object(g.a)(e.filter((function(e){return e.id!==t.id}))),Object(g.a)(e.filter((function(e){return e.id===t.id})).map((function(e){return Object(y.a)(Object(y.a)({},e),{},{id:a.id,price:0===a.prod_sale_price?a.prod_regular_price:a.prod_sale_price,prod_name:a.prod_name,quantity:1})}))))}))}})}},{title:"U. Price",dataIndex:"price",key:"price",width:150,render:function(e,t){return"$".concat(e)}},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(e,t){return"$".concat(parseFloat(e)*t.quantity)}},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:150,render:function(e,t){return j.a.createElement(E.a,{min:0,type:"number",defaultValue:e,onChange:function(e){e.persist(),We((function(a){return a.map((function(a){return a.id===t.id?Object(y.a)(Object(y.a)({},a),{},{quantity:parseInt(e.target.value)}):a}))}))}})}},{title:"Action",dataIndex:"id",key:"id",width:100,align:"center",render:function(e){return j.a.createElement(P.a,{size:"small",title:"Remove",type:"danger",onClick:function(){We((function(t){return t.filter((function(t){return(null===t||void 0===t?void 0:t.id)!==e}))}))}},j.a.createElement(C.a,{icon:"trash-2"}))}}];Object(S.useEffect)((function(){R.j.query({query:U.a.GET_SHIPPING_METHOD_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getShippingMethodListPublic;a.status&&Et(null===a||void 0===a?void 0:a.data)})),R.j.query({query:G.a.GET_SINGLE_ORDER_ADMIN,variables:{query:{order_id:parseInt(xe.id)}},context:{headers:{TENANTID:"100001",Authorization:Te}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l,i,r,d,o,u,s=e.data.getSingleOrderAdmin;if(!s.status)return N.b.error(s.message);qt({data:s.data,isLoading:!1});var c,m,p,v,E,b,g,f=[],y=[],h=null===s||void 0===s||null===(t=s.data)||void 0===t?void 0:t.orderitems.map((function(e){var t,a;return{id:null===e||void 0===e||null===(t=e.product)||void 0===t?void 0:t.id,price:null===e||void 0===e?void 0:e.price,prod_name:null===e||void 0===e||null===(a=e.product)||void 0===a?void 0:a.prod_name,quantity:null===e||void 0===e?void 0:e.quantity}}));(We(h),Kt(null),ta(null),Le(null===s||void 0===s||null===(a=s.data)||void 0===a?void 0:a.customer),null===s||void 0===s||null===(n=s.data)||void 0===n||null===(l=n.customer)||void 0===l||null===(i=l.addresses)||void 0===i||i.forEach((function(e){"billing"===e.type&&f.push(e),"shipping"===e.type&&y.push(e),"billing"===e.type&&e.isDefault&&Kt(e),"shipping"===e.type&&e.isDefault&&ta(e)})),Me(f),Qe(y),St(null===s||void 0===s||null===(r=s.data)||void 0===r||null===(d=r.coupon)||void 0===d?void 0:d.id),null===s||void 0===s||null===(o=s.data)||void 0===o?void 0:o.coupon)&&("flat"===(null===s||void 0===s||null===(c=s.data)||void 0===c||null===(m=c.coupon)||void 0===m?void 0:m.coupon_type)?ct(null===s||void 0===s||null===(p=s.data)||void 0===p||null===(v=p.coupon)||void 0===v?void 0:v.coupon_amount):ct((null===s||void 0===s||null===(E=s.data)||void 0===E?void 0:E.total)/100*(null===s||void 0===s||null===(b=s.data)||void 0===b||null===(g=b.coupon)||void 0===g?void 0:g.coupon_amount)));Tt(null===s||void 0===s||null===(u=s.data)||void 0===u?void 0:u.shipping_cost)})),R.j.query({query:G.a.GET_ORDER_STATUS_LIST,context:{headers:{TENANTID:"100001",Authorization:Te}}}).then((function(e){var t,a,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderStatusList;if(n.status){var l=null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.map((function(e){return Object(y.a)(Object(y.a)({},e),{},{value:e.id,label:e.name})}));yt(l)}}))}),[]);var Ea=function(e,t){Vt(t),e?(Ut(!0),ia("billing"===t?Ve.filter((function(t){return t.id===e}))[0]:Ze.filter((function(t){return t.id===e}))[0])):(ia(null),qe.resetFields(),Ut(!1)),Nt(!0)},ba=function(e){Zt(!0),Vt(e)};return Object(S.useEffect)((function(){(null===Ue||void 0===Ue?void 0:Ue.id)&&setTimeout((function(){R.j.query({query:R.i.GET_SINGLE_CUSTOMER,variables:{customer_id:null===Ue||void 0===Ue?void 0:Ue.id},context:{headers:{TENANTID:"100001",Authorization:Te}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;if(null===l||void 0===l?void 0:l.status){var i=[],r=[];Kt(null),ta(null),null===l||void 0===l||null===(a=l.data)||void 0===a||null===(n=a.addresses)||void 0===n||n.forEach((function(e){"billing"===e.type&&r.push(e),"shipping"===e.type&&i.push(e),"billing"===e.type&&e.isDefault&&Kt(e),"shipping"===e.type&&e.isDefault&&ta(e)})),Me(r),Qe(i)}}))}),2e3)}),[oa]),j.a.createElement(j.a.Fragment,null,j.a.createElement(T.a,{title:"Manage Order | Edit Order ".concat((null===Pt||void 0===Pt||null===(e=Pt.data)||void 0===e?void 0:e.id)?"(".concat(null===Pt||void 0===Pt||null===(t=Pt.data)||void 0===t?void 0:t.id,")"):"")}),j.a.createElement(I.b,null,j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{sm:24,xs:24},j.a.createElement(D.a,{headless:!0},Pt.isLoading?j.a.createElement("div",{className:"spin"},j.a.createElement(p.a,null)):j.a.createElement(h.a,{ref:Xe,style:{width:"100%"},form:De,name:"updateOrder",onFinish:function(){var e;Ce(!0);var t=Ke.map((function(e){return{product_id:e.id,quantity:e.quantity}})),a=De.getFieldsValue(!0);R.a.mutate({mutation:G.a.UPDATE_ORDER,variables:{data:Object(y.a)(Object(y.a)({},a),{},{order_id:null===Pt||void 0===Pt||null===(e=Pt.data)||void 0===e?void 0:e.id,coupon_id:_t,orderItems:t})},context:{headers:{TENANTID:"100001",Authorization:Te}},refetchQueries:[{query:G.a.GET_ALL_ORDER,context:{headers:{TENANTID:"100001",Authorization:Te}}},["getOrderlistAdmin"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateOrder;if(!(null===a||void 0===a?void 0:a.status))return N.b.error(null===a||void 0===a?void 0:a.message);N.b.success(a.message),setTimeout((function(){_e.push("/admin/order/list")}),1e3)})).catch((function(e){N.b.error("Something Went wrong !!")})).finally((function(){return Ce(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},layout:"vertical"},j.a.createElement(s.a,{style:{marginTop:40}},j.a.createElement(m.a,{span:24},j.a.createElement(u.a,null,j.a.createElement(u.a.TabPane,{tab:"Customer",key:"customer"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{md:12,sm:24},j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please select a customer"}],label:"Customer"},j.a.createElement(b.a,{placeholder:"Select a customer",options:Ne,showSearch:!0,allowClear:!0,optionFilterProp:"label",disabled:!0,defaultValue:null===Pt||void 0===Pt||null===(a=Pt.data)||void 0===a||null===(A=a.customer)||void 0===A?void 0:A.id,onSelect:function(e,t){var a,n;Le(t.item);var l=[],i=[];null===t||void 0===t||null===(a=t.item)||void 0===a||null===(n=a.addresses)||void 0===n||n.forEach((function(e){"billing"===e.type&&l.push(e),"shipping"===e.type&&i.push(e)})),Me(l),Qe(i)},onSearch:function(e){e.length>3?R.j.query({query:U.a.GET_SEARCH_CUSTOMER,variables:{query:{searchQuery:e}},context:{headers:{TENANTID:"100001",Authorization:Te}}}).then((function(e){var t,a=e.data.getSearchedCustomers;if(!a.status)return N.b.error(a.message);var n=null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.map((function(e){return{label:e.email,value:e.id,item:e}}));Be(n)})):Be([])}}))),j.a.createElement(m.a,{md:12,sm:24},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,null,(null===Pt||void 0===Pt||null===(Z=Pt.data)||void 0===Z||null===(Q=Z.customer)||void 0===Q?void 0:Q.image)?j.a.createElement(c.a,{size:{xs:24,sm:32,md:40,lg:64,xl:80,xxl:100},src:Object(k.renderImage)(null===Pt||void 0===Pt||null===(Y=Pt.data)||void 0===Y||null===(J=Y.customer)||void 0===J?void 0:J.id,null===Pt||void 0===Pt||null===(K=Pt.data)||void 0===K||null===(W=K.customer)||void 0===W?void 0:W.image,"user","",!0)},j.a.createElement(w.LazyLoadImage,{effect:"blur",width:100,height:100,src:Object(k.renderImage)(null===Pt||void 0===Pt||null===(X=Pt.data)||void 0===X||null===(ee=X.customer)||void 0===ee?void 0:ee.id,null===Pt||void 0===Pt||null===(te=Pt.data)||void 0===te||null===(ae=te.customer)||void 0===ae?void 0:ae.image,"user","",!0),onError:k.errorImageSrc,alt:null===Pt||void 0===Pt||null===(ne=Pt.data)||void 0===ne||null===(le=ne.customer)||void 0===le?void 0:le.id})):j.a.createElement(c.a,{size:{xs:24,sm:32,md:40,lg:64,xl:80,xxl:100},src:"/no-image.png"})),j.a.createElement(m.a,null,j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"ID: "),null===Pt||void 0===Pt||null===(ie=Pt.data)||void 0===ie||null===(re=ie.customer)||void 0===re?void 0:re.id),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Name: "),"".concat(null===Pt||void 0===Pt||null===(de=Pt.data)||void 0===de||null===(oe=de.customer)||void 0===oe?void 0:oe.first_name," ").concat(null===Pt||void 0===Pt||null===(ue=Pt.data)||void 0===ue||null===(se=ue.customer)||void 0===se?void 0:se.last_name)),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Email: "),null===Pt||void 0===Pt||null===(ce=Pt.data)||void 0===ce||null===(me=ce.customer)||void 0===me?void 0:me.email)))))),j.a.createElement(u.a.TabPane,{tab:"Products",key:"products"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{lg:18,md:16,sm:24},j.a.createElement("span",{className:"psp_list"},j.a.createElement(o.a,{className:"table-responsive",columns:va,dataSource:Ke,pagination:!1,rowKey:"id",rowClassName:function(e,t){return t%2===0?"":"altTableClass"}}),j.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px",paddingRight:"18px"}},j.a.createElement(P.a,{onClick:function(){var e=(new Date).getTime();dt(e),We((function(t){return[].concat(Object(g.a)(t),[Object(y.a)(Object(y.a)({},H),{},{id:e})])})),nt([])},size:"small",title:"Add Product",htmlType:"button",type:"primary"},j.a.createElement(C.a,{icon:"plus-circle"}))))),j.a.createElement(m.a,{lg:6,md:8,sm:24},j.a.createElement(d.a,{title:"Summary",bordered:!0,size:"small",headStyle:{backgroundColor:"#5f63f24d",borderTopLeftRadius:3,borderTopRightRadius:3}},j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Sub Total Price : "),"$",Ke.reduce((function(e,t){return e+t.quantity*t.price}),0)),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Product Quantity : "),Ke.reduce((function(e,t){return e+t.quantity}),0)),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Discount : "),"$",st),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Shipping Cost : "),"$",Ct)," ",j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Total Price : "),"$",Ke.reduce((function(e,t){return e+t.quantity*t.price}),0)+Ct-st))))),j.a.createElement(u.a.TabPane,{tab:"Addresses",key:"addresses"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{lg:12,sm:24},j.a.createElement(P.a,{size:"small",style:{float:"right",zIndex:1e3,marginTop:-10,marginBottom:10},title:"Add shipping address",htmlType:"button",type:"primary",onClick:function(){return Ea(null,"shipping")}},j.a.createElement(C.a,{icon:"plus-circle"})),j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Select Shipping Address"}],name:"shipping_address_id",label:"Shipping Addresses",initialValue:null===ea||void 0===ea?void 0:ea.id},j.a.createElement(r.a.Group,{style:{width:"100%",padding:10}},j.a.createElement(s.a,{gutter:25},ea&&j.a.createElement(m.a,{key:null===ea||void 0===ea?void 0:ea.id,xs:24},j.a.createElement(P.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Change Shipping Address",htmlType:"button",type:"info",onClick:function(){return ba("shipping")}},j.a.createElement(C.a,{icon:"repeat"})),j.a.createElement(r.a,{style:{width:"100%",border:"1px solid #f0f0f0",fontSize:12,marginBottom:10,padding:10,borderRadius:5},value:null===ea||void 0===ea?void 0:ea.id},j.a.createElement("p",null,j.a.createElement("b",null,"Email: "),null===ea||void 0===ea?void 0:ea.email),j.a.createElement("p",null,j.a.createElement("b",null,"Phone: "),null===ea||void 0===ea?void 0:ea.phone),j.a.createElement("p",null,j.a.createElement("b",null,"Address 1: "),(null===ea||void 0===ea?void 0:ea.address1)&&Object(B.a)(null===ea||void 0===ea?void 0:ea.address1,35)),j.a.createElement("p",null,j.a.createElement("b",null,"Address 2: "),(null===ea||void 0===ea?void 0:ea.address2)&&Object(B.a)(null===ea||void 0===ea?void 0:ea.address2,35)),j.a.createElement("p",null,j.a.createElement("b",null,"City: "),null===ea||void 0===ea?void 0:ea.city),j.a.createElement("p",null,j.a.createElement("b",null,"State: "),null===ea||void 0===ea?void 0:ea.state),j.a.createElement("p",null,j.a.createElement("b",null,"Zip Code: "),null===ea||void 0===ea?void 0:ea.zip_code))))))),j.a.createElement(m.a,{lg:12,sm:24},j.a.createElement(P.a,{size:"small",style:{float:"right",zIndex:1e3,marginTop:-10,marginBottom:10},title:"Add Billing address",htmlType:"button",type:"primary",onClick:function(){return Ea(null,"billing")}},j.a.createElement(C.a,{icon:"plus-circle"})),j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Select Billing Address"}],name:"billing_address_id",label:"Billing Addresses",initialValue:null===Jt||void 0===Jt?void 0:Jt.id},j.a.createElement(r.a.Group,{style:{width:"100%",padding:10}},j.a.createElement(s.a,{gutter:25},Jt&&j.a.createElement(m.a,{key:null===Jt||void 0===Jt?void 0:Jt.id,xs:24},j.a.createElement(P.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Change Billing Address",htmlType:"button",type:"info",onClick:function(){return ba("billing")}},j.a.createElement(C.a,{icon:"repeat"})),j.a.createElement(r.a,{style:{width:"100%",border:"1px solid #f0f0f0",fontSize:12,marginBottom:10,padding:10,borderRadius:5},value:null===Jt||void 0===Jt?void 0:Jt.id},j.a.createElement("p",null,j.a.createElement("b",null,"Email: "),null===Jt||void 0===Jt?void 0:Jt.email),j.a.createElement("p",null,j.a.createElement("b",null,"Phone: "),null===Jt||void 0===Jt?void 0:Jt.phone),j.a.createElement("p",null,j.a.createElement("b",null,"Address 1: "),(null===Jt||void 0===Jt?void 0:Jt.address1)&&Object(B.a)(null===Jt||void 0===Jt?void 0:Jt.address1,35)),j.a.createElement("p",null,j.a.createElement("b",null,"Address 2: "),(null===Jt||void 0===Jt?void 0:Jt.address2)&&Object(B.a)(null===Jt||void 0===Jt?void 0:Jt.address2,35)),j.a.createElement("p",null,j.a.createElement("b",null,"City: "),null===Jt||void 0===Jt?void 0:Jt.city),j.a.createElement("p",null,j.a.createElement("b",null,"State: "),null===Jt||void 0===Jt?void 0:Jt.state),j.a.createElement("p",null,j.a.createElement("b",null,"Zip Code: "),null===Jt||void 0===Jt?void 0:Jt.zip_code))))))))),j.a.createElement(u.a.TabPane,{tab:"Shipping",key:"shipping"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{sm:24},j.a.createElement(h.a.Item,{name:"shipping_method_id",label:"Shipping Method",rules:[{required:!0,message:"Select Shipping Method"}],initialValue:null===Pt||void 0===Pt||null===(pe=Pt.data)||void 0===pe||null===(ve=pe.shippingmethod)||void 0===ve?void 0:ve.id},j.a.createElement(r.a.Group,{style:{width:"100%",padding:10},defaultValue:null===Pt||void 0===Pt||null===(Ee=Pt.data)||void 0===Ee||null===(be=Ee.shippingmethod)||void 0===be?void 0:be.id},vt.map((function(e){return j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{key:e.id,xs:8},j.a.createElement(r.a,{style:{width:"100%",border:"1px solid #f0f0f0",fontSize:12,marginBottom:10,padding:10,borderRadius:5},value:e.id},j.a.createElement(_.a.Title,{level:4},e.name),j.a.createElement(_.a.Text,null,null===e||void 0===e?void 0:e.description))))}))))))),j.a.createElement(u.a.TabPane,{tab:"Voucher & Status",key:"voucher-status"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{lg:18,xs:24},j.a.createElement(h.a.Item,{label:"Voucher Code"},j.a.createElement(E.a.Search,{placeholder:"Input Voucher Code",enterButton:"Apply Voucher",size:"large",onSearch:function(e){R.j.query({query:U.a.GET_COUPON_BY_CODE,variables:{query:{coupon_code:e}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCouponByCode;n.status?("percentage"===n.data.coupon_type?ct(total.price/100*n.data.coupon_amount):ct(n.data.coupon_amount),St(null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.id),N.b.success(n.message)):N.b.error(n.message)}))},defaultValue:_t,onChange:function(e){0===e.target.value.length&&(St(""),ct(0),N.b.warn("Voucher Removed!"))}})),j.a.createElement(h.a.Item,{name:"order_status_id",label:"Order Status",rules:[{required:!0,message:"Select Order Status"}],initialValue:null===Pt||void 0===Pt||null===(ge=Pt.data)||void 0===ge||null===(fe=ge.orderstatus)||void 0===fe?void 0:fe.id},j.a.createElement(b.a,{placeholder:"Select Order Status",options:ft,optionFilterProp:"label",defaultValue:null===Pt||void 0===Pt||null===(ye=Pt.data)||void 0===ye||null===(he=ye.orderstatus)||void 0===he?void 0:he.id}))),j.a.createElement(m.a,{lg:6,xs:24},j.a.createElement(d.a,{title:"Summary",bordered:!0,size:"small",headStyle:{backgroundColor:"#5f63f24d",borderTopLeftRadius:3,borderTopRightRadius:3}},j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Sub Total Price : "),"$",Ke.reduce((function(e,t){return e+t.quantity*t.price}),0)),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Product Quantity : "),Ke.reduce((function(e,t){return e+t.quantity}),0)),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Discount : "),"$",st),j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Shipping Cost : "),"$",Ct)," ",j.a.createElement(F,null,j.a.createElement(M,{strong:!0},"Total Price : "),"$",Ke.reduce((function(e,t){return e+t.quantity*t.price}),0)+Ct-st)))))),j.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},j.a.createElement(h.a.Item,null,j.a.createElement(P.a,{loading:Ae,size:"default",htmlType:"submit",type:"primary",raised:!0},Ae?"Processing":"Update Order"),j.a.createElement(x.b,{to:"/admin/order/list"},j.a.createElement(P.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel")))))))))),j.a.createElement(l.a,{title:wt?"Update ".concat($t," address"):"Add ".concat($t," address"),style:{top:20},width:600,open:zt,destroyOnClose:!0,okText:wt?"Update":"Save",onOk:function(){return function(e){var t=qe.getFieldValue();ua(!1);var a=[],n=[];la?("billing"===e?a=Ve.map((function(e){var a=e.id,n=(e.createdAt,e.updatedAt,e.__typename,e.type,e.isDefault),l=Object(v.a)(e,$);return t.isDefault&&(n=!1),(null===la||void 0===la?void 0:la.id)===a&&(l=t),Object(y.a)({parent_id:null===Ue||void 0===Ue?void 0:Ue.id,isDefault:n,id:a,isNew:!1},l)})):n=Ze.map((function(e){var a=e.id,n=(e.createdAt,e.updatedAt,e.__typename,e.type,e.isDefault),l=Object(v.a)(e,V);return t.isDefault&&(n=!1),(null===la||void 0===la?void 0:la.id)===a&&(l=t),Object(y.a)({parent_id:null===Ue||void 0===Ue?void 0:Ue.id,id:a,isDefault:n,isNew:!1},l)})),R.j.mutate({mutation:z.a.UPDATE_CUSTOMER_ADDRESSES,variables:{data:{ref_id:null===Ue||void 0===Ue?void 0:Ue.id,type:e,addresses:Object(g.a)("billing"===e?a:n)}},context:{headers:{TENANTID:"100001",Authorization:Te}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomerAddress;(null===a||void 0===a?void 0:a.status)&&(ua(!0),Nt(!1))}))):("billing"===e?a.push(Object(y.a)({parent_id:null===Ue||void 0===Ue?void 0:Ue.id},t)):n.push(Object(y.a)({parent_id:null===Ue||void 0===Ue?void 0:Ue.id},t)),R.j.mutate({mutation:"billing"===e?z.a.ADD_CUSTOMER_BILLING_ADDRESS:z.a.ADD_CUSTOMER_SHIPPING_ADDRESS,variables:{data:{addresses:Object(g.a)("billing"===e?a:n)}},context:{headers:{TENANTID:"100001",Authorization:Te}}}).then((function(t){var a,n,l="billing"===e?null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.addCustomerBillingAddress:null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.addCustomerShippingAddress;(null===l||void 0===l?void 0:l.status)&&(ua(!0),Nt(!1))})))}($t)},onCancel:function(){return Nt(!1)}},j.a.createElement(h.a,{preserve:!1,style:{width:"100%"},form:qe,name:"addressForm",layout:"vertical",size:"small"},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{md:12},j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Enter Address One"}],name:"address1",label:"Address One",style:{marginBottom:5},initialValue:null!==(Oe=null===la||void 0===la?void 0:la.address1)&&void 0!==Oe?Oe:""},j.a.createElement(E.a,{placeholder:"Address One"})),j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Enter Phone"}],name:"phone",label:"Phone",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.phone},j.a.createElement(E.a,{placeholder:"Phone"})),j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Enter Email"}],name:"email",label:"Email",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.email},j.a.createElement(E.a,{placeholder:"Email"})),j.a.createElement(h.a.Item,{name:"fax",label:"Fax",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.fax},j.a.createElement(E.a,{placeholder:"Fax"})),j.a.createElement(h.a.Item,{name:"isDefault",label:"Default",style:{marginBottom:0},initialValue:null===la||void 0===la?void 0:la.isDefault},j.a.createElement(i.a,{defaultChecked:null===la||void 0===la?void 0:la.isDefault}))),j.a.createElement(m.a,{md:12},j.a.createElement(h.a.Item,{name:"address2",label:"Address Two",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.address2},j.a.createElement(E.a,{placeholder:"Address Two"})),j.a.createElement(h.a.Item,{name:"country",initialValue:"United State",label:"Country",style:{marginBottom:5}},j.a.createElement(b.a,null,j.a.createElement(b.a.Option,{value:"United State"},"United State"))),j.a.createElement(h.a.Item,{rules:[{required:!0,message:"Please Enter City"}],name:"city",label:"City",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.city},j.a.createElement(E.a,{placeholder:"City"})),j.a.createElement(h.a.Item,{name:"state",rules:[{required:!0,message:"Please Enter State"}],label:"State",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.state},j.a.createElement(E.a,{placeholder:"State"})),j.a.createElement(h.a.Item,{name:"zip_code",rules:[{required:!0,message:"Please Enter Zip Code"}],label:"Zip Code",style:{marginBottom:5},initialValue:null===la||void 0===la?void 0:la.zip_code},j.a.createElement(E.a,{placeholder:"Zip Code"})))))),j.a.createElement(l.a,{title:"List of ".concat($t," addresses"),style:{top:20},width:1e3,open:Ht,okText:"Select",onOk:function(){return"billing"===$t?Kt(ma):ta(ma),void Zt(!1)},onCancel:function(){return Zt(!1)}},j.a.createElement(r.a.Group,{style:{width:"100%",padding:10}},j.a.createElement(s.a,{gutter:25},j.a.createElement(m.a,{span:24},j.a.createElement(P.a,{size:"small",style:{float:"right",zIndex:1e3,marginTop:-25,marginBottom:10},title:"Add ".concat($t," address"),htmlType:"button",type:"primary",onClick:function(){return Ea(null,$t)}},j.a.createElement(C.a,{icon:"plus-circle"}))),"billing"===$t?Ve.map((function(e){var t;return j.a.createElement(m.a,{key:e.id,xs:24,md:12},j.a.createElement(P.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Edit Billing Address",htmlType:"button",type:"info",onClick:function(){return Ea(e.id,"billing")}},j.a.createElement(C.a,{icon:"edit"})),(null===(t=Ve.filter((function(e){return e.isDefault}))[0])||void 0===t?void 0:t.id)===e.id&&j.a.createElement(n.a.Ribbon,{text:"Default",color:"pink",style:{top:40,zIndex:1e3}}),j.a.createElement(r.a,{style:{width:"100%",border:"1px solid #f0f0f0",fontSize:12,marginBottom:10,padding:10,borderRadius:5},value:e.id,onChange:function(){return pa(e)}},j.a.createElement("p",null,j.a.createElement("b",null,"Email: "),e.email),j.a.createElement("p",null,j.a.createElement("b",null,"Phone: "),e.phone),j.a.createElement("p",null,j.a.createElement("b",null,"Address 1: "),e.address1&&Object(B.a)(e.address1,35)),j.a.createElement("p",null,j.a.createElement("b",null,"Address 2: "),e.address2&&Object(B.a)(e.address2,35)),j.a.createElement("p",null,j.a.createElement("b",null,"City: "),e.city),j.a.createElement("p",null,j.a.createElement("b",null,"State: "),e.state),j.a.createElement("p",null,j.a.createElement("b",null,"Zip Code: "),e.zip_code)))})):Ze.map((function(e){var t;return j.a.createElement(m.a,{key:e.id,xs:24,md:12},j.a.createElement(P.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Edit Shipping Address",htmlType:"button",type:"info",onClick:function(){return Ea(e.id,"shipping")}},j.a.createElement(C.a,{icon:"edit"})),(null===(t=Ze.filter((function(e){return e.isDefault}))[0])||void 0===t?void 0:t.id)===e.id&&j.a.createElement(n.a.Ribbon,{text:"Default",color:"pink",style:{top:40,zIndex:1e3}}),j.a.createElement(r.a,{style:{width:"100%",border:"1px solid #f0f0f0",fontSize:12,marginBottom:10,padding:10,borderRadius:5},value:e.id,onChange:function(){return pa(e)}},j.a.createElement("p",null,j.a.createElement("b",null,"Email: "),e.email),j.a.createElement("p",null,j.a.createElement("b",null,"Phone: "),e.phone),j.a.createElement("p",null,j.a.createElement("b",null,"Address 1: "),e.address1&&Object(B.a)(e.address1,35)),j.a.createElement("p",null,j.a.createElement("b",null,"Address 2: "),e.address2&&Object(B.a)(e.address2,35)),j.a.createElement("p",null,j.a.createElement("b",null,"City: "),e.city),j.a.createElement("p",null,j.a.createElement("b",null,"State: "),e.state),j.a.createElement("p",null,j.a.createElement("b",null,"Zip Code: "),e.zip_code)))})))))))}},632:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return p}));var n,l,i,r,d,o,u,s=a(8),c=a(17),m={GET_ALL_CUSTOMER:Object(c.d)(n||(n=Object(s.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(c.d)(l||(l=Object(s.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},p={ADD_CUSTOMER:Object(c.d)(i||(i=Object(s.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(c.d)(r||(r=Object(s.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(c.d)(d||(d=Object(s.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(c.d)(o||(o=Object(s.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(c.d)(u||(u=Object(s.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},700:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n,l,i,r,d,o=a(8),u=a(17),s={SEARCH_PRODUCT:Object(u.d)(n||(n=Object(o.a)(["\n    query getSearchedProducts($query: SearchProductInput) {\n      getSearchedProducts(query: $query) {\n        message\n        status\n        data {\n          id\n          prod_name\n          prod_slug\n          prod_regular_price\n          prod_sale_price\n          prod_thumbnail\n        }\n      }\n    }\n  "]))),GET_SHIPPING_METHOD_LIST:Object(u.d)(l||(l=Object(o.a)(["\n    query getShippingMethodListPublic {\n      getShippingMethodListPublic {\n        message\n        status\n        data {\n          id\n          name\n          description\n          status\n        }\n      }\n    }\n  "]))),GET_COUPON_BY_CODE:Object(u.d)(i||(i=Object(o.a)(["\n    query getSingleCouponByCode($query: GetSingleCouponByCodeInput) {\n      getSingleCouponByCode(query: $query) {\n        message\n        status\n        data {\n          id\n          coupon_amount\n          coupon_type\n        }\n      }\n    }\n  "]))),GET_PAYMENT_METHOD_LIST:Object(u.d)(r||(r=Object(o.a)(["\n    query getPaymentMethodListPublic {\n      getPaymentMethodListPublic {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          description\n          status\n          isDefault\n        }\n      }\n    }\n  "]))),GET_SEARCH_CUSTOMER:Object(u.d)(d||(d=Object(o.a)(["\n    query getSearchedCustomers($query: CustomerSearchInput) {\n      getSearchedCustomers(query: $query) {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            isDefault\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "])))}}}]);
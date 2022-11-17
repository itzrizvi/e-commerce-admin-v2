(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[36],{897:function(e,t,l){"use strict";l.r(t);l(127);var a=l(67),n=(l(366),l(338)),i=(l(128),l(45)),r=(l(189),l(88)),d=l(89),o=(l(291),l(143)),u=(l(188),l(110)),c=l(11),s=(l(208),l(39)),m=l(22),E=(l(109),l(31)),p=l(0),v=l.n(p),g=l(21),b=l.n(g),f=l(152),h=l(130),O=l(129),y=l(187),j=l(58),_=l(12),S=l(210),A=l.n(S),L=l(47),x=l(50),C=l.n(x),T=l(35);l(33),E.a.TextArea;t.default=function(){var e,t,l,g,S,x,P,w,I,q,F,N,z,R,k,D,B,G,M,U,W=Object(j.useLocation)().search,J=A.a.parse(W),Z=(Object(j.useHistory)(),Object(p.useState)({data:[],isLoading:!0})),H=Object(m.a)(Z,2),Q=H[0],V=H[1],K=Object(p.useState)(!0),X=Object(m.a)(K,2),Y=(X[0],X[1],Object(p.useState)(!1)),$=Object(m.a)(Y,2),ee=$[0],te=($[1],s.a.useForm()),le=Object(m.a)(te,1)[0];Object(p.useEffect)((function(){J.id&&L.j.query({query:L.i.GET_SINGLE_CUSTOMER_GROUP,variables:{query:{customer_group_id:parseInt(J.id)}},context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,l=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomerGroup;(null===l||void 0===l?void 0:l.status)&&V((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===l||void 0===l?void 0:l.data,error:""})}))})).catch((function(e){V((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){V((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);var ae=Object(p.useState)({data:[],isLoading:!0}),ne=Object(m.a)(ae,2),ie=ne[0],re=ne[1],de=Object(p.useState)({}),oe=Object(m.a)(de,2),ue=oe[0],ce=oe[1],se=Object(p.useState)([]),me=Object(m.a)(se,2),Ee=me[0],pe=me[1],ve=Object(p.useState)([]),ge=Object(m.a)(ve,2),be=ge[0],fe=ge[1],he=Object(p.useState)({billing:{},shipping:{}}),Oe=Object(m.a)(he,2),ye=Oe[0],je=Oe[1],_e=Object(p.useState)({data:[],isLoading:!0}),Se=Object(m.a)(_e,2),Ae=Se[0],Le=Se[1],xe=Object(p.useState)([]),Ce=Object(m.a)(xe,2),Te=Ce[0],Pe=Ce[1],we=Object(p.useState)(null),Ie=Object(m.a)(we,2),qe=Ie[0],Fe=Ie[1],Ne=[{title:"Product Name",dataIndex:"name",key:"name",ellipsis:!0},{title:"Price",dataIndex:"price",key:"price",width:100},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:170,render:function(e,t){return v.a.createElement(E.a,{type:"number",defaultValue:e})}},{title:"Action",dataIndex:"id",key:"id",width:100,align:"center",render:function(e){return v.a.createElement(y.a,{size:"small",title:"Add Order",type:"primary",onClick:function(){Pe((function(t){return t.filter((function(t){return t.id!==e}))}))}},v.a.createElement(b.a,{icon:"minus"}))}}];return Object(p.useEffect)((function(){L.j.query({query:L.i.GET_ALL_CUSTOMER_FOR_ORDER,context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,l=e.data.getAllCustomer;if(!l.status)return T.b.error(l.message);var a=null===l||void 0===l||null===(t=l.data)||void 0===t?void 0:t.map((function(e){return{label:e.email,value:e.id,item:e}}));re({data:a,isLoading:!1})})).catch((function(e){}))}),[]),Object(p.useEffect)((function(){L.j.query({query:L.l.GET_PRODUCT_LIST,context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,l=e.data.getProductList;if(console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 162 ~ useEffect ~ data",l),!l.status)return T.b.error(l.message);var a=null===l||void 0===l||null===(t=l.data)||void 0===t?void 0:t.map((function(e){return{label:e.prod_name,value:e.id,prod_slug:e.prod_slug,item:e}}));console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 113 ~ options ~ options",a),Le({data:a,isLoading:!1})})).catch((function(e){}))}),[]),v.a.createElement(v.a.Fragment,null,v.a.createElement(f.a,{title:"Add Order"}),v.a.createElement(h.b,null,v.a.createElement(a.a,{gutter:25},v.a.createElement(i.a,{sm:24,xs:24},v.a.createElement(O.a,{headless:!0},v.a.createElement(a.a,null,v.a.createElement(i.a,{sm:12,xs:12},J.id&&Q.isLoading?v.a.createElement("div",{div:!0,className:"spin"},v.a.createElement(u.a,null)):v.a.createElement(s.a,{style:{width:"100%"},form:le,name:"addRole",onFinish:function(e){console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 57 ~ handleSubmit ~ values",e)},onFinishFailed:function(e){return console.log("form error info:\n",e)},layout:"vertical"},v.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please select a customer"}],name:"customer_group_name",label:"Customer"},v.a.createElement(o.a,{placeholder:ie.isLoading?"Loading....":"Select a customer",options:ie.data,showSearch:!0,optionFilterProp:"label",onSelect:function(e,t){var l;console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 160 ~ AddOrder ~ data",t),je({billing:{},shipping:{}}),ce(t.item);var a=[],n=[];null===t||void 0===t||null===(l=t.item)||void 0===l||l.addresses.forEach((function(e){return"billing"===e.type?a.push({label:e.address1,value:e.id,item:e}):"shipping"===e.type?n.push({label:e.address1,value:e.id,item:e}):void 0})),pe(a),fe(n)}})),v.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please select a billing address"}],name:"billing_address_id",label:"Billing Address"},v.a.createElement(o.a,{placeholder:ie.isLoading?"Loading...":"Select a billing address",options:Ee,onSelect:function(e,t){console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 214 ~ AddOrder ~ data",t),je((function(e){return Object(c.a)(Object(c.a)({},e),{},{billing:t.item})}))}})),v.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please select a shipping address"}],name:"shipping_address_id",label:"Shipping Address"},v.a.createElement(o.a,{placeholder:ie.isLoading?"Loading...":"Select a shipping address",options:be,onSelect:function(e,t){console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 229 ~ AddOrder ~ data",t),je((function(e){return Object(c.a)(Object(c.a)({},e),{},{shipping:t.item})}))}})),v.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please select a payment method"}],name:"payment_id",label:"Payment Method"},v.a.createElement(o.a,{placeholder:"Select payment method",options:[{label:"Method 1",value:1},{label:"Method 2",value:2}]})),v.a.createElement(s.a.Item,{name:"ps",label:"Products",optionFilterProp:"prod_slug"},v.a.createElement(o.a,{placeholder:Ae.isLoading?"Loading....":"Select products",options:Ae.data,allowClear:!0,onSelect:function(e,t){var l,a,n,i;console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 280 ~ AddOrder ~ val",e),console.log("\ud83d\ude80 ~ file: AddOrder.js ~ line 280 ~ AddOrder ~ item",t);var r={id:(new Date).getTime(),name:null===t||void 0===t||null===(l=t.item)||void 0===l?void 0:l.prod_name,quantity:1,price:(null===t||void 0===t||null===(a=t.item)||void 0===a?void 0:a.prod_sale_price)?null===t||void 0===t||null===(n=t.item)||void 0===n?void 0:n.prod_sale_price:null===t||void 0===t||null===(i=t.item)||void 0===i?void 0:i.prod_regular_price};Pe((function(e){return[].concat(Object(d.a)(e),[r])}))},onChange:function(){return Fe(null)},value:qe})),v.a.createElement("span",{className:"psp_list"},v.a.createElement(r.a,{columns:Ne,dataSource:Te,rowClassName:function(e,t){return t%2===0?"":"altTableClass"}})),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},v.a.createElement(s.a.Item,null,v.a.createElement(y.a,{loading:ee,size:"default",htmlType:"submit",type:"primary",raised:!0},ee?"Processing":"Save"),v.a.createElement(_.b,{to:"/admin/order/list"},v.a.createElement(y.a,{type:"white",size:"large"},"Cancel")))))),v.a.createElement(i.a,{sm:12,xs:12,style:{paddingLeft:"3em"}},v.a.createElement(n.a,{headless:!0},v.a.createElement("h3",{style:{borderBottom:"1px solid #f2f1f1",paddingBottom:"0.3em",marginBottom:"0.9em"}},"Preview"),(null===ue||void 0===ue?void 0:ue.id)&&v.a.createElement(v.a.Fragment,null,v.a.createElement("p",{style:{fontWeight:500}},"Customer Details :"),v.a.createElement("table",{style:{marginLeft:"1em"}},v.a.createElement("tr",null,v.a.createElement("td",{style:{width:"150px"}},v.a.createElement("b",null,"Email ")),v.a.createElement("td",null,": ",ue.email)),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"First Name ")),v.a.createElement("td",null,": ",ue.first_name)),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Last Name:")),v.a.createElement("td",null,": ",ue.last_name)))),(null===ye||void 0===ye||null===(e=ye.billing)||void 0===e?void 0:e.id)&&v.a.createElement(v.a.Fragment,null,v.a.createElement("p",{style:{fontWeight:500,marginTop:"2em"}},"Billing Address :"),v.a.createElement("table",{style:{marginLeft:"1em"}},v.a.createElement("tr",null,v.a.createElement("td",{style:{width:"150px"}},v.a.createElement("b",null,"Address 1")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(t=ye.billing)||void 0===t?void 0:t.address1)),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Address 2")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(l=ye.billing)||void 0===l?void 0:l.address2," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Email")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(g=ye.billing)||void 0===g?void 0:g.email," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Phone")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(S=ye.billing)||void 0===S?void 0:S.phone," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Fax")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(x=ye.billing)||void 0===x?void 0:x.fax," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Country")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(P=ye.billing)||void 0===P?void 0:P.country," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"City")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(w=ye.billing)||void 0===w?void 0:w.city," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"State")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(I=ye.billing)||void 0===I?void 0:I.state," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Zip Code")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(q=ye.billing)||void 0===q?void 0:q.zip_code," ")))),(null===ye||void 0===ye||null===(F=ye.shipping)||void 0===F?void 0:F.id)&&v.a.createElement(v.a.Fragment,null,v.a.createElement("p",{style:{fontWeight:500,marginTop:"2em"}},"Billing Address :"),v.a.createElement("table",{style:{marginLeft:"1em"}},v.a.createElement("tr",null,v.a.createElement("td",{style:{width:"150px"}},v.a.createElement("b",null,"Address 1")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(N=ye.shipping)||void 0===N?void 0:N.address1)),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Address 2")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(z=ye.shipping)||void 0===z?void 0:z.address2," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Email")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(R=ye.shipping)||void 0===R?void 0:R.email," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Phone")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(k=ye.shipping)||void 0===k?void 0:k.phone," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Fax")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(D=ye.shipping)||void 0===D?void 0:D.fax," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Country")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(B=ye.shipping)||void 0===B?void 0:B.country," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"City")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(G=ye.shipping)||void 0===G?void 0:G.city," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"State")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(M=ye.shipping)||void 0===M?void 0:M.state," ")),v.a.createElement("tr",null,v.a.createElement("td",null,v.a.createElement("b",null,"Zip Code")),v.a.createElement("td",null,": ",null===ye||void 0===ye||null===(U=ye.shipping)||void 0===U?void 0:U.zip_code," "))))))))))))}}}]);
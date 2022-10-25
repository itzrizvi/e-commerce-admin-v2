(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[50],{875:function(e,a,t){"use strict";t.r(a);t(129);var n=t(66),l=(t(130),t(41)),r=(t(283),t(105)),c=(t(254),t(146)),i=(t(196),t(119)),m=t(12),o=t(176),d=(t(278),t(58)),s=t(33),E=(t(142),t(67)),u=t(0),p=t.n(u),b=t(25),f=t.n(b),y=t(145),h=t(144),v=t(143),g=t(175),C=t(55),j=t(10),O=t(197),I=t.n(O),V=t(40),x=t(52),_=t.n(x),T=(t(46),E.a.TextArea);a.default=function(){var e=Object(C.useLocation)().search,a=I.a.parse(e),t=(Object(C.useHistory)(),Object(u.useState)({data:[],isLoading:!0})),b=Object(s.a)(t,2),O=b[0],x=b[1],P=Object(u.useState)(!0),S=Object(s.a)(P,2),A=S[0],k=S[1],w=Object(u.useState)(!1),N=Object(s.a)(w,2),z=N[0],D=(N[1],d.a.useForm()),F=Object(s.a)(D,1)[0],G={id:(new Date).getTime()},L=Object(u.useState)([G]),R=Object(s.a)(L,2),Z=R[0],q=R[1],B={id:(new Date).getTime()},J=Object(u.useState)([B]),M=Object(s.a)(J,2),U=M[0],H=M[1];Object(u.useEffect)((function(){a.id&&V.j.query({query:V.i.GET_SINGLE_CUSTOMER_GROUP,variables:{query:{customer_group_uuid:a.id}},context:{headers:{TENANTID:"100001",Authorization:_.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleCustomerGroup;(null===t||void 0===t?void 0:t.status)&&x((function(e){return Object(m.a)(Object(m.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})}))})).catch((function(e){x((function(e){return Object(m.a)(Object(m.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){x((function(e){return Object(m.a)(Object(m.a)({},e),{},{isLoading:!1})}))}))}),[]);return p.a.createElement(p.a.Fragment,null,p.a.createElement(y.a,{title:a.id?"Manage Vendor | Edit (".concat(a.name,")"):"Add Vendor"}),p.a.createElement(h.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(l.a,{sm:24,xs:24},p.a.createElement(v.a,{headless:!0},a.id&&O.isLoading?p.a.createElement("div",{div:!0,className:"spin"},p.a.createElement(i.a,null)):p.a.createElement(d.a,{style:{width:"100%"},form:F,name:"addRole",onFinish:function(e){console.log(e)},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},p.a.createElement(r.a,null,p.a.createElement(r.a.TabPane,{tab:"General",key:"general"},p.a.createElement(d.a.Item,{name:"v_c_n",label:"Company Name"},p.a.createElement(E.a,{placeholder:"Enter Vendor Company Name"})),p.a.createElement(d.a.Item,{name:"v_n",label:"Contact Person",initialValue:a.name||""},p.a.createElement(E.a,{placeholder:"Enter Contact Person"})),p.a.createElement(d.a.Item,{name:"v_e",label:"Email"},p.a.createElement(E.a,{placeholder:"Enter Vendor Email"})),p.a.createElement(d.a.Item,{name:"v_p",label:"Phone"},p.a.createElement(E.a,{placeholder:"Enter Vendor Phone Number"})),p.a.createElement(d.a.Item,{name:"v_f",label:"Fax"},p.a.createElement(E.a,{placeholder:"Enter Vendor Fax"})),p.a.createElement(d.a.Item,{name:"v_ein",label:"EIN"},p.a.createElement(E.a,{placeholder:"Enter Vendor EIN Number"})),p.a.createElement(d.a.Item,{name:"v_fax",label:"Tax Id"},p.a.createElement(E.a,{placeholder:"Enter Vendor Tax Id"})),p.a.createElement(d.a.Item,{name:"v_d",label:"Description",initialValue:O.data.v_d||""},p.a.createElement(T,{rows:4,placeholder:"Enter Vendor Description"})),p.a.createElement(d.a.Item,{label:"Vendor Status"},p.a.createElement(c.a,{checked:A,onChange:function(e){return k(e)}}))),p.a.createElement(r.a.TabPane,{tab:"Billing Address",key:"billing_address"},p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(g.a,{title:"Add Address",type:"primary",size:"small",onClick:function(){q((function(e){return[].concat(Object(o.a)(e),[{id:(new Date).getTime()}])}))}},p.a.createElement(f.a,{icon:"plus"}))),p.a.createElement(n.a,null,Z.map((function(e,a){return p.a.createElement(l.a,{span:12},p.a.createElement(v.a,{key:e.id,headless:!0,size:"small"},p.a.createElement(d.a.Item,{label:"Address"},p.a.createElement(E.a,{placeholder:"Enter Billing Address"})),p.a.createElement(d.a.Item,{label:"Country"},p.a.createElement(E.a,{placeholder:"Enter Vendor Country"})),p.a.createElement(d.a.Item,{label:"City"},p.a.createElement(E.a,{placeholder:"Enter Vendor City"})),p.a.createElement(d.a.Item,{label:"Zip Code"},p.a.createElement(E.a,{placeholder:"Enter Vendor Zip Code"})),p.a.createElement(d.a.Item,{label:"PO Code"},p.a.createElement(E.a,{placeholder:"Enter Vendor PO Code"})),1!==Z.length&&p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(g.a,{size:"small",title:"Remove",type:"danger",onClick:function(){return function(e,a){q((function(e){var t=Object(o.a)(e);return t.splice(a,1),t}))}(e.id,a)}},p.a.createElement(f.a,{icon:"minus"})))))})))),p.a.createElement(r.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(g.a,{title:"Add Address",type:"primary",size:"small",onClick:function(){H((function(e){return[].concat(Object(o.a)(e),[{id:(new Date).getTime()}])}))}},p.a.createElement(f.a,{icon:"plus"}))),p.a.createElement(n.a,null,U.map((function(e,a){return p.a.createElement(l.a,{span:12},p.a.createElement(v.a,{key:e.id,headless:!0,size:"small"},p.a.createElement(d.a.Item,{label:"Address"},p.a.createElement(E.a,{placeholder:"Enter Shipping Address"})),p.a.createElement(d.a.Item,{label:"Country"},p.a.createElement(E.a,{placeholder:"Enter Vendor Country"})),p.a.createElement(d.a.Item,{label:"City"},p.a.createElement(E.a,{placeholder:"Enter Vendor City"})),p.a.createElement(d.a.Item,{label:"Zip Code"},p.a.createElement(E.a,{placeholder:"Enter Vendor Zip Code"})),p.a.createElement(d.a.Item,{label:"PO Code"},p.a.createElement(E.a,{placeholder:"Enter Vendor PO Code"})),1!==Z.length&&p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(g.a,{size:"small",title:"Remove",type:"danger",onClick:function(){return function(e,a){H((function(e){var t=Object(o.a)(e);return t.splice(a,1),t}))}(e.id,a)}},p.a.createElement(f.a,{icon:"minus"})))))}))))),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},p.a.createElement(d.a.Item,null,p.a.createElement(g.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),p.a.createElement(j.b,{to:"/admin/vendor/list"},p.a.createElement(g.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[67],{987:function(e,a,t){"use strict";t.r(a);t(143);var n=t(68),o=(t(144),t(52)),r=(t(304),t(217)),u=(t(630),t(633)),c=(t(145),t(30)),l=(t(132),t(74)),m=t(60),s=t(7),i=(t(201),t(27)),p=t(14),d=(t(115),t(39)),_=t(0),E=t.n(_),b=t(120),g=t(101),f=t(99),h=t(100),O=t(59),v=t(12),C=t(168),y=t.n(C),j=t(28),I=t(72),x=t.n(I),A=t(33),S=t(370),T=t.n(S),D=t(23),P=["coupon_startdate","coupon_enddate","coupon_maxamount","coupon_minamount","coupon_amount","coupon_sortorder"],N=d.a.TextArea;a.default=function(){Object(D.c)("coupon");var e=Object(O.useLocation)().search,a=y.a.parse(e),t=Object(O.useHistory)(),C=Object(_.useState)({data:[],isLoading:!0}),I=Object(p.a)(C,2),S=I[0],q=I[1],w=Object(_.useState)(""),M=Object(p.a)(w,2),F=M[0],G=M[1],L=Object(_.useState)(!0),k=Object(p.a)(L,2),z=k[0],U=k[1],W=Object(_.useState)(!1),J=Object(p.a)(W,2),R=J[0],H=J[1],V=i.a.useForm(),B=Object(p.a)(V,1)[0];Object(_.useEffect)((function(){a.id&&j.j.query({query:j.g.GET_SINGLE_COUPON,variables:{query:{coupon_id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleCoupon;(null===t||void 0===t?void 0:t.status)&&(q((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})})),G(t.data.coupon_type))})).catch((function(e){q((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){q((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return E.a.createElement(E.a.Fragment,null,E.a.createElement(b.a,{title:a.id?"Manage Coupon | Edit ".concat(S.isLoading?"":"(".concat(S.data.coupon_name,")")):"Add Coupon"}),E.a.createElement(g.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(o.a,{sm:24,xs:24},E.a.createElement(f.a,{headless:!0},a.id&&S.isLoading?E.a.createElement("div",{div:!0,className:"spin"},E.a.createElement(l.a,null)):E.a.createElement(i.a,{style:{width:"100%"},form:B,name:"addRole",onFinish:function(e){var n=e.coupon_startdate,o=e.coupon_enddate,r=e.coupon_maxamount,u=e.coupon_minamount,c=e.coupon_amount,l=e.coupon_sortorder,i=Object(m.a)(e,P),p=Object(s.a)(Object(s.a)({},i),{},{coupon_startdate:new Date(n).toGMTString(),coupon_enddate:new Date(o).toGMTString(),coupon_status:z,coupon_type:F,coupon_maxamount:parseInt(r),coupon_minamount:parseInt(u),coupon_amount:parseInt(c),coupon_sortorder:parseInt(l)});if(H(!0),a.id){var d={data:Object(s.a)({coupon_id:parseInt(a.id)},p)};console.log(d),j.j.mutate({mutation:j.f.UPDATE_COUPON,variables:d,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(a){var n,o=null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.updateCoupon;if(!o.status)return A.b.error(o.message);setTimeout((function(){t.push("/admin/products/coupon")}),1e3),A.b.success("".concat(e.customer_group_name," Group Updated successfully"))})).catch((function(e){return console.log("got error on addCustomerGroup",e),A.b.error("Something Went wrong !!")})).finally((function(){H(!1)}))}else{var _={data:p};console.log(_),j.j.mutate({mutation:j.f.CREATE_COUPON,variables:_,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(a){var n,o=null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.createCoupon;if(!o.status)return A.b.error(o.message);setTimeout((function(){t.push("/admin/products/coupon")}),1e3),A.b.success("".concat(e.coupon_name," coupon added successfully"))})).catch((function(e){return console.log("Error on add coupon",e),A.b.error("Something Went wrong !!")})).finally((function(){H(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:a.id?{coupon_name:S.data.coupon_name,coupon_description:S.data.coupon_description,coupon_code:S.data.coupon_code,coupon_amount:S.data.coupon_amount,coupon_minamount:S.data.coupon_minamount,coupon_maxamount:S.data.coupon_maxamount,coupon_startdate:T()(parseInt(S.data.coupon_startdate)),coupon_enddate:T()(parseInt(S.data.coupon_enddate)),coupon_sortorder:S.data.coupon_sortorder}:null},E.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon Name"}],name:"coupon_name",label:"Coupon Name"},E.a.createElement(d.a,{placeholder:"Enter Coupon Name"})),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Coupon Description"}],name:"coupon_description",label:"Description"},E.a.createElement(N,{rows:4,placeholder:"Enter Coupon Description"})),E.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon CODE"}],name:"coupon_code",label:"CODE"},E.a.createElement(d.a,{placeholder:"Enter Coupon CODE"})),E.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon Type"}],label:"Type"},E.a.createElement(c.a,{value:F,onChange:function(e){return G(e)},placeholder:"Select Coupon type"},E.a.createElement(c.a.Option,{key:1,value:"percentage"},"Percentage"),E.a.createElement(c.a.Option,{key:2,value:"flat"},"Flat"))),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Coupon Amount"}],name:"coupon_amount",label:"Amount"},E.a.createElement(d.a,{type:"number",placeholder:"Enter Coupon Amount"})),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Minimum Amount"}],name:"coupon_minamount",label:"Minimum Amount"},E.a.createElement(d.a,{type:"number",placeholder:"Enter Minimum Amount"})),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Maximum Amount"}],name:"coupon_maxamount",label:"Maximum Amount"},E.a.createElement(d.a,{type:"number",placeholder:"Enter Maximum Amount"})),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Start Date"}],name:"coupon_startdate",label:"Start Date"},E.a.createElement(u.a,null)),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter End Date"}],name:"coupon_enddate",label:"End Date"},E.a.createElement(u.a,null)),E.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Sort order"}],name:"coupon_sortorder",label:"Sort order"},E.a.createElement(d.a,{type:"number",placeholder:"Enter sort order"})),E.a.createElement(i.a.Item,{label:"Coupon Status"},E.a.createElement(r.a,{checked:z,onChange:function(e){return U(e)}})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},E.a.createElement(i.a.Item,null,E.a.createElement(h.a,{loading:R,size:"default",htmlType:"submit",type:"primary",raised:!0},R?"Processing":"Save"),E.a.createElement(v.b,{to:"/admin/customers/group"},E.a.createElement(h.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
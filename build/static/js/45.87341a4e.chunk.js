(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[45],{940:function(e,a,t){"use strict";t.r(a);t(114);var n=t(55),o=(t(115),t(42)),r=(t(199),t(122)),u=(t(623),t(626)),c=(t(165),t(26)),l=(t(134),t(73)),m=t(56),s=t(7),i=(t(163),t(24)),p=t(16),d=(t(78),t(17)),E=t(0),_=t.n(E),b=t(104),g=t(91),f=t(90),h=t(77),O=t(62),v=t(12),C=t(142),y=t.n(C),j=t(38),I=t(64),S=t.n(I),x=t(29),A=t(366),P=t.n(A),T=t(25),D=["coupon_startdate","coupon_enddate","coupon_maxamount","coupon_minamount","coupon_amount","coupon_sortorder"],N=d.a.TextArea;a.default=function(){Object(T.c)("coupon");var e=Object(O.useLocation)().search,a=y.a.parse(e),t=Object(O.useHistory)(),C=Object(E.useState)({data:[],isLoading:!0}),I=Object(p.a)(C,2),A=I[0],q=I[1],w=Object(E.useState)(""),M=Object(p.a)(w,2),F=M[0],G=M[1],L=Object(E.useState)(!0),k=Object(p.a)(L,2),z=k[0],U=k[1],W=Object(E.useState)(!1),J=Object(p.a)(W,2),R=J[0],H=J[1],V=i.a.useForm(),B=Object(p.a)(V,1)[0];Object(E.useEffect)((function(){a.id&&j.j.query({query:j.g.GET_SINGLE_COUPON,variables:{query:{coupon_id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleCoupon;(null===t||void 0===t?void 0:t.status)&&(q((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})})),G(t.data.coupon_type))})).catch((function(e){q((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){q((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return _.a.createElement(_.a.Fragment,null,_.a.createElement(b.a,{title:a.id?"Manage Coupon | Edit ".concat(A.isLoading?"":"(".concat(A.data.coupon_name,")")):"Add Coupon"}),_.a.createElement(g.b,null,_.a.createElement(n.a,{gutter:25},_.a.createElement(o.a,{sm:24,xs:24},_.a.createElement(f.a,{headless:!0},a.id&&A.isLoading?_.a.createElement("div",{div:!0,className:"spin"},_.a.createElement(l.a,null)):_.a.createElement(i.a,{style:{width:"100%"},form:B,name:"addRole",onFinish:function(e){var n=e.coupon_startdate,o=e.coupon_enddate,r=e.coupon_maxamount,u=e.coupon_minamount,c=e.coupon_amount,l=e.coupon_sortorder,i=Object(m.a)(e,D),p=Object(s.a)(Object(s.a)({},i),{},{coupon_startdate:new Date(n).toGMTString(),coupon_enddate:new Date(o).toGMTString(),coupon_status:z,coupon_type:F,coupon_maxamount:parseInt(r),coupon_minamount:parseInt(u),coupon_amount:parseInt(c),coupon_sortorder:parseInt(l)});if(H(!0),a.id){var d={data:Object(s.a)({coupon_id:parseInt(a.id)},p)};console.log(d),j.j.mutate({mutation:j.f.UPDATE_COUPON,variables:d,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(a){var n,o=null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.updateCoupon;if(!o.status)return x.b.error(o.message);setTimeout((function(){t.push("/admin/products/coupon")}),1e3),x.b.success("".concat(e.customer_group_name," Group Updated successfully"))})).catch((function(e){return console.log("got error on addCustomerGroup",e),x.b.error("Something Went wrong !!")})).finally((function(){H(!1)}))}else{var E={data:p};console.log(E),j.j.mutate({mutation:j.f.CREATE_COUPON,variables:E,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(a){var n,o=null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.createCoupon;if(!o.status)return x.b.error(o.message);setTimeout((function(){t.push("/admin/products/coupon")}),1e3),x.b.success("".concat(e.coupon_name," coupon added successfully"))})).catch((function(e){return console.log("Error on add coupon",e),x.b.error("Something Went wrong !!")})).finally((function(){H(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:a.id?{coupon_name:A.data.coupon_name,coupon_description:A.data.coupon_description,coupon_code:A.data.coupon_code,coupon_amount:A.data.coupon_amount,coupon_minamount:A.data.coupon_minamount,coupon_maxamount:A.data.coupon_maxamount,coupon_startdate:P()(parseInt(A.data.coupon_startdate)),coupon_enddate:P()(parseInt(A.data.coupon_enddate)),coupon_sortorder:A.data.coupon_sortorder}:null},_.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon Name"}],name:"coupon_name",label:"Coupon Name"},_.a.createElement(d.a,{placeholder:"Enter Coupon Name"})),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Coupon Description"}],name:"coupon_description",label:"Description"},_.a.createElement(N,{rows:4,placeholder:"Enter Coupon Description"})),_.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon CODE"}],name:"coupon_code",label:"CODE"},_.a.createElement(d.a,{placeholder:"Enter Coupon CODE"})),_.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Coupon Type"}],label:"Type"},_.a.createElement(c.a,{value:F,onChange:function(e){return G(e)},placeholder:"Select Coupon type"},_.a.createElement(c.a.Option,{key:1,value:"percentage"},"Percentage"),_.a.createElement(c.a.Option,{key:2,value:"flat"},"Flat"))),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Coupon Amount"}],name:"coupon_amount",label:"Amount"},_.a.createElement(d.a,{type:"number",placeholder:"Enter Coupon Amount"})),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Minimum Amount"}],name:"coupon_minamount",label:"Minimum Amount"},_.a.createElement(d.a,{type:"number",placeholder:"Enter Minimum Amount"})),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Maximum Amount"}],name:"coupon_maxamount",label:"Maximum Amount"},_.a.createElement(d.a,{type:"number",placeholder:"Enter Maximum Amount"})),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Start Date"}],name:"coupon_startdate",label:"Start Date"},_.a.createElement(u.a,null)),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter End Date"}],name:"coupon_enddate",label:"End Date"},_.a.createElement(u.a,null)),_.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Sort order"}],name:"coupon_sortorder",label:"Sort order"},_.a.createElement(d.a,{type:"number",placeholder:"Enter sort order"})),_.a.createElement(i.a.Item,{label:"Coupon Status"},_.a.createElement(r.a,{checked:z,onChange:function(e){return U(e)}})),_.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},_.a.createElement(i.a.Item,null,_.a.createElement(h.a,{loading:R,size:"default",htmlType:"submit",type:"primary",raised:!0},R?"Processing":"Save"),_.a.createElement(v.b,{to:"/admin/customers/group"},_.a.createElement(h.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
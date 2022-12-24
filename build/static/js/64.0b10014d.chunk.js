(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[64],{983:function(t,e,a){"use strict";a.r(e);a(129);var n=a(61),r=(a(130),a(45)),i=(a(360),a(292)),u=(a(117),a(38)),o=(a(131),a(71)),l=a(7),s=(a(195),a(27)),c=a(14),d=(a(163),a(35)),m=a(0),b=a.n(m),g=(a(20),a(118)),f=a(99),p=a(98),E=a(97),A=a(57),h=a(10),v=a(164),T=a.n(v),_=a(33),j=a(69),O=a.n(j),y=a(31),I=a(23),S=d.a.Option;e.default=function(){var t;Object(I.c)("attribute");var e=Object(A.useLocation)().search,a=T.a.parse(e),v=Object(A.useHistory)(),j=Object(m.useState)({data:[],isLoading:!0}),N=Object(c.a)(j,2),L=N[0],x=N[1],G=Object(m.useState)(""),R=Object(c.a)(G,2),q=R[0],w=R[1],z=Object(m.useState)(!0),P=Object(c.a)(z,2),C=P[0],D=P[1],U=Object(m.useState)(!1),F=Object(c.a)(U,2),B=F[0],k=F[1],W=s.a.useForm(),J=Object(c.a)(W,1)[0],Q=Object(m.useState)({data:[],isLoading:!0}),V=Object(c.a)(Q,2),H=V[0],M=V[1];Object(m.useEffect)((function(){_.j.query({query:_.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&x((function(t){return Object(l.a)(Object(l.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){x((function(t){return Object(l.a)(Object(l.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){x((function(t){return Object(l.a)(Object(l.a)({},t),{},{isLoading:!1})}))}))}),[]),Object(m.useEffect)((function(){a.id&&_.j.query({query:_.c.GET_SINGLE_ATTRIBUTE,variables:{query:{attribute_id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleAttribute;M({data:a.data,isLoading:!1}),w(a.data.attr_group_id)})).catch((function(t){console.log(t)}))}),[]);return b.a.createElement(b.a.Fragment,null,b.a.createElement(g.a,{title:a.id?"Manage Attribute | Edit ".concat(H.isLoading?"":"(".concat(H.data.attribute_name,")")):"Add Attribute"}),b.a.createElement(f.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(p.a,{headless:!0},a.id&&H.isLoading?b.a.createElement("div",{style:{textAlign:"center"}},b.a.createElement(o.a,{tip:"processing..."})):b.a.createElement(s.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(t){var e=t.attribute_name;if(!q)return y.b.warning("Attribute Group is not selected");if(k(!0),a.id){var n={data:{attribute_id:parseInt(a.id),attribute_name:e,attribute_status:C,attr_group_id:parseInt(q)}};_.j.mutate({mutation:_.b.UPDATE_ATTRIBUTE,variables:n,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},["getAllAttributes"]]}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateAttribute;if(!a.status)return y.b.error(a.message);setTimeout((function(){v.push("/admin/attributes/list")}),1e3),y.b.success(a.message)})).catch((function(t){return console.log("got error on addPermission",t),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}else{var r={data:{attribute_name:e,attribute_status:C,attr_group_id:q}};_.j.mutate({mutation:_.b.CREATE_ATTRIBUTE,variables:r,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},["getAllAttributes"]]}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.createAttribute;if(!n.status)return y.b.error(n.message);setTimeout((function(){v.push("/admin/attributes/list")}),1e3),y.b.success("".concat(t.attribute_name," Added successfully"))})).catch((function(t){return console.log("got error on addPermission",t),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},b.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Name"}],name:"attribute_name",label:"Attribute Name",initialValue:(null===H||void 0===H||null===(t=H.data)||void 0===t?void 0:t.attribute_name)||""},b.a.createElement(u.a,{placeholder:"Enter Attribute Name"})),b.a.createElement(s.a.Item,{initialValue:"",label:"Attribute Group"},L.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(o.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(d.a,{allowClear:!0,placeholder:"Select Attribute Group",value:q,onChange:function(t){return w(t)}},L.data.map((function(t){return b.a.createElement(S,{key:t.id,value:t.id},t.attr_group_name)}))))),b.a.createElement(s.a.Item,{name:"attrgroup_status",label:"Status"},b.a.createElement(i.a,{checked:C,onChange:function(t){return D(t)}})),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(s.a.Item,null,b.a.createElement(E.a,{loading:B,size:"default",htmlType:"submit",type:"primary",raised:!0},B?"Processing":"Save"),b.a.createElement(h.b,{to:"/admin/attributes/list"},b.a.createElement(E.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
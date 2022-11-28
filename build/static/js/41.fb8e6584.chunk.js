(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[41],{953:function(t,e,a){"use strict";a.r(e);a(114);var n=a(55),r=(a(115),a(41)),i=(a(199),a(122)),o=(a(77),a(17)),u=(a(134),a(73)),l=a(7),c=(a(163),a(24)),s=a(16),d=(a(165),a(33)),m=a(0),b=a.n(m),g=(a(18),a(104)),p=a(91),E=a(90),f=a(78),A=a(62),h=a(12),v=a(152),T=a.n(v),_=a(42),j=a(64),O=a.n(j),y=a(28),I=a(25),S=d.a.Option;e.default=function(){var t;Object(I.c)("attribute");var e=Object(A.useLocation)().search,a=T.a.parse(e),v=Object(A.useHistory)(),j=Object(m.useState)({data:[],isLoading:!0}),N=Object(s.a)(j,2),L=N[0],w=N[1],x=Object(m.useState)(""),G=Object(s.a)(x,2),R=G[0],q=G[1],z=Object(m.useState)(!0),P=Object(s.a)(z,2),C=P[0],D=P[1],U=Object(m.useState)(!1),F=Object(s.a)(U,2),B=F[0],k=F[1],W=c.a.useForm(),J=Object(s.a)(W,1)[0],Q=Object(m.useState)({data:[],isLoading:!0}),V=Object(s.a)(Q,2),H=V[0],M=V[1];Object(m.useEffect)((function(){_.j.query({query:_.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&w((function(t){return Object(l.a)(Object(l.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){w((function(t){return Object(l.a)(Object(l.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){w((function(t){return Object(l.a)(Object(l.a)({},t),{},{isLoading:!1})}))}))}),[]),Object(m.useEffect)((function(){a.id&&_.j.query({query:_.c.GET_SINGLE_ATTRIBUTE,variables:{query:{attribute_id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleAttribute;M({data:a.data,isLoading:!1}),q(a.data.attr_group_id)})).catch((function(t){console.log(t)}))}),[]);return b.a.createElement(b.a.Fragment,null,b.a.createElement(g.a,{title:a.id?"Manage Attribute | Edit ".concat(H.isLoading?"":"(".concat(H.data.attribute_name,")")):"Add Attribute"}),b.a.createElement(p.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(E.a,{headless:!0},a.id&&H.isLoading?b.a.createElement("div",{style:{textAlign:"center"}},b.a.createElement(u.a,{tip:"processing..."})):b.a.createElement(c.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(t){var e=t.attribute_name;if(!R)return y.b.warning("Attribute Group is not selected");if(k(!0),a.id){var n={data:{attribute_id:parseInt(a.id),attribute_name:e,attribute_status:C,attr_group_id:parseInt(R)}};console.log(n),_.j.mutate({mutation:_.b.UPDATE_ATTRIBUTE,variables:n,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},"getAllAttributes"]}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateAttribute;if(!a.status)return y.b.error(a.message);v.push("/admin/attributes/list"),window.location.reload(),y.b.success(a.message)})).catch((function(t){return console.log("got error on addPermission",t),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}else{var r={data:{attribute_name:e,attribute_status:C,attr_group_id:R}};_.j.mutate({mutation:_.b.CREATE_ATTRIBUTE,variables:r,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},"getAllAttributes"]}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.createAttribute;if(!n.status)return y.b.error(n.message);v.push("/admin/attributes/list"),window.location.reload(),y.b.success("".concat(t.attribute_name," Added successfully"))})).catch((function(t){return console.log("got error on addPermission",t),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},b.a.createElement(c.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Name"}],name:"attribute_name",label:"Attribute Name",initialValue:(null===H||void 0===H||null===(t=H.data)||void 0===t?void 0:t.attribute_name)||""},b.a.createElement(o.a,{placeholder:"Enter Attribute Name"})),b.a.createElement(c.a.Item,{initialValue:"",label:"Attribute Group"},L.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(u.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(d.a,{allowClear:!0,placeholder:"Select Attribute Group",value:R,onChange:function(t){return q(t)}},L.data.map((function(t){return b.a.createElement(S,{key:t.id,value:t.id},t.attr_group_name)}))))),b.a.createElement(c.a.Item,{name:"attrgroup_status",label:"Status"},b.a.createElement(i.a,{checked:C,onChange:function(t){return D(t)}})),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(c.a.Item,null,b.a.createElement(f.a,{loading:B,size:"default",htmlType:"submit",type:"primary",raised:!0},B?"Processing":"Save"),b.a.createElement(h.b,{to:"/admin/attributes/list"},b.a.createElement(f.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
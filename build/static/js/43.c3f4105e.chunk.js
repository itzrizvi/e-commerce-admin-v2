(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[43],{885:function(e,t,a){"use strict";a.r(t);a(134);var n=a(68),r=(a(135),a(46)),i=(a(258),a(148)),o=(a(199),a(124)),u=(a(123),a(37)),l=a(12),s=(a(282),a(63)),c=a(31),d=(a(283),a(136)),m=a(0),b=a.n(m),g=(a(21),a(147)),p=a(146),f=a(145),E=a(179),h=a(56),A=a(11),T=a(201),v=a.n(T),_=a(41),j=a(44),O=a.n(j),y=a(53),I=a(35),S=d.a.Option;t.default=function(){Object(I.b)("attribute");var e=Object(h.useLocation)().search,t=v.a.parse(e),a=Object(h.useHistory)(),T=Object(m.useState)({data:[],isLoading:!0}),j=Object(c.a)(T,2),N=j[0],w=j[1],L=Object(m.useState)(t.g_id||""),x=Object(c.a)(L,2),G=x[0],P=x[1],R=Object(m.useState)(!0),z=Object(c.a)(R,2),C=z[0],D=z[1],F=Object(m.useState)(!1),U=Object(c.a)(F,2),q=U[0],k=U[1],B=s.a.useForm(),W=Object(c.a)(B,1)[0];Object(m.useEffect)((function(){_.j.query({query:_.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&w((function(e){return Object(l.a)(Object(l.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){w((function(e){return Object(l.a)(Object(l.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){w((function(e){return Object(l.a)(Object(l.a)({},e),{},{isLoading:!1})}))}))}),[]);return b.a.createElement(b.a.Fragment,null,b.a.createElement(g.a,{title:t.id?"Manage Attribute | Edit (".concat(t.name,")"):"Add Attribute"}),b.a.createElement(p.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(f.a,{headless:!0},b.a.createElement(s.a,{style:{width:"100%"},form:W,name:"addRole",onFinish:function(e){var n=e.attribute_name;if(!G)return y.b.warning("Attribute Group is not selected");if(k(!0),t.id){var r={data:{attribute_id:parseInt(t.id),attribute_name:n,attribute_status:C,attr_group_id:parseInt(G)}};console.log(r),_.j.mutate({mutation:_.b.UPDATE_ATTRIBUTE,variables:r,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},"getAllAttributes"]}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateAttribute;if(!n.status)return y.b.error(n.message);a.push("/admin/attributes/list"),window.location.reload(),y.b.success(n.message)})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}else{var i={data:{attribute_name:n,attribute_status:C,attr_group_id:G}};_.j.mutate({mutation:_.b.CREATE_ATTRIBUTE,variables:i,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")},refetchQueries:[{query:_.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}},"getAllAttributes"]}}).then((function(t){var n,r=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createAttribute;if(!r.status)return y.b.error(r.message);a.push("/admin/attributes/list"),window.location.reload(),y.b.success("".concat(e.attribute_name," Added successfully"))})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){k(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},b.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Name"}],name:"attribute_name",label:"Attribute Name",initialValue:t.name||""},b.a.createElement(u.a,{placeholder:"Enter Attribute Name"})),b.a.createElement(s.a.Item,{initialValue:"",label:"Attribute Group"},N.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(o.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(d.a,{allowClear:!0,placeholder:"Select Attribute Group",value:G,onChange:function(e){return P(e)}},N.data.map((function(e){return b.a.createElement(S,{key:e.id,value:e.id},e.attr_group_name)}))))),b.a.createElement(s.a.Item,{name:"attrgroup_status",label:"Status"},b.a.createElement(i.a,{checked:C,onChange:function(e){return D(e)}})),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(s.a.Item,null,b.a.createElement(E.a,{loading:q,size:"default",htmlType:"submit",type:"primary",raised:!0},q?"Processing":"Save"),b.a.createElement(A.b,{to:"/admin/attributes/list"},b.a.createElement(E.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
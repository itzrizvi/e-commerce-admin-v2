(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[32],{511:function(t,e,a){"use strict";a(58),a(513)},512:function(t,e,a){"use strict";var n=a(1),r=a(3),i=a(136),c=a(5),u=a.n(c),o=a(7),l=a(14),s=a(0),d=a(50),b=a(51),m=s.forwardRef((function(t,e){var a,n=t.prefixCls,i=void 0===n?"rc-switch":n,c=t.className,m=t.checked,f=t.defaultChecked,p=t.disabled,g=t.loadingIcon,_=t.checkedChildren,h=t.unCheckedChildren,v=t.onClick,E=t.onChange,C=t.onKeyDown,O=Object(l.a)(t,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),j=Object(d.a)(!1,{value:m,defaultValue:f}),y=Object(o.a)(j,2),k=y[0],w=y[1];function x(t,e){var a=k;return p||(w(a=t),null===E||void 0===E||E(a,e)),a}var N=u()(i,c,(a={},Object(r.a)(a,"".concat(i,"-checked"),k),Object(r.a)(a,"".concat(i,"-disabled"),p),a));return s.createElement("button",Object.assign({},O,{type:"button",role:"switch","aria-checked":k,disabled:p,className:N,ref:e,onKeyDown:function(t){t.which===b.a.LEFT?x(!1,t):t.which===b.a.RIGHT&&x(!0,t),null===C||void 0===C||C(t)},onClick:function(t){var e=x(!k,t);null===v||void 0===v||v(e,t)}}),g,s.createElement("span",{className:"".concat(i,"-inner")},k?_:h))}));m.displayName="Switch";var f=m,p=a(68),g=a(93),_=a(73),h=a(219),v=function(t,e){var a={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(a[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(t);r<n.length;r++)e.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(a[n[r]]=t[n[r]])}return a},E=s.forwardRef((function(t,e){var a,c=t.prefixCls,o=t.size,l=t.disabled,d=t.loading,b=t.className,m=void 0===b?"":b,E=v(t,["prefixCls","size","disabled","loading","className"]),C=s.useContext(p.b),O=C.getPrefixCls,j=C.direction,y=s.useContext(_.b),k=s.useContext(g.b),w=l||k||d,x=O("switch",c),N=s.createElement("div",{className:"".concat(x,"-handle")},d&&s.createElement(i.a,{className:"".concat(x,"-loading-icon")})),A=u()((a={},Object(r.a)(a,"".concat(x,"-small"),"small"===(o||y)),Object(r.a)(a,"".concat(x,"-loading"),d),Object(r.a)(a,"".concat(x,"-rtl"),"rtl"===j),a),m);return s.createElement(h.a,{insertExtraNode:!0},s.createElement(f,Object(n.a)({},E,{prefixCls:x,className:A,disabled:w,ref:e,loadingIcon:N})))}));E.__ANT_SWITCH=!0;e.a=E},513:function(t,e,a){},687:function(t,e,a){"use strict";a.r(e);a(155);var n=a(79),r=(a(156),a(37)),i=(a(537),a(535)),c=(a(292),a(216)),u=(a(218),a(157)),o=a(9),l=(a(511),a(512)),s=a(48),d=a(140),b=a(0),m=a.n(b),f=a(16),p=a.n(f),g=a(238),_=a(510),h=a(509),v=a(508),E=a(506),C=a(8),O=a(106),j=a.n(O),y=a(137),k=a(53),w=a.n(k),x=a(217);e.default=function(){var t=Object(d.a)(Array(6).keys()).map((function(t){return{a_n:"Attribute ".concat(t+1),a_g:"Group 2",g_s:t+1}})),e=Object(b.useState)({data:t,isLoading:!0}),a=Object(s.a)(e,2),f=a[0],O=a[1],k=Object(b.useState)([]),N=Object(s.a)(k,2),A=N[0],T=N[1],I=Object(b.useState)(""),S=Object(s.a)(I,2),D=S[0],L=S[1],P=[{title:"Attribute Name",dataIndex:"attribute_name",key:"attribute_name",sorter:function(t,e){return t.attribute_name.toUpperCase()>e.attribute_name.toUpperCase()?1:-1}},{title:"Attribute Group",dataIndex:"attribute_group.attr_group_name",key:"attribute_group.attr_group_name",sorter:function(t,e){return t.attribute_group.attr_group_name.toUpperCase()>e.attribute_group.attr_group_name.toUpperCase()?1:-1},render:function(t,e){return e.attribute_group.attr_group_name}},{title:"Status",dataIndex:"attribute_status",key:"attribute_status",align:"right",sorter:function(t,e){return t.attribute_status===e.attribute_status?0:t.attribute_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.attribute_status===t},render:function(t,e){return m.a.createElement(l.a,{defaultChecked:t,title:"Status",onChange:function(t){return U(e,t)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(t,e){return m.a.createElement(m.a.Fragment,null,m.a.createElement(C.b,{to:"/admin/attributes/add?id=".concat(e.attribute_uuid,"&name=").concat(e.attribute_name,"&g_id=").concat(e.attribute_group.attr_group_uuid)},m.a.createElement(j.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];Object(b.useEffect)((function(){y.f.query({query:y.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttributes;(null===a||void 0===a?void 0:a.status)&&O((function(t){return Object(o.a)(Object(o.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){O((function(t){return Object(o.a)(Object(o.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){O((function(t){return Object(o.a)(Object(o.a)({},t),{},{isLoading:!1})}))}))}),[]);var U=function(t,e){var a={data:{attribute_uuid:t.attribute_uuid,attribute_status:e}};console.log(a),y.f.mutate({mutation:y.b.UPDATE_ATTRIBUTE,variables:a,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateAttribute;if(!n.status)return x.b.error(n.message);x.b.success("".concat(t.attribute_name," attribute status updated."))})).catch((function(t){return console.log("got error on addPermission",t),x.b.error("Something Went wrong !!")}))};return m.a.createElement(m.a.Fragment,null,m.a.createElement(_.a,{title:"Attributes",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(C.b,{to:"/admin/attributes/add"},m.a.createElement(E.a,{size:"small",title:"Add Attribute",type:"primary"},m.a.createElement(p.a,{icon:"file-plus"}))))]}),m.a.createElement(h.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(v.a,{headless:!0},f.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(u.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(c.a,{placeholder:"Search Permission...",prefix:m.a.createElement(g.a,null),onChange:function(t){var e=t.target.value;L(e),T(f.data.filter((function(t){var a;return((null===t||void 0===t?void 0:t.attribute_name)+(null===t||void 0===t||null===(a=t.attribute_group)||void 0===a?void 0:a.attr_group_name)).toLowerCase().includes(e.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:P,rowKey:"g_s",size:"small",dataSource:D?A:f.data,rowClassName:function(t,e){return e%2==0?"":"altTableClass"}}))))))))}}}]);
(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[32],{511:function(e,t,a){"use strict";a(58),a(512)},512:function(e,t,a){},513:function(e,t,a){"use strict";var n=a(1),r=a(3),c=a(136),l=a(5),s=a.n(l),o=a(7),i=a(14),u=a(0),d=a(51),m=a(50),g=u.forwardRef((function(e,t){var a,n=e.prefixCls,c=void 0===n?"rc-switch":n,l=e.className,g=e.checked,f=e.defaultChecked,b=e.disabled,p=e.loadingIcon,h=e.checkedChildren,C=e.unCheckedChildren,E=e.onClick,v=e.onChange,O=e.onKeyDown,_=Object(i.a)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),y=Object(d.a)(!1,{value:g,defaultValue:f}),k=Object(o.a)(y,2),w=k[0],j=k[1];function x(e,t){var a=w;return b||(j(a=e),null===v||void 0===v||v(a,t)),a}var N=s()(c,l,(a={},Object(r.a)(a,"".concat(c,"-checked"),w),Object(r.a)(a,"".concat(c,"-disabled"),b),a));return u.createElement("button",Object.assign({},_,{type:"button",role:"switch","aria-checked":w,disabled:b,className:N,ref:t,onKeyDown:function(e){e.which===m.a.LEFT?x(!1,e):e.which===m.a.RIGHT&&x(!0,e),null===O||void 0===O||O(e)},onClick:function(e){var t=x(!w,e);null===E||void 0===E||E(t,e)}}),p,u.createElement("span",{className:"".concat(c,"-inner")},w?h:C))}));g.displayName="Switch";var f=g,b=a(68),p=a(93),h=a(72),C=a(217),E=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},v=u.forwardRef((function(e,t){var a,l=e.prefixCls,o=e.size,i=e.disabled,d=e.loading,m=e.className,g=void 0===m?"":m,v=E(e,["prefixCls","size","disabled","loading","className"]),O=u.useContext(b.b),_=O.getPrefixCls,y=O.direction,k=u.useContext(h.b),w=u.useContext(p.b),j=i||w||d,x=_("switch",l),N=u.createElement("div",{className:"".concat(x,"-handle")},d&&u.createElement(c.a,{className:"".concat(x,"-loading-icon")})),S=s()((a={},Object(r.a)(a,"".concat(x,"-small"),"small"===(o||k)),Object(r.a)(a,"".concat(x,"-loading"),d),Object(r.a)(a,"".concat(x,"-rtl"),"rtl"===y),a),g);return u.createElement(C.a,{insertExtraNode:!0},u.createElement(f,Object(n.a)({},v,{prefixCls:x,className:S,disabled:j,ref:t,loadingIcon:N})))}));v.__ANT_SWITCH=!0;t.a=v},694:function(e,t,a){"use strict";a.r(t);a(155);var n=a(79),r=(a(156),a(37)),c=(a(539),a(538)),l=(a(292),a(216)),s=(a(218),a(157)),o=(a(511),a(513)),i=a(48),u=a(139),d=a(0),m=a.n(d),g=a(16),f=a.n(g),b=a(509),p=a(508),h=a(507),C=a(506),E=a(8),v=a(106),O=a.n(v),_=a(238),y=a(119);t.default=function(){var e=Object(u.a)(Array(10).keys()).map((function(e){return{g_n:"Customer Group ".concat(e+1),g_s:e+1,g_status:!0}})),t=Object(d.useState)({data:e,isLoading:!1}),a=Object(i.a)(t,2),g=a[0],v=(a[1],Object(d.useState)([])),k=Object(i.a)(v,2),w=k[0],j=k[1],x=Object(d.useState)(""),N=Object(i.a)(x,2),S=N[0],I=N[1],P=[{title:"Group Name",dataIndex:"g_n",key:"g_n",sorter:function(e,t){return e.g_n.toUpperCase()>t.g_n.toUpperCase()?1:-1}},{title:"Sort Order",dataIndex:"g_s",key:"g_s",sorter:function(e,t){return e.g_s===t.g_s?0:e.g_s?-1:1}},{title:"Status",dataIndex:"g_status",key:"g_status",align:"right",sorter:function(e,t){return e.g_status===t.g_status?0:e.g_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.g_status===e},render:function(e,t){return m.a.createElement(o.a,{defaultChecked:e,title:"Status",onChange:function(e){}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(E.b,{to:"/admin/customers/add-group?id=".concat(1,"&name=",t.g_n)},m.a.createElement(O.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.a,{title:"Customers Group",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(E.b,{to:"/admin/customers/add-group"},m.a.createElement(C.a,{size:"small",title:"Add Customer Groups",type:"primary"},m.a.createElement(f.a,{icon:"user-plus"}))))]}),m.a.createElement(p.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(h.a,{headless:!0},g.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search Permission...",prefix:m.a.createElement(_.a,null),onChange:function(e){var t=e.target.value;I(t),j(g.data.filter((function(e){return null===e||void 0===e?void 0:e.g_n.toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(c.a,{className:"table-responsive",columns:P,rowKey:"g_s",size:"small",dataSource:S?w:g.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:y.a.CUSTOMER_GROUPS_PER_PAGE,total:S?w.length:g.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
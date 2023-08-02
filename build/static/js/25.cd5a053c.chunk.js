(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[25],{641:function(e,t,a){"use strict";a.d(t,"b",(function(){return p})),a.d(t,"a",(function(){return v}));var n,r,o,i,l,s,u,d=a(8),c=a(16),p={GET_ALL_CUSTOMER:Object(c.d)(n||(n=Object(d.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(c.d)(r||(r=Object(d.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},v={ADD_CUSTOMER:Object(c.d)(o||(o=Object(d.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(c.d)(i||(i=Object(d.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(c.d)(l||(l=Object(d.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(c.d)(s||(s=Object(d.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(c.d)(u||(u=Object(d.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},856:function(e,t,a){},984:function(e,t,a){"use strict";a.r(t);a(200);var n=a(97),r=(a(201),a(74)),o=(a(291),a(88)),i=(a(150),a(77)),l=(a(166),a(98)),s=(a(42),a(856),a(221),a(1)),u=a(3),d=a(0),c=a.n(d),p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"}}]},name:"star",theme:"filled"},v=a(15),f=function(e,t){return d.createElement(v.a,Object(u.a)(Object(u.a)({},e),{},{ref:t,icon:p}))};f.displayName="StarFilled";var m=d.forwardRef(f),h=a(2),b=a(28),y=a(29),g=a(33),O=a(34),E=a(130),C=a(4),_=a.n(C),j=a(14);var D=function(e){Object(g.a)(a,e);var t=Object(O.a)(a);function a(){var e;Object(b.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onHover=function(t){var a=e.props;(0,a.onHover)(t,a.index)},e.onClick=function(t){var a=e.props;(0,a.onClick)(t,a.index)},e.onKeyDown=function(t){var a=e.props,n=a.onClick,r=a.index;13===t.keyCode&&n(t,r)},e}return Object(y.a)(a,[{key:"getClassName",value:function(){var e=this.props,t=e.prefixCls,a=e.index,n=e.value,r=e.allowHalf,o=e.focused,i=a+1,l=t;return 0===n&&0===a&&o?l+=" ".concat(t,"-focused"):r&&n+.5>=i&&n<i?(l+=" ".concat(t,"-half ").concat(t,"-active"),o&&(l+=" ".concat(t,"-focused"))):(l+=" ".concat(t,i<=n?"-full":"-zero"),i===n&&o&&(l+=" ".concat(t,"-focused"))),l}},{key:"render",value:function(){var e=this.onHover,t=this.onClick,a=this.onKeyDown,n=this.props,r=n.disabled,o=n.prefixCls,i=n.character,l=n.characterRender,s=n.index,u=n.count,d=n.value,p="function"===typeof i?i(this.props):i,v=c.a.createElement("li",{className:this.getClassName()},c.a.createElement("div",{onClick:r?null:t,onKeyDown:r?null:a,onMouseMove:r?null:e,role:"radio","aria-checked":d>s?"true":"false","aria-posinset":s+1,"aria-setsize":u,tabIndex:r?-1:0},c.a.createElement("div",{className:"".concat(o,"-first")},p),c.a.createElement("div",{className:"".concat(o,"-second")},p)));return l&&(v=l(v,this.props)),v}}]),a}(c.a.Component);function I(){}var S=function(e){Object(g.a)(a,e);var t=Object(O.a)(a);function a(e){var n;Object(b.a)(this,a),(n=t.call(this,e)).stars=void 0,n.rate=void 0,n.onHover=function(e,t){var a=n.props.onHoverChange,r=n.getStarValue(t,e.pageX);r!==n.state.cleanedValue&&n.setState({hoverValue:r,cleanedValue:null}),a(r)},n.onMouseLeave=function(){var e=n.props.onHoverChange;n.setState({hoverValue:void 0,cleanedValue:null}),e(void 0)},n.onClick=function(e,t){var a=n.props.allowClear,r=n.state.value,o=n.getStarValue(t,e.pageX),i=!1;a&&(i=o===r),n.onMouseLeave(),n.changeValue(i?0:o),n.setState({cleanedValue:i?o:null})},n.onFocus=function(){var e=n.props.onFocus;n.setState({focused:!0}),e&&e()},n.onBlur=function(){var e=n.props.onBlur;n.setState({focused:!1}),e&&e()},n.onKeyDown=function(e){var t=e.keyCode,a=n.props,r=a.count,o=a.allowHalf,i=a.onKeyDown,l="rtl"===a.direction,s=n.state.value;t===j.a.RIGHT&&s<r&&!l?(s+=o?.5:1,n.changeValue(s),e.preventDefault()):t===j.a.LEFT&&s>0&&!l||t===j.a.RIGHT&&s>0&&l?(s-=o?.5:1,n.changeValue(s),e.preventDefault()):t===j.a.LEFT&&s<r&&l&&(s+=o?.5:1,n.changeValue(s),e.preventDefault()),i&&i(e)},n.saveRef=function(e){return function(t){n.stars[e]=t}},n.saveRate=function(e){n.rate=e};var r=e.value;return void 0===r&&(r=e.defaultValue),n.stars={},n.state={value:r,focused:!1,cleanedValue:null},n}return Object(y.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,a=e.disabled;t&&!a&&this.focus()}},{key:"getStarDOM",value:function(e){return Object(E.a)(this.stars[e])}},{key:"getStarValue",value:function(e,t){var a=this.props,n=a.allowHalf,r="rtl"===a.direction,o=e+1;if(n){var i=this.getStarDOM(e),l=function(e){var t=function(e){var t,a,n=e.ownerDocument,r=n.body,o=n&&n.documentElement,i=e.getBoundingClientRect();return t=i.left,a=i.top,{left:t-=o.clientLeft||r.clientLeft||0,top:a-=o.clientTop||r.clientTop||0}}(e),a=e.ownerDocument,n=a.defaultView||a.parentWindow;return t.left+=function(e){var t=e.pageXOffset;if("number"!==typeof t){var a=e.document;"number"!==typeof(t=a.documentElement.scrollLeft)&&(t=a.body.scrollLeft)}return t}(n),t.left}(i),s=i.clientWidth;(r&&t-l>s/2||!r&&t-l<s/2)&&(o-=.5)}return o}},{key:"focus",value:function(){this.props.disabled||this.rate.focus()}},{key:"blur",value:function(){this.props.disabled||this.rate.blur()}},{key:"changeValue",value:function(e){var t=this.props.onChange;"value"in this.props||this.setState({value:e}),t(e)}},{key:"render",value:function(){for(var e=this.props,t=e.count,a=e.allowHalf,n=e.style,r=e.prefixCls,o=e.disabled,i=e.className,l=e.character,s=e.characterRender,u=e.tabIndex,d=e.direction,p=this.state,v=p.value,f=p.hoverValue,m=p.focused,b=[],y=o?"".concat(r,"-disabled"):"",g=0;g<t;g+=1)b.push(c.a.createElement(D,{ref:this.saveRef(g),index:g,count:t,disabled:o,prefixCls:"".concat(r,"-star"),allowHalf:a,value:void 0===f?v:f,onClick:this.onClick,onHover:this.onHover,key:g,character:l,characterRender:s,focused:m}));var O=_()(r,y,i,Object(h.a)({},"".concat(r,"-rtl"),"rtl"===d));return c.a.createElement("ul",{className:O,style:n,onMouseLeave:o?null:this.onMouseLeave,tabIndex:o?-1:u,onFocus:o?null:this.onFocus,onBlur:o?null:this.onBlur,onKeyDown:o?null:this.onKeyDown,ref:this.saveRate,role:"radiogroup"},b)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"value"in e&&void 0!==e.value?Object(u.a)(Object(u.a)({},t),{},{value:e.value}):t}}]),a}(c.a.Component);S.defaultProps={defaultValue:0,count:5,allowHalf:!1,allowClear:!0,style:{},prefixCls:"rc-rate",onChange:I,character:"\u2605",onHoverChange:I,tabIndex:0,direction:"ltr"};var w=S,x=a(67),k=a(118),A=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a};var R=d.forwardRef((function(e,t){var a=e.prefixCls,n=e.tooltips,r=e.character,o=void 0===r?d.createElement(m,null):r,i=A(e,["prefixCls","tooltips","character"]),l=d.useContext(x.b),u=l.getPrefixCls,c=l.direction,p=u("rate",a);return d.createElement(w,Object(s.a)({ref:t,character:o,characterRender:function(e,t){var a=t.index;return n?d.createElement(k.a,{title:n[a]},e):e}},i,{prefixCls:p,direction:c}))})),T=a(23),L=a(217),M=a(165),N=a(164),V=a(58),U=a(12),H=a(71),B=a(641),P=a(219),$=a.n(P),G=a(22),q=a(287),F=a(50),z=a(76);t.default=function(){Object(G.f)("customer");var e=Object(V.useParams)(),t=Object(F.d)((function(e){return e.auth.token})),a=Object(d.useState)([]),s=Object(T.a)(a,2),u=s[0],p=s[1],v=Object(d.useState)([]),f=Object(T.a)(v,2),m=f[0],h=f[1],b=Object(d.useState)({data:[],isLoading:!0}),y=Object(T.a)(b,2),g=y[0],O=y[1];Object(d.useEffect)((function(){(null===e||void 0===e?void 0:e.id)&&(H.j.query({query:H.i.GET_SINGLE_CUSTOMER,variables:{customer_id:parseInt(null===e||void 0===e?void 0:e.id)},context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;O({data:a.data,isLoading:!1})})),H.j.query({query:H.i.GET_ALL_ORDER_BY_CUSTOMER_ID,variables:{customer_id:parseInt(null===e||void 0===e?void 0:e.id)},context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderListByCustomerID;if(!(null===a||void 0===a?void 0:a.status))return Object(z.a)();h(null===a||void 0===a?void 0:a.data)})),H.j.query({query:B.b.GET_RATING_BY_USER_ID,variables:{query:{user_id:parseInt(null===e||void 0===e?void 0:e.id)}},context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getRatingsByUserID;if(!(null===a||void 0===a?void 0:a.status))return Object(z.a)();p(null===a||void 0===a?void 0:a.data)})))}),[e.id,t]);var E=[{title:"Order ID",dataIndex:"id",key:"id",width:100},{title:"Total Amount",dataIndex:"total",key:"total",width:100,ellipsis:!0,render:function(e){return c.a.createElement("p",null,"$ ",e)}},{title:"Discount",dataIndex:"discount_amount",key:"discount_amount",width:100,ellipsis:!0,render:function(e){return c.a.createElement("p",null,"$ ",e)}},{title:"Product Count",dataIndex:"productCount",key:"productCount",width:100,ellipsis:!0},{title:"Order Status",dataIndex:["orderStatus","name"],key:"name",width:150},{title:"Payment Method",dataIndex:["paymentmethod","name"],key:"name",width:150}],C=[{title:"Product ID",dataIndex:["product","id"],key:"id",width:90},{title:"Product Name",dataIndex:["product","prod_name"],key:"prod_name",width:120,ellipsis:!0},{title:"Description",dataIndex:"rating_description",key:"rating_description",width:250,ellipsis:!0},{title:"Rating",dataIndex:"rating",key:"rating",width:150,render:function(e,t){return c.a.createElement(R,{allowHalf:!0,defaultValue:e})},ellipsis:!0},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,render:function(e,t){return c.a.createElement("span",{className:"status-text"},c.a.createElement($.a,{format:"DD MMMM YYYY"},parseInt(e)))},ellipsis:!0}];return c.a.createElement(c.a.Fragment,null,c.a.createElement(L.a,{title:"Manage User | View User ".concat(g.isLoading?"":"(".concat(g.data.email,")"))}),c.a.createElement(M.b,null,c.a.createElement(n.a,{gutter:25},c.a.createElement(r.a,{sm:24,xs:24},c.a.createElement(N.a,{headless:!0},e.id&&g.isLoading?c.a.createElement("div",{div:!0,className:"spin"},c.a.createElement(l.a,null)):c.a.createElement(c.a.Fragment,null,c.a.createElement(o.a,null,c.a.createElement(o.a.TabPane,{tab:"Order",key:"order"},c.a.createElement(i.a,{className:"table-responsive",columns:E,rowKey:"id",size:"small",dataSource:m,pagination:!1})),c.a.createElement(o.a.TabPane,{tab:"Rating",key:"rating"},c.a.createElement(i.a,{className:"table-responsive",columns:C,rowKey:"date",size:"small",dataSource:u,pagination:!1}))),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},c.a.createElement(U.b,{to:"/admin/customers/list"},c.a.createElement(q.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel")))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[29],{1009:function(e,t,n){"use strict";n.r(t);n(143);var a=n(68),s=(n(144),n(52)),r=(n(133),n(71)),i=(n(115),n(39)),o=(n(132),n(74)),c=n(7),l=n(14),u=n(0),d=n.n(u),m=(n(19),n(120)),g=n(101),p=n(99),b=(n(100),n(12)),f=n(103),C=n.n(f),E=n(195),j=n(122),_=n(28),h=n(72),v=n.n(h),S=n(23),O=n(631);t.default=function(){Object(S.c)("customer-group");var e=Object(u.useState)({data:[],isLoading:!0}),t=Object(l.a)(e,2),n=t[0],f=t[1],h=Object(u.useState)([]),U=Object(l.a)(h,2),T=U[0],y=U[1],M=Object(u.useState)(""),x=Object(l.a)(M,2),I=x[0],L=x[1],N=[{title:"ID",dataIndex:"id",key:"id",sorter:function(e,t){return e.id>t.id?1:-1}},{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Email",dataIndex:"email",key:"email",render:function(e){return d.a.createElement("a",{href:"tel:".concat(e)},e)},sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"Phone",dataIndex:"phone",key:"phone",sorter:function(e,t){return e.phone.toUpperCase()>t.phone.toUpperCase()?1:-1}},{title:"Subject",dataIndex:"subject",key:"subject",ellipsis:!0,sorter:function(e,t){return e.subject.toUpperCase()>t.subject.toUpperCase()?1:-1}},{title:"Message",dataIndex:"message",key:"message",ellipsis:!0,render:function(e){return d.a.createElement("p",{style:{maxWidth:"250px",whiteSpace:"normal"}},e)},sorter:function(e,t){return e.message.toUpperCase()>t.message.toUpperCase()?1:-1}},{title:"View",dataIndex:"id",width:70,align:"right",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(b.b,{to:"/admin/supports/message?id=".concat(e)},d.a.createElement(C.a,{name:"eye",style:{margin:".5em 1em"}})))},key:"id"}];Object(u.useEffect)((function(){_.j.query({query:O.a.GET_CONTACT_US_MSG_LIST,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getContactUsMsgList;(null===n||void 0===n?void 0:n.status)&&f((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){f((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){f((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(m.a,{title:"Messages"}),d.a.createElement(g.b,null,d.a.createElement(a.a,{gutter:25},d.a.createElement(s.a,{sm:24,xs:24},d.a.createElement(p.a,{headless:!0},n.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(o.a,null)):d.a.createElement(d.a.Fragment,null,d.a.createElement(i.a,{placeholder:"Search Message...",prefix:d.a.createElement(E.a,null),onChange:function(e){var t=e.target.value;L(t),y(n.data.filter((function(e){return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.message)+(null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.phone)+(null===e||void 0===e?void 0:e.subject)).toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(r.a,{scroll:{x:"max-content"},className:"table-responsive",columns:N,rowKey:"id",size:"small",dataSource:I?T:n.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"},pagination:{defaultPageSize:j.a.CONTACT_US_MESSAGE_PER_PAGE,total:I?T.length:n.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}},631:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a,s,r,i=n(8),o=n(17),c={GET_CONTACT_US_MSG_LIST:Object(o.d)(a||(a=Object(i.a)(["\n    query getContactUsMsgList {\n        getContactUsMsgList{\n          message\n          status\n          tenant_id\n          data {\n            id\n            name\n            email\n            phone\n            subject\n            message\n            tenant_id\n            images {\n              id\n              image\n              tenant_id\n            }\n          }\n        }\n      }\n    "]))),GET_SINGLE_CONTACT_US_MSG:Object(o.d)(s||(s=Object(i.a)(["\n    query getSingleContactUsMsg($query: GetSingleContactMessageInput) {\n      getSingleContactUsMsg(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    "]))),GET_CONTACT_US_UNREAD_MSG_LIST:Object(o.d)(r||(r=Object(i.a)(["\n    query getContactUsUnreadMsgList {\n      getContactUsUnreadMsgList{\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          isRead\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    \n    "])))}}}]);
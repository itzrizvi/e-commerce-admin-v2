(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[24],{628:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a,s,r,i=n(9),o=n(20),c={GET_CONTACT_US_MSG_LIST:Object(o.d)(a||(a=Object(i.a)(["\n    query getContactUsMsgList {\n        getContactUsMsgList{\n          message\n          status\n          tenant_id\n          data {\n            id\n            name\n            email\n            phone\n            subject\n            message\n            tenant_id\n            images {\n              id\n              image\n              tenant_id\n            }\n          }\n        }\n      }\n    "]))),GET_SINGLE_CONTACT_US_MSG:Object(o.d)(s||(s=Object(i.a)(["\n    query getSingleContactUsMsg($query: GetSingleContactMessageInput) {\n      getSingleContactUsMsg(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    "]))),GET_CONTACT_US_UNREAD_MSG_LIST:Object(o.d)(r||(r=Object(i.a)(["\n    query getContactUsUnreadMsgList {\n      getContactUsUnreadMsgList{\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          isRead\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    \n    "])))}},972:function(e,t,n){"use strict";n.r(t);n(100);var a=n(50),s=(n(101),n(40)),r=(n(102),n(54)),i=(n(74),n(17)),o=(n(121),n(69)),c=n(7),l=n(14),u=n(0),d=n.n(u),m=(n(18),n(81)),g=n(77),p=n(76),b=(n(72),n(11)),f=n(103),C=n.n(f),E=n(193),j=n(110),h=n(29),S=n(65),v=n.n(S),_=n(25),O=n(628);t.default=function(){Object(_.c)("customer-group");var e=Object(u.useState)({data:[],isLoading:!0}),t=Object(l.a)(e,2),n=t[0],f=t[1],S=Object(u.useState)([]),U=Object(l.a)(S,2),T=U[0],y=U[1],M=Object(u.useState)(""),x=Object(l.a)(M,2),I=x[0],L=x[1],N=[{title:"ID",dataIndex:"id",key:"id",sorter:function(e,t){return e.id>t.id?1:-1}},{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Email",dataIndex:"email",key:"email",render:function(e){return d.a.createElement("a",{href:"tel:".concat(e)},e)},sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"Phone",dataIndex:"phone",key:"phone",sorter:function(e,t){return e.phone.toUpperCase()>t.phone.toUpperCase()?1:-1}},{title:"Subject",dataIndex:"subject",key:"subject",ellipsis:!0,sorter:function(e,t){return e.subject.toUpperCase()>t.subject.toUpperCase()?1:-1}},{title:"Message",dataIndex:"message",key:"message",ellipsis:!0,render:function(e){return d.a.createElement("p",{style:{maxWidth:"250px",whiteSpace:"normal"}},e)},sorter:function(e,t){return e.message.toUpperCase()>t.message.toUpperCase()?1:-1}},{title:"View",dataIndex:"id",width:70,align:"right",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(b.b,{to:"/admin/supports/message?id=".concat(e)},d.a.createElement(C.a,{name:"eye",style:{margin:".5em 1em"}})))},key:"id"}];Object(u.useEffect)((function(){h.j.query({query:O.a.GET_CONTACT_US_MSG_LIST,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getContactUsMsgList;(null===n||void 0===n?void 0:n.status)&&f((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){f((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){f((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(m.a,{title:"Messages"}),d.a.createElement(g.b,null,d.a.createElement(a.a,{gutter:25},d.a.createElement(s.a,{sm:24,xs:24},d.a.createElement(p.a,{headless:!0},n.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(o.a,null)):d.a.createElement(d.a.Fragment,null,d.a.createElement(i.a,{placeholder:"Search Message...",prefix:d.a.createElement(E.a,null),onChange:function(e){var t=e.target.value;L(t),y(n.data.filter((function(e){return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.message)+(null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.phone)+(null===e||void 0===e?void 0:e.subject)).toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(r.a,{scroll:{x:"max-content"},className:"table-responsive",columns:N,rowKey:"id",size:"small",dataSource:I?T:n.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:j.a.CONTACT_US_MESSAGE_PER_PAGE,total:I?T.length:n.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[57],{975:function(e,t,a){"use strict";a.r(t);a(114);var n,r=a(55),s=(a(115),a(41)),o=(a(135),a(69)),i=(a(77),a(17)),l=(a(134),a(73)),c=a(7),u=a(16),m=a(0),d=a.n(m),p=(a(18),a(104)),g=a(91),b=a(90),f=(a(78),a(116)),E=a.n(f),h=a(192),j=a(124),C=a(42),_=a(64),v=a.n(_),O=a(25),S=a(9),U=a(20),y={GET_CONTACT_US_MSG_LIST:Object(U.d)(n||(n=Object(S.a)(["\n    query getContactUsMsgList {\n        getContactUsMsgList{\n          message\n          status\n          tenant_id\n          data {\n            id\n            name\n            email\n            phone\n            subject\n            message\n            tenant_id\n            images {\n              id\n              image\n              tenant_id\n            }\n          }\n        }\n      }\n    "])))};t.default=function(){Object(O.c)("customer-group");var e=Object(m.useState)({data:[],isLoading:!0}),t=Object(u.a)(e,2),a=t[0],n=t[1],f=Object(m.useState)([]),_=Object(u.a)(f,2),S=_[0],U=_[1],T=Object(m.useState)(""),L=Object(u.a)(T,2),w=L[0],x=L[1],I=[{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Email",dataIndex:"email",key:"email",sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"Phone",dataIndex:"phone",key:"phone",sorter:function(e,t){return e.phone.toUpperCase()>t.phone.toUpperCase()?1:-1}},{title:"Subject",dataIndex:"subject",key:"subject",ellipsis:!0,sorter:function(e,t){return e.subject.toUpperCase()>t.subject.toUpperCase()?1:-1}},{title:"Message",dataIndex:"message",key:"message",ellipsis:!0,sorter:function(e,t){return e.message.toUpperCase()>t.message.toUpperCase()?1:-1}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(E.a,{name:"eye",style:{margin:".5em 1em"}}))},key:"last_name"}];Object(m.useEffect)((function(){C.j.query({query:y.GET_CONTACT_US_MSG_LIST,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getContactUsMsgList;(null===a||void 0===a?void 0:a.status)&&n((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){n((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){n((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:"Messages"}),d.a.createElement(g.b,null,d.a.createElement(r.a,{gutter:25},d.a.createElement(s.a,{sm:24,xs:24},d.a.createElement(b.a,{headless:!0},a.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(l.a,null)):d.a.createElement(d.a.Fragment,null,d.a.createElement(i.a,{placeholder:"Search Message...",prefix:d.a.createElement(h.a,null),onChange:function(e){var t=e.target.value;x(t),U(a.data.filter((function(e){return((null===e||void 0===e?void 0:e.customer_group_name)+(null===e||void 0===e?void 0:e.customergroup_description)+e.customergroup_sortorder).toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(o.a,{className:"table-responsive",columns:I,rowKey:"id",size:"small",dataSource:w?S:a.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:j.a.CUSTOMER_GROUPS_PER_PAGE,total:w?S.length:a.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
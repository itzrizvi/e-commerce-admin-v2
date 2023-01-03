(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[37],{610:function(e,t,a){"use strict";a.d(t,"a",(function(){return _}));var n,l,r,i,d,m,s,u,o,E,c,p,T,g=a(8),A=a(17),_={GET_EMAIL_HEADER_FOOTER_LIST:Object(A.d)(n||(n=Object(g.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(A.d)(l||(l=Object(g.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(A.d)(r||(r=Object(g.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(A.d)(i||(i=Object(g.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(A.d)(d||(d=Object(g.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(A.d)(m||(m=Object(g.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(A.d)(s||(s=Object(g.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(A.d)(u||(u=Object(g.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(A.d)(o||(o=Object(g.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(A.d)(E||(E=Object(g.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(A.d)(c||(c=Object(g.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(A.d)(p||(p=Object(g.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(A.d)(T||(T=Object(g.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}},999:function(e,t,a){"use strict";a.r(t);a(140);var n=a(65),l=(a(141),a(50)),r=(a(131),a(69)),i=(a(113),a(38)),d=(a(130),a(72)),m=a(7),s=a(14),u=a(0),o=a.n(u),E=a(190),c=a(19),p=a.n(c),T=a(118),g=a(99),A=a(97),_=a(98),O=a(12),L=a(101),b=a.n(L),y=a(100),I=a(45),j=a(213),f=a.n(j),v=a(23),M=a(120),h=a(610);t.default=function(){var e,t;Object(v.c)("email-template");var a=Object(u.useState)({data:[],loading:!0,error:""}),c=Object(s.a)(a,2),L=c[0],j=c[1],S=Object(u.useState)([]),F=Object(s.a)(S,2),P=F[0],H=F[1],q=Object(u.useState)(!1),$=Object(s.a)(q,2),C=$[0],N=$[1],w=Object(I.d)((function(e){return e.auth.token}));Object(u.useEffect)((function(){y.b.query({query:h.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:w}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTempHeaderFooterList;j((function(e){return Object(m.a)(Object(m.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){j((function(e){return Object(m.a)(Object(m.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){j((function(e){return Object(m.a)(Object(m.a)({},e),{},{loading:!1})}))}))}),[]);var D=[{title:"ID",dataIndex:"id",key:"id",width:40,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Name",dataIndex:"name",key:"name",width:200,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:200,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Type",dataIndex:"type",key:"type",width:200,ellipsis:!0,sorter:function(e,t){return e.type.toUpperCase()>t.type.toUpperCase()?1:-1},render:function(e){return e.toUpperCase()}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:120,render:function(e,t){return o.a.createElement("span",{className:"status-text"},o.a.createElement(f.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:80,render:function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement(O.b,{to:"/admin/email/header-footer/edit/".concat(t.id)},o.a.createElement(b.a,{name:"edit"})))}}];return o.a.createElement(o.a.Fragment,null,o.a.createElement(T.a,{title:"Email Header Footer",buttons:[o.a.createElement("div",{key:"1",className:"page-header-actions"},o.a.createElement(O.b,{to:"/admin/email/header-footer/add"},o.a.createElement(_.a,{size:"small",title:"Add Email Header Footer",type:"primary"},o.a.createElement(p.a,{icon:"plus"}))))]}),o.a.createElement(g.b,null,o.a.createElement(n.a,{gutter:25},o.a.createElement(l.a,{sm:24,xs:24},o.a.createElement(A.a,{headless:!0},L.loading?o.a.createElement("div",{className:"spin"},o.a.createElement(d.a,null)):L.error?o.a.createElement("p",null,L.error):o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{placeholder:"Search in Email Header Footer...",prefix:o.a.createElement(E.a,null),onChange:function(e){var t=e.target.value;N(t),H(L.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)+(null===e||void 0===e?void 0:e.type)).toLowerCase().includes(t.toLowerCase())})))}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("span",{className:"psp_list"},o.a.createElement(r.a,{className:"table-responsive",columns:D,pagination:{defaultPageSize:M.a.EMAIL_TEMPLATE_PER_PAGE,total:C?null===L||void 0===L||null===(e=L.data)||void 0===e?void 0:e.length:null===L||void 0===L||null===(t=L.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:C?P:L.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"}}))))))))}}}]);
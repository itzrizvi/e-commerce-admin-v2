(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[48],{632:function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n,l,i,r,d,m,u,s,c,E,o,p,T,_=a(8),g=a(16),A={GET_EMAIL_HEADER_FOOTER_LIST:Object(g.d)(n||(n=Object(_.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(l||(l=Object(_.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(i||(i=Object(_.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(g.d)(r||(r=Object(_.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(g.d)(d||(d=Object(_.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(g.d)(m||(m=Object(_.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(g.d)(u||(u=Object(_.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(g.d)(s||(s=Object(_.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(g.d)(c||(c=Object(_.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(g.d)(E||(E=Object(_.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(g.d)(o||(o=Object(_.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(g.d)(p||(p=Object(_.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(g.d)(T||(T=Object(_.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}},981:function(e,t,a){"use strict";a.r(t);a(200);var n=a(97),l=(a(201),a(74)),i=(a(315),a(316)),r=(a(150),a(77)),d=(a(148),a(45)),m=(a(166),a(98)),u=a(9),s=a(23),c=a(0),E=a.n(c),o=a(192),p=a(21),T=a.n(p),_=a(217),g=a(165),A=a(164),O=a(287),L=a(12),b=a(126),I=a.n(b),j=a(99),y=a(50),v=a(219),f=a.n(v),M=a(22),h=a(135),P=a(632);t.default=function(){var e,t;Object(M.f)("email-template");var a=Object(c.useState)({data:[],loading:!0,error:""}),p=Object(s.a)(a,2),b=p[0],v=p[1],S=Object(c.useState)([]),q=Object(s.a)(S,2),F=q[0],N=q[1],$=Object(c.useState)(!1),w=Object(s.a)($,2),D=w[0],H=w[1],C=Object(y.d)((function(e){return e.auth.token})),G=Object(c.useState)(!1),U=Object(s.a)(G,2),k=U[0],R=U[1],x=Object(c.useState)(""),z=Object(s.a)(x,2),Y=z[0],J=z[1];Object(c.useEffect)((function(){j.b.query({query:P.a.GET_EMAIL_TEMPLATE_LIST,context:{headers:{TENANTID:"100001",Authorization:C}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllEmailTemplateList;v((function(e){return Object(u.a)(Object(u.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).finally((function(){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))}),[]);var V=[{title:"ID",dataIndex:"id",key:"id",width:40,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Email Template ID",dataIndex:"email_template_id",key:"email_template_id",width:200,ellipsis:!0,sorter:function(e,t){return e.email_template_id.toUpperCase()>t.email_template_id.toUpperCase()?1:-1},render:function(e){return null!==e&&void 0!==e?e:"Not Used!"}},{title:"Name",dataIndex:"name",key:"name",width:200,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:200,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:120,render:function(e,t){return E.a.createElement("span",{className:"status-text"},E.a.createElement(f.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:80,render:function(e,t){return E.a.createElement(E.a.Fragment,null,E.a.createElement(L.b,{to:"/admin/email/template/edit/".concat(t.id)},E.a.createElement(I.a,{name:"edit"})),E.a.createElement(O.a,{shape:"circle",onClick:function(){return W(t.id)}},E.a.createElement(I.a,{name:"eye"})))}}],W=function(e){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!0})})),j.b.query({query:P.a.GET_EMAIL_TEMPLATE_PREVIEW,variables:{query:{templatelist_id:e}},context:{headers:{TENANTID:"100001",Authorization:C}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTemplatePreview;J(null===a||void 0===a?void 0:a.data),R(!0)})).finally((function(){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))};return E.a.createElement(E.a.Fragment,null,E.a.createElement(_.a,{title:"Email Template",buttons:[E.a.createElement("div",{key:"email-template",className:"page-header-actions"},E.a.createElement(L.b,{to:"/admin/email/template/add"},E.a.createElement(O.a,{size:"small",title:"Add Email Template",type:"primary"},E.a.createElement(T.a,{icon:"plus"}))))]}),E.a.createElement(g.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(l.a,{sm:24,xs:24},E.a.createElement(A.a,{headless:!0},b.loading?E.a.createElement("div",{className:"spin"},E.a.createElement(m.a,null)):b.error?E.a.createElement("p",null,b.error):E.a.createElement(E.a.Fragment,null,E.a.createElement(d.a,{placeholder:"Search in Email Template...",prefix:E.a.createElement(o.a,null),onChange:function(e){var t=e.target.value;H(t),N(b.data.filter((function(e){return((null===e||void 0===e?void 0:e.email_template_id)+(null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)).toLowerCase().includes(t.toLowerCase())})))}}),E.a.createElement("br",null),E.a.createElement("br",null),E.a.createElement("span",{className:"psp_list"},E.a.createElement(r.a,{className:"table-responsive",columns:V,pagination:{defaultPageSize:h.a.EMAIL_TEMPLATE_PER_PAGE,total:D?null===b||void 0===b||null===(e=b.data)||void 0===e?void 0:e.length:null===b||void 0===b||null===(t=b.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:D?F:b.data})))),E.a.createElement(i.a,{title:"Template Preview",centered:!0,open:k,onOk:function(){return R(!1)},onCancel:function(){return R(!1)},width:800},E.a.createElement("div",{dangerouslySetInnerHTML:{__html:Y}}))))))}}}]);
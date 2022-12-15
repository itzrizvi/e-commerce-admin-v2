(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[40],{1005:function(e,t,a){"use strict";a.r(t);a(121);var n=a(55),l=(a(122),a(43)),i=(a(379),a(694)),r=(a(143),a(74)),d=(a(116),a(35)),m=(a(133),a(73)),u=a(7),c=a(15),s=a(0),o=a.n(s),E=a(193),p=a(20),T=a.n(p),g=a(123),_=a(101),A=a(100),O=a(99),b=a(10),L=a(103),j=a.n(L),I=a(102),y=a(48),v=a(216),f=a.n(v),M=a(23),h=a(124),S=a(624);t.default=function(){var e,t;Object(M.c)("email-template");var a=Object(s.useState)({data:[],loading:!0,error:""}),p=Object(c.a)(a,2),L=p[0],v=p[1],P=Object(s.useState)([]),q=Object(c.a)(P,2),w=q[0],N=q[1],F=Object(s.useState)(!1),$=Object(c.a)(F,2),C=$[0],D=$[1],H=Object(y.d)((function(e){return e.auth.token})),G=Object(s.useState)(!1),U=Object(c.a)(G,2),k=U[0],R=U[1],x=Object(s.useState)(""),z=Object(c.a)(x,2),W=z[0],Y=z[1];Object(s.useEffect)((function(){I.b.query({query:S.a.GET_EMAIL_TEMPLATE_LIST,context:{headers:{TENANTID:"100001",Authorization:H}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllEmailTemplateList;v((function(e){return Object(u.a)(Object(u.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))}),[]);var J=[{title:"ID",dataIndex:"id",key:"id",width:40,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Email Template ID",dataIndex:"email_template_id",key:"email_template_id",width:200,ellipsis:!0,sorter:function(e,t){return e.email_template_id.toUpperCase()>t.email_template_id.toUpperCase()?1:-1},render:function(e){return null!==e&&void 0!==e?e:"Not Used!"}},{title:"Name",dataIndex:"name",key:"name",width:200,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:200,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:120,render:function(e,t){return o.a.createElement("span",{className:"status-text"},o.a.createElement(f.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:80,render:function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.b,{to:"/admin/email/template/edit/".concat(t.id)},o.a.createElement(j.a,{name:"edit"})),o.a.createElement(O.a,{shape:"circle",onClick:function(){return V(t.id)}},o.a.createElement(j.a,{name:"eye"})))}}],V=function(e){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!0})})),I.b.query({query:S.a.GET_EMAIL_TEMPLATE_PREVIEW,variables:{query:{templatelist_id:e}},context:{headers:{TENANTID:"100001",Authorization:H}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTemplatePreview;Y(null===a||void 0===a?void 0:a.data),R(!0)})).catch((function(e){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){v((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))};return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,{title:"Email Template",buttons:[o.a.createElement("div",{key:"email-template",className:"page-header-actions"},o.a.createElement(b.b,{to:"/admin/email/template/add"},o.a.createElement(O.a,{size:"small",title:"Add Email Template",type:"primary"},o.a.createElement(T.a,{icon:"plus"}))))]}),o.a.createElement(_.b,null,o.a.createElement(n.a,{gutter:25},o.a.createElement(l.a,{sm:24,xs:24},o.a.createElement(A.a,{headless:!0},L.loading?o.a.createElement("div",{className:"spin"},o.a.createElement(m.a,null)):L.error?o.a.createElement("p",null,L.error):o.a.createElement(o.a.Fragment,null,o.a.createElement(d.a,{placeholder:"Search in Email Template...",prefix:o.a.createElement(E.a,null),onChange:function(e){var t=e.target.value;D(t),N(L.data.filter((function(e){return((null===e||void 0===e?void 0:e.email_template_id)+(null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)).toLowerCase().includes(t.toLowerCase())})))}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("span",{className:"psp_list"},o.a.createElement(r.a,{className:"table-responsive",columns:J,pagination:{defaultPageSize:h.a.EMAIL_TEMPLATE_PER_PAGE,total:C?null===L||void 0===L||null===(e=L.data)||void 0===e?void 0:e.length:null===L||void 0===L||null===(t=L.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:C?w:L.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"}})))),o.a.createElement(i.a,{title:"Template Preview",centered:!0,open:k,onOk:function(){return R(!1)},onCancel:function(){return R(!1)},width:800},o.a.createElement("div",{dangerouslySetInnerHTML:{__html:W}}))))))}},624:function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n,l,i,r,d,m,u,c,s,o,E,p,T,g=a(8),_=a(17),A={GET_EMAIL_HEADER_FOOTER_LIST:Object(_.d)(n||(n=Object(g.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(_.d)(l||(l=Object(g.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(_.d)(i||(i=Object(g.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(_.d)(r||(r=Object(g.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(_.d)(d||(d=Object(g.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(_.d)(m||(m=Object(g.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(_.d)(u||(u=Object(g.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(_.d)(c||(c=Object(g.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(_.d)(s||(s=Object(g.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(_.d)(o||(o=Object(g.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(_.d)(E||(E=Object(g.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(_.d)(p||(p=Object(g.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(_.d)(T||(T=Object(g.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
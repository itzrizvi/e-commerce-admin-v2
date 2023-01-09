(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[37],{1030:function(e,t,a){"use strict";a.r(t);a(143);var n=a(68),l=(a(144),a(52)),i=(a(145),a(30)),m=(a(115),a(39)),d=(a(132),a(74)),r=a(7),E=(a(201),a(27)),s=a(14),u=a(0),o=a.n(u),c=a(120),T=a(101),p=a(99),A=a(100),_=a(59),g=a(12),L=a(47),b=a(33),O=a(102),y=a(23),I=a(625);t.default=function(){Object(y.c)("email-template");var e=Object(_.useHistory)(),t=Object(L.d)((function(e){return e.auth.token})),a=Object(u.useState)(!1),j=Object(s.a)(a,2),f=j[0],M=j[1],v=Object(u.useState)([]),h=Object(s.a)(v,2),S=h[0],P=h[1],q=E.a.useForm(),F=Object(s.a)(q,1)[0];return Object(u.useEffect)((function(){O.b.query({query:I.a.GET_EMAIL_TEMPLATE_CONTENT_LIST,context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTemplateList;P(null===a||void 0===a?void 0:a.data)})).catch((function(e){P([]),console.log("\ud83d\ude80 ~ file: AddTemplate.js:83 ~ useEffect ~ err",e)}))}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(c.a,{title:"Add Email Template"}),o.a.createElement(T.b,null,o.a.createElement(n.a,{gutter:25},o.a.createElement(l.a,{sm:24,xs:24},o.a.createElement(p.a,{headless:!0},f?o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(d.a,{tip:"processing..."})):o.a.createElement(E.a,{style:{width:"100%"},form:F,name:"addEmailTemplate",onFinish:function(a){M(!0),O.b.mutate({mutation:I.a.ADD_EMAIL_TEMPLATE_LIST,variables:{data:Object(r.a)({},a)},refetchQueries:[{query:I.a.GET_EMAIL_TEMPLATE_LIST,context:{headers:{TENANTID:"100001",Authorization:t}},fetchPolicy:"network-only"},["getAllEmailTemplateList"]],context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.addEmailTemplateOnList;if(!(null===n||void 0===n?void 0:n.status))return b.b.error("Something Went wrong !!");setTimeout((function(){e.push("/admin/email/template/list")}),1e3),b.b.success(null===n||void 0===n?void 0:n.message)})).catch((function(e){b.b.error("Something Went wrong !!")})).finally((function(){return M(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},o.a.createElement(E.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Template Name"}],name:"name",label:"Name"},o.a.createElement(m.a,{placeholder:"Enter Template Name"})),o.a.createElement(E.a.Item,{name:"email_template_id",label:"Email Content"},o.a.createElement(i.a,{style:{width:"100%"},placeholder:"Select Email Template Content",optionLabelProp:"label"},null===S||void 0===S?void 0:S.map((function(e){return o.a.createElement(i.a.Option,{value:e.id,label:e.name},o.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),o.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},o.a.createElement(E.a.Item,null,o.a.createElement(A.a,{loading:f,size:"default",htmlType:"submit",type:"primary",raised:!0},f?"Processing":"Save"),o.a.createElement(g.b,{to:"/admin/email/template/list"},o.a.createElement(A.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},625:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n,l,i,m,d,r,E,s,u,o,c,T,p,A=a(8),_=a(17),g={GET_EMAIL_HEADER_FOOTER_LIST:Object(_.d)(n||(n=Object(A.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(_.d)(l||(l=Object(A.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(_.d)(i||(i=Object(A.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(_.d)(m||(m=Object(A.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(_.d)(d||(d=Object(A.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(_.d)(r||(r=Object(A.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(_.d)(E||(E=Object(A.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(_.d)(s||(s=Object(A.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(_.d)(u||(u=Object(A.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(_.d)(o||(o=Object(A.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(_.d)(c||(c=Object(A.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(_.d)(T||(T=Object(A.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(_.d)(p||(p=Object(A.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
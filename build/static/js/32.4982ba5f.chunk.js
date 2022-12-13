(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[32],{616:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n,l,i,d,m,r,o,u,s,E,c,T,p=a(8),A=a(20),g={GET_EMAIL_HEADER_FOOTER_LIST:Object(A.d)(n||(n=Object(p.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(A.d)(l||(l=Object(p.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(A.d)(i||(i=Object(p.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(A.d)(d||(d=Object(p.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(A.d)(m||(m=Object(p.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(A.d)(r||(r=Object(p.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(A.d)(o||(o=Object(p.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(A.d)(u||(u=Object(p.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(A.d)(s||(s=Object(p.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(A.d)(E||(E=Object(p.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(A.d)(c||(c=Object(p.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(A.d)(T||(T=Object(p.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},988:function(e,t,a){"use strict";a.r(t);a(99);var n=a(50),l=(a(100),a(40)),i=(a(155),a(37)),d=(a(79),a(17)),m=(a(121),a(68)),r=a(7),o=(a(154),a(21)),u=a(13),s=a(0),E=a.n(s),c=a(80),T=a(76),p=a(75),A=a(73),g=a(61),L=a(10),_=a(43),b=a(26),O=a(107),v=a(23),I=a(616);t.default=function(){var e,t;Object(v.c)("email-template");var a=Object(g.useParams)(),y=Object(g.useHistory)(),j=Object(_.d)((function(e){return e.auth.token})),f=Object(s.useState)(!1),h=Object(u.a)(f,2),S=h[0],M=h[1],P=Object(s.useState)([]),N=Object(u.a)(P,2),F=N[0],q=N[1],H=Object(s.useState)({data:{},loading:!0,error:""}),$=Object(u.a)(H,2),D=$[0],G=$[1],w=o.a.useForm(),C=Object(u.a)(w,1)[0];return Object(s.useEffect)((function(){O.b.query({query:I.a.SINGLE_EMAIL_TEMPLATE_LIST,variables:{query:{id:parseInt(null===a||void 0===a?void 0:a.id)}},context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleEmailTemplateList;l.status&&(G({data:null===l||void 0===l?void 0:l.data,loading:!1,error:""}),C.setFieldsValue({name:null===l||void 0===l||null===(a=l.data)||void 0===a?void 0:a.name,email_template_id:null===l||void 0===l||null===(n=l.data)||void 0===n?void 0:n.email_template_id}))})).catch((function(e){console.log(e),G({data:{},loading:!1,error:"Something went worng"})}))}),[]),Object(s.useEffect)((function(){O.b.query({query:I.a.GET_EMAIL_TEMPLATE_CONTENT_LIST,context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTemplateList;q(null===a||void 0===a?void 0:a.data)})).catch((function(e){q([]),console.log("\ud83d\ude80 ~ file: AddTemplate.js:83 ~ useEffect ~ err",e)}))}),[]),E.a.createElement(E.a.Fragment,null,E.a.createElement(c.a,{title:"Manage Email Template | Edit Email Template ".concat((null===D||void 0===D||null===(e=D.data)||void 0===e?void 0:e.name)?"(".concat(null===D||void 0===D||null===(t=D.data)||void 0===t?void 0:t.name,")"):"")}),E.a.createElement(T.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(l.a,{sm:24,xs:24},E.a.createElement(p.a,{headless:!0},D.loading?E.a.createElement("div",{style:{textAlign:"center"}},E.a.createElement(m.a,{tip:"processing..."})):E.a.createElement(o.a,{style:{width:"100%"},form:C,name:"EditEmailTemplate",onFinish:function(e){M(!0),O.b.mutate({mutation:I.a.UPDATE_EMAIL_TEMPLATE_LIST,variables:{data:Object(r.a)(Object(r.a)({},e),{},{id:parseInt(null===a||void 0===a?void 0:a.id)})},refetchQueries:[{query:I.a.GET_EMAIL_TEMPLATE_LIST,context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"},["getAllEmailTemplateList"]],context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateEmailTemplateOnList;if(!(null===a||void 0===a?void 0:a.status))return b.b.error("Something Went wrong !!");setTimeout((function(){y.push("/admin/email/template/list")}),1e3),b.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){b.b.error("Something Went wrong !!")})).finally((function(){return M(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(o.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Template Name"}],name:"name",label:"Name"},E.a.createElement(d.a,{placeholder:"Enter Template Name"})),E.a.createElement(o.a.Item,{name:"email_template_id",label:"Email Content"},E.a.createElement(i.a,{style:{width:"100%"},placeholder:"Select Email Template Content",optionLabelProp:"label"},null===F||void 0===F?void 0:F.map((function(e){return E.a.createElement(i.a.Option,{value:e.id,label:e.name},E.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},E.a.createElement(o.a.Item,null,E.a.createElement(A.a,{loading:S,size:"default",htmlType:"submit",type:"primary",raised:!0},S?"Processing":"Save"),E.a.createElement(L.b,{to:"/admin/email/template/list"},E.a.createElement(A.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
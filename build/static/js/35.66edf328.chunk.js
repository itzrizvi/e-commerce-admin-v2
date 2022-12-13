(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[35],{616:function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n,l,i,d,r,o,m,s,u,E,c,p,T=a(8),g=a(20),A={GET_EMAIL_HEADER_FOOTER_LIST:Object(g.d)(n||(n=Object(T.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(l||(l=Object(T.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(i||(i=Object(T.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(g.d)(d||(d=Object(T.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(g.d)(r||(r=Object(T.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(g.d)(o||(o=Object(T.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(g.d)(m||(m=Object(T.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(g.d)(s||(s=Object(T.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(g.d)(u||(u=Object(T.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(g.d)(E||(E=Object(T.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(g.d)(c||(c=Object(T.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(g.d)(p||(p=Object(T.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},991:function(e,t,a){"use strict";a.r(t);a(99);var n=a(50),l=(a(100),a(40)),i=(a(155),a(37)),d=(a(79),a(17)),r=(a(121),a(68)),o=a(7),m=(a(154),a(21)),s=a(13),u=a(0),E=a.n(u),c=a(80),p=a(76),T=a(75),g=a(73),A=a(61),b=a(10),O=a(43),L=a(26),_=a(107),v=a(23),y=a(659),h=a.n(y),I=(a(660),a(616)),j=a(661),F=a.n(j),f=a(662),S=a.n(f);y.Quill.register("modules/imageResize",F.a),y.Quill.register("modules/htmlEditButton",S.a);var H={toolbar:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"},{align:[]}],["link","image","video"],["clean"]],imageResize:{parchment:y.Quill.import("parchment"),modules:["Resize","DisplaySize"]},htmlEditButton:{okText:"Save",msg:'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced'}};t.default=function(){var e,t;Object(v.c)("email-template");var a=Object(A.useParams)(),y=Object(A.useHistory)(),j=Object(O.d)((function(e){return e.auth.token})),F=Object(u.useState)(!1),f=Object(s.a)(F,2),S=f[0],M=f[1],P=Object(u.useState)(""),q=Object(s.a)(P,2),N=q[0],D=q[1],R=Object(u.useState)({data:{},loading:!0,error:""}),$=Object(s.a)(R,2),w=$[0],k=$[1],G=m.a.useForm(),C=Object(s.a)(G,1)[0];return Object(u.useEffect)((function(){_.b.query({query:I.a.SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER,variables:{query:{id:parseInt(null===a||void 0===a?void 0:a.id)}},context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleEmailTempHeaderFooter;i.status&&(k({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""}),C.setFieldsValue({name:null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.name,type:null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.type}),D(null===i||void 0===i||null===(l=i.data)||void 0===l?void 0:l.content))})).catch((function(e){console.log(e),k({data:{},loading:!1,error:"Something went worng"})}))}),[]),E.a.createElement(E.a.Fragment,null,E.a.createElement(c.a,{title:"Manage Email Header/Footer | Edit Email Header/Footer ".concat((null===w||void 0===w||null===(e=w.data)||void 0===e?void 0:e.name)?"(".concat(null===w||void 0===w||null===(t=w.data)||void 0===t?void 0:t.name,")"):"")}),E.a.createElement(p.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(l.a,{sm:24,xs:24},E.a.createElement(T.a,{headless:!0},w.loading?E.a.createElement("div",{style:{textAlign:"center"}},E.a.createElement(r.a,{tip:"processing..."})):E.a.createElement(m.a,{style:{width:"100%"},form:C,name:"editEmailHeaderFooter",onFinish:function(e){M(!0),_.b.mutate({mutation:I.a.EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE,variables:{data:Object(o.a)(Object(o.a)({},e),{},{content:N,id:parseInt(null===a||void 0===a?void 0:a.id)})},refetchQueries:[{query:I.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"},["getEmailTempHeaderFooterList"]],context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateEmailTempHeaderFooter;if(!(null===a||void 0===a?void 0:a.status))return L.b.error("Something Went wrong !!");setTimeout((function(){y.push("/admin/email/header-footer/list")}),1e3),L.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){L.b.error("Something Went wrong !!")})).finally((function(){return M(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(m.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Email Header/Footer Name"}],name:"name",label:"Name"},E.a.createElement(d.a,{placeholder:"Enter Header/Footer Name"})),E.a.createElement(m.a.Item,{name:"type",label:"Type",required:!0},E.a.createElement(i.a,{style:{width:"100%"},placeholder:"Select Header/Footer Type",optionLabelProp:"label"},E.a.createElement(i.a.Option,{value:"header",label:"Header"},E.a.createElement("div",{className:"demo-option-label-item"},"Header")),E.a.createElement(i.a.Option,{value:"footer",label:"Footer"},E.a.createElement("div",{className:"demo-option-label-item"},"Footer")))),E.a.createElement(m.a.Item,{label:"Content",required:!0},E.a.createElement(h.a,{theme:"snow",value:N,modules:H,placeholder:"Content goes here...",onChange:D})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},E.a.createElement(m.a.Item,null,E.a.createElement(g.a,{loading:S,size:"default",htmlType:"submit",type:"primary",raised:!0},S?"Processing":"Save"),E.a.createElement(b.b,{to:"/admin/email/header-footer/list"},E.a.createElement(g.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
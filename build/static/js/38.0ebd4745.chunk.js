(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[38],{1e3:function(e,t,a){"use strict";a.r(t);a(140);var n=a(65),l=(a(141),a(50)),i=(a(294),a(212)),r=(a(142),a(30)),m=(a(130),a(72)),d=a(7),o=(a(196),a(27)),s=a(14),u=(a(113),a(38)),E=a(0),c=a.n(E),p=a(118),T=a(99),g=a(97),b=a(98),A=a(57),_=a(12),O=a(45),L=a(33),y=a(100),I=a(23),h=a(653),j=a.n(h),H=(a(654),a(610)),F=a(655),f=a.n(F),M=a(656),v=a.n(M);h.Quill.register("modules/imageResize",f.a),h.Quill.register("modules/htmlEditButton",v.a);var S={toolbar:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"},{align:[]}],["link","image","video"],["clean"]],imageResize:{parchment:h.Quill.import("parchment"),modules:["Resize","DisplaySize"]},htmlEditButton:{okText:"Save",msg:'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced'}};t.default=function(){Object(I.c)("email-template");var e=u.a.TextArea,t=Object(A.useHistory)(),a=Object(O.d)((function(e){return e.auth.token})),h=Object(E.useState)(!1),F=Object(s.a)(h,2),f=F[0],M=F[1],v=Object(E.useState)(""),P=Object(s.a)(v,2),q=P[0],$=P[1],D=Object(E.useState)(""),N=Object(s.a)(D,2),R=N[0],C=N[1],w=Object(E.useState)(!1),G=Object(s.a)(w,2),k=G[0],x=G[1],z=o.a.useForm(),U=Object(s.a)(z,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{title:"Add Email Header/Footer"}),c.a.createElement(T.b,null,c.a.createElement(n.a,{gutter:25},c.a.createElement(l.a,{sm:24,xs:24},c.a.createElement(g.a,{headless:!0},f?c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(m.a,{tip:"processing..."})):c.a.createElement(o.a,{style:{width:"100%"},form:U,name:"addEmailHeaderFooter",onFinish:function(e){var n;M(!0),n=k?{layout_type:"custom",content:R}:{layout_type:"dynamic",content:q},y.b.mutate({mutation:H.a.ADD_EMAIL_TEMPLATE_HEADER_FOOTER,variables:{data:Object(d.a)(Object(d.a)({},e),n)},refetchQueries:[{query:H.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:a}},fetchPolicy:"network-only"},["getEmailTempHeaderFooterList"]],context:{headers:{TENANTID:"100001",Authorization:a}}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.addEmailTempHeaderFooter;if(!(null===n||void 0===n?void 0:n.status))return L.b.error("Something Went wrong !!");setTimeout((function(){t.push("/admin/email/header-footer/list")}),1e3),L.b.success(null===n||void 0===n?void 0:n.message)})).catch((function(e){L.b.error("Something Went wrong !!")})).finally((function(){return M(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},c.a.createElement(o.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Email Header/Footer Name"}],name:"name",label:"Name"},c.a.createElement(u.a,{placeholder:"Enter Header/Footer Name"})),c.a.createElement(o.a.Item,{name:"type",label:"Type",required:!0},c.a.createElement(r.a,{style:{width:"100%"},placeholder:"Select Header/Footer Type",optionLabelProp:"label"},c.a.createElement(r.a.Option,{value:"header",label:"Header"},c.a.createElement("div",{className:"demo-option-label-item"},"Header")),c.a.createElement(r.a.Option,{value:"footer",label:"Footer"},c.a.createElement("div",{className:"demo-option-label-item"},"Footer")))),c.a.createElement(o.a.Item,{label:"Custom HTML"},c.a.createElement(i.a,{defaultChecked:!1,onChange:function(e){return x(e)}})),!k&&c.a.createElement(o.a.Item,{label:"Content"},c.a.createElement(j.a,{theme:"snow",modules:S,placeholder:"Content goes here...",onChange:$})),k&&c.a.createElement(o.a.Item,{label:"Custom HTML"},c.a.createElement(e,{onChange:function(e){return C(e.target.value)},placeholder:"Paste your HTML Code Here..."})),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement(o.a.Item,null,c.a.createElement(b.a,{loading:f,size:"default",htmlType:"submit",type:"primary",raised:!0},f?"Processing":"Save"),c.a.createElement(_.b,{to:"/admin/email/header-footer/list"},c.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},610:function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n,l,i,r,m,d,o,s,u,E,c,p,T,g=a(8),b=a(17),A={GET_EMAIL_HEADER_FOOTER_LIST:Object(b.d)(n||(n=Object(g.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(l||(l=Object(g.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(i||(i=Object(g.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(b.d)(r||(r=Object(g.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(b.d)(m||(m=Object(g.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(b.d)(d||(d=Object(g.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(b.d)(o||(o=Object(g.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(b.d)(s||(s=Object(g.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(b.d)(u||(u=Object(g.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(b.d)(E||(E=Object(g.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(b.d)(c||(c=Object(g.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(b.d)(p||(p=Object(g.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(b.d)(T||(T=Object(g.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[36],{1030:function(e,t,a){"use strict";a.r(t);a(131);var n=a(63),l=(a(132),a(47)),i=(a(374),a(302)),r=(a(167),a(35)),d=(a(133),a(73)),m=a(7),o=(a(200),a(27)),u=a(15),s=(a(119),a(41)),c=a(0),E=a.n(c),p=a(120),T=a(101),b=a(100),g=a(99),O=a(59),A=a(10),L=a(48),_=a(31),y=a(102),j=a(23),v=a(675),I=a.n(v),f=(a(676),a(628)),h=a(677),S=a.n(h),M=a(678),P=a.n(M);v.Quill.register("modules/imageResize",S.a),v.Quill.register("modules/htmlEditButton",P.a);var H={toolbar:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"},{align:[]}],["link","image","video"],["clean"]],imageResize:{parchment:v.Quill.import("parchment"),modules:["Resize","DisplaySize"]},htmlEditButton:{okText:"Save",msg:'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced'}};t.default=function(){var e,t;Object(j.c)("email-template");var a=s.a.TextArea,v=Object(O.useHistory)(),h=Object(L.d)((function(e){return e.auth.token})),S=Object(c.useState)(!1),M=Object(u.a)(S,2),P=M[0],q=M[1],F=Object(c.useState)(""),N=Object(u.a)(F,2),C=N[0],$=N[1],D=Object(c.useState)(""),R=Object(u.a)(D,2),w=R[0],G=R[1],k=Object(c.useState)(!1),x=Object(u.a)(k,2),z=x[0],B=x[1],U=o.a.useForm(),Q=Object(u.a)(U,1)[0],W=Object(c.useState)({data:[],loading:!0,error:""}),J=Object(u.a)(W,2),V=J[0],K=J[1],X=Object(c.useState)({data:[],loading:!0,error:""}),Y=Object(u.a)(X,2),Z=Y[0],ee=Y[1];return Object(c.useEffect)((function(){y.b.query({query:f.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:h}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTempHeaderFooterList;K((function(e){var t;return Object(m.a)(Object(m.a)({},e),{},{data:null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.filter((function(e){return"header"===e.type})),error:""})})),ee((function(e){var t;return Object(m.a)(Object(m.a)({},e),{},{data:null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.filter((function(e){return"footer"===e.type})),error:""})}))})).finally((function(){K((function(e){return Object(m.a)(Object(m.a)({},e),{},{loading:!1})})),ee((function(e){return Object(m.a)(Object(m.a)({},e),{},{loading:!1})}))}))}),[]),E.a.createElement(E.a.Fragment,null,E.a.createElement(p.a,{title:"Add Email Content"}),E.a.createElement(T.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(l.a,{sm:24,xs:24},E.a.createElement(b.a,{headless:!0},V.loading||Z.loading?E.a.createElement("div",{style:{textAlign:"center"}},E.a.createElement(d.a,{tip:"processing..."})):E.a.createElement(o.a,{style:{width:"100%"},form:Q,name:"addEmailContent",onFinish:function(e){var t;q(!0),t=z?{layout_type:"custom",content:w}:{layout_type:"dynamic",content:C},y.b.mutate({mutation:f.a.CREATE_EMAIL_TEMPLATE,variables:{data:Object(m.a)(Object(m.a)({},e),t)},refetchQueries:[{query:f.a.GET_EMAIL_TEMPLATE_CONTENT_LIST,context:{headers:{TENANTID:"100001",Authorization:h}},fetchPolicy:"network-only"},["getEmailTemplateList"]],context:{headers:{TENANTID:"100001",Authorization:h}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createEmailTemplate;if(!(null===a||void 0===a?void 0:a.status))return _.b.error("Something Went wrong !!");setTimeout((function(){v.push("/admin/email/content/list")}),1e3),_.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){_.b.error("Something Went wrong !!")})).finally((function(){return q(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(o.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Email Body Name"}],name:"name",label:"Name"},E.a.createElement(s.a,{placeholder:"Enter Email Content Name"})),E.a.createElement(o.a.Item,{name:"header_id",label:"Header",rules:[{required:!0,message:"Please Select Header"}]},E.a.createElement(r.a,{style:{width:"100%"},placeholder:"Select Content Header",optionLabelProp:"label"},null===V||void 0===V||null===(e=V.data)||void 0===e?void 0:e.map((function(e){return E.a.createElement(r.a.Option,{value:e.id,label:e.name},E.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),E.a.createElement(o.a.Item,{name:"footer_id",label:"Footer",rules:[{required:!0,message:"Please Select Footer"}]},E.a.createElement(r.a,{style:{width:"100%"},placeholder:"Select Content Footer",optionLabelProp:"label"},null===Z||void 0===Z||null===(t=Z.data)||void 0===t?void 0:t.map((function(e){return E.a.createElement(r.a.Option,{value:e.id,label:e.name},E.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),E.a.createElement(o.a.Item,{label:"Custom HTML"},E.a.createElement(i.a,{defaultChecked:!1,onChange:function(e){return B(e)}})),!z&&E.a.createElement(o.a.Item,{label:"Body"},E.a.createElement(I.a,{theme:"snow",modules:H,placeholder:"Body content goes here...",onChange:$})),z&&E.a.createElement(o.a.Item,{label:"Custom HTML"},E.a.createElement(a,{onChange:function(e){return G(e.target.value)},placeholder:"Paste your HTML Code Here..."})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},E.a.createElement(o.a.Item,null,E.a.createElement(g.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),E.a.createElement(A.b,{to:"/admin/email/content/list"},E.a.createElement(g.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},628:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var n,l,i,r,d,m,o,u,s,c,E,p,T,b=a(8),g=a(17),O={GET_EMAIL_HEADER_FOOTER_LIST:Object(g.d)(n||(n=Object(b.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(l||(l=Object(b.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(g.d)(i||(i=Object(b.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(g.d)(r||(r=Object(b.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(g.d)(d||(d=Object(b.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(g.d)(m||(m=Object(b.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(g.d)(o||(o=Object(b.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(g.d)(u||(u=Object(b.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(g.d)(s||(s=Object(b.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(g.d)(c||(c=Object(b.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(g.d)(E||(E=Object(b.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(g.d)(p||(p=Object(b.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(g.d)(T||(T=Object(b.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
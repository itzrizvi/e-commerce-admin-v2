(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[42],{1037:function(e,t,a){"use strict";a.r(t);a(131);var n=a(63),l=(a(132),a(47)),i=(a(374),a(302)),d=(a(167),a(35)),r=(a(133),a(73)),o=a(7),m=(a(200),a(27)),u=a(15),s=(a(119),a(41)),E=a(0),c=a.n(E),p=a(120),T=a(101),g=a(100),b=a(99),A=a(59),O=a(10),_=a(48),v=a(31),y=a(102),L=a(23),h=a(675),I=a.n(h),j=(a(676),a(628)),f=a(677),F=a.n(f),H=a(678),S=a.n(H);h.Quill.register("modules/imageResize",F.a),h.Quill.register("modules/htmlEditButton",S.a);var M={toolbar:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"},{align:[]}],["link","image","video"],["clean"]],imageResize:{parchment:h.Quill.import("parchment"),modules:["Resize","DisplaySize"]},htmlEditButton:{okText:"Save",msg:'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced'}};t.default=function(){var e,t;Object(L.c)("email-template");var a=s.a.TextArea,h=Object(A.useParams)(),f=Object(A.useHistory)(),F=Object(_.d)((function(e){return e.auth.token})),H=Object(E.useState)(!1),S=Object(u.a)(H,2),P=S[0],q=S[1],N=Object(E.useState)(""),$=Object(u.a)(N,2),D=$[0],R=$[1],w=Object(E.useState)(""),C=Object(u.a)(w,2),G=C[0],k=C[1],x=Object(E.useState)(!1),z=Object(u.a)(x,2),U=z[0],Q=z[1],V=Object(E.useState)({data:{},loading:!0,error:""}),W=Object(u.a)(V,2),B=W[0],J=W[1],K=m.a.useForm(),X=Object(u.a)(K,1)[0];return Object(E.useEffect)((function(){y.b.query({query:j.a.SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER,variables:{query:{id:parseInt(null===h||void 0===h?void 0:h.id)}},context:{headers:{TENANTID:"100001",Authorization:F}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l,i,d,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleEmailTempHeaderFooter;r.status&&(J({data:null===r||void 0===r?void 0:r.data,loading:!1,error:""}),X.setFieldsValue({name:null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.name,type:null===r||void 0===r||null===(n=r.data)||void 0===n?void 0:n.type}),k(null===r||void 0===r||null===(l=r.data)||void 0===l?void 0:l.content),R(null===r||void 0===r||null===(i=r.data)||void 0===i?void 0:i.content),Q("custom"===(null===r||void 0===r||null===(d=r.data)||void 0===d?void 0:d.layout_type)))})).catch((function(e){console.log(e),J({data:{},loading:!1,error:"Something went worng"})}))}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{title:"Manage Email Header/Footer | Edit Email Header/Footer ".concat((null===B||void 0===B||null===(e=B.data)||void 0===e?void 0:e.name)?"(".concat(null===B||void 0===B||null===(t=B.data)||void 0===t?void 0:t.name,")"):"")}),c.a.createElement(T.b,null,c.a.createElement(n.a,{gutter:25},c.a.createElement(l.a,{sm:24,xs:24},c.a.createElement(g.a,{headless:!0},B.loading?c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(r.a,{tip:"processing..."})):c.a.createElement(m.a,{style:{width:"100%"},form:X,name:"editEmailHeaderFooter",onFinish:function(e){var t;q(!0),t=U?{layout_type:"custom",content:G}:{layout_type:"dynamic",content:D},y.b.mutate({mutation:j.a.EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE,variables:{data:Object(o.a)(Object(o.a)({},e),{},{id:parseInt(null===h||void 0===h?void 0:h.id)},t)},refetchQueries:[{query:j.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:F}},fetchPolicy:"network-only"},["getEmailTempHeaderFooterList"]],context:{headers:{TENANTID:"100001",Authorization:F}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateEmailTempHeaderFooter;if(!(null===a||void 0===a?void 0:a.status))return v.b.error("Something Went wrong !!");setTimeout((function(){f.push("/admin/email/header-footer/list")}),1e3),v.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){v.b.error("Something Went wrong !!")})).finally((function(){return q(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},c.a.createElement(m.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Email Header/Footer Name"}],name:"name",label:"Name"},c.a.createElement(s.a,{placeholder:"Enter Header/Footer Name"})),c.a.createElement(m.a.Item,{name:"type",label:"Type",required:!0},c.a.createElement(d.a,{style:{width:"100%"},placeholder:"Select Header/Footer Type",optionLabelProp:"label"},c.a.createElement(d.a.Option,{value:"header",label:"Header"},c.a.createElement("div",{className:"demo-option-label-item"},"Header")),c.a.createElement(d.a.Option,{value:"footer",label:"Footer"},c.a.createElement("div",{className:"demo-option-label-item"},"Footer")))),c.a.createElement(m.a.Item,{label:"Custom HTML"},c.a.createElement(i.a,{checked:U,onChange:function(e){return Q(e)}})),!U&&c.a.createElement(m.a.Item,{label:"Content"},c.a.createElement(I.a,{theme:"snow",value:D,modules:M,placeholder:"Content goes here...",onChange:R})),U&&c.a.createElement(m.a.Item,{label:"Custom HTML"},c.a.createElement(a,{defaultValue:G,onChange:function(e){return k(e.target.value)},placeholder:"Paste your HTML Code Here..."})),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement(m.a.Item,null,c.a.createElement(b.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),c.a.createElement(O.b,{to:"/admin/email/header-footer/list"},c.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},628:function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n,l,i,d,r,o,m,u,s,E,c,p,T,g=a(8),b=a(17),A={GET_EMAIL_HEADER_FOOTER_LIST:Object(b.d)(n||(n=Object(g.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(l||(l=Object(g.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(i||(i=Object(g.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(b.d)(d||(d=Object(g.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(b.d)(r||(r=Object(g.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(b.d)(o||(o=Object(g.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(b.d)(m||(m=Object(g.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(b.d)(u||(u=Object(g.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(b.d)(s||(s=Object(g.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(b.d)(E||(E=Object(g.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(b.d)(c||(c=Object(g.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(b.d)(p||(p=Object(g.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(b.d)(T||(T=Object(g.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
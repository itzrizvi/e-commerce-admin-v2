(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[38],{1028:function(e,t,a){"use strict";a.r(t);a(143);var n=a(68),l=(a(144),a(52)),i=(a(304),a(217)),d=(a(145),a(30)),o=(a(132),a(74)),r=a(7),m=(a(201),a(27)),u=a(14),s=(a(115),a(39)),c=a(0),E=a.n(c),p=a(120),T=a(101),g=a(99),b=a(100),v=a(59),_=a(12),A=a(47),O=a(33),L=a(102),y=a(23),h=a(674),I=a.n(h),j=(a(675),a(625)),f=a(676),S=a.n(f),M=a(677),P=a.n(M);h.Quill.register("modules/imageResize",S.a),h.Quill.register("modules/htmlEditButton",P.a);var q={toolbar:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"},{align:[]}],["link","image","video"],["clean"]],imageResize:{parchment:h.Quill.import("parchment"),modules:["Resize","DisplaySize"]},htmlEditButton:{okText:"Save",msg:'Edit HTML here, when you click "Save" the quill editor\'s contents will be replaced'}};t.default=function(){var e,t,a,h;Object(y.c)("email-template");var f=s.a.TextArea,S=Object(v.useHistory)(),M=Object(v.useParams)(),P=Object(A.d)((function(e){return e.auth.token})),F=Object(c.useState)(!1),H=Object(u.a)(F,2),N=H[0],C=H[1],$=Object(c.useState)(""),D=Object(u.a)($,2),w=D[0],G=D[1],R=m.a.useForm(),k=Object(u.a)(R,1)[0],x=Object(c.useState)([]),z=Object(u.a)(x,2),U=z[0],Q=z[1],B=Object(c.useState)([]),V=Object(u.a)(B,2),W=V[0],J=V[1],K=Object(c.useState)(""),X=Object(u.a)(K,2),Y=X[0],Z=X[1],ee=Object(c.useState)(!1),te=Object(u.a)(ee,2),ae=te[0],ne=te[1],le=Object(c.useState)({data:{},loading:!0,error:""}),ie=Object(u.a)(le,2),de=ie[0],oe=ie[1];return Object(c.useEffect)((function(){L.b.query({query:j.a.GET_SINGLE_EMAIL_CONTENT_TEMPLATE,variables:{query:{id:parseInt(null===M||void 0===M?void 0:M.id)}},context:{headers:{TENANTID:"100001",Authorization:P}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,l,i,d,o,r,m,u=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleEmailTemplate;u.status&&(oe({data:u,loading:!1,error:""}),k.setFieldsValue({name:null===u||void 0===u||null===(a=u.data)||void 0===a?void 0:a.name,header_id:null===u||void 0===u||null===(n=u.data)||void 0===n||null===(l=n.emailHeader)||void 0===l?void 0:l.id,footer_id:null===u||void 0===u||null===(i=u.data)||void 0===i||null===(d=i.emailFooter)||void 0===d?void 0:d.id}),Z(null===u||void 0===u||null===(o=u.data)||void 0===o?void 0:o.content),G(null===u||void 0===u||null===(r=u.data)||void 0===r?void 0:r.content),ne(null===u||void 0===u||null===(m=u.data)||void 0===m?void 0:m.layout_type))})).catch((function(e){console.log(e),oe({data:{},loading:!1,error:"Something went wrong"})})),L.b.query({query:j.a.GET_EMAIL_HEADER_FOOTER_LIST,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var t,a,n,l=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getEmailTempHeaderFooterList;Q(null===l||void 0===l||null===(a=l.data)||void 0===a?void 0:a.filter((function(e){return"header"===e.type}))),J(null===l||void 0===l||null===(n=l.data)||void 0===n?void 0:n.filter((function(e){return"footer"===e.type})))}))}),[]),E.a.createElement(E.a.Fragment,null,E.a.createElement(p.a,{title:"Manage Email Content | Edit Email Content ".concat((null===de||void 0===de||null===(e=de.data)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.name)?"(".concat(null===de||void 0===de||null===(a=de.data)||void 0===a||null===(h=a.data)||void 0===h?void 0:h.name,")"):"")}),E.a.createElement(T.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(l.a,{sm:24,xs:24},E.a.createElement(g.a,{headless:!0},de.loading?E.a.createElement("div",{style:{textAlign:"center"}},E.a.createElement(o.a,{tip:"processing..."})):E.a.createElement(m.a,{style:{width:"100%"},form:k,name:"editEmailContent",onFinish:function(e){var t;C(!0),t=ae?{layout_type:"custom",content:Y}:{layout_type:"dynamic",content:w},L.b.mutate({mutation:j.a.UPDATE_EMAIL_TEMPLATE_CONTENT,variables:{data:Object(r.a)(Object(r.a)(Object(r.a)({},e),t),{},{id:parseInt(null===M||void 0===M?void 0:M.id)})},refetchQueries:[{query:j.a.GET_EMAIL_TEMPLATE_CONTENT_LIST,context:{headers:{TENANTID:"100001",Authorization:P}},fetchPolicy:"network-only"},["getEmailTemplateList"]],context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateEmailTemplate;if(!(null===a||void 0===a?void 0:a.status))return O.b.error("Something Went wrong !!");setTimeout((function(){S.push("/admin/email/content/list")}),1e3),O.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){O.b.error("Something Went wrong !!")})).finally((function(){return C(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(m.a.Item,{rules:[{required:!0,max:100,message:"Please Enter Email Content Name"}],name:"name",label:"Name"},E.a.createElement(s.a,{placeholder:"Enter Email Content Name"})),E.a.createElement(m.a.Item,{name:"header_id",label:"Header",rules:[{required:!0,message:"Please Select Header"}]},E.a.createElement(d.a,{style:{width:"100%"},placeholder:"Select Content Header",optionLabelProp:"label"},null===U||void 0===U?void 0:U.map((function(e){return E.a.createElement(d.a.Option,{value:e.id,label:e.name},E.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),E.a.createElement(m.a.Item,{name:"footer_id",label:"Footer",rules:[{required:!0,message:"Please Select Footer"}]},E.a.createElement(d.a,{style:{width:"100%"},placeholder:"Select Content Footer",optionLabelProp:"label"},null===W||void 0===W?void 0:W.map((function(e){return E.a.createElement(d.a.Option,{value:e.id,label:e.name},E.a.createElement("div",{className:"demo-option-label-item"},e.name))})))),E.a.createElement(m.a.Item,{label:"Custom HTML"},E.a.createElement(i.a,{checked:ae,onChange:function(e){return ne(e)}})),!ae&&E.a.createElement(m.a.Item,{label:"Body"},E.a.createElement(I.a,{theme:"snow",value:w,modules:q,placeholder:"Content goes here...",onChange:G})),ae&&E.a.createElement(m.a.Item,{label:"Custom HTML"},E.a.createElement(f,{defaultValue:Y,onChange:function(e){return Z(e.target.value)},placeholder:"Paste your HTML Code Here..."})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},E.a.createElement(m.a.Item,null,E.a.createElement(b.a,{loading:N,size:"default",htmlType:"submit",type:"primary",raised:!0},N?"Processing":"Save"),E.a.createElement(_.b,{to:"/admin/email/content/list"},E.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},625:function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));var n,l,i,d,o,r,m,u,s,c,E,p,T,g=a(8),b=a(17),v={GET_EMAIL_HEADER_FOOTER_LIST:Object(b.d)(n||(n=Object(g.a)(["\n    query getEmailTempHeaderFooterList {\n      getEmailTempHeaderFooterList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(l||(l=Object(g.a)(["\n    mutation addEmailTempHeaderFooter($data: AddEmailTempHFInput) {\n      addEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_HEADER_FOOTER:Object(b.d)(i||(i=Object(g.a)(["\n    query getSingleEmailTempHeaderFooter($query: GetSingleEmailHeaderFooterInput) {\n      getSingleEmailTempHeaderFooter(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          type\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),EMAIL_TEMPLATE_HEADER_FOOTER_UPDATE:Object(b.d)(d||(d=Object(g.a)(["\n    mutation updateEmailTempHeaderFooter($data: UpdateEmailTempHFInput) {\n      updateEmailTempHeaderFooter(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_LIST:Object(b.d)(o||(o=Object(g.a)(["\n    query getAllEmailTemplateList {\n      getAllEmailTemplateList {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),ADD_EMAIL_TEMPLATE_LIST:Object(b.d)(r||(r=Object(g.a)(["\n    mutation addEmailTemplateOnList($data: AddEmailTemplateListInput) {\n      addEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SINGLE_EMAIL_TEMPLATE_LIST:Object(b.d)(m||(m=Object(g.a)(["\n    query getSingleEmailTemplateList($query: GetSingleEmailTemplateListInput) {\n      getSingleEmailTemplateList(query: $query) {\n        message\n        status\n        data {\n          id\n          email_template_id\n          name\n          slug\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_LIST:Object(b.d)(u||(u=Object(g.a)(["\n    mutation updateEmailTemplateOnList($data: UpdateEmailTemplateListInput) {\n      updateEmailTemplateOnList(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),CREATE_EMAIL_TEMPLATE:Object(b.d)(s||(s=Object(g.a)(["\n    mutation createEmailTemplate($data: addEmailTemplateInput) {\n      createEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_CONTENT_LIST:Object(b.d)(c||(c=Object(g.a)(["\n    query getEmailTemplateList {\n      getEmailTemplateList {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n          }\n          emailFooter {\n            id\n            name\n            slug\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_EMAIL_CONTENT_TEMPLATE:Object(b.d)(E||(E=Object(g.a)(["\n    query getSingleEmailTemplate($query: GetSingleEmailTemplateInput) {\n      getSingleEmailTemplate(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          createdAt\n          updatedAt\n          emailHeader {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n          emailFooter {\n            id\n            name\n            slug\n            content\n            type\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "]))),UPDATE_EMAIL_TEMPLATE_CONTENT:Object(b.d)(p||(p=Object(g.a)(["\n    mutation updateEmailTemplate($data: updateEmailTemplateInput) {\n      updateEmailTemplate(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_EMAIL_TEMPLATE_PREVIEW:Object(b.d)(T||(T=Object(g.a)(["\n    query getEmailTemplatePreview($query: GetEmailTemplatePreviewInput) {\n      getEmailTemplatePreview(query: $query) {\n        message\n        status\n        tenant_id\n        data\n      }\n    }\n  "])))}}}]);
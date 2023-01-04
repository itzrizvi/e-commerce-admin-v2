(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[30],{624:function(e,n,t){"use strict";t.d(n,"a",(function(){return d}));var a,l,i,r=t(8),s=t(17),d={GET_CONTACT_US_MSG_LIST:Object(s.d)(a||(a=Object(r.a)(["\n    query getContactUsMsgList {\n        getContactUsMsgList{\n          message\n          status\n          tenant_id\n          data {\n            id\n            name\n            email\n            phone\n            subject\n            message\n            tenant_id\n            images {\n              id\n              image\n              tenant_id\n            }\n          }\n        }\n      }\n    "]))),GET_SINGLE_CONTACT_US_MSG:Object(s.d)(l||(l=Object(r.a)(["\n    query getSingleContactUsMsg($query: GetSingleContactMessageInput) {\n      getSingleContactUsMsg(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    "]))),GET_CONTACT_US_UNREAD_MSG_LIST:Object(s.d)(i||(i=Object(r.a)(["\n    query getContactUsUnreadMsgList {\n      getContactUsUnreadMsgList{\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          subject\n          message\n          isRead\n          images {\n            id\n            image\n          }\n        }\n      }\n    }\n    \n    "])))}},996:function(e,n,t){"use strict";t.r(n);t(140);var a=t(65),l=(t(141),t(50)),i=(t(130),t(72)),r=t(14),s=t(0),d=t.n(s),c=t(118),u=t(99),o=t(97),m=t(100),g=t(624),E=t(70),b=t.n(E),v=t(33),p=t(57),_=t(164),h=t.n(_),f=t(153);n.default=function(){var e,n,t,E,_,S,j,y,C,O=Object(p.useLocation)().search,T=h.a.parse(O),L=Object(s.useState)({data:{},isLoading:!0}),M=Object(r.a)(L,2),U=M[0],G=M[1];return Object(s.useEffect)((function(){m.b.query({query:g.a.GET_SINGLE_CONTACT_US_MSG,context:{headers:{TENANTID:"100001",Authorization:b.a.get("psp_t")}},variables:{query:{id:parseInt(T.id)}}}).then((function(e){var n,t=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.getSingleContactUsMsg;t.status||v.b.error(t.message),G({data:t.data,isLoading:!1})})).catch((function(e){console.log("Error on get single message",e),G({data:{},isLoading:!1})})).finally((function(){}))}),[]),d.a.createElement(d.a.Fragment,null,d.a.createElement(c.a,{title:"Messege by ".concat(U.isLoading?"....":"(".concat(U.data.email,")"))}),d.a.createElement(u.b,null,d.a.createElement(a.a,{gutter:25},d.a.createElement(l.a,{sm:24,xs:24},d.a.createElement(o.a,{headless:!0},U.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(i.a,null)):d.a.createElement(d.a.Fragment,null,d.a.createElement("table",{style:{width:"100%"}},d.a.createElement("tbody",null,d.a.createElement("tr",null,d.a.createElement("td",{style:{width:"100px"}},d.a.createElement("b",null,"Name :")),d.a.createElement("td",null,null===U||void 0===U||null===(e=U.data)||void 0===e?void 0:e.name)),d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("b",null,"Email :")),d.a.createElement("td",null,d.a.createElement("a",{href:"mailto:".concat(null===U||void 0===U||null===(n=U.data)||void 0===n?void 0:n.email)},null===U||void 0===U||null===(t=U.data)||void 0===t?void 0:t.email))),d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("b",null,"Phone :")),d.a.createElement("td",null,d.a.createElement("a",{href:"tel:".concat(null===U||void 0===U||null===(E=U.data)||void 0===E?void 0:E.phone)},null===U||void 0===U||null===(_=U.data)||void 0===_?void 0:_.phone))),d.a.createElement("br",null),d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("b",null,"Subject :")),d.a.createElement("td",null,null===U||void 0===U||null===(S=U.data)||void 0===S?void 0:S.subject)),d.a.createElement("br",null),d.a.createElement("tr",null,d.a.createElement("td",{style:{verticalAlign:"baseline"}},d.a.createElement("b",null,"Message :")),d.a.createElement("td",null,d.a.createElement("p",{style:{padding:"1em",paddingBottom:"6em",border:"1px solid #dedede",borderRadius:"7px",background:"#f4f5f7"}},null===U||void 0===U||null===(j=U.data)||void 0===j?void 0:j.message))))),d.a.createElement("br",null),d.a.createElement("div",null,null===U||void 0===U||null===(y=U.data)||void 0===y||null===(C=y.images)||void 0===C?void 0:C.map((function(e){return console.log("test img: ",Object(f.renderImage)(e.id,e.image,"contact-us","",!0)),d.a.createElement("img",{key:e.id,src:Object(f.renderImage)(e.id,e.image,"contact-us","",!0),alt:""})})))))))))}}}]);
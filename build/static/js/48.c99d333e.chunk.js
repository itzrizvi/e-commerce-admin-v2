(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[48],{971:function(e,a,t){"use strict";t.r(a);t(79);var n,r=t(37),c=(t(77),t(17)),l=(t(7),t(163),t(24)),s=t(16),i=t(0),u=t.n(i),m=t(62),o=t(45),b=t(207),d=t(201),p=(t(200),t(92)),h=t(9),j=t(21),E=Object(j.b)(p.a)(n||(n=Object(h.a)(["\n\n"]))),O=(E.Group,t(47));a.default=function(){var e=Object(i.useState)("shahriar.rizvi02@gmail.com"),a=Object(s.a)(e,2),t=a[0],n=a[1],p=Object(i.useState)("A12345678"),h=Object(s.a)(p,2),j=h[0],E=h[1],f=Object(m.useHistory)(),g=Object(o.c)(),v=Object(o.d)((function(e){return e.auth.loading})),y=Object(o.d)((function(e){return e.auth.error})),S=l.a.useForm(),w=Object(s.a)(S,1)[0],P=Object(i.useState)({checked:null}),I=Object(s.a)(P,2);I[0],I[1];return u.a.createElement(b.b,null,u.a.createElement("div",{className:"auth-contents"},u.a.createElement(l.a,{name:"login",form:w,onSubmitCapture:function(e){e.preventDefault(),g(Object(d.c)(t,j,f))},layout:"vertical"},u.a.createElement(O.a,{as:"h3"},"Sign in to ",u.a.createElement("span",{className:"color-secondary"},"Admin")),u.a.createElement(l.a.Item,{name:"username",rules:[{message:"Please input your username or Email!",required:!0}],initialValue:t,label:"Username or Email Address"},u.a.createElement(c.a,{onChange:function(e){n(e.target.value)}})),u.a.createElement(l.a.Item,{name:"password",initialValue:j,label:"Password"},u.a.createElement(c.a.Password,{placeholder:"Password",onChange:function(e){return E(e.target.value)}})),u.a.createElement(l.a.Item,null,u.a.createElement(r.a,{className:"btn-signin",htmlType:"submit",type:"primary",size:"large"},v?"Loading...":"Sign In")),y&&u.a.createElement("p",{style:{color:"#ff4d4f"}},y))))}}}]);
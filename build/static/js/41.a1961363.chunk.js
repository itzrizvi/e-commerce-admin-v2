(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[41],{877:function(e,t,a){"use strict";a.r(t);a(133);var n,c=a(63),r=(a(142),a(67)),l=a(11),i=(a(278),a(57)),s=a(33),o=a(0),u=a.n(o),m=a(53),d=a(10),h=a(42),g=a(270),b=a(147),E=(a(256),a(102)),f=a(12),p=a(16),k=Object(p.b)(E.a)(n||(n=Object(f.a)(["\n\n"]))),j=k.Group,O=function(e){var t=e.item,a=e.defaultSelect,n=e.checked,c=e.multiple,r=e.onChange,l=e.onChangeTriger,i=e.defaultChecked,m=e.disabled,d=e.children,h=t,g=Object(o.useState)({checkedList:a,indeterminate:!0,checkAll:!1}),b=Object(s.a)(g,2),E=b[0],f=b[1];Object(o.useEffect)((function(){l&&l(E.checkedList)}),[E]);return c?u.a.createElement("div",null,u.a.createElement("div",{style:{borderBottom:"1px solid #E9E9E9"}},u.a.createElement(k,{indeterminate:E.indeterminate,onChange:function(e){f({checkedList:e.target.checked?h:[],indeterminate:!1,checkAll:e.target.checked})},checked:E.checkAll},"Check all")),u.a.createElement("br",null),u.a.createElement(j,{options:h,value:E.checkedList,onChange:function(e){f({checkedList:e,indeterminate:!!e.length&&e.length<h.length,checkAll:e.length===h.length})}})):u.a.createElement(k,{checked:n,onChange:function(e){return r(e.target.checked,e.target.value)},defaultChecked:i,disabled:m},d)},v=a(35);t.default=function(){var e=Object(o.useState)("shahriar.rizvi02@gmail.com"),t=Object(s.a)(e,2),a=t[0],n=t[1],E=Object(o.useState)("A12345678"),f=Object(s.a)(E,2),p=f[0],k=f[1],j=Object(m.useHistory)(),C=Object(h.c)(),S=Object(h.d)((function(e){return e.auth.loading})),y=Object(h.d)((function(e){return e.auth.error})),w=i.a.useForm(),A=Object(s.a)(w,1)[0],L=Object(o.useState)({checked:null}),P=Object(s.a)(L,2),N=P[0],I=P[1];return u.a.createElement(g.b,null,u.a.createElement("div",{className:"auth-contents"},u.a.createElement(i.a,{name:"login",form:A,onSubmitCapture:function(e){e.preventDefault(),C(Object(b.c)(a,p,j))},layout:"vertical"},u.a.createElement(v.a,{as:"h3"},"Sign in to ",u.a.createElement("span",{className:"color-secondary"},"Admin")),u.a.createElement(i.a.Item,{name:"username",rules:[{message:"Please input your username or Email!",required:!0}],initialValue:a,label:"Username or Email Address"},u.a.createElement(r.a,{onChange:function(e){console.log(e.target.value),n(e.target.value)}})),u.a.createElement(i.a.Item,{name:"password",initialValue:p,label:"Password"},u.a.createElement(r.a.Password,{placeholder:"Password",onChange:function(e){return k(e.target.value)}})),u.a.createElement("div",{className:"auth-form-action"},u.a.createElement(O,{onChange:function(e){I(Object(l.a)(Object(l.a)({},N),{},{checked:e}))}},"Keep me logged in"),u.a.createElement(d.c,{className:"forgot-pass-link",to:"#"},"Forgot password?")),u.a.createElement(i.a.Item,null,u.a.createElement(c.a,{className:"btn-signin",htmlType:"submit",type:"primary",size:"large"},S?"Loading...":"Sign In")),y&&u.a.createElement("p",{style:{color:"#ff4d4f"}},y))))}}}]);
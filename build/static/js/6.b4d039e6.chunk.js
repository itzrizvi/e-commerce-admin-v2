(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[6],{518:function(e,t,a){"use strict";a.r(t);a(168);var n,c=a(85),l=(a(240),a(215)),r=a(8),i=(a(501),a(508)),s=a(45),o=a(0),u=a.n(o),m=a(33),d=a(9),h=a(39),g=a(173),b=a(209),E=(a(503),a(510)),f=a(20),k=a(16),p=Object(k.b)(E.a)(n||(n=Object(f.a)(["\n\n"]))),j=p.Group,O=function(e){var t=e.item,a=e.defaultSelect,n=e.checked,c=e.multiple,l=e.onChange,r=e.onChangeTriger,i=e.defaultChecked,m=e.disabled,d=e.children,h=t,g=Object(o.useState)({checkedList:a,indeterminate:!0,checkAll:!1}),b=Object(s.a)(g,2),E=b[0],f=b[1];Object(o.useEffect)((function(){r&&r(E.checkedList)}),[E]);return c?u.a.createElement("div",null,u.a.createElement("div",{style:{borderBottom:"1px solid #E9E9E9"}},u.a.createElement(p,{indeterminate:E.indeterminate,onChange:function(e){f({checkedList:e.target.checked?h:[],indeterminate:!1,checkAll:e.target.checked})},checked:E.checkAll},"Check all")),u.a.createElement("br",null),u.a.createElement(j,{options:h,value:E.checkedList,onChange:function(e){f({checkedList:e,indeterminate:!!e.length&&e.length<h.length,checkAll:e.length===h.length})}})):u.a.createElement(p,{checked:n,onChange:function(e){return l(e.target.checked,e.target.value)},defaultChecked:i,disabled:m},d)},v=a(25);t.default=function(){var e=Object(o.useState)("sumonskys@gmail.com"),t=Object(s.a)(e,2),a=t[0],n=t[1],E=Object(o.useState)("A1234567"),f=Object(s.a)(E,2),k=f[0],p=f[1],j=Object(m.useHistory)(),C=Object(h.c)(),y=Object(h.d)((function(e){return e.auth.loading})),S=Object(h.d)((function(e){return e.auth.error})),w=i.a.useForm(),A=Object(s.a)(w,1)[0],L=Object(o.useState)({checked:null}),N=Object(s.a)(L,2),I=N[0],P=N[1];return u.a.createElement(g.b,null,u.a.createElement("div",{className:"auth-contents"},u.a.createElement(i.a,{name:"login",form:A,onSubmitCapture:function(e){e.preventDefault(),C(Object(b.b)(a,k,j))},layout:"vertical"},u.a.createElement(v.a,{as:"h3"},"Sign in to ",u.a.createElement("span",{className:"color-secondary"},"Admin")),u.a.createElement(i.a.Item,{name:"username",rules:[{message:"Please input your username or Email!",required:!0}],initialValue:a,label:"Username or Email Address"},u.a.createElement(l.a,{onChange:function(e){console.log(e.target.value),n(e.target.value)}})),u.a.createElement(i.a.Item,{name:"password",initialValue:k,label:"Password"},u.a.createElement(l.a.Password,{placeholder:"Password",onChange:function(e){return p(e.target.value)}})),u.a.createElement("div",{className:"auth-form-action"},u.a.createElement(O,{onChange:function(e){P(Object(r.a)(Object(r.a)({},I),{},{checked:e}))}},"Keep me logged in"),u.a.createElement(d.c,{className:"forgot-pass-link",to:"#"},"Forgot password?")),u.a.createElement(i.a.Item,null,u.a.createElement(c.a,{className:"btn-signin",htmlType:"submit",type:"primary",size:"large"},y?"Loading...":"Sign In")),S&&u.a.createElement("p",{style:{color:"#ff4d4f"}},S))))}}}]);
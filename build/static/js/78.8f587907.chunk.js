(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[78],{926:function(e,a,t){"use strict";t.r(a);t(200);var n=t(97),s=(t(201),t(74)),r=(t(100),t(38)),l=(t(148),t(45)),c=(t(288),t(69)),i=t(9),m=(t(289),t(52)),u=t(23),o=t(0),d=t.n(o),p=t(652),E=t(164),w=t(165),g=t(55),b=t(71),f=t(68),h=t.n(f),P=t(50),v=t(76),O=t(136);a.default=function(){var e=m.a.useForm(),a=Object(u.a)(e,1)[0],t=Object(P.d)((function(e){return e.auth.user})),f=Object(o.useState)(!1),j=Object(u.a)(f,2),N=j[0],y=j[1];return d.a.createElement(p.b,null,d.a.createElement(E.a,{title:d.a.createElement("div",{className:"setting-card-title"},d.a.createElement(g.a,{as:"h4"},"Password Settings"),d.a.createElement("span",null,"Change or reset your account password"))},d.a.createElement(n.a,{justify:"center"},d.a.createElement(s.a,{lg:12,sm:20,xs:24},d.a.createElement(w.a,null,d.a.createElement(m.a,{form:a,name:"changePassword",onFinish:function(e){var a={data:Object(i.a)(Object(i.a)({},e),{},{uid:t.uid})};if(console.log(a),!e.newPassword.match("(?=.{6,})(?=.*[0-9])"))return c.b.warning(O.a.PASSWORD_LENGTH);y(!0),b.j.mutate({mutation:b.d.ADMIN_PASSWORD_CHANGE,variables:a,context:{headers:{TENANTID:"100001",Authorization:h.a.get("psp_t")}}}).then((function(e){var a=e.data.adminPasswordChange;if(!(null===a||void 0===a?void 0:a.status))return Object(v.a)();c.b.success(a.message)})).finally((function(){y(!1)}))}},d.a.createElement(m.a.Item,{name:"oldPassword",label:"Old Password",rules:[{required:!0,message:"Please enter Old password"}]},d.a.createElement(l.a,null)),d.a.createElement(m.a.Item,{name:"newPassword",label:"New Password",rules:[{required:!0,message:"Please enter a new password"}]},d.a.createElement(l.a.Password,null)),d.a.createElement("p",{className:"input-message"},"Minimum 6 characters & 1 number"),d.a.createElement(m.a.Item,null,d.a.createElement("div",{className:"setting-form-actions"},d.a.createElement(r.a,{htmlType:"submit",type:"primary",loading:N},"Change Password"),"\xa0 \xa0",d.a.createElement(r.a,{style:{marginLeft:10},type:"light",size:"default",onClick:function(e){e.preventDefault(),a.resetFields()}},"Cancel")))))))))}}}]);
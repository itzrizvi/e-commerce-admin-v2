(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[79],{999:function(e,a,t){"use strict";t.r(a);t(200);var n=t(96),r=(t(201),t(74)),s=(t(99),t(38)),l=(t(148),t(45)),c=t(9),i=(t(287),t(53)),m=t(23),o=t(0),u=t.n(o),d=t(655),w=t(164),p=t(165),h=t(56),g=t(71),E=t(69),b=t.n(E),f=t(50),P=t(51),v=t(115);a.default=function(){var e=i.a.useForm(),a=Object(m.a)(e,1)[0],t=Object(f.d)((function(e){return e.auth.user})),E=Object(o.useState)(!1),O=Object(m.a)(E,2),j=O[0],y=O[1];return u.a.createElement(d.b,null,u.a.createElement(w.a,{title:u.a.createElement("div",{className:"setting-card-title"},u.a.createElement(h.a,{as:"h4"},"Password Settings"),u.a.createElement("span",null,"Change or reset your account password"))},u.a.createElement(n.a,{justify:"center"},u.a.createElement(r.a,{lg:12,sm:20,xs:24},u.a.createElement(p.a,null,u.a.createElement(i.a,{form:a,name:"changePassword",onFinish:function(e){var a={data:Object(c.a)(Object(c.a)({},e),{},{uid:t.uid})};if(console.log(a),!e.newPassword.match("(?=.{6,})(?=.*[0-9])"))return P.b.warning("Password should contain 6 character,  \n And At List 1 number");y(!0),g.j.mutate({mutation:g.d.ADMIN_PASSWORD_CHANGE,variables:a,context:{headers:{TENANTID:"100001",Authorization:b.a.get("psp_t")}}}).then((function(e){var a=e.data.adminPasswordChange;if(!a.status)return Object(v.a)();P.b.success(a.message)})).catch((function(e){P.b.error("Something went wrong.!")})).finally((function(){y(!1)}))}},u.a.createElement(i.a.Item,{name:"oldPassword",label:"Old Password",rules:[{required:!0,message:"Please enter Old password"}]},u.a.createElement(l.a,null)),u.a.createElement(i.a.Item,{name:"newPassword",label:"New Password",rules:[{required:!0,message:"Please enter a new password"}]},u.a.createElement(l.a.Password,null)),u.a.createElement("p",{className:"input-message"},"Minimum 6 characters & 1 number"),u.a.createElement(i.a.Item,null,u.a.createElement("div",{className:"setting-form-actions"},u.a.createElement(s.a,{htmlType:"submit",type:"primary",loading:j},"Change Password"),"\xa0 \xa0",u.a.createElement(s.a,{style:{marginLeft:10},type:"light",size:"default",onClick:function(e){e.preventDefault(),a.resetFields()}},"Cancel")))))))))}}}]);
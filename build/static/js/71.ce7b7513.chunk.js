(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[71],{929:function(e,a,t){"use strict";t.r(a);t(119);var n=t(53),r=(t(120),t(41)),s=(t(91),t(42)),l=(t(114),t(35)),c=t(7),i=(t(195),t(27)),m=t(14),o=t(0),u=t.n(o),d=t(622),w=t(98),g=t(99),h=t(47),p=t(33),E=t(69),b=t.n(E),f=t(46),P=t(31);a.default=function(){var e=i.a.useForm(),a=Object(m.a)(e,1)[0],t=Object(f.d)((function(e){return e.auth.user})),E=Object(o.useState)(!1),v=Object(m.a)(E,2),O=v[0],j=v[1];return u.a.createElement(d.b,null,u.a.createElement(w.a,{title:u.a.createElement("div",{className:"setting-card-title"},u.a.createElement(h.a,{as:"h4"},"Password Settings"),u.a.createElement("span",null,"Change or reset your account password"))},u.a.createElement(n.a,{justify:"center"},u.a.createElement(r.a,{lg:12,sm:20,xs:24},u.a.createElement(g.a,null,u.a.createElement(i.a,{form:a,name:"changePassword",onFinish:function(e){var a={data:Object(c.a)(Object(c.a)({},e),{},{uid:t.uid})};if(console.log(a),!e.newPassword.match("(?=.{6,})(?=.*[0-9])"))return P.b.warning("Password should contain 6 character,  \n And At List 1 number");j(!0),p.j.mutate({mutation:p.d.ADMIN_PASSWORD_CHANGE,variables:a,context:{headers:{TENANTID:"100001",Authorization:b.a.get("psp_t")}}}).then((function(e){var a=e.data.adminPasswordChange;if(!a.status)return P.b.error(a.message);P.b.success(a.message)})).catch((function(e){P.b.error("Something went wrong.!")})).finally((function(){j(!1)}))}},u.a.createElement(i.a.Item,{name:"oldPassword",label:"Old Password",rules:[{required:!0,message:"Please enter Old password"}]},u.a.createElement(l.a,null)),u.a.createElement(i.a.Item,{name:"newPassword",label:"New Password",rules:[{required:!0,message:"Please enter a new password"}]},u.a.createElement(l.a.Password,null)),u.a.createElement("p",{className:"input-message"},"Minimum 6 characters & 1 number"),u.a.createElement(i.a.Item,null,u.a.createElement("div",{className:"setting-form-actions"},u.a.createElement(s.a,{htmlType:"submit",type:"primary",loading:O},"Change Password"),"\xa0 \xa0",u.a.createElement(s.a,{style:{marginLeft:10},type:"light",size:"default",onClick:function(e){e.preventDefault(),a.resetFields()}},"Cancel")))))))))}}}]);
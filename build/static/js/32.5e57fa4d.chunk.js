(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[32],{616:function(e,a,t){"use strict";t.r(a);t(144);var n,l=t(74),i=(t(145),t(34)),r=(t(257),t(192)),s=t(9),c=(t(474),t(475)),m=t(46),u=(t(541),t(543)),o=t(0),d=t.n(o),b=t(463),f=t(461),g=t(464),E=t(26),h=(t(132),t(618),t(551),t(555)),p=t(13),j=t(17),v=Object(j.b)(h.a)(n||(n=Object(p.a)(["\n\n"]))),O=(v.CheckableTag,t(41)),P=t(126),N=t(51),y=t.n(N),D=t(193),I=t(8);u.a.Option,a.default=function(){var e=c.a.useForm(),a=(Object(m.a)(e,1)[0],Object(O.d)((function(e){return e.auth.user}))),t=Object(o.useState)(!1),n=Object(m.a)(t,2),u=n[0],h=n[1],p=Object(o.useState)({tags:["UI/UX","Branding","Product Design","Web Design"],values:null}),j=Object(m.a)(p,2);j[0],j[1];return d.a.createElement(b.a,{title:d.a.createElement("div",{className:"setting-card-title"},d.a.createElement(E.a,{as:"h4"},"Edit Profile"),d.a.createElement("span",null,"Set Up Your Personal Information"))},d.a.createElement(l.a,{justify:"center"},d.a.createElement(i.a,{xl:12,lg:16,xs:24},d.a.createElement(g.a,null,d.a.createElement(c.a,{name:"editProfile",onFinish:function(e){h(!0);var t={data:Object(s.a)(Object(s.a)({},e),{},{uid:a.uid})};console.log(t),P.c.mutate({mutation:P.a.ADMIN_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var a,t;if(!(null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.adminUpdate)||void 0===t?void 0:t.status))return D.b.error(data.message);D.b.success("Profile updated successfully.")})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),D.b.error("Something went wrong!!")})).finally((function(){h(!1)}))}},d.a.createElement(c.a.Item,{label:"Email"},d.a.createElement("p",null," ",a.email)),d.a.createElement(c.a.Item,{name:"first_name",initialValue:a.first_name,label:"First Name",rules:[{required:!0,max:30,message:"Please enter First Name"}]},d.a.createElement(r.a,null)),d.a.createElement(c.a.Item,{name:"last_name",initialValue:a.last_name,label:"Last Name",rules:[{required:!0,message:"Please enter Last Name"}]},d.a.createElement(r.a,null)),d.a.createElement("div",{className:"setting-form-actions"},d.a.createElement(f.a,{size:"default",htmlType:"submit",type:"primary",loading:u},u?"Processing":"Update Profile"),"\xa0 \xa0",d.a.createElement(I.b,{to:"/admin"},d.a.createElement(f.a,{size:"default",type:"light"},"Cancel"))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[73],{935:function(e,a,t){"use strict";t.r(a);t(140);var l=t(65),n=(t(141),t(50)),r=(t(113),t(38)),i=(t(354),t(215)),s=t(7),m=(t(196),t(27)),c=t(14),o=t(0),u=t.n(o),d=t(97),f=t(98),b=t(99),p=t(54),E=t(45),v=t(28),g=t(70),h=t.n(g),j=t(33),_=t(12),O=t(948),P=t(216);a.default=function(){var e=m.a.useForm(),a=(Object(c.a)(e,1)[0],Object(E.d)((function(e){return e.auth.user}))),t=Object(o.useState)(!1),g=Object(c.a)(t,2),y=g[0],N=g[1],U=Object(o.useState)({}),I=Object(c.a)(U,2),A=I[0],L=I[1],w=Object(E.c)();return u.a.createElement(d.a,{title:u.a.createElement("div",{className:"setting-card-title"},u.a.createElement(p.a,{as:"h4"},"Edit Profile"),u.a.createElement("span",null,"Set Up Your Personal Information"))},u.a.createElement(l.a,{justify:"center"},u.a.createElement(n.a,{xl:12,lg:16,xs:24},u.a.createElement(b.a,null,u.a.createElement(m.a,{labelCol:{span:6},name:"editProfile",onFinish:function(e){N(!0);var t={data:Object(s.a)(Object(s.a)({},e),{},{uid:a.uid,sendEmail:!0})};console.log(t),A.file&&(t.file=A.file),v.a.mutate({mutation:v.d.ADMIN_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:h.a.get("psp_t")}}}).then((function(t){var l,n,r,i;if(!(null===t||void 0===t||null===(l=t.data)||void 0===l||null===(n=l.adminUpdate)||void 0===n?void 0:n.status))return j.b.error(null===t||void 0===t||null===(r=t.data)||void 0===r||null===(i=r.adminUpdate)||void 0===i?void 0:i.message);j.b.success("Profile updated successfully.");var m=e.first_name,c=e.last_name;w(Object(P.a)(Object(s.a)(Object(s.a)({},a),{},{first_name:m,last_name:c})))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),j.b.error("Something went wrong!!")})).finally((function(){N(!1)}))}},u.a.createElement(m.a.Item,{label:"Photo"},u.a.createElement("p",null,u.a.createElement(O.a,{rotate:!0},u.a.createElement(i.a,{listType:"picture-card",beforeUpload:function(e){console.log(e);var a="image/jpeg"===e.type;if(!a)return j.b.error("You can only upload JPG file!");var t=e.size/1024/1024<2;return t?(a&&t&&L({file:e,thumbnail:URL.createObjectURL(e)}),!1):j.b.error("Image must smaller than 2MB!")},onPreview:function(){return console.log()},onRemove:function(){return L({})},fileList:A.file?[{file:A.file,url:A.thumbnail}]:[]},!A.file&&"+ Upload")))),u.a.createElement(m.a.Item,{label:"Email"},u.a.createElement("p",null," ",a.email)),u.a.createElement(m.a.Item,{name:"first_name",initialValue:a.first_name,label:"First Name",rules:[{required:!0,max:30,message:"Please enter First Name"}]},u.a.createElement(r.a,null)),u.a.createElement(m.a.Item,{name:"last_name",initialValue:a.last_name,label:"Last Name",rules:[{required:!0,message:"Please enter Last Name"}]},u.a.createElement(r.a,null)),u.a.createElement("div",{className:"setting-form-actions"},u.a.createElement(f.a,{size:"default",htmlType:"submit",type:"primary",loading:y},y?"Processing":"Update Profile"),"\xa0 \xa0",u.a.createElement(_.b,{to:"/admin"},u.a.createElement(f.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))}}}]);
(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[53],{838:function(e,a,t){"use strict";t.r(a);t(156);var l,n=t(79),r=(t(157),t(37)),i=(t(302),t(218)),s=(t(563),t(559)),c=t(9),o=(t(530),t(532)),m=t(48),u=(t(560),t(562)),f=t(0),d=t.n(f),b=t(521),p=t(519),E=t(522),g=t(28),h=(t(140),t(840),t(587),t(593)),v=t(10),j=t(18),O=Object(j.b)(h.a)(l||(l=Object(v.a)(["\n\n"]))),P=(O.CheckableTag,t(43)),y=t(136),N=t(54),I=t.n(N),U=t(219),A=t(8),T=t(836);u.a.Option,a.default=function(){var e=o.a.useForm(),a=(Object(m.a)(e,1)[0],Object(P.d)((function(e){return e.auth.user}))),t=Object(f.useState)(!1),l=Object(m.a)(t,2),u=l[0],h=l[1],v=Object(f.useState)({}),j=Object(m.a)(v,2),O=j[0],N=j[1];return d.a.createElement(b.a,{title:d.a.createElement("div",{className:"setting-card-title"},d.a.createElement(g.a,{as:"h4"},"Edit Profile"),d.a.createElement("span",null,"Set Up Your Personal Information"))},d.a.createElement(n.a,{justify:"center"},d.a.createElement(r.a,{xl:12,lg:16,xs:24},d.a.createElement(E.a,null,d.a.createElement(o.a,{labelCol:{span:6},name:"editProfile",onFinish:function(e){h(!0);var t={data:Object(c.a)(Object(c.a)({},e),{},{uid:a.uid,sendEmail:!0})};console.log(t),O.file&&(t.file=O.file),y.a.mutate({mutation:y.d.ADMIN_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var a,t;if(!(null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.adminUpdate)||void 0===t?void 0:t.status))return U.b.error(data.message);U.b.success("Profile updated successfully.")})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),U.b.error("Something went wrong!!")})).finally((function(){h(!1)}))}},d.a.createElement(o.a.Item,{label:"Photo"},d.a.createElement("p",null,d.a.createElement(T.a,{rotate:!0},d.a.createElement(s.a,{listType:"picture-card",beforeUpload:function(e){console.log(e);var a="image/jpeg"===e.type;if(!a)return U.b.error("You can only upload JPG file!");var t=e.size/1024/1024<2;return t?(a&&t&&N({file:e,thumbnail:URL.createObjectURL(e)}),!1):U.b.error("Image must smaller than 2MB!")},onPreview:function(){return console.log()},onRemove:function(){return N({})},fileList:O.file?[{file:O.file,url:O.thumbnail}]:[]},!O.file&&"+ Upload")))),d.a.createElement(o.a.Item,{label:"Email"},d.a.createElement("p",null," ",a.email)),d.a.createElement(o.a.Item,{name:"first_name",initialValue:a.first_name,label:"First Name",rules:[{required:!0,max:30,message:"Please enter First Name"}]},d.a.createElement(i.a,null)),d.a.createElement(o.a.Item,{name:"last_name",initialValue:a.last_name,label:"Last Name",rules:[{required:!0,message:"Please enter Last Name"}]},d.a.createElement(i.a,null)),d.a.createElement("div",{className:"setting-form-actions"},d.a.createElement(p.a,{size:"default",htmlType:"submit",type:"primary",loading:u},u?"Processing":"Update Profile"),"\xa0 \xa0",d.a.createElement(A.b,{to:"/admin"},d.a.createElement(p.a,{size:"default",type:"light"},"Cancel"))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[49],{862:function(e,a,t){"use strict";t.r(a);t(126);var l,n=t(67),r=(t(127),t(45)),i=(t(109),t(31)),s=(t(363),t(291)),c=t(12),m=(t(207),t(40)),o=t(26),u=(t(290),t(142)),f=t(0),d=t.n(f),b=t(128),p=t(186),E=t(129),g=t(42),h=(t(95),t(360),t(667),t(713)),j=t(10),v=t(17),O=Object(v.b)(h.a)(l||(l=Object(j.a)(["\n\n"]))),P=(O.CheckableTag,t(47)),y=t(46),_=t(50),N=t.n(_),I=t(36),U=t(11),S=t(861),A=t(154);u.a.Option,a.default=function(){var e=m.a.useForm(),a=(Object(o.a)(e,1)[0],Object(P.d)((function(e){return e.auth.user}))),t=Object(f.useState)(!1),l=Object(o.a)(t,2),u=l[0],h=l[1],j=Object(f.useState)({}),v=Object(o.a)(j,2),O=v[0],_=v[1],T=Object(P.c)();return d.a.createElement(b.a,{title:d.a.createElement("div",{className:"setting-card-title"},d.a.createElement(g.a,{as:"h4"},"Edit Profile"),d.a.createElement("span",null,"Set Up Your Personal Information"))},d.a.createElement(n.a,{justify:"center"},d.a.createElement(r.a,{xl:12,lg:16,xs:24},d.a.createElement(E.a,null,d.a.createElement(m.a,{labelCol:{span:6},name:"editProfile",onFinish:function(e){h(!0);var t={data:Object(c.a)(Object(c.a)({},e),{},{uid:a.uid,sendEmail:!0})};console.log(t),O.file&&(t.file=O.file),y.a.mutate({mutation:y.d.ADMIN_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:N.a.get("psp_t")}}}).then((function(t){var l,n;if(!(null===t||void 0===t||null===(l=t.data)||void 0===l||null===(n=l.adminUpdate)||void 0===n?void 0:n.status))return I.b.error(data.message);I.b.success("Profile updated successfully.");var r=e.first_name,i=e.last_name;T(Object(A.a)(Object(c.a)(Object(c.a)({},a),{},{first_name:r,last_name:i})))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),I.b.error("Something went wrong!!")})).finally((function(){h(!1)}))}},d.a.createElement(m.a.Item,{label:"Photo"},d.a.createElement("p",null,d.a.createElement(S.a,{rotate:!0},d.a.createElement(s.a,{listType:"picture-card",beforeUpload:function(e){console.log(e);var a="image/jpeg"===e.type;if(!a)return I.b.error("You can only upload JPG file!");var t=e.size/1024/1024<2;return t?(a&&t&&_({file:e,thumbnail:URL.createObjectURL(e)}),!1):I.b.error("Image must smaller than 2MB!")},onPreview:function(){return console.log()},onRemove:function(){return _({})},fileList:O.file?[{file:O.file,url:O.thumbnail}]:[]},!O.file&&"+ Upload")))),d.a.createElement(m.a.Item,{label:"Email"},d.a.createElement("p",null," ",a.email)),d.a.createElement(m.a.Item,{name:"first_name",initialValue:a.first_name,label:"First Name",rules:[{required:!0,max:30,message:"Please enter First Name"}]},d.a.createElement(i.a,null)),d.a.createElement(m.a.Item,{name:"last_name",initialValue:a.last_name,label:"Last Name",rules:[{required:!0,message:"Please enter Last Name"}]},d.a.createElement(i.a,null)),d.a.createElement("div",{className:"setting-form-actions"},d.a.createElement(p.a,{size:"default",htmlType:"submit",type:"primary",loading:u},u?"Processing":"Update Profile"),"\xa0 \xa0",d.a.createElement(U.b,{to:"/admin"},d.a.createElement(p.a,{size:"default",type:"light"},"Cancel"))))))))}}}]);
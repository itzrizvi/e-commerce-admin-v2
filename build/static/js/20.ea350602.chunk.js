(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[20],{624:function(e,n,t){"use strict";t.d(n,"a",(function(){return m}));var a,r,i,l,u,d,o,c=t(11),s=t(29),m={BANNER_ADD:Object(s.d)(a||(a=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n        addBanner(data: $data) {\n        message\n        status\n        data {\n            banner_uuid\n        }\n      }\n    }"]))),BANNER_IMAGE_ADD:Object(s.d)(r||(r=Object(c.a)(["\n    mutation addBannerImage($data: BannerImageInput!) {\n      addBannerImage(data: $data) {\n        message\n        status\n        data {\n          banner_uuid\n          title\n          link\n          sort_order\n        }\n      }\n    }"]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(c.a)(["\n    query getAllBanners{\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          banner_uuid\n          banner_name\n          banner_slug\n          banner_status\n          createdAt\n        }\n      }\n    }"]))),GET_SINGLE_BANNER:Object(s.d)(l||(l=Object(c.a)(["\n    query getSingleBanner($banner_uuid : UUID!){\n    getSingleBanner(query: {banner_uuid: $banner_uuid}) {\n      message\n      tenant_id\n      status\n      data {\n        banner_uuid\n        banner_name\n        banner_status\n        bannerimages {\n          banner_uuid \n          image\n          link\n          sort_order\n          title\n        }\n      }\n    }\n  }"]))),BANNER_UPDATE:Object(s.d)(u||(u=Object(c.a)(["\n  mutation updateBanner($data: UpdateBannerInput){\n    updateBanner(data:$data){\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_UPDATE:Object(s.d)(d||(d=Object(c.a)(["\n    mutation updateBannerImage($data: UpdateBannerImageInput){\n    updateBannerImage(data: $data) {\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_DELETE:Object(s.d)(o||(o=Object(c.a)(["\n    mutation deleteBannerImage($banner_uuid: UUID!) {\n      deleteBannerImage(data: {banner_uuid: $banner_uuid}) {\n        message\n        status\n        tenant_id\n      }\n    }"])))}},873:function(e,n,t){"use strict";t.r(n);t(130);var a=t(67),r=(t(131),t(43)),i=(t(281),t(132)),l=(t(256),t(147)),u=t(177),d=(t(607),t(606)),o=(t(143),t(68)),c=t(12),s=(t(280),t(59)),m=t(33),b=t(0),g=t.n(b),f=t(146),E=t(145),p=t(144),_=t(176),h=t(54),B=t(10),A=t(44),v=t(48),y=t(351),I=t(624),O=t(283),j=t(259),N=t(284),k=t(25),T=t.n(k),S=t(35);n.default=function(){Object(S.b)("banner");var e=Object(h.useHistory)(),n=Object(A.d)((function(e){return e.auth.token})),t=Object(b.useState)(!1),k=Object(m.a)(t,2),x=k[0],D=k[1],L=Object(b.useState)(!0),w=Object(m.a)(L,2),C=w[0],R=w[1],U=Object(b.useState)(""),$=Object(m.a)(U,2),z=$[0],G=$[1],P=s.a.useForm(),F=Object(m.a)(P,1)[0],q={id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",action:""},M=Object(b.useState)([q]),J=Object(m.a)(M,2),W=J[0],H=J[1],K=function(e){var n="image/jpeg"===e.type;n||v.b.error("You can only upload JPG file!");var t=e.size/1024/1024<1;return t||v.b.error("Image must smaller than 1MB!"),n&&t&&G(e),!1},Q=g.a.createElement("div",null,g.a.createElement(y.a,null),g.a.createElement("div",{style:{marginTop:8}}," Upload ")),Y=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var n=e.target.getAttribute("data-id");if(n)W.map((function(e){return e.id==n&&(e.image=z),e}))}},V=[{title:"Title",dataIndex:"title",key:"title",render:function(e,n){return g.a.createElement(o.a,{type:"text",placeholder:"Title",onChange:function(e){return n.title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",render:function(e,n){return g.a.createElement(o.a,{type:"text",placeholder:"Link",onChange:function(e){return n.link=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",render:function(e,n){return g.a.createElement(d.a,{name:"avatar",listType:"picture-card","data-id":n.id,className:"avatar-uploader",showUploadList:!1,beforeUpload:K,onChange:Y(event),fileList:[]},n.image?g.a.createElement(N.LazyLoadImage,{src:URL.createObjectURL(n.image),onError:j.errorImageSrc,alt:"image",style:{width:"100%"}}):Q)}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:150,render:function(e,n){return g.a.createElement(o.a,{type:"number",placeholder:"Sort Order",onChange:function(e){return n.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,n){return g.a.createElement(_.a,{size:"",title:"Remove",type:"danger",onClick:function(){return X(n.id)}},g.a.createElement(T.a,{icon:"minus"}))}}],X=function(e){H((function(n){return n.filter((function(n){return n.id!==e}))}))};return g.a.createElement(g.a.Fragment,null,g.a.createElement(f.a,{title:"Add Banner"}),g.a.createElement(E.b,null,g.a.createElement(a.a,{gutter:25},g.a.createElement(r.a,{sm:24,xs:24},g.a.createElement(p.a,{headless:!0},g.a.createElement(s.a,{style:{width:"100%"},form:F,name:"addBanner",onFinish:function(t){var a=!0;if(W.forEach((function(e){if(a&&(""==e.image||""==e.title))return v.b.info("Please Provide All Banner Image First!"),void(a=!1)})),a){D(!0);var r=Object(c.a)(Object(c.a)({},t),{},{banner_status:C});O.b.mutate({mutation:I.a.BANNER_ADD,variables:{data:r},context:{headers:{TENANTID:"100001",Authorization:n}},refetchQueries:[{query:I.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:n}}},"getAllBanners"]}).then((function(e){var t,a,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.addBanner;if(!(null===r||void 0===r?void 0:r.status))return v.b.error("Something Went wrong !");var i=null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.banner_uuid;W.forEach((function(e){O.a.mutate({mutation:I.a.BANNER_IMAGE_ADD,variables:{data:{banner_id:i,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image}},context:{headers:{TENANTID:"100001",Authorization:n}}}).then((function(e){console.log(e)})).catch((function(e){v.b.error("Something Went wrong !!")}))}))})).catch((function(e){v.b.error("Something Went wrong !!!")})).finally((function(){D(!1),e.push("/admin/banner/list"),v.b.success("Banner Added Successfully!"),setTimeout((function(){window.location.reload()}),2e3)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},g.a.createElement(s.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"banner_name",label:"Banner Name"},g.a.createElement(o.a,{placeholder:"Enter Banner Name"})),g.a.createElement(s.a.Item,{label:"Status"},g.a.createElement(l.a,{checked:C,onChange:function(e){return R(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),g.a.createElement(i.a,{className:"table-responsive",columns:V,pagination:!1,rowKey:"id",size:"small",dataSource:W}),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},g.a.createElement(_.a,{size:"small",title:"Add Banner",htmlType:"button",type:"primary"},g.a.createElement(T.a,{icon:"plus",onClick:function(){var e={id:(new Date).getTime(),title:"",link:"",image:"",sort_order:""};H((function(n){return[].concat(Object(u.a)(n),[e])}))}}))),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},g.a.createElement(s.a.Item,null,g.a.createElement(_.a,{loading:x,size:"default",htmlType:"submit",type:"primary",raised:!0},x?"Processing":"Save"),g.a.createElement(B.b,{to:"/admin/banner/list"},g.a.createElement(_.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
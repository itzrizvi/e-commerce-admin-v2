(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[15],{628:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,l,d,o,c,u=n(10),s=n(20),m={BANNER_ADD:Object(s.d)(a||(a=Object(u.a)(["\n    mutation addBanner($data: BannerInput) {\n        addBanner(data: $data) {\n        message\n        status\n        data {\n            id\n        }\n      }\n    }"]))),BANNER_IMAGE_ADD:Object(s.d)(r||(r=Object(u.a)(["\n    mutation addBannerImage($data: BannerImageInput!) {\n      addBannerImage(data: $data) {\n        message\n        status\n        data {\n          id\n          title\n          link\n          sort_order\n        }\n      }\n    }"]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(u.a)(["\n    query getAllBanners{\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }"]))),GET_SINGLE_BANNER:Object(s.d)(l||(l=Object(u.a)(["\n    query getSingleBanner($banner_id : Int!){\n    getSingleBanner(query: {banner_id: $banner_id}) {\n      message\n      tenant_id\n      status\n      data {\n        id\n        name\n        status\n        banner_images {\n          id \n          image\n          link\n          sort_order\n          title\n        }\n      }\n    }\n  }"]))),BANNER_UPDATE:Object(s.d)(d||(d=Object(u.a)(["\n  mutation updateBanner($data: UpdateBannerInput){\n    updateBanner(data:$data){\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_UPDATE:Object(s.d)(o||(o=Object(u.a)(["\n    mutation updateBannerImage($data: UpdateBannerImageInput){\n    updateBannerImage(data: $data) {\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_DELETE:Object(s.d)(c||(c=Object(u.a)(["\n    mutation deleteBannerImage($banner_id: Int!) {\n      deleteBannerImage(data: {banner_id: $banner_id}) {\n        message\n        status\n        tenant_id\n      }\n    }"])))}},890:function(e,t,n){"use strict";n.r(t);n(126);var a=n(67),r=(n(127),n(45)),i=(n(188),n(94)),l=(n(268),n(152)),d=n(95),o=(n(363),n(291)),c=(n(109),n(31)),u=n(12),s=(n(207),n(40)),m=n(26),g=n(0),b=n.n(g),E=n(151),f=n(129),p=n(128),h=n(186),B=n(58),A=n(11),_=n(47),v=n(36),y=n(360),I=n(628),O=n(141),j=n(153),N=n(210),k=n(21),T=n.n(k),S=n(33);t.default=function(){Object(S.b)("banner");var e=Object(B.useHistory)(),t=Object(_.d)((function(e){return e.auth.token})),n=Object(g.useState)(!1),k=Object(m.a)(n,2),x=k[0],D=k[1],L=Object(g.useState)(!0),w=Object(m.a)(L,2),C=w[0],R=w[1],$=Object(g.useState)(""),z=Object(m.a)($,2),G=z[0],P=z[1],U=s.a.useForm(),F=Object(m.a)(U,1)[0],q={id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",action:""},M=Object(g.useState)([q]),J=Object(m.a)(M,2),W=J[0],H=J[1],K=function(e){var t="image/jpeg"===e.type;t||v.b.error("You can only upload JPG file!");var n=e.size/1024/1024<1;return n||v.b.error("Image must smaller than 1MB!"),t&&n&&P(e),!1},Q=b.a.createElement("div",null,b.a.createElement(y.a,null),b.a.createElement("div",{style:{marginTop:8}}," Upload ")),Y=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var t=e.target.getAttribute("data-id");if(t)W.map((function(e){return e.id==t&&(e.image=G),e}))}},V=[{title:"Title",dataIndex:"title",key:"title",render:function(e,t){return b.a.createElement(c.a,{type:"text",placeholder:"Title",onChange:function(e){return t.title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",render:function(e,t){return b.a.createElement(c.a,{type:"text",placeholder:"Link",onChange:function(e){return t.link=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",render:function(e,t){return b.a.createElement(o.a,{name:"avatar",listType:"picture-card","data-id":t.id,className:"avatar-uploader",showUploadList:!1,beforeUpload:K,onChange:Y(event),fileList:[]},t.image?b.a.createElement(N.LazyLoadImage,{src:URL.createObjectURL(t.image),onError:j.errorImageSrc,alt:"image",style:{width:"100%"}}):Q)}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:150,render:function(e,t){return b.a.createElement(c.a,{type:"number",placeholder:"Sort Order",onChange:function(e){return t.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return b.a.createElement(h.a,{size:"",title:"Remove",type:"danger",onClick:function(){return X(t.id)}},b.a.createElement(T.a,{icon:"minus"}))}}],X=function(e){H((function(t){return t.filter((function(t){return t.id!==e}))}))};return b.a.createElement(b.a.Fragment,null,b.a.createElement(E.a,{title:"Add Banner"}),b.a.createElement(f.b,null,b.a.createElement(a.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(p.a,{headless:!0},b.a.createElement(s.a,{style:{width:"100%"},form:F,name:"addBanner",onFinish:function(n){var a=!0;if(W.forEach((function(e){if(a&&(""==e.image||""==e.title))return v.b.info("Please Provide All Banner Image First!"),void(a=!1)})),a){D(!0);var r=Object(u.a)(Object(u.a)({},n),{},{banner_status:C});O.b.mutate({mutation:I.a.BANNER_ADD,variables:{data:r},context:{headers:{TENANTID:"100001",Authorization:t}},refetchQueries:[{query:I.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:t}}},"getAllBanners"]}).then((function(n){var a,r,i=null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.addBanner;if(!(null===i||void 0===i?void 0:i.status))return v.b.error("Something Went wrong !");var l=null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.id;W.forEach((function(n,a){O.a.mutate({mutation:I.a.BANNER_IMAGE_ADD,variables:{data:{banner_id:l,title:n.title,sort_order:n.sort_order,link:n.link,image:n.image}},context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(t){W.length===a+1&&(e.push("/admin/banner/list"),D(!1),v.b.success("Banner Added Successfully!"),setTimeout((function(){window.location.reload()}),2e3))})).catch((function(e){v.b.error("Something Went wrong !!")}))}))})).catch((function(e){v.b.error("Something Went wrong !!!")}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},b.a.createElement(s.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"banner_name",label:"Banner Name"},b.a.createElement(c.a,{placeholder:"Enter Banner Name"})),b.a.createElement(s.a.Item,{label:"Status"},b.a.createElement(l.a,{checked:C,onChange:function(e){return R(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),b.a.createElement(i.a,{className:"table-responsive",columns:V,pagination:!1,rowKey:"id",size:"small",dataSource:W}),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},b.a.createElement(h.a,{onClick:function(){var e={id:(new Date).getTime(),title:"",link:"",image:"",sort_order:""};H((function(t){return[].concat(Object(d.a)(t),[e])}))},size:"small",title:"Add Banner",htmlType:"button",type:"primary"},b.a.createElement(T.a,{icon:"plus"}))),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},b.a.createElement(s.a.Item,null,b.a.createElement(h.a,{loading:x,size:"default",htmlType:"submit",type:"primary",raised:!0},x?"Processing":"Save"),b.a.createElement(A.b,{to:"/admin/banner/list"},b.a.createElement(h.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
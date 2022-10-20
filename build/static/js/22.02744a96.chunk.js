(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[22],{622:function(e,n,a){"use strict";a.d(n,"a",(function(){return m}));var t,r,i,l,o,d,u,c=a(12),s=a(30),m={BANNER_ADD:Object(s.d)(t||(t=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n        addBanner(data: $data) {\n        message\n        status\n        data {\n            banner_uuid\n        }\n      }\n    }"]))),BANNER_IMAGE_ADD:Object(s.d)(r||(r=Object(c.a)(["\n    mutation addBannerImage($data: BannerImageInput!) {\n      addBannerImage(data: $data) {\n        message\n        status\n        data {\n          banner_uuid\n          title\n          link\n          sort_order\n        }\n      }\n    }"]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(c.a)(["\n    query getAllBanners{\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          banner_uuid\n          banner_name\n          banner_slug\n          banner_status\n          createdAt\n        }\n      }\n    }"]))),GET_SINGLE_BANNER:Object(s.d)(l||(l=Object(c.a)(["\n    query getSingleBanner($banner_uuid : UUID!){\n    getSingleBanner(query: {banner_uuid: $banner_uuid}) {\n      message\n      tenant_id\n      status\n      data {\n        banner_uuid\n        banner_name\n        banner_status\n        bannerimages {\n          banner_uuid \n          image\n          link\n          sort_order\n          title\n        }\n      }\n    }\n  }"]))),BANNER_UPDATE:Object(s.d)(o||(o=Object(c.a)(["\n  mutation updateBanner($data: UpdateBannerInput){\n    updateBanner(data:$data){\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_UPDATE:Object(s.d)(d||(d=Object(c.a)(["\n    mutation updateBannerImage($data: UpdateBannerImageInput){\n    updateBannerImage(data: $data) {\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_DELETE:Object(s.d)(u||(u=Object(c.a)(["\n    mutation deleteBannerImage($banner_uuid: UUID!) {\n      deleteBannerImage(data: {banner_uuid: $banner_uuid}) {\n        message\n        status\n        tenant_id\n      }\n    }"])))}},875:function(e,n,a){"use strict";a.r(n);a(129);var t=a(66),r=(a(130),a(41)),i=(a(279),a(131)),l=(a(254),a(146)),o=(a(196),a(119)),d=(a(356),a(697)),u=a(176),c=(a(605),a(604)),s=(a(142),a(67)),m=a(11),b=(a(278),a(57)),g=a(33),v=a(0),_=a.n(v),f=a(145),E=a(144),h=a(143),p=a(175),N=a(53),A=a(10),y=a(42),B=a(46),I=a(349),O=a(331),j=a(622),T=a(281),k=a(257),S=a(282),x=a(28),D=a.n(x),w=a(197),R=a.n(w);n.default=function(){var e,n,a=Object(N.useLocation)().search,x=R.a.parse(a),w=Object(N.useHistory)(),L=Object(y.d)((function(e){return e.auth.token})),C=Object(v.useState)(!1),U=Object(g.a)(C,2),z=U[0],G=U[1],$=Object(v.useState)(!0),P=Object(g.a)($,2),F=P[0],M=P[1],q=Object(v.useState)(""),V=Object(g.a)(q,2),W=V[0],J=V[1],H=b.a.useForm(),K=Object(g.a)(H,1)[0],Q=Object(v.useState)([]),Y=Object(g.a)(Q,2),X=Y[0],Z=Y[1],ee=Object(v.useState)({data:{},loading:!0,error:""}),ne=Object(g.a)(ee,2),ae=ne[0],te=ne[1];Object(v.useEffect)((function(){T.b.query({query:j.a.GET_SINGLE_BANNER,variables:{banner_uuid:null===x||void 0===x?void 0:x.id},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){var n,a,t,r,i=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.getSingleBanner;if(i.status){te({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var l=[];null===i||void 0===i||null===(a=i.data)||void 0===a||a.bannerimages.forEach((function(e){l.push({banner_id:e.banner_uuid,title:e.title,link:e.link,image:e.image,sort_order:e.sort_order})})),Z(l),M(null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.banner_status),K.setFieldsValue({banner_name:null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.banner_name})}})).catch((function(e){console.log(e),te({data:{},loading:!1,error:"Something went worng"})}))}),[]);var re=function(e){var n="image/jpeg"===e.type;n||B.b.error("You can only upload JPG file!");var a=e.size/1024/1024<1;return a||B.b.error("Image must smaller than 1MB!"),n&&a&&J(e),!1},ie=_.a.createElement("div",null,_.a.createElement(I.a,null),_.a.createElement("div",{style:{marginTop:8}}," Upload ")),le=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var n=e.target.getAttribute("data-id");if(n)X.map((function(e){return e.banner_id==n&&(e.image=W),e}))}},oe=[{title:"Title",dataIndex:"title",key:"title",render:function(e,n){return _.a.createElement(s.a,{type:"text",defaultValue:n.title,placeholder:"Title",onChange:function(e){return n.title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",render:function(e,n){return _.a.createElement(s.a,{type:"text",defaultValue:n.link,placeholder:"Link",onChange:function(e){return n.link=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",render:function(e,n){return _.a.createElement(c.a,{name:"avatar",listType:"picture-card","data-id":n.banner_id,className:"avatar-uploader",showUploadList:!1,beforeUpload:re,onChange:le(event),fileList:[]},n.image?_.a.createElement(S.LazyLoadImage,{src:"string"===typeof n.image?Object(k.renderImage)(null===x||void 0===x?void 0:x.id,n.image,"banner","128x128"):URL.createObjectURL(n.image),onError:k.errorImageSrc,alt:"image",style:{width:"100%"}}):ie)}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:150,render:function(e,n){return _.a.createElement(s.a,{type:"number",defaultValue:n.sort_order,placeholder:"Sort Order",onChange:function(e){return n.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,n){return _.a.createElement(p.a,{size:"",title:"Remove",type:"danger"},_.a.createElement(D.a,{icon:"minus",onClick:function(){return de(n.banner_id)}}))}}],de=function(e){d.a.confirm({title:"Slider Remove Confirmation!",icon:_.a.createElement(O.a,null),content:"Do you want to permanently remove this slider?",okText:"Remove",cancelText:"Cancel",okType:"danger",onOk:function(){var n=X.find((function(n){return n.banner_id===e}));(null===n||void 0===n?void 0:n.isNew)?(B.b.success("Slider Removed successfully"),Z((function(n){return n.filter((function(n){return n.banner_id!==e}))}))):T.a.mutate({mutation:j.a.BANNER_IMAGE_DELETE,variables:{banner_uuid:e},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(n){var a,t;(null===n||void 0===n||null===(a=n.data)||void 0===a||null===(t=a.deleteBannerImage)||void 0===t?void 0:t.status)&&(B.b.success("Slider Removed successfully"),Z((function(n){return n.filter((function(n){return n.banner_id!==e}))})))})).catch((function(e){B.b.error("Something Went wrong!!")}))}})};return _.a.createElement(_.a.Fragment,null,_.a.createElement(f.a,{title:"Manage Banner | Edit Banner ".concat((null===ae||void 0===ae||null===(e=ae.data)||void 0===e?void 0:e.banner_name)?"(".concat(null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.banner_name,")"):"")}),_.a.createElement(E.b,null,_.a.createElement(t.a,{gutter:25},_.a.createElement(r.a,{sm:24,xs:24},_.a.createElement(h.a,{headless:!0},(null===ae||void 0===ae?void 0:ae.loading)?_.a.createElement("div",{className:"spin"},_.a.createElement(o.a,null)):_.a.createElement(b.a,{style:{width:"100%"},form:K,name:"addBanner",onFinish:function(e){var n=!0;if(X.forEach((function(e){if(n&&(""==e.image||""==e.title))return B.b.info("Please Provide All Banner Image and Title!"),void(n=!1)})),n){var a;G(!0);var t=Object(m.a)(Object(m.a)({},e),{},{banner_status:F,banner_uuid:null===ae||void 0===ae||null===(a=ae.data)||void 0===a?void 0:a.banner_uuid});T.b.mutate({mutation:j.a.BANNER_UPDATE,variables:{data:t},context:{headers:{TENANTID:"100001",Authorization:L}},refetchQueries:[{query:j.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:L}}},"getAllBanners"]}).then((function(e){X.forEach((function(e){var n,a,t,r;(null===e||void 0===e?void 0:e.isNew)?T.a.mutate({mutation:j.a.BANNER_IMAGE_ADD,variables:{data:{banner_id:null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.banner_uuid,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){})).catch((function(e){B.b.error("Something Went wrong!!")})):(r="string"==typeof e.image?{banner_id:null===ae||void 0===ae||null===(a=ae.data)||void 0===a?void 0:a.banner_uuid,banner_uuid:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link}:{banner_id:null===ae||void 0===ae||null===(t=ae.data)||void 0===t?void 0:t.banner_uuid,banner_uuid:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image},T.a.mutate({mutation:j.a.BANNER_IMAGE_UPDATE,variables:{data:r},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){console.log(e)})).catch((function(e){B.b.error("Something Went wrong!!")})))}))})).catch((function(e){B.b.error("Something Went wrong !!!")})).finally((function(){G(!1),w.push("/admin/banner/list"),B.b.success("Banner Updated Successfully!"),setTimeout((function(){window.location.reload()}),1e3)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},_.a.createElement(b.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"banner_name",label:"Banner Name"},_.a.createElement(s.a,{placeholder:"Enter Banner Name"})),_.a.createElement(b.a.Item,{label:"Status"},_.a.createElement(l.a,{checked:F,onChange:function(e){return M(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),_.a.createElement(i.a,{className:"table-responsive",columns:oe,pagination:!1,rowKey:"banner_id",size:"small",dataSource:X}),_.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},_.a.createElement(p.a,{size:"small",title:"Add Banner",htmlType:"button",type:"primary"},_.a.createElement(D.a,{icon:"plus",onClick:function(){var e={banner_id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",isNew:!0};Z((function(n){return[].concat(Object(u.a)(n),[e])}))}}))),_.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},_.a.createElement(b.a.Item,null,_.a.createElement(p.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),_.a.createElement(A.b,{to:"/admin/banner/list"},_.a.createElement(p.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
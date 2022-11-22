(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[15],{632:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,o,l,d,u,c=n(10),s=n(18),m={BANNER_ADD:Object(s.d)(a||(a=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n      addBanner(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),BANNER_ITEM_ADD:Object(s.d)(r||(r=Object(c.a)(["\n    mutation addBannerItem($data: BannerItemInput!) {\n      addBannerItem(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(c.a)(["\n    query getAllBanners {\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }\n  "]))),GET_SINGLE_BANNER:Object(s.d)(o||(o=Object(c.a)(["\n    query getSingleBanner($banner_id: Int!) {\n      getSingleBanner(query: { banner_id: $banner_id }) {\n        message\n        tenant_id\n        status\n        data {\n          id\n          name\n          status\n          banner_items {\n            id\n            title\n            sub_title\n            link\n            price\n            sale_price\n            button_text\n            option_1\n            option_2\n            image\n            sort_order\n          }\n        }\n      }\n    }\n  "]))),BANNER_UPDATE:Object(s.d)(l||(l=Object(c.a)(["\n    mutation updateBanner($data: UpdateBannerInput) {\n      updateBanner(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_UPDATE:Object(s.d)(d||(d=Object(c.a)(["\n    mutation updateBannerItem($data: UpdateBannerItemInput) {\n      updateBannerItem(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_DELETE:Object(s.d)(u||(u=Object(c.a)(["\n    mutation deleteBannerItem($banner_id: Int!) {\n      deleteBannerItem(data: { banner_id: $banner_id }) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},675:function(e,t,n){},960:function(e,t,n){"use strict";n.r(t);n(113);var a=n(55),r=(n(114),n(41)),i=(n(149),n(73)),o=(n(272),n(163)),l=(n(131),n(70)),d=(n(373),n(730)),u=n(83),c=(n(365),n(214)),s=(n(88),n(24)),m=n(8),p=(n(162),n(23)),_=n(16),b=n(0),f=n.n(b),g=n(103),v=n(90),E=n(89),h=n(75),y=n(62),I=n(12),x=n(46),N=n(31),B=n(362),T=n(347),O=n(632),A=n(151),k=n(124),j=n(165),w=n(19),S=n.n(w),C=n(150),D=n.n(C),R=n(25);n(675);t.default=function(){var e,t;Object(R.c)("banner");var n=Object(y.useLocation)().search,w=D.a.parse(n),C=Object(y.useHistory)(),L=Object(x.d)((function(e){return e.auth.token})),P=Object(b.useState)(!1),z=Object(_.a)(P,2),U=z[0],$=z[1],V=Object(b.useState)(!0),F=Object(_.a)(V,2),M=F[0],q=F[1],G=Object(b.useState)(""),W=Object(_.a)(G,2),J=W[0],H=W[1],K=p.a.useForm(),Q=Object(_.a)(K,1)[0],X=Object(b.useState)([]),Y=Object(_.a)(X,2),Z=Y[0],ee=Y[1],te=Object(b.useState)({data:{},loading:!0,error:""}),ne=Object(_.a)(te,2),ae=ne[0],re=ne[1];Object(b.useEffect)((function(){A.b.query({query:O.a.GET_SINGLE_BANNER,variables:{banner_id:parseInt(null===w||void 0===w?void 0:w.id)},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){var t,n,a,r,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleBanner;if(i.status){re({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var o=[];null===i||void 0===i||null===(n=i.data)||void 0===n||n.banner_items.forEach((function(e){o.push({banner_id:e.id,title:e.title,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price,link:e.link,image:e.image,sort_order:e.sort_order})})),ee(o),q(null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.status),Q.setFieldsValue({name:null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.name})}})).catch((function(e){console.log(e),re({data:{},loading:!1,error:"Something went worng"})}))}),[]);var ie=function(e){var t=e.size/1024/1024<2;return t||N.b.error("Image must smaller than 2MB!"),t&&H(e),!1},oe=f.a.createElement("div",null,f.a.createElement(B.a,null),f.a.createElement("div",{style:{marginTop:8}}," Upload ")),le=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var t=e.target.getAttribute("data-id");if(t)Z.map((function(e){return e.banner_id==t&&(e.image=J),e}))}},de=[{title:"Title",dataIndex:"title",key:"title",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.title,placeholder:"Title",onChange:function(e){return t.title=e.target.value}})}},{title:"Sub Title",dataIndex:"sub_title",key:"sub_title",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.sub_title,placeholder:"Sub Title",onChange:function(e){return t.sub_title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",width:200,render:function(e,t){return f.a.createElement(s.a,{defaultValue:t.link,type:"text",placeholder:"Link",onChange:function(e){return t.link=e.target.value}})}},{title:"Button Text",dataIndex:"button_text",key:"button_text",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",placeholder:"Button Text",defaultValue:t.button_text,onChange:function(e){return t.button_text=e.target.value}})}},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.price,placeholder:"Price",onChange:function(e){return t.price=e.target.value}})}},{title:"Sale Price",dataIndex:"sale_price",key:"sale_price",width:100,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.sale_price,placeholder:"Sale Price",onChange:function(e){return t.sale_price=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",width:120,render:function(e,t){return f.a.createElement(c.a,{name:"avatar",listType:"picture-card","data-id":t.banner_id,className:"avatar-uploader",showUploadList:!1,beforeUpload:ie,onChange:le(event),fileList:[]},t.image?f.a.createElement(j.LazyLoadImage,{src:"string"===typeof t.image?Object(k.renderImage)(null===w||void 0===w?void 0:w.id,t.image,"banner","",!0):URL.createObjectURL(t.image),onError:k.errorImageSrc,alt:"image",effect:"blur",visibleByDefault:"/public/loading.webp"===J.src,style:{width:"100%"}}):oe)}},{title:"Optional One",dataIndex:"option_1",key:"option_1",width:150,ellipsis:!0,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.option_1,placeholder:"Optional One",onChange:function(e){return t.option_1=e.target.value}})}},{title:"Optional Two",dataIndex:"option_2",key:"option_2",width:150,ellipsis:!0,render:function(e,t){return f.a.createElement(s.a,{type:"text",placeholder:"Optional Two",defaultValue:t.option_2,onChange:function(e){return t.option_2=e.target.value}})}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:80,render:function(e,t){return f.a.createElement(s.a,{type:"number",defaultValue:t.sort_order,placeholder:"Sort Order",onChange:function(e){return t.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return f.a.createElement(h.a,{onClick:function(){return ue(t.banner_id)},size:"",title:"Remove",type:"danger"},f.a.createElement(S.a,{icon:"minus"}))}}],ue=function(e){d.a.confirm({title:"Slider Remove Confirmation!",icon:f.a.createElement(T.a,null),content:"Do you want to permanently remove this slider?",okText:"Remove",cancelText:"Cancel",okType:"danger",onOk:function(){var t=Z.find((function(t){return t.banner_id===e}));(null===t||void 0===t?void 0:t.isNew)?(N.b.success("Slider Removed successfully"),ee((function(t){return t.filter((function(t){return t.banner_id!==e}))}))):A.b.mutate({mutation:O.a.BANNER_ITEM_DELETE,variables:{banner_id:parseInt(e)},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var n,a;(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.deleteBannerItem)||void 0===a?void 0:a.status)&&(N.b.success("Slider Removed successfully"),ee((function(t){return t.filter((function(t){return t.banner_id!==e}))})))})).catch((function(e){N.b.error("Something Went wrong!!")}))}})};return f.a.createElement(f.a.Fragment,null,f.a.createElement(g.a,{title:"Manage Banner | Edit Banner ".concat((null===ae||void 0===ae||null===(e=ae.data)||void 0===e?void 0:e.name)?"(".concat(null===ae||void 0===ae||null===(t=ae.data)||void 0===t?void 0:t.name,")"):"")}),f.a.createElement(v.b,null,f.a.createElement(a.a,{gutter:25},f.a.createElement(r.a,{sm:24,xs:24},f.a.createElement(E.a,{headless:!0},(null===ae||void 0===ae?void 0:ae.loading)?f.a.createElement("div",{className:"spin"},f.a.createElement(l.a,null)):f.a.createElement(p.a,{style:{width:"100%"},form:Q,name:"addBanner",onFinish:function(e){var t=!0;if(Z.forEach((function(e){if(t&&(""==e.image||""==e.title))return N.b.info("Please Provide All Banner Image and Title!"),void(t=!1)})),t){var n;$(!0);var a=Object(m.a)(Object(m.a)({},e),{},{status:M,banner_id:null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.id});A.b.mutate({mutation:O.a.BANNER_UPDATE,variables:{data:a},context:{headers:{TENANTID:"100001",Authorization:L}},refetchQueries:[{query:O.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:L}}},"getAllBanners"]}).then((function(e){Z.forEach((function(e,t){var n,a,r,i;(null===e||void 0===e?void 0:e.isNew)?A.a.mutate({mutation:O.a.BANNER_ITEM_ADD,variables:{data:{banner_id:null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.id,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){})).catch((function(e){N.b.error("Something Went wrong!!")})):(i="string"==typeof e.image?{id:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link,banner_id:null===ae||void 0===ae||null===(a=ae.data)||void 0===a?void 0:a.id,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price}:{id:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image,banner_id:null===ae||void 0===ae||null===(r=ae.data)||void 0===r?void 0:r.id,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price},A.a.mutate({mutation:O.a.BANNER_ITEM_UPDATE,variables:{data:i},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){Z.length===t+1&&($(!1),N.b.success("Banner Updated Successfully!"),C.push("/admin/banner/list"),setTimeout((function(){window.location.reload()}),2e3))})).catch((function(e){N.b.error("Something Went wrong!!")})))}))})).catch((function(e){N.b.error("Something Went wrong !!!")}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},f.a.createElement(p.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"name",label:"Banner Name"},f.a.createElement(s.a,{placeholder:"Enter Banner Name"})),f.a.createElement(p.a.Item,{label:"Status"},f.a.createElement(o.a,{checked:M,onChange:function(e){return q(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),f.a.createElement(i.a,{className:"table-responsive",columns:de,pagination:!1,rowKey:"banner_id",size:"small",dataSource:Z}),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},f.a.createElement(h.a,{onClick:function(){var e={banner_id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",isNew:!0};ee((function(t){return[].concat(Object(u.a)(t),[e])}))},size:"small",title:"Add Banner",htmlType:"button",type:"primary"},f.a.createElement(S.a,{icon:"plus"}))),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},f.a.createElement(p.a.Item,null,f.a.createElement(h.a,{loading:U,size:"default",htmlType:"submit",type:"primary",raised:!0},U?"Processing":"Save"),f.a.createElement(I.b,{to:"/admin/banner/list"},f.a.createElement(h.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
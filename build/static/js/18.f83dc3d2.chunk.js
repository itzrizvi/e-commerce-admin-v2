(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[18],{636:function(e,t,n){},637:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,o,l,d,u,c=n(8),s=n(17),m={BANNER_ADD:Object(s.d)(a||(a=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n      addBanner(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),BANNER_ITEM_ADD:Object(s.d)(r||(r=Object(c.a)(["\n    mutation addBannerItem($data: BannerItemInput!) {\n      addBannerItem(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(c.a)(["\n    query getAllBanners {\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }\n  "]))),GET_SINGLE_BANNER:Object(s.d)(o||(o=Object(c.a)(["\n    query getSingleBanner($banner_id: Int!) {\n      getSingleBanner(query: { banner_id: $banner_id }) {\n        message\n        tenant_id\n        status\n        data {\n          id\n          name\n          status\n          banner_items {\n            id\n            title\n            sub_title\n            link\n            price\n            sale_price\n            button_text\n            option_1\n            option_2\n            image\n            sort_order\n          }\n        }\n      }\n    }\n  "]))),BANNER_UPDATE:Object(s.d)(l||(l=Object(c.a)(["\n    mutation updateBanner($data: UpdateBannerInput) {\n      updateBanner(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_UPDATE:Object(s.d)(d||(d=Object(c.a)(["\n    mutation updateBannerItem($data: UpdateBannerItemInput) {\n      updateBannerItem(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_DELETE:Object(s.d)(u||(u=Object(c.a)(["\n    mutation deleteBannerItem($banner_id: Int!) {\n      deleteBannerItem(data: { banner_id: $banner_id }) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},999:function(e,t,n){"use strict";n.r(t);n(143);var a=n(68),r=(n(144),n(52)),i=(n(133),n(71)),o=(n(303),n(217)),l=(n(132),n(74)),d=(n(366),n(643)),u=n(84),c=(n(365),n(220)),s=(n(115),n(39)),m=n(7),p=(n(201),n(27)),_=n(14),b=n(0),f=n.n(b),g=n(120),v=n(101),h=n(99),E=n(100),y=n(59),I=n(12),N=n(47),T=n(33),B=n(362),x=n(346),A=n(637),O=n(102),k=n(157),j=n(219),S=n(19),w=n.n(S),C=n(168),D=n.n(C),R=n(23);n(636);t.default=function(){var e,t;Object(R.c)("banner");var n=Object(y.useLocation)().search,S=D.a.parse(n),C=Object(y.useHistory)(),L=Object(N.d)((function(e){return e.auth.token})),z=Object(b.useState)(!1),U=Object(_.a)(z,2),P=U[0],$=U[1],V=Object(b.useState)(!0),q=Object(_.a)(V,2),F=q[0],G=q[1],M=Object(b.useState)(""),W=Object(_.a)(M,2),J=W[0],H=W[1],K=p.a.useForm(),Q=Object(_.a)(K,1)[0],X=Object(b.useState)([]),Y=Object(_.a)(X,2),Z=Y[0],ee=Y[1],te=Object(b.useState)({data:{},loading:!0,error:""}),ne=Object(_.a)(te,2),ae=ne[0],re=ne[1];Object(b.useEffect)((function(){O.b.query({query:A.a.GET_SINGLE_BANNER,variables:{banner_id:parseInt(null===S||void 0===S?void 0:S.id)},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){var t,n,a,r,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleBanner;if(i.status){re({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var o=[];null===i||void 0===i||null===(n=i.data)||void 0===n||n.banner_items.forEach((function(e){o.push({banner_id:e.id,title:e.title,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price,link:e.link,image:e.image,sort_order:e.sort_order})})),ee(o),G(null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.status),Q.setFieldsValue({name:null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.name})}})).catch((function(e){console.log(e),re({data:{},loading:!1,error:"Something went worng"})}))}));var ie=function(e){var t=e.size/1024/1024<2;return t||T.b.error("Image must smaller than 2MB!"),t&&H(e),!1},oe=f.a.createElement("div",null,f.a.createElement(B.a,null),f.a.createElement("div",{style:{marginTop:8}}," Upload ")),le=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var t=e.target.getAttribute("data-id");if(t)Z.map((function(e){return e.banner_id==t&&(e.image=J),e}))}},de=[{title:"Title",dataIndex:"title",key:"title",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.title,placeholder:"Title",onChange:function(e){return t.title=e.target.value}})}},{title:"Sub Title",dataIndex:"sub_title",key:"sub_title",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.sub_title,placeholder:"Sub Title",onChange:function(e){return t.sub_title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",width:200,render:function(e,t){return f.a.createElement(s.a,{defaultValue:t.link,type:"text",placeholder:"Link",onChange:function(e){return t.link=e.target.value}})}},{title:"Button Text",dataIndex:"button_text",key:"button_text",width:200,render:function(e,t){return f.a.createElement(s.a,{type:"text",placeholder:"Button Text",defaultValue:t.button_text,onChange:function(e){return t.button_text=e.target.value}})}},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(e,t){return f.a.createElement(s.a,{type:"number",defaultValue:t.price,placeholder:"Price",onChange:function(e){return t.price=e.target.value}})}},{title:"Sale Price",dataIndex:"sale_price",key:"sale_price",width:100,render:function(e,t){return f.a.createElement(s.a,{type:"number",defaultValue:t.sale_price,placeholder:"Sale Price",onChange:function(e){return t.sale_price=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",width:120,render:function(e,t){return f.a.createElement(c.a,{name:"avatar",listType:"picture-card","data-id":t.banner_id,className:"avatar-uploader",showUploadList:!1,beforeUpload:ie,onChange:le(event),fileList:[]},t.image?f.a.createElement(j.LazyLoadImage,{src:"string"===typeof t.image?Object(k.renderImage)(null===S||void 0===S?void 0:S.id,t.image,"banner","",!0):URL.createObjectURL(t.image),onError:k.errorImageSrc,alt:"image",effect:"blur",visibleByDefault:"/public/loading.webp"===J.src,style:{width:"100%"}}):oe)}},{title:"Optional One",dataIndex:"option_1",key:"option_1",width:150,ellipsis:!0,render:function(e,t){return f.a.createElement(s.a,{type:"text",defaultValue:t.option_1,placeholder:"Optional One",onChange:function(e){return t.option_1=e.target.value}})}},{title:"Optional Two",dataIndex:"option_2",key:"option_2",width:150,ellipsis:!0,render:function(e,t){return f.a.createElement(s.a,{type:"text",placeholder:"Optional Two",defaultValue:t.option_2,onChange:function(e){return t.option_2=e.target.value}})}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:80,render:function(e,t){return f.a.createElement(s.a,{type:"number",defaultValue:t.sort_order,placeholder:"Sort Order",onChange:function(e){return t.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return f.a.createElement(E.a,{onClick:function(){return ue(t.banner_id)},size:"",title:"Remove",type:"danger"},f.a.createElement(w.a,{icon:"minus"}))}}],ue=function(e){d.a.confirm({title:"Slider Remove Confirmation!",icon:f.a.createElement(x.a,null),content:"Do you want to permanently remove this slider?",okText:"Remove",cancelText:"Cancel",okType:"danger",onOk:function(){var t=Z.find((function(t){return t.banner_id===e}));(null===t||void 0===t?void 0:t.isNew)?(T.b.success("Slider Removed successfully"),ee((function(t){return t.filter((function(t){return t.banner_id!==e}))}))):O.b.mutate({mutation:A.a.BANNER_ITEM_DELETE,variables:{banner_id:parseInt(e)},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var n,a;(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.deleteBannerItem)||void 0===a?void 0:a.status)&&(T.b.success("Slider Removed successfully"),ee((function(t){return t.filter((function(t){return t.banner_id!==e}))})))})).catch((function(e){T.b.error("Something Went wrong!!")}))}})};return f.a.createElement(f.a.Fragment,null,f.a.createElement(g.a,{title:"Manage Banner | Edit Banner ".concat((null===ae||void 0===ae||null===(e=ae.data)||void 0===e?void 0:e.name)?"(".concat(null===ae||void 0===ae||null===(t=ae.data)||void 0===t?void 0:t.name,")"):"")}),f.a.createElement(v.b,null,f.a.createElement(a.a,{gutter:25},f.a.createElement(r.a,{sm:24,xs:24},f.a.createElement(h.a,{headless:!0},(null===ae||void 0===ae?void 0:ae.loading)?f.a.createElement("div",{className:"spin"},f.a.createElement(l.a,null)):f.a.createElement(p.a,{style:{width:"100%"},form:Q,name:"addBanner",onFinish:function(e){var t=!0;if(Z.forEach((function(e){if(t&&(""==e.image||""==e.title))return T.b.info("Please Provide All Banner Image and Title!"),void(t=!1)})),t){var n;$(!0);var a=Object(m.a)(Object(m.a)({},e),{},{status:F,banner_id:null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.id});O.b.mutate({mutation:A.a.BANNER_UPDATE,variables:{data:a},context:{headers:{TENANTID:"100001",Authorization:L,"Apollo-Require-Preflight":"true"}},refetchQueries:[{query:A.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:L}}},{query:A.a.GET_SINGLE_BANNER,variables:{banner_id:parseInt(null===S||void 0===S?void 0:S.id)},context:{headers:{TENANTID:"100001",Authorization:L}}}]}).then((function(e){0===Z.length&&($(!1),T.b.success("Banner Updated Successfully!"),setTimeout((function(){C.push("/admin/banner/list")}),1e3)),Z.forEach((function(e,t){var n,a,r,i;(null===e||void 0===e?void 0:e.isNew)?O.a.mutate({mutation:A.a.BANNER_ITEM_ADD,variables:{data:{banner_id:null===ae||void 0===ae||null===(n=ae.data)||void 0===n?void 0:n.id,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){Z.length===t+1&&($(!1),T.b.success("Banner Updated Successfully!"),setTimeout((function(){C.push("/admin/banner/list")}),1e3))})).catch((function(e){T.b.error("Something Went wrong!!")})):(i="string"==typeof e.image?{id:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link,banner_id:null===ae||void 0===ae||null===(a=ae.data)||void 0===a?void 0:a.id,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price}:{id:e.banner_id,title:e.title,sort_order:e.sort_order,link:e.link,image:e.image,banner_id:null===ae||void 0===ae||null===(r=ae.data)||void 0===r?void 0:r.id,sub_title:e.sub_title,button_text:e.button_text,option_1:e.option_1,option_2:e.option_2,price:e.price,sale_price:e.sale_price},O.a.mutate({mutation:A.a.BANNER_ITEM_UPDATE,variables:{data:i},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(e){Z.length===t+1&&($(!1),T.b.success("Banner Updated Successfully!"),setTimeout((function(){C.push("/admin/banner/list")}),1e3))})).catch((function(e){T.b.error("Something Went wrong!!")})))}))})).catch((function(e){T.b.error("Something Went wrong !!!")}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},f.a.createElement(p.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"name",label:"Banner Name"},f.a.createElement(s.a,{placeholder:"Enter Banner Name"})),f.a.createElement(p.a.Item,{label:"Status"},f.a.createElement(o.a,{checked:F,onChange:function(e){return G(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),f.a.createElement(i.a,{className:"table-responsive",columns:de,pagination:!1,rowKey:"banner_id",size:"small",dataSource:Z}),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},f.a.createElement(E.a,{onClick:function(){var e={banner_id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",isNew:!0};ee((function(t){return[].concat(Object(u.a)(t),[e])}))},size:"small",title:"Add Banner",htmlType:"button",type:"primary"},f.a.createElement(w.a,{icon:"plus"}))),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},f.a.createElement(p.a.Item,null,f.a.createElement(E.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),f.a.createElement(I.b,{to:"/admin/banner/list"},f.a.createElement(E.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
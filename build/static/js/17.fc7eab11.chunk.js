(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[17],{636:function(e,t,n){},637:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,l,o,u,d,c=n(8),s=n(17),m={BANNER_ADD:Object(s.d)(a||(a=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n      addBanner(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),BANNER_ITEM_ADD:Object(s.d)(r||(r=Object(c.a)(["\n    mutation addBannerItem($data: BannerItemInput!) {\n      addBannerItem(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),GET_ALL_BANNER:Object(s.d)(i||(i=Object(c.a)(["\n    query getAllBanners {\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }\n  "]))),GET_SINGLE_BANNER:Object(s.d)(l||(l=Object(c.a)(["\n    query getSingleBanner($banner_id: Int!) {\n      getSingleBanner(query: { banner_id: $banner_id }) {\n        message\n        tenant_id\n        status\n        data {\n          id\n          name\n          status\n          banner_items {\n            id\n            title\n            sub_title\n            link\n            price\n            sale_price\n            button_text\n            option_1\n            option_2\n            image\n            sort_order\n          }\n        }\n      }\n    }\n  "]))),BANNER_UPDATE:Object(s.d)(o||(o=Object(c.a)(["\n    mutation updateBanner($data: UpdateBannerInput) {\n      updateBanner(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_UPDATE:Object(s.d)(u||(u=Object(c.a)(["\n    mutation updateBannerItem($data: UpdateBannerItemInput) {\n      updateBannerItem(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_DELETE:Object(s.d)(d||(d=Object(c.a)(["\n    mutation deleteBannerItem($banner_id: Int!) {\n      deleteBannerItem(data: { banner_id: $banner_id }) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},998:function(e,t,n){"use strict";n.r(t);n(143);var a=n(68),r=(n(144),n(52)),i=(n(133),n(71)),l=(n(303),n(217)),o=n(84),u=(n(365),n(220)),d=(n(115),n(39)),c=n(7),s=(n(201),n(27)),m=n(14),p=n(0),b=n.n(p),_=n(120),g=n(101),f=n(99),h=n(100),E=n(59),y=n(12),v=n(47),B=n(33),I=n(362),O=n(637),x=n(102),A=n(157),N=n(219),T=n(19),j=n.n(T),k=n(23);n(636);t.default=function(){Object(k.c)("banner");var e=Object(E.useHistory)(),t=Object(v.d)((function(e){return e.auth.token})),n=Object(p.useState)(!1),T=Object(m.a)(n,2),w=T[0],S=T[1],C=Object(p.useState)(!0),D=Object(m.a)(C,2),L=D[0],R=D[1],$=Object(p.useState)(""),P=Object(m.a)($,2),z=P[0],U=P[1],F=s.a.useForm(),q=Object(m.a)(F,1)[0],M={id:(new Date).getTime(),title:"",link:"",image:"",sort_order:"",sub_title:"",button_text:"",option_1:"",option_2:"",price:"",sale_price:"",action:""},G=Object(p.useState)([M]),W=Object(m.a)(G,2),J=W[0],H=W[1],K=function(e){var t=e.size/1024/1024<2;return t||B.b.error("Image must smaller than 2MB!"),t&&U(e),!1},Q=b.a.createElement("div",null,b.a.createElement(I.a,null),b.a.createElement("div",{style:{marginTop:8}}," Upload ")),V=function(e){if(e&&"target"in e&&"getAttribute"in e.target){var t=e.target.getAttribute("data-id");if(t)J.map((function(e){return e.id==t&&(e.image=z),e}))}},X=[{title:"Title",dataIndex:"title",key:"title",width:200,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Title",onChange:function(e){return t.title=e.target.value}})}},{title:"Sub Title",dataIndex:"sub_title",key:"sub_title",width:200,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Sub Title",onChange:function(e){return t.sub_title=e.target.value}})}},{title:"Link",dataIndex:"link",key:"link",width:200,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Link",onChange:function(e){return t.link=e.target.value}})}},{title:"Button Text",dataIndex:"button_text",key:"button_text",width:200,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Button Text",onChange:function(e){return t.button_text=e.target.value}})}},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(e,t){return b.a.createElement(d.a,{type:"number",placeholder:"Price",onChange:function(e){return t.price=e.target.value}})}},{title:"Sale Price",dataIndex:"sale_price",key:"sale_price",width:100,render:function(e,t){return b.a.createElement(d.a,{type:"number",placeholder:"Sale Price",onChange:function(e){return t.sale_price=e.target.value}})}},{title:"Image",dataIndex:"image",key:"image",width:120,render:function(e,t){return b.a.createElement(u.a,{name:"avatar",listType:"picture-card","data-id":t.id,className:"avatar-uploader",showUploadList:!1,beforeUpload:K,onChange:V(event),fileList:[]},t.image?b.a.createElement(N.LazyLoadImage,{src:URL.createObjectURL(t.image),onError:A.errorImageSrc,alt:"image",effect:"blur",style:{width:"100%"},visibleByDefault:"/public/loading.webp"===z.src}):Q)}},{title:"Optional One",dataIndex:"option_1",key:"option_1",width:150,ellipsis:!0,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Optional One",onChange:function(e){return t.option_1=e.target.value}})}},{title:"Optional Two",dataIndex:"option_2",key:"option_2",width:150,ellipsis:!0,render:function(e,t){return b.a.createElement(d.a,{type:"text",placeholder:"Optional Two",onChange:function(e){return t.option_2=e.target.value}})}},{title:"Sort Order",dataIndex:"sort_order",key:"sort_order",width:80,render:function(e,t){return b.a.createElement(d.a,{type:"number",placeholder:"Sort Order",onChange:function(e){return t.sort_order=parseInt(e.target.value)}})}},{title:"Action",dataIndex:"action",key:"action",width:50,render:function(e,t){return b.a.createElement(h.a,{size:"small",title:"Remove",type:"danger",onClick:function(){return Y(t.id)}},b.a.createElement(j.a,{icon:"minus"}))}}],Y=function(e){H((function(t){return t.filter((function(t){return t.id!==e}))}))};return b.a.createElement(b.a.Fragment,null,b.a.createElement(_.a,{title:"Add Banner"}),b.a.createElement(g.b,null,b.a.createElement(a.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(f.a,{headless:!0},b.a.createElement(s.a,{style:{width:"100%"},form:q,name:"addBanner",onFinish:function(n){var a=!0;if(J.forEach((function(e){if(a&&(""==e.image||""==e.title))return B.b.info("Please Provide All Banner Image First!"),void(a=!1)})),a){S(!0);var r=Object(c.a)(Object(c.a)({},n),{},{banner_status:L});x.b.mutate({mutation:O.a.BANNER_ADD,variables:{data:r},context:{headers:{TENANTID:"100001",Authorization:t,"Apollo-Require-Preflight":"true"}},refetchQueries:[{query:O.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:t}}}]}).then((function(n){var a,r,i=null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.addBanner;if(!(null===i||void 0===i?void 0:i.status))return B.b.error("Something Went wrong !");var l=null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.id;0===J.length&&(setTimeout((function(){e.push("/admin/banner/list")}),1e3),B.b.success("Banner Added Successfully!"),S(!1)),J.forEach((function(n,a){x.a.mutate({mutation:O.a.BANNER_ITEM_ADD,variables:{data:{banner_id:l,title:n.title,sub_title:n.sub_title,sort_order:n.sort_order,link:n.link,button_text:n.button_text,option_1:n.option_1,option_2:n.option_2,price:n.price,sale_price:n.sale_price,image:n.image}},context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(t){J.length===a+1&&(setTimeout((function(){e.push("/admin/banner/list")}),1e3),B.b.success("Banner Added Successfully!"),S(!1))})).catch((function(e){B.b.error("Something Went wrong !!")}))}))})).catch((function(e){B.b.error("Something Went wrong !!!")}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},b.a.createElement(s.a.Item,{rules:[{required:!0,max:50,message:"Please Enter Banner Name"}],name:"banner_name",label:"Banner Name"},b.a.createElement(d.a,{placeholder:"Enter Banner Name"})),b.a.createElement(s.a.Item,{label:"Status"},b.a.createElement(l.a,{checked:L,onChange:function(e){return R(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),b.a.createElement(i.a,{className:"table-responsive",columns:X,pagination:!1,rowKey:"id",size:"small",dataSource:J}),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},b.a.createElement(h.a,{onClick:function(){var e={id:(new Date).getTime(),title:"",sub_title:"",link:"",image:"",sort_order:"",button_text:"",option_1:"",option_2:"",price:"",sale_price:""};H((function(t){return[].concat(Object(o.a)(t),[e])}))},size:"small",title:"Add Banner",htmlType:"button",type:"primary"},b.a.createElement(j.a,{icon:"plus"}))),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},b.a.createElement(s.a.Item,null,b.a.createElement(h.a,{loading:w,size:"default",htmlType:"submit",type:"primary",raised:!0},w?"Processing":"Save"),b.a.createElement(y.b,{to:"/admin/banner/list"},b.a.createElement(h.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
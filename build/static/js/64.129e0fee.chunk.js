(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[64],{1021:function(e,a,t){"use strict";t.r(a);t(196);var r=t(95),n=(t(197),t(72)),l=(t(307),t(77)),c=(t(313),t(221)),i=(t(304),t(214)),o=(t(279),t(115)),s=(t(280),t(86)),u=(t(162),t(96)),m=(t(278),t(50)),d=t(23),g=(t(372),t(216)),E=(t(198),t(63)),y=(t(145),t(44)),p=t(0),f=t.n(p),_=t(21),b=t.n(_),v=t(213),h=t(161),T=t(160),O=t(56),j=t(12),I=t(212),C=t(69),A=t(53),D=t(305),N=t.n(D),S=t(45),w=t(68),M=t.n(w),x=t(22),P=y.a.TextArea,k=E.a.Option,q=g.a.Dragger;a.default=function(){Object(x.f)("category");var e=m.a.useForm(),a=Object(d.a)(e,1)[0],t=Object(p.useState)(!0),g=Object(d.a)(t,2),_=g[0],D=g[1],w=Object(p.useState)(!1),G=Object(d.a)(w,2),L=G[0],R=G[1],F=Object(p.useState)(!1),V=Object(d.a)(F,2),z=V[0],K=V[1],U=Object(O.useLocation)().search,Y=N.a.parse(U),B=Object(O.useHistory)(),J=Object(p.useState)([]),Q=Object(d.a)(J,2),H=Q[0],W=Q[1],X=Object(p.useState)({data:[],loading:!0}),Z=Object(d.a)(X,2),$=Z[0],ee=Z[1],ae=Object(p.useState)({}),te=Object(d.a)(ae,2),re=te[0],ne=te[1],le=Object(p.useState)(""),ce=Object(d.a)(le,2),ie=ce[0],oe=ce[1],se=Object(p.useState)(null),ue=Object(d.a)(se,2),me=ue[0],de=ue[1],ge=Object(p.useState)(""),Ee=Object(d.a)(ge,2),ye=Ee[0],pe=Ee[1];Object(p.useEffect)((function(){C.j.query({query:C.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getAllCategories;t.status&&W(t.categories)})).catch((function(e){}))}),[]),Object(p.useEffect)((function(){if(H.length){var e=[];H.forEach((function(a){var t=a.cat_name,r=a.cat_sort_order;e.push({cat_name:t,id:a.id,cat_sort_order:r}),a.subcategories&&a.subcategories.forEach((function(a){var r=a.cat_name;e.push({cat_name:"".concat(t," > ").concat(r),id:a.id})}))})),ee({data:e,loading:!1})}}),[H]),Object(p.useEffect)((function(){Y.id&&C.j.query({query:C.l.GET_SINGLE_CATEGORY_FOR_UPDATE,variables:{query:{cat_id:parseInt(Y.id)}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleCategory;t.status&&(ne(t.category),R((function(e){var a;return(null===t||void 0===t||null===(a=t.category)||void 0===a?void 0:a.is_featured)||e})),D((function(e){var a;return(null===t||void 0===t||null===(a=t.category)||void 0===a?void 0:a.cat_status)||e})),oe((function(e){var a;return(null===t||void 0===t||null===(a=t.category)||void 0===a?void 0:a.cat_parent_id)||e})))})).catch((function(e){S.b.error("Something went worng.!")}))}),[]);return f.a.createElement(f.a.Fragment,null,f.a.createElement(v.a,{title:Y.id?"Manage category | Edit - ".concat(re.cat_name?"(".concat(re.cat_name,")"):"","\t"):"Add Category"}),f.a.createElement(h.b,null,f.a.createElement(r.a,{gutter:25},f.a.createElement(n.a,{sm:24,xs:24},f.a.createElement(T.a,{headless:!0},Y.id&&!re.id?f.a.createElement("div",{className:"spin"},f.a.createElement(u.a,null)):f.a.createElement(m.a,{style:{width:"100%"},form:a,name:"addRole",onFinish:function(e){K(!0);var a=e.categoryName,t=e.categoryDescription,r=e.categoryMetaTagDescription,n=e.categoryMetaTagKeywords,l=e.categoryMetaTagTitle,c=e.categorySortOrder;if(Y.id){var i={cat_id:parseInt(Y.id),cat_name:a,cat_description:t,cat_meta_tag_title:l,cat_meta_tag_description:r,cat_meta_tag_keywords:n,is_featured:L,cat_status:_};ie&&(i.cat_parent_id=ie),me&&(i.categoryImage=me.file),c&&(i.cat_sort_order=parseInt(c)),C.a.mutate({mutation:C.k.UPDATE_CATEGORY,variables:{data:i},refetchQueries:[{query:C.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}},["getAllBrands"]],fetchPolicy:"network-only",context:{headers:{TENANTID:"100001",Authorization:M.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateCategory;if(!(null===t||void 0===t?void 0:t.status))return S.b.error(null===t||void 0===t?void 0:t.message);setTimeout((function(){B.push("/admin/categories/list")}),1e3),S.b.success(null===t||void 0===t?void 0:t.message)})).catch((function(e){})).finally((function(){K(!1)}))}else{var o={categoryName:a,categoryDescription:t,categoryMetaTagDescription:r,categoryMetaTagKeywords:n,categoryMetaTagTitle:l,isFeatured:L,categoryStatus:_};ie&&(o.categoryParentId=ie),c&&(o.categorySortOrder=parseInt(c));var s={data:o};me&&(s.file=me),console.log(s),C.a.mutate({mutation:C.k.CREATE_CATEGORY,variables:s,refetchQueries:[{query:C.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}},["getAllCategories"]],fetchPolicy:"network-only",context:{headers:{TENANTID:"100001",Authorization:M.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.createCategory;if(!(null===t||void 0===t?void 0:t.status))return S.b.error(null===t||void 0===t?void 0:t.message);setTimeout((function(){B.push("/admin/categories/list")}),1e3),S.b.success(null===t||void 0===t?void 0:t.message)})).catch((function(e){})).finally((function(){K(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},f.a.createElement(s.a,null,f.a.createElement(s.a.TabPane,{tab:"General",key:"general"},f.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please enter Category Name"}],name:"categoryName",label:"Category Name",initialValue:re.cat_name||""},f.a.createElement(y.a,{placeholder:"Enter Category Name"})),f.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please enter Category Description"}],name:"categoryDescription",label:"Description",initialValue:re.cat_description||""},f.a.createElement(P,{rows:4,placeholder:"Enter Category Description"})),f.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please enter Meta Title"}],name:"categoryMetaTagTitle",label:"Meta Tag Title",initialValue:re.cat_meta_tag_title||""},f.a.createElement(y.a,{placeholder:"Enter Meta Tag Title"})),f.a.createElement(m.a.Item,{name:"categoryMetaTagDescription",label:"Meta Tag Description",rules:[{required:!0,max:30,message:"Please enter Meta Description"}],initialValue:re.cat_meta_tag_description||""},f.a.createElement(P,{rows:3,placeholder:"Enter Meta Tag Description"})),f.a.createElement(m.a.Item,{className:"wrap-label",rules:[{required:!0,max:30,message:"Please enter Meta Keywords"}],name:"categoryMetaTagKeywords",label:"Enter Meta Tag Keywords",initialValue:re.cat_meta_tag_keywords||""},f.a.createElement(P,{rows:3,placeholder:"Enter Meta Tag Keywords"}))),f.a.createElement(s.a.TabPane,{tab:"Data",key:"Data"},f.a.createElement(m.a.Item,{name:"categoryParentId",initialValue:"",label:"Parent"},$.loading?f.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},f.a.createElement(u.a,null)):f.a.createElement(f.a.Fragment,null,f.a.createElement(E.a,{allowClear:!0,placeholder:"Please select",onChange:function(e){return oe(e)},defaultValue:re.cat_parent_id},$.data.map((function(e){return f.a.createElement(k,{key:e.id,value:e.id},e.cat_name)}))))),f.a.createElement(m.a.Item,{name:"categorySortOrder",label:"Sort Order",initialValue:re.cat_sort_order||""},f.a.createElement(y.a,{placeholder:"Enter Sort Order"})),f.a.createElement(m.a.Item,{name:"isFeatured",label:"Is Featured"},f.a.createElement(o.a,{checked:L,onChange:function(e){return R(e.target.checked)}})),f.a.createElement(m.a.Item,{name:"categoryStatus",label:"Status"},f.a.createElement(i.a,{checked:_,onChange:function(e){return D(e)}})),f.a.createElement(m.a.Item,{name:"img",label:"Image"},ye?f.a.createElement(l.a,{text:"x"},f.a.createElement(c.a,{shape:"square",size:80,src:ye,onClick:function(){de(null),pe("")}})):f.a.createElement(q,{multiple:!1,beforeUpload:function(e){return"image/jpeg"===e.type?e.size/1024/1024<2?(pe(URL.createObjectURL(e)),de(e),!1):S.b.error("Image must smaller than 2MB!"):S.b.error("You can only upload JPG file!")},onRemove:function(e){pe(""),de(null)},fileList:me?[me]:[],style:{marginTop:"3em"}},f.a.createElement("p",{className:"ant-upload-drag-icon"},f.a.createElement(b.a,{icon:"upload",size:50})),f.a.createElement(A.a,{as:"h4",className:"ant-upload-text"},"Drag and drop an image"),f.a.createElement("p",{className:"ant-upload-hint"},"or ",f.a.createElement("span",null,"Browse")," to choose a file"))))),";",f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},f.a.createElement(m.a.Item,null,f.a.createElement(I.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),f.a.createElement(j.b,{to:"/admin/categories/list"},f.a.createElement(I.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
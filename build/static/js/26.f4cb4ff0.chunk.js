(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[26],{618:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n,r,d,l,i,o,u,c,s=t(11),m=t(20),b={GET_ALL_BRAND:Object(m.d)(n||(n=Object(s.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(m.d)(r||(r=Object(s.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    tenant_id\n    status\n    data {\n      brand_uuid\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      tenant_id\n      categories {\n        cat_id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          cat_id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            cat_id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(m.d)(d||(d=Object(s.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      categories {\n        id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(m.d)(l||(l=Object(s.a)(["\n  query getSingleBrand($query: GetSingleBrandInput){\n    getSingleBrand(query: $query) {\n      message\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(m.d)(i||(i=Object(s.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(m.d)(o||(o=Object(s.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(m.d)(u||(u=Object(s.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        tenant_id\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(m.d)(c||(c=Object(s.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          tenant_id\n          status\n        }\n     }"])))}},882:function(e,a,t){"use strict";t.r(a);t(131);var n=t(67),r=(t(132),t(44)),d=(t(609),t(608)),l=(t(257),t(147)),i=(t(704),t(706)),o=(t(283),t(134)),u=(t(199),t(122)),c=t(12),s=(t(281),t(60)),m=t(33),b=(t(143),t(68)),g=t(0),_=t.n(g),v=t(146),p=t(145),E=t(144),f=t(178),O=t(54),h=t(10),j=t(46),A=t(50),B=t(353),y=t(618),I=t(284),N=t(200),S=t.n(N),T=t(260),D=t(285),C=t(34);a.default=function(){var e,a,t,N,L;Object(C.b)("manufacture");var R=Object(O.useLocation)().search,q=S.a.parse(R),w=b.a.TextArea,G=Object(O.useHistory)(),P=Object(j.d)((function(e){return e.auth.token})),$=Object(g.useState)(!1),U=Object(m.a)($,2),x=U[0],z=U[1],F=Object(g.useState)(!1),M=Object(m.a)(F,2),k=M[0],W=M[1],V=Object(g.useState)(!0),J=Object(m.a)(V,2),H=J[0],Y=J[1],Q=Object(g.useState)(""),K=Object(m.a)(Q,2),X=K[0],Z=K[1],ee=Object(g.useState)(""),ae=Object(m.a)(ee,2),te=ae[0],ne=ae[1],re=Object(g.useState)(0),de=Object(m.a)(re,2),le=de[0],ie=de[1],oe=Object(g.useState)([]),ue=Object(m.a)(oe,2),ce=ue[0],se=ue[1],me=Object(g.useState)([]),be=Object(m.a)(me,2),ge=be[0],_e=be[1],ve=Object(g.useState)({data:{},loading:!0,error:""}),pe=Object(m.a)(ve,2),Ee=pe[0],fe=pe[1],Oe=s.a.useForm(),he=Object(m.a)(Oe,1)[0],je=_.a.createElement("div",null,_.a.createElement(B.a,null),_.a.createElement("div",{style:{marginTop:8}}," Upload "));return Object(g.useEffect)((function(){W(!0),I.b.query({query:y.a.GET_CATEGORIES,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var a,t,n=null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.getParentCategories)||void 0===t?void 0:t.categories;_e(n)})).catch((function(e){_e([]),console.log(e)})),I.b.query({query:y.a.GET_SINGLE_BRAND,variables:{query:{brand_id:parseInt(null===q||void 0===q?void 0:q.id)}},context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var a,t,n,r,d,l,i,o=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleBrand;if(o.status){fe({data:null===o||void 0===o?void 0:o.data,loading:!1,error:""});var u=[];null===o||void 0===o||null===(t=o.data)||void 0===t||t.categories.map((function(e){u.push(e.id)})),se(u),W(!1),Y(null===o||void 0===o||null===(n=o.data)||void 0===n?void 0:n.brand_status),ne(Object(T.renderImage)(null===q||void 0===q?void 0:q.id,null===o||void 0===o||null===(r=o.data)||void 0===r?void 0:r.image,"brand","128x128")),he.setFieldsValue({brand_name:null===o||void 0===o||null===(d=o.data)||void 0===d?void 0:d.brand_name,brand_description:null===o||void 0===o||null===(l=o.data)||void 0===l?void 0:l.brand_description}),ie(null===o||void 0===o||null===(i=o.data)||void 0===i?void 0:i.brand_sort_order)}})).catch((function(e){console.log(e),fe({data:{},loading:!1,error:"Something went worng"})}))}),[]),_.a.createElement(_.a.Fragment,null,_.a.createElement(v.a,{title:"Manage Manufacture | Edit Manufacture ".concat((null===Ee||void 0===Ee||null===(e=Ee.data)||void 0===e?void 0:e.brand_name)?"(".concat(null===Ee||void 0===Ee||null===(a=Ee.data)||void 0===a?void 0:a.brand_name,")"):"")}),_.a.createElement(p.b,null,_.a.createElement(n.a,{gutter:25},_.a.createElement(r.a,{sm:24,xs:24},_.a.createElement(E.a,{headless:!0},k?_.a.createElement("div",{style:{textAlign:"center"}},_.a.createElement(u.a,{tip:"processing..."})):_.a.createElement(s.a,{style:{width:"100%"},form:he,name:"editBrand",onFinish:function(e){z(!0);var a=[];ce.forEach((function(e){a.push({cat_id:e})}));var t=Object(c.a)(Object(c.a)({},e),{},{brand_status:H,brand_sort_order:le,categories:a,brand_id:parseInt(null===q||void 0===q?void 0:q.id)});I.a.mutate({mutation:X?y.a.BRAND_UPDATE:y.a.BRAND_UPDATE_WI,variables:X?{data:t,file:X}:{data:t},refetchQueries:[{query:y.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:P}}},"getAllBrands"],context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateBrand;if(!(null===t||void 0===t?void 0:t.status))return A.b.error("Something Went wrong !!");G.push("/admin/brand/list"),A.b.success(null===t||void 0===t?void 0:t.message),window.location.reload(!1)})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){return z(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},_.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Manufacture Name"}],name:"brand_name",label:"Name"},_.a.createElement(b.a,{placeholder:"Enter Manufacture Name",defaultValue:null===Ee||void 0===Ee||null===(t=Ee.data)||void 0===t?void 0:t.brand_name})),_.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please Enter Manufacture Description"}],name:"brand_description",label:"Description"},_.a.createElement(w,{rows:4,placeholder:"Enter Manufacture Description",defaultValue:null===Ee||void 0===Ee||null===(N=Ee.data)||void 0===N?void 0:N.brand_description})),_.a.createElement(s.a.Item,{label:"Categories"},_.a.createElement(o.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Categories",defaultValue:ce,onChange:function(e){return se(e)},optionLabelProp:"label"},ge.map((function(e){return _.a.createElement(o.a.Option,{key:e.id,value:e.id,label:e.cat_name},_.a.createElement("div",{className:"demo-option-label-item"},e.cat_name))})))),_.a.createElement(s.a.Item,{label:"Sort Order"},_.a.createElement(i.a,{defaultValue:null===Ee||void 0===Ee||null===(L=Ee.data)||void 0===L?void 0:L.brand_sort_order,onChange:ie,style:{width:"100%"}})),_.a.createElement(s.a.Item,{label:"Status"},_.a.createElement(l.a,{checked:H,onChange:function(e){return Y(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),_.a.createElement(s.a.Item,{label:"Image"},_.a.createElement(d.a,{name:"avatar",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,beforeUpload:function(e){var a="image/jpeg"===e.type;a||A.b.error("You can only upload JPG file!");var t=e.size/1024/1024<1;return t||A.b.error("Image must smaller than 1MB!"),a&&t&&(ne(URL.createObjectURL(e)),Z(e)),!1},fileList:[]},te?_.a.createElement(D.LazyLoadImage,{src:te,onError:T.errorImageSrc,alt:"image",style:{width:"100%"}}):je)),_.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},_.a.createElement(s.a.Item,null,_.a.createElement(f.a,{loading:x,size:"default",htmlType:"submit",type:"primary",raised:!0},x?"Processing":"Save"),_.a.createElement(h.b,{to:"/admin/brand/list"},_.a.createElement(f.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
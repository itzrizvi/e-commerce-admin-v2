(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[33],{1001:function(e,a,t){"use strict";t.r(a);t(143);var n=t(68),r=(t(144),t(52)),d=(t(369),t(220)),l=(t(304),t(217)),i=(t(742),t(757)),o=(t(145),t(30)),u=(t(132),t(74)),s=t(7),c=(t(201),t(27)),m=t(14),b=(t(115),t(39)),g=t(0),v=t.n(g),_=t(120),p=t(101),E=t(99),f=t(100),O=t(59),h=t(12),j=t(47),A=t(33),B=t(366),y=t(635),I=t(102),T=t(168),N=t.n(T),D=t(157),S=t(219),C=t(23);a.default=function(){var e,a,t,T,L;Object(C.c)("manufacture");var R=Object(O.useLocation)().search,q=N.a.parse(R),G=b.a.TextArea,$=Object(O.useHistory)(),U=Object(j.d)((function(e){return e.auth.token})),w=Object(g.useState)(!1),P=Object(m.a)(w,2),x=P[0],z=P[1],F=Object(g.useState)(!1),M=Object(m.a)(F,2),k=M[0],W=M[1],V=Object(g.useState)(!0),J=Object(m.a)(V,2),H=J[0],Y=J[1],Q=Object(g.useState)(""),K=Object(m.a)(Q,2),X=K[0],Z=K[1],ee=Object(g.useState)(""),ae=Object(m.a)(ee,2),te=ae[0],ne=ae[1],re=Object(g.useState)(0),de=Object(m.a)(re,2),le=de[0],ie=de[1],oe=Object(g.useState)([]),ue=Object(m.a)(oe,2),se=ue[0],ce=ue[1],me=Object(g.useState)([]),be=Object(m.a)(me,2),ge=be[0],ve=be[1],_e=Object(g.useState)({data:{},loading:!0,error:""}),pe=Object(m.a)(_e,2),Ee=pe[0],fe=pe[1],Oe=c.a.useForm(),he=Object(m.a)(Oe,1)[0],je=v.a.createElement("div",null,v.a.createElement(B.a,null),v.a.createElement("div",{style:{marginTop:8}}," Upload "));return Object(g.useEffect)((function(){W(!0),I.b.query({query:y.a.GET_CATEGORIES,context:{headers:{TENANTID:"100001",Authorization:U}}}).then((function(e){var a,t,n=null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.getParentCategories)||void 0===t?void 0:t.categories;ve(n)})).catch((function(e){ve([]),console.log(e)})),I.b.query({query:y.a.GET_SINGLE_BRAND,variables:{query:{brand_id:parseInt(null===q||void 0===q?void 0:q.id)}},context:{headers:{TENANTID:"100001",Authorization:U}}}).then((function(e){var a,t,n,r,d,l,i,o=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleBrand;if(o.status){fe({data:null===o||void 0===o?void 0:o.data,loading:!1,error:""});var u=[];null===o||void 0===o||null===(t=o.data)||void 0===t||t.categories.map((function(e){u.push(e.id)})),ce(u),W(!1),Y(null===o||void 0===o||null===(n=o.data)||void 0===n?void 0:n.brand_status),ne(Object(D.renderImage)(null===q||void 0===q?void 0:q.id,null===o||void 0===o||null===(r=o.data)||void 0===r?void 0:r.image,"brand","",!0)),he.setFieldsValue({brand_name:null===o||void 0===o||null===(d=o.data)||void 0===d?void 0:d.brand_name,brand_description:null===o||void 0===o||null===(l=o.data)||void 0===l?void 0:l.brand_description}),ie(null===o||void 0===o||null===(i=o.data)||void 0===i?void 0:i.brand_sort_order)}})).catch((function(e){console.log(e),fe({data:{},loading:!1,error:"Something went worng"})}))}),[]),v.a.createElement(v.a.Fragment,null,v.a.createElement(_.a,{title:"Manage Manufacture | Edit Manufacture ".concat((null===Ee||void 0===Ee||null===(e=Ee.data)||void 0===e?void 0:e.brand_name)?"(".concat(null===Ee||void 0===Ee||null===(a=Ee.data)||void 0===a?void 0:a.brand_name,")"):"")}),v.a.createElement(p.b,null,v.a.createElement(n.a,{gutter:25},v.a.createElement(r.a,{sm:24,xs:24},v.a.createElement(E.a,{headless:!0},k?v.a.createElement("div",{style:{textAlign:"center"}},v.a.createElement(u.a,{tip:"processing..."})):v.a.createElement(c.a,{style:{width:"100%"},form:he,name:"editBrand",onFinish:function(e){z(!0);var a=[];se.forEach((function(e){a.push({cat_id:e})}));var t=Object(s.a)(Object(s.a)({},e),{},{brand_status:H,brand_sort_order:le,categories:a,brand_id:parseInt(null===q||void 0===q?void 0:q.id)});I.a.mutate({mutation:X?y.a.BRAND_UPDATE:y.a.BRAND_UPDATE_WI,variables:X?{data:t,file:X}:{data:t},refetchQueries:[{query:y.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:U}}},["getAllBrands"]],context:{headers:{TENANTID:"100001",Authorization:U}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateBrand;if(!(null===t||void 0===t?void 0:t.status))return A.b.error("Something Went wrong !!");setTimeout((function(){$.push("/admin/brand/list")}),1e3),A.b.success(null===t||void 0===t?void 0:t.message)})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){return z(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},v.a.createElement(c.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Manufacture Name"}],name:"brand_name",label:"Name"},v.a.createElement(b.a,{placeholder:"Enter Manufacture Name",defaultValue:null===Ee||void 0===Ee||null===(t=Ee.data)||void 0===t?void 0:t.brand_name})),v.a.createElement(c.a.Item,{rules:[{required:!0,message:"Please Enter Manufacture Description"}],name:"brand_description",label:"Description"},v.a.createElement(G,{rows:4,placeholder:"Enter Manufacture Description",defaultValue:null===Ee||void 0===Ee||null===(T=Ee.data)||void 0===T?void 0:T.brand_description})),v.a.createElement(c.a.Item,{label:"Categories"},v.a.createElement(o.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Categories",defaultValue:se,onChange:function(e){return ce(e)},optionLabelProp:"label"},ge.map((function(e){return v.a.createElement(o.a.Option,{key:e.id,value:e.id,label:e.cat_name},v.a.createElement("div",{className:"demo-option-label-item"},e.cat_name))})))),v.a.createElement(c.a.Item,{label:"Sort Order"},v.a.createElement(i.a,{defaultValue:null===Ee||void 0===Ee||null===(L=Ee.data)||void 0===L?void 0:L.brand_sort_order,onChange:ie,style:{width:"100%"}})),v.a.createElement(c.a.Item,{label:"Status"},v.a.createElement(l.a,{checked:H,onChange:function(e){return Y(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),v.a.createElement(c.a.Item,{label:"Image"},v.a.createElement(d.a,{name:"avatar",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,beforeUpload:function(e){var a="image/jpeg"===e.type;a||A.b.error("You can only upload JPG file!");var t=e.size/1024/1024<1;return t||A.b.error("Image must smaller than 1MB!"),a&&t&&(ne(URL.createObjectURL(e)),Z(e)),!1},fileList:[]},te?v.a.createElement(S.LazyLoadImage,{src:te,onError:D.errorImageSrc,alt:"image",style:{width:"100%"}}):je)),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},v.a.createElement(c.a.Item,null,v.a.createElement(f.a,{loading:x,size:"default",htmlType:"submit",type:"primary",raised:!0},x?"Processing":"Save"),v.a.createElement(h.b,{to:"/admin/brand/list"},v.a.createElement(f.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},635:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n,r,d,l,i,o,u,s,c=t(8),m=t(17),b={GET_ALL_BRAND:Object(m.d)(n||(n=Object(c.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(m.d)(r||(r=Object(c.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      categories {\n        id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(m.d)(d||(d=Object(c.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      categories {\n        id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(m.d)(l||(l=Object(c.a)(["\n  query getSingleBrand($query: GetSingleBrandInput){\n    getSingleBrand(query: $query) {\n      message\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(m.d)(i||(i=Object(c.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(m.d)(o||(o=Object(c.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(m.d)(u||(u=Object(c.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(m.d)(s||(s=Object(c.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          status\n        }\n     }"])))}}}]);
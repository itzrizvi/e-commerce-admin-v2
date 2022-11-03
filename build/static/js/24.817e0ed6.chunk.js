(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[24],{618:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n,r,l,c,s,i,d,u,o=t(10),m=t(20),b={GET_ALL_BRAND:Object(m.d)(n||(n=Object(o.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(m.d)(r||(r=Object(o.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      categories {\n        id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(m.d)(l||(l=Object(o.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      categories {\n        id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(m.d)(c||(c=Object(o.a)(["\n  query getSingleBrand($query: GetSingleBrandInput){\n    getSingleBrand(query: $query) {\n      message\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(m.d)(s||(s=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(m.d)(i||(i=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(m.d)(d||(d=Object(o.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(m.d)(u||(u=Object(o.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          status\n        }\n     }"])))}},881:function(e,a,t){"use strict";t.r(a);t(134);var n=t(68),r=(t(135),t(46)),l=(t(609),t(608)),c=(t(258),t(148)),s=(t(704),t(706)),i=(t(283),t(136)),d=(t(199),t(124)),u=t(12),o=(t(282),t(63)),m=t(31),b=(t(123),t(37)),g=t(0),p=t.n(g),E=t(147),f=t(146),_=t(145),O=t(179),h=t(56),j=t(11),A=t(48),v=t(53),B=t(353),y=t(618),D=t(284),I=t(260),S=t(285),N=t(35);a.default=function(){Object(N.b)("manufacture");var e=b.a.TextArea,a=Object(h.useHistory)(),t=Object(A.d)((function(e){return e.auth.token})),T=Object(g.useState)(!1),C=Object(m.a)(T,2),L=C[0],R=C[1],$=Object(g.useState)(!1),q=Object(m.a)($,2),P=q[0],w=q[1],G=Object(g.useState)(!0),U=Object(m.a)(G,2),x=U[0],k=U[1],z=Object(g.useState)(""),F=Object(m.a)(z,2),M=F[0],W=F[1],J=Object(g.useState)(""),H=Object(m.a)(J,2),Y=H[0],Q=H[1],V=Object(g.useState)(0),K=Object(m.a)(V,2),X=K[0],Z=K[1],ee=Object(g.useState)([]),ae=Object(m.a)(ee,2),te=ae[0],ne=ae[1],re=Object(g.useState)([]),le=Object(m.a)(re,2),ce=le[0],se=le[1],ie=o.a.useForm(),de=Object(m.a)(ie,1)[0];Object(g.useEffect)((function(){R(!0),D.b.query({query:y.a.GET_CATEGORIES,context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var a,t,n=null===e||void 0===e||null===(a=e.data)||void 0===a||null===(t=a.getParentCategories)||void 0===t?void 0:t.categories;se(n),R(!1)})).catch((function(e){se([]),console.log(e)}))}),[]);var ue=p.a.createElement("div",null,p.a.createElement(B.a,null),p.a.createElement("div",{style:{marginTop:8}}," Upload "));return p.a.createElement(p.a.Fragment,null,p.a.createElement(E.a,{title:"Add Manufacture"}),p.a.createElement(f.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(r.a,{sm:24,xs:24},p.a.createElement(_.a,{headless:!0},L?p.a.createElement("div",{style:{textAlign:"center"}},p.a.createElement(d.a,{tip:"processing..."})):p.a.createElement(o.a,{style:{width:"100%"},form:de,name:"addBrand",onFinish:function(e){w(!0);var n=[];if(te.forEach((function(e){n.push({cat_id:e})})),0==n.length)return w(!1),v.b.error("Please Select Category");var r=Object(u.a)(Object(u.a)({},e),{},{brandStatus:x,brandSortOrder:X,categories:n});D.a.mutate({mutation:M?y.a.BRAND_ADD:y.a.BRAND_ADD_WI,variables:M?{data:r,file:M}:{data:r},refetchQueries:[{query:y.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:t}}},"getAllBrands"],context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createBrand;if(!(null===n||void 0===n?void 0:n.status))return v.b.error("Something Went wrong !!");a.push("/admin/brand/list"),v.b.success(null===n||void 0===n?void 0:n.message),window.location.reload()})).catch((function(e){v.b.error("Something Went wrong !!")})).finally((function(){return w(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},p.a.createElement(o.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Manufacture Name"}],name:"brandName",label:"Name"},p.a.createElement(b.a,{placeholder:"Enter Manufacture Name"})),p.a.createElement(o.a.Item,{rules:[{required:!0,message:"Please Enter Manufacture Description"}],name:"brandDescription",label:"Description"},p.a.createElement(e,{rows:4,placeholder:"Enter Manufacture Description"})),p.a.createElement(o.a.Item,{label:"Categories",required:!0},p.a.createElement(i.a,{mode:"multiple",style:{width:"100%"},placeholder:"Select Categories",initialvalues:"",onChange:function(e){return ne(e)},optionLabelProp:"label"},ce.map((function(e){return p.a.createElement(i.a.Option,{key:e.id,value:e.id,label:e.cat_name},p.a.createElement("div",{className:"demo-option-label-item"},e.cat_name))})))),p.a.createElement(o.a.Item,{label:"Sort Order"},p.a.createElement(s.a,{defaultValue:0,onChange:Z,style:{width:"100%"}})),p.a.createElement(o.a.Item,{label:"Status"},p.a.createElement(c.a,{checked:x,onChange:function(e){return k(e)},checkedChildren:"ON",unCheckedChildren:"OFF"})),p.a.createElement(o.a.Item,{label:"Image"},p.a.createElement(l.a,{name:"avatar",listType:"picture-card",className:"avatar-uploader",showUploadList:!1,beforeUpload:function(e){var a="image/jpeg"===e.type;a||v.b.error("You can only upload JPG file!");var t=e.size/1024/1024<1;return t||v.b.error("Image must smaller than 1MB!"),a&&t&&(Q(URL.createObjectURL(e)),W(e)),!1},fileList:[]},Y?p.a.createElement(S.LazyLoadImage,{src:Y,onError:I.errorImageSrc,alt:"image",style:{width:"100%"}}):ue)),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(o.a.Item,null,p.a.createElement(O.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),p.a.createElement(j.b,{to:"/admin/brand/list"},p.a.createElement(O.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
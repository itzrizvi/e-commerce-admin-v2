(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[24],{1016:function(e,t,a){"use strict";a.r(t);a(129);var n=a(61),r=(a(130),a(45)),i=(a(196),a(62)),o=(a(360),a(292)),l=(a(131),a(71)),u=a(59),d=a(7),c=(a(195),a(27)),s=a(14),m=(a(163),a(35)),p=(a(117),a(38)),_=a(0),b=a.n(_),g=a(118),v=a(99),f=a(98),h=a(97),E=a(756),y=a.n(E),O=a(757),j=a.n(O),P=(a(140),a(72)),I=(a(361),a(213)),T=(a(91),a(42)),S=a(90),k=a(962),A=a(20),w=a.n(A),D=a(33),L=a(69),x=a.n(L),N=m.a.Option,q=function(e){var t=e.index,a=e.setAttributesTableData,n=e.attribute_type,r=e.attribute_value,i=Object(_.useState)(""),o=Object(s.a)(i,2),l=o[0],u=o[1],c=Object(_.useState)([]),g=Object(s.a)(c,2),v=g[0],f=g[1],h=function(e){a((function(a){var n=a[t],r=Object(S.a)(a);return r[t]=Object(d.a)(Object(d.a)({},n),{},{attribute_value:e.target.value}),r}))};return b.a.createElement(b.a.Fragment,null,b.a.createElement(m.a,{style:{width:"10em",marginRight:"1em"},placeholder:"Select type",defaultValue:n||null,onChange:function(e){u(e),a((function(a){var n=a[t],r=Object(S.a)(a);return r[t]=Object(d.a)(Object(d.a)({},n),{},{attribute_type:e}),r}))}},b.a.createElement(N,{value:"text"},"Text"),b.a.createElement(N,{value:"link"},"Link"),b.a.createElement(N,{value:"file"},"File"),b.a.createElement(N,{value:"none"},"None")),"text"===l&&b.a.createElement(p.a,{placeholder:"Enter text",style:{width:"calc(100% - 12em)"},size:"middle",onBlur:h,defaultValue:r}),"link"===l&&b.a.createElement(p.a,{placeholder:"Enter Link",style:{width:"calc(100% - 12em)"},size:"middle",onBlur:h,defaultValue:r}),"file"===l&&b.a.createElement(I.a,{beforeUpload:function(e){return f([e]),!1},onRemove:function(){return f([])},fileList:v},b.a.createElement(T.a,{icon:b.a.createElement(k.a,null)},"Select File")))},B=function(e){var t=e.attributesTableData,a=e.setAttributesTableData,n=Object(_.useState)({data:[],isLoading:!0}),r=Object(s.a)(n,2),i=r[0],o=r[1],l=Object(_.useState)({}),u=Object(s.a)(l,2),c=u[0],p=u[1];Object(_.useEffect)((function(){D.j.query({query:D.c.GET_ALL_ATTR_GROUPS_FOR_ADD_PROD,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&o((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){o((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){o((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]);var g=[{title:"Attribute Group",dataIndex:"attr_group_id",key:"attr_group_id",width:200,render:function(e,t,n){return b.a.createElement(m.a,{style:{width:"100%"},placeholder:i.isLoading?"Loading...":"Select Group...",defaultValue:e||null,options:i.data.map((function(e){return{label:e.attr_group_name,value:e.id,attributes:e.attributes}})),onSelect:function(e,t){return function(e,t,n){console.log(t),p(t),a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{attr_group_id:e}),r}))}(e,t,n)}})}},{title:"Attribute",dataIndex:"attribute_id",key:"attribute_id",width:200,render:function(e,t,n){var r;return b.a.createElement(m.a,{style:{width:"100%"},disabled:!c.value,defaultValue:e||null,placeholder:i.isLoading?"Loading...":"Select Group...",options:null===c||void 0===c||null===(r=c.attributes)||void 0===r?void 0:r.map((function(e){return{label:e.attribute_name,value:e.id}})),onSelect:function(e,t){return function(e,t,n){console.log(e),a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{attribute_id:e}),r}))}(e,0,n)}})}},{title:"Values",dataIndex:"value",key:"value",render:function(e,t,n){return b.a.createElement(q,{index:n,setAttributesTableData:a,attribute_type:t.attribute_type,attribute_value:t.attribute_value})}},{title:"Action",dataIndex:"action",key:"action",width:90,align:"right",render:function(e,t){return b.a.createElement(T.a,{size:"",title:"Remove",type:"danger",onClick:function(){return e=t.id,void a((function(t){return t.filter((function(t){return t.id!==e}))}));var e}},b.a.createElement(w.a,{icon:"minus",size:15}))}}];return b.a.createElement(b.a.Fragment,null,b.a.createElement(P.a,{columns:g,dataSource:t,pagination:!1,rowKey:"id"}),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px",marginRight:"1em"}},b.a.createElement(T.a,{title:"Add Banner",htmlType:"button",type:"primary",onClick:function(){var e={id:(new Date).getTime(),attr_group_id:"",attribute_id:"",attribute_type:"",attribute_value:""};a((function(t){return[].concat(Object(S.a)(t),[e])})),console.log(t)}},b.a.createElement(w.a,{icon:"plus",size:15}))))},C=(a(621),a(624)),R=a(363),G=a.n(R),U=function(e){var t=e.discount,a=e.setDiscount,n=Object(_.useState)({data:[],isLoading:!0}),r=Object(s.a)(n,2),i=r[0],o=r[1];Object(_.useEffect)((function(){D.j.query({query:D.i.GET_ALL_CUSTOMER_GROUPS,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCustomerGroups;(null===a||void 0===a?void 0:a.status)&&o((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){o((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){o((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]);var l=[{title:"Customer Group",dataIndex:"customer_group_id",key:"customer_group_id",render:function(e,t,n){var r;return b.a.createElement(m.a,{style:{width:"150px"},placeholder:i.isLoading?"Loading..":"customer group",defaultValue:e||null,onSelect:function(e){a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{customer_group_id:e}),console.log(r),r}))}},null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.map((function(e){return b.a.createElement(m.a.Option,{key:e.id,value:e.id},e.customer_group_name)})))}},{title:"Quantity",dataIndex:"discount_quantity",key:"discount_quantity",width:100,render:function(e,t,n){return b.a.createElement(p.a,{defaultValue:e,type:"number",placeholder:"Quantity",style:{width:"100px"},onBlur:function(e){console.log(e.target.value),a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{discount_quantity:e.target.value}),console.log(r),r}))}})}},{title:"Priority",dataIndex:"discount_priority",key:"discount_priority",width:100,render:function(e,t,n){return b.a.createElement(p.a,{type:"number",placeholder:"Priority",style:{width:"100px"},defaultValue:e,onBlur:function(e){console.log(e.target.value),a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{discount_priority:e.target.value}),console.log(r),r}))}})}},{title:"Price",dataIndex:"discount_price",key:"discount_price",width:100,render:function(e,t,n){return b.a.createElement(p.a,{type:"number",placeholder:"Price",style:{width:"100px"},defaultValue:e,onBlur:function(e){console.log(e.target.value),a((function(t){var a=t[n],r=Object(S.a)(t);return r[n]=Object(d.a)(Object(d.a)({},a),{},{discount_price:e.target.value}),console.log(r),r}))}})}},{title:"Date Start",dataIndex:"discount_startdate",key:"discount_startdate",render:function(e,t,n){return b.a.createElement(C.a,{defaultValue:e&&G()(parseInt(e)),onChange:function(e){var t=new Date(e._d).toGMTString();console.log(t),a((function(e){var a=e[n],r=Object(S.a)(e);return r[n]=Object(d.a)(Object(d.a)({},a),{},{discount_startdate:t}),console.log(r),r}))}})}},{title:"Date End",dataIndex:"discount_enddate",key:"discount_enddate",render:function(e,t,n){return b.a.createElement(C.a,{defaultValue:e&&G()(parseInt(e)),onChange:function(e){var t=new Date(e._d).toGMTString();console.log(t),a((function(e){var a=e[n],r=Object(S.a)(e);return r[n]=Object(d.a)(Object(d.a)({},a),{},{discount_enddate:t}),console.log(r),r}))}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return b.a.createElement(T.a,{size:"",title:"Remove",type:"danger",onClick:function(){return u(t.id)}},b.a.createElement(w.a,{icon:"minus"}))}}],u=function(e){a((function(t){return t.filter((function(t){return t.id!==e}))}))};return b.a.createElement(b.a.Fragment,null,b.a.createElement(P.a,{className:"table-responsive",columns:l,pagination:!1,rowKey:"id",size:"small",dataSource:t}),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},b.a.createElement(T.a,{title:"Add Banner",htmlType:"button",type:"primary",onClick:function(){var e={id:(new Date).getTime(),customer_group_id:"",discount_quantity:"",discount_priority:"",discount_price:"",discount_startdate:"",discount_enddate:""};a((function(t){return[].concat(Object(S.a)(t),[e])}))},style:{marginRight:".5em"}},b.a.createElement(w.a,{icon:"plus"}))))},F=a(758),M=a.n(F),z=a(31),V=a(1023),W=function(e){var t=e.featuresImage,a=e.setFeaturesImage,n=e.gallaryImages,r=e.setGallaryImages,i=e.singleProdId,o=e.setIsLoading;return b.a.createElement(b.a.Fragment,null,b.a.createElement(c.a.Item,{label:"Features Image"},b.a.createElement(I.a,{multiple:!0,listType:"picture-card",beforeUpload:function(e){var t="image/jpeg"===e.type;if(!t)return z.b.error("You can only upload JPG file!");var n=e.size/1024/1024<2;return n?(t&&n&&(a({file:e,thumbnail:URL.createObjectURL(e)}),i&&(o(!0),D.a.mutate({mutation:D.k.UPDATE_THUMBNAIL,variables:{data:{prod_id:i,prod_thumbnail:e}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateThumbnail;if(!a.status)return z.b.error(a.message);z.b.success(a.message)})).catch((function(e){return console.log("update thumbnail err:\n",e),z.b.error("Something Went wrong !!")})).finally((function(){})))),!1):z.b.error("Image must smaller than 2MB!")},onPreview:function(){return console.log()},onRemove:function(){return a({})},fileList:t.thumbnail?[{file:t.file,url:t.thumbnail}]:[]},!t.thumbnail&&"+ Upload")),b.a.createElement(c.a.Item,{label:"Gallery Image"},b.a.createElement(M.a,{multiple:!0,listType:"picture-card",beforeUpload:function(e){return console.log("file type:\n",e.type),"image/jpeg"===e.type?e.size/1024/1024<2?(r((function(t){return[].concat(Object(S.a)(t),[{file:e,url:URL.createObjectURL(e),uid:e.uid}])})),i&&(o(!0),D.a.mutate({mutation:D.k.UPLOAD_GALLERY_IMAGE,variables:{data:{prod_id:i,gallery_img:e}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.uploadGalleryImage;if(!a.status)return z.b.error(a.message);z.b.success(a.message)})).catch((function(e){return console.log("update gal img err:\n",e),z.b.error("Something Went wrong !!")})).finally((function(){}))),!1):z.b.error("Image must smaller than 2MB!"):z.b.error("You can only upload JPG file!")},fileList:n,onRemove:function(e){r((function(t){return t.filter((function(t){return t.uid!==e.uid}))})),i&&(o(!0),D.a.mutate({mutation:D.k.DELETE_GALLERY_IMAGE,variables:{data:{prod_id:i,prod_gallery_id:e.prod_gallery_uuid}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.deleteGalleryImage;if(!a.status)return z.b.error(a.message);z.b.success(a.message)})).catch((function(e){return console.log("del gal img err:\n",e),z.b.error("Something Went wrong !!")})).finally((function(){})))}},b.a.createElement("p",{className:"ant-upload-drag-icon"},b.a.createElement(V.a,null)),b.a.createElement("p",{className:"ant-upload-text"},"Click or drag file to this area to upload"))))},$=a(100),K=a(620),Q=function(e){var t,a=e.products,n=(e.setProducts,e.selectedPartsOfProducts),r=e.setSelectedPartsOfProducts,i=(e.partOfProductQuantities,e.setPartOfProductQuantities),o=[{title:"Name",dataIndex:"label",key:"label"},{title:"SKU",dataIndex:"sku",key:"sku"},{title:"Quantity",dataIndex:"q",key:"q",width:120,render:function(e,t){return b.a.createElement(p.a,{defaultValue:t.quantity||"1",type:"number",placeholder:"Quantity",onBlur:function(e){i((function(a){var n=Object(d.a)({},a);return n[t.uid]=e.target.value,console.log(n),n}))}})}},{title:"Action",dataIndex:"action",key:"action",width:100,render:function(e,t,a){return b.a.createElement(T.a,{size:"",title:"Remove",type:"danger",onClick:function(){var e=Object(S.a)(n);e.splice(a,1),r(e)}},b.a.createElement(w.a,{icon:"minus"}))}}];return b.a.createElement("div",null,b.a.createElement(c.a.Item,{label:"Products"},b.a.createElement(m.a,{style:{marginBottom:"2em"},mode:"multiple",value:n,placeholder:a.isLoading?"Loading..":"Select Product..",optionFilterProp:"label",options:null===a||void 0===a||null===(t=a.data)||void 0===t?void 0:t.map((function(e){return{label:e.prod_name,value:e.id,uid:e.id,key:e.id,name:e.prod_name,sku:e.prod_sku}})),onChange:function(e,t){r(t)}}),b.a.createElement(P.a,{dataSource:n,columns:o,pagination:!1,rowKey:"uid"})))},H=a(23),Y=a(57),J=a(10),Z=a(164),X=a.n(Z),ee=["dimension_class","prod_regular_price","prod_sale_price","prod_weight","prod_weight_class"],te=["id"],ae=p.a.TextArea,ne=m.a.Option;t.default=function(){var e,t,a,E,O,P,I,T,S,k,A,w,L,N,q,C,R,G,F,M,V,Z,re,ie,oe,le,ue,de;Object(H.c)("product");var ce=c.a.useForm(),se=Object(s.a)(ce,1)[0],me=Object(_.useState)(!1),pe=Object(s.a)(me,2),_e=pe[0],be=pe[1],ge=Object(Y.useHistory)(),ve=Object(Y.useLocation)().search,fe=X.a.parse(ve),he=Object(_.useState)({data:{},isLoading:!0}),Ee=Object(s.a)(he,2),ye=Ee[0],Oe=Ee[1];Object(_.useEffect)((function(){fe.id&&$.b.query({query:D.l.GET_SINGLE_PRODUCT,variables:{query:{prod_id:parseInt(fe.id)}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a,n,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleProduct;if(!r.status)return z.b.error("Try reload..!");Oe({data:null===r||void 0===r?void 0:r.data,isLoading:!1}),Te(y.a.createValueFromString(null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.prod_long_desc,"html")),we(null===r||void 0===r||null===(n=r.data)||void 0===n?void 0:n.prod_long_desc),ct((function(e){var t,a;return null===r||void 0===r||null===(t=r.data)||void 0===t||null===(a=t.discount_type)||void 0===a?void 0:a.map((function(e){return{id:(new Date).getTime(),customer_group_id:e.id,discount_quantity:e.discount_quantity,discount_priority:e.discount_priority,discount_price:e.discount_price,discount_startdate:e.discount_startdate,discount_enddate:e.discount_enddate}}))})),it((function(e){var t,a;return null===r||void 0===r||null===(t=r.data)||void 0===t||null===(a=t.prod_attributes)||void 0===a?void 0:a.map((function(e){var t,a,n;return{id:(new Date).getTime(),attr_group_id:null===(t=e.attribute_data)||void 0===t||null===(a=t.attribute_group)||void 0===a?void 0:a.id,attribute_id:null===e||void 0===e||null===(n=e.attribute_data)||void 0===n?void 0:n.id,attribute_type:e.attribute_type,attribute_value:e.attribute_value}}))})),ft((function(e){var t,a;return null===r||void 0===r||null===(t=r.data)||void 0===t||null===(a=t.part_of_products)||void 0===a?void 0:a.map((function(e){return{label:e.part_product.prod_name,value:e.part_product.id,uid:e.part_product.id,key:e.part_product.id,name:e.part_product.prod_name,sku:e.part_product.prod_sku,quantity:e.prod_quantity}}))})),Tt((function(e){var t,a;return{file:"",thumbnail:"https://api.primeserverparts.com/images/product/image/thumbnail/".concat(null===r||void 0===r||null===(t=r.data)||void 0===t?void 0:t.id,"/128x128_").concat(null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.id,".jpg")}})),wt(null===r||void 0===r?void 0:r.data.gallery.map((function(e){var t;return{file:"",url:"https://api.primeserverparts.com/images/product/image/gallery/".concat(null===r||void 0===r||null===(t=r.data)||void 0===t?void 0:t.id,"/128x128_").concat(e.prod_image),prod_gallery_uuid:e.id}})))})).catch((function(e){console.log("error on loading porduct,\n",e)}))}),[]);var je=Object(_.useState)(y.a.createEmptyValue()),Pe=Object(s.a)(je,2),Ie=Pe[0],Te=Pe[1],Se=Object(_.useState)(""),ke=Object(s.a)(Se,2),Ae=ke[0],we=ke[1],De=Object(_.useState)(!0),Le=Object(s.a)(De,2),xe=Le[0],Ne=Le[1],qe=Object(_.useState)(!0),Be=Object(s.a)(qe,2),Ce=Be[0],Re=Be[1],Ge=Object(_.useState)({data:[],loading:!0,error:""}),Ue=Object(s.a)(Ge,2),Fe=Ue[0],Me=Ue[1],ze=Object(_.useState)([]),Ve=Object(s.a)(ze,2),We=Ve[0],$e=Ve[1],Ke=Object(_.useState)([]),Qe=Object(s.a)(Ke,2),He=Qe[0],Ye=Qe[1];Object(_.useEffect)((function(){fe.id&&ye.isLoading||$.b.query({query:K.a.GET_ALL_BRAND_WITH_CATEGORY,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllBrands;if(Me((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),fe.id){var n,r,i=null===ye||void 0===ye||null===(n=ye.data.brand)||void 0===n?void 0:n.id,o=null===a||void 0===a?void 0:a.data.find((function(e){return e.id===i})),l=[];null===o||void 0===o||null===(r=o.categories)||void 0===r||r.forEach((function(e){var t=e.cat_name;l.push({cat_name:t,id:e.id,cat_status:e.cat_status}),e.subcategories&&e.subcategories.forEach((function(e){var a=e.cat_name;l.push({cat_name:"".concat(t," > ").concat(a),id:e.id,cat_status:e.cat_status}),e.subsubcategories&&e.subsubcategories.forEach((function(e){var n=e.cat_name;l.push({cat_name:"".concat(t," > ").concat(a," > ").concat(n),id:e.id,cat_status:e.cat_status})}))}))})),$e(l)}})).catch((function(e){Me((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){Me((function(e){return Object(d.a)(Object(d.a)({},e),{},{loading:!1})}))}))}),[ye]);var Je=Object(_.useState)({}),Ze=Object(s.a)(Je,2),Xe=Ze[0],et=Ze[1],tt=[{id:(new Date).getTime(),attr_group_id:"",attribute_id:"",attribute_type:"",attribute_value:""}],at=Object(_.useState)(tt),nt=Object(s.a)(at,2),rt=nt[0],it=nt[1],ot=[{id:(new Date).getTime(),customer_group_id:"",discount_quantity:"",discount_priority:"",discount_price:"",discount_startdate:"",discount_enddate:""}],lt=Object(_.useState)(ot),ut=Object(s.a)(lt,2),dt=ut[0],ct=ut[1],st=Object(_.useState)({data:[],isLoading:!0}),mt=Object(s.a)(st,2),pt=mt[0],_t=mt[1],bt=Object(_.useState)([]),gt=Object(s.a)(bt,2),vt=gt[0],ft=gt[1],ht=Object(_.useState)({}),Et=Object(s.a)(ht,2),yt=Et[0],Ot=Et[1];Object(_.useEffect)((function(){$.b.query({query:D.l.GET_PRODUCT_LIST_FOR_ADD_MINIMAL,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getProductList;(null===a||void 0===a?void 0:a.status)&&_t((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){_t((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){_t((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]);var jt=Object(_.useState)({}),Pt=Object(s.a)(jt,2),It=Pt[0],Tt=Pt[1],St=Object(_.useState)([]),kt=Object(s.a)(St,2),At=kt[0],wt=kt[1];return b.a.createElement(b.a.Fragment,null,b.a.createElement(g.a,{title:fe.id?"Manage Product | Edit Product ".concat(ye.isLoading?"":"(".concat(ye.data.prod_name,")")):"Add Product"}),b.a.createElement(v.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(f.a,{headless:!0},fe.id&&ye.isLoading?b.a.createElement("div",{div:!0,className:"spin"},b.a.createElement(l.a,null)):b.a.createElement(c.a,{style:{width:"100%"},form:se,name:"addRole",onFinish:function(e){var t=e.dimension_class,a=e.prod_regular_price,n=e.prod_sale_price,r=e.prod_weight,i=e.prod_weight_class,o=Object(u.a)(e,ee),l=!0,c=!0,s=rt.map((function(e){e.id;var t=Object(u.a)(e,te);return"none"===t.attribute_type&&(t.attribute_value="none"),t.attr_group_id||t.attribute_type||t.attribute_value||(l=!1),t.attr_group_id&&t.attribute_type&&t.attribute_value||(c=!1),Object(d.a)({},t)}));if(!c&&l)return z.b.warning("Please fill all Attribute field correctly");var m=!0,p=!0,_=dt.map((function(e){e.id;var t=e.customer_group_id,a=e.discount_quantity,n=e.discount_priority,r=e.discount_price,i=e.discount_startdate,o=e.discount_enddate;return t||a||n||r||i||o||(m=!1),t&&a&&n&&r&&i&&o||(p=!1),{customer_group_id:t,discount_quantity:a,discount_priority:n,discount_price:r,discount_startdate:i,discount_enddate:o}}));if(!p&&m)return z.b.warning("Please fill all Discount field correctly");var b=He.map((function(e){return e.uid})),g=vt.map((function(e){return{prod_id:e.uid,prod_quantity:yt[e.uid]?parseInt(yt[e.uid]):1}})),v=Object(d.a)(Object(d.a)({},o),{},{prod_long_desc:Ae,related_product:b,prod_status:xe,partof_product:g,taxable:Ce});a&&(v.prod_regular_price=parseFloat(a)),n&&(v.prod_sale_price=parseFloat(n)),l&&(v.product_attributes=s),m&&(v.discount_type=_),r&&(v.prod_weight=r,v.prod_weight_class=i);var f=Xe.height,h=Xe.length,E=Xe.width;if(f||h||E){var y={dimension_class:t};f&&(y.height=f),h&&(y.length=h),E&&(y.width=E),v.dimensions=y}if(!v.prod_long_desc)return z.b.warning("Please enter a long description");if(!v.prod_short_desc)return z.b.warning("Please enter a long description");if(!v.prod_sku)return z.b.warning("Please enter Product SKU");if(!v.prod_partnum)return z.b.warning("Please enter Part No");if(!v.brand_id)return z.b.warning("Please select a Manufacture");if(!v.prod_category)return z.b.warning("Please select a Category");if(!v.prod_outofstock_status)return z.b.warning("Please select an Availability Status");if(!v.prod_regular_price)return z.b.warning("Please enter Regular Price");if(be(!0),fe.id)v.prod_id=parseInt(fe.id),D.a.mutate({mutation:D.k.UPDATE_PRODUCT,variables:{data:v},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateProduct;if(!a.status)return z.b.error(a.message);setTimeout((function(){ge.push("/admin/products/list")}),1e3),z.b.success(a.message)})).catch((function(e){return console.log("add Prod err:\n",e),z.b.error("Something Went wrong !!")})).finally((function(){be(!1)}));else{if(v.prod_thumbnail=It.file,v.prod_gallery=At.map((function(e){return e.file})),!prod_thumbnail)return z.b.warning("Please select a Feature image");D.a.mutate({mutation:D.k.ADD_PRODUCT,variables:{data:v},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.addProduct;if(!a.status)return z.b.error(a.message);setTimeout((function(){ge.push("/admin/products/list")}),1e3),z.b.success(a.message)})).catch((function(e){return console.log("add Prod err:\n",e),z.b.error("Something Went wrong !!")})).finally((function(){be(!1)}))}},onFinishFailed:function(e){console.log("form error info:\n",e),z.b.warning("Please fill all required data in all tab")},labelCol:{span:4},initialValues:fe.id?{prod_name:ye.data.prod_name,prod_short_desc:ye.data.prod_short_desc,prod_meta_title:ye.data.prod_meta_title,prod_meta_desc:ye.data.prod_meta_desc,prod_meta_keywords:ye.data.prod_meta_keywords,prod_tags:ye.data.prod_tags,prod_partnum:ye.data.prod_partnum,prod_sku:ye.data.prod_sku,brand_id:null===(e=ye.data)||void 0===e||null===(t=e.brand)||void 0===t?void 0:t.id,prod_category:null===(a=ye.data)||void 0===a||null===(E=a.category)||void 0===E?void 0:E.id,dimension_class:(null===(O=ye.data)||void 0===O||null===(P=O.dimensions)||void 0===P?void 0:P.dimension_class)||"",prod_weight:(null===(I=ye.data)||void 0===I?void 0:I.prod_weight)||"",prod_weight_class:(null===(T=ye.data)||void 0===T?void 0:T.prod_weight_class)||"",prod_outofstock_status:(null===(S=ye.data)||void 0===S?void 0:S.prod_outofstock_status)||"",prod_regular_price:(null===(k=ye.data)||void 0===k?void 0:k.prod_regular_price)||"",prod_sale_price:(null===(A=ye.data)||void 0===A?void 0:A.prod_sale_price)||""}:{dimension_class:"Inch",prod_weight_class:"Pound",prod_outofstock_status:"In Stock"}},b.a.createElement(i.a,null,b.a.createElement(i.a.TabPane,{tab:"General",key:"general"},b.a.createElement(c.a.Item,{name:"prod_name",rules:[{required:!0,message:"Please enter Product Name"}],label:"Name"},b.a.createElement(p.a,{placeholder:"Enter Product Name"})),b.a.createElement(c.a.Item,{name:"prod_short_desc",rules:[{required:!0,message:"Please enter n"}],label:"Short Description"},b.a.createElement(ae,{rows:3,placeholder:"Enter Short Description"})),b.a.createElement(c.a.Item,{label:"Long Description"},b.a.createElement(y.a,{value:Ie,onChange:function(e){we(e.toString("html")),Te(e)},placeholder:"Long Description",className:j.a.rte,editorClassName:j.a.rteEditor,toolbarClassName:j.a.rteToolbar})),b.a.createElement(c.a.Item,{name:"prod_meta_title",rules:[{required:!0,message:"Please enter Meta Title"}],label:"Meta Title"},b.a.createElement(p.a,{placeholder:"Enter Meta Title"})),b.a.createElement(c.a.Item,{name:"prod_meta_desc",rules:[{required:!0,message:"Please enter Meta Description"}],label:"Meta Description"},b.a.createElement(p.a,{placeholder:"Enter Meta Description"})),b.a.createElement(c.a.Item,{name:"prod_meta_keywords",rules:[{required:!0,message:"Please enter Meta Keywords"}],label:"Meta Keywords"},b.a.createElement(p.a,{placeholder:"Enter comma separated Meta Keywords"})),b.a.createElement(c.a.Item,{name:"prod_tags",rules:[{required:!0,message:"Please enter Tags"}],label:"Tags"},b.a.createElement(p.a,{placeholder:"Enter comma separated Tags"})),b.a.createElement(c.a.Item,{label:"Status"},b.a.createElement(o.a,{checked:xe,onChange:function(e){return Ne(e)}}))),b.a.createElement(i.a.TabPane,{tab:"Data",key:"Data"},b.a.createElement(c.a.Item,{name:"prod_partnum",rules:[{required:!0,message:"Please enter Part NO"}],label:"Part NO"},b.a.createElement(p.a,{placeholder:"Enter Part No"})),b.a.createElement(c.a.Item,{name:"prod_sku",rules:[{required:!0,message:"Please enter SKU"}],label:"SKU"},b.a.createElement(p.a,{placeholder:"Enter Product SKU"}))),b.a.createElement(i.a.TabPane,{tab:"Links",key:"Links"},b.a.createElement(c.a.Item,{name:"brand_id",rules:[{required:!0,message:"Please select a Brand"}],label:"Manufacturer"},b.a.createElement(m.a,{placeholder:Fe.loading?"Loading...":"select Manufacture",options:null===Fe||void 0===Fe||null===(w=Fe.data)||void 0===w?void 0:w.map((function(e){return{label:e.brand_name,value:e.id,categories:e.categories}})),onSelect:function(e,t){var a,n;if(null===t||void 0===t||null===(a=t.categories)||void 0===a?void 0:a.length){var r=[];null===t||void 0===t||null===(n=t.categories)||void 0===n||n.forEach((function(e){var t=e.cat_name;r.push({cat_name:t,id:e.id,cat_status:e.cat_status}),e.subcategories&&e.subcategories.forEach((function(e){var a=e.cat_name;r.push({cat_name:"".concat(t," > ").concat(a),id:e.id,cat_status:e.cat_status}),e.subsubcategories&&e.subsubcategories.forEach((function(e){var n=e.cat_name;r.push({cat_name:"".concat(t," > ").concat(a," > ").concat(n),id:e.id,cat_status:e.cat_status})}))}))})),$e(r)}}})),b.a.createElement(c.a.Item,{name:"prod_category",rules:[{required:!0,message:"Please enter Product Name"}],label:"Categories"},b.a.createElement(m.a,{placeholder:Fe.loading?"Loading...":We.length?"Select Category":"Select manifacture first",options:We.map((function(e){return{label:e.cat_name,value:e.id,key:e.id}}))})),b.a.createElement(c.a.Item,{label:"Related Product",rules:[{required:!0,message:"Please enter Product Name"}]},b.a.createElement(m.a,{placeholder:pt.isLoading?"Loading...":"select Related Products",mode:"multiple",optionFilterProp:"label",defaultValue:fe.id?null===ye||void 0===ye||null===(L=ye.data)||void 0===L||null===(N=L.related_products)||void 0===N?void 0:N.map((function(e){var t;return null===e||void 0===e||null===(t=e.related_prod)||void 0===t?void 0:t.id})):[],options:null===pt||void 0===pt||null===(q=pt.data)||void 0===q?void 0:q.map((function(e){return{label:e.prod_name,value:e.id,uid:e.id}})),onChange:function(e,t){Ye(t)}}))),b.a.createElement(i.a.TabPane,{tab:"Specifications",key:"Specifications"},b.a.createElement(c.a.Item,{label:b.a.createElement("p",null,"Dimensions ",b.a.createElement("br",null)," (L x W x H)")},b.a.createElement(p.a.Group,{compact:!0},b.a.createElement(p.a,{type:"number",style:{width:"33.3%"},placeholder:"Length",onBlur:function(e){return et((function(t){return Object(d.a)(Object(d.a)({},t),{},{length:parseFloat(e.target.value)})}))},defaultValue:fe.id&&(null===ye||void 0===ye||null===(C=ye.data)||void 0===C||null===(R=C.dimensions)||void 0===R?void 0:R.length)?null===ye||void 0===ye||null===(G=ye.data)||void 0===G||null===(F=G.dimensions)||void 0===F?void 0:F.length:""}),b.a.createElement(p.a,{type:"number",style:{width:"33.3%"},placeholder:"Width",onBlur:function(e){return et((function(t){return Object(d.a)(Object(d.a)({},t),{},{width:parseFloat(e.target.value)})}))},defaultValue:fe.id&&(null===ye||void 0===ye||null===(M=ye.data)||void 0===M||null===(V=M.dimensions)||void 0===V?void 0:V.length)?null===ye||void 0===ye||null===(Z=ye.data)||void 0===Z||null===(re=Z.dimensions)||void 0===re?void 0:re.width:""}),b.a.createElement(p.a,{type:"number",style:{width:"33.3%"},placeholder:"Height",onBlur:function(e){return et((function(t){return Object(d.a)(Object(d.a)({},t),{},{height:parseFloat(e.target.value)})}))},defaultValue:fe.id&&(null===ye||void 0===ye||null===(ie=ye.data)||void 0===ie||null===(oe=ie.dimensions)||void 0===oe?void 0:oe.length)?null===ye||void 0===ye||null===(le=ye.data)||void 0===le||null===(ue=le.dimensions)||void 0===ue?void 0:ue.height:""}))),b.a.createElement(c.a.Item,{name:"dimension_class",label:b.a.createElement("p",null,"Dimensions ",b.a.createElement("br",null),"Class"," ")},b.a.createElement(m.a,{style:{height:"3.5em"},placeholder:"Enter Dimension Class"},b.a.createElement(ne,{key:1,value:"Centimeter"},"Centimeter"),b.a.createElement(ne,{key:2,value:"Millimeter"},"Millimeter"),b.a.createElement(ne,{key:3,value:"Inch"},"Inch"))),b.a.createElement(c.a.Item,{name:"prod_weight",label:"Weight"},b.a.createElement(p.a,{type:"number",placeholder:"Enter Weight"})),b.a.createElement(c.a.Item,{name:"prod_weight_class",label:"Weight Class"},b.a.createElement(m.a,{placeholder:"Enter Weight Class"},b.a.createElement(ne,{key:1,value:"Kilogram"},"Kilogram"),b.a.createElement(ne,{key:1,value:"Gram"},"Gram"),b.a.createElement(ne,{key:2,value:"Pound"},"Pound"),b.a.createElement(ne,{key:3,value:"Ounce"},"Ounce")))),b.a.createElement(i.a.TabPane,{tab:"Stock",key:"Stock"},b.a.createElement(c.a.Item,{name:"prod_outofstock_status",rules:[{required:!0,message:"Please enter Availability Status"}],label:"Availability"},b.a.createElement(m.a,{placeholder:"Please select a Status"},b.a.createElement(m.a.Option,{key:1,value:"2-3 Days"},"2-3 Days"),b.a.createElement(m.a.Option,{key:2,value:"In Stock"},"In Stock"),b.a.createElement(m.a.Option,{key:3,value:"Out Of Stock"},"Out Of Stock"),b.a.createElement(m.a.Option,{key:4,value:"Pre-Orde"},"Pre-Order")))),b.a.createElement(i.a.TabPane,{tab:"Attribute",key:"Attribute"},b.a.createElement(B,{attributesTableData:rt,setAttributesTableData:it})),b.a.createElement(i.a.TabPane,{tab:"Price",key:"Price"},b.a.createElement(c.a.Item,{name:"prod_regular_price",rules:[{required:!0,message:"Please Enter Regular Price"}],label:"Regular Price"},b.a.createElement(p.a,{placeholder:"Enter Regular Price",prefix:"US$  ",type:"number"})),b.a.createElement(c.a.Item,{name:"prod_sale_price",label:"Sales Price"},b.a.createElement(p.a,{prefix:"US$  ",type:"number",placeholder:"Enter Sales Price"})),b.a.createElement(c.a.Item,{label:"Taxable"},b.a.createElement(o.a,{checked:Ce,onChange:function(e){return Re(e)}}))),b.a.createElement(i.a.TabPane,{tab:"Discount",key:"Discount"},b.a.createElement(U,{discount:dt,setDiscount:ct})),b.a.createElement(i.a.TabPane,{tab:"Parts Of Product",key:"PartsOf"},b.a.createElement(Q,{products:pt,setProducts:_t,selectedPartsOfProducts:vt,setSelectedPartsOfProducts:ft,partOfProductQuantities:yt,setPartOfProductQuantities:Ot})),b.a.createElement(i.a.TabPane,{tab:"Images",key:"Images"},b.a.createElement(W,{featuresImage:It,setFeaturesImage:Tt,gallaryImages:At,setGallaryImages:wt,singleProdUid:null===ye||void 0===ye||null===(de=ye.data)||void 0===de?void 0:de.id,setIsLoading:be}))),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(c.a.Item,null,b.a.createElement(h.a,{loading:_e,size:"default",htmlType:"submit",type:"primary",raised:!0},_e?"Processing":"Save"),b.a.createElement(J.b,{to:"/admin/products/list"},b.a.createElement(h.a,{type:"white",size:"large"},"Cancel"))))))))))}},620:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n,r,i,o,l,u,d,c,s=a(8),m=a(17),p={GET_ALL_BRAND:Object(m.d)(n||(n=Object(s.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(m.d)(r||(r=Object(s.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      categories {\n        id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(m.d)(i||(i=Object(s.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      categories {\n        id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(m.d)(o||(o=Object(s.a)(["\n  query getSingleBrand($query: GetSingleBrandInput){\n    getSingleBrand(query: $query) {\n      message\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(m.d)(l||(l=Object(s.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(m.d)(u||(u=Object(s.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(m.d)(d||(d=Object(s.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(m.d)(c||(c=Object(s.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          status\n        }\n     }"])))}},757:function(e,t,a){e.exports={rte:"products_rte__1CuiF",rteEditor:"products_rteEditor__16LFe",rteToolbar:"products_rteToolbar__Z4pek"}}}]);
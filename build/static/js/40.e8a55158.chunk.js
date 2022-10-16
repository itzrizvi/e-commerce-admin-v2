(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[40],{648:function(e,t,a){e.exports={tabs:"product_tabs__3UcAb",activeTab:"product_activeTab__tCB7Q",inputGrpup:"product_inputGrpup__1hkLN",rte:"product_rte__1hU_3",rteEditor:"product_rteEditor__3rQRc",rteToolbar:"product_rteToolbar__16gol",inactiveContent:"product_inactiveContent__3oU9x",activeContent:"product_activeContent__qT4Gb",checkbox:"product_checkbox__JnT8J",radioInput:"product_radioInput__-Wgzb"}},676:function(e,t,a){"use strict";a.r(t);a(155);var l=a(79),r=(a(156),a(37)),c=a(48),n=a(0),o=a.n(n),m=a(16),i=a.n(m),p=a(509),u=a(508),s=a(507),d=a(648),E=a.n(d),h=a(631),b=a.n(h),v=a(506);t.default=function(){var e=Object(n.useState)("General"),t=Object(c.a)(e,2),a=t[0],m=t[1],d=Object(n.useState)(b.a.createEmptyValue()),h=Object(c.a)(d,2),_=h[0],y=h[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement(p.a,{title:"Add Product",buttons:[o.a.createElement("div",{key:"1",className:"page-header-actions"},o.a.createElement(v.a,{size:"default",type:"primary"},o.a.createElement(i.a,{icon:"save"}),"Add Product"))]}),o.a.createElement(u.b,null,o.a.createElement(l.a,{gutter:25},o.a.createElement(r.a,{sm:24,xs:24},o.a.createElement(s.a,{headless:!0},o.a.createElement("ul",{className:E.a.tabs},["General","Data","Price","Stock","Images"].map((function(e){return o.a.createElement("li",{key:e,className:a==e?E.a.activeTab:"",onClick:function(){return m(e)}},e)}))),o.a.createElement("form",null,o.a.createElement("div",{className:"General"==a?E.a.activeContent:E.a.inactiveContent},o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Name"),o.a.createElement("input",{type:"text",placeholder:"Product Name"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Short Description"),o.a.createElement("input",{type:"text",placeholder:"Short Description"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Long Description"),o.a.createElement(b.a,{value:_,onChange:function(e){console.log(e.toString("html")),y(e)},placeholder:"Long Description",className:E.a.rte,editorClassName:E.a.rteEditor,toolbarClassName:E.a.rteToolbar})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},'"Meta Title'),o.a.createElement("input",{type:"text",placeholder:"Product Meta title"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Meta Description"),o.a.createElement("input",{type:"text",placeholder:"Product Meta Description"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Meta Keywords"),o.a.createElement("input",{type:"text",placeholder:"Product Meta Keywords"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Tags"),o.a.createElement("input",{type:"text",placeholder:"Product Tags"}))),o.a.createElement("div",{className:"Data"==a?E.a.activeContent:E.a.inactiveContent},o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Stock Quantity"),o.a.createElement("input",{type:"text",placeholder:"Product SKU"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Category"),o.a.createElement("input",{type:"text",placeholder:"Product Category"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Barcode"),o.a.createElement("input",{type:"text",placeholder:"Product Barcode"}))),o.a.createElement("div",{className:"Price"==a?E.a.activeContent:E.a.inactiveContent},o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Regular Price"),o.a.createElement("input",{type:"text",placeholder:"Product Regular Price"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Sale Price"),o.a.createElement("input",{type:"text",placeholder:"Product Sale Price"})),o.a.createElement("div",{className:E.a.checkbox},o.a.createElement("label",{htmlFor:""},"Tax Include"),o.a.createElement("input",{type:"checkbox",defaultChecked:!0}))),o.a.createElement("div",{className:"Stock"==a?E.a.activeContent:E.a.inactiveContent},o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Stock Quantity"),o.a.createElement("input",{type:"text",placeholder:"Product Stock Quantity"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Minimum Stock Quantity"),o.a.createElement("input",{type:"text",placeholder:"Product Minimum Stock Quantity"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Maximum Orders"),o.a.createElement("input",{type:"text",placeholder:"Product Maximum Orders"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Stock Status"),o.a.createElement("input",{type:"text",placeholder:"Product Stock Status"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Available From"),o.a.createElement("input",{type:"text",placeholder:"Product Available From"})),o.a.createElement("div",{className:E.a.inputGrpup},o.a.createElement("label",{htmlFor:""},"Product Status"),o.a.createElement("div",{className:E.a.radioInput},o.a.createElement("input",{type:"radio",name:"product_stock_status",value:"male"}),o.a.createElement("label",{for:""},"In-Stock"),o.a.createElement("span",{style:{width:"5px"}}),o.a.createElement("input",{type:"radio",name:"product_stock_status",value:"female",id:""}),o.a.createElement("label",{for:""},"Not-In-Stock"))))))))))}}}]);
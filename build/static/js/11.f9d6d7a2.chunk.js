(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[11],{472:function(e,t,n){"use strict";n(53),n(473)},473:function(e,t,n){},477:function(e,t,n){"use strict";var a=n(3),c=n(1),r=n(5),l=n.n(r),o=n(13),i=n(2),u=n(18),s=n(19),d=n(23),f=n(24),b=n(0),p=n.n(b),m=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var a;Object(u.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=a.props,n=t.disabled,c=t.onChange;n||("checked"in a.props||a.setState({checked:e.target.checked}),c&&c({target:Object(i.a)(Object(i.a)({},a.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},a.saveInput=function(e){a.input=e};var c="checked"in e?e.checked:e.defaultChecked;return a.state={checked:c},a}return Object(s.a)(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,r=t.className,i=t.style,u=t.name,s=t.id,d=t.type,f=t.disabled,b=t.readOnly,m=t.tabIndex,h=t.onClick,v=t.onFocus,O=t.onBlur,g=t.onKeyDown,y=t.onKeyPress,k=t.onKeyUp,j=t.autoFocus,C=t.value,E=t.required,x=Object(o.a)(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),w=Object.keys(x).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=x[t]),e}),{}),P=this.state.checked,N=l()(n,r,(e={},Object(a.a)(e,"".concat(n,"-checked"),P),Object(a.a)(e,"".concat(n,"-disabled"),f),e));return p.a.createElement("span",{className:N,style:i},p.a.createElement("input",Object(c.a)({name:u,id:s,type:d,required:E,readOnly:b,disabled:f,tabIndex:m,className:"".concat(n,"-input"),checked:!!P,onClick:h,onFocus:v,onBlur:O,onKeyUp:k,onKeyDown:g,onKeyPress:y,onChange:this.handleChange,autoFocus:j,ref:this.saveInput,value:C},w)),p.a.createElement("span",{className:"".concat(n,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?Object(i.a)(Object(i.a)({},t),{},{checked:e.checked}):null}}]),n}(b.Component);m.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}};var h=m,v=n(64),O=n(66),g=n(10),y=n(7),k=n(30),j=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},C=b.createContext(null),E=function(e,t){var n=e.defaultValue,r=e.children,o=e.options,i=void 0===o?[]:o,u=e.prefixCls,s=e.className,d=e.style,f=e.onChange,p=j(e,["defaultValue","children","options","prefixCls","className","style","onChange"]),m=b.useContext(v.b),h=m.getPrefixCls,O=m.direction,E=b.useState(p.value||n||[]),x=Object(y.a)(E,2),w=x[0],P=x[1],N=b.useState([]),S=Object(y.a)(N,2),K=S[0],F=S[1];b.useEffect((function(){"value"in p&&P(p.value||[])}),[p.value]);var D=function(){return i.map((function(e){return"string"===typeof e||"number"===typeof e?{label:e,value:e}:e}))},V=h("checkbox",u),L="".concat(V,"-group"),A=Object(k.a)(p,["value","disabled"]);i&&i.length>0&&(r=D().map((function(e){return b.createElement(I,{prefixCls:V,key:e.value.toString(),disabled:"disabled"in e?e.disabled:p.disabled,value:e.value,checked:-1!==w.indexOf(e.value),onChange:e.onChange,className:"".concat(L,"-item"),style:e.style},e.label)})));var B={toggleOption:function(e){var t=w.indexOf(e.value),n=Object(g.a)(w);-1===t?n.push(e.value):n.splice(t,1),"value"in p||P(n);var a=D();null===f||void 0===f||f(n.filter((function(e){return-1!==K.indexOf(e)})).sort((function(e,t){return a.findIndex((function(t){return t.value===e}))-a.findIndex((function(e){return e.value===t}))})))},value:w,disabled:p.disabled,name:p.name,registerValue:function(e){F((function(t){return[].concat(Object(g.a)(t),[e])}))},cancelValue:function(e){F((function(t){return t.filter((function(t){return t!==e}))}))}},M=l()(L,Object(a.a)({},"".concat(L,"-rtl"),"rtl"===O),s);return b.createElement("div",Object(c.a)({className:M,style:d},A,{ref:t}),b.createElement(C.Provider,{value:B},r))},x=b.forwardRef(E),w=b.memo(x),P=n(83),N=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},S=function(e,t){var n,r=e.prefixCls,o=e.className,i=e.children,u=e.indeterminate,s=void 0!==u&&u,d=e.style,f=e.onMouseEnter,p=e.onMouseLeave,m=e.skipGroup,g=void 0!==m&&m,y=e.disabled,k=N(e,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]),j=b.useContext(v.b),E=j.getPrefixCls,x=j.direction,w=b.useContext(C),S=Object(b.useContext)(O.b).isFormItemInput,I=Object(b.useContext)(P.b),K=y||(null===w||void 0===w?void 0:w.disabled)||I,F=b.useRef(k.value);b.useEffect((function(){null===w||void 0===w||w.registerValue(k.value)}),[]),b.useEffect((function(){if(!g)return k.value!==F.current&&(null===w||void 0===w||w.cancelValue(F.current),null===w||void 0===w||w.registerValue(k.value),F.current=k.value),function(){return null===w||void 0===w?void 0:w.cancelValue(k.value)}}),[k.value]);var D=E("checkbox",r),V=Object(c.a)({},k);w&&!g&&(V.onChange=function(){k.onChange&&k.onChange.apply(k,arguments),w.toggleOption&&w.toggleOption({label:i,value:k.value})},V.name=w.name,V.checked=-1!==w.value.indexOf(k.value));var L=l()((n={},Object(a.a)(n,"".concat(D,"-wrapper"),!0),Object(a.a)(n,"".concat(D,"-rtl"),"rtl"===x),Object(a.a)(n,"".concat(D,"-wrapper-checked"),V.checked),Object(a.a)(n,"".concat(D,"-wrapper-disabled"),K),Object(a.a)(n,"".concat(D,"-wrapper-in-form-item"),S),n),o),A=l()(Object(a.a)({},"".concat(D,"-indeterminate"),s)),B=s?"mixed":void 0;return b.createElement("label",{className:L,style:d,onMouseEnter:f,onMouseLeave:p},b.createElement(h,Object(c.a)({"aria-checked":B},V,{prefixCls:D,className:A,disabled:K,ref:t})),void 0!==i&&b.createElement("span",null,i))};var I=b.forwardRef(S),K=I;K.Group=w,K.__ANT_CHECKBOX=!0;t.a=K},549:function(e,t,n){"use strict";n.r(t);n(174);var a,c=n(85),r=(n(248),n(190)),l=n(9),o=(n(474),n(476)),i=n(45),u=n(0),s=n.n(u),d=n(33),f=n(8),b=n(39),p=n(179),m=n(220),h=(n(472),n(477)),v=n(17),O=n(16),g=Object(O.b)(h.a)(a||(a=Object(v.a)(["\n\n"]))),y=g.Group,k=function(e){var t=e.item,n=e.defaultSelect,a=e.checked,c=e.multiple,r=e.onChange,l=e.onChangeTriger,o=e.defaultChecked,d=e.disabled,f=e.children,b=t,p=Object(u.useState)({checkedList:n,indeterminate:!0,checkAll:!1}),m=Object(i.a)(p,2),h=m[0],v=m[1];Object(u.useEffect)((function(){l&&l(h.checkedList)}),[h]);return c?s.a.createElement("div",null,s.a.createElement("div",{style:{borderBottom:"1px solid #E9E9E9"}},s.a.createElement(g,{indeterminate:h.indeterminate,onChange:function(e){v({checkedList:e.target.checked?b:[],indeterminate:!1,checkAll:e.target.checked})},checked:h.checkAll},"Check all")),s.a.createElement("br",null),s.a.createElement(y,{options:b,value:h.checkedList,onChange:function(e){v({checkedList:e,indeterminate:!!e.length&&e.length<b.length,checkAll:e.length===b.length})}})):s.a.createElement(g,{checked:a,onChange:function(e){return r(e.target.checked,e.target.value)},defaultChecked:o,disabled:d},f)},j=n(26);t.default=function(){var e=Object(u.useState)("sumonskys@gmail.com"),t=Object(i.a)(e,2),n=t[0],a=t[1],h=Object(u.useState)("A1234567"),v=Object(i.a)(h,2),O=v[0],g=v[1],y=Object(d.useHistory)(),C=Object(b.c)(),E=Object(b.d)((function(e){return e.auth.loading})),x=Object(b.d)((function(e){return e.auth.error})),w=o.a.useForm(),P=Object(i.a)(w,1)[0],N=Object(u.useState)({checked:null}),S=Object(i.a)(N,2),I=S[0],K=S[1];return s.a.createElement(p.b,null,s.a.createElement("div",{className:"auth-contents"},s.a.createElement(o.a,{name:"login",form:P,onSubmitCapture:function(e){e.preventDefault(),C(Object(m.b)(n,O,y))},layout:"vertical"},s.a.createElement(j.a,{as:"h3"},"Sign in to ",s.a.createElement("span",{className:"color-secondary"},"Admin")),s.a.createElement(o.a.Item,{name:"username",rules:[{message:"Please input your username or Email!",required:!0}],initialValue:n,label:"Username or Email Address"},s.a.createElement(r.a,{onChange:function(e){console.log(e.target.value),a(e.target.value)}})),s.a.createElement(o.a.Item,{name:"password",initialValue:O,label:"Password"},s.a.createElement(r.a.Password,{placeholder:"Password",onChange:function(e){return g(e.target.value)}})),s.a.createElement("div",{className:"auth-form-action"},s.a.createElement(k,{onChange:function(e){K(Object(l.a)(Object(l.a)({},I),{},{checked:e}))}},"Keep me logged in"),s.a.createElement(f.c,{className:"forgot-pass-link",to:"#"},"Forgot password?")),s.a.createElement(o.a.Item,null,s.a.createElement(c.a,{className:"btn-signin",htmlType:"submit",type:"primary",size:"large"},E?"Loading...":"Sign In")),x&&s.a.createElement("p",{style:{color:"#ff4d4f"}},x))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[3],{673:function(e,t,n){"use strict";n(50),n(897),n(119),n(202)},679:function(e,t,n){"use strict";var r=n(2),a=n(11),o=n(0),c=n(1),l=n(5),i=n(233),u=n(3),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"},f=n(16),p=function(e,t){return o.createElement(f.a,Object(u.a)(Object(u.a)({},e),{},{ref:t,icon:s}))};p.displayName="CopyOutlined";var d=o.forwardRef(p),v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},b=function(e,t){return o.createElement(f.a,Object(u.a)(Object(u.a)({},e),{},{ref:t,icon:v}))};b.displayName="EditOutlined";var m=o.forwardRef(b),y=n(4),O=n.n(y),g=n(898),j=n.n(g),h=n(70),E=n(54),w=n(67),x=n(51),S=n(32),C=n(40),R=n(72),k=n(105),P=n(346),z=n(234),M=n(104),D={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"},N=function(e,t){return o.createElement(f.a,Object(u.a)(Object(u.a)({},e),{},{ref:t,icon:D}))};N.displayName="EnterOutlined";var I=o.forwardRef(N),H=n(14),T=n(355),L=n(25),A=function(e){var t=e.prefixCls,n=e["aria-label"],r=e.className,a=e.style,i=e.direction,u=e.maxLength,s=e.autoSize,f=void 0===s||s,p=e.value,d=e.onSave,v=e.onCancel,b=e.onEnd,m=e.component,y=e.enterIcon,g=void 0===y?o.createElement(I,null):y,j=o.useRef(null),h=o.useRef(!1),E=o.useRef(),w=o.useState(p),x=Object(l.a)(w,2),S=x[0],C=x[1];o.useEffect((function(){C(p)}),[p]),o.useEffect((function(){if(j.current&&j.current.resizableTextArea){var e=j.current.resizableTextArea.textArea;e.focus();var t=e.value.length;e.setSelectionRange(t,t)}}),[]);var R=function(){d(S.trim())},k=m?"".concat(t,"-").concat(m):"",P=O()(t,"".concat(t,"-edit-content"),Object(c.a)({},"".concat(t,"-rtl"),"rtl"===i),r,k);return o.createElement("div",{className:P,style:a},o.createElement(T.a,{ref:j,maxLength:u,value:S,onChange:function(e){var t=e.target;C(t.value.replace(/[\n\r]/g,""))},onKeyDown:function(e){var t=e.keyCode;h.current||(E.current=t)},onKeyUp:function(e){var t=e.keyCode,n=e.ctrlKey,r=e.altKey,a=e.metaKey,o=e.shiftKey;E.current!==t||h.current||n||r||a||o||(t===H.a.ENTER?(R(),null===b||void 0===b||b()):t===H.a.ESC&&v())},onCompositionStart:function(){h.current=!0},onCompositionEnd:function(){h.current=!1},onBlur:function(){R()},"aria-label":n,rows:1,autoSize:f}),null!==g?Object(L.a)(g,{className:"".concat(t,"-edit-content-confirm")}):null)};function U(e,t){return o.useMemo((function(){var n=!!e;return[n,Object(r.a)(Object(r.a)({},t),n&&"object"===Object(a.a)(e)?e:null)]}),[e])}var K=function(e,t){var n=o.useRef(!1);o.useEffect((function(){n.current?e():n.current=!0}),t)},V=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};var B=o.forwardRef((function(e,t){var n=e.prefixCls,a=e.component,l=void 0===a?"article":a,i=e.className,u=e.setContentRef,s=e.children,f=e.direction,p=V(e,["prefixCls","component","className","setContentRef","children","direction"]),d=o.useContext(R.b),v=d.getPrefixCls,b=d.direction,m=null!==f&&void 0!==f?f:b,y=t;u&&(y=Object(C.a)(t,u));var g=v("typography",n),j=O()(g,Object(c.a)({},"".concat(g,"-rtl"),"rtl"===m),i);return o.createElement(l,Object(r.a)({className:j,ref:y},p),s)}));function W(e){var t=Object(a.a)(e);return"string"===t||"number"===t}function F(e,t){for(var n=0,r=[],a=0;a<e.length;a+=1){if(n===t)return r;var o=e[a],c=n+(W(o)?String(o).length:1);if(c>t){var l=t-n;return r.push(String(o).slice(0,l)),r}r.push(o),n=c}return e}var J=function(e){var t=e.enabledMeasure,n=e.children,a=e.text,c=e.width,i=e.fontSize,u=e.rows,s=e.onEllipsis,f=o.useState([0,0,0]),p=Object(l.a)(f,2),d=Object(l.a)(p[0],3),v=d[0],b=d[1],m=d[2],y=p[1],O=o.useState(0),g=Object(l.a)(O,2),j=g[0],h=g[1],x=o.useState(0),S=Object(l.a)(x,2),C=S[0],R=S[1],k=o.useRef(null),P=o.useRef(null),z=o.useMemo((function(){return Object(E.a)(a)}),[a]),M=o.useMemo((function(){return function(e){var t=0;return e.forEach((function(e){W(e)?t+=String(e).length:t+=1})),t}(z)}),[z]),D=o.useMemo((function(){return t&&3===j?n(F(z,b),b<M):n(z,!1)}),[t,j,n,z,b,M]);Object(w.a)((function(){t&&c&&i&&M&&(h(1),y([0,Math.ceil(M/2),M]))}),[t,c,i,a,M,u]),Object(w.a)((function(){var e;1===j&&R((null===(e=k.current)||void 0===e?void 0:e.offsetHeight)||0)}),[j]),Object(w.a)((function(){var e,t;if(C)if(1===j)((null===(e=P.current)||void 0===e?void 0:e.offsetHeight)||0)<=u*C?(h(4),s(!1)):h(2);else if(2===j)if(v!==m){var n=(null===(t=P.current)||void 0===t?void 0:t.offsetHeight)||0,r=v,a=m;v===m-1?a=v:n<=u*C?r=b:a=b;var o=Math.ceil((r+a)/2);y([r,o,a])}else h(3),s(!0)}),[j,v,m,u,C]);var N={width:c,whiteSpace:"normal",margin:0,padding:0},I=function(e,t,n){return o.createElement("span",{"aria-hidden":!0,ref:t,style:Object(r.a)({position:"fixed",display:"block",left:0,top:0,zIndex:-9999,visibility:"hidden",pointerEvents:"none",fontSize:2*Math.floor(i/2)},n)},e)};return o.createElement(o.Fragment,null,D,t&&3!==j&&4!==j&&o.createElement(o.Fragment,null,I("lg",k,{wordBreak:"keep-all",whiteSpace:"nowrap"}),1===j?I(n(z,!1),P,N):function(e,t){var r=F(z,e);return I(n(r,!0),t,N)}(b,P)))};var X=function(e){var t=e.enabledEllipsis,n=e.isEllipsis,a=e.children,c=e.tooltipProps;return(null===c||void 0===c?void 0:c.title)&&t?o.createElement(M.a,Object(r.a)({open:!!n&&void 0},c),a):a},_=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function q(e,t,n){return!0===e||void 0===e?t:e||n&&t}function G(e){return!1===e?[!1,!1]:Array.isArray(e)?e:[e]}var Q=o.forwardRef((function(e,t){var n,u,s,f=e.prefixCls,p=e.className,v=e.style,b=e.type,y=e.disabled,g=e.children,D=e.ellipsis,N=e.editable,I=e.copyable,H=e.component,T=e.title,L=_(e,["prefixCls","className","style","type","disabled","children","ellipsis","editable","copyable","component","title"]),V=o.useContext(R.b),W=V.getPrefixCls,F=V.direction,Q=Object(k.b)("Text")[0],Y=o.useRef(null),Z=o.useRef(null),$=W("typography",f),ee=Object(S.a)(L,["mark","code","delete","underline","strong","keyboard","italic"]),te=U(N),ne=Object(l.a)(te,2),re=ne[0],ae=ne[1],oe=Object(x.a)(!1,{value:ae.editing}),ce=Object(l.a)(oe,2),le=ce[0],ie=ce[1],ue=ae.triggerType,se=void 0===ue?["icon"]:ue,fe=function(e){var t;e&&(null===(t=ae.onStart)||void 0===t||t.call(ae)),ie(e)};K((function(){var e;le||null===(e=Z.current)||void 0===e||e.focus()}),[le]);var pe=function(e){null===e||void 0===e||e.preventDefault(),fe(!0)},de=U(I),ve=Object(l.a)(de,2),be=ve[0],me=ve[1],ye=o.useState(!1),Oe=Object(l.a)(ye,2),ge=Oe[0],je=Oe[1],he=o.useRef(),Ee={};me.format&&(Ee.format=me.format);var we=function(){window.clearTimeout(he.current)},xe=function(e){var t;null===e||void 0===e||e.preventDefault(),null===e||void 0===e||e.stopPropagation(),j()(me.text||String(g)||"",Ee),je(!0),we(),he.current=window.setTimeout((function(){je(!1)}),3e3),null===(t=me.onCopy)||void 0===t||t.call(me,e)};o.useEffect((function(){return we}),[]);var Se=o.useState(!1),Ce=Object(l.a)(Se,2),Re=Ce[0],ke=Ce[1],Pe=o.useState(!1),ze=Object(l.a)(Pe,2),Me=ze[0],De=ze[1],Ne=o.useState(!1),Ie=Object(l.a)(Ne,2),He=Ie[0],Te=Ie[1],Le=o.useState(!1),Ae=Object(l.a)(Le,2),Ue=Ae[0],Ke=Ae[1],Ve=o.useState(!1),Be=Object(l.a)(Ve,2),We=Be[0],Fe=Be[1],Je=o.useState(!0),Xe=Object(l.a)(Je,2),_e=Xe[0],qe=Xe[1],Ge=U(D,{expandable:!1}),Qe=Object(l.a)(Ge,2),Ye=Qe[0],Ze=Qe[1],$e=Ye&&!He,et=Ze.rows,tt=void 0===et?1:et,nt=o.useMemo((function(){return!$e||void 0!==Ze.suffix||Ze.onEllipsis||Ze.expandable||re||be}),[$e,Ze,re,be]);Object(w.a)((function(){Ye&&!nt&&(ke(Object(z.a)("webkitLineClamp")),De(Object(z.a)("textOverflow")))}),[nt,Ye]);var rt=o.useMemo((function(){return!nt&&(1===tt?Me:Re)}),[nt,Me,Re]),at=$e&&(rt?We:Ue),ot=$e&&1===tt&&rt,ct=$e&&tt>1&&rt,lt=function(e){var t;Te(!0),null===(t=Ze.onExpand)||void 0===t||t.call(Ze,e)},it=o.useState(0),ut=Object(l.a)(it,2),st=ut[0],ft=ut[1],pt=o.useState(0),dt=Object(l.a)(pt,2),vt=dt[0],bt=dt[1],mt=function(e){var t;Ke(e),Ue!==e&&(null===(t=Ze.onEllipsis)||void 0===t||t.call(Ze,e))};o.useEffect((function(){var e=Y.current;if(Ye&&rt&&e){var t=ct?e.offsetHeight<e.scrollHeight:e.offsetWidth<e.scrollWidth;We!==t&&Fe(t)}}),[Ye,rt,g,ct,_e]),o.useEffect((function(){var e=Y.current;if("undefined"!==typeof IntersectionObserver&&e&&rt&&$e){var t=new IntersectionObserver((function(){qe(!!e.offsetParent)}));return t.observe(e),function(){t.disconnect()}}}),[rt,$e]);var yt={};yt=!0===Ze.tooltip?{title:null!==(n=ae.text)&&void 0!==n?n:g}:o.isValidElement(Ze.tooltip)?{title:Ze.tooltip}:"object"===Object(a.a)(Ze.tooltip)?Object(r.a)({title:null!==(u=ae.text)&&void 0!==u?u:g},Ze.tooltip):{title:Ze.tooltip};var Ot=o.useMemo((function(){var e=function(e){return["string","number"].includes(Object(a.a)(e))};if(Ye&&!rt)return e(ae.text)?ae.text:e(g)?g:e(T)?T:e(yt.title)?yt.title:void 0}),[Ye,rt,T,yt.title,at]);if(le)return o.createElement(A,{value:null!==(s=ae.text)&&void 0!==s?s:"string"===typeof g?g:"",onSave:function(e){var t;null===(t=ae.onChange)||void 0===t||t.call(ae,e),fe(!1)},onCancel:function(){var e;null===(e=ae.onCancel)||void 0===e||e.call(ae),fe(!1)},onEnd:ae.onEnd,prefixCls:$,className:p,style:v,direction:F,component:H,maxLength:ae.maxLength,autoSize:ae.autoSize,enterIcon:ae.enterIcon});var gt=function(){var e,t=Ze.expandable,n=Ze.symbol;return t?(e=n||Q.expand,o.createElement("a",{key:"expand",className:"".concat($,"-expand"),onClick:lt,"aria-label":Q.expand},e)):null},jt=function(){if(re){var e=ae.icon,t=ae.tooltip,n=Object(E.a)(t)[0]||Q.edit,r="string"===typeof n?n:"";return se.includes("icon")?o.createElement(M.a,{key:"edit",title:!1===t?"":n},o.createElement(P.a,{ref:Z,className:"".concat($,"-edit"),onClick:pe,"aria-label":r},e||o.createElement(m,{role:"button"}))):null}},ht=function(){if(be){var e=me.tooltips,t=me.icon,n=G(e),r=G(t),a=ge?q(n[1],Q.copied):q(n[0],Q.copy),c=ge?Q.copied:Q.copy,l="string"===typeof a?a:c;return o.createElement(M.a,{key:"copy",title:a},o.createElement(P.a,{className:O()("".concat($,"-copy"),ge&&"".concat($,"-copy-success")),onClick:xe,"aria-label":l},ge?q(r[1],o.createElement(i.a,null),!0):q(r[0],o.createElement(d,null),!0)))}};return o.createElement(h.a,{onResize:function(e,t){var n,r=e.offsetWidth;ft(r),bt(parseInt(null===(n=window.getComputedStyle)||void 0===n?void 0:n.call(window,t).fontSize,10)||0)},disabled:!$e||rt},(function(n){var a;return o.createElement(X,{tooltipProps:yt,enabledEllipsis:$e,isEllipsis:at},o.createElement(B,Object(r.a)({className:O()((a={},Object(c.a)(a,"".concat($,"-").concat(b),b),Object(c.a)(a,"".concat($,"-disabled"),y),Object(c.a)(a,"".concat($,"-ellipsis"),Ye),Object(c.a)(a,"".concat($,"-single-line"),$e&&1===tt),Object(c.a)(a,"".concat($,"-ellipsis-single-line"),ot),Object(c.a)(a,"".concat($,"-ellipsis-multiple-line"),ct),a),p),prefixCls:f,style:Object(r.a)(Object(r.a)({},v),{WebkitLineClamp:ct?tt:void 0}),component:H,ref:Object(C.a)(n,Y,t),direction:F,onClick:se.includes("text")?pe:void 0,"aria-label":null===Ot||void 0===Ot?void 0:Ot.toString(),title:T},ee),o.createElement(J,{enabledMeasure:$e&&!rt,text:g,rows:tt,width:st,fontSize:vt,onEllipsis:mt},(function(t,n){var r=t;return t.length&&n&&Ot&&(r=o.createElement("span",{key:"show-content","aria-hidden":!0},r)),function(e,t){var n=e.mark,r=e.code,a=e.underline,c=e.delete,l=e.strong,i=e.keyboard,u=e.italic,s=t;function f(e,t){e&&(s=o.createElement(t,{},s))}return f(l,"strong"),f(a,"u"),f(c,"del"),f(r,"code"),f(n,"mark"),f(i,"kbd"),f(u,"i"),s}(e,o.createElement(o.Fragment,null,r,function(e){return[e&&o.createElement("span",{"aria-hidden":!0,key:"ellipsis"},"..."),Ze.suffix,(t=e,[t&&gt(),jt(),ht()])];var t}(n)))}))))}))})),Y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},Z=o.forwardRef((function(e,t){var n=e.ellipsis,a=e.rel,c=Y(e,["ellipsis","rel"]),l=Object(r.a)(Object(r.a)({},c),{rel:void 0===a&&"_blank"===c.target?"noopener noreferrer":a});return delete l.navigate,o.createElement(Q,Object(r.a)({},l,{ref:t,ellipsis:!!n,component:"a"}))})),$=o.forwardRef((function(e,t){return o.createElement(Q,Object(r.a)({ref:t},e,{component:"div"}))})),ee=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},te=function(e,t){var n=e.ellipsis,c=ee(e,["ellipsis"]),l=o.useMemo((function(){return n&&"object"===Object(a.a)(n)?Object(S.a)(n,["expandable","rows"]):n}),[n]);return o.createElement(Q,Object(r.a)({ref:t},c,{ellipsis:l,component:"span"}))},ne=o.forwardRef(te),re=n(61),ae=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},oe=Object(re.b)(1,2,3,4,5),ce=o.forwardRef((function(e,t){var n,a=e.level,c=void 0===a?1:a,l=ae(e,["level"]);return n=oe.includes(c)?"h".concat(c):"h1",o.createElement(Q,Object(r.a)({ref:t},l,{component:n}))})),le=B;le.Text=ne,le.Link=Z,le.Title=ce,le.Paragraph=$;t.a=le},897:function(e,t,n){},898:function(e,t,n){"use strict";var r=n(899),a={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,o,c,l,i,u,s=!1;t||(t={}),n=t.debug||!1;try{if(c=r(),l=document.createRange(),i=document.getSelection(),(u=document.createElement("span")).textContent=e,u.ariaHidden="true",u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",(function(r){if(r.stopPropagation(),t.format)if(r.preventDefault(),"undefined"===typeof r.clipboardData){n&&console.warn("unable to use e.clipboardData"),n&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=a[t.format]||a.default;window.clipboardData.setData(o,e)}else r.clipboardData.clearData(),r.clipboardData.setData(t.format,e);t.onCopy&&(r.preventDefault(),t.onCopy(r.clipboardData))})),document.body.appendChild(u),l.selectNodeContents(u),i.addRange(l),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");s=!0}catch(f){n&&console.error("unable to copy using execCommand: ",f),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),s=!0}catch(f){n&&console.error("unable to copy using clipboardData: ",f),n&&console.error("falling back to prompt"),o=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,e)}}finally{i&&("function"==typeof i.removeRange?i.removeRange(l):i.removeAllRanges()),u&&document.body.removeChild(u),c()}return s}},899:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);
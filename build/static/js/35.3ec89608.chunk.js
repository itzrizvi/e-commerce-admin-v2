/*! For license information please see 35.3ec89608.chunk.js.LICENSE.txt */
(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[35],{511:function(e,t,n){"use strict";n(58),n(512)},512:function(e,t,n){},513:function(e,t,n){"use strict";var r=n(1),o=n(3),i=n(136),a=n(5),l=n.n(a),u=n(7),s=n(14),c=n(0),f=n(51),m=n(50),p=c.forwardRef((function(e,t){var n,r=e.prefixCls,i=void 0===r?"rc-switch":r,a=e.className,p=e.checked,g=e.defaultChecked,d=e.disabled,h=e.loadingIcon,y=e.checkedChildren,v=e.unCheckedChildren,b=e.onClick,w=e.onChange,O=e.onKeyDown,S=Object(s.a)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),T=Object(f.a)(!1,{value:p,defaultValue:g}),x=Object(u.a)(T,2),_=x[0],j=x[1];function D(e,t){var n=_;return d||(j(n=e),null===w||void 0===w||w(n,t)),n}var k=l()(i,a,(n={},Object(o.a)(n,"".concat(i,"-checked"),_),Object(o.a)(n,"".concat(i,"-disabled"),d),n));return c.createElement("button",Object.assign({},S,{type:"button",role:"switch","aria-checked":_,disabled:d,className:k,ref:t,onKeyDown:function(e){e.which===m.a.LEFT?D(!1,e):e.which===m.a.RIGHT&&D(!0,e),null===O||void 0===O||O(e)},onClick:function(e){var t=D(!_,e);null===b||void 0===b||b(t,e)}}),h,c.createElement("span",{className:"".concat(i,"-inner")},_?y:v))}));p.displayName="Switch";var g=p,d=n(68),h=n(93),y=n(72),v=n(217),b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},w=c.forwardRef((function(e,t){var n,a=e.prefixCls,u=e.size,s=e.disabled,f=e.loading,m=e.className,p=void 0===m?"":m,w=b(e,["prefixCls","size","disabled","loading","className"]),O=c.useContext(d.b),S=O.getPrefixCls,T=O.direction,x=c.useContext(y.b),_=c.useContext(h.b),j=s||_||f,D=S("switch",a),k=c.createElement("div",{className:"".concat(D,"-handle")},f&&c.createElement(i.a,{className:"".concat(D,"-loading-icon")})),V=l()((n={},Object(o.a)(n,"".concat(D,"-small"),"small"===(u||x)),Object(o.a)(n,"".concat(D,"-loading"),f),Object(o.a)(n,"".concat(D,"-rtl"),"rtl"===T),n),p);return c.createElement(v.a,{insertExtraNode:!0},c.createElement(g,Object(r.a)({},w,{prefixCls:D,className:V,disabled:j,ref:t,loadingIcon:k})))}));w.__ANT_SWITCH=!0;t.a=w},596:function(e,t,n){var r,o;e.exports=(r=n(593),o=n(0),function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){e.exports=n(3)()},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t,n){"use strict";var r=n(4);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){var r,o,i,a,l;a=this,l=function(e){var t=!1,n=!1,r=!1,o=!1,i="escape years months weeks days hours minutes seconds milliseconds general".split(" "),a=[{type:"seconds",targets:[{type:"minutes",value:60},{type:"hours",value:3600},{type:"days",value:86400},{type:"weeks",value:604800},{type:"months",value:2678400},{type:"years",value:31536e3}]},{type:"minutes",targets:[{type:"hours",value:60},{type:"days",value:1440},{type:"weeks",value:10080},{type:"months",value:44640},{type:"years",value:525600}]},{type:"hours",targets:[{type:"days",value:24},{type:"weeks",value:168},{type:"months",value:744},{type:"years",value:8760}]},{type:"days",targets:[{type:"weeks",value:7},{type:"months",value:31},{type:"years",value:365}]},{type:"months",targets:[{type:"years",value:12}]}];function l(e,t){return!(t.length>e.length)&&-1!==e.indexOf(t)}function u(e){for(var t="";e;)t+="0",e-=1;return t}function s(e,t){var n=e+"+"+v(j(t).sort(),(function(e){return e+":"+t[e]})).join(",");return s.cache[n]||(s.cache[n]=Intl.NumberFormat(e,t)),s.cache[n]}function c(e,t,i){var a,l,f,m=t.useToLocaleString,p=t.useGrouping,g=p&&t.grouping.slice(),d=t.maximumSignificantDigits,h=t.minimumIntegerDigits||1,y=t.fractionDigits||0,v=t.groupingSeparator,b=t.decimalSeparator;if(m&&i){var w,O={minimumIntegerDigits:h,useGrouping:p};return y&&(O.maximumFractionDigits=y,O.minimumFractionDigits=y),d&&e>0&&(O.maximumSignificantDigits=d),r?(o||((w=_({},t)).useGrouping=!1,w.decimalSeparator=".",e=parseFloat(c(e,w),10)),s(i,O).format(e)):(n||((w=_({},t)).useGrouping=!1,w.decimalSeparator=".",e=parseFloat(c(e,w),10)),e.toLocaleString(i,O))}var S=(d?e.toPrecision(d+1):e.toFixed(y+1)).split("e");f=S[1]||"",l=(S=S[0].split("."))[1]||"";var T=(a=S[0]||"").length,x=l.length,j=T+x,D=a+l;(d&&j===d+1||!d&&x===y+1)&&((D=function(e){for(var t=e.split("").reverse(),n=0,r=!0;r&&n<t.length;)n?"9"===t[n]?t[n]="0":(t[n]=(parseInt(t[n],10)+1).toString(),r=!1):(parseInt(t[n],10)<5&&(r=!1),t[n]="0"),n+=1;return r&&t.push("1"),t.reverse().join("")}(D)).length===j+1&&(T+=1),x&&(D=D.slice(0,-1)),a=D.slice(0,T),l=D.slice(T)),d&&(l=l.replace(/0*$/,""));var k=parseInt(f,10);k>0?l.length<=k?(a+=l+=u(k-l.length),l=""):(a+=l.slice(0,k),l=l.slice(k)):k<0&&(l=u(Math.abs(k)-a.length)+a+l,a="0"),d||((l=l.slice(0,y)).length<y&&(l+=u(y-l.length)),a.length<h&&(a=u(h-a.length)+a));var V,P="";if(p)for(S=a;S.length;)g.length&&(V=g.shift()),P&&(P=v+P),P=S.slice(-V)+P,S=S.slice(0,-V);else P=a;return l&&(P=P+b+l),P}function f(e,t){return e.label.length>t.label.length?-1:e.label.length<t.label.length?1:0}function m(e,t){var n=[];return y(j(t),(function(r){if("_durationLabels"===r.slice(0,15)){var o=r.slice(15).toLowerCase();y(j(t[r]),(function(i){i.slice(0,1)===e&&n.push({type:o,key:i,label:t[r][i]})}))}})),n}s.cache={};var p={durationLabelsStandard:{S:"millisecond",SS:"milliseconds",s:"second",ss:"seconds",m:"minute",mm:"minutes",h:"hour",hh:"hours",d:"day",dd:"days",w:"week",ww:"weeks",M:"month",MM:"months",y:"year",yy:"years"},durationLabelsShort:{S:"msec",SS:"msecs",s:"sec",ss:"secs",m:"min",mm:"mins",h:"hr",hh:"hrs",d:"dy",dd:"dys",w:"wk",ww:"wks",M:"mo",MM:"mos",y:"yr",yy:"yrs"},durationTimeTemplates:{HMS:"h:mm:ss",HM:"h:mm",MS:"m:ss"},durationLabelTypes:[{type:"standard",string:"__"},{type:"short",string:"_"}],durationPluralKey:function(e,t,n){return 1===t&&null===n?e:e+e}};function g(e){return"[object Array]"===Object.prototype.toString.call(e)}function d(e){return"[object Object]"===Object.prototype.toString.call(e)}function h(e,t){var n,r=0,o=e&&e.length||0;for("function"!=typeof t&&(n=t,t=function(e){return e===n});r<o;){if(t(e[r]))return e[r];r+=1}}function y(e,t){var n=0,r=e.length;if(e&&r)for(;n<r;){if(!1===t(e[n],n))return;n+=1}}function v(e,t){var n=0,r=e.length,o=[];if(!e||!r)return o;for(;n<r;)o[n]=t(e[n],n),n+=1;return o}function b(e,t){return v(e,(function(e){return e[t]}))}function w(e){var t=[];return y(e,(function(e){e&&t.push(e)})),t}function O(e){var t=[];return y(e,(function(e){h(t,e)||t.push(e)})),t}function S(e,t){var n=[];return y(e,(function(e){y(t,(function(t){e===t&&n.push(e)}))})),O(n)}function T(e,t){var n=[];return y(e,(function(r,o){if(!t(r))return n=e.slice(o),!1})),n}function x(e,t){return T(e.slice().reverse(),t).reverse()}function _(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function j(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}function D(e,t){var n=0,r=e.length;if(!e||!r)return!1;for(;n<r;){if(!0===t(e[n],n))return!0;n+=1}return!1}function k(e){var t=[];return y(e,(function(e){t=t.concat(e)})),t}function V(e){return"3.6"===e(3.55,"en",{useGrouping:!1,minimumIntegerDigits:1,minimumFractionDigits:1,maximumFractionDigits:1})}function P(e){var t=!0;return!!((t=(t=(t=t&&"1"===e(1,"en",{minimumIntegerDigits:1}))&&"01"===e(1,"en",{minimumIntegerDigits:2}))&&"001"===e(1,"en",{minimumIntegerDigits:3}))&&(t=(t=(t=(t=t&&"100"===e(99.99,"en",{maximumFractionDigits:0,minimumFractionDigits:0}))&&"100.0"===e(99.99,"en",{maximumFractionDigits:1,minimumFractionDigits:1}))&&"99.99"===e(99.99,"en",{maximumFractionDigits:2,minimumFractionDigits:2}))&&"99.990"===e(99.99,"en",{maximumFractionDigits:3,minimumFractionDigits:3}))&&(t=(t=(t=(t=(t=t&&"100"===e(99.99,"en",{maximumSignificantDigits:1}))&&"100"===e(99.99,"en",{maximumSignificantDigits:2}))&&"100"===e(99.99,"en",{maximumSignificantDigits:3}))&&"99.99"===e(99.99,"en",{maximumSignificantDigits:4}))&&"99.99"===e(99.99,"en",{maximumSignificantDigits:5}))&&(t=(t=t&&"1,000"===e(1e3,"en",{useGrouping:!0}))&&"1000"===e(1e3,"en",{useGrouping:!1})))}function M(){var e,t=[].slice.call(arguments),n={};if(y(t,(function(t,r){if(!r){if(!g(t))throw"Expected array as the first argument to durationsFormat.";e=t}"string"!=typeof t&&"function"!=typeof t?"number"!=typeof t?d(t)&&_(n,t):n.precision=t:n.template=t})),!e||!e.length)return[];n.returnMomentTypes=!0;var r=v(e,(function(e){return e.format(n)})),o=S(i,O(b(k(r),"type"))),a=n.largest;return a&&(o=o.slice(0,a)),n.returnMomentTypes=!1,n.outputTypes=o,v(e,(function(e){return e.format(n)}))}function E(){var n=[].slice.call(arguments),o=_({},this.format.defaults),u=this.asMilliseconds(),s=this.asMonths();"function"==typeof this.isValid&&!1===this.isValid()&&(u=0,s=0);var k=u<0,V=e.duration(Math.abs(u),"milliseconds"),P=e.duration(Math.abs(s),"months");y(n,(function(e){"string"!=typeof e&&"function"!=typeof e?"number"!=typeof e?d(e)&&_(o,e):o.precision=e:o.template=e}));var M={years:"y",months:"M",weeks:"w",days:"d",hours:"h",minutes:"m",seconds:"s",milliseconds:"S"},E={escape:/\[(.+?)\]/,years:/\*?[Yy]+/,months:/\*?M+/,weeks:/\*?[Ww]+/,days:/\*?[Dd]+/,hours:/\*?[Hh]+/,minutes:/\*?m+/,seconds:/\*?s+/,milliseconds:/\*?S+/,general:/.+?/};o.types=i;var C=function(e){return h(i,(function(t){return E[t].test(e)}))},L=new RegExp(v(i,(function(e){return E[e].source})).join("|"),"g");o.duration=this;var F="function"==typeof o.template?o.template.apply(o):o.template,I=o.outputTypes,N=o.returnMomentTypes,R=o.largest,G=[];I||(g(o.stopTrim)&&(o.stopTrim=o.stopTrim.join("")),o.stopTrim&&y(o.stopTrim.match(L),(function(e){var t=C(e);"escape"!==t&&"general"!==t&&G.push(t)})));var z=e.localeData();z||(z={}),y(j(p),(function(e){"function"!=typeof p[e]?z["_"+e]||(z["_"+e]=p[e]):z[e]||(z[e]=p[e])})),y(j(z._durationTimeTemplates),(function(e){F=F.replace("_"+e+"_",z._durationTimeTemplates[e])}));var H=o.userLocale||e.locale(),U=o.useLeftUnits,W=o.usePlural,K=o.precision,A=o.forceLength,$=o.useGrouping,B=o.trunc,J=o.useSignificantDigits&&K>0,Y=J?o.precision:0,q=Y,Q=o.minValue,X=!1,Z=o.maxValue,ee=!1,te=o.useToLocaleString,ne=o.groupingSeparator,re=o.decimalSeparator,oe=o.grouping;te=te&&(t||r);var ie=o.trim;g(ie)&&(ie=ie.join(" ")),null===ie&&(R||Z||J)&&(ie="all"),null!==ie&&!0!==ie&&"left"!==ie&&"right"!==ie||(ie="large"),!1===ie&&(ie="");var ae=function(e){return e.test(ie)},le=/large/,ue=/small/,se=/both/,ce=/mid/,fe=/^all|[^sm]all/,me=/final/,pe=R>0||D([le,se,fe],ae),ge=D([ue,se,fe],ae),de=D([ce,fe],ae),he=D([me,fe],ae),ye=v(F.match(L),(function(e,t){var n=C(e);return"*"===e.slice(0,1)&&(e=e.slice(1),"escape"!==n&&"general"!==n&&G.push(n)),{index:t,length:e.length,text:"",token:"escape"===n?e.replace(E.escape,"$1"):e,type:"escape"===n||"general"===n?null:n}})),ve={index:0,length:0,token:"",text:"",type:null},be=[];U&&ye.reverse(),y(ye,(function(e){if(e.type)return(ve.type||ve.text)&&be.push(ve),void(ve=e);U?ve.text=e.token+ve.text:ve.text+=e.token})),(ve.type||ve.text)&&be.push(ve),U&&be.reverse();var we=S(i,O(w(b(be,"type"))));if(!we.length)return b(be,"text").join("");we=v(we,(function(e,t){var n,r=t+1===we.length,i=!t;n="years"===e||"months"===e?P.as(e):V.as(e);var a=Math.floor(n),l=n-a,u=h(be,(function(t){return e===t.type}));return i&&Z&&n>Z&&(ee=!0),r&&Q&&Math.abs(o.duration.as(e))<Q&&(X=!0),i&&null===A&&u.length>1&&(A=!0),V.subtract(a,e),P.subtract(a,e),{rawValue:n,wholeValue:a,decimalValue:r?l:0,isSmallest:r,isLargest:i,type:e,tokenLength:u.length}}));var Oe=B?Math.floor:Math.round,Se=function(e,t){var n=Math.pow(10,t);return Oe(e*n)/n},Te=!1,xe=!1,_e=function(e,t){var n={useGrouping:$,groupingSeparator:ne,decimalSeparator:re,grouping:oe,useToLocaleString:te};return J&&(Y<=0?(e.rawValue=0,e.wholeValue=0,e.decimalValue=0):(n.maximumSignificantDigits=Y,e.significantDigits=Y)),ee&&!xe&&(e.isLargest?(e.wholeValue=Z,e.decimalValue=0):(e.wholeValue=0,e.decimalValue=0)),X&&!xe&&(e.isSmallest?(e.wholeValue=Q,e.decimalValue=0):(e.wholeValue=0,e.decimalValue=0)),e.isSmallest||e.significantDigits&&e.significantDigits-e.wholeValue.toString().length<=0?K<0?e.value=Se(e.wholeValue,K):0===K?e.value=Oe(e.wholeValue+e.decimalValue):J?(e.value=B?Se(e.rawValue,Y-e.wholeValue.toString().length):e.rawValue,e.wholeValue&&(Y-=e.wholeValue.toString().length)):(n.fractionDigits=K,e.value=B?e.wholeValue+Se(e.decimalValue,K):e.wholeValue+e.decimalValue):J&&e.wholeValue?(e.value=Math.round(Se(e.wholeValue,e.significantDigits-e.wholeValue.toString().length)),Y-=e.wholeValue.toString().length):e.value=e.wholeValue,e.tokenLength>1&&(A||Te)&&(n.minimumIntegerDigits=e.tokenLength,xe&&n.maximumSignificantDigits<e.tokenLength&&delete n.maximumSignificantDigits),!Te&&(e.value>0||""===ie||h(G,e.type)||h(I,e.type))&&(Te=!0),e.formattedValue=c(e.value,n,H),n.useGrouping=!1,n.decimalSeparator=".",e.formattedValueEn=c(e.value,n,"en"),2===e.tokenLength&&"milliseconds"===e.type&&(e.formattedValueMS=c(e.value,{minimumIntegerDigits:3,useGrouping:!1},"en").slice(0,2)),e};if((we=w(we=v(we,_e))).length>1){var je=function(e){return h(we,(function(t){return t.type===e}))},De=function(e){var t=je(e.type);t&&y(e.targets,(function(e){var n=je(e.type);n&&parseInt(t.formattedValueEn,10)===e.value&&(t.rawValue=0,t.wholeValue=0,t.decimalValue=0,n.rawValue+=1,n.wholeValue+=1,n.decimalValue=0,n.formattedValueEn=n.wholeValue.toString(),xe=!0)}))};y(a,De)}return xe&&(Te=!1,Y=q,we=w(we=v(we,_e))),!I||ee&&!o.trim?(pe&&(we=T(we,(function(e){return!e.isSmallest&&!e.wholeValue&&!h(G,e.type)}))),R&&we.length&&(we=we.slice(0,R)),ge&&we.length>1&&(we=x(we,(function(e){return!e.wholeValue&&!h(G,e.type)&&!e.isLargest}))),de&&(we=w(we=v(we,(function(e,t){return t>0&&t<we.length-1&&!e.wholeValue?null:e})))),!he||1!==we.length||we[0].wholeValue||!B&&we[0].isSmallest&&we[0].rawValue<Q||(we=[])):we=w(we=v(we,(function(e){return h(I,(function(t){return e.type===t}))?e:null}))),N?we:(y(be,(function(e){var t=M[e.type],n=h(we,(function(t){return t.type===e.type}));if(t&&n){var r=n.formattedValueEn.split(".");r[0]=parseInt(r[0],10),r[1]?r[1]=parseFloat("0."+r[1],10):r[1]=null;var o=z.durationPluralKey(t,r[0],r[1]),i=m(t,z),a=!1,u={};y(z._durationLabelTypes,(function(t){var n=h(i,(function(e){return e.type===t.type&&e.key===o}));n&&(u[n.type]=n.label,l(e.text,t.string)&&(e.text=e.text.replace(t.string,n.label),a=!0))})),W&&!a&&(i.sort(f),y(i,(function(t){return u[t.type]===t.label?!l(e.text,t.label)&&void 0:l(e.text,t.label)?(e.text=e.text.replace(t.label,u[t.type]),!1):void 0})))}})),(be=v(be,(function(e){if(!e.type)return e.text;var t=h(we,(function(t){return t.type===e.type}));if(!t)return"";var n="";return U&&(n+=e.text),(k&&ee||!k&&X)&&(n+="< ",ee=!1,X=!1),(k&&X||!k&&ee)&&(n+="> ",ee=!1,X=!1),k&&(t.value>0||""===ie||h(G,t.type)||h(I,t.type))&&(n+="-",k=!1),"milliseconds"===e.type&&t.formattedValueMS?n+=t.formattedValueMS:n+=t.formattedValue,U||(n+=e.text),n}))).join("").replace(/(,| |:|\.)*$/,"").replace(/^(,| |:|\.)*/,""))}function C(){var e=this.duration,t=function(t){return e._data[t]},n=h(this.types,t),r=function(e,t){for(var n=e.length;n-=1;)if(t(e[n]))return e[n]}(this.types,t);switch(n){case"milliseconds":return"S __";case"seconds":case"minutes":return"*_MS_";case"hours":return"_HMS_";case"days":if(n===r)return"d __";case"weeks":return n===r?"w __":(null===this.trim&&(this.trim="both"),"w __, d __, h __");case"months":if(n===r)return"M __";case"years":return n===r?"y __":(null===this.trim&&(this.trim="both"),"y __, M __, d __");default:return null===this.trim&&(this.trim="both"),"y __, d __, h __, m __, s __"}}function L(e){if(!e)throw"Moment Duration Format init cannot find moment instance.";e.duration.format=M,e.duration.fn.format=E,e.duration.fn.format.defaults={trim:null,stopTrim:null,largest:null,maxValue:null,minValue:null,precision:0,trunc:!1,forceLength:null,userLocale:null,usePlural:!0,useLeftUnits:!1,useGrouping:!0,useSignificantDigits:!1,template:C,useToLocaleString:!0,groupingSeparator:",",decimalSeparator:".",grouping:[3]},e.updateLocale("en",p)}var F=function(e,t,n){return e.toLocaleString(t,n)};t=function(){try{(0).toLocaleString("i")}catch(e){return"RangeError"===e.name}return!1}()&&P(F),n=t&&V(F);var I=function(e,t,n){if("undefined"!=typeof window&&window&&window.Intl&&window.Intl.NumberFormat)return window.Intl.NumberFormat(t,n).format(e)};return r=P(I),o=r&&V(I),L(e),L},o=[n(1)],void 0===(i="function"==typeof(r=l)?r.apply(t,o):r)||(e.exports=i),a&&(a.momentDurationFormatSetup=a.moment?l(a.moment):l)},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return S}));var r=n(2),o=n.n(r),i=n(0),a=n.n(i),l=n(1),u=n.n(l);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(5);var v=[a.a.string,a.a.number,a.a.array,a.a.object],b=[a.a.string,a.a.array],w=[a.a.object,a.a.bool],O=[a.a.string,a.a.bool],S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,e);var t=function(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}(n);function n(e){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),y(d(r=t.call(this,e)),"setTimer",(function(){var e=r.props.interval;r.clearTimer(),n.pooledTimer||0===e||(r.timer=setInterval((function(){r.update(r.props)}),e))})),y(d(r),"getTitle",(function(){var e=r.props.titleFormat,t=n.getDatetime(r.props),o=e||n.globalFormat;return t.format(o)})),y(d(r),"clearTimer",(function(){!n.pooledTimer&&r.timer&&(clearInterval(r.timer),r.timer=null),n.pooledTimer&&!r.timer&&n.removePooledElement(d(r))})),n.globalMoment||(n.globalMoment=u.a),r.state={content:""},r.timer=null,r}return m(n,null,[{key:"startPooledTimer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6e4;n.clearPooledTimer(),n.pooledTimer=setInterval((function(){n.pooledElements.forEach((function(e){0!==e.props.interval&&e.update()}))}),e)}},{key:"clearPooledTimer",value:function(){n.pooledTimer&&(clearInterval(n.pooledTimer),n.pooledTimer=null,n.pooledElements=[])}},{key:"pushPooledElement",value:function(e){e instanceof n?-1===n.pooledElements.indexOf(e)&&n.pooledElements.push(e):console.error("Element not an instance of Moment.")}},{key:"removePooledElement",value:function(e){var t=n.pooledElements.indexOf(e);-1!==t&&n.pooledElements.splice(t,1)}},{key:"getDatetime",value:function(e){var t=e.utc,r=e.unix,o=e.date,i=e.locale,a=e.parse,l=e.tz,u=e.local;o=o||e.children,a=a||n.globalParse,u=u||n.globalLocal,l=l||n.globalTimezone,i=n.globalLocale?n.globalLocale:i||n.globalMoment.locale();var s=null;return s=t?n.globalMoment.utc(o,a,i):r?n.globalMoment(1e3*o,a,i):n.globalMoment(o,a,i),l?s=s.tz(l):u&&(s=s.local()),s}},{key:"getContent",value:function(e){var t=e.fromNow,r=e.fromNowDuring,o=e.from,i=e.add,a=e.subtract,l=e.toNow,s=e.to,c=e.ago,f=e.calendar,m=e.diff,p=e.duration,g=e.durationFromNow,d=e.unit,h=e.decimal,y=e.trim,v=e.format;v=v||n.globalFormat;var b=n.getDatetime(e);i&&b.add(i),a&&b.subtract(a);var w=Boolean(r)&&-b.diff(u()())<r,O="";return O=!v||w||g||p?o?b.from(o,c):t||w?b.fromNow(c):s?b.to(s,c):l?b.toNow(c):f?b.calendar(null,f):m?b.diff(m,d,h):p?b.diff(p):g?u()().diff(b):b.toString():b.format(v),(p||g)&&(O=(O=u.a.duration(O)).format(v,{trim:y})),(n.globalFilter||e.filter)(O)}}]),m(n,[{key:"componentDidMount",value:function(){this.setTimer(),n.pooledTimer&&n.pushPooledElement(this)}},{key:"componentDidUpdate",value:function(e){var t=this.props.interval;e.interval!==t&&this.setTimer()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"update",value:function(e){var t=e||this.props,r=t.onChange,o=n.getContent(t);this.setState({content:o},(function(){r(o)}))}},{key:"render",value:function(){var e,t,r,i,a=this.props,l=a.withTitle,u=a.element,s=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(a,["withTitle","element"]),f=this.state.content,m=(e=s,t=n.propTypes,r=Object.keys(t),i=Object.assign({},e),Object.keys(i).filter((function(e){return-1!==r.indexOf(e)})).forEach((function(e){return delete i[e]})),i);return l&&(m.title=this.getTitle()),o.a.createElement(u||n.globalElement,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({dateTime:n.getDatetime(this.props)},m),f)}}],[{key:"getDerivedStateFromProps",value:function(e){return{content:n.getContent(e)}}}]),n}(o.a.Component);y(S,"propTypes",{element:a.a.any,date:a.a.oneOfType(v),parse:a.a.oneOfType(b),format:a.a.string,add:a.a.object,subtract:a.a.object,ago:a.a.bool,fromNow:a.a.bool,fromNowDuring:a.a.number,from:a.a.oneOfType(v),toNow:a.a.bool,to:a.a.oneOfType(v),calendar:a.a.oneOfType(w),unix:a.a.bool,utc:a.a.bool,local:a.a.bool,tz:a.a.string,withTitle:a.a.bool,titleFormat:a.a.string,locale:a.a.string,interval:a.a.number,diff:a.a.oneOfType(v),duration:a.a.oneOfType(v),durationFromNow:a.a.bool,trim:a.a.oneOfType(O),unit:a.a.string,decimal:a.a.bool,filter:a.a.func,onChange:a.a.func}),y(S,"defaultProps",{element:null,fromNow:!1,toNow:!1,calendar:!1,ago:!1,unix:!1,utc:!1,local:!1,unit:null,withTitle:!1,trim:!1,decimal:!1,titleFormat:"",interval:6e4,filter:function(e){return e},onChange:function(){}}),y(S,"globalMoment",null),y(S,"globalLocale",null),y(S,"globalLocal",null),y(S,"globalFormat",null),y(S,"globalParse",null),y(S,"globalFilter",null),y(S,"globalElement","time"),y(S,"globalTimezone",null),y(S,"pooledElements",[]),y(S,"pooledTimer",null)}]))}}]);
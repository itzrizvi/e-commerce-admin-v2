(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[6],{548:function(e,r,n){"use strict";n.r(r);n(140);var t,a,o=n(74),d=(n(141),n(34)),i=n(0),l=n.n(i),c=n(21),m=n.n(c),s=n(464),p=n(465),u=n(446),E=n(452),y=n(8),D=n(59),f=function(){var e=l.a.createElement(l.a.Fragment,null,l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"facebook"}),l.a.createElement("span",null,"Facebook")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"twitter"}),l.a.createElement("span",null,"Twitter")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"rss"}),l.a.createElement("span",null,"Feed")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"linkedin"}),l.a.createElement("span",null,"Linkedin")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"instagram"}),l.a.createElement("span",null,"Instagram")));return l.a.createElement(D.a,{placement:"bottomLeft",content:e,trigger:"click"},l.a.createElement(u.a,{size:"small",type:"white",key:"3"},l.a.createElement(m.a,{icon:"share-2",size:14}),"Share"))},g=function(){var e=l.a.createElement(l.a.Fragment,null,l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"printer"}),l.a.createElement("span",null,"Printer")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"book-open"}),l.a.createElement("span",null,"PDF")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"file-text"}),l.a.createElement("span",null,"Google Sheets")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"x"}),l.a.createElement("span",null,"Excel (XLSX)")),l.a.createElement(y.c,{to:"#"},l.a.createElement(m.a,{size:16,icon:"file"}),l.a.createElement("span",null,"CSV")));return l.a.createElement(D.a,{placement:"bottomLeft",content:e,trigger:"click"},l.a.createElement(u.a,{size:"small",type:"white"},l.a.createElement(m.a,{icon:"download",size:14}),"Export"))},b=(n(502),n(494)),h=n(32),v=n(54),P=n(55),w=n(150),k=n(153),S=n(9),x=n(45),z=n(458),O=(n(518),n(519),n(520)),R=n(17),F=n(16),N=F.b.div(t||(t=Object(R.a)(["\n    display: flex;\n    flex-direction: column;\n    .rdrDateDisplay, .rdrMonthAndYearPickers{\n        display: none;\n    }\n    .rdrMonth {\n        position: relative;\n        max-width: 272px;\n    }\n    .rdrMonthName {\n        text-align: center;\n        font-size: 18px;\n        position: absolute;\n        top: -50px;\n        ",": 100px;\n        font-weight: 400;\n    }\n    .rdrDefinedRangesWrapper{\n        .rdrStaticRanges{\n            .rdrStaticRange{\n                border-bottom: 0 none;\n                &:hover,\n                &.rdrStaticRangeSelected{\n                    span{\n                        font-weight: 400;\n                        color: ",";\n                        background-color: #EFEFFE;\n                    }\n                }\n                .rdrStaticRangeLabel{\n                    padding: 9px 10px;\n                }\n            }\n        }\n    }\n    .rdrCalendarWrapper{\n        .rdrPprevButton,\n        .rdrNextButton{\n            padding: 0;\n            background: transparent;\n        }\n        .rdrMonthsHorizontal{\n            .rdrMonth{\n                .rdrMonthName{\n                    font-size: 13px;\n                    font-weight: 500;\n                    color: ",";\n                }\n            }\n            .rdrDays{\n                .rdrSelected, \n                .rdrInRange{                    \n                    background-color: #EFEFFE;\n                    left: 0 !important;\n                    right: 0 !important;\n                }\n                .rdrStartEdge{\n                    right: 0 !important;\n                    left: 0 !important;\n                    ",";\n                    ",";\n                }\n                .rdrEndEdge{\n                    ",";\n                    ",";\n                }\n                .rdrDayStartOfMonth .rdrDayInPreview, .rdrDayStartOfMonth .rdrDayEndPreview, .rdrDayStartOfWeek .rdrDayInPreview, .rdrDayStartOfWeek .rdrDayEndPreview{\n                    border-radius: 0px;\n                }\n                \n                .rdrDayEndOfWeek .rdrDayStartPreview,\n                .rdrDayEndOfWeek .rdrDayInPreview,\n                .rdrDayEndOfMonth .rdrDayStartPreview,\n                .rdrDayEndOfMonth .rdrDayInPreview,\n                .rdrDayEndOfMonth .rdrInRange, \n                .rdrDayEndOfWeek .rdrInRange, \n                .rdrDayEndOfWeek .rdrStartEdge\n                .rdrDayStartOfMonth .rdrInRange, \n                .rdrDayStartOfWeek .rdrInRange{\n                    border-radius: 0;\n                }\n\n                .rdrDayEndOfWeek .rdrDayStartPreview.rdrDayEndPreview,\n                .rdrDayStartOfWeek .rdrDayStartPreview.rdrDayEndPreview,\n                .rdrDayEndOfMonth .rdrDayStartPreview.rdrDayEndPreview,\n                .rdrDayStartOfMonth .rdrDayStartPreview.rdrDayEndPreview{\n                    border-radius: 1.042em;\n                    color: #fff !important;\n                }\n                \n                .rdrDayEndPreview,\n                .rdrDayStartPreview,\n                .rdrDayInPreview{\n                    border: 0 none;\n                    background-color: #EFEFFE;\n                    color: "," !importtant;\n                    top: 0;\n                    bottom: 0;\n                }\n                \n                .rdrStartEdge, \n                .rdrEndEdge,\n                .rdrDayStartPreview,\n                .rdrDayEndPreview{\n                    background-color: ",";\n                }\n\n                .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,\n                .rdrDay:not(.rdrDayPassive) .rdrDayInPreview ~ .rdrDayNumber span, \n                .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span{\n                    color: "," !important;\n                }\n                .rdrDay:not(.rdrDayPassive).rdrDayHovered .rdrInRange ~ .rdrDayNumber span,\n                .rdrDay:not(.rdrDayPassive).rdrDayHovered .rdrDayInPreview ~ .rdrDayNumber span, \n                .rdrDay:not(.rdrDayPassive).rdrDayHovered .rdrSelected ~ .rdrDayNumber span{\n                    color: #fff !important;\n                }\n                .rdrDay:not(.rdrDayPassive) .rdrDayEndPreview ~ .rdrDayNumber span,\n                .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, \n                .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span{\n                    color: #fff;\n                }\n                .rdrDay{\n                    margin-bottom: 3px;\n                    .rdrSelected, \n                    .rdrInRange, \n                    .rdrStartEdge, \n                    .rdrEndEdge{\n                        top: 0;\n                        bottom: 0;\n\n                    }\n                    .rdrDayNumber{\n                        z-index: 10;\n                    }\n                    &.rdrDayToday{\n                        background-color: ",";\n                        color: #fff;\n                        border-radius: 50%;\n                        .rdrDayNumber{\n                            span{\n                                color: #fff;\n                                &:after{\n                                    display: none;\n                                }\n                            }\n                        }\n                    }\n                    &.rdrDayHovered{\n                        .rdrDayNumber span{\n                            color: #fff !important;\n                        }\n                    }\n                }\n            }\n        }\n    }\n"])),(function(e){return e.theme.rtl?"right":"left"}),(function(e){return e.theme["primary-color"]}),(function(e){return e.theme["dark-color"]}),(function(e){return e.theme.rtl?"border-top-right-radius: 1.042em; border-top-left-radius: 0em;":"border-top-left-radius: 1.042em;"}),(function(e){return e.theme.rtl?"border-bottom-right-radius: 1.042em;border-bottom-left-radius: 0em;":"border-bottom-left-radius: 1.042em;"}),(function(e){return e.theme.rtl?"border-top-left-radius: 1.042em;border-top-right-radius: 0;":"border-top-right-radius: 1.042em;"}),(function(e){return e.theme.rtl?"border-bottom-left-radius: 1.042em;border-bottom-right-radius: 0;":"border-bottom-right-radius: 1.042em;"}),(function(e){return e.theme["dark-color"]}),(function(e){return e.theme["primary-color"]}),(function(e){return e.theme["dark-color"]}),(function(e){return e.theme["primary-color"]})),I=F.b.div(a||(a=Object(R.a)(["\n    border-top: 1px solid #EEEFF2;\n    padding: 10px;\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: flex-end;\n    margin: -4px -4px -15px;\n    p{\n        font-size: 13px;\n    margin: ",";\n        font-weight: 500;\n        color: ",";\n    }\n    button {\n        font-size: 12px;\n        margin: 4px;\n        height: 32px;\n        padding: 0px 13.26px;\n    }\n"])),(function(e){return e.theme.rtl?"0 0 0 20px":"0 20px 0 0"}),(function(e){return e.theme["gray-color"]})),M=function(){var e=Object(i.useState)({datePickerInternational:null,dateRangePicker:{selection:{startDate:new Date,endDate:Object(z.default)(new Date,7),key:"selection"}}}),r=Object(x.a)(e,2),n=r[0],t=r[1],a=n.dateRangePicker,o=a.selection.startDate.toString().split(" "),d=a.selection.endDate.toString().split(" ");return l.a.createElement(N,null,l.a.createElement(O.DateRangePicker,{onChange:function(e){t(Object(S.a)(Object(S.a)({},n),{},{dateRangePicker:Object(S.a)(Object(S.a)({},n.dateRangePicker),e)}))},showSelectionPreview:!0,moveRangeOnFirstSelection:!1,className:"PreviewArea",months:2,ranges:[a.selection],direction:"horizontal"}),l.a.createElement(I,null,l.a.createElement("p",null,"".concat(o[1]," ").concat(o[2]," ").concat(o[3]," - ").concat(d[1]," ").concat(d[2]," ").concat(d[3])),l.a.createElement(u.a,{size:"small",type:"primary"},"Apply"),l.a.createElement(u.a,{size:"small",type:"white",outlined:!0},"Cancel")))},W=(l.a.Component,function(){var e=l.a.createElement(l.a.Fragment,null,l.a.createElement(M,null));return l.a.createElement(D.a,{placement:"bottomRight",title:"Search by Calendar",content:e,action:"hover"},l.a.createElement(u.a,{size:"small",type:"white"},l.a.createElement(m.a,{icon:"calendar",size:14}),"Calendar"))});r.default=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{ghost:!0,title:"Sample Page",buttons:[l.a.createElement("div",{key:"6",className:"page-header-actions"},l.a.createElement(W,{key:"1"}),l.a.createElement(g,{key:"2"}),l.a.createElement(f,{key:"3"}),l.a.createElement(u.a,{size:"small",key:"4",type:"primary"},l.a.createElement(m.a,{icon:"plus",size:14}),"Add New"))]}),l.a.createElement(E.b,null,l.a.createElement(o.a,{gutter:25},l.a.createElement(d.a,{lg:24,xs:24},l.a.createElement(p.a,{headless:!0},l.a.createElement("div",{style:{minHeight:"calc(100vh - 320px)"}},l.a.createElement("h2",null,"Welcome to Prime Server Parts")))))))}}}]);
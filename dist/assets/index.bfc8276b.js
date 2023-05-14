import{c as lt,a as ht}from"./3024-night.84bac616.js";import{_ as ut,d as ft,k as U,y as pt,A as dt,r as et,o as mt,c as vt,a as O,b as it,w as M,e as nt,t as gt}from"./index.d795ab4f.js";(function(g,v){(function(r){r(lt.exports)})(function(r){var y="CodeMirror-hint",w="CodeMirror-hint-active";r.showHint=function(t,e,i){if(!e)return t.showHint(i);i&&i.async&&(e.async=!0);var n={hint:e};if(i)for(var s in i)n[s]=i[s];return t.showHint(n)},r.defineExtension("showHint",function(t){t=C(this,this.getCursor("start"),t);var e=this.listSelections();if(!(e.length>1)){if(this.somethingSelected()){if(!t.hint.supportsSelection)return;for(var i=0;i<e.length;i++)if(e[i].head.line!=e[i].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();var n=this.state.completionActive=new b(this,t);!n.options.hint||(r.signal(this,"startCompletion",this),n.update(!0))}}),r.defineExtension("closeHint",function(){this.state.completionActive&&this.state.completionActive.close()});function b(t,e){if(this.cm=t,this.options=e,this.widget=null,this.debounce=0,this.tick=0,this.startPos=this.cm.getCursor("start"),this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length,this.options.updateOnCursorActivity){var i=this;t.on("cursorActivity",this.activityFunc=function(){i.cursorActivity()})}}var A=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},x=window.cancelAnimationFrame||clearTimeout;b.prototype={close:function(){!this.active()||(this.cm.state.completionActive=null,this.tick=null,this.options.updateOnCursorActivity&&this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&r.signal(this.data,"close"),this.widget&&this.widget.close(),r.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(t,e){var i=t.list[e],n=this;this.cm.operation(function(){i.hint?i.hint(n.cm,t,i):n.cm.replaceRange(S(i),i.from||t.from,i.to||t.to,"complete"),r.signal(t,"pick",i),n.cm.scrollIntoView()}),this.options.closeOnPick&&this.close()},cursorActivity:function(){this.debounce&&(x(this.debounce),this.debounce=0);var t=this.startPos;this.data&&(t=this.data.from);var e=this.cm.getCursor(),i=this.cm.getLine(e.line);if(e.line!=this.startPos.line||i.length-e.ch!=this.startLen-this.startPos.ch||e.ch<t.ch||this.cm.somethingSelected()||!e.ch||this.options.closeCharacters.test(i.charAt(e.ch-1)))this.close();else{var n=this;this.debounce=A(function(){n.update()}),this.widget&&this.widget.disable()}},update:function(t){if(this.tick!=null){var e=this,i=++this.tick;q(this.options.hint,this.cm,this.options,function(n){e.tick==i&&e.finishUpdate(n,t)})}},finishUpdate:function(t,e){this.data&&r.signal(this.data,"update");var i=this.widget&&this.widget.picked||e&&this.options.completeSingle;this.widget&&this.widget.close(),this.data=t,t&&t.list.length&&(i&&t.list.length==1?this.pick(t,0):(this.widget=new z(this,t),r.signal(t,"shown")))}};function C(t,e,i){var n=t.options.hintOptions,s={};for(var c in Y)s[c]=Y[c];if(n)for(var c in n)n[c]!==void 0&&(s[c]=n[c]);if(i)for(var c in i)i[c]!==void 0&&(s[c]=i[c]);return s.hint.resolve&&(s.hint=s.hint.resolve(t,e)),s}function S(t){return typeof t=="string"?t:t.text}function st(t,e){var i={Up:function(){e.moveFocus(-1)},Down:function(){e.moveFocus(1)},PageUp:function(){e.moveFocus(-e.menuSize()+1,!0)},PageDown:function(){e.moveFocus(e.menuSize()-1,!0)},Home:function(){e.setFocus(0)},End:function(){e.setFocus(e.length-1)},Enter:e.pick,Tab:e.pick,Esc:e.close},n=/Mac/.test(navigator.platform);n&&(i["Ctrl-P"]=function(){e.moveFocus(-1)},i["Ctrl-N"]=function(){e.moveFocus(1)});var s=t.options.customKeys,c=s?{}:i;function o(f,a){var h;typeof a!="string"?h=function(_){return a(_,e)}:i.hasOwnProperty(a)?h=i[a]:h=a,c[f]=h}if(s)for(var u in s)s.hasOwnProperty(u)&&o(u,s[u]);var l=t.options.extraKeys;if(l)for(var u in l)l.hasOwnProperty(u)&&o(u,l[u]);return c}function $(t,e){for(;e&&e!=t;){if(e.nodeName.toUpperCase()==="LI"&&e.parentNode==t)return e;e=e.parentNode}}function z(t,e){this.id="cm-complete-"+Math.floor(Math.random(1e6)),this.completion=t,this.data=e,this.picked=!1;var i=this,n=t.cm,s=n.getInputField().ownerDocument,c=s.defaultView||s.parentWindow,o=this.hints=s.createElement("ul");o.setAttribute("role","listbox"),o.setAttribute("aria-expanded","true"),o.id=this.id;var u=t.cm.options.theme;o.className="CodeMirror-hints "+u,this.selectedHint=e.selectedHint||0;for(var l=e.list,f=0;f<l.length;++f){var a=o.appendChild(s.createElement("li")),h=l[f],_=y+(f!=this.selectedHint?"":" "+w);h.className!=null&&(_=h.className+" "+_),a.className=_,f==this.selectedHint&&a.setAttribute("aria-selected","true"),a.id=this.id+"-"+f,a.setAttribute("role","option"),h.render?h.render(a,e,h):a.appendChild(s.createTextNode(h.displayText||S(h))),a.hintId=f}var T=t.options.container||s.body,H=n.cursorCoords(t.options.alignWithWord?e.from:null),I=H.left,D=H.bottom,j=!0,B=0,W=0;if(T!==s.body){var ct=["absolute","relative","fixed"].indexOf(c.getComputedStyle(T).position)!==-1,L=ct?T:T.offsetParent,X=L.getBoundingClientRect(),G=s.body.getBoundingClientRect();B=X.left-G.left-L.scrollLeft,W=X.top-G.top-L.scrollTop}o.style.left=I-B+"px",o.style.top=D-W+"px";var F=c.innerWidth||Math.max(s.body.offsetWidth,s.documentElement.offsetWidth),R=c.innerHeight||Math.max(s.body.offsetHeight,s.documentElement.offsetHeight);T.appendChild(o),n.getInputField().setAttribute("aria-autocomplete","list"),n.getInputField().setAttribute("aria-owns",this.id),n.getInputField().setAttribute("aria-activedescendant",this.id+"-"+this.selectedHint);var m=t.options.moveOnOverlap?o.getBoundingClientRect():new DOMRect,J=t.options.paddingForScrollbar?o.scrollHeight>o.clientHeight+1:!1,k;setTimeout(function(){k=n.getScrollInfo()});var at=m.bottom-R;if(at>0){var P=m.bottom-m.top,V=m.top-(H.bottom-H.top)-2;R-m.top<V?(P>V&&(o.style.height=(P=V)+"px"),o.style.top=(D=H.top-P)+W+"px",j=!1):o.style.height=R-m.top-2+"px"}var N=m.right-F;if(J&&(N+=n.display.nativeBarWidth),N>0&&(m.right-m.left>F&&(o.style.width=F-5+"px",N-=m.right-m.left-F),o.style.left=(I=Math.max(H.left-N-B,0))+"px"),J)for(var E=o.firstChild;E;E=E.nextSibling)E.style.paddingRight=n.display.nativeBarWidth+"px";if(n.addKeyMap(this.keyMap=st(t,{moveFocus:function(p,d){i.changeActive(i.selectedHint+p,d)},setFocus:function(p){i.changeActive(p)},menuSize:function(){return i.screenAmount()},length:l.length,close:function(){t.close()},pick:function(){i.pick()},data:e})),t.options.closeOnUnfocus){var Q;n.on("blur",this.onBlur=function(){Q=setTimeout(function(){t.close()},100)}),n.on("focus",this.onFocus=function(){clearTimeout(Q)})}n.on("scroll",this.onScroll=function(){var p=n.getScrollInfo(),d=n.getWrapperElement().getBoundingClientRect();k||(k=n.getScrollInfo());var tt=D+k.top-p.top,K=tt-(c.pageYOffset||(s.documentElement||s.body).scrollTop);if(j||(K+=o.offsetHeight),K<=d.top||K>=d.bottom)return t.close();o.style.top=tt+"px",o.style.left=I+k.left-p.left+"px"}),r.on(o,"dblclick",function(p){var d=$(o,p.target||p.srcElement);d&&d.hintId!=null&&(i.changeActive(d.hintId),i.pick())}),r.on(o,"click",function(p){var d=$(o,p.target||p.srcElement);d&&d.hintId!=null&&(i.changeActive(d.hintId),t.options.completeOnSingleClick&&i.pick())}),r.on(o,"mousedown",function(){setTimeout(function(){n.focus()},20)});var Z=this.getSelectedHintRange();return(Z.from!==0||Z.to!==0)&&this.scrollToActive(),r.signal(e,"select",l[this.selectedHint],o.childNodes[this.selectedHint]),!0}z.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode&&this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm.getInputField();t.removeAttribute("aria-activedescendant"),t.removeAttribute("aria-owns");var e=this.completion.cm;this.completion.options.closeOnUnfocus&&(e.off("blur",this.onBlur),e.off("focus",this.onFocus)),e.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var t=this;this.keyMap={Enter:function(){t.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(t,e){if(t>=this.data.list.length?t=e?this.data.list.length-1:0:t<0&&(t=e?0:this.data.list.length-1),this.selectedHint!=t){var i=this.hints.childNodes[this.selectedHint];i&&(i.className=i.className.replace(" "+w,""),i.removeAttribute("aria-selected")),i=this.hints.childNodes[this.selectedHint=t],i.className+=" "+w,i.setAttribute("aria-selected","true"),this.completion.cm.getInputField().setAttribute("aria-activedescendant",i.id),this.scrollToActive(),r.signal(this.data,"select",this.data.list[this.selectedHint],i)}},scrollToActive:function(){var t=this.getSelectedHintRange(),e=this.hints.childNodes[t.from],i=this.hints.childNodes[t.to],n=this.hints.firstChild;e.offsetTop<this.hints.scrollTop?this.hints.scrollTop=e.offsetTop-n.offsetTop:i.offsetTop+i.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=i.offsetTop+i.offsetHeight-this.hints.clientHeight+n.offsetTop)},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1},getSelectedHintRange:function(){var t=this.completion.options.scrollMargin||0;return{from:Math.max(0,this.selectedHint-t),to:Math.min(this.data.list.length-1,this.selectedHint+t)}}};function ot(t,e){if(!t.somethingSelected())return e;for(var i=[],n=0;n<e.length;n++)e[n].supportsSelection&&i.push(e[n]);return i}function q(t,e,i,n){if(t.async)t(e,n,i);else{var s=t(e,i);s&&s.then?s.then(n):n(s)}}function rt(t,e){var i=t.getHelpers(e,"hint"),n;if(i.length){var s=function(c,o,u){var l=ot(c,i);function f(a){if(a==l.length)return o(null);q(l[a],c,u,function(h){h&&h.list.length>0?o(h):f(a+1)})}f(0)};return s.async=!0,s.supportsSelection=!0,s}else return(n=t.getHelper(t.getCursor(),"hintWords"))?function(c){return r.hint.fromList(c,{words:n})}:r.hint.anyword?function(c,o){return r.hint.anyword(c,o)}:function(){}}r.registerHelper("hint","auto",{resolve:rt}),r.registerHelper("hint","fromList",function(t,e){var i=t.getCursor(),n=t.getTokenAt(i),s,c=r.Pos(i.line,n.start),o=i;n.start<i.ch&&/\w/.test(n.string.charAt(i.ch-n.start-1))?s=n.string.substr(0,i.ch-n.start):(s="",c=i);for(var u=[],l=0;l<e.words.length;l++){var f=e.words[l];f.slice(0,s.length)==s&&u.push(f)}if(u.length)return{list:u,from:c,to:o}}),r.commands.autocomplete=r.showHint;var Y={hint:r.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnPick:!0,closeOnUnfocus:!0,updateOnCursorActivity:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null,paddingForScrollbar:!0,moveOnOverlap:!0};r.defineOption("hintOptions",null)})})();const yt=ft({setup(){let g=U(null),v=U(""),r=U(null),y=!1;const w={value:v.value,lineNumbers:!0,mode:"javascript",theme:"3024-night"};pt(()=>{r=ht(g.value,w),b()});function b(){r.on("changes",(C,S)=>{y=!0,v.value=r.getValue(),setTimeout(()=>{y=!1},50)})}dt(v,(C,S)=>{y||x()});function A(){v.value=`let name = "\u5F20\u4E09"
 function setName() {
 name = "\u674E\u56DB" 
}`}function x(){r.getDoc().setValue(v.value)}return{dom:g,codeData:v,setData:A}}}),wt={class:"layout-container"},Ht={class:"layout-container-table"},bt={ref:"dom"},At={style:{"text-align":"left"}};function xt(g,v,r,y,w,b){const A=et("el-button"),x=et("el-card");return mt(),vt("div",wt,[O("div",Ht,[O("div",bt,null,512),it(x,{class:"box-card"},{header:M(()=>[O("p",At,[nt(" v-model\u7ED3\u679C "),it(A,{style:{float:"right",padding:"3px 0"},type:"text",onClick:g.setData},{default:M(()=>[nt("\u521D\u59CB\u8D4B\u503C")]),_:1},8,["onClick"])])]),default:M(()=>[O("pre",null,gt(g.codeData),1)]),_:1})])])}var kt=ut(yt,[["render",xt],["__scopeId","data-v-5ae9c673"]]);export{kt as default};

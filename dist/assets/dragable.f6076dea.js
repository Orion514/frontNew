import{_ as h,d as b,k as g,r as D,D as w,o as B,c as E,a as d,b as l,w as m,e as p,t as S,G as v,p as C,f as $}from"./index.d795ab4f.js";const A={mounted:(e,t)=>{y(e,t,!1);let s,o,n={down:{x:0,y:0},move:{x:0,y:0}},a=!1;e.__position__={x:0,y:0};let i="text";function u(_){_.button===0&&(n.down={x:_.clientX,y:_.clientY},a=!0,s=e.__parentDom__.getBoundingClientRect(),o=e.getBoundingClientRect(),i=document.querySelector("body").style.userSelect,document.querySelector("body").style.userSelect="none")}function r(_){!a||(n.move={x:_.clientX,y:_.clientY},x())}function f(_){a&&(a=!1,document.querySelector("body").style.userSelect=i)}function x(){const _=n.move.x+o.x-s.x-n.down.x,c=n.move.y+o.y-s.y-n.down.y;_<0?e.__position__.x=0:_>s.width-o.width?e.__position__.x=s.width-o.width:e.__position__.x=_,c<0?e.__position__.y=0:c>s.height-o.height?e.__position__.y=s.height-o.height:e.__position__.y=c,e.style.cssText+=`
        position: absolute;
        z-index: 100;
        left: ${e.__position__.x}px;
        top: ${e.__position__.y}px;
      `}e.__mouseDown__=u,e.__mouseMove__=r,e.__mouseUp__=f,e.addEventListener("mousedown",e.__mouseDown__),document.addEventListener("mousemove",e.__mouseMove__),document.addEventListener("mouseup",e.__mouseUp__)},updated(e,t){y(e,t,!0)},beforeUnmount(e){document.removeEventListener("mousedown",e.__mouseDown__),document.removeEventListener("mousemove",e.__mouseMove__),document.removeEventListener("mouseup",e.__mouseUp__)}};function y(e,t,s){const o=[{name:"father",dom:e.parentElement}];let n;if(t.value){const u=o.find(r=>r.name===t.value);u&&u.dom?n=u.dom:n=document.querySelector(t.value)||o[0].dom||o[1].dom}else n=o[0].dom||o[1].dom;const a=n.getBoundingClientRect(),i=e.getBoundingClientRect();e.__parentDom__&&(e.__parentDom__.style.position="static"),e.__parentDom__=n,e.__parentDom__.style.position="relative",s&&(e.__position__={x:i.x-a.x,y:i.y-a.y},e.style.cssText+=`
      position: absolute;
      z-index: 100;
      left: ${e.__position__.x}px;
      top: ${e.__position__.y}px;
    `)}const F=b({directives:{dragable:A},setup(){let e=g("body");return{dragableFather:e,changeBox:s=>{e.value=s}}}}),R=e=>(C("data-v-74b2ce78"),e=e(),$(),e),M={class:"layout-container"},k={class:"layout-container-table"},L=R(()=>d("p",null,"\u81EA\u7531\u5207\u6362\u7236\u7EA7",-1)),U={class:"box"},q={class:"row"},I={class:"row"};function N(e,t,s,o,n,a){const i=D("el-button"),u=w("dragable");return B(),E("div",M,[d("div",k,[L,l(i,{onClick:t[0]||(t[0]=r=>e.changeBox("father"))},{default:m(()=>[p("father")]),_:1}),l(i,{onClick:t[1]||(t[1]=r=>e.changeBox("body"))},{default:m(()=>[p("body")]),_:1}),l(i,{onClick:t[2]||(t[2]=r=>e.changeBox(".layout-container-table"))},{default:m(()=>[p("\u81EA\u5B9A\u4E49\u7236\u7EA7\u7C7B\u540D\uFF1A.layout-container-table")]),_:1}),d("p",null,"\u7236\u7EA7\uFF1A"+S(e.dragableFather),1),d("div",U,[v(d("div",q,null,512),[[u,e.dragableFather]]),v(d("div",I,null,512),[[u,e.dragableFather]])])])])}var V=h(F,[["render",N],["__scopeId","data-v-74b2ce78"]]);export{V as default};

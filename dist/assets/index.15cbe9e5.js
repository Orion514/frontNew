import{M as C,d as E,L as S,j as $,_ as T,r as n,o as y,q as B,w as o,b as l,c as A,F as U,x as L,e as p,k as w,D as q,a as F,t as h,G as N,H as G,E as V}from"./index.d795ab4f.js";import{a as j,u as z,T as P}from"./table.682e20b6.js";import{P as R}from"./Plus.f8c3dbc2.js";import{D as I}from"./Delete.bb8f3fce.js";import{S as M}from"./Search.2d07627c.js";function H(e){return C({url:"/system/user/list",method:"post",baseURL:"/mock",data:e})}function O(e){return C({url:"/system/user/updateStatus",method:"post",baseURL:"/mock",data:e})}function J(e){return C({url:"/system/user/del",method:"post",baseURL:"/mock",data:e})}const K=E({components:{Layer:S},props:{layer:{type:Object,default:()=>({show:!1,title:"",showButton:!0})}},setup(e,t){return{ruleForm:$({name:""}),rules:{name:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:"blur"}],sort:[{required:!0,message:"\u8BF7\u8F93\u5165\u6570\u5B57",trigger:"blur"}],select:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}],radio:[{required:!0,message:"\u8BF7\u9009\u62E9",trigger:"blur"}]},options:[{value:1,label:"\u8FD0\u52A8"},{value:2,label:"\u5065\u8EAB"},{value:3,label:"\u8DD1\u9177"},{value:4,label:"\u8857\u821E"}]}},methods:{submit(){this.$refs.form.validate(e=>{if(e){let t=this.ruleForm;this.layer.row?this.updateForm(t):this.addForm(t)}else return!1})},addForm(e){j(e).then(t=>{this.$message({type:"success",message:"\u65B0\u589E\u6210\u529F"}),this.layer.show=!1,this.$emit("getTableData",!0)})},updateForm(e){z(e).then(t=>{this.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F"}),this.$emit("getTableData",!1)})}}});function Q(e,t,i,b,c,D){const d=n("el-input"),s=n("el-form-item"),_=n("el-option"),r=n("el-select"),f=n("el-radio"),v=n("el-radio-group"),u=n("el-form"),m=n("Layer",!0);return y(),B(m,{layer:e.layer,onConfirm:e.submit},{default:o(()=>[l(u,{model:e.ruleForm,rules:e.rules,ref:"form","label-width":"120px",style:{"margin-right":"30px"}},{default:o(()=>[l(s,{label:"\u540D\u79F0\uFF1A",prop:"name"},{default:o(()=>[l(d,{modelValue:e.ruleForm.name,"onUpdate:modelValue":t[0]||(t[0]=a=>e.ruleForm.name=a),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue"])]),_:1}),l(s,{label:"\u6570\u5B57\uFF1A",prop:"sort"},{default:o(()=>[l(d,{modelValue:e.ruleForm.sort,"onUpdate:modelValue":t[1]||(t[1]=a=>e.ruleForm.sort=a),oninput:"value=value.replace(/[^\\d]/g,'')",placeholder:"\u53EA\u80FD\u8F93\u5165\u6B63\u6574\u6570"},null,8,["modelValue"])]),_:1}),l(s,{label:"\u9009\u62E9\u5668\uFF1A",prop:"select"},{default:o(()=>[l(r,{modelValue:e.ruleForm.select,"onUpdate:modelValue":t[2]||(t[2]=a=>e.ruleForm.select=a),placeholder:"\u8BF7\u9009\u62E9",clearable:""},{default:o(()=>[(y(!0),A(U,null,L(e.options,a=>(y(),B(_,{key:a.value,label:a.label,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"\u5355\u9009\u6846\uFF1A",prop:"radio"},{default:o(()=>[l(v,{modelValue:e.ruleForm.radio,"onUpdate:modelValue":t[3]||(t[3]=a=>e.ruleForm.radio=a)},{default:o(()=>[l(f,{label:0},{default:o(()=>[p("\u6700\u65B0\u5F00\u64AD")]),_:1}),l(f,{label:1},{default:o(()=>[p("\u6700\u65E9\u5F00\u64AD")]),_:1}),l(f,{label:2},{default:o(()=>[p("\u6700\u591A\u89C2\u770B")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["layer","onConfirm"])}var W=T(K,[["render",Q]]);const X=E({components:{Table:P,Layer:W},setup(){const e=$({input:""}),t=$({show:!1,title:"\u65B0\u589E",showButton:!0}),i=$({index:1,size:20,total:0}),b=w(!0),c=w([]),D=w([]),d=u=>{D.value=u},s=u=>{b.value=!0,u&&(i.index=1);let m={page:i.index,pageSize:i.size,...e};H(m).then(a=>{let g=a.data.list;g.forEach(k=>{k.loading=!1}),c.value=g,i.total=Number(a.data.pager.total)}).catch(a=>{c.value=[],i.index=1,i.total=0}).finally(()=>{b.value=!1})},_=u=>{let m={ids:u.map(a=>a.id).join(",")};J(m).then(a=>{V({type:"success",message:"\u5220\u9664\u6210\u529F"}),s(c.value.length===1)})},r=()=>{t.title="\u65B0\u589E\u6570\u636E",t.show=!0,delete t.row},f=u=>{t.title="\u7F16\u8F91\u6570\u636E",t.row=u,t.show=!0},v=u=>{if(!u.id)return;u.loading=!0;let m={id:u.id,status:u.status};O(m).then(a=>{V({type:"success",message:"\u72B6\u6001\u53D8\u66F4\u6210\u529F"})}).catch(a=>{V({type:"error",message:"\u72B6\u6001\u53D8\u66F4\u5931\u8D25"})}).finally(()=>{u.loading=!1})};return s(!0),{Plus:R,Delete:I,Search:M,query:e,tableData:c,chooseData:D,loading:b,page:i,layer:t,handleSelectionChange:d,getTableData:s,handleDel:_,handleAdd:r,handleEdit:f,handleUpdateStatus:v}}}),Y={class:"layout-container"},Z={class:"layout-container-form flex space-between"},x={class:"layout-container-form-handle"},ee={class:"layout-container-form-search"},ae={class:"layout-container-table"},te={class:"statusName"},le={class:"statusName"};function oe(e,t,i,b,c,D){const d=n("el-button"),s=n("el-popconfirm"),_=n("el-input"),r=n("el-table-column"),f=n("el-switch"),v=n("Table"),u=n("Layer"),m=q("loading");return y(),A("div",Y,[F("div",Z,[F("div",x,[l(d,{type:"primary",icon:e.Plus,onClick:e.handleAdd},{default:o(()=>[p(h(e.$t("message.common.add")),1)]),_:1},8,["icon","onClick"]),l(s,{title:e.$t("message.common.delTip"),onConfirm:t[0]||(t[0]=a=>e.handleDel(e.chooseData))},{reference:o(()=>[l(d,{type:"danger",icon:e.Delete,disabled:e.chooseData.length===0},{default:o(()=>[p(h(e.$t("message.common.delBat")),1)]),_:1},8,["icon","disabled"])]),_:1},8,["title"])]),F("div",ee,[l(_,{modelValue:e.query.input,"onUpdate:modelValue":t[1]||(t[1]=a=>e.query.input=a),placeholder:e.$t("message.common.searchTip")},null,8,["modelValue","placeholder"]),l(d,{type:"primary",icon:e.Search,class:"search-btn",onClick:t[2]||(t[2]=a=>e.getTableData(!0))},{default:o(()=>[p(h(e.$t("message.common.search")),1)]),_:1},8,["icon"])])]),F("div",ae,[N((y(),B(v,{ref:"table",page:e.page,"onUpdate:page":t[3]||(t[3]=a=>e.page=a),showSelection:!0,data:e.tableData,onGetTableData:e.getTableData,onSelectionChange:e.handleSelectionChange},{default:o(()=>[l(r,{prop:"id",label:"Id",align:"center",width:"80"}),l(r,{prop:"name",label:"\u7528\u6237\u540D",align:"center"}),l(r,{prop:"nickName",label:"\u6635\u79F0",align:"center"}),l(r,{prop:"role",label:"\u89D2\u8272",align:"center"}),l(r,{prop:"isAdmin",label:"\u8D85\u7EA7\u7BA1\u7406\u5458",align:"center"},{default:o(a=>[F("span",te,h(a.row.isAdmin===1?"\u662F":"\u5426"),1)]),_:1}),l(r,{prop:"status",label:"\u72B6\u6001",align:"center"},{default:o(a=>[F("span",le,h(a.row.status===1?"\u542F\u7528":"\u7981\u7528"),1),l(f,{modelValue:a.row.status,"onUpdate:modelValue":g=>a.row.status=g,"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0,loading:a.row.loading,onChange:g=>e.handleUpdateStatus(a.row)},null,8,["modelValue","onUpdate:modelValue","loading","onChange"])]),_:1}),l(r,{label:e.$t("message.common.handle"),align:"center",fixed:"right",width:"200"},{default:o(a=>[l(d,{onClick:g=>e.handleEdit(a.row)},{default:o(()=>[p(h(e.$t("message.common.update")),1)]),_:2},1032,["onClick"]),l(s,{title:e.$t("message.common.delTip"),onConfirm:g=>e.handleDel([a.row])},{reference:o(()=>[l(d,{type:"danger"},{default:o(()=>[p(h(e.$t("message.common.del")),1)]),_:1})]),_:2},1032,["title","onConfirm"])]),_:1},8,["label"])]),_:1},8,["page","data","onGetTableData","onSelectionChange"])),[[m,e.loading]]),e.layer.show?(y(),B(u,{key:0,layer:e.layer,onGetTableData:e.getTableData},null,8,["layer","onGetTableData"])):G("",!0)])])}var de=T(X,[["render",oe],["__scopeId","data-v-0655e08f"]]);export{de as default};

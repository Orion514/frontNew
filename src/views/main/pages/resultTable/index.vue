<template>
  <div style="margin: 10px 0 0 10px">
    <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="demo-tabs"
        type="border-card"
    >

      <el-tab-pane label="树形表格" name="table" class="content" >
        <template v-if="activeName === 'table' ">
          <keep-alive>
            <treeTable/>
          </keep-alive>
        </template>


      </el-tab-pane>

      <el-tab-pane label="树形图" name="graph" class="content" >
        <template v-if="activeName === 'graph' ">
          <keep-alive>
            <graph/>
          </keep-alive>
        </template>
      </el-tab-pane>

    </el-tabs>
  </div>

</template>

<script lang="ts">

import treeTable from "@/views/main/pages/resultTable/treeTable/index.vue";
import type { TabsPaneContext} from "element-plus";
import {defineComponent, ref} from "vue";
import graph from "@/views/main/pages/resultTable/graph/index.vue";

export default defineComponent( {
  name: "index",
  components: {
    treeTable,
    graph
  },

  setup() {
    const activeName = ref('table')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    }

    return{
      activeName,
      handleClick
    }
  }
})
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.content{
  width: 100%;
  height: 850px;
}


</style>

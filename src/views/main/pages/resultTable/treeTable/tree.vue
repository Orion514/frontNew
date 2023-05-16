<template>
  <div class="category">
    <div class="header-box">
      <h2>结果树结构</h2>
      <!-- <el-input
        v-model="input"
        placeholder="请输入内容"
        @input="searchData(true)"
      ></el-input> -->
    </div>
    <div class="list system-scrollbar">
      <el-tree
        ref="tree"
        class="my-tree"
        :data="data"
        :props="defaultProps"
        :expand-on-click-node="false"
        node-key="id"
        highlight-current
        default-expand-all
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, ref, inject, nextTick } from "vue";
import { getTree } from "@/api/result";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    let data = ref([]);
    const tree: Ref<any|null> = ref(null)
    const defaultProps = {
      children: "children",
      label: "label",
      dataId: "dataId",
      indexId: "indexId"
    };
    const activeCategory: any = inject('active')

    const store = useStore();

    const getTreeData = () => {
      //todo, 数据是定死的
      const params = {
        groupid: 100,
        sceneid: 1
      }

      // const params = {
      //   groupid: store.state.user.groupid,
      //   sceneid: store.state.user.sceneid
      // };

      getTree(params).then((res) => {
        data.value = res.data.map((node) => {
          return {
            ...node,
            dataId: node.dataId,
            indexId: node.indexId,
          };
        });
        activeCategory.value = res.data[0];
        nextTick(() => {
          // 将dataid和indexid拼接成key，用于设置当前选中的节点
          const key = `${activeCategory.value.dataid}_${activeCategory.value.indexid}`
          tree.value && tree.value.setCurrentKey(key)
        })
      });
    };
    const handleNodeClick = (row: any) => {
      activeCategory.value = row;
    };
    if(store.state.user.groupid === 0){
      ElMessage.error("请先上传数据并启用");
    }else{
      // getTreeData();
    }
    getTreeData();


    return {
      data,
      tree,
      defaultProps,
      handleNodeClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.category {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-box {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    h2 {
      padding: 0;
      margin: 0;
      margin-right: 20px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
    }
    .el-input {
      flex: 1;
    }
  }
  .list {
    flex: 1;
    overflow: auto;
  }
  .my-tree {
    :deep(.el-tree-node__content) {
      height: 36px;
    }
    :deep(.el-tree-node.is-current>.el-tree-node__content) {
      background-color: rgba(64, 158, 255, 0.4);
    }
    :deep(.el-tree-node>.el-tree-node__content) {
      transition: 0.2s;
    }
  }
}
</style>

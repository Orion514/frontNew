<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="name" label="指标名" align="center" />
        <el-table-column prop="weight" label="指标权重" align="center" />
        <el-table-column prop="value" label="指标值" align="center" />

      </Table>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, inject, watch, computed} from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'

import {getData} from '@/api/result'
import {useStore} from 'vuex'

export default defineComponent({
  components: {
    Table,

  },
  setup() {

    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const activeCategory: any = inject('active')
    const loading = ref(true)
    const tableData = ref([])
    const store = useStore()

    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        dataid: activeCategory.value.dataId,
        indexid: activeCategory.value.indexId,
        sceneid: store.state.user.sceneid,
        page: page.index,
        pageSize: page.size,
      }
      console.log(params)
      getData(params)
      .then(res => {
        let data = res.data.list
        if (Array.isArray(data)) {
          data.forEach(d => {
            // const select = selectData.find(select => select.value === d.choose)
            // select ? d.chooseName = select.label : d.chooseName = d.choose
            // const radio = radioData.find(select => select.value === d.radio)
            // radio ? d.radioName = radio.label : d.radio
          })
        }
        tableData.value = res.data.list
        console.log(tableData.value)
        page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
    watch(activeCategory, (newVal) => {
      getTableData(true)
    })

    return {
      tableData,
      loading,
      page,
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
  .layout-container {
    height: 100%;
    margin: 0 0 0 10px;
    width: calc(100% - 10px);
  }
</style>

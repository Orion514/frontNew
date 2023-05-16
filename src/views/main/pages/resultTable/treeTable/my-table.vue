<template>
  <div class="layout-container">
<!--    <div class="layout-container-form flex space-between">-->
<!--      <div class="layout-container-form-handle">-->
<!--&lt;!&ndash;        <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">&ndash;&gt;-->
<!--&lt;!&ndash;          <template #reference>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-popconfirm>&ndash;&gt;-->
<!--      </div>-->
<!--      <div class="layout-container-form-search">-->
<!--&lt;!&ndash;        <el-input v-model="query.input" :placeholder="$t('message.common.searchTip')" @change="getTableData(true)"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ $t('message.common.search') }}</el-button>&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
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
<!--        <el-table-column prop="radioName" label="单选框" align="center" />-->
<!--        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">-->
<!--          <template #default="scope">-->
<!--            <el-button @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>-->
<!--            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">-->
<!--              <template #reference>-->
<!--                <el-button type="danger">{{ $t('message.common.del') }}</el-button>-->
<!--              </template>-->
<!--            </el-popconfirm>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </Table>
<!--      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />-->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, inject, watch, computed} from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'

import {getData} from '@/api/result'
import {useStore} from 'vuex'

import { ElMessage } from 'element-plus'
import type { LayerInterface } from '@/components/layer/index.vue'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import store from 'element-plus/es/components/table/src/store'
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
        page.total = Number(res.data.page.total)
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

<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>
        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
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

        <!-- 使用 v-for 遍历 columns 数组，动态渲染表格列 -->
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" align="center" />

        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button type="warning" @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger" :disabled="chooseData.length">{{ $t('message.common.del') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show"  :columns="columns" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { del } from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import type { LayerInterface } from '@/components/layer/index.vue'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'

import {getTableCols,getDatas, deleteDatas} from "@/api/data";
import store from "@/store";
import { useStore } from 'vuex'

export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    // 存储搜索用的数据
    const query = reactive({
      input: ''
    })
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    let columns = ref([])
    const store = useStore()

    const handleSelectionChange = (val: []) => {
      chooseData.value = val
    }


    // 获取列名数据
    const getTable = (init: boolean) =>{
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        sceneid : store.state.user.sceneid
      }
      getTableCols(params)
        .then(res=>{
          columns.value = res.data
          console.log(columns.value)
      }).catch(error =>{
        console.log(error);
      });
    }


    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        groupid: store.state.user.groupid,
      }
      getDatas(params)
      .then(res => {
        let data = res.data.list
        // console.log(res)
        // console.log(data)
        // if (Array.isArray(data)) {
        //   data.forEach(d => {
        //     const select = selectData.find(select => select.value === d.choose)
        //     select ? d.chooseName = select.label : d.chooseName = d.choose
        //     const radio = radioData.find(select => select.value === d.radio)
        //     radio ? d.radioName = radio.label : d.radio
        //   })
        // }
        ElMessage.success("当前组【" + store.state.user.groupid + "】 的数据如下")
        tableData.value = data
        page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        console.log(error)
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
    // 删除功能
    const handleDel = (data) => {
      let params = {
        ids: data.map((e)=> {
          return e.id
        }).join(','),
        sceneid: store.state.user.sceneid,
      }
      deleteDatas(params)
      .then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTableData(tableData.value.length === 1 ? true : false)
      })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    getTable(true)
    getTableData(true)
    return {
      Plus,
      Search,
      Delete,
      query,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      columns,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      getTable
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

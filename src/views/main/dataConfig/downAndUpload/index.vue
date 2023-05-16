<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>
          </template>
        </el-popconfirm>
        <FileUploader fileType="Excel"  buttonType="primary" :userid="userid" :sceneid="sceneid" />
        <FileUploader fileType="JSON"  buttonType="warning" :userid="userid" :sceneid="sceneid"  />
        <FileUploader fileType="XML"  buttonType="danger" :userid="userid" :sceneid="sceneid"  />
        <FileUploader fileType="SQL"  buttonType="success"  :userid="userid" :sceneid="sceneid" />


        <el-link :underline="true" :href= url.downLoadExcel>
          <el-button type = "primary" :icon="Download" style="margin: 0 5px 0 5px">{{ $t('message.common.downLoadExcel') }}</el-button>
        </el-link>

        <el-link :underline="true" :href= url.downloadJSON>
          <el-button type = 'warning'  :icon="Download" style="margin: 0 5px 0 5px" >{{ $t('message.common.downLoadJSON') }}</el-button>
        </el-link>

        <el-link :underline="true" :href= url.downLoadXml>
          <el-button type = 'danger'  :icon="Download" style="margin: 0 5px 0 5px">{{ $t('message.common.downLoadXml') }}</el-button>
        </el-link>

        <el-link :underline="true" :href= url.downLoadSQL>
          <el-button type = 'success' :icon="Download"  style="margin: 0 5px 0 5px">{{ $t('message.common.downLoadSQL') }}</el-button>
        </el-link>

      </div>
      <div class="layout-container-form-search">
<!--        <el-input v-model="query.input" :placeholder="$t('message.common.searchTip')" @change="getTableData(true)"></el-input>-->
<!--        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ $t('message.common.search') }}</el-button>-->
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
        <el-table-column prop="rows" label="行数" align="center" />
        <el-table-column prop="cols" label="列数" align="center" />
        <el-table-column prop="time" label="上传时间" align="center" />

        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleUse(scope.row)" type="success" :disabled="isButtonDisabled(scope.row)">{{ $t('message.common.use') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t('message.common.del') }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { getData, del } from '@/api/table'
// import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import type { LayerInterface } from '@/components/layer/index.vue'
import { selectData, radioData } from './enum'
import { Plus, Search, Delete, Download } from '@element-plus/icons'
import FileUploader from "@/views/main/dataConfig/downAndUpload/FileUploader.vue";
import {useStore} from 'vuex'
import {userState} from "@/store/modules/user";


export default defineComponent({
  name: 'upload',
  components: {
    FileUploader,
    Table
  },
  setup() {

    const url = reactive({
      downLoadExcel: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/Data1%E6%A8%A1%E6%9D%BF.xlsx',
      downloadJSON: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/Data1%E6%A8%A1%E6%9D%BF.json',
      downLoadXml: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/Data1%E6%A8%A1%E6%9D%BF.xml',
      downLoadSQL: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/Data1%E6%A8%A1%E6%9D%BF.sql'
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
    const store = useStore()

    const userid = (store.state.user as userState).info.id
    const sceneid = store.state.user.sceneid


    const handleSelectionChange = (val: []) => {
      chooseData.value = val
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

      }
      getData(params)
      .then(res => {
        let data = res.data.list
        if (Array.isArray(data)) {
          data.forEach(d => {
            const select = selectData.find(select => select.value === d.choose)
            select ? d.chooseName = select.label : d.chooseName = d.choose
            const radio = radioData.find(select => select.value === d.radio)
            radio ? d.radioName = radio.label : d.radio
          })
        }
        tableData.value = res.data.list
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

    const handleUse = (data: object) => {
      store.commit('user/groupidChange', data.id)
      console.log(data.id)
      ElMessage.success('启用成功')
    }

    const isButtonDisabled = (data: object) => {
      return data.id === store.state.user.groupid
    }

    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        ids: data.map((e:any)=> {
          return e.id
        }).join(',')
      }
      del(params)
      .then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTableData(tableData.value.length === 1 ? true : false)
      })
    }
    // // 新增弹窗功能
    // const handleExcel = () => {
    //   layer.title = '新增数据'
    //   layer.show = true
    //   delete layer.row
    // }
    // // 编辑弹窗功能
    // const handleEdit = (row: object) => {
    //   layer.title = '编辑数据'
    //   layer.row = row
    //   layer.show = true
    // }


    getTableData(true)
    return {
      Plus,
      Search,
      Delete,
      Download,
      tableData,
      chooseData,
      loading,
      page,
      url,
      userid,
      sceneid,
      handleSelectionChange,
      handleDel,
      getTableData,
      handleUse,
      isButtonDisabled,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

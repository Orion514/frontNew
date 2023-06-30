<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
<!--        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">-->
<!--          <template #reference>-->
<!--            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>-->
<!--          </template>-->
<!--        </el-popconfirm>-->

        <FileUploader fileType="JSON"  buttonType="primary" :userid="userid"  @uploadSuccess="getIndexTrees()"/>

        <el-link :underline="true" :href= url.downloadJSON>
          <el-button type = 'warning'  :icon="Download" style="margin: 0 5px 0 5px" >{{ $t('message.common.downLoadJSON') }}</el-button>
        </el-link>

        <el-button type="info" disabled ><b>选择指标体系树</b></el-button>

        <el-select v-model="value" filterable placeholder="Select" style="margin: 0 10px 0 0px">
          <el-option
              v-for="item in scenes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

        <el-button type="success" @click="exchangeScene">切换指标体系</el-button>

        <el-button type="danger" @click="handleDelScene">删除指标体系</el-button>

      </div>

    </div>
    <div class="indexTree">

        <el-tabs
            v-model="activateName"
            @tab-click="handleClick"
            class="demo-tabs "
            type="border-card"
        >
          <el-tab-pane label="树型图" name="tree" >
<!--            <keep-alive>-->
<!--              <template v-if="activateName === 'tree' ">-->
                <div class="chart" style="height: 800px;  margin-top:20px;">
                  <charts  v-if="activateName === 'tree'" :option="options"  ref="chart1" />
                </div>
<!--              </template>-->
<!--            </keep-alive>-->
          </el-tab-pane>

          <el-tab-pane label="旭日图" name="sun" >
<!--            <keep-alive>-->
<!--            <template v-if="activateName === 'sun' ">-->

                <div class="chart" style="height: 800px; margin-top:20px;">
                  <charts v-if="activateName === 'sun'" :option="option2"  ref="chart2" />
                </div>

<!--            </template>-->
<!--            </keep-alive>-->
          </el-tab-pane>


        </el-tabs>

    </div>

<!--    <div class="layout-container-table half" >-->
<!--      <Table-->
<!--          ref="table"-->
<!--          v-model:page="page"-->
<!--          v-loading="loading"-->
<!--          :showIndex="true"-->
<!--          :showSelection="true"-->
<!--          :data="tableData"-->
<!--          @getTableData="getTableData"-->
<!--          @selection-change="handleSelectionChange"-->
<!--      >-->
<!--        <el-table-column prop="rows" label="行数" align="center" />-->
<!--        <el-table-column prop="cols" label="列数" align="center" />-->
<!--        <el-table-column prop="time" label="上传时间" align="center" />-->

<!--        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">-->
<!--          <template #default="scope">-->
<!--            <el-button @click="handleUse(scope.row)" type="success" :disabled="isButtonDisabled(scope.row)">{{ $t('message.common.use') }}</el-button>-->
<!--            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">-->
<!--              <template #reference>-->
<!--                <el-button type="danger">{{ $t('message.common.del') }}</el-button>-->
<!--              </template>-->
<!--            </el-popconfirm>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </Table>-->
<!--    </div>-->

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { del} from '@/api/group'
import { ElMessage } from 'element-plus'
import { Plus, Search, Delete, Download } from '@element-plus/icons'
import FileUploader from "@/views/main/scene/manage/FileUploader.vue";
import {useStore} from 'vuex'
import {userState} from "@/store/modules/user";
import charts from "@/components/charts/index.vue";
import {getTreeChartData} from "@/api/charts";
import {generateSunOptions, generateTreeStructureOptions} from "@/views/main/echarts/options/tree";
import {deleteScene, getIndexTree} from "@/api/indexTree";
import graph from "@/views/main/pages/resultTable/graph/index.vue";

export default defineComponent({
  name: 'upload',
  components: {
    graph,
    charts,
    FileUploader,
    Table
  },
  setup() {
    const value = ref('')
    const scenes = ref([])
    const store = useStore()
    // if(store.state.user.sceneid == -1){
    //   store.commit('user/sceneidChange',1)
    // }
    const options = ref({})
    const option2 = ref({})

    const url = reactive({
      downloadJSON: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/indexTree%E6%A8%A1%E6%9D%BF.json',
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
    const userid = (store.state.user as userState).info.id
    const sceneid = store.state.user.sceneid

    value.value = store.state.user.sceneid


    const activateName = ref('tree')
    const handleClick = () => {
      this.$nextTick(() =>{
        echarts.getInstanceByDom(this.$refs.chart1).resize()
        echarts.getInstanceByDom(this.$refs.chart2).resize()
      })
    }




    // 获取所有的指标体系数据
    const getIndexTrees = async () => {
      try{
        let params = {
          userid: userid
        }
        const res = await getIndexTree(params);
        scenes.value = res.data;
        if(res.data.length > 0){
          value.value = res.data[0].value,
          store.commit('user/sceneidChange', Number( value.value ))
          fetchData()
        }
      }catch (error){
        console.log(error)
        ElMessage.error(error);
      }
    }


    // 切换场景
    const exchangeScene = async() => {
      try{
        store.commit('user/sceneidChange', Number( value.value ))
        fetchData()
      }catch (error){
        console.log(error)
        ElMessage.error(error);
      }
    }

    // 获取指标体系树数据
    const fetchData = async () => {
      try {
        let params = {
          sceneid: Number(value.value)
        }
        const response = await getTreeChartData(params);
        const data = response.data;

        let option1Data = processTree(data);

        let option2Data = flattenTree(option1Data);

        colorList(option2Data)

        options.value = generateTreeStructureOptions(option1Data); // 更新 options 的值

        option2.value = generateSunOptions(option2Data);  // 更新option2的值
        console.log('options', options)
        console.log('option2', option2)

        ElMessage.success("切换成功，指标体系树如下");
      } catch (error) {
        console.log(error);
      }
    };
    getIndexTrees()

    function flattenTree(obj) {
      const result = [];
      for (const child of obj.children) {
        const node = { ...child };
        result.push(node);
      }
      return result;
    }

    function colorList(list){
      for(const node of list){
        node.itemStyle = {
          color: getRandomColor()
        }
        if(node.children && node.children.length > 0){
          colorList(node.children)
        }
      }
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


    function processTree(node) {
      // 对当前节点进行处理
      let processedNode = {
        name: node.name,
        value: node.weight,
        children: []
      };

      // 递归处理子节点
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          let processedChild = processTree(child);
          processedNode.children.push(processedChild);
        });
      }

      return processedNode;
    }



    const handleDelScene =  async () => {
      try{
        let params = {
          sceneid: Number(value.value)
        }
        const res = await deleteScene(params)
        await getIndexTrees()
        ElMessage.success(res.msg)
        await fetchData()
      }catch (error){
        ElMessage.error(error)
        console.log(error)
      }
    }

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
        userid: userid,
        sceneid: sceneid,
      }
    }


    const handleUse = (data: object) => {
      store.commit('user/groupidChange', data.id)
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
      activateName,
      options,
      option2,
      scenes,
      value,
      tableData,
      chooseData,
      loading,
      page,
      url,
      userid,
      sceneid,
      fetchData,
      exchangeScene,
      handleSelectionChange,
      handleDelScene,
      handleDel,
      getTableData,
      handleUse,
      isButtonDisabled,
      getIndexTrees,
      handleClick,
    }
  }
})
</script>

<style lang="scss" scoped>
.half{
  width: 45%;
}
.indexTree{
  weight: 100%;
  margin-top: 20px;
}
.chart{
  width: 100%;
  height: 100%;
  min-width: 200px; /* 设置最小宽度 */
  min-height: 200px; /* 设置最小高度 */
}

</style>

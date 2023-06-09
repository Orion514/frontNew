<template>
  <div class="layout-container" v-loading = "loading">
    <article>
      <!--   方差解释表格   -->
      <h1>{{data.varianceTable}}</h1>
      <el-card class="box-card">
        <el-table :data="varianceData">
          <el-table-column v-for='(item,index) in varianceHeader' :key="item" :label="item">
            <template #default="{row}">
              {{ row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <p>{{data.varianceTableAnalysis}}</p>
      <br><br>

      <!--   碎石图   -->
      <h1>{{data.screePlot}}</h1>
      <!--   用echarts画   -->
      <div class="chart" style="height: 500px" >
        <charts v-if="option" :option="option"  class="chart" />
      </div>
      <p>{{data.screePlotAnalysis}}</p>
      <br><br>

      <!--   权重表   -->
      <h1>{{data.weightTable}}</h1>
      <el-card class="box-card">
        <el-table :data="weightData">
          <el-table-column v-for='(item,index) in weightHeader' :key="item" :label="item">
            <template #default="{row}">
              {{ row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <p>{{data.weightTableAnalysis}}</p>
      <br><br>



      <!--   成分矩阵表   -->
      <h1>{{data.compositionTable}}</h1>
      <el-card class="box-card">
        <el-table :data="compositionData">
          <el-table-column v-for='(item,index) in compositionHeader' :key="item" :label="item">
            <template #default="{row}">
              {{ row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <p>{{data.compositionTableAnalysis}}</p>
      <br><br>



      <!--   优化前后对比表   -->
      <h1>{{data.comparisonTable}}</h1>
      <el-card class="box-card">
        <el-table :data="comparisonData">
          <el-table-column v-for='(item,index) in comparisonHeader' :key="item" :label="item">
            <template #default="{row}">
              {{ row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <p>{{data.comparisonTableAnalysis}}</p>
      <br><br>



    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {optimization} from "@/api/optimization";
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";
import charts from "@/components/charts/index.vue";
import { generateScreePlotOptions } from '@/views/main/echarts/options/tree';


export default defineComponent({
  components: {charts},
  setup() {
    const loading = ref(true)
    let data = ref({})
    const store = useStore()
    let varianceHeader = ref([])
    let varianceData = ref([])
    let weightHeader = ref([])
    let weightData = ref([])
    let compositionHeader = ref([])
    let compositionData = ref([])
    let comparisonHeader = ref([])
    let comparisonData = ref([])
    const option = ref({})

    const optimize = () => {
      loading.value = true
      let params = {
        groupid : store.state.user.groupid,
        algorithm : "PCA.py"
      }
      optimization(params)
        .then(res=>{
          data.value = res.data
          varianceHeader.value = res.data.varianceTableInfo[0]
          varianceData.value = res.data.varianceTableInfo.slice(1)
          weightHeader.value = res.data.weightTableInfo[0]
          weightData.value = res.data.weightTableInfo.slice(1)
          compositionHeader.value = res.data.compositionTableInfo[0]
          compositionData.value = res.data.compositionTableInfo.slice(1)
          compositionHeader.value = res.data.compositionTableInfo[0]
          compositionData.value = res.data.compositionTableInfo.slice(1)
          comparisonHeader.value = res.data.comparisonTableInfo[0]
          comparisonData.value = res.data.comparisonTableInfo.slice(1)

          // 根据eigenvalue数量生成一个向量
          let x = Array.from({ length: res.data.eigenvalue.length }, (_, index) => index + 1)

          option.value=generateScreePlotOptions(x,res.data.eigenvalue,res.data.screePlot)

          ElMessage.success("分析成功")
      }).catch(error => {
        ElMessage.error("算法出错")
        console.log(error)
      }).finally(() => {
        loading.value = false
      })
    }

    optimize()

    return{
      loading,
      option,
      data,
      varianceHeader,
      varianceData,
      weightHeader,
      weightData,
      compositionHeader,
      compositionData,
      comparisonHeader,
      comparisonData,
      optimize
    }
  }
})
</script>

<style lang="scss" scoped>
article {
  padding: 20px 50px;
  text-align: left;
  ol {
    li {
      line-height: 30px;
    }
  }
}

.box-card {
  .card-header{
    text-align: left;
  }
  .box {
    .item {
      display: flex;
      align-items: center;
      * {
        margin-right: 20px;
      }
    }
  }
}

</style>

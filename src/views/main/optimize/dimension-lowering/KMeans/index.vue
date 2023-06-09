<template>
  <div class="layout-container" v-loading = "loading">
    <article>

      <!--   手肘图   -->
      <op-chart :title="data.elbowDiagram" :option="option1" :analysis="data.elbowDiagramAnalysis" />

      <!--   聚类汇总表   -->
      <opTable :data="clusterData" :title="data.clusterTable" :analysis="data.clusterTableAnalysis" :header="clusterHeader"/>

      <!--   聚类汇总图   -->
      <op-chart :title="data.fanChart" :option="option2" :analysis="data.fanChartAnalysis" />

      <!--   聚类结果对比表   -->
      <opTable :data="comparisonData" :title="data.comparisonTable" :analysis="data.comparisonTableAnalysis" :header="comparisonHeader"/>


    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {optimization} from "@/api/optimization";
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";
import charts from "@/components/charts/index.vue";
import {generateElbowOptions, generateFanOptions, generateScreePlotOptions} from '@/views/main/echarts/options/tree';
import opTable from '@/components/opTable/index.vue'
import opChart from "@/components/opChart/index.vue";


export default defineComponent({
  components: {charts,opTable,opChart},
  setup() {
    const loading = ref(true)
    let data = ref({})
    const store = useStore()
    let clusterHeader = ref([])
    let clusterData = ref([])
    let comparisonHeader = ref([])
    let comparisonData = ref([])
    const option1 = ref({})
    const option2 = ref({})

    const optimize = () => {
      loading.value = true
      let params = {
        groupid : store.state.user.groupid,
        algorithm : "k_means.py"
      }
      optimization(params)
          .then(res=>{
            data.value = res.data
            clusterHeader.value = res.data.clusterTableInfo[0]
            clusterData.value = res.data.clusterTableInfo.slice(1)

            comparisonHeader.value = res.data.comparisonTableInfo[0]
            comparisonData.value = res.data.comparisonTableInfo.slice(1)

            // 根据elbowArray数量生成一个向量
            let x = Array.from({ length: res.data.elbowArray.length }, (_, index) => index + 1)
            option1.value=generateElbowOptions(x,res.data.elbowArray,res.data.elbowDiagram)


            // var tulidata =[]
            // for(var i = 1; i <= res.data.elbowArray.length; i++){
            //   tulidata.push('成分'+i)
            // }

            var tulidata = Array.from({length: res.data.fanvalues.length}, (_, i) => '成分' + (i + 1));
            var fanData = res.data.fanvalues.map(function (value,index){
              return {
                value: value,
                name: '成分' + (index + 1)
              }
            })
            option2.value=generateFanOptions(tulidata,fanData,res.data.fanChart)

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
      option1,
      option2,
      data,
      clusterHeader,
      clusterData,
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

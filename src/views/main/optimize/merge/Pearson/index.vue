<template>
  <div class="layout-container" v-loading = "loading">
    <article>

      <!--   热力图   -->
      <op-chart :title="data.hotPicture" :option="option" :analysis="data.correlationTableAnalysis"/>

      <!--   相关系数表   -->
      <opTable :data="correlationData" :title="data.correlationTable" :analysis="data.correlationTableAnalysis" :header="correlationHeader"/>

      <!--   优化前后对比表   -->
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
import {generateHotMapOptions} from '@/views/main/echarts/options/tree';
import opTable from '@/components/opTable/index.vue'
import opChart from "@/components/opChart/index.vue";


export default defineComponent({
  components: {charts,opTable,opChart},
  setup() {
    const loading = ref(true)
    let data = ref({})
    const store = useStore()
    let comparisonHeader = ref([])
    let comparisonData = ref([])
    let correlationHeader = ref([])
    let correlationData = ref([])
    const option = ref({})

    const optimize = () => {
      loading.value = true
      let params = {
        groupid : store.state.user.groupid,
        algorithm : "pearson.py"
      }
      optimization(params)
          .then(res=>{
            data.value = res.data
            correlationHeader.value = res.data.correlationTableInfo[0]
            correlationData.value = res.data.correlationTableInfo.slice(1)

            comparisonHeader.value = res.data.comparisonTableInfo[0]
            comparisonData.value = res.data.comparisonTableInfo.slice(1)

            let x = res.data.xhotP
            let y = res.data.yhotP
            // let hotData1 = res.data.hotPictureInfo.map(function (item) {
            //   return item.map(function (subItem) {
            //     return Number(subItem).toFixed(3)
            //   })
            // })

            let hotData1 = res.data.hotPictureInfo.map(item => item.map(parseFloat).map(value => +value.toFixed(3)));

            option.value=generateHotMapOptions(x,y,hotData1,res.data.hotPicture)


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
      correlationHeader,
      correlationData,
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

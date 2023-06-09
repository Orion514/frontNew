<template>
  <div class="layout-container" v-loading = "loading">
    <article>
      <!--   权重结果表   -->
      <opTable :data="weightData" :title="data.weightTable" :analysis="data.weightTableAnalysis" :header="weightHeader"/>

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
    let weightHeader = ref([])
    let weightData = ref([])

    const optimize = () => {
      loading.value = true
      let params = {
        groupid : store.state.user.groupid,
        algorithm : "entropyWeight.py"
      }
      optimization(params)
          .then(res=>{
            data.value = res.data
            weightHeader.value = res.data.weightTableInfo[0]
            weightData.value = res.data.weightTableInfo.slice(1)

            comparisonHeader.value = res.data.comparisonTableInfo[0]
            comparisonData.value = res.data.comparisonTableInfo.slice(1)


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
      data,
      weightHeader,
      weightData,
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

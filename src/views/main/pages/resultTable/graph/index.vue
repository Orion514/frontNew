<template>
  <div class="full">
    <div class="left">
      <category />
    </div>

    <div class="content"  >
      <div class="layout-container">
        <el-card>
          <div class="chart" style="height: 700px; " v-loading = "loading">
            <charts v-if="option" :option="option"  class="chart" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, provide, watch} from 'vue'
import Category from './category.vue'
import charts from '@/components/charts/index.vue'
import {getResultTreeChartData, getTreeChartData} from "@/api/charts";
import {generateResultTreeOptions} from "@/views/main/echarts/options/tree";
import {ElMessage} from "element-plus/es";
import {useStore} from "vuex";

export default defineComponent({
  name: 'categoryTable',
  components: {
    Category,
    charts,
  },
  setup() {
    let active: any = ref({})
    provide('active', active)

    const option = ref({})
    const store = useStore()
    const loading = ref(true)

    // 得到数据
    const fetchData = async () => {
      try {
        loading.value = true
        const parms ={
          dataid: active.value.dataid,
          sceneid: store.state.user.sceneid,
        }
        const response = await getResultTreeChartData(parms);
        const data = response.data;
        option.value = generateResultTreeOptions(data, active.value.dataid); // 更新 options 的值
        ElMessage.success("切换数据成功,计算图如下");
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false
      }
    };
    // fetchData()

    watch(active, (newVal) => {
      fetchData()
    })

    return{
      option,
      loading
    }
  }

})



</script>




<style lang="scss" scoped>
  .full {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    .left {
      width: 250px;
    }
    .content {
      flex: 1;
      width: calc(100% - 250px);
      height: 100%;
    }
  }
  .chart {
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    padding: 30px;
  }
  .box {
    margin: 20px auto 0;
    width: calc(100% - 40px);
    height: 400px;
    background: var(--system-page-background);
    padding: 20px 20px 10px;
    overflow: hidden;
  }
</style>

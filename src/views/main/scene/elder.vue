<template>
  <div class="layout-container">
    <div class="chart">
      <charts v-if="options" :option="options"  />
    </div>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import { ElMessage } from "element-plus";
import charts from "@/components/charts/index.vue"
import {generateTreeOptions} from "@/views/main/echarts/options/tree";
import {getTreeChartData} from "@/api/charts"


export default defineComponent({
  name: "elder",
  components: {charts},
  setup(){
    const store = useStore()
    store.commit('user/sceneidChange',1)

    const options = ref({})

    const fetchData = async () => {
      try {
        const response = await getTreeChartData();
        const data = response.data;
        console.log(data);
        options.value = generateTreeOptions(data); // 更新 options 的值
        console.log(options.value);
        ElMessage.success("切换成功，指标体系树如下");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData()

    return{
      options
    }
  }

})

</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

</style>

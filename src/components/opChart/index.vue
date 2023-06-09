<template>
  <div>
    <h1>{{ title }}</h1>
    <el-card>
      <div class="chart" style="height: 500px">
        <charts v-if="option" :option="option"  class="chart" ref = "chartContainer" />
      </div>
    </el-card>
    <p>{{ analysis }}</p>
    <br><br>
  </div>
</template>

<script>
import charts from "@/components/charts/index.vue";
import {ElMessage} from "element-plus";

export default {
  components: {charts},
  props: {
    title: {
      type: String,
      required: true
    },
    analysis: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      chartInitialized: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initializeChart);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.initializeChart);
  },
  methods: {
    initializeChart() {
      const rect = this.$refs.chartContainer.getBoundingClientRect();
      const distanceFromTop = rect.top;

      if (distanceFromTop <= window.innerHeight - 100 && !this.chartInitialized) {
        ElMessage.success("加载")
        const myChart = echarts.init(this.$refs.chartContainer);
        myChart.setOption(this.option);
        this.chartInitialized = true;
      }
    }
  }
};
</script>

<style scoped>

</style>

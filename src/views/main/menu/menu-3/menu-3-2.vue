<template>
  <div className="layout-container">
    <div ref="dom" className="chart"></div>
  </div>
</template>

<script lang="ts">
import type {Ref} from 'vue'
import {defineComponent, onBeforeUnmount, onMounted, ref} from 'vue'
import {useEventListener} from '@vueuse/core' //引入监听函数，监听在vue实例中可自动销毁，无须手动销毁
import * as echarts from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  PieChart,
  TreeChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components'

// 引入options配置
import options2 from './options/tree2'

export default defineComponent({
  setup() {
    const dom: Ref<HTMLDivElement> = ref(null) as any
    let myEchart: echarts.ECharts | null = null
    onMounted(() => {
      echarts.use([TitleComponent, TooltipComponent, GridComponent, PieChart, LegendComponent, ToolboxComponent, CanvasRenderer])
      myEchart = echarts.init(dom.value)
      myEchart.setOption(options2)
      useEventListener("resize", () => myEchart!.resize())
    })
    onBeforeUnmount(() => {
      myEchart?.dispose();
    });
    return {
      dom
    }
  }
})
</script>


<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}

.box-card {
  height: 900px;
  margin-top: 20px;

  .card-header {
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

    .my-item {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;

      p {
        margin-top: 10px;
      }
    }
  }
}

.box {
  padding: 15px;
}
</style>

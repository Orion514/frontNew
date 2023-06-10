<template>
  <div class="box">
    <el-card>
      <el-image :src="url"/>
    </el-card>

<!--    <basic-template />-->
<!--    <Card />-->
<!--    <Charts />-->
<!--    <Communication />-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import basicTemplate from './components/basic-template.vue'
import Communication from './components/communication.vue'
import Card from './components/card/index.vue'
import Charts from './components/charts/index.vue'
export default defineComponent({
  components: {
    Card,
    Charts,
    basicTemplate,
    Communication,
  },
  data(){
    return {
      url: 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/%E9%A6%96%E9%A1%B5.jpg'
    }
  }
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>

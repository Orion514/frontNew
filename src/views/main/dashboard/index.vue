<template>
  <div class="box">
    <el-card>
      <el-image :src="imgUrl"/>
    </el-card>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

  setup(){
    let imgUrl = 'https://sedesign.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF/%E9%A6%96%E9%A1%B5.jpg'

    return{
      imgUrl,
    }
  },
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>



<template>
  <div>
    <h1>{{ title }}</h1>
    <el-card class="box-card">
      <el-table :data="data">
        <el-table-column v-for="(item, index) in header" :key="item" :label="item">
          <template #default="{ row }">
            {{ row[index] }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <p>{{ analysis }}</p>
    <br><br>
  </div>
</template>


<script>
export default {
  props: {
    title:{
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    header: {
      type: Array,
      required: true,
    },
    analysis : {
      type: String,
      required: true,
    }
  },
};
</script>


<style scoped lang="scss">

</style>

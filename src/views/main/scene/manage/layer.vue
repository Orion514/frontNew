<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="叶子结点指标权重" prop="number">
        <el-input v-model="form.number" @input="handleInput" placeholder="只能输入正数"></el-input>
      </el-form-item>
      <el-form-item label="叶子结点指标名称" prop="name" placeholder="请输入名称">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { add, update } from '@/api/table'
import { selectData, radioData } from './enum'
import Layer from '@/components/layer/index.vue'
export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const ruleForm = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    let form = ref({
      name: '',
      number: '',
    })
    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      number: [{required: true, message: '请输入权重', trigger: 'blur'}]
    }
    console.log(rules)
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
      } else {

      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      radioData
    }
  },
  methods: {
    handleInput() {
      const pattern = /^\d*\.?\d*$/
      if (!pattern.test(this.form.number)) {
        this.form.number = ''
      }
    },
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form
            if (this.layer.row) {
              this.updateForm(params)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      add(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$emit('getTableData', true)
            this.layerDom && this.layerDom.close()
          })
    },
    // 编辑提交事件
    updateForm(params: object) {
      update(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$emit('getTableData', false)
            this.layerDom && this.layerDom.close()
          })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

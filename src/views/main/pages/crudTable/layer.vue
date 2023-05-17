<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form  :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item  v-for="column in columns" :key="column.prop" :label="column.label" :prop="column.prop" >
        <el-input  v-model="form[column.prop]" placeholder="请输入相应权重"></el-input>
      </el-form-item>

    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import {reactive, Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import { add, update } from '@/api/table'
import { selectData, radioData } from './enum'
import Layer from '@/components/layer/index.vue'
import {ElMessage} from "element-plus";
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
    },
    columns: {
      type: Array,
    },
  },
  setup(props, ctx) {
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)

    const form = ref({})
    const rules = ref([])


    //根据columns 数组动态生成form和rules

    for (const column of props.columns) {
      form.value[column.prop] = '';
      rules.value[column.prop] = [{
        required: true,
        message: `请输入${column.label}`,
        trigger: 'blur',
        prop: column.prop,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入' + column.label));
          } else {
            if (Number(value) < 0 || Number(value) > 1) {
              callback(new Error('请输入0-1之间的数字'));
            } else {
              callback();
            }
          }
        }
      }]
    }

    // 定义用于验证权重加和的方法
    function validateWeightSum() {
      const sum = Object.values(form.value).reduce((acc, val) => acc + Number(val), 0)
      console.log('sum', sum)
      return Math.abs(sum - 1) < 1e-5
    }
    rules.value.push({ validator: validateWeightSum, trigger: 'submit' })

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
      radioData,
      validateWeightSum
    }
  },
  methods: {
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
            ElMessage.error('表单有错')
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

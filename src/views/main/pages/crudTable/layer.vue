<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" ref="ruleForm" rules="rules" label-width="120px" style="margin-right:30px;">
      <el-form-item v-for="(value, key) in rowData" :key="value" :label="key">
        <el-input v-model="form[key]" :model-value="computedValue(key)"></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import {defineComponent, reactive, ref} from 'vue'
import { add, update } from '@/api/pages/crudeTable'
import Layer from '@/components/layer/index.vue'
import store from '@/store'


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
  },
  setup(props, ctx) {
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    let rules = ref({})
    let form = ref({})
    let rowData = ref({})
    let isUpdate = true
    init()
    function init() { // 用于判断新增还是编辑功能
      if (props.layer.isUpdate) {
        rowData.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
        console.log('更新')
        console.log()
        isUpdate = true
      } else {
        console.log('增加')
        isUpdate = false
        rowData.value = JSON.parse(JSON.stringify(props.layer.row))
        //错误的
        // rowData.value = JSON.parse(JSON.stringify(props.layer.row))
        // for (let key in rowData) {
        //   rowData.value[key] = {};
        // }
        // console.log(rowData.value)
      }
    }
    return {
      rules,
      layerDom,
      ruleForm,
      rowData,
      form
    }
  },
  methods: {

    generateRules() {
      const rules = {};
      // 遍历 rowData 对象，为每个表单字段生成验证规则
      for (const key in this.rowData) {
        if (Object.prototype.hasOwnProperty.call(this.rowData, key)) {
          rules[key] = [
            {
              required: true,
              message: `${key}不能为空`,
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                if (/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
                  callback();
                } else {
                  callback(new Error('请输入正确的数字，且最多只能保留两位小数！'));
                }
              },
              trigger: 'blur',
            },
          ];
        }
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
  },
  computed: {
    computedValue() {
      return (key) => {
        return this.isUpdate ? this.rowData[key] : '';
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>

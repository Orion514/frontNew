<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item required label="用户名" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item  required label="邮箱：" prop="email">
        <el-input v-model="form.email"  placeholder="请输入邮箱"></el-input>
      </el-form-item>
			<el-form-item required label="角色：" prop="role">
			  <el-select  v-model="form.role" placeholder="请选择" clearable>
					<el-option v-for="item in roleData" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { roleData } from './enum'
import Layer from '@/components/layer/index.vue'
import {updateUser} from "@/api/user";

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
    const ruleForm= ref(null)
    const layerDom = ref(null)
    let form = ref({
      name: ''
    })

    const rules = {
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      email: [{ required: true, message: '请输入正确的邮箱格式',  validator: checkEmail, trigger: 'blur'}],
      role: [{ required: true, message: '请选择', trigger: 'blur' }],
    }

    function  checkEmail (rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }


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
      roleData,
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
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params) {
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
    updateForm(params) {
      updateUser(params)
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

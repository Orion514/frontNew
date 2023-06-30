<template>
  <div class="container">
    <div class="box">
      <h1>找回密码</h1>
      <el-form class="form" :model="form" :rules="rules" ref="ruleForm">
<!--        <el-input-->
<!--            size="large"-->
<!--            v-model="form.name"-->
<!--            placeholder="用户名"-->
<!--            type="text"-->
<!--            maxlength="50"-->
<!--        >-->
<!--          <template #prepend>-->
<!--            <i class="sfont system-xingmingyonghumingnicheng"></i>-->
<!--          </template>-->
<!--        </el-input>-->


        <el-input
            size="large"
            v-model="form.email"
            placeholder="邮箱"
            type="text"
            maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-xingmingyonghumingnicheng"></i>
          </template>
        </el-input>

        <el-input
            size="large"
            v-model="form.code"
            placeholder="验证码"
            type="text"
            maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-xingmingyonghumingnicheng"></i>
          </template>
          <template #append>
            <el-button type="primary" @click="getCode" size="medium" >获取验证码</el-button>
          </template>
        </el-input>

        <el-input
            size="large"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-mima"></i>
          </template>
          <template #append>
            <i class="sfont password-icon" :class="passwordType ? 'system-yanjing-guan': 'system-yanjing'" @click="passwordTypeChange"></i>
          </template>
        </el-input>

        <el-input
            size="large"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-mima"></i>
          </template>
          <template #append>
            <i class="sfont password-icon" :class="passwordType ? 'system-yanjing-guan': 'system-yanjing'" @click="passwordTypeChange"></i>
          </template>
        </el-input>


        <el-button type="primary" @click="handleRegister" style="width:100%;" size="medium" >确定</el-button>
        <router-link style='margin-top: 10px ; float: right ;color: #666666' to='/login' >前往登录</router-link>
      </el-form>
    </div>
  </div>
</template>

<script >
import {defineComponent, reactive, ref} from 'vue'
import {getAuthCode, register} from '@/api/user'
import { ElMessage } from 'element-plus'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import md5 from 'js-md5'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const form = reactive({
      name: '',
      password: '',
      email: '',
      code: ''
    })

    const passwordType = ref('password')
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    }
    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.name === '') {
          ElMessage.warning({
            message: '用户名不能为空',
            type: 'warning'
          });
          return;
        }
        if (form.password === '') {
          ElMessage.warning({
            message: '密码不能为空',
            type: 'warning'
          })
          return;
        }

        if(checkEmail(form.email) === false){
          ElMessage.warning({
            message: '邮箱格式不正确',
            type: 'warning'
          })
          return;
        }

        resolve(true)
      })
    }
    function  checkEmail (value) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      console.log(value)
      if (!value) {
        return false
      }
      return mailReg.test(value)
      setTimeout(() => {
        if (mailReg.test(value)) {
          return true
        } else {
          return false
        }
      }, 100)

    }

    const getCode = () => {
      if (form.email === '') {
        ElMessage.warning({
          message: '邮箱不能为空',
          type: 'warning'
        })
        return;
      }
      if(checkEmail(form.email) === false){
        ElMessage.warning({
          message: '邮箱格式不正确',
          type: 'warning'
        })
        return;
      }
      let params = {
        email: form.email
      }
      ElMessage.success('发送')
      // getAuthCode(params)
      ElMessage.success('发送')
      getAuthCode(params)
          .then(res => {
            if (res.code === 200) {
              ElMessage.success({
                message: '验证码已发送',
                type: 'success',
                showClose: true,
                duration: 1000
              })
            }
          })

    }

    const handleRegister = () => {
      checkForm()
          .then(() => {
            let params = {
              name: form.name,
              password: md5(form.password),
              email: form.email,
              code: form.code,
            }
            register(params)
                .then(res => {
                  if (res.code === 200) {
                    ElMessage.success({
                      message: '注册成功',
                      type: 'success',
                      showClose: true,
                      duration: 1000
                    })
                  }
                })
          })
    }
    return {
      form,
      passwordType,
      passwordTypeChange,
      handleRegister,
      getCode
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eef0f3;
  .box {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 480px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1), 0 16px 24px 2px rgba(117, 117, 117, 0.14);
    h1 {
      margin-top: 80px;
      text-align: center;
    }
    .form {
      width: 80%;
      margin: 50px auto 15px;
      .el-input {
        margin-bottom: 20px;
      }
      .password-icon {
        cursor: pointer;
        color: #409EFF;
      }
    }
    .fixed-top-right {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
@media screen and ( max-width: 750px ) {
  .container .box {
    width: 100vw;
    height: 100vh;
    box-shadow: none;
    left: 0;
    top: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin-top: 0;
    }
    .form {

    }
  }
}
</style>

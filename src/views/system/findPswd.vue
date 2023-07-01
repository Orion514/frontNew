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
            <el-button type="primary" :disabled='btnBoolean' @click="handleSendAuthCode" size="medium" >{{sendEmailBtn}}</el-button>
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
            v-model="form.passwordCheck"
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


        <el-button type="primary" @click="handleSubmit" style="width:100%;" size="medium" >确定</el-button>
        <router-link style='margin-top: 10px ; float: right ;color: #666666' to='/login' >前往登录</router-link>
      </el-form>
    </div>
  </div>
</template>

<script >
import {defineComponent, reactive, ref} from 'vue'
import {changeUserPwd, getAuthCode, register} from '@/api/user'
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
      password: '',
      email: '',
      code: '',
      passwordCheck:''
    })
    let btnBoolean = false;
    let countDown = null;
    let EmailTimer = null;
    const sendEmailBtn = ref('获取验证码')


    const passwordType = ref('password')
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    }
    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.password === '' || form.passwordCheck === '') {
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

        if (form.password !== form.passwordCheck) {
          ElMessage.warning({
            message: '两次密码不一致',
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
    }

    const handleSendAuthCode = () => {
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
      getAuthCode(form.email)
          .then(res => {
            countDown = 60
            console.log(res)
            if(res.code !== 200){
              ElMessage.error(res.msg)
              return
            }
            ElMessage.success('发送成功请注意查收')
            btnBoolean = true
            sendEmailBtn.value = '重新获取(' + countDown + ')'
            EmailTimer = setInterval(() => {
              console.log(countDown)
              if (countDown === 1) {
                clearInterval(EmailTimer)
                sendEmailBtn.value = '重新获取'
                btnBoolean = false
                return
              }
              countDown--
              sendEmailBtn.value = '重新获取(' + countDown + ')'
            }, 1000)
          })
    }

    const handleSubmit = () => {
      checkForm()
          .then(() => {
            let params = {
              password: md5(form.password),
              email: form.email,
              emailAuthCode: form.code,
            }
            changeUserPwd(params).then(res => {
              if (res.code === 200) {
                ElMessage.success({
                  message: '密码修改成功，即将跳转到登录页面',
                  type: 'success',
                  showClose: true,
                  duration: 1000
                })
                setTimeout(() => {
                  store.dispatch('user/loginOut')
                }, 2000)
              }
            })
          })
    }
    return {
      form,
      passwordType,
      btnBoolean,
      countDown,
      EmailTimer,
      sendEmailBtn,
      passwordTypeChange,
      handleSendAuthCode,
      handleSubmit,
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

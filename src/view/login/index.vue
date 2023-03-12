<script lang="ts" setup name="Page-login">
import { initStarry } from '@/api/login/loginBackground'
import { LoginData } from '@/api/login/types';
import router from '@/routes';
import { userStore } from '@/store/modules/user';
import { ElForm } from 'element-plus';

const loginFromRef = ref(ElForm)
const userStores = userStore()

const state = reactive({
  loginData: {
    user_name: 'admin',
    password: '123456'
  } as LoginData,
  loading: false,
})

const {
  loginData,
  loading,
} = toRefs(state);

function handleLogin() {
  loginFromRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true
      userStores.login(state.loginData).then(() => {
        router.push({ path: '/' })
        state.loading = false
      }).catch(() => {
        state.loading = false
      })
    } else {
      return false
    }
  })
}

onMounted(() => {
  initStarry()
});
</script>
<template>
  <div class="login-container">
    <canvas ref="canvasDom" id="canvasDom" class="canvasDom" />
    <div class="login-box">
      <h2 class="login-title">Vite+Vue3+Ts</h2>
      <el-form ref="loginFromRef" :model="loginData" class="login-from" label-width="0px" size="large">
        <el-form-item label="">
          <el-icon>
            <User />
          </el-icon>
          <el-input placeholder="请输入账号" v-model="loginData.user_name" prefix-icon="User" @keyup.enter="handleLogin" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="请输入密码" v-model="loginData.password" type="password" autocomplete="new-password"
            prefix-icon="Lock" show-password @keyup.enter="handleLogin" />
        </el-form-item>
        <el-button type="primary" class="login-but" :loading="loading" @click.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;

  .login-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // transform: translate(-50%, -50%);
    background-color: #6076ae7d;
    margin: auto;
    width: 600px;
    height: 300px;
    border-radius: 20px;
    text-align: center;

    .login-title {
      color: azure;
    }

    .login-from {
      width: 80%;
      margin: auto;
      // margin-top: 50px;

      .login-but {
        width: 100%;
      }
    }
  }
}

.canvasDom {
  width: 100%;
  height: 100%;
}
</style>
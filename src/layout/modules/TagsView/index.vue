<script lang="ts" setup>
import router from '@/routes';
import { getUser, removeUserToken } from '@/store/modules/auto';

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  user_name: getUser()
})

const {
  circleUrl,
  user_name,
} = toRefs(state);

const openLeave = () => {
  ElMessageBox.confirm(
    `亲爱的${state.user_name}确定要退出吗?`,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      router.push({ path: '/login' })
      removeUserToken()
      ElMessage({
        type: 'success',
        message: '退出成功!',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出!',
      })
    })
}
</script>

<template>
  <img class="logo" src="@/assets/logo.png" alt="">
  <!-- <el-input class="tagSearch" size="large" placeholder="Please Input" suffix-icon="Search" /> -->
  <el-dropdown class="userMsg">
    <span class="userBut">
      <el-avatar :size="40" :src="circleUrl" class="avatar" />
      {{ user_name }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="openLeave">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.logo {
  width: 200px;
  height: 60px;
}

.tagSearch {
  width: 400px;
}

.userMsg {
  float: right;
  height: 60px;

  .userBut {
    margin-right: 20px;
    height: 100%;
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    outline: 0;
  }

  .avatar {
    margin-right: 10px;
  }
}
</style>
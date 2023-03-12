<script lang="ts" setup name="layout">
import { Sidebar, TagsView, tabs } from './modules/index'
</script>
<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <TagsView />
      </el-header>
      <el-container>
        <el-aside class="aside">
          <Sidebar />
        </el-aside>
        <el-main class="main">
          <tabs />
          <el-divider style="margin: 15px 0;" />
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: hidden;
}

.common-layout {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  .header {
    background-color: #f9cb85;
    padding: 0;
  }

  .aside {
    // background-color: aqua;
    width: 200px;
    padding: 0px;
  }

  .main {
    --el-main-padding: 20px 10px;
  }
}
</style>
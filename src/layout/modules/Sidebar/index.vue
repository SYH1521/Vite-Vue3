<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
    <el-menu-item index='/dashboard'>
      <el-icon>
        <House />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user">用户列表</el-menu-item>
        <el-menu-item index="2-2">角色列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
<script lang="ts" setup name="tabs">

const router = useRouter()

const state = reactive({
  routerArr: router.currentRoute.value.matched
})

const {
  routerArr
} = toRefs(state)

watch(() => router.currentRoute.value.matched, (to, from) => {
  state.routerArr = to
})
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in routerArr" :to="{ path: item.path }" key="item.path">
      {{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped></style>
<template>
  <div>
    dada
    <el-button>测试</el-button>
    <el-card>121321</el-card>
  </div>
</template>
<script setup lang="ts">
import { useMain } from '@/store/home'
import { storeToRefs } from 'pinia';

const main = useMain()
// 解构main里面的state和getters的数据，
// 使用storeToRefs解构才有响应式，响应式可以直接修改数据，不过这我只用来渲染
const { counter, name, doubleCount } = storeToRefs(main)
console.log('a', useMain);

console.log(name);


</script>
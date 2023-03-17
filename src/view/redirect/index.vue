<script lang="ts" setup name="redirect">
import * as echarts from 'echarts'

const state = reactive({
  option: {
    title: {
      text: 'ECharts'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }
    ]
  }
})

const {
  option
} = toRefs(state);

const initeCharts = () => {
  let myChart = echarts.init(document.getElementById('myChart') as HTMLElement);
  myChart.setOption(state.option);
}

onMounted(() => {
  initeCharts()
})
</script>

<template>
  <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
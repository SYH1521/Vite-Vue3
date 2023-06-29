<script lang="ts" setup name="calender">
import { DateParameter } from '@/api/schedule/types'

const state = reactive({
    dateParameter: {
        dateCount: [],
        curYear: 0,
        curMonth: 0,
        curDate: 0,
    } as DateParameter
})

const todayYear = new Date().getFullYear()
const todayMonth = new Date().getMonth()
const todayDate = new Date().getDate()

onMounted(() => {
    const date = new Date()
    state.dateParameter.curYear = date.getFullYear()
    state.dateParameter.curMonth = date.getMonth()
    state.dateParameter.curDate = date.getDate()
    getDateCount()
})

const getDateCount = () => {
    // 本月天数
    const count = new Date(state.dateParameter.curYear, state.dateParameter.curMonth + 1, 0).getDate()
    // 上个月天数
    const lastCount = new Date(state.dateParameter.curYear, state.dateParameter.curMonth, 0).getDate()
    // 获取1号是星期几
    const firstWeekDay = new Date(state.dateParameter.curYear, state.dateParameter.curMonth, 1).getDay()
    for (let i = lastCount - firstWeekDay + 1; i <= lastCount; i++) {
        const objDate = {
            date: i,
            isMonth: false
        }
        state.dateParameter.dateCount.push(objDate)
    }
    for (let i = 1; i <= count; i++) {
        const objDate = {
            date: i,
            isMonth: true
        }
        state.dateParameter.dateCount.push(objDate)
    }
    for (let i = 1; i <= 42 - count - firstWeekDay; i++) {
        const objDate = {
            date: i,
            isMonth: false
        }
        state.dateParameter.dateCount.push(objDate)
    }
}

const isToday = (objDate: any) => {
    if (objDate.date == todayDate && state.dateParameter.curYear == todayYear && state.dateParameter.curMonth == todayMonth && objDate.isMonth) {
        return "today"
    } else if (!objDate.isMonth) {
        return "noMonth"
    } else {
        return ''
    }
}

</script>

<template>
    <el-card class="wrap">
        <div class="head">
            <div class="left">时间</div>
            <div class="title">日程</div>
            <div class="right">
                <el-button-group>
                    <el-button type="" size="small">上个月</el-button>
                    <el-button type="" size="small">今天</el-button>
                    <el-button type="" size="small">下个月</el-button>
                </el-button-group>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="content">
            <div class="week">
                <ul>
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                </ul>
            </div>
            <div class="list">
                <div v-for="item in state.dateParameter.dateCount" :key="item" :class="isToday(item)">
                    <span class="sunNub">{{ item.date }}</span>
                </div>
            </div>
        </div>
    </el-card>
</template>
<style lang="scss" scoped>
.head {
    display: flex;
    justify-content: space-between;
}

.content {
    .week {

        // display: flex;
        ul {
            display: flex;
            list-style: none;
            padding-left: 0;
            justify-content: space-around;
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        div {
            box-sizing: border-box;
            border: 1px solid #ebeef5;
            flex: 0 0 calc(100% / 7);
            aspect-ratio: 2/1;
        }

        div:hover {
            background-color: #f0f5fb;
        }

        .sunNub {
            margin-left: 5%;
        }

        .today {
            color: #409eff;
        }

        .noMonth {
            color: #c1c7d5;
        }
    }
}
</style>
<script lang="ts" setup name="userList">
import { getUserData, daleteUser } from "@/api/user";
import { UserParameter } from "@/api/user/type";
import UserEditOrAdd from "./modules/userEditOrAdd.vue";
import { Delete, Edit, Search, Plus, Upload, Message } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const userEditOrAdd = ref();

const visible = ref(false);
const state = reactive({
  tableUserData: [],
  getUserParameter: {
    user_name: "",
    role: "",
    pageNum: 1,
    pageSize: 10,
  } as UserParameter,
  disabled: false,
  total: 0,
});

const { tableUserData, getUserParameter, disabled, total } = toRefs(state);

function handleSizeChange(val: number) {
  state.getUserParameter.pageSize = val;
  getData();
}
function handleCurrentChange(val: number) {
  state.getUserParameter.pageNum = val;
  getData();
}

function searchUser() {
  getData();
}
function reset() {
  state.getUserParameter.user_name = "";
  state.getUserParameter.role = "";
  getData();
}

async function getData() {
  try {
    const res = await getUserData(state.getUserParameter);
    const total = res.data.result.total;
    state.tableUserData = res.data.result.list;
    ElMessage.success(res.data.message);
    state.total = total;
    if (total !== 0) {
      state.disabled = false;
    } else {
      state.disabled = true;
    }
  } catch (error) {
    state.disabled = true;
  }
}

function userEdit(row: { [key: string]: any }) {
  nextTick(() => {
    userEditOrAdd.value.openUserEditOrAdd(1, row);
  });
}

function addUser() {
  nextTick(() => {
    userEditOrAdd.value.openUserEditOrAdd(0);
  });
}

const deleteUser = (id: number) => {
  daleteUser(id).then((res) => {
    ElMessage.success(res.data.message);
    getData();
  });
};

getData();
</script>

<template>
  <el-form :inline="true" :model="getUserParameter" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="getUserParameter.user_name" placeholder="输入用户名" />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="getUserParameter.role" placeholder="选择角色">
        <el-option label="管理员" value="1" />
        <el-option label="普通用户" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="searchUser" :icon="Search">查询</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="addUser" :icon="Plus"> 新增用户</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableUserData" stripe class="user-table">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="user_name" label="用户名" width="180" />
    <el-table-column prop="role" label="角色">
      <template #default="scope">
        <span v-if="scope.row.role == 1">管理员</span>
        <span v-else>普通用户</span>
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" label="创建时间">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <timer />
          </el-icon>
          <span>{{ scope.row.createdAt }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="userEdit(scope.row)"
          >修改密码</el-button
        >
        <el-button link type="primary" size="small" @click="deleteUser(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="getUserParameter.pageNum"
    v-model:page-size="getUserParameter.pageSize"
    :page-sizes="[10, 30, 50, 100]"
    :small="true"
    :disabled="disabled"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <UserEditOrAdd ref="userEditOrAdd" @method="getData" />
</template>

<style lang="scss" scoped>
.user-table {
  width: 100%;
  margin-bottom: 10px;
}
</style>

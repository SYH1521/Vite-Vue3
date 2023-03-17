<script lang="ts" setup name="userEditOrAdd">
import { addUserForm, changePassword } from "@/api/user";
import { AddOrEditUserParameter } from "@/api/user/type";
import { ElForm, FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref(ElForm);
const emit = defineEmits(["method"]);

const state = reactive({
  isDrawerUserAddOrEdit: false,
  title: "新增用户",
  passwordLable: "密码:",
  userForm: {
    user_name: "",
    password: "",
    affirmPassword: "",
    role: "",
  },
  disabledName: false,
  sign: 0,
});

const { isDrawerUserAddOrEdit, title, userForm, disabledName, passwordLable } = toRefs(
  state
);

const isaffirmPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  }
  if (state.userForm.affirmPassword !== state.userForm.password) {
    return callback(new Error("密码不相同"));
  } else {
    callback();
  }
};

const rulesUserFrom = reactive<FormRules>({
  user_name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 6, message: "长度2-6", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 11, message: "长度6-11", trigger: "blur" },
  ],
  affirmPassword: [{ required: true, validator: isaffirmPassword, trigger: "blur" }],
});

function openUserEditOrAdd(sign: number, data?: { [key: string]: any }) {
  state.sign = sign;
  if (sign == 0) {
    state.title = "新增用户";
    state.passwordLable = "密码:";
    state.disabledName = false;
  } else if (sign == 1) {
    state.title = "修改密码";
    state.passwordLable = "新密码:";
    state.disabledName = true;
    state.userForm.user_name = (data as { [key: string]: any }).user_name;
  }
  state.isDrawerUserAddOrEdit = true;
}

function submitForm() {
  ruleFormRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      const { affirmPassword, ...parameter } = state.userForm;
      if (state.sign == 0) {
        addUserForm(parameter).then((res) => {
          ElMessage.success(res.data.message);
          resetForm();
          emit("method");
        });
      } else if (state.sign == 1) {
        changePassword(parameter).then((res) => {
          ElMessage.success(res.data.message);
          resetForm();
          emit("method");
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
}

const resetForm = () => {
  state.isDrawerUserAddOrEdit = false;
  state.userForm.user_name = "";
  ruleFormRef.value.resetFields();
};

defineExpose({
  openUserEditOrAdd,
});
</script>
<template>
  <el-drawer v-model="isDrawerUserAddOrEdit" direction="rtl" :before-close="resetForm">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        :model="userForm"
        :rules="rulesUserFrom"
        status-icon
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名:" prop="user_name">
          <el-input
            v-model="userForm.user_name"
            placeholder="用户名"
            :disabled="disabledName"
          />
        </el-form-item>
        <el-form-item :label="passwordLable" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="new-password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="affirmPassword">
          <el-input
            v-model="userForm.affirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="确认密码"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="resetForm">取消</el-button>
        <el-button @click="submitForm">提交</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped></style>

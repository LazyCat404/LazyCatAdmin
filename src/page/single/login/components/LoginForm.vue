<template>
  <div class="login-form-wrapper">
    <el-form ref="userFormRef" :rules="rules" :model="state.userForm">
      <el-form-item class="login-form-title">
        <span class="mian-title"><i>用户</i>登录</span>
        <span class="sub-title">USER LOGIN</span>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item prop="name">
        <el-input v-model="state.userForm.name" placeholder="请输入用户名">
          <template #prefix>
            <i class="iconfont icon-zhanghao"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="state.userForm.password" placeholder="请输入密码" show-password>
          <template #prefix>
            <i class="iconfont icon-xiugaimima"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item class="submit-form">
        <el-button @click="submitForm">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import api from '@api';
import { reactive, ref, unref } from 'vue';

const state = reactive({
  userForm: {
    name: null,
    password: null
  },
  remember: true
});
// 表单验证规则
const rules = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
};
// 全局属性
const router = useRouter();
const useUserStore = $store.useUserStore(); // 用户信息全局状态

// 登录表单
const userFormRef = ref();
function submitForm() {
  const form = unref(userFormRef);
  form?.validate((valid: boolean) => {
    if (valid) {
      // 请求接口
      api.user.login(state.userForm).then((res: res) => {
        // 设置登录相关
        useUserStore.setUserInfor(res.data.userInfor);
        useUserStore.setToken(res.data.token);
        // 路由跳转
        router.push({ path: '/' });
      });
    }
  });
}
</script>
<style scoped lang="scss">
.login-form-wrapper {
  width: 575px;
  height: 100%;
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  .el-form {
    width: 380px;
    .el-form-item {
      margin-bottom: 24px;
      .el-form-item__content {
        .el-input {
          line-height: 52px;
          height: 52px;
        }
      }
    }
    .login-form-title {
      margin-bottom: 50px;
      .mian-title {
        height: 42px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 30px;
        color: #1c244d;
        letter-spacing: 0;
        margin-right: 10px;
        white-space: nowrap; /*设置内容不换行*/
        text-overflow: ellipsis;
        i {
          font-style: normal;
          padding-bottom: 8px;
          border-bottom: 4px solid #3e7bfa;
        }
      }
      .sub-title {
        height: 33px;
        opacity: 0.29;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 24px;
        color: #1c244d;
        letter-spacing: 0;
        white-space: nowrap; /*设置内容不换行*/
        text-overflow: ellipsis;
      }
    }
    // 提交按钮
    .submit-form {
      margin-top: 50px;
      .el-button {
        width: 100%;
        height: 54px;
        line-height: 54px;
        background: #206bfa;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
      }
    }
  }
}
@media screen and (max-width: 575px) {
  .login-form-wrapper {
    width: 100%;
  }
}
</style>

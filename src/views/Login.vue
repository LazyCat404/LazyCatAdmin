<template>
  <div id="login-wrapper">
    <el-scrollbar>
      <div class="flex-content">
        <div id="login-top">
          <span />
          <div>管理系统</div>
          <span />
        </div>
        <div id="login-main">
          <div id="login-box">
            <div id="login-title">
              <div id="zh-title">后台登录</div>
              <div id="vice-title">Backstage Login</div>
            </div>
            <div id="login-body">
              <el-form ref="userFormRef" :rules="rules" :model="state.userForm">
                <el-form-item prop="name">
                  <i class="iconfont icon-yonghu" />
                  <el-input v-model="state.userForm.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                  <i class="iconfont icon-mima1" />
                  <el-input v-model="state.userForm.password" placeholder="请输入密码" show-password />
                </el-form-item>
              </el-form>
              <el-checkbox v-model="state.remember" class="remember-password" label="记住密码" />
              <el-button type="primary" round @click="submitForm"> 登 &nbsp; 录 </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import api from '@/apis/user';
import useCurrentInstance from '@/utils/useCurrentInstance';
import { myObject } from '@types';
import { reactive, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
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
const { gpr } = useCurrentInstance();
const $store = gpr.$store as myObject;
const router = useRouter();
// 登录表单
const userFormRef = ref();
function submitForm() {
  const form = unref(userFormRef);
  form?.validate((valid: boolean) => {
    if (valid) {
      api.login(state.userForm).then((res: any) => {
        let commit = $store.commit as any;
        // 缓存token
        commit('setToken', res.data.token);
        // 缓存用户信息
        commit('setUser', res.data.userInfor);
        router.push({ path: '/' });
      });
    }
  });
}
</script>

<style lang="scss" scoped>
#login-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#06e5b7, #45b5d1);
  position: relative;
  ::v-deep .el-scrollbar__wrap {
    .el-scrollbar__view {
      height: 100%;
      .flex-content {
        height: 100%;
      }
    }
  }
  #login-top {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    min-width: 600px;
    span {
      width: 227px;
      height: 2px;
      background: #ffffff;
      opacity: 0.6;
    }
    div {
      display: inline-block;
      padding: 0 20px;
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.6;
    }
  }
  #login-main {
    height: calc(100% - 65px);
    min-width: 600px;
    min-height: 600px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    #login-box {
      width: 570px;
      height: 575px;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      margin: 0 auto;
      #login-title {
        text-align: center;
        background-image: linear-gradient(#2fc6e8, #2ee5d9);
        font-weight: 400;
        color: #ffffff;
        padding: 52px 0;
        #zh-title {
          font-size: 55px;
          height: 55px;
          line-height: 49px;
          text-shadow: 0px 2px 2px rgba(13, 4, 9, 0.75);
        }
        #vice-title {
          font-size: 28px;
          line-height: 25px;
          height: 26px;
          margin-top: 15px;
        }
      }
    }
  }
}
#login-body {
  padding: 10px 109px 0 118px;
  .el-form-item {
    margin-top: 20px;
    .el-input {
      width: calc(100% - 34px);
      margin-left: 12px;
      ::v-deep .el-input__inner {
        border: 0;
        border-bottom: 1px solid #666666;
        border-radius: 0;
      }
    }
    .iconfont {
      font-size: 22px;
      color: #079df5;
      position: relative;
      top: 10px;
    }
    ::v-deep .el-form-item__error {
      left: 35px;
    }
  }
  .remember-password {
    height: 16px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin: 38px 0 54px;
  }
  .el-button {
    display: block;
    width: 197px;
    height: 45px;
    background-image: linear-gradient(#2face8, #2ee5d9);
    box-shadow: 0px 3px 8px 0px #2face8;
    border-radius: 20px 20px 20px 20px;
    margin: 0 auto;
    display: block;
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    line-height: 0;
  }
}
</style>

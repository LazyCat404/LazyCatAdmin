<template>
  <div class="login-wrapper">
    <el-scrollbar>
      <div class="login-box">
        <div class="login-main">
          <Banner></Banner>
          <LoginForm></LoginForm>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import LoginForm from './components/LoginForm.vue';
import Banner from './components/Banner.vue';
</script>
<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/login/login_bg.png);
  position: relative;
  :deep(.el-scrollbar__wrap) {
    .el-scrollbar__view {
      height: 100%;
      .login-box {
        min-height: 100%;
        min-width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-main {
          display: flex;
          width: 1149px;
          height: 650px;
          background: #edf5ff;
          box-shadow: 0 22px 31px 0 #b9b9b933;
          border-radius: 30px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

<template>
  <div id="header-wrapper">
    <div id="header-logo">LOGO</div>
    <div id="header-main">
      <el-dropdown class="oper-box">
        <div id="user-image">
          <img :src="userImg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown-list">
            <el-dropdown-item @click="goUserInfor">个人中心</el-dropdown-item>
            <el-dropdown-item @click="outLogin" divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userImage from '@/assets/images/user.png';
import useCurrentInstance from '@/utils/useCurrentInstance';
import { myObject } from '@types';

// 全局属性
const { gpr } = useCurrentInstance();
const $store = gpr.$store as myObject;
const $router = gpr.$router as any;
// 用户头像
const userImg = userImage;

function goUserInfor() {
  console.log('跳转个人中心');
}
// 退出登录
function outLogin() {
  // 清除缓存
  let commit = $store.commit as any;
  commit('setToken', null);
  commit('setUser', null);
  // 跳转至登录页
  $router.push({ path: '/login' });
}
</script>

<style lang="scss" scoped>
#header-wrapper {
  height: 70px;
  width: 100%;
  #header-logo {
    width: 260px;
    height: 100%;
    float: left;
    font-size: 40px;
    font-weight: bold;
    color: #40cdbb;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #header-main {
    background: #53d2c2;
    float: right;
    width: calc(100% - 260px);
    height: 100%;
    ::v-deep .oper-box {
      float: right;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      height: 70px;
      margin-right: 20px;
      #user-image {
        width: 60px;
        height: 60px;
        border-radius: 50% 50%;
        overflow: hidden;
        cursor: pointer;
        background: #fff;
      }
    }
  }
}

.user-dropdown-list {
  padding: 10px 0px;
  li {
    padding: 0 20px;
  }
}
</style>

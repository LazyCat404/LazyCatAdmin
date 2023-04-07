<template>
  <div class="header-wrapper" :dark="state.excludeRoute.includes(route.path)">
    <!-- 用户列表 -->
    <ul>
      <li v-for="item in state.systemList" :key="item.nmae">{{ item.name }}</li>
    </ul>
    <!-- 用户信息 -->
    <div class="user-infor-box">
      <div class="user-image">
        <img :src="userImg" />
      </div>
      <el-dropdown class="oper-box">
        <div>{{ state.userInfor.name }} <i class="iconfont icon-xiala"></i></div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown-list">
            <el-dropdown-item @click="goUserInfor">个人中心</el-dropdown-item>
            <el-dropdown-item @click="outLogin" divided> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userImage from '@/assets/images/user.png';
import { reactive } from 'vue';

const router = useRouter();
const route = useRoute();
const state = reactive<any>({
  userInfor: $store.state.user,
  excludeRoute: [], // 此处路由为深色背景
  systemList: [] // 系统列表
});
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
  router.push({ path: '/login' });
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 80px;
  padding-right: 40px;
  box-sizing: border-box;
  display: -webkit-flex;
  display: flex; /*定位（写在父元素中）*/
  justify-content: center; /*水平居中*/
  align-items: center;
  > ul {
    display: flex;
    li {
      margin-right: 60px;
    }
  }
  .user-infor-box {
    display: -webkit-flex;
    display: flex; /*定位（写在父元素中）*/
    justify-content: center; /*水平居中*/
    align-items: center;
    .user-image {
      width: 40px;
      height: 40px;
      border-radius: 50% 50%;
      overflow: hidden;
      margin-right: 12px;
      img {
        width: 100%;
      }
    }
    .oper-box {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      cursor: pointer;
      .iconfont {
        font-size: 10px;
        margin-left: 6px;
      }
    }
  }
}
.header-wrapper[dark='true'] {
  > ul > li,
  .oper-box {
    color: #fff;
  }
}
.user-dropdown-list {
  padding: 10px 0px;
  li {
    padding: 0 20px;
  }
}
</style>

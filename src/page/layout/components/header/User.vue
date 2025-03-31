<template>
  <div class="user-wrapper" :dark="excludeRoute.includes(route.path)">
    <!-- 下拉菜单 -->
    <el-dropdown class="oper-box" :teleported="false">
      <div>
        <!-- 用户头像 -->
        <img class="user-image" :src="userImage" />
        <!-- 用户名 -->
        <span class="user-name">{{ useUserStore.userInfor && useUserStore.userInfor.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown-list">
          <el-dropdown-item @click="goUserInfor">个人中心</el-dropdown-item>
          <el-dropdown-item @click="outLogin" divided> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import userImage from '@/assets/images/layout/user.png';

defineProps({
  excludeRoute: {
    type: Array, // 排除路由
    required: false,
    default: () => {
      return [];
    }
  }
});

const router = useRouter();
const route = useRoute();

const useUserStore = $store.useUserStore();

function goUserInfor() {
  console.log('跳转个人中心');
}
// 退出登录
function outLogin() {
  // 清除缓存
  useUserStore.clearUserInfor();
  useUserStore.clearToken();
  // 跳转至登录页
  router.push({ path: '/login' });
}
</script>

<style lang="scss" scoped>
.user-wrapper {
  height: 100%;
  padding-right: 40px;
  box-sizing: border-box;
  display: -webkit-flex;
  display: flex; /*定位（写在父元素中）*/
  justify-content: center; /*水平居中*/
  align-items: center;
  .oper-box {
    .el-tooltip__trigger {
      display: flex; /*定位（写在父元素中）*/
      align-items: center;
      cursor: pointer;
      .user-image {
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
        overflow: hidden;
        margin-right: 5px;
      }
      .user-name {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
      }
    }
    // 下拉菜单
    ::v-deep .user-dropdown-list {
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 0 10px 0 rgba(13, 34, 67, 0.1);
      .el-dropdown-menu__item {
        &:focus,
        &:hover {
          border-radius: 4px;
          color: #01bc8f;
          background-color: rgba(1, 188, 143, 0.1);
        }
      }
    }
  }
}
</style>

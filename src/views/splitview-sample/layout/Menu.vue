<template>
  <div id="menu-wrapper">
    <el-menu
      id="menu-list-box"
      :default-active="state.activeIndex"
      router
      text-color="#B7C2CF"
      :unique-opened="true"
      :collapse="state.isCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in menu.list">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="item.children"
          :disabled="item.show"
          :index="item.path"
        >
          <template #title>
            <i
              :style="{ color: item.icoColor ? item.icoColor : '#B7C2CF' }"
              :class="'iconfont ' + item.icon"
            ></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item  v-for="ite in item.children" :index="ite.path">{{ite.name}}</el-menu-item>
        </el-sub-menu>
        <!-- 无子菜单 -->
        <el-menu-item
          v-else
          :index="item.path"
        >
          <i
            :style="{ color: item.icoColor ? item.icoColor : '#B7C2CF' }"
            :class="'iconfont ' + item.icon"
          ></i>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang='ts' setup>
import api from "@/apis/user";
import { onBeforeUnmount, reactive } from "vue";

const state = reactive({
  isCollapse:document.body.offsetWidth < 1125 ? true : false,
  activeIndex:'/dashboard'
});
const menu = reactive<any>({
  list:[]
});
// 获取菜单
(function getMenu(){
  api.getMenu().then((res:any) => {
    menu.list = res.data
  })
}())

function onResize() {
  if(document.body.offsetWidth < 1125){
    state.isCollapse = true
  }else{
    state.isCollapse = false
  }
  console.log(1)
}

// 监听屏幕变化
window.addEventListener("resize", onResize, false);
// 移除监听
onBeforeUnmount(() => {
  window.removeEventListener("resize",onResize, false);
});


</script>

<style lang="scss" scoped>
#menu-wrapper{
  width: 230px;
  height: calc(100% - 70px);
  float: left;
  #menu-list-box{
    border: 0;
    height: 100%;
    .is-active,
    .el-menu-item:hover,
    ::v-deep .el-sub-menu__title:hover{
      border-left: 5px solid #3DC8B7;
      background: #F6F7FB;
      color: #40CDBB !important;
      padding-left: 15px !important;
      i.iconfont{
        color: #40CDBB !important;
      }
    }
    .el-menu-item,
    ::v-deep .el-sub-menu__title{
      display: flex;
      display: -webkit-flex; 
      font-size: 16px;
      i.iconfont{
        margin-right: 15px;
      }
    }
    .el-sub-menu{
      .el-menu-item:hover{
        border: 0;
        background: #F6F7FB;
        color: #40CDBB !important;
        padding-left: 40px !important;
      }
    }
  }
}


@media screen and (max-width: 1200px) {
  #menu-wrapper {
    width: calc(100% - 970px);
  }
}
@media screen and (max-width: 1125px) {
  #menu-wrapper {
    width: 64px;
  }
}
</style>
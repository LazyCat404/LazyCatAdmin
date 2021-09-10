<template>
  <div id="menu-wrapper">
    <el-menu
      ref="menu-vertical"
      class="el-menu-vertical-demo"
      router
      text-color="#B7C2CF"
      :unique-opened="true"
      :collapse="state.isCollapse"
    >
      <template v-for="item in menu.list">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="item.children"
          :disabled="item.show"
        >
          <template #title>
            <i
              :style="{ color: item.icoColor ? item.icoColor : '#B7C2CF' }"
              :class="'iconfont ' + item.icon"
            ></i>
            {{ item.name }}
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
import { reactive } from "vue";

const state = reactive({
  isCollapse:false,
});
const menu = reactive<any>({
  list:[]
});
(function getMenu(){
  api.getMenu().then((res:any) => {
    menu.list = res.data
  })
}())

</script>

<style lang="scss" scoped>
#menu-wrapper{
  width: 260px;
  height: calc(100% - 90px);
  float: left;
}
@media screen and (max-width: 1200px) {
  #menu-wrapper {
    width: calc(100% - 940px);
  }
}
</style>
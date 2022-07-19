<template>
  <div>
    <ul>
      <li>
        <i class="iconfont icon-shuaxin"></i>
        <span>刷新</span>
      </li>
      <li>
        <span>新建下级</span>
      </li>
      <li>
        <span>新建同级</span>
      </li>
      <li>
        <span>新建顶级</span>
      </li>
      <li class="division-line">
        <i class="iconfont icon-shanchu"></i>
        <span>删除</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  font-size: 14px;
  padding: 7px 0;
  min-width: 150px;
  li {
    padding: 0px 16px 0 36px;
    line-height: 34px;
    height: 34px;
    list-style: none;
    cursor: pointer;
    position: relative;
    i.iconfont {
      position: absolute;
      left: 16px;
    }
  }
  li:hover {
    background-color: #ecf5ff;
    color: #409eff;
  }
  li.division-line {
    border-top: 1px solid #f0f1f3;
  }
}
</style>

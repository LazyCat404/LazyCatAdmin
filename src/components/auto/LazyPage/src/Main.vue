<template>
  <div
    :class="{
      'basic-page-wapper': true,
      'float-left': page.float == 'left',
      small: state.simple.small
    }"
  >
    <template v-if="state.simple.hideSingle ? props.page.total > 0 : true">
      <span v-if="state.simple.total">共 {{ props.page.total === undefined ? '-' : props.page.total }} 条</span>
      <el-select v-if="state.simple.pageSize" v-model="state.pageSize" @change="pageOper('pageSize')">
        <el-option v-for="item in state.pageSizes" :key="item" :label="`${item}条/页`" :value="item">
          <div>{{ item }}条/页</div>
        </el-option>
      </el-select>
      <el-pagination
        v-model:currentPage="state.pageNum"
        :page-size="state.pageSize"
        :small="state.simple.small"
        @current-change="pageOper('pageNum')"
        :total="props.page.total === undefined ? 1 : props.page.total"
        layout=" prev, pager, next"
      >
      </el-pagination>
      <span class="page-go-to-box" v-if="state.simple.goPage">
        <span>前往</span>
        <el-input ref="goPageInput" v-model="state.goPage" style="width: 46px" @change="pageOper('goPage')" />
        <span>页</span>
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from 'vue';

const props = defineProps<{
  page?: any;
}>();
const state = reactive<any>({
  pageNum: props.page.pageNum === undefined ? 1 : +props.page.pageNum, // 当前页
  goPage: props.page.pageNum === undefined ? 1 : +props.page.pageNum, // 前往页
  pageSize: props.page.pageSize === undefined ? 20 : +props.page.pageSize, // 每页条数
  pageSizes: props.page.pageSizes === undefined ? [20, 50, 70, 100] : props.page.pageSizes, // 分页分组
  simple: {} // 极简
});
const $emit = defineEmits(['pageOper']);
const goPageInput = ref();

function pageOper(type: string) {
  if (type == 'goPage') {
    let totalPage = Math.ceil(props.page.total / state.pageSize); // 总页数
    if (state.goPage > totalPage) {
      state.goPage = totalPage;
      state.pageNum = +state.goPage;
    } else if (state.goPage < 1 || !state.goPage) {
      state.goPage = 1;
      state.pageNum = 1;
    } else {
      state.pageNum = +state.goPage;
    }
    // 输入框失去焦点
    goPageInput.value.blur();
  }
  $emit('pageOper', {
    pageNum: state.pageNum, // 当前数
    pageSize: state.pageSize, // 每页显示数
    operType: type // 操作类型
  });
}
(function init() {
  if (props.page.simple === undefined || typeof props.page.simple == 'boolean') {
    state.simple = {
      total: props.page.simple === undefined ? true : props.page.simple,
      goPage: props.page.simple === undefined ? true : props.page.simple,
      pageSize: props.page.simple === undefined ? true : props.page.simple,
      hideSingle: true,
      small: false
    };
  } else if (Object.prototype.toString.call(props.page.simple) === '[object Object]') {
    state.simple = {
      total: props.page.simple.total === undefined ? true : props.page.simple.total,
      goPage: props.page.simple.goPage === undefined ? true : props.page.simple.goPage,
      pageSize: props.page.simple.pageSize === undefined ? true : props.page.simple.pageSize,
      hideSingle: props.page.simple.hideSingle === undefined ? true : props.page.simple.hideSingle,
      small: props.page.simple.small === undefined ? false : props.page.simple.small
    };
  } else if (Object.prototype.toString.call(props.page.simple) === '[object Array]') {
    state.simple = {
      total: props.page.simple.includes('total'),
      goPage: props.page.simple.includes('goPage'),
      pageSize: props.page.simple.includes('pageSize'),
      hideSingle: props.page.simple.includes('hideSingle'),
      small: props.page.simple.includes('small')
    };
  } else {
    console.warn('分页属性 simple 仅支持 布尔、对象、数组数据类型');
  }
})();
</script>
<style scoped lang="scss">
.basic-page-wapper {
  bottom: 0;
  position: absolute;
  right: 20px;
  height: 60px;
  display: -webkit-flex;
  display: flex; /*定位（写在父元素中）*/
  align-items: center;
  justify-content: flex-end;
  ::v-deep .el-select {
    margin-left: 15px;
    width: 100px;
    .el-input__inner {
      height: 28px;
    }
  }
  .page-go-to-box {
    .el-input {
      margin: 0 5px;
      ::v-deep .el-input__inner {
        padding: 0 3px;
        height: 28px;
        text-align: center;
      }
    }
  }
}
// 缩小
.basic-page-wapper.small {
  font-size: var(--el-font-size-extra-small);
  ::v-deep .el-select {
    margin-left: 5px;
    width: 85px;
    .el-input__wrapper {
      padding: 1px 4px;
      font-size: 12px;
      .el-input__inner {
        text-align: center;
        height: 24px;
      }
      .el-select__icon {
        font-size: 12px;
        margin-left: 0;
      }
    }
  }
  .el-pagination {
    padding: 0;
  }
  .page-go-to-box {
    .el-input {
      margin: 0 4px;
      ::v-deep .el-input__wrapper {
        padding: 0 4px;
        height: 24px;
      }
    }
  }
}
// 靠左
.basic-page-wapper.float-left {
  float: left;
  right: auto;
}
</style>

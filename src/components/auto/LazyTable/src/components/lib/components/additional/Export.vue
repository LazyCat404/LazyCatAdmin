<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="文件名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-select v-model="form.type">
        <el-option label="XLSX（*.xlsx）" value=".xlsx" />
        <el-option label="DOCX（*.docx）" value=".docx" />
        <el-option label="CSV（*.csv）" value=".csv" />
      </el-select>
    </el-form-item>
    <!-- 展开 -->
    <el-form-item label-width="0px" class="open-careful" v-show="!careful">
      <i class="iconfont icon-zhankai" @click="careful = true"></i>
    </el-form-item>
    <!-- 详细设置 -->
    <el-collapse-transition>
      <el-form-item label="导出字段" v-if="careful">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-checkbox-group v-model="form.column" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item, i) in checkListOptions" :key="i" :label="item.prop" name="type">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-form-item label="页码选择" v-if="careful && page">
        <el-select v-model="state.pageType">
          <el-option label="全部" :value="1" />
          <el-option label="当前页" :value="2" />
          <el-option label="第一页" :value="3" />
          <el-option label="最后页" :value="4" />
          <el-option label="指定页" :value="5" />
          <el-option label="范围页" :value="6" />
        </el-select>
      </el-form-item>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-form-item v-if="careful && state.pageType > 4" class="export-page-box">
        <div>
          第<el-input-number
            v-model="state.page"
            :min="1"
            :max="Math.ceil(page?.total / (page?.pageSize ? page?.pageSize : 20))"
            controls-position="right"
            :step-strictly="true"
          />页
        </div>
        <el-collapse-transition>
          <div v-if="careful && state.pageType > 5" class="export-page-box">
            <div style="text-align: center; width: 215px">到</div>
            <div>
              第<el-input-number
                v-model="state.endPage"
                :min="1"
                :max="Math.ceil(page?.total / (page?.pageSize ? page?.pageSize : 20))"
                controls-position="right"
                :step-strictly="true"
              />页
            </div>
          </div>
        </el-collapse-transition>
      </el-form-item>
    </el-collapse-transition>
    <!-- 关闭 -->
    <el-form-item v-show="careful" label-width="0px" class="close-careful">
      <i class="iconfont icon-zhankai" @click="careful = false"></i>
    </el-form-item>
  </el-form>
  <!-- 按钮 -->
  <div class="custom-column-btn-wrapper">
    <el-button>取消</el-button>
    <el-button type="primary" @click="confirmBtn">确认</el-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  tableOptions: {
    type: <any>Array,
    required: true
  },
  page: Object
});
const form = reactive({
  name: '',
  type: '.xlsx',
  column: [] // 已选中
});
const state = reactive({
  pageType: 1,
  page: 1,
  endPage: Math.ceil(props.page?.total / (props.page?.pageSize ? props.page?.pageSize : 20)) //结束页
});
const careful = ref(false); // 详细设置
const isIndeterminate = ref(false); // 全选框中间状态
const checkAll = ref(true); // 是否全选
const checkList = ref<any>([]); // 全选中列表
const checkListOptions = ref<any>([]); // 全选列表
const $emits = defineEmits(['confirmBtn']);
// 初始化
function init() {
  props.tableOptions.forEach((item: any) => {
    if (item.export || item.prop) {
      let prop = item.prop;
      if (item.export) {
        if (typeof item.export == 'string') {
          prop = item.export;
        } else if (Object.prototype.toString.call(item.export) === '[object Object]') {
          if (item.export.prop) {
            if (typeof item.export.prop == 'string') {
              prop = item.export.prop;
            } else {
              console.warn('导出字段仅支持 string 类型');
            }
          }
        } else {
          console.warn('export 类型检测失败，仅支持 string、object');
        }
      }
      if (prop) {
        checkList.value.push(prop);
        checkListOptions.value.push({
          prop,
          label: item.label
        });
      }
    }
  });
  form.column = checkList.value;
}
// 全选框改变
function handleCheckAllChange(val: boolean): void {
  if (val) {
    form.column = checkList.value;
  } else {
    form.column = [];
  }
  isIndeterminate.value = false;
}
// 复选框改变
function handleCheckedCitiesChange(value: string[]): void {
  const checkedCount = value.length;
  checkAll.value = checkedCount === checkList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < checkList.value.length;
}
function confirmBtn() {
  let par: any = {
    name: form.name,
    type: form.type
  };
  // 展开详细设置
  if (careful.value) {
    switch (state.pageType) {
      case 2:
        par = {
          ...form,
          page: props.page?.pageNum ? props.page.pageNum : 1
        };
        break;
      case 3:
        par = {
          ...form,
          page: 1
        };
        break;
      case 4:
        par = {
          ...form,
          page: Math.ceil(props.page?.total / (props.page?.pageSize ? props.page?.pageSize : 20))
        };
        break;
      case 5:
        par = {
          ...form,
          page: state.page
        };
        break;
      case 6:
        par = {
          ...form,
          startPage: state.page,
          endPage: state.endPage
        };
        break;
      default:
        par = {
          ...form,
          page: 'all'
        };
        break;
    }
  }
  $emits('confirmBtn', par, '导出');
}
// 立即执行
init();
</script>
<style lang="scss" scoped>
.el-input {
  width: 215px;
}
.open-careful {
  ::v-deep .el-form-item__content {
    justify-content: space-around;
    overflow: hidden;
    i {
      cursor: pointer;
      position: relative;
      animation: mymove 1.5s infinite;
      -webkit-animation: mymove 1.5s infinite;
    }
    i:hover {
      color: rgb(64, 158, 255);
    }
  }
}
.close-careful {
  ::v-deep .el-form-item__content {
    justify-content: space-around;
    overflow: hidden;
    i {
      cursor: pointer;
      position: relative;
      animation: mymove 1.5s infinite;
      -webkit-animation: mymove 1.5s infinite;
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
    i:hover {
      color: rgb(64, 158, 255);
    }
  }
}
@keyframes mymove {
  0% {
    top: 0;
  }
  50% {
    top: 8px;
  }
  100% {
    top: 0;
  }
}
/*Safari 和 Chrome:*/
@-webkit-keyframes mymove {
  0% {
    top: 0;
  }
  50% {
    top: 8px;
  }
  100% {
    top: 0;
  }
}
.export-page-box {
  ::v-deep .el-form-item__content {
    display: block;
  }
  ::v-deep .el-input-number {
    margin: 0 10px;
    width: 165px;
  }
}
.custom-column-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>

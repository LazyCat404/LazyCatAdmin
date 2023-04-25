<template>
  <!-- ico -->
  <template v-if="obj.first === 'ico' ? true : false">
    <el-tooltip :content="obj.ico.tip" :disabled="!obj.ico.tip" placement="top">
      <span :class="obj.ico.name" :style="[{ color: obj.ico.color }]"> </span>
    </el-tooltip>
  </template>
  <!-- 状态 -->
  <span
    class="iconfont icon-dian"
    :style="[{ color: obj.statusColor }]"
    v-if="props.bodyItem.status === undefined ? false : true"
  >
  </span>
  <!-- ico -->
  <template v-if="props.bodyItem.ico !== undefined && obj.first !== 'ico' ? true : false">
    <el-tooltip :content="obj.ico.tip" :disabled="!obj.ico.tip" placement="top">
      <span :class="obj.ico.name" :style="[{ color: obj.ico.color, marginRight: '3px' }]"> </span>
    </el-tooltip>
  </template>
</template>
<script lang="ts" setup>
import { computed, defineProps, reactive } from 'vue';
import { inspect } from '@/utils/inspect';
import { statusColor } from '../../../config';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any;
}>();
const obj = reactive<any>({
  first: '', // 显示顺序（不要给默认值）
  ico: { name: '', color: '' },
  statusColor: ''
});
// 状态
obj.statusColor = computed(() => {
  let color = '';
  if (props.bodyItem.status !== undefined) {
    if (typeof props.bodyItem.status == 'string' || typeof props.bodyItem.status == 'number') {
      color = (statusColor as any)[props.bodyItem.status];
    } else if (typeof props.bodyItem.status == 'function') {
      let returnStatus = props.bodyItem.status({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnStatus == 'string') {
        if (inspect.isColor(returnStatus)) {
          color = returnStatus;
        } else {
          color = (statusColor as any)[returnStatus];
        }
      } else if (typeof returnStatus == 'number') {
        color = (statusColor as any)[returnStatus];
      } else if (returnStatus === undefined) {
        color = '';
      } else {
        console.warn('tableOptions -> ico 仅支持 string、number、function 类型');
      }
    } else {
      console.warn('tableOptions -> ico 仅支持 string、number、function 类型');
    }
  }
  return color;
});
// ico
obj.ico = computed(() => {
  let ico = {
    name: '',
    color: '',
    tip: ''
  };
  if (props.bodyItem.ico) {
    if (typeof props.bodyItem.ico == 'string') {
      ico.name = props.bodyItem.ico;
    } else if (typeof props.bodyItem.ico == 'function') {
      let returnIco = props.bodyItem.ico({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnIco == 'string') {
        ico.name = returnIco;
      } else if (Object.prototype.toString.call(returnIco) === '[object Object]') {
        ico = returnIco;
      } else if (returnIco == undefined) {
        ico.name = '';
      } else {
        console.warn('tableOptions -> ico 返回值仅支持 string、object 类型');
      }
    } else if (Object.prototype.toString.call(props.bodyItem.ico) === '[object Object]') {
      // ico 名称
      if (props.bodyItem.ico.name) {
        if (typeof props.bodyItem.ico.name == 'string') {
          ico.name = props.bodyItem.ico.name;
        } else if (typeof props.bodyItem.ico.name == 'function') {
          let returnIco = props.bodyItem.ico.name({ bodyItem: props.bodyItem, rowData: props.rowData });
          if (typeof returnIco == 'string') {
            ico.name = returnIco;
          } else if (returnIco == undefined) {
            ico.name = '';
          } else {
            console.warn('tableOptions -> ico.name 返回值仅支持 string 类型');
          }
        } else {
          console.warn('tableOptions -> ico.name 仅支持 string、function 类型');
        }
      }
      // 颜色
      if (props.bodyItem.ico.color) {
        if (typeof props.bodyItem.ico.color == 'string') {
          if (inspect.isColor(props.bodyItem.ico.color)) {
            ico.color = props.bodyItem.ico.color;
          } else {
            console.warn('请检查 tableOptions -> ico.color 颜色格式');
          }
        } else if (typeof props.bodyItem.ico.color == 'function') {
          let returnColor = props.bodyItem.ico.color({ bodyItem: props.bodyItem, rowData: props.rowData });
          if (typeof returnColor == 'string') {
            if (inspect.isColor(returnColor)) {
              ico.color = returnColor;
            } else {
              console.warn('请检查 tableOptions -> ico.color 返回的颜色格式');
            }
          } else if (returnColor == undefined) {
            ico.color = '';
          } else {
            console.warn('请检查 tableOptions -> ico.color 返回值仅支持 string 类型');
          }
        } else {
          console.warn('tableOptions -> ico.color 仅支持 string、function 类型');
        }
      }
      // 提示
      if (props.bodyItem.ico.tip) {
        if (typeof props.bodyItem.ico.tip == 'string') {
          ico.tip = props.bodyItem.ico.tip;
        } else if (typeof props.bodyItem.ico.name == 'function') {
          let returnIco = props.bodyItem.ico.name({ bodyItem: props.bodyItem, rowData: props.rowData });
          if (typeof returnIco == 'string') {
            ico.tip = returnIco;
          } else if (returnIco == undefined) {
            ico.tip = '';
          } else {
            console.warn('tableOptions -> ico.tip 返回值仅支持 string 类型');
          }
        } else {
          console.warn('tableOptions -> ico.tip 仅支持 string、function 类型');
        }
      }
    } else {
      console.warn('tableOptions -> ico 仅支持 string、object、function 类型');
    }
  }
  return ico;
});
(function init() {
  // ico 和 状态都显示的时候，判断显示顺序
  if (props.bodyItem.status !== undefined && props.bodyItem.ico !== undefined) {
    for (let item in props.bodyItem) {
      if (item === 'ico' || item === 'status') {
        obj.first = item;
        return;
      }
    }
  }
})();
</script>
<style lang="scss" scoped>
span {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
}
// 状态
.icon-dian {
  transform: scale(0.375);
}
</style>

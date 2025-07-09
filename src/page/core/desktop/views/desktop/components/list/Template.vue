<template>
  <div class="template-wrapper">
    <el-tooltip :content="icoRender(rowData.platform).title" placement="top">
      <svg class="svg-icon">
        <use :xlink:href="icoRender(rowData.platform).link"></use>
      </svg>
    </el-tooltip>
    <span v-hide class="name">{{ rowData.templateName }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  rowData: any;
}>();
function icoRender(ico: any) {
  let svgIco = {
    link: '',
    title: ''
  };
  switch (ico) {
    case 'win10':
      svgIco = {
        link: '#icon-win10',
        title: 'Win10'
      };
      break;
    case 'win7':
      svgIco = {
        link: '#icon-win7',
        title: 'Win7'
      };
      break;
    case 'linux':
      svgIco = {
        link: '#icon-linux',
        title: 'Linux'
      };
      break;
    case 'qilin':
      svgIco = {
        link: '#icon-qilin',
        title: '麒麟'
      };
      break;
    case 'tongxin':
      svgIco = {
        link: '#icon-uos',
        title: '统信'
      };
      break;
    default:
      svgIco = {
        link: '#icon-win10',
        title: 'Win10'
      };
      break;
  }
  return svgIco;
}
</script>
<style scoped lang="scss">
.template-wrapper {
  display: flex;
  align-items: center;
  :deep(.el-only-child__content) {
    display: flex;
    align-items: center;
  }
  .name {
    margin-left: 5px;
    max-width: calc(100% - 21px);
  }
}
</style>

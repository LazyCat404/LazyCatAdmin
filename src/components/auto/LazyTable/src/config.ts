// 默认表格设置
export const config = {
  select: false,
  selectFixed: null, // left、right、null
  border: false,
  tableH: '100%',
  headerH: '56px',
  lineH: '56px',
  headerBg: '#fff',
  headerBorder: true, // 表头边框
  oddBg: '#F1F5FB',
  evenBg: '#fff',
  align: 'left', // left、right、 center、null ,可以设置表格整体对齐方式，也可以设置单列对齐方式
  tip: true, // 显示一行超出隐藏，也可设置单列
  fitContent: false // 限制表格高度，true 限制，默认100%，false:不限制，表格高度等于内容高度
};

// 列状态颜色定义
export const stateColor = {
  1: '#409eff',
  2: '#67c23a',
  3: '#909399',
  4: '#e6a23c',
  5: '#f56c6c'
};

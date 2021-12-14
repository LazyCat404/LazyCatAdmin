# 表格

## 单行可编辑

> 表头编辑 ico 可编辑行默认显示

以下条件不显示：

- `tableOptions.edit === undefined` ：不显示，不可编辑 

- `tableOptions.edit === false` ：不显示，不可编辑 

- `tableOptions.edit.show === false`：可编辑，但不显示


### 类型

> 输入框的类型：`tableOptions.edit.type`

可能的值:

- `text`：默认，单行文本输入框

- `textrea`:   多行文本输入框

- `number`：数字输入框

- `date`： 时间

- `select`：下拉选

### 验证规则

> 原则上可以自定义规则：`tableOptions.edit.inspect`

### 失败提示

`tableOptions.edit.err`




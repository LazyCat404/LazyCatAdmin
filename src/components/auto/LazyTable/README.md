# 表格

## 通用配置 - tableConfig

> 可在`config.ts`中设置默认通用配置

- `select`：是否开启复选框，`true/false`

- `selectFixed`：复选框固定，仅在开启复选框时有效，`left、right、null`

- `border`：是否显示表格框线，`true/false`

- `tableH`：表格高度，任意 `css` 可识别值，不加单位时默认 `px`

- `headerH`：表头高度，任意 `css` 可识别值，不加单位时默认 `px`

- `lineH`：表体行高，任意 `css` 可识别值，不加单位时默认 `px`

- `headerBg`：表头背景色

- `oddBg`：表体奇数行背景色

- `evenBg`：表体偶数行背景色

- `align`：表体内容对齐方式，`left、right、 center、null`；也可单列设置，详见下文

- `tip`：表体内容超出是否隐藏，并显示提示框，`true/false`；也可单列设置，详见下文

## 表格配置 - tableOptions

> 数组，扩展 `elm-table options`配置

### 常用配置

- `prop`：显示字段

- `label`：对应表头显示文字

- `width`：列宽

- `minwidth`：最小列宽

- `align`：单列对齐方式，同 `tableConfig.align`

- `tip`: 单列超出是否隐藏，同 `tableConfig.tip`


### 开关（switch ）行

> 通过设置 `switch` **为真**，可开启开关行，仅支持`Object`、`String`、`Number`、`Boolean`

- 当 `switch`类型为`Number` 或 `String`时，`switch` 的值就是`switch`的 `activeValue`值

- 当 `switch`类型为 `Object` 时，会自动检测`tableData` 对应值的类型，如果该值为 `Boolean` 则不需要额外设置`activeValue`，否，则需要，若不设置，会默认依据`Boolean`类型做出判断

```js
// switch 为对象时支持的属性
switch: {
    disabled: false, // 是否禁用（不可编辑），默认禁用
    activeColor: 'red'        // 活跃颜色
    inactiveColor:'#f7f7f7'  // 非活颜色
    activeValue: true,      // 活跃值
    inactiveColor:false,   // 非活跃值
    tip: '提示文字',       
    tipActive: '为真时提示替换文字'
    tipInactive: '为假时提示替换文字'
}
```
PS：当`switch.tip`、`switch.tipActive`、`switch.tipInactive`    均未定义时，则不会显示提示框

### 普通行/可编辑行

#### 排序、筛选/过滤

1. `sort`：排序，`des`：降序，`ase`：升序，`null/''`：无默认排序，不区分大小写

2. `filter`：筛选/过滤，`Array`或`Object`

    - 数组类型：默认多选，不可修改

        ```js
        filter: [
            { label: '条件1', value: 1 },
            { label: '条件2', value: 2 }
        ]
        ```

    - 对象类型：默认多选，可修改

        ```js
        filter: {
            list: [
                { label: '条件1', value: 1 },
                { label: '条件2', value: 2 }
            ],
            type: 'select' // select单选，check复选（默认）
        },
        ```

#### 单行可编辑

> 表头编辑 ico 可编辑行默认显示

以下条件不显示：

- `tableOptions.edit === undefined` ：不显示，不可编辑 

- `tableOptions.edit === false` ：不显示，不可编辑 

- `tableOptions.edit.show === false`：可编辑，但不显示


#### 类型

> 输入框的类型：`tableOptions.edit.type`

可能的值:

- `text`：默认，单行文本输入框

- `textrea`:   多行文本输入框

- `number`：数字输入框

- `date`： 时间

- `select`：下拉选

#### 验证规则

> 原则上可以自定义规则：`tableOptions.edit.inspect`

#### 失败提示

`tableOptions.edit.err`




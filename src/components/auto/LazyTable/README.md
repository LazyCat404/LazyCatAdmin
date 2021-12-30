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

### 常用功能

- `state`：状态，可设置颜色的一个小点，值可依据config 文件中自定义的`Key`值

- `ico`：图标，值为 ico 类名，当与`state`同时存在时，属性顺序决定洗显示顺序，

- `color`:列字体颜色

- `icoColor`：列图标颜色（仅有图标时起作用）

- `click`：可点击，`function` 类型，返回当前行数据`rowData`和`prop`对应的字段名

### 表头功能

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

### 自定义（custom）行

> 通过设置`template` 属性，开启自定义行，仅支持`Object`（单文件组件）、`String`（自定义模板）两种类型，设置该属性后，仅**表头功能**和**常用配置生效**，但`prop`不在生效

PS: 此功能主要解决表格自定义操作列，及一般复杂显示，原则上自定行可以加载任意组件到表格中，但为了表格正常显示，**不建议添加超过行高**的内容或组件，若需要显示复杂内容，建议预先设置**行高**。

#### 单文件组件

在父组件内正常引入单文件组件`xx.vue` 将其赋值给`template`即可；可接收参数：`scope`（对应行数据）

#### 自定义模板

`template` 也可以设置成**htlm字符串**，可直接使用`scope`调取对应行数据，如果有调用自定义方法，需要额外注册`methods`属性，使用方法同Vue2

```js
    template: `
        <el-button size="small" @click='myClick(scope)'>点击</el-button>
    `,
    methods: {
      myClick(scope) {
        console.log('单击事件', scope);
      }
    },
```


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

### 可编辑（edit）行 

> 通过设置 `edit` **为真**，开启可编辑行，建议类型`Object` 和 `Boolean`，开启该功能后，对应列的表头会多出一个编辑ico，具体有以下设置

- `tableOptions.edit === undefined` ：不显示，不可编辑 

- `tableOptions.edit === false` ：不显示，不可编辑 

- `tableOptions.edit.show === false`：可编辑，但不显示

PS：当 `edit` 的值是不为 `Object` 的真值时，一切配置均为默认

#### 编辑框类型 `edit.type`

> 当且仅当 `edit` 为 `Object`时，可进行该设置

可能的值:

- `text`：单行文本输入框，未设置 `type`时，编辑框的默认值

- `textrea`:   多行文本输入框

- `number`：数字输入框

- `date`： 日期框，**elm-ui** 日期框支持的全部类型

- `select`：下拉选框

```js
    edit: {
      type: 'select',
      list: [], // 下拉选列表，{label:'xx',value:1} 组成的数组
      selectProp: 'xx'   // tableData 为中选中值的属性名，类似tableOptions.prop，数组则为多选，否则为单选
    }
```

#### 编辑验证 

> 原则上可以自定义规则：依赖 `utils/inspect.ts`

```js
edit:{
    inspect: 'isTel',       //inspect.ts 内 导出的inspect属性key
    err: '手机号验证失败'   // 验证失败后提示文字
}
```







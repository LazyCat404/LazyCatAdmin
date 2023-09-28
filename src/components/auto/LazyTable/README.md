# 表格

## 通用配置 - tableConfig

> 可在`config.ts`中设置默认通用配置

### 常规配置

- `select`：是否开启复选框，`true/false`

- `selectFixed`：复选框固定，仅在开启复选框时有效，`left、right、null`

- `border`：是否显示表格框线，`true/false`

- `tableH`：表格高度容器，非表格实际高度，任意 `css` 可识别值，不加单位时默认 `px`

- `headerH`：表头高度，任意 `css` 可识别值，不加单位时默认 `px`

- `lineH`：表体行高，任意 `css` 可识别值，不加单位时默认 `px`

- `headerBg`：表头背景色

- `headerBorder`：表头（下）边框，`true/false`

- `headerStyle`：自定义表头字体样式，`Object`，`color` 会被 `headerColor/headerActiveColor` 覆盖

- `headerColor`：表头字体颜色

- `headerActiveColor`：表头活跃字体颜色

- `oddBg`：表体奇数行背景色

- `evenBg`：表体偶数行背景色

- `align`：表体内容对齐方式，`left、right、 center、null`；也可单列设置，详见下文

- `tip`：表体内容超出是否隐藏，并显示提示框，`true/false`；也可单列设置，详见下文

- `fitContent`：限制表格高度，`true`：限制，默认100% 即为表格容器高度，`false`：不限制，表格高度等于内容高度

- `statusColor`：状态颜色，`Object`（`statusColor:{ 状态:颜色 }`）

### 附加功能

#### 自定义列

> 只需设置 `tableConfig.customColumn = true`即可

开启该功能后，会自动将`tableOptions`识别为可变列，因此可以通过对`tableOptions` 进行简单设置，以控制某列是否可控

```js
let tableOptions = [{
    label: '操作',
    customColumn: {
        disabled: false,
    }
}]
// 等价于
let tableOptions = [{
    label: '操作',
    disabled: false,
}]

// 以上设置可解释为：操作列不可设置为不显示（隐藏）

```
>`customColumn.show` 是指可操控列（默认）是否显示,可通过交互操作控制显隐；通用配置中的`show`则指该列是否显示，级别要高，隐藏后的列不出现在**自定义列**操作中

#### 导出

> 只需设置 `tableConfig.export = true`即可

该功能并不会真的导出文件，只是将导出条件进行可视化选择，将结果通过`expot`方法传递给父组件

```vue
<template>
    <LazyTable 
    @expot="expotBtn"
    ></LazyTable>
</template>
<script lang="ts" setup>

function expotBtn(par: unknown) {
  console.log('导出：', par);
}
</script>
```

## 表格配置 - tableOptions

> 数组，扩展 `elm-table options`配置

### 表头功能

1. `sort`：排序

    > 可触发回调方法`sortChange({key,type})`

    - 字符串：直接设置默认排序 -> `des`：降序，`ase`：升序，不区分大小写

    - 对象

        ```js
        sort: {
            type:'des'|'ase'|null,  // 非必须，为 null 时，表示无默认排序 
            key:'name' // 非必须，默认 tableOptions.prop
        }
        ```
    - 其他真值：sort 判断为真时，则该列表头启用排序，并分配如下默认值：
        ```js
        sort: {
            type:null,  // 非必须  
            key:'name' // 非必须，默认 tableOptions.prop
        }
        ```
2. `filter`：筛选/过滤，`Array`或`Object`

    > 可触发回调方法`filterChange({key,type,value})`

    - 数组：默认多选，不可修改

        ```js
        filter: [
            { label: '条件1', value: 1 },
            { label: '条件2', value: 2 }
        ]
        ```

    - 对象：默认多选，可修改

        ```js
        filter: {
            list: [
                { label: '条件1', value: 1 },
                { label: '条件2', value: 2 }
            ],
            key:'name',     // 主要用于回调，默认 tableOptions.prop
            type: 'select' // select单选，check复选（默认）
        },
        ```

### 常用配置

- `prop`：显示字段

- `label`：对应表头显示文字

- `width`：列宽

- `minwidth`：最小列宽

- `align`：单列对齐方式，同 `tableConfig.align`

- `tip`: 单列超出是否隐藏，同 `tableConfig.tip`

- `show`：单列是否显示，默认显示，假值时不显示

- `fixed`：固定列，可选值`left、right`,

### 普通（ordinary）列，常用功能

- `status`：状态，可设置颜色的一个小点，值可依据 config 文件中自定义的`Key`值，支持`string`、`number`、`function({bodyItem,rowData})`返回值若为颜色即渲染值，其他则转为字符串作为`key`值

- `ico`：图标，值为 ico 类名，支持`string`、`Object`、`function({bodyItem,rowData})`返回值即为渲染值

    ```js
    // ico 为 对象时，每个属性也可支持`string`、`function({bodyItem,rowData})`
    ico:{
        name:'',    
        color:'',
        tip:''
    }
    ```

PS：`ico`/`status`设置顺序决定显示顺序

- `style`:列字样式，支持`string`或`function({bodyItem,rowData})`返回值即为渲染值

- `color`:列字体颜色，支持`string`或`function({bodyItem,rowData})`返回值即为渲染值

- `fontWeight`:列字体加粗，支持`string`、`number`或`function({bodyItem,rowData})`返回值即为渲染值

PS：定义了`style`后，`color`、`fontWeight`等样式相关属性，不在起作用

- `click`：可点击，`function({bodyItem,rowData})` 类型

- `mark`：如果`prop`对应内容为数组时，该属性可设置间隔符，建议`string`类型

- `copy`：可复制，支持`boolean`、`string`或`function({bodyItem,rowData})`返回值即为复制内容值

### 渲染（render）列

> 表格配置项（`tableOptions`）存在 `render`则认定为是渲染行，常用功能可用

- `string`：将字符串以`v-html`方式直接渲染到表格中

- `function`：接收一个参数`{bodyItem,rowData}`，并将返回结果以`v-html`方式直接渲染到表格中

PS：可以理解为简易方式的自定义行，与下边*自定义行*不同，渲染行可接受一个`string`或`function`，且`click`、`color`、`fontWeight`、`style`等不会失效

### 自定义（custom）列

> 表格配置项（`tableOptions`）不存在`prop`则认定为是自定义行，同时**必须**设置渲染模板`template`，且仅支持`Object`（单文件组件）、`String`（自定义模板）两种类型。

- 此功能主要解决表格自定义操作列，及一般复杂显示，原则上自定行可以加载任意组件到表格中，但为了表格正常显示，**不建议添加超过行高**的内容或组件，若需要显示复杂内容，建议预先设置**行高**。

PS：使用该行时，`click`、`color`等配置会失效，所有渲染由模板决定

#### 单文件组件

在父组件内正常引入单文件组件`xx.vue` 将其赋值给`template`即可；可接收参数：`rowData`（对应行数据）

PS：`tip` 配置不在起作用

#### 自定义模板

`template` 也可以设置成**htlm字符串**，可直接使用`rowData`调取对应行数据，如果有调用自定义方法，需要额外注册`methods`属性，使用方法同Vue2

```json
  {
    label: '操作',
    methods: {
        myClick(rowData) {
            console.log('单击事件', rowData);
        }
    },
    template: `<span @click="myClick(rowData)">按钮</span>`  // 正常加载
    // template: `<el-button>按钮click</el-button>` // （UI库按需加载导致）无法正常加载
  }
```

### 开关（switch ）列

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
    tipInactive: '为假时提示替换文字',
    beforeChange: (bodyItem, rowData) => {  // switch 状态改变前的钩子
        return false;
    }
}
```
PS：当`switch.tip`、`switch.tipActive`、`switch.tipInactive`    均未定义时，则不会显示提示框

### 进度条（progress ）列

> 通过设置 `progress` **为真**，可开启开关行，仅支持`Object`、`Function`、`Boolean`，当类型为`String`、`Number`及其它类型时，同 `Boolean` 处理

- 当 `progress`类型为 `Function` 时，接收一个参数`{ bodyItem, rowData }`，返回值将被自动转为`number`类型，没有返回值时当`0`处理

- 当 `progress`类型为 `Object` 时，具有以下属性，且所有属性**均非必须**：

```json
progress: {
    value:87,   // 进度值，任意可转为Number值的类型，若为function时则取返回值，未定义时，自动取rowData[prop]
    color:'#409eff', // 进度条已走过进度颜色：同tableOptions->color
    showText:true,   // 是否显示进度值百分比：默认显示
    textColor:'#409eff'// 进度值百分比文字颜色，同tableOptions->color
    emptyText:({ bodyItem, rowData })=>{},  // 进度条为空时，进度文字显示内容：仅支持function 类型，返回值以v-html渲染到原文字处
}
```

- 当 `progress`为其它类型时取`prop`对应值

### 可编辑（edit）列 

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

```json
{
    edit: {
      type: 'select',
      list: [], // 下拉选列表，{label:'xx',value:1} 组成的数组
      selectProp: 'xx'   // tableData 选中值的属性名，类似tableOptions.prop，数组则为多选，否则为单选
    }
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

## 分页 - page

请查看 [分页组件](../LazyPage/README.md)

## 合并单元格 - span-method

同 [element-plus](https://element-plus.gitee.io/zh-CN/component/table.html#table-属性)
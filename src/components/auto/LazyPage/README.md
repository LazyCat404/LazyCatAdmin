# 分页

> 分页组件已嵌入**LazyTable**，使用方法同下

## 属性 page

```json
  page: {
    pageNum: 1,
    total: 0,
    pageSize: 20
  }
```

- `pageNum`：当前页数；`number`类型

- `total`：总数，为`0`时，（可能）不显示分页组件； `number`类型

- `pageSize`：每页显示条数；`number`类型

- `simple`：简易模式；非必须，仅支持**布尔**、**对象**、**数组**类型

    - 布尔值：默认为`true`，非极简；为`false`时，开启极简，仅显示分页

    - 对象：以下属性均为非必填，对应值皆为默认
        ```json
        simple:{
            hideSingle:true,    // 单页隐藏，为真时，page.total = 0 时不显示分页组件
            total:true,         // 是否显示 总数
            pageSize:true,      // 是否显示 分页条数选择  
            goPage:true,        // 是否显示 前往 n 页
            small:false         // 缩小显示 分页页码
        }
        ```

    - 数组：`['hideSingle', 'total', 'pageSize', 'goPage', 'small']`，数组内含有的值即为**真**  

- `float`：非必须，值仅支持`left`，靠左显示

## 方法 pageOper

> 组件的任何操作都会触发该方法，接收一个参数

```js
interface pageData {
    pageNum: number;    // 当前页码
    pageSize: number;   // 每页显示条数
    operType: string;   // 操作类型，pageNum、pageSize、goPage
}
// 分页操作
function pageOper(pageData: pageData) {
  console.log(pageData);
}
```

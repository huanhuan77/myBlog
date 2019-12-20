- 在 src/utils/index.js 编写文件，可以是公共的函数
- 在main.js中绑定函数方法
```js
// 引用工具文件
 import utils from './utils/index.js'
 // 将工具方法绑定到全局
 Vue.prototype.$utils = utils
```
```js
使用函数
$utils.函数名
```

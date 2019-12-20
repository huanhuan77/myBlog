- 在public下新建文件 config/index-dev.js  生产环境       config/index-pro.js开发环境
::: warning
注意:public文件夹下的文件不会被编译
:::
- 在public/index.html中引入文件
```js
<% if (process.env.NODE_ENV === 'production') { %>
    <!-- 生产环境 -->
    <script src="./config/index-pro.js"></script>
    <% }else { %>
    <!-- 开发环境 -->
    <script src="./config/index-dev.js"></script>
 <% } %>
```
- public/config/index-dev.js
```js
/**
 * 开发环境
 */
(function () {
  window.SITE_CONFIG = {};
  // api接口请求地址
  window.SITE_CONFIG.baseUrl = //'http://192.168.20.31:8082/rest/';
}());
```
- public/config/index-pro.js
```js
/**
 * 生产环境
 */
(function () {
  window.SITE_CONFIG = {};
  // api接口请求地址
  window.SITE_CONFIG.baseUrl = //'http://192.168.20.31:8082/rest/';
}());
```
- axios调用
```js
const service = axios.create({

```

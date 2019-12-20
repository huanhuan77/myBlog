<https://blog.csdn.net/skyblacktoday/article/details/80255348>
- 安装
```js
npm install --save js-md5
```
- 在main.js中使用
```js
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
```
- 在需要用到的文件中使用
```js
password: this.$md5(this.formLogin.password)
```

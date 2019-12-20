## [keep-alive](https://www.jb51.net/article/140188.htm)
```js
//需要缓存的页面直接在router中添加
meta: {
 keepAlive: true // true 表示需要使用缓存 false表示不需要被缓存
 }
 
 //在app.vue中
 <div id="app">
    <!-- 缓存所有的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
```
## [前进刷新  后退不刷新](https://segmentfault.com/a/1190000012083511)
## [vue缓存页面返回到指定滚动位置](https://www.cnblogs.com/lcf1314/p/8377571.html)
```html
//需要滚动的区域
<div class='main' id='main'>
    //内容
</div>
```
```js
export default{
    data(){
        return{
           scroll:'' 
        }
    },
  mounted() {
    const main = document.getElementById('#main');
    main.addEventListener('scroll', this.handleScroll);
  },
  activated() {
    const main = document.getElementById('#main');
    if (this.scroll > 0) {
      main.scrollTo(0, this.scroll);
      this.scroll = 0;
      main.addEventListener('scroll', this.handleScroll());
    }
  }, 
    methods:{
      handleScroll() {
      const main = document.getElementById('main');
      this.scroll = main.scrollTop;
    },
    }
}

//让元素回到顶部
const main = document.getElementById('#main');
        main.scrollTop = 0;
```

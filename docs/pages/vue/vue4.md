<https://www.cnblogs.com/hongsusu/p/8966386.html>
```js
 this.detail.list.forEach((item) => {
      // 触发视图更新   自己定义的属性不会更新  要在data里面定义的或者$set出来的才会更新
      this.$set(item, 'checkList', []);
      });
      //this.$set(对象名,'属性名',属性值)
      //this.$delete 删除属性
```

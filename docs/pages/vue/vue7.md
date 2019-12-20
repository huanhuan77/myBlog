<https://blog.csdn.net/qq_37473645/article/details/83176633>
```js
 <div class="btn" @click="login()">登陆</div>
  created() {
    const local = window.localStorage.getItem('checked')
    if (local == 'true') {
      this.checked = true
    }
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    login() {
    //校验输入是否为空或格式是否正确
    ...
      // 判断复选框是否被勾选,勾选则调用cookie方法
      if (this.checked == true) {
      // 传入账号,密码,和保存天数3个参数
          this.setCookie(this.account, this.pwd, 7);
        } else {
          // 清空cookie
          this.setCookie('', '', -1);
        }
          window.localStorage.setItem('checked', this.checked)
      // ajax请求
      console.log('登录成功');
    },

    // 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      const exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      window.document.cookie = `${'account' + '='}${c_name};path=/;expires=${exdate.toGMTString()}`;
      window.document.cookie = `${'pwd' + '='}${c_pwd};path=/;expires=${exdate.toGMTString()}`;
    },
    getCookie() {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split(';');
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split('=');
          if (arr2[0].trim() == 'account') { //去除空格
            this.account = arr2[1];
          } else if (arr2[0].trim() == 'pwd') {
            this.pwd = arr2[1];
          }
        }
      }
    },


//清除全部的cookie
clearcookie() {
      const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (let i = keys.length; i--;) document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`;
      }
    }
```

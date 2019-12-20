## CSS
- src/assets/public.scss
```scss
$vm_base:375;  //设计图的宽度
@function vw($px) {
  @return ($px / $vm_base) * 100vw;
}

header,
main,
*{
  margin: 0;
  padding: 0;
}
html,#app{
  height: 100%;
}
div{
  box-sizing: border-box;
}
body{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $body_background_color;
}
footer{
  display: inline-block;
  width: 100%;
  height: vw(50);
  background: #f4f4f4;
}
header {
  width: 100%;
  height: vw(40);
}
main{
  width: 100%;
  height: 0;
  flex-grow: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  *{
    font-size: vw(15);
  }

}
```
## 配置文件
```js
npm i vant -S   //安装vant
```
- main.js
```js
import Vant from 'vant';
import 'vant/lib/index.css';

// 页面修改时修改浏览器标签栏
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
```
- vue.config.js
```js
const webpack = require('webpack');

const publicPath = process.env.NODE_ENV === 'production' ? '/项目名称/' : '/';
module.exports = {
  // 内网穿透
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true, // 解决无效的头部信息
    // port: 8081,
  },
  publicPath,
  lintOnSave: false,
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
          //旧版
        data: '@import \'~@/assets/style/public.scss\';',
          //新版
       prependData: '@import "~@/assets/style/public.scss";',
      },
    },
  },
};
```
- router
```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/survey-asked/',  //项目名  只有history模式需要
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login'),
      meta: { title: '登录' },
    },
  ],
});

export default router;
```
## [axios请求](https://www.kancloud.cn/yunye/axios/234845)
```js
npm install axios    //安装axios
```
- 配置请求地址
> 权限接口请求地址  //puplic/config/authUrl.js
```js
let authUrl = '';
switch (process.env.NODE_ENV) {
  case 'development':
    authUrl = 'http://192.168.20.33:8888/'; // 这里是本地的请求url
    break;
  case 'production':
    authUrl = 'http://192.168.20.33:8888'; // 生产环境url
    break;
}

export default authUrl;
```
> api接口  //public/config/apiUrl.js
```js
let baseUrl = '';
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://192.168.20.33:8086/wechat/';
    break;
  case 'production':
    baseUrl = 'http://192.168.20.33:8086/wechat/'; // 生产环境url
    break;
}

export default baseUrl;
```
## 拦截器
- 权限接口拦截器  //src/axios/auth/index.js
```js
import axios from 'axios';
import { Toast, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import router from '../../router';
import authUrl from '../../../public/config/authUrl.js';

// 创建一个错误
function errorCreate(msg) {
  const err = new Error(msg);
  throw err;
}

const service = axios.create({
  baseURL: authUrl,
  timeout: 6000 * 10,
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    Loading.open('加载中');
    let token = `Bearer ${window.localStorage.getItem('token')}`;
    // 过滤code请求接口
    if (config.url.indexOf('auth/code') === 0) {
      token = 'Basic Ymk6Ymk=';// 应用授权代码
    }
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  ((error) => {
    Toast({
      mes: '请求失败',
      icon: 'error',
    });
    return Promise.reject(error);
  }),
);

// 响应拦截器，自定义响应
service.interceptors.response.use((response) => {
  Loading.close();
  // console.log(response);
  const { code } = response.data;

  switch (code) {
    case 0:
      return response.data;

    case 1:
      setTimeout(() => {
        router.replace({
          name: 'userNotFound',
          query: { info: response.data.msg },
        }, 1000);
      });
      break;

    case 401:
      setTimeout(() => {
        router.replace({
          name: 'userNotFound',
          query: { info: response.data.msg },
        }, 1000);
        window.localStorage.clear();
      });
      break;

    default:
      // 不是正确的code   抛出异常
      errorCreate(Toast({
        mes: `${response.data.msg}`,
        icon: 'error',
      }));
      break;
  }

},
((error) => {
  Loading.close();
  if (error && error.response) {
    switch (error && error.response.status) {
      case 400:
        Toast({
          mes: '对不起,页面走丢了(400)',
          icon: 'error',
        });
        break;
      case 401:
        setTimeout(() => {
          router.replace({
            name: 'userNotFound',
            query: { info: error.response.data.msg },
          }, 1000);
          window.localStorage.clear();
        });
        break;
      case 403:
        Toast({
          mes: '服务器繁忙,请稍后重试(403)',
          icon: 'error',
        });
        break;
      case 404:
        Toast({
          mes: '对不起,页面走丢了(404)',
          icon: 'error',
        });
        break;
      case 408:
        Toast({
          mes: '请求超时,请重新登录(408)',
          icon: 'error',
        });
        break;
      case 500:
        Toast({
          mes: '服务器繁忙,请稍后重试(500)',
          icon: 'error',
        });
        break;
      case 503:
        Toast({
          mes: '服务器繁忙,请稍后重试(503)',
          icon: 'error',
        });
        break;
      case 504:
        Toast({
          mes: '网络超时,请检查网络(504)',
          icon: 'error',
        });
        break;
      default:
        break;
    }
  } else {
    Toast({
      mes: '连接服务器失败',
      icon: 'error',
    });
  }
  return Promise.reject(error);
}));
export default service;
```
- api请求拦截器  //src/axios/api/index.js
```js
import axios from 'axios';
import { Toast, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import baseUrl from '../../../public/config/apiUrl.js';
import router from '../../router';

// 创建一个错误
function errorCreate(msg) {
  const err = new Error(msg);
  throw err;
}

const service = axios.create({
  baseURL: baseUrl,
  timeout: 6000 * 10,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {

    // 添加headers参数
    Loading.open('加载中');
    const token = `Bearer ${window.localStorage.getItem('token')}`;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  ((error) => {
    // 对请求错误的处理
    Toast({
      mes: '请求失败',
      icon: 'error',
    });
    return Promise.reject(error);
  }),
);

// 响应拦截器
service.interceptors.response.use((response) => {
  Loading.close();
  // 对响应数据处理
  const { code } = response.data;

  switch (code) {
    case 0:
      return response.data;
    case 1: // 错误
      return Toast({
        mes: `${response.data.msg}`,
        icon: 'error',
      });

    case 401: // 请重新登录 // 无权限
      setTimeout(() => {
        router.replace({
          name: 'userNotFound',
          query: { info: response.data.msg },
        }, 1000);
        window.localStorage.clear();
      });
      break;
    default:
      // 不是正确的code   抛出异常
      errorCreate(Toast({
        mes: `${response.data.msg}`,
        icon: 'error',
      }));
      break;
  }
},
((error) => {
  Loading.close();
  if (error && error.response) {
    switch (error && error.response.status) {
      case 400:
        Toast({
          mes: '对不起,页面走丢了(400)',
          icon: 'error',
        });
        break;
      case 401:
        setTimeout(() => {
          router.replace({
            name: 'userNotFound',
            query: { info: error.response.data.msg },
          }, 1000);
          window.localStorage.clear();
        });
        break;
      case 403:
        Toast({
          mes: '服务器繁忙,请稍后重试(403)',
          icon: 'error',
        });
        break;
      case 404:
        Toast({
          mes: '对不起,页面走丢了(404)',
          icon: 'error',
        });
        break;
      case 408:
        Toast({
          mes: '请求超时,请重新登录(408)',
          icon: 'error',
        });
        break;
      case 500:
        Toast({
          mes: '服务器繁忙,请稍后重试(500)',
          icon: 'error',
        });
        break;
      case 503:
        Toast({
          mes: '服务器繁忙,请稍后重试(503)',
          icon: 'error',
        });
        break;
      case 504:
        Toast({
          mes: '网络超时,请检查网络(504)',
          icon: 'error',
        });
        break;
      default:
        break;
    }
  } else {
    Toast({
      mes: '连接服务器失败',
      icon: 'error',
    });
  }
  return Promise.reject(error);
}));
export default service;
```
## api统一管理
- api接口 //src/api/api/index
```js
import request from '@/axios/api';

export function stockStyle(data) {
  return request({
    url: 'stock/style',
    method: 'post',
    data,
  });
}
```
- 权限接口 //src/api/auth/index
```js
import request from '@/axios/auth';

// 获取token
export function code(params) {
  return request({
    url: 'auth/code',
    method: 'get',
    params,
  });
}
```

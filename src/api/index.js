import http from "./http";

class BaseApi {
  constructor(url, params, method, headers, config, vue) {
    return new Promise((resolve, reject) => {
      http({
        //这里是你自己的请求方式、url和data参数
        method: method,
        url: config.toString() + url,
        data: params,
        //假设后台需要的是表单数据这里你就可以更改
        headers: headers,
      })
        .then(function (res) {
          if (res.code !== 1 && res.msg) {
            if (vue && vue.$message) vue.$message.info(res.msg);
            else alert(res.msg);
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch(function (err) {
          if (vue && vue.$message)
            vue.$message.error("服务器错误，请联系管理员");
          else alert("服务器错误，请联系管理员");
          reject(err);
        });
    });
  }
}

// new 的时候需要指定 Config
class Api {
  // 配置类
  config;
  // vue的this 对象私有方法 私有方法必须有 Babel编译器进行编译才能使用，没有此环境不要用
  vue;

  constructor(config) {
    this.config = config;
    this.initHeaders();
  }

  initVue(vue) {
    this.vue = vue;
  }

  initHeaders() {
    let headers = localStorage.getItem(this.config.name + "-Headers");
    let data = JSON.parse(headers);
    if (headers && data) this.AddHeaders(data);
  }

  headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    // "Content-Type": "application/json; charset=utf-8",
  };

  Get(url, params) {
    return new BaseApi(url, params, "get", this.headers, this.config, this.vue);
  }

  Post(url, params) {
    return new BaseApi(
      url,
      params,
      "post",
      this.headers,
      this.config,
      this.vue
    );
  }

  Put(url, params) {
    return new BaseApi(url, params, "put", this.headers, this.config, this.vue);
  }

  Delete(url, params) {
    return new BaseApi(
      url,
      params,
      "delete",
      this.headers,
      this.config,
      this.vue
    );
  }

  BaseApi(url, params, method, headers) {
    return new BaseApi(url, params, method, headers, this.config, this.vue);
  }

  AddHeaders(obj) {
    if (!obj) return;
    Object.keys(obj).forEach((item) => {
      this.headers[item] = obj[item];
    });
    localStorage.setItem(this.config.name + "-Headers", JSON.stringify(obj));
  }
}

export default Api;

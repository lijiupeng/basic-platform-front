class BaseConfig {
  protocol = "http";
  ip;
  port = "15673";
  root = "strong_learning_police_baotou";
  prefix = "";
  name = "baseConfig";
  // 是否开启模拟数据
  mock = false;

  constructor() {}
  toString() {
    return `${this.protocol}://${this.ip}${
      (this.port && ":" + this.port) || ""
    }/${(this.root && this.root + "/") || ""}${
      (this.prefix && this.prefix + "/") || ""
    }`;
  }
}

/**
 * 本地环境配置
 */
class LocalConfig extends BaseConfig {
  uploadfile = "47.94.246.198:16701";
  constructor() {
    super();
    // super.ip = '47.95.9.53'
    // super.port = '6633'
    // super.root = 'strong_learning_police'

    // super.ip = '192.168.0.149'
    // super.port = '6766'

    super.ip = "47.94.246.198";
    super.port = "16701";
    // 是否开启模拟数据
    super.mock = true;
  }
}

/**
 * 生产环境配置
 */
class ProdClass extends BaseConfig {
  uploadfile = "47.94.246.198:16701";
  constructor() {
    super();
    // super.ip = '47.95.9.53'
    // super.port = '6766'
    super.ip = "47.94.246.198";
    super.port = "16701";
    // 是否开启模拟数据
    super.mock = true;
  }
}

export default process.env.NODE_ENV !== "production"
  ? new LocalConfig()
  : new ProdClass();

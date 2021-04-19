<template>
  <div class="login-box">
    <div>
      <div class="login-logo">
        <i class="el-icon-office-building"></i>
        <span class="title">基础平台</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="refForm">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            size="large"
            placeholder="admin"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            size="large"
            type="password"
            placeholder="123456"
            prefix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="handleSubmit()"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  // getCurrentInstance,
} from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    // const { ctx } = getCurrentInstance();

    const formControl = reactive({
      submitLoading: false,
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
        ],
      },
      handleSubmit() {
        this.$refs["refForm"].validate((valid) => {
          if (!valid) return;
          this.submitLoading = true;
          this.$Api
            .Post("login", {
              username: this.formData.username,
              password: this.formData.password,
            })
            .then((response) => {
              this.$Api.AddHeaders({ token: response.data });
              localStorage.setItem("token", response.data);
              this.$router.push("/user");
            })
            .catch(() => {
              this.submitLoading = false;
            });
        });
      },
    });
    onMounted(() => {});
    return {
      ...toRefs(formControl),
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~@/assets/images/login.svg");
  background-size: 100% 100%;

  .login-logo {
    margin-bottom: 30px;
    height: 50px;

    i {
      font-size: 40px;
      margin-right: 10px;
    }

    .title {
      font-size: 38px;
    }
  }

  .el-form {
    width: 350px;

    .el-button {
      width: 100%;
    }
  }
}
</style>

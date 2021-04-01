<template>
  <el-container>
    <Menu :is-collapse="isCollapse"></Menu>
    <el-container>
      <el-header height="70px">
        <el-row>
          <el-col :span="8" class="btn-menu">
            <el-button
              type="text"
              :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="isCollapse = !isCollapse"
            ></el-button>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8" class="user">
            <div class="user-info">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <span class="user-name">{{ userName }}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <div class="position">
          <div class="local">
            <i class="el-icon-s-home"></i>
            <span>{{ currentPageName }}</span>
          </div>
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                ><span class="router-name">首页</span></el-breadcrumb-item
              >
              <el-breadcrumb-item
                ><span class="router-name">首页</span></el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </div>
        <div>
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./Menu";
import { defineComponent, toRefs, reactive } from "vue";

export default defineComponent({
  name: "Layout",
  components: { Menu },
  props: {},
  setup() {
    const menuControl = reactive({
      isCollapse: false,
    });

    const userControl = reactive({
      userName: "超级管理员",
    });

    const breadcrumbControl = reactive({
      currentPageName: "首页",
    });

    return {
      ...toRefs(menuControl),
      ...toRefs(userControl),
      ...toRefs(breadcrumbControl),
    };
  },
});
</script>

<style scoped lang="scss">
.el-header {
  background: linear-gradient(
    to right,
    rgb(0, 213, 230) 10%,
    rgb(31, 114, 162) 100%
  );
  .btn-menu {
    line-height: 70px;
    text-align: left;
    .el-button {
      color: #fff;
      font-size: 18px;
    }
  }
  .user {
    .user-info {
      line-height: 70px;
      float: right;

      .el-avatar {
        vertical-align: middle;
        margin-right: 10px;
      }
      .user-name {
        color: #fff;
      }
    }
  }
}
.main {
  padding: 0;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 130px;
    z-index: 1;
    background: linear-gradient(
      to right,
      rgb(0, 213, 230) 10%,
      rgb(31, 114, 162) 100%
    );
  }
  .el-main {
    z-index: 3;
    padding: 0;
  }
  .position {
    color: #fff;
    position: relative;
    z-index: 2;
    margin: 0 20px;
    .local {
      float: left;
      i {
        vertical-align: middle;
        font-size: 24px;
        display: inline-block;
        padding: 5px;
        border: 2px solid #fff;
        border-radius: 10px;
      }
      span {
        margin-left: 10px;
        font-size: 18px;
        line-height: 70px;
        transform: translateY(2px);
      }
    }
    .breadcrumb {
      float: right;
      line-height: 70px;
      .el-breadcrumb {
        display: inline-block;
        vertical-align: middle;
        .router-name {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
}
.main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  background: transparent;
}
.main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  //border-radius: 10px;
  background-color: #1f72a2;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  //border-radius: 10px;
}
</style>

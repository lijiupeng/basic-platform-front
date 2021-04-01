<template>
  <el-aside :width="isCollapse ? '65px' : '200px'">
    <div class="menu-head">
      <span class="logo"></span>
      <span class="title">基础平台</span>
    </div>
    <div class="menu-body">
      <el-menu default-active="2" :collapse="isCollapse">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "Menu",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
});
</script>

<style scoped lang="scss">
.menu-head {
  height: 70px;
  padding: 0 25px;
  text-align: left;
  line-height: 70px;
  .title {
    font-size: 18px;
  }
}
.menu-body {
  text-align: left;
  .el-menu {
    border: 0;
  }
}
.el-aside {
  box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: width 1s;
}
</style>

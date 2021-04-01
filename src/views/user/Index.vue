<template>
  <el-container>
    <el-header height="135px">
      <div class="filters">
        <el-form :inline="true" :model="filterForm" class="form-filter">
          <el-form-item label="审批人">
            <el-input v-model="filterForm.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="filterForm.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="group-btn">
          <el-button-group>
            <el-button type="primary">添加</el-button>
            <el-button type="primary">删除</el-button>
          </el-button-group>
        </div>
      </div>
    </el-header>
    <div class="table-main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";

export default defineComponent({
  name: "user",
  setup() {
    const formControl = reactive({
      filterForm: {},
    });
    const tableControl = reactive({
      tableData: [],
    });
    for (let i = 0; i < 40; i++) {
      tableControl.tableData.push({ name: i });
    }
    return {
      ...toRefs(formControl),
      ...toRefs(tableControl),
    };
  },
});
</script>

<style scoped lang="scss">
.el-container {
  //background-color: #f2f7f8;
  background-image: linear-gradient(transparent -10px, #f2f7f8);
  .el-header {
    .filters {
      position: relative;
      z-index: 2;
      margin-top: 10px;
      background: #fff;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      height: calc(100% - 10px);
      border-radius: 10px;
      overflow: hidden;
      .form-filter {
        padding-left: 20px;
        margin-top: 10px;
        text-align: left;
      }
      .group-btn {
        text-align: right;
        padding-right: 20px;
      }
    }
  }
  .table-main {
    margin: 20px;
    padding: 0;
    background: #fff;
    //box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
    //border-radius: 10px;
  }
}
</style>

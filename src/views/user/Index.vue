<template>
  <el-container>
    <el-header height="135px">
      <div class="filters">
        <el-form :inline="true" :model="filterForm" class="form-filter">
          <el-form-item label="昵称">
            <el-input v-model="filterForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="filterForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="filterForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="filterForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div class="group-btn">
          <el-button-group>
            <el-button type="primary" @click="dialogFormVisible = true"
              >添加</el-button
            >
            <el-button type="primary">删除</el-button>
          </el-button-group>
        </div>
      </div>
    </el-header>
    <div class="table-main">
      <el-table :data="tableData" v-loading="tableLoading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="username" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="remakes" label="备注"> </el-table-column>
      </el-table>

      <el-pagination
        @size-change="refreshTableData()"
        @current-change="refreshTableData()"
        v-model:current-page="pageInfo.current"
        :page-sizes="[10, 20, 30, 50]"
        v-model:page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>

    <el-dialog title="添加用户" v-model="dialogFormVisible">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formData.nickname" maxlength="26"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remakes">
          <el-input
            v-model="formData.remakes"
            type="textarea"
            :rows="4"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="submitLoading" @click="submit()"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import { defineComponent, toRefs, reactive, getCurrentInstance } from "vue";

export default defineComponent({
  name: "user",
  setup() {
    const { ctx } = getCurrentInstance();

    const filterFormControl = reactive({
      filterForm: {
        nickname: "",
        username: "",
        email: "",
        phone: "",
      },
    });
    const tableControl = reactive({
      tableLoading: true,
      tableData: [],
      pageInfo: {
        current: 1,
        size: 10,
        total: 0,
      },
      refreshTableData() {
        this.tableLoading = true;
        const params = {};
        params["pageInfo.size"] = this.pageInfo.size;
        params["pageInfo.current"] = this.pageInfo.current;
        ctx.$Api
          .Get("system/sys-user", params)
          .then((response) => {
            this.tableData = response.data.records;
            this.pageInfo.total = response.data.total;
            this.tableLoading = false;
          })
          .catch(() => {
            this.tableLoading = false;
          });
      },
    });
    tableControl.refreshTableData();

    const formControl = reactive({
      dialogFormVisible: false,
      formRules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      formData: {
        nickname: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        remakes: "",
      },
      submitLoading: false,
      submit() {
        this.$refs["form"].validate((valid) => {
          if (!valid) return;
          this.submitLoading = true;
          this.$Api
            .Post("system/sys-user", this.formData)
            .then(() => {
              this.submitLoading = false;
              this.dialogFormVisible = false;
              this.refreshTableData();
              this.$message.success("提交成功");
            })
            .catch(() => {
              this.submitLoading = false;
            });
        });
      },
    });

    return {
      ...toRefs(filterFormControl),
      ...toRefs(tableControl),
      ...toRefs(formControl),
    };
  },
});
</script>

<style scoped lang="scss">
.el-container {
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
    .el-pagination {
      margin: 20px 0;
    }
  }
}
</style>

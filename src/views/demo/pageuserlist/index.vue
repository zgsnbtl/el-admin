<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getperm_adds" type="primary">新增用户</el-button>
    </template>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
            <el-table-column label="账号">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改" width="100">
        <template slot-scope="scope">
          <el-button :disabled='scope.$index===0' @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="删除" width="100">
        <template slot-scope="scope">
          <el-button :disabled='scope.$index===0' type="primary" @click="getdel(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改弹出 -->
    <el-dialog title="添加" :before-close="getcl" :visible.sync="dialogFormVisible">
      <el-form ref="formLabelAlign" :model="formLabelAlign">
        <el-form-item prop="name" :rules="rule" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" :rules="rule" label="密码" :label-width="formLabelWidth">
          <el-input type="password" :min="0" v-model="formLabelAlign.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" :rules="rule" label="角色信息" :label-width="formLabelWidth">
          <el-select v-model="formLabelAlign.rid" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getcl">取 消</el-button>
        <el-button type="primary" @click="getform">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹出 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getdele">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="count"
    ></el-pagination>
  </d2-container>
</template>

<script>
import {
  getrole_list,
  getlists,
  getperm_add,
  getperm_list,
  getperm_update,
  getperm_dele
} from "../../../api/http";
export default {
  name: "page1",
  data() {
    return {
      list: null,
      listLoading: true,
      addlist: null,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      formLabelAlign: {
        id:"",
        rid: "",
        name: "",
        pwd: ""
      },
      options:[],
      flagnum: null,
      visible: false,
      deleteid: null, // 删除id
      xgid: null, // 修改id
      count: 0,
      page: 1,
      rule: [{ required: true, message: "不能为空" }] // 表单验证
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    // this.getlist()
    // 列表数据
    this.getList(this.page);
  },
  methods: {
    async getList(page) {
      const data = await getrole_list();
      this.options = data.arr;
      getperm_list({ page }).then(res => {
        this.list = res.arr;
        // this.count = Number(res.arr.count);
        this.listLoading = false;
      });
    },
    getperm_adds() {
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        name: "",
        pwd: ""
      };
      this.flagnum = "add";
    },
    // 添加
    getform() {
      if (this.formLabelAlign.name == "") {
        this.$message.error({
          message: "请输入账号"
        });
        return false;
      }
      if (this.formLabelAlign.pwd == "") {
        this.$message.error({
          message: "请输入密码"
        });
        return false;
      }
      if (this.formLabelAlign.rid == "") {
        this.$message.error({
          message: "请选择角色"
        });
        return false;
      }
      if (this.flagnum === "add") {
        getperm_add(this.formLabelAlign).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getList(this.page);
            this.dialogFormVisible = false;
          }
        });
      }
      if (this.flagnum === "xg") {
        let data = this.formLabelAlign;
        getperm_update(data).then(res => {
          this.getList(this.page);
          this.dialogFormVisible = false;
          this.$message({
            message: "成功",
            type: "success"
          });
        });
      }
    },
    // 修改
    async gettck(item) {
      this.flagnum = "xg";
      this.xgid = item.id;
      this.dialogFormVisible = true;
      console.log(item)
      this.formLabelAlign = {
        id: item.id,
        rid: item.rid,
        name: item.name,
        pwd: ""
      };
    },
    // 删除
    getdel(item) {
      this.deleteid = item.id;
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.deleteid };
      const data = await getperm_dele(id);
      this.getList(this.page);
      this.dialogVisible = false;
    },
    // 关闭
    getcl() {
      this.dialogFormVisible = false;
      this.formLabelAlign = {
        number: "",
        sales: "",
        stores: "",
        peak: "",
        holiday: ""
      };
    },
    // 分页
    handleCurrentChange(val) {
      this.getList(val);
    }
  }
};
</script>

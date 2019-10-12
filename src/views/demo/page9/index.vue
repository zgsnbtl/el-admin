<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加</el-button>
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
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="导航名称">
        <template slot-scope="scope">{{ scope.row.t_name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改" width="100">
        <template slot-scope="scope">
          <el-button @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="删除" width="100">
        <template slot-scope="scope">
          <el-button type="primary" @click="getdel(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改弹出 -->
    <el-dialog title="添加" :before-close="getcl" :visible.sync="dialogFormVisible">
      <el-form :model="formLabelAlign">
        <el-form-item prop="t_name" :rules="rule" label="导航信息" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.t_name" autocomplete="off"></el-input>
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
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="count"
    ></el-pagination> -->
  </d2-container>
</template>

<script>
import Moment from 'moment'
import {
  getnavlist,
  getnavadd,
  getnavup,
  getnavdel
} from "../../../api/http";
export default {
  name: "page9",
  data() {
    return {
      list: null,
      listLoading: true,
      addlist: null,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      formLabelAlign: {
        id: "",
        t_name: ""
      },
      flagnum: null,
      visible: false,
      deleteid: null, // 删除id
      xgid: null, // 修改id
      count: 0,
      page: 1,
      rule: [
        { required: true, message: "不能为空" }
      ] // 表单验证
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
    },
    newsd (data) {
      return Moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    // this.getlist()
    // 列表数据
    this.getList(this.page);
  },
  methods: {
    getList(page) {
      getnavlist().then(res => {
        this.list = res.arr;
        // this.count = Number(res.arr.count);
        this.listLoading = false;
      });
    },
    getadds() {
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        id: "",
        t_name: ""
      };
      this.flagnum = "add";
    },
    // 添加
    getform() {
      if (this.formLabelAlign.t_name == '') {
        this.$message.error({
            message: "不能为空"
          })
        return false
      }
      if (this.flagnum === "add") {
        let add = {
          name: this.formLabelAlign.t_name
        }
        getnavadd(add).then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getList(this.page);
          this.dialogFormVisible = false;
        });
      }
      if (this.flagnum === "xg") {
        let data = {
          id: this.formLabelAlign.id,
          name: this.formLabelAlign.t_name
        }
        // const data = await getmodification(this.formLabelAlign)
        getnavup(data).then(res => {
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
      this.formLabelAlign = {
        id: item.id,
        t_name: item.t_name
      };
    },
    // 删除
    getdel(item) {
      this.deleteid = item.id;
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.deleteid };
      const data = await getnavdel(id);
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
      this.page = val
      this.getList(val);
    }
  }
};
</script>

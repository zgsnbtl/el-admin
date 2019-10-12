<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加成就</el-button>
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
      <el-table-column label="开始时间">
        <template slot-scope="scope">{{ scope.row.addtime }}</template>
      </el-table-column>
      <el-table-column label="高峰节假日"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.holiday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员数"  align="center">
        <template slot-scope="scope">{{ scope.row.members }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="最高峰值数"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.peak }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="销售额"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.sales }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="服务门店数量"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.stores }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatetime }}</span>
        </template>
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
      <el-form ref="formLabelAlign" :model="formLabelAlign">
        <el-form-item prop="number" :rules="rule" label="会员数" :label-width="formLabelWidth">
          <el-input type="number" :min="0" v-model.number="formLabelAlign.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="sales" :rules="rule" label="销售额" :label-width="formLabelWidth">
          <el-input type="number" :min="0" v-model="formLabelAlign.sales" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="stores" :rules="rule" label="服务门店数量" :label-width="formLabelWidth">
          <el-input type="number" :min="0" v-model="formLabelAlign.stores" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="peak" :rules="rule" label="最高峰值数" :label-width="formLabelWidth">
          <el-input type="number" :min="0" v-model="formLabelAlign.peak" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="holiday" :rules="rule" label="高峰节假日" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.holiday" autocomplete="off"></el-input>
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
  getlists,
  getadd,
  getmodification,
  getdelete
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
        id: "",
        number: "",
        sales: "",
        stores: "",
        peak: "",
        holiday: ""
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
    }
  },
  created() {
    // this.getlist()
    // 列表数据
    this.getList(this.page);
  },
  methods: {
    getList(page) {
      getlists({ page }).then(res => {
        this.list = res.arr.info;
        this.count = Number(res.arr.count);
        this.listLoading = false;
      });
    },
    getadds() {
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        number: "",
        sales: "",
        stores: "",
        peak: "",
        holiday: ""
      };
      this.flagnum = "add";
    },
    // 添加
    getform() {
      if (this.formLabelAlign.number == '') {
        this.$message.error({
          message: "请输入会员数"
        })
        return false
      }
      if (this.formLabelAlign.sales == '') {
        this.$message.error({
          message: "请输入销售额"
        })
        return false
      }
      if (this.formLabelAlign.stores == '') {
        this.$message.error({
          message: "请输入服务店数量"
        })
        return false
      }
      if (this.formLabelAlign.peak == '') {
        this.$message.error({
          message: "请输入最高峰值"
        })
        return false
      }
      if (this.formLabelAlign.holiday == '') {
        this.$message.error({
          message: "请输入高峰节假日"
        })
        return false
      }
      if (this.flagnum === "add") {
        getadd(this.formLabelAlign).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "成功",
              type: "success"
            });
            this.getList(this.page);
            this.dialogFormVisible = false;
          }

          // for (let i =0 i<this.list.lengthi++){
          //   this.formLabelAlign[item] = ''
          // }
          this.formLabelAlign = {
            number: "",
            sales: "",
            stores: "",
            peak: "",
            holiday: ""
          };
        });
      }
      if (this.flagnum === "xg") {
        // let id = {id: this.xgid}
        let data = this.formLabelAlign;
        getmodification(data).then(res => {
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
        number: item.members,
        sales: item.sales,
        stores: item.stores,
        peak: item.peak,
        holiday: item.holiday
      };
    },
    // 删除
    getdel(item) {
      this.deleteid = item.id;
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.deleteid };
      const data = await getdelete(id);
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

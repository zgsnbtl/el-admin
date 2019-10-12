<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加</el-button>
    </template>
    <el-tabs style="background:#fff;" @click="getList" v-model="activeName" type="card">
      <el-tab-pane v-for="(item,i) in btlist" :key="i" :label="item.title" :name="item.id">
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
          <el-table-column label="分类名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="修改" width="150">
            <template slot-scope="scope">
              <el-button @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="删除" width="150">
            <template slot-scope="scope">
              <el-button type="primary" @click="getdel(scope.row)" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  -->
      </el-tab-pane>
    </el-tabs>
    <!--  -->
    <!-- 修改弹出 -->
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :before-close="getcl"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="formLabelAlign">
        <el-form-item v-if="seflag" :label-width="formLabelWidth" label="分类名称">
          <el-select v-model="formLabelAlign.status" placeholder="请选择">
            <el-option v-for="item in btlist" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="activeName=='5'" prop="name" :rules="rule" label="标题" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item prop="name" :rules="rule" label="标题" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
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
  </d2-container>
</template>

<script>
import {
  getcoursecn,
  getcoursecnadd,
  getcoursecnup,
  getcoursecndel,
  getcllist,
} from "../../../api/http";
export default {
  name: "page12",
  data() {
    return {
      title: "添加",
      activeName: "1",
      list: null,
      qdlist: null, // 渠道列表
      listLoading: true,
      addlist: null,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "100px",
      formLabelAlign: {
        id: "",
        name: "",
        status: ""
      },
      flagnum: null,
      visible: false,
      xgid: null, // 修改id
      rule: [{ required: true, message: "不能为空" }], // 表单验证
      btlist: [
        { title: "课程", id: "1" },
        { title: "企业动态", id: "2" },
        { title: "电商资讯", id: "3" },
        { title: "公益资讯", id: "4" }
      ],
      seflag: true
    };
  },
  created() {
    this.getList();
  },
  watch: {
    activeName: "getList"
  },
  methods: {
    getList() {
      getcllist({ status: this.activeName }).then(res => {
        this.list = res.arr;
        this.listLoading = false;
      });
    },
    getadds() {
      this.title = "添加";
      this.seflag = true;
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        id: "",
        name: ""
      };
      this.flagnum = "add";
    },
    // 添加
    getform() {
       if (this.flagnum === "add") {
            getcoursecnadd(this.formLabelAlign).then(res => {
              this.$message({
                message: "成功",
                type: "success"
              });
              this.getList();
              this.dialogFormVisible = false;
            });
          }
          if (this.flagnum === "xg") {
            let data = this.formLabelAlign;
            // const data = await getcoursecnup(this.formLabelAlign)
            getcoursecnup(data).then(res => {
              this.getList();
              this.dialogFormVisible = false;
              this.$message({
                message: "成功",
                type: "success"
              });
            });
          }
     
      // if (this.activeName === "5") {
      //   if (this.flagnum === "add") {
      //     getchanneladd(this.formqd).then(res => {
      //       this.$message({
      //         message: "成功",
      //         type: "success"
      //       });
      //       this.getList();
      //       this.dialogFormVisible = false;
      //     });
      //   }
      //    if (this.flagnum === "xg") {
      //       getC_changes(this.formqd).then(res => {
      //         this.getList();
      //         this.dialogFormVisible = false;
      //         this.$message({
      //           message: "成功",
      //           type: "success"
      //         });
      //       });
      //     }
      //   } else {
      //     if (this.flagnum === "add") {
      //       getcoursecnadd(this.formLabelAlign).then(res => {
      //         this.$message({
      //           message: "成功",
      //           type: "success"
      //         });
      //         this.getList();
      //         this.dialogFormVisible = false;
      //       });
      //     }
      //     if (this.flagnum === "xg") {
      //       let data = this.formLabelAlign;
      //       // const data = await getcoursecnup(this.formLabelAlign)
      //       getcoursecnup(data).then(res => {
      //         this.getList();
      //         this.dialogFormVisible = false;
      //         this.$message({
      //           message: "成功",
      //           type: "success"
      //         });
      //       });
      //     }
      //   }
      // }
    },
    // 修改
    async gettck(item) {
      this.title = "修改";
      this.seflag = false;
      this.flagnum = "xg";
      this.xgid = item.id;
      this.dialogFormVisible = true;
      console.log(item);
      this.formLabelAlign = {
          id: item.id,
          name: item.name,
          status: item.status
        };
    },
    // 删除
    getdel(item) {
      this.xgid = item.id;
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.xgid };
      const data = await getcoursecndel(id);
      this.getList(this.page);
      this.dialogVisible = false;
    },
    // 关闭
    getcl() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style lang="scss">
// .demo-table-expand {
//   font-size: 0;
// }
// .demo-table-expand label {
//   width: 90px;
//   color: #99a9bf;
// }
// .demo-table-expand .el-form-item {
//   margin-right: 0;
//   margin-bottom: 0;
//   width: 50%;
// }
</style>
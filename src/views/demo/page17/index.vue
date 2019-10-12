<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加</el-button>
    </template>
    <!--  -->
    <el-table :data="list" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item label="商品名称">
            <span>{{ props.row.parent.name }}</span>
            </el-form-item>-->
            <el-table v-loading="listLoading" :data="props.row.son" element-loading-text="Loading">
              <el-table-column width="95" label="序号" prop="sort"></el-table-column>
              <el-table-column :label="props.row.parent.name">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="修改" width="150">
                <template slot-scope="scope">
                  <el-button @click="gettck(scope.row,'x')" type="primary" icon="el-icon-edit"></el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="删除" width="150">
                <template slot-scope="scope">
                  <el-button type="primary" @click="getdel(scope.row,'x')" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="95" label="序号" prop="parent.sort"></el-table-column>
      <el-table-column label="分类名称" prop="parent.name"></el-table-column>
      <el-table-column align="center" prop="created_at" label="修改" width="150">
        <template slot-scope="scope">
          <el-button @click="gettck(scope.row,'d')" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="删除" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="getdel(scope.row,'d')" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <!-- 修改弹出 -->
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :before-close="getcl"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="formqd">
        <el-form-item v-if="seflag" :label-width="formLabelWidth" label="分类名称">
          <el-select v-model="formqd.parent" placeholder="请选择">
            <el-option v-for="item in qdlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort" :rules="rule" label="序号" :label-width="formLabelWidth">
          <el-input v-model="formqd.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" :rules="rule" label="标题" :label-width="formLabelWidth">
          <el-input v-model="formqd.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶" :label-width="formLabelWidth">
        <el-switch
            v-model="formqd.top"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="getcl">取 消</el-button>
        <el-button type="primary" @click="getform">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹出 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span style="color:red;" v-if="show!=0">此分类下有小分类确定要删除吗</span>
      <span v-else>删除</span>
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
  getqdlistdel,
  getcllist,
  getqchanneladd,
  getC_changes,
  getparent,
  getchdel
} from "../../../api/http";
export default {
  name: "page12",
  data() {
    return {
      title: "添加",
      activeName: "5",
      list: null,
      qdlist: null, // 渠道列表
      listLoading: true,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "100px",
      formqd: {
        name: "",
        parent: "",
        sort: "",
        id: "",
        top: "2"
      },
      flagnum: null,
      visible: false,
      xgid: null, // 修改id
      rule: [{ required: true, message: "不能为空" }], // 表单验证
      seflag: true,
      value:'1',
      show: null, // 删除提升
      flag: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getcllist({ status: 5 }).then(res => {
        this.list = res.arr;
        this.list.map(item => {
          item.son.map(data => {
            data.flid = item.parent.id;
          });
        });
        this.listLoading = false;
      });
      getparent().then(res => {
        this.qdlist = res.arr;
        this.qdlist.unshift({ name: "添加大分类", id: 0 });
      });
    },
    getadds() {
      this.title = "添加";
      this.seflag = true;
      this.dialogFormVisible = true;
      this.formqd = {
        name: "",
        parent: "",
        sort: "",
        top: "2"
      };
      this.flagnum = "add";
    },
    // 添加
    getform() {
      console.log(this.formqd)
      if (this.flagnum === "add") {
        getqchanneladd(this.formqd).then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getList();
          this.dialogFormVisible = false;
        });
      }
      if (this.flagnum === "xg") {
        getC_changes(this.formqd).then(res => {
          this.getList();
          this.dialogFormVisible = false;
          this.$message({
            message: "成功",
            type: "success"
          });
        });
      }
    },
    // 修改
    async gettck(item, i) {
      this.getList()
      this.title = "修改";
      this.seflag = false;
      this.flagnum = "xg";
      this.xgid = item.id;
      this.dialogFormVisible = true;
      console.log(item)
      if (i === "d") {
        this.formqd = {
          name: item.parent.name,
          parent: 0,
          sort: item.parent.sort,
          id: item.parent.id,
          top: item.parent.top
        };
      }
      if (i === "x") {
        this.formqd = {
          name: item.name,
          parent: item.flid,
          sort: item.sort,
          id: item.id,
          top: item.top
        };
      }
    },
    // 删除
    getdel(item,i) {
      console.log(item)
      if (i === 'd') {
        this.xgid = item.parent.id;
        this.show = item.son.length
        this.flag = true
      }
      if (i === 'x') {
        this.xgid = item.id;
        this.show = 0
        this.flag = false
      }
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.xgid };
      if (this.flag) {
       const data = await getqdlistdel(id);
      } else {
        const data = await getchdel(id);
      }
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
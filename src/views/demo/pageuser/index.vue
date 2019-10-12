<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加</el-button>
    </template>
    <el-table
      style="height:650px;overflow-y: auto"
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
      <el-table-column width label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width>
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="created_at" label="修改" width="100">
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
    <!-- 删除弹出 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getdele">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加banner -->
    <el-dialog title="" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form class="banners" :model="formLabelAlign">
        <el-form-item prop="name" :rules="rule" label="名称" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-tree
          ref="tree"
            :data="datalist"
            show-checkbox
            node-key="id"
            :default-expanded-keys="showlist"
            :default-checked-keys="showlist"
            :props="defaultProps"
            @check-change="handleNodeClick"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getbnadds">确 定</el-button>
      </div>
    </el-dialog>
    <!-- page -->
  </d2-container>
</template>
<script>
import {
  getrole_list,
  getpermissions,
  getrole_dele,
  getrole_add,
  getrole_update,
  getrole_show
} from "../../../api/http";
export default {
  name: "pageuser",
  data() {
    return {
      list: null,
      page: 1,
      listLoading: true,
      dialogVisible: false,
      deleteId: null,
      dialogFormVisible: false,
      formLabelAlign: {
        name: "",
        id: ""
      },
      formLabelWidth: "100px",
      param: "",
      flagnum: "",
      count: 0,
      page: 1,
      rule: [{ required: true, message: "不能为空" }],
      datalist: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      showlist: []
    };
  },
  created() {
    this.getbanners(this.page);
  },
  mounted() {

  },
  methods: {
    async getbanners(page) {
      const data = await getrole_list({ page });
      const permis = await getpermissions()
      this.datalist = permis.arr
      this.count = data.arr.count;
      this.listLoading = false;
      this.list = data.arr;
      // this.list = data.arr.info;
      // this.count = Number(data.arr.count);
    },
    // 删除
    getdel(data) {
      this.dialogVisible = true;
      this.deleteId = data.id;
    },
    async getdele() {
      const data = await getrole_dele({ id: this.deleteId });
      if (data.code === 200) {
        this.getbanners(this.page);
        this.dialogVisible = false;
        this.$message({
          message: "删除成功",
          type: "success"
        });
      }
    },
    // 添加
    getadds() {
      // this.handleNodeClick()
      this.dialogFormVisible = true;
      this.flagnum = "tj";
      this.showlist = ['0']
      console.log(this.showlist)
      this.formLabelAlign = {
        name: "",
        id: ""
      };
    },
    async getbnadds() {
      if (this.formLabelAlign.name == "") {
        this.$message.error({
          message: "请输入名称"
        });
        return false;
      }
      if (this.flagnum === "tj") {
        const data = await getrole_add(this.formLabelAlign);
        if (data.code === 200) {
          this.dialogFormVisible = false;
          this.getbanners(this.page);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "success"
          });
        }
      }
      if (this.flagnum === "xg") {
        const data = await getrole_update(this.formLabelAlign);
        if (data.code === 200) {
          this.dialogFormVisible = false;
          this.getbanners(this.page);
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "success"
          });
        }
      }
    },
    // 修改
    async gettck(data) {
      this.dialogFormVisible = true;
      this.flagnum = "xg";
      console.log(data);
      const sdata = await getrole_show({id:data.id})
      this.formLabelAlign = {
        rid: sdata.arr.role.id,
        id: sdata.arr.route,
        name: sdata.arr.role.name
      };
      this.showlist = sdata.arr.route
      console.log(this.formLabelAlign.id)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getbanners(val);
    },
    handleNodeClick(data) {
      // console.log(data)
     this.formLabelAlign.id = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
     console.log(this.formLabelAlign.id)
    }
  }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.banners {
  img {
    width: 100%;
  }
}
</style>


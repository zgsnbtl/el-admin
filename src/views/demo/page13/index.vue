<template>
  <d2-container>
    <template slot="header">
      <el-button @click="getadds" type="primary">添加</el-button>
    </template>
    <el-table
      style="height:677px;overflow-y: auto"
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
      <el-table-column width label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column align="center" width label="作者">
        <template slot-scope="scope">{{ scope.row.author|| '暂无数据' }}</template>
      </el-table-column>
      <el-table-column align="center" width label="关键字">
        <template slot-scope="scope">{{ scope.row.keyword|| '暂无数据'}}</template>
      </el-table-column>
      <el-table-column label="图片" width align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.region }}</span> -->
          <img style="width:150px;" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column label="简介" width align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.introduction"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width>
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
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
    <!-- 删除弹出 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getdele">确 定</el-button>
      </span>
    </el-dialog>
    <!-- page -->
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
  getcglist,
  getcglistdel
} from "../../../api/http";
import edit from '../../components/edit'
export default {
  name: "page13",
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
        href: "",
        number: "",
        image: "",
        id: ""
      },
      formLabelWidth: "120px",
      imageUrl: "",
      param: "",
      flagnum: "",
      count: 0,
      page: 1
    };
  },
  components: {
      edit
  },
  created() {
    this.getbanners(this.page);
  },
  methods: {
    async getbanners(page) {
      const data = await getcglist({ page });
      this.count = data.arr.count;
      this.listLoading = false;
      this.list = data.arr.info;
      this.count = Number(data.arr.count);
    },
    // 删除
    getdel(data) {
      this.dialogVisible = true;
      this.deleteId = data.id;
    },
    async getdele() {
      const data = await getcglistdel({ id: this.deleteId });
      if (data.code === 200) {
        this.dialogVisible = false;
        this.getbanners(this.page);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      }
    },
    // 添加
    getadds() {
    //   this.dialogFormVisible = true;
    this.$router.push({name:'pageadd4'})
    },
    // 修改
    gettck(data) {
    //   this.dialogFormVisible = true;
    
    this.$router.push({path:'/pageadd4',query: {
          id: data.id, code: '修改'
    }})
    },
    handlePaginationChange() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.getbanners(val);
      this.page = val
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
</style>


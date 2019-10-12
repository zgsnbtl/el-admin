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
        <template slot-scope="scope">{{ scope.row.e_name }}</template>
      </el-table-column>
      <el-table-column label="图片" width align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.region }}</span> -->
          <img style="width:150px;" :src="scope.row.image_href" alt />
        </template>
      </el-table-column>
      <el-table-column label="banner跳转链接" width align="center">
        <template slot-scope="scope">{{ scope.row.href }}</template>
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
    <!-- 添加banner -->
    <el-dialog title="添加" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form class="banners" :model="formLabelAlign">
        <el-form-item prop="name" :rules="rule" label="名称" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="href" :rules="rule" label="跳转链接" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.href" autocomplete="off"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item :label-width="formLabelWidth" label="上传图片">
        <upimg ref="imgs"></upimg>
         </el-form-item>
        <!-- <el-form-item :label-width="formLabelWidth" label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="/upimg"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload"
          >
            <img v-if="formLabelAlign.image" :src="formLabelAlign.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getbnadds">确 定</el-button>
      </div>
    </el-dialog>
    <!-- page -->

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
import {
  getbannerqlist,
  getbannerqdel,
  getbannerqadd,
  getbannerqundate
} from "../../../api/http";
import upimg from "../../components/upimg";
export default {
  name: "page3",
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
        image: "",
        id: ""
      },
      formLabelWidth: "100px",
      param: "",
      flagnum: "",
      count: 0,
      page: 1,
      rule: [{ required: true, message: "不能为空" }] // 表单验证
    };
  },
  components:{upimg},
  created() {
    this.getbanners(this.page);
    this.dialogFormVisible = true
  },
  mounted() {
    this.dialogFormVisible = false
  },
  methods: {
    async getbanners(page) {
      const data = await getbannerqlist({ page });
      this.count = data.arr.count;
      this.listLoading = false;
      this.list = data.arr
      // this.list = data.arr.info;
      // this.count = Number(data.arr.count);
    },
    // 删除
    getdel(data) {
      this.dialogVisible = true;
      this.deleteId = data.id;
    },
    async getdele() {
      const data = await getbannerqdel({ id: this.deleteId });
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
      this.dialogFormVisible = true;
      this.flagnum = "tj";
      this.$refs.imgs.image = ''
      this.formLabelAlign = {
        name: "",
        href: "",
        number: "",
        image: "",
        id: ""
      };
    },
    async getbnadds() {
      this.formLabelAlign.image = this.$refs.imgs.image;
      if (this.formLabelAlign.name == "") {
        this.$message.error({
          message: "请输入名称"
        });
        return false;
      }
      if (this.formLabelAlign.href == "") {
        this.$message.error({
          message: "请输入链接"
        });
        return false;
      }
      if (this.formLabelAlign.image == "") {
        this.$message.error({
          message: "请上传图片"
        });
        return false;
      }
      if (this.flagnum === "tj") {
        const data = await getbannerqadd(this.formLabelAlign);
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
        const data = await getbannerqundate(this.formLabelAlign);
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
    gettck(data) {
      this.dialogFormVisible = true;
      this.flagnum = "xg";
      console.log(data)
      this.formLabelAlign = {
        id: data.id,
        name: data.e_name,
        href: data.href,
        image: data.image_href
      };
      this.$refs.imgs.image = data.image_href
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getbanners(val);
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


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
      <el-table-column label="开班老师">
        <template slot-scope="scope">{{ scope.row.teacher }}</template>
      </el-table-column>
      <el-table-column label="开班名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.theclass }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="剩余人数" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.number }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column align="center" prop="created_at" label="开班时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.starttime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
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
    <el-dialog title="添加" :destroy-on-close="true" :close-on-click-modal="false" :before-close="getcl" :visible.sync="dialogFormVisible">
      <el-form :model="formLabelAlign">
        <el-form-item prop="teacher" :rules="rule" label="开班老师" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.teacher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="starttime" :rules="rule" label="开课时间" :label-width="formLabelWidth">
           <el-date-picker
           value-format="yyyy-MM-dd HH:mm:ss"
      v-model="formLabelAlign.starttime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item prop="theclass" :rules="rule" label="开课班级" :label-width="formLabelWidth">
          <el-input v-model="formLabelAlign.theclass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="number" :rules="rule" label="剩余人数" :label-width="formLabelWidth">
          <el-input type="number" :min="0" v-model="formLabelAlign.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <upimg :tit="imgtitle" ref="img1"></upimg>
        </el-form-item>
        <!-- <upimg :tit="imgtitles" ref="img2"></upimg> -->
        <!-- <upvideo ref="fvideo"></upvideo> -->
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
import upimg from '../../components/upimg'
import upvideo from '../../components/video'
import {
  getshlist,
  getshlistup,
  getshlistadd,
  getshlistdelete
} from "../../../api/http";
export default {
  name: "page6",
  data() {
    return {
      list: null,
      listLoading: true,
      addlist: null,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "100px",
      formLabelAlign: {
        id: "",
        teacher: "",
        starttime: "",
        theclass: "",
        number: "",
        image: "",
        t_image: "",
        video: ""
      },
      flagnum: null,
      visible: false,
      deleteid: null, // 删除id
      xgid: null, // 修改id
      count: 0,
      page: 1,
      rule: [
        { required: true, message: "不能为空" }
      ], // 表单验证
      imgtitle: {name: "教师头像"},
      imgtitles: {name: "课程图片"}
    };
  },
  components:{upimg,upvideo},
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
    // console.log(this.getnewdata('Wed Aug 14 2019 14:39:15 GMT+0800 (中国标准时间)'))
    this.dialogFormVisible = true
    this.getList(this.page);
  },
  mounted() {
    this.dialogFormVisible = false
  },
  methods: {
    getList(page) {
      getshlist({ page }).then(res => {
        this.list = res.arr;
        // this.count = Number(res.arr.count);
        this.listLoading = false;
      });
    },
    getadds() {
      this.dialogFormVisible = true;
      this.formLabelAlign = {
        id: "",
        teacher: "",
        starttime: "",
        theclass: "",
        number: "",
        image: "",
        t_image: "",
        video: ""
      }
      this.flagnum = "add";
    },
    // 添加
    getform() {
      this.formLabelAlign.t_image = this.$refs.img1.image
      // this.formLabelAlign.image = this.$refs.img2.image
      // this.formLabelAlign.video = this.$refs.fvideo.videoForm.showVideoPath
      if (this.formLabelAlign.teacher === '') {
        this.$message.error({message:'请输入开班老师'})
        return false
      }
      if (this.formLabelAlign.starttime === '') {
        this.$message.error({message:'请选择时间'})
        return false
      }
      if (this.formLabelAlign.teacher === '') {
        this.$message.error({message:'请输入开班老师'})
        return false
      }
      if (this.formLabelAlign.theclass === '') {
        this.$message.error({message:'请输入开课班级'})
        return false
      }
      if (this.formLabelAlign.number === '') {
        this.$message.error({message:'请输入剩余人数'})
        return false
      }
      if (this.formLabelAlign.t_image === '') {
        this.$message.error({
          message: "请上传教师头像"
        })
        return false
      }
      // if (this.formLabelAlign.image == '') {
      //   this.$message.error({
      //     message: "请上传课程图片"
      //   })
      //   return false
      // }
      if (this.flagnum === "add") {
        getshlistadd(this.formLabelAlign).then(res => {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getList(this.page);
          this.dialogFormVisible = false;
        });
      }
      if (this.flagnum === "xg") {
        getshlistup(this.formLabelAlign).then(res => {
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
        teacher: item.teacher,
        starttime: item.starttime,
        theclass: item.theclass,
        number: item.number,
        t_image: item.t_image,
        image: item.image
      }
      console.log(item)
      this.$refs.img1.image = item.t_image
      // this.$refs.img2.image = item.image
      // this.$refs.fvideo.videoForm.showVideoPath = item.video
    },
    // 删除
    getdel(item) {
      this.deleteid = item.id;
      this.dialogVisible = true;
    },
    async getdele(item) {
      let id = { id: this.deleteid };
      const data = await getshlistdelete(id);
      this.getList(this.page);
      this.dialogVisible = false;
    },
    // 关闭
    getcl() {
      this.dialogFormVisible = false
    },
    // 分页
    handleCurrentChange(val) {
      this.getList(val);
    }
  }
};
</script>

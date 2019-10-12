<template>
  <d2-container>
    <template slot="header">    <el-button @click="getadds" type="primary">添加</el-button></template>
        <!-- <video style="height:300px;" src="http://192.168.0.22:8080/video/4f972ce435c2e5c78da227e3801b95cb.mp4" controls="controls">
您的浏览器不支持 video 标签。
</video> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          {{ scope.row.t_name }}
        </template>
      </el-table-column>
      <el-table-column label="点击数">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="视频封面" width="" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.image }}</span> -->
          <img :src="scope.row.image" style="width:100%;" alt="">
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="视频名称" width="" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改" width="">
        <template slot-scope="scope">
          <el-button @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="删除" width="">
        <template slot-scope="scope">
          <el-button type="primary" @click="getdel(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 修改弹出 -->
    <el-dialog title="添加" style="heigit:500px;" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
  <el-form :model="formLabelAlign">
    <!-- <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="formLabelAlign.t_name" autocomplete="off"></el-input>
    </el-form-item> -->
     <el-form-item  :label-width="formLabelWidth"  label="分类名称">
    <el-select  v-model="formLabelAlign.t_id" placeholder="请选择分类名称">
      <el-option  v-for="item in courselist" :key='item.id' :label="item.name" :value="item.id">
        <p @click="changes(item)" style="width:100%;margin:0;">{{ item.name }}</p>
      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span> -->
      </el-option>
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
     <el-form-item prop="teacher" :rules="rule" label="讲师名称" :label-width="formLabelWidth">
      <el-input v-model="formLabelAlign.teacher" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="讲师头像" :label-width="formLabelWidth">
    <upimage ref="jsimg" ></upimage>
    </el-form-item>
        <el-form-item prop="name" :rules="rule" label="视频名称" :label-width="formLabelWidth">
      <el-input v-model="formLabelAlign.name" autocomplete="off"></el-input>
    </el-form-item>
    <upvideo ref="upvideo"></upvideo>
    <el-form-item  label="视频封面" :label-width="formLabelWidth">
    <upimage ref="upimg" ></upimage>
    </el-form-item>
    <el-form-item prop="number" :rules="rule" label="点击数" :label-width="formLabelWidth">
      <el-input v-model="formLabelAlign.number" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="keyword" :rules="rule" label="关键字" :label-width="formLabelWidth">
      <el-input v-model="formLabelAlign.keyword" autocomplete="off"></el-input>
    </el-form-item>
    <div style="margin:30px;" class="edit_container">
      <quill-editor
        v-model="formLabelAlign.introduction"
        ref="myQuillEditor"
        class="editer"
        style="height: 300px;"
        :options="editorOption"
      ></quill-editor>
    </div>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="getform">确 定</el-button>
  </div>
</el-dialog>
<!-- 删除弹出 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
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
  :total="count">
  </el-pagination>
  </d2-container>
</template>

<script>
import upvideo from '../../components/video'
import upimage from '../../components/upimg'
import {quillRedefine} from 'vue-quill-editor-upload'
import {getcourselist,getcourseadd,getcourseup,getcoursedel,getcoursecn} from '../../../api/http'
export default {
  name: 'page10',
  data () {
    return {
      list: null,
      listLoading: true,
      addlist: null,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      formLabelAlign: {
        id: '',
        t_id: '',
        t_name: '',
        href: '',
        image: '',
        name: '',
        teacher: '',
        t_image: '',
        number: '',
        keyword: '',
        introduction: ''
      },
      item: {
        id: ''
      },
      flagnum: null,
      visible: false,
      xgid: null, // 修改id
      count: 0,
      page: 1,
      rule: [
        { required: true, message: "不能为空" }
      ], // 表单验证
      courselist: null // 课程列表
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {upvideo,upimage},
  created () {
    // this.getlist()
    // 列表数据
    this.dialogFormVisible = true
    this.getList(this.page)
    this.editorOption = quillRedefine(
        {
          // 图片上传的设置
          uploadConfig: {
            action: '/api/course/base',  // 必填参数 图片上传地址
            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
            // 你必须把返回的数据中所包含的图片地址 return 回去
            res: (res) => {
              return res.arr;
            },
            name: 'file'  // 图片上传参数名
          }
        }
      )
  },
  mounted () {
    this.dialogFormVisible = false
  },
  methods: {
    async getList (page) {
      getcourselist({page}).then(res=>{
        this.list = res.arr.info
        this.count = Number(res.arr.count)
        this.listLoading = false
      })
      const data = await getcoursecn({status:1})
      this.courselist = data.arr
    },
    getadds () {
      this.dialogFormVisible = true
      this.formLabelAlign = {
        t_id: '',
        t_name: '',
        href: '',
        image: '',
        name: '',
        teacher: '',
        t_image: '',
        number: '',
        keyword: '',
        introduction: ''
      }
      this.$refs.upvideo.videoForm.showVideoPath = ''
      this.$refs.upimg.image = ''
      this.$refs.jsimg.image = ''
      this.flagnum = 'add'
    },
    // 添加
    getform () {
      this.formLabelAlign.href = this.$refs.upvideo.videoForm.showVideoPath
      this.formLabelAlign.image = this.$refs.upimg.image
      this.formLabelAlign.t_image = this.$refs.jsimg.image
      if (this.formLabelAlign.t_id == '') {
        this.$message.error({message:'请选择课程分类'})
        return false
      }
      if (this.formLabelAlign.teacher == '') {
        this.$message.error({message:'讲师名称不能为空'})
        return false
      }
      if (this.formLabelAlign.t_image == '') {
        this.$message.error({message:'讲师名称不能为空'})
        return false
      }
      if (this.formLabelAlign.name == '') {
        this.$message.error({message:'视频名称不能为空'})
        return false
      }
      if (this.formLabelAlign.href == '') {
        this.$message.error({message:'请上传视频'})
        return false
      }
      if (this.formLabelAlign.image == '') {
        this.$message.error({message:'请上传图片'})
        return false
      }
      if (this.flagnum === 'add') {
        getcourseadd(this.formLabelAlign).then(res=>{
        if (res.code === 200) {
          this.$message({
            message: "成功",
            type: "success"
          })
        this.getList(this.page)
        this.dialogFormVisible = false
        } else {
          this.$message.error({message:'上传失败'})
        }
      })
      }
      if (this.flagnum === 'xg') {
        
        let data = this.formLabelAlign
        // const data = await getcourseup(this.formLabelAlign)
        getcourseup(data).then(res=>{
          this.getList(this.page)
          this.dialogFormVisible = false
          this.$message({
          message: "成功",
          type: "success"
        });
        })
      }
    },
    // 修改
    async gettck (item) {
      this.flagnum = 'xg'
      this.xgid = item.id
      // this.$refs.upvideo.videoForm.showVideoPath = this.formLabelAlign.href
      // this.$refs.upimg.image = this.formLabelAlign.image
      this.dialogFormVisible = true
      this.formLabelAlign = {
        id: item.id,
        t_id: item.t_id,
        t_name: item.t_name,
        href: item.href,
        image: item.image,
        name: item.name,
        teacher: item.teacher,
        t_image: item.t_image,
        number: item.number,
        keyword: item.keyword,
        introduction: item.introduction
      }
      if (this.dialogFormVisible = true) {
      this.$refs.upvideo.videoForm.showVideoPath = this.formLabelAlign.href
      this.$refs.upimg.image = this.formLabelAlign.image
      this.$refs.jsimg.image = this.formLabelAlign.t_image
      }
    },
    // 删除
    getdel (item) {
      this.xgid = item.id
      this.dialogVisible=true
    },
    async getdele (item) {
      let id = {id: this.xgid}
      const data = await getcoursedel(id)
      this.getList(this.page)
      this.dialogVisible=false
    },
    // 分页
    handleCurrentChange (val) {
      this.page = val
       this.getList(val)
    },
    changes(data) {
      this.formLabelAlign.t_name = data.name
      // this.$set(this.formLabelAlign,'t_name',data.name)
    }
  }
}
</script>

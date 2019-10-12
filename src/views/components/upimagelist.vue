<template>
    <div>
        <el-upload
  action="/api/course/base"
  list-type="picture-card"
  :file-list="fileList"
  :on-success="uploadImg"
  :before-upload="beforeImgUpload"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </div>
    <!-- <div>
        <el-upload
        ref="upload"
  class="upload-demo"
  action="/api/course/base"
  :on-success="uploadImg"
  :before-upload="beforeImgUpload"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<el-button @click="submitUpload">提交上传</el-button>

    </div> -->
</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        formlist:[]
      };
    },
    created() {
        this.getforlist()
    },
    methods: {
       // 删除
      handleRemove(file, fileList) {
        let a = file.url
        // 点击删除删除相应并删除数组数据
        let b = this.formlist.indexOf(a)
        this.fileList.splice(b,1)
        this.formlist.splice(b,1)
        console.log(file, fileList);
        console.log(11111111111)
        console.log(this.fileList)
        // console.log(JSON.parse(this.formlist))
      },
      //预览
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功
      uploadImg(res, file,fileList) {
        //   console.log(res)
        //   console.log(this.fileList)
        var files = res.arr;
        // 每次点击获取数据增加数据
        this.formlist.push(files)
        this.fileList.push({url:files})
        console.log(this.fileList)
        console.log("00000000")
        console.log(this.formlist)
    },
    beforeImgUpload(file) {
      
      // const isJPG = file.type === 'image/png'
      const isJPG = file.type === "image/jpeg" || file.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG png 格式!")
        return false
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!")
        return false
      }
    },
    // 默认显示
    getforlist () {
      //  let arr = ['http://xigua-oss.oss-cn-beijing.aliyuncs.com/image/20190910/yaownag.jpg','http://xigua-oss.oss-cn-beijing.aliyuncs.com/image/20190910/yaownag.jpg','http://xigua-oss.oss-cn-beijing.aliyuncs.com/image/20190910/yaownag.jpg']
      //  this.formlist = arr
      console.log(111,this.formlist)
      if (this.formlist[0] === '') {
        this.formlist = []
      } else {
        this.formlist.forEach(res=>{
           this.fileList.push({url:res})
        })
      }
    }
    }
  }
</script>
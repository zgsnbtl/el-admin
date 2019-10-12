<template>
    <el-upload
      class="avatar-uploader"
      action="/imgs"
      :show-file-list="false"
      :on-success="uploadImg"
      :before-upload="beforeImgUpload"
    >
      <img v-if="image" :src="image" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
export default {
  data() {
    return {
      image: ''
    }
  },
  methods: {
    // 图片上传
    uploadImg(res, file) {
      // let str = file.raw
      // this.getBase64(str).then(res => {
      //   this.image = res
      //   console.log("*-*-*-*-**-", res)
      // })
      //   this.imageUrl = URL.createObjectURL(file.raw)
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
      let str = file
      this.getBase64(str).then(res => {
        this.image = res
      })
      // return isJPG && isLt2M
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader()
        let imgResult = ""
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>
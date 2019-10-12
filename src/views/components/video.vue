<template>
  <div>
    <el-form-item label-width="100px" label="视频">
    <el-upload
      class="avatar-uploader"
      action="/api/course/video"
      :on-progress="uploadVideoProcess"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :show-file-list="false"
    >
      <video
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        :src="videoForm.showVideoPath"
        class="avatar video-avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <i
        v-else-if="videoForm.showVideoPath =='' && !videoFlag"
        class="el-icon-plus avatar-uploader-icon"
      ></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top:7px;"
      ></el-progress>
    </el-upload>
    </el-form-item>
  </div>
</template>
<script>
import {getvideoup} from '../../api/http'
export default {
  data() {
    return {
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      file: ""
    };
  },
  methods: {
    beforeUploadVideo(file) {
      // console.log(file)
      var fileSize = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      // console.log(event, file, fileList);
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.file = file.raw;
      this.videoForm.showVideoPath = res.arr;
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      
      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}
      //后台上传地址
      if (res.code == 200) {
        this.videoForm.showVideoPath = res.arr
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else if (res.code === 201){
        this.$message.error(res.msg)
      } else {
        this.$message.error('上传失败')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .video-avatar{
    width: 400px;
    max-height: 400px;
    // height: 100%;
  }
</style>
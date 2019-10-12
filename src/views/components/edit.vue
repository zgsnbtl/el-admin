<template>
  <!-- <d2-container> -->
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item v-if="titlist" label="分类名称">
      <el-select v-model="form.t_id" placeholder="请选择">
        <el-option v-for="item in titlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="title" :rules="rule" label="标题">
      <el-input style="width:80%;" v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item prop="title" :rules="rule" label="作者">
      <el-input style="width:80%;" v-model="form.author"></el-input>
    </el-form-item>
    <el-form-item prop="title" :rules="rule" label="关键字">
      <el-input style="width:80%;" v-model="form.keyword"></el-input>
    </el-form-item>
    <!-- 上传图片 -->
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="/imgs"
        :show-file-list="false"
        :on-success="uploadImg"
        :before-upload="beforeImgUpload"
      >
        <img v-if="form.image" :src="form.image" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item prop="title" :rules="rule" style="width:80%;" label="简介">
      <el-input type="textarea" rows="8" v-model="form.introduction"></el-input>
    </el-form-item>
    <div class="edit_container">
      <quill-editor
        v-model="form.content"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </div>
  </el-form>

  <!-- <div class="submit_btn">
      <el-button @click="submit" type="primary">提交</el-button>
  </div>-->
  <!-- </d2-container> -->
</template>
<script>
import { quillEditor, Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
// Quill.register("modules/ImageExtend", ImageExtend);
import {quillRedefine} from 'vue-quill-editor-upload'
export default {
  components: { quillEditor },
  data() {
    return {
      flags: true,
      form: {
        title: "",
        introduction: "",
        image: "",
        content: "",
        id: "",
        t_id: "",
        author: "",
        keyword: ""
      },
      editorOption: {
        modules: {
          // ImageExtend: {
          //   loading: true,
          //   name: "file",
          //   action: "http://192.168.0.22:8080/course/base",
          //   response: res => {
          //     return res.arr;
          //   }
          // },
          // toolbar: {
          //   container: container,
          //   handlers: {
          //     image: function() {
          //       QuillWatch.emit(this.quill.id);
          //     }
          //   }
          // }
        }
      },
      rule: [{ required: true, message: "不能为空" }] // 表单验证
    };
  },
  props: ["titlist"],
  created() {
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
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    // async submit() {
    //   const data = await getdynamicadd(this.form)
    //   console.log(data)
    //   console.log(this.form.content);
    //   this.$message.success("提交成功！");
    // },
    // 图片上传
    uploadImg(res, file) {
      let str = file.raw;
      this.getBase64(str).then(res => {
        this.form.image = res;
      });
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeImgUpload(file) {
      // const isJPG = file.type === 'image/png';
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG png 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      let str = file;
      this.getBase64(str).then(res => {
        this.form.image = res;
      });
      return isJPG && isLt2M;
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit_container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.submit_btn {
  text-align: center;
}
</style>

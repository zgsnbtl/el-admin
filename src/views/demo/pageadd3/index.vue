<template>
  <d2-container>
    <el-form style="width:80%;" ref="form" :model="form" label-width="100px">
      <el-form-item prop="name" :rules="rule" label="教师名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="教师头像">
      <upimg ref="img1"></upimg>
      </el-form-item>
      <el-form-item prop="Introduction" :rules="rule" label="教师简介">
        <el-input type="textarea" rows="8" v-model="form.Introduction"></el-input>
      </el-form-item>
      <el-form-item prop="href" :rules="rule" label="软件链接">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="软件图片">
      <upimg ref="img2"></upimg>
      </el-form-item>
      <el-form-item label="案例图片">
        <upimagelist ref="imglist"></upimagelist>
      </el-form-item>
      <div class="upimg-flex"></div>
    </el-form>
    <div class="edit_container">
      <quill-editor
        v-model="form.details"
        ref="myQuillEditor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </div>
    <div class="submit_btn">
      <el-button @click="submit" style="width:200px;" type="primary">{{subname}}</el-button>
      <!-- <el-button @click="getup" style="width:200px;" type="primary">提交0</el-button> -->
    </div>
  </d2-container>
</template>
<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
import upimg from "../../components/upimg";
import { getteacheradd, getteacherup, getteacherupx } from "../../../api/http";
import { quillRedefine } from "vue-quill-editor-upload";
import { mapState, mapActions } from "vuex";
import upimagelist from "../../components/upimagelist";
export default {
  name: "pageadd3",
  data() {
    return {
      subname: "提交添加",
      form: {
        name: "",
        href: "",
        Introduction: "",
        details: "",
        image: "",
        software: "",
        interactive: ""
      },
      imgtitle: {
        name: "教师头像"
      },
      imgtitle1: {
        name: "软件图片"
      },
      editorOption: {
        modules: {
          // ImageExtend: {
          //   loading: true,
          //   name: "file",
          //   action: 'http://192.168.0.22:8080/course/base',
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
  computed: {
    ...mapState("d2admin/page", [
      "opened",
      "current" //用户获取当前页面的地址，用于关闭
    ])
  },
  created() {
    this.getup();
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: "/api/course/base", // 必填参数 图片上传地址
        // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
        // 你必须把返回的数据中所包含的图片地址 return 回去
        res: res => {
          return res.arr;
        },
        name: "file" // 图片上传参数名
      }
    });
  },
  components: { upimg, quillEditor, upimagelist },
  watch: {
    $route: "getup"
  },
  methods: {
    ...mapActions("d2admin/page", ["close"]),
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    async submit() {
      this.form.image = this.$refs.img1.image;
      this.form.software = this.$refs.img2.image;
      this.form.interactive = this.$refs.imglist.formlist.toString();
      let item = this.$route.query;
      if (this.form.name == "") {
        this.$message.error({
          message: "请输入教师名称"
        });
        return false;
      }
      if (this.form.image == "") {
        this.$message.error({
          message: "请上传教师头像"
        });
        return false;
      }
      if (this.form.Introduction == "") {
        this.$message.error({
          message: "请输入教师简介"
        });
        return false;
      }
      if (this.form.href == "") {
        this.$message.error({
          message: "请输入链接"
        });
        return false;
      }
      if (this.form.software == "") {
        this.$message.error({
          message: "请上传软件图片"
        });
        return false;
      }
      if (this.form.details == "") {
        this.$message.error({
          message: "请输入详细介绍"
        });
        return false;
      }
      if (item.code === "修改") {
        const data = await getteacherupx(this.form);
        if (data.code === 200) {
          this.close({ tagName: this.current });
          this.$message.success("提交成功！");
          this.$router.push({ name: "page8" });
        } else {
          this.$message.error("提交失败");
        }
        return false;
      }
      const data = await getteacheradd(this.form);
      if (data.code === 200) {
        this.close({ tagName: this.current });
        this.$message.success("提交成功！");
        this.$router.push({ name: "page8" });
      } else {
        this.$message.error("提交失败");
      }
    },
    async getup() {
      // this.form.image = this.$refs.img1.image
      //   this.form.software = this.$refs.img2.image
      let item = this.$route.query;
      if (item.code === "修改") {
        const data = await getteacherup({ id: item.id });
        this.form = {
          id: data.arr.id,
          name: data.arr.name,
          Introduction: data.arr.Introduction,
          details: data.arr.details,
          software: data.arr.software,
          href: data.arr.href,
          image: data.arr.image
        };
        this.subname = "提交修改";
        this.$refs.img1.image = data.arr.image;
        this.$refs.img2.image = data.arr.software;
        console.log(data.arr.interactive)
        this.$refs.imglist.formlist = data.arr.interactive;
        this.$refs.imglist.getforlist()
        // this.form.interactive = this.$refs.imglist.formlist.toString();
      } else {
        this.subname = "提交添加";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.upimg-flex {
  display: flex;
}
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
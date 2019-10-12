<template>
  <d2-container>
    <edit :titlist='titlist' ref="datali"></edit>
    <div class="submit_btn">
      <el-button @click="submit" style="width:200px;" type="primary">{{subname}}</el-button>
    </div>
  </d2-container>
</template>
<script>
import { getcgallistupdata, getcgallistup, getcgallistadd, getcllist} from "../../../api/http";
import edit from "../../components/edit";
import { mapState, mapActions } from 'vuex'
export default {
  name: 'pageadd5',
  data() {
    return {
      editorOption: {},
      titlist: '',
      subname: '提交添加'
    };
  },
  components: {
    edit
  },
  computed: {
	  ...mapState('d2admin/page', [
	    'opened',
	    'current' //用户获取当前页面的地址，用于关闭
	  ])
	},
  created() {
    this.getup();
    // this.getcllists()
  },
  watch: {
    $route:"getup"
  },
  methods: {
    ...mapActions('d2admin/page', [
		  'close',
		]),
    async submit() {
      let item = this.$route.query;
      let sform = this.$refs.datali.form
      if (sform.image === '') {
        this.$message.error('请上传图片')
        return false
      }
      if (sform.introduction === '') {
        this.$message.error('请输入简介')
        return false
      }
      if (sform.content === '') {
        this.$message.error('请输入内容')
        return false
      }
      if (item.code === "修改") {
        const data = await getcgallistupdata(this.$refs.datali.form);
        if (data.code == 200) {
          this.close({tagName:this.current});
        this.$message.success("提交成功！");
        this.$router.push({ name: "page14" });
      }
      return false
      }
      const data = await getcgallistadd(this.$refs.datali.form);
      if (data.code == 200) {
        this.close({tagName:this.current});
        this.$message.success("提交成功！");
        this.$router.push({ name: "page14" });
      }
    },
    async getup() {
      let item = this.$route.query;
      if (item.code === "修改") {
        const data = await getcgallistup({ id: item.id });
        this.$refs.datali.form = {
          id: data.arr.id,
          title: data.arr.title,
          author: data.arr.author,
          keyword: data.arr.keyword,
          introduction: data.arr.Introduction,
          image: data.arr.image,
          content: data.arr.content,
          t_id: data.arr.t_id
        };
        this.subname = '提交修改'
      } else {
        this.subname = '提交添加'
      }
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

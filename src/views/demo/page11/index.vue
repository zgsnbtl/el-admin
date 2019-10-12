<template>
  <d2-container>
    <!-- <template slot="header">
    </template> -->
    <el-form style="width:80%;" class="ac" label-width="80px">
    <upimage ref="upimg" :tit="upimg"></upimage>
    </el-form>
    <div class="cli">
     <el-button @click="getup" type="primary">提交</el-button>
    </div>

  </d2-container>
</template>

<script>
import upimage from "../../components/upimg";
import {getexcellent} from '../../../api/http'
import { async } from 'q';
export default {
  name: "page11",
  data() {
    return {
      upimg: { name: "优秀店铺" }
    };
  },
  components: { upimage },
  created () {
    this.getcrup()
  },
  methods: {
    async getup () {
      let item = {image: this.$refs.upimg.image}
      const data = await getexcellent(item)
      if (data.code === 200) {
       this.$message({
          message: "成功",
          type: "success"
        });
      } else {
        this.$message.error('失败');
      }
    },
    async getcrup () {
      const data = await getexcellent()
      if (data.code === 203) {
        this.$refs.upimg.image = data.arr.image
      }
    }
  },
};
</script>
<style lang="scss">
.ac{
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
}
.cli{
  display: flex;
  justify-content: center;
}

</style>

<template>
  <d2-container class="page">
    <el-button @click="initData(1)" type="primary">西瓜商学院</el-button>
    <el-button @click="initData(2)" type="primary">癞蛤蟆工具箱</el-button>
    <!-- <div class="line1">
      <div id="line1" class style="width: 100%;height:700px;"></div>
    </div> -->
  </d2-container>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/tooltip";
import { getdatanum } from "../../../api/http";
export default {
  data() {
    return {
      status: 1,
      datalist: "",
      text: ''
    };
  },
  components: {},
  mounted() {
    this.myChart = echarts.init(document.getElementById("line1"));
    this.initData(this.status);
  },
  created() {
    // this.getdata(this.status)
  },
  methods: {
    async initData(status) {
      const data = await getdatanum({ status });
      let ac = ['12','8','88']
      // console.log(data.data.sort((a,b)=>{
      //   return  new Date(a) - new Date(b)
      // }))
      data.data.sort((a,b)=>{
        return  new Date(a) - new Date(b)
      })
      if (status === 1) {
        this.text = '西瓜商学院数据'
      } else if (status === 2) {
        this.text = '癞蛤蟆工具箱'
      }
      var option = {
        color: ["#5793f3"],
        title: {
          text: this.text
        },
        tooltip: {},
        legend: {
          data: ["每日点击数据"]
        },
        xAxis: {
          name: '日期',
          axisLabel: {
            //底部文字倾斜
            interval: 0,
            rotate: 50
          },
          type: "category",
          data: data.data
        },
        yAxis: {},
        series: [
          {
            name: "每日点击数据",
            barWidth: "30px",
            type: "bar",
            data: data.value
          }
        ]
      };
      this.myChart.setOption(option);
    },
    // async getdata(status) {
    //   const data = await getdatanum({ status });
    //   this.datalist = data;
    // }
  },
  watch: {
    // sevenDate: function() {
    //   this.initData();
    // },
    // sevenDay: function() {
    //   this.initData();
    // }
  }
};
</script>

<style lang="scss" scoped>
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
  .line1 {
    margin-top: 100px;
  }
}
</style>

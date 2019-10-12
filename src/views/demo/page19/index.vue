<template>
  <d2-container>
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
      <el-table-column width="" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信" width="" align="center">
        <template slot-scope="scope">
          {{ scope.row.weixin }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="QQ" width="" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.qq }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册来源" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.status=='1'?'官网':'营销页' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="修改" width="100">
        <template slot-scope="scope">
          <el-button @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="删除" width="100">
        <template slot-scope="scope">
          <el-button type="primary" @click="getdel(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
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
import {getregister,getuser_dele} from '../../../api/http'
export default {
  name: 'page2',
  data() {
    return {
      page: 1,
      list: null,
      listLoading: true,
      dialogVisible: false,
      deleteId: null,
      count: 0
    }
  },
  created() {
    this.getdge(this.page)
  },
  methods: {
    // 店铺诊断接口
    async getdge(page) {
      const data = await getregister({page})
      this.list = data.arr.info
      this.count = Number(data.arr.count)
      this.listLoading = false
    },
    // 删除
    getdel (data) {
      this.dialogVisible = true
      this.deleteId = data.id
    },
    async getdele () {
      const data = await getuser_dele({id: this.deleteId})
      if (data.code === 200) {
        this.getdge(this.page)
        this.dialogVisible = false
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    handleCurrentChange (val) {
      this.page = val
      console.log(val)
      this.getdge(val)
    }
  },
}
</script>

<template>
  <d2-container>
    <template slot="header"><el-button type="primary" @click="getadd">添加</el-button></template>
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
      <el-table-column width="" label="教师名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.k_name }}</span> -->
          <img style="width:150px;" :src="scope.row.image" alt="">
        </template>
      </el-table-column>
      <el-table-column label="简介" width="" align="center">
        <template slot-scope="scope">
          {{ scope.row.Introduction }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改" width="100">
        <template slot-scope="scope">
          <el-button @click="gettck(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
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
   style="margin:30px auto;"
  background
  layout="prev, pager, next"
  @current-change="handleCurrentChange"
  :page-size="10"
  :total="count">
  </el-pagination>
  </d2-container>
</template>

<script>
import {getteacherlist,getteacherdelete} from '../../../api/http'
export default {
  name: 'page8',
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
      const data = await getteacherlist({page})
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
      const data = await getteacherdelete({id: this.deleteId})
    
      if (data.code === 200) {
        this.getdge(this.page)
        this.dialogVisible = false
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.page = val
      this.getdge(val)
    },
    // 添加
    getadd () {
      this.$router.push({name:'pageadd3'})
    },
    // 修改
    gettck (data) {
         this.$router.push({path:'/pageadd3',query: {
          id: data.id, code: '修改'
    }})
    }
  },
}
</script>

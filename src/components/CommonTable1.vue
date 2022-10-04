<template>
  <div>
    <el-table
      :data="isSerach ? serachList : userList"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="date" label="出生日期" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      layout="prev, pager, next"
      @current-change="changePage"
      hide-on-single-page
      :total="total" 
      :current-page.sync="curPage"
    >
    </el-pagination> -->
    <el-pagination
    layout="prev, pager, next"
    hide-on-single-page
    @current-change="changePage"
    :total="total"
  />
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    userList: [],
    inline: Boolean,
    total:null,
    isSerach:Boolean,
  },
  data() {
    return {
      serachList:[],
      curPage: 0
    };
  },
  watch: {
    userList: 'sList'
  },
  methods: {
    handleEdit(row) {
      // if(this.isSerach) this.curPage = 1
      this.$emit('handleEdit',row)
    },
    handleDelete(row) {
      // if(this.isSerach) this.curPage = 1
      this.$emit('handleDelete',row)
    },
    changePage(page) {
        this.isSerach ? this.sList(page) : this.$emit('changePage',page)
    },
    sList(page) {
      if(this.isSerach){
          if(typeof page === 'object'){
            page = 1
            this.curPage = 1
          }
          let s = 10 , p = page - 1
          this.serachList = this.userList.slice(p*s,p*s+s)
      }
    }
  },
};
</script>

<style scoped>
</style>


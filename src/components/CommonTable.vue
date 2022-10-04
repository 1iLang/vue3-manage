<template>
  <div>
    <el-table
      :data="isSerach ? serachList : userList"
      stripe
      size="large"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="date" label="出生日期" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button
            @click="handleEdit(scope.row)"
            size="small"
          >编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.row)"
            type="danger"
            size="small"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    layout="prev, pager, next"
    hide-on-single-page
    @current-change="changePage"
    :total="total"
    v-model:current-page="curPage"
    />
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
export default {
  name: "CommonTable",
  props: {
    userList: Array,
    inline: Boolean,
    total: Number,
    pageCur: Number,
    isSerach: Boolean,
  },
  data() {
    return {
      curPage: 1,
      serachList:[],
    };
  },
  watch: {
    isSerach: 'isSerachPage',
    userList: 'sList',
  },
  methods: {
    handleEdit(row) {
      this.$emit('handleEdit',row)
    },
    handleDelete(row) {
      this.$emit('handleDelete',row)
    },
    changePage(page) {
      this.isSerach ? this.pageList(page) : this.$emit('changePage',page)
    },
    isSerachPage(p) {
      this.curPage = 1
    },
    sList(page) {
      if(this.curPage != this.pageCur) this.curPage = 1
      if(this.isSerach){
        this.curPage = 1
        this.pageList(1)
      }
    },
    pageList(page){
      let s = 10 , p = page - 1
      this.serachList = this.userList.slice(p*s,p*s+s)
    }
  },
};
</script>

<style scoped>
</style>


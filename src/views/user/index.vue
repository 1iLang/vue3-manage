<template>
  <div>
    <div class="el-flex">
      <el-button @click="addUser" type="primary">+ 新增</el-button>
      <div>
        <el-input v-model="serach" placeholder="请输入内容"></el-input>
        <el-button @click="serachUser" type="primary">搜索</el-button>
      </div>
    </div>
    <!--table列表-->
    <common-table 
      @changePage='getUserData'
      @handleEdit='editUser'
      @handleDelete='deleteUser'
      :userList="userList" 
      :isSerach="isSerach"
      :total="total"
      :pageCur="curPage"
      >
    </common-table>

    <!--用户弹窗-->
    <el-dialog :title="dialogTitle === 'add' ? '新增用户' :'编辑用户'" v-model="dialog">
      <common-form :form="form" :formLabel="formLabel"></common-form>
      <div slot="footer" class="dialog-footer" style="padding-left:120px">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm(dialogTitle)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.el-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  .el-input {
    width: auto;
    margin-right: 10px;
  }
}
</style>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import {getUserList ,operateUser} from '../../api/request.js' 
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
export default {
  name: 'UserIndex',
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      initData: true,
      total: 0,
      curPage: 1,
      userList: [],
      isSerach: false,
      serach: '',
      serachPre: '',
      formLabel: [{type:'input',label:'姓名',model:'name'},
      {type:'input',label:'年龄',model:'age'},
      {type:'date',label:'出生日期',model:'date'},
      {type:'input',label:'地址',model:'address'}],
      form: {
        name: "",
        age: "",
        date: "",
        address: "",
      },
      dialog: false,
      dialogTitle: null
    }
  },
  mounted() {
    this.getUserData(this.curPage)
  },
  methods: {
    getUserData(page) {   
      getUserList(page - 1).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
        this.curPage = page
      })
    },
    addUser() {
      this.dialog = true
      this.dialogTitle = 'add'
      this.form = {
        name: "",
        age: "",
        date: "",
        address: "",
      }
    },
    editUser(row) {
      let res = JSON.parse(JSON.stringify(row))
      this.dialog = true
      this.dialogTitle = 'edit'
      this.form = res
    },
    deleteUser(row) {
      ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form = row
        this.confirm('delete')
      }).catch(() => {});
    },
    serachUser() {
      if (this.serachPre !== this.serach) {
          this.serachPre = this.serach
        if (this.serach !== "") {
          this.confirm('serach',this.serach)
          this.isSerach = true
        } else {
          this.getUserData(1)
          // this.isSerach = false
          setTimeout(() => {
            this.isSerach = false
          },100)
        }
      }
    },
    confirm(type,sData) {
      let msg, form = this.form
      switch(type){
        case 'add':
          msg = '添加成功!'
          this.commonAttr()
          break
        case 'edit':
          msg = '修改成功!'
          this.commonAttr()
          break
        case 'delete':
          msg = '删除成功!'
          this.commonAttr()
          break
        case 'serach':
          msg = '已显示搜索结果!'
          form = sData
          break
      }
      operateUser({
        type: type,
        page: this.curPage - 1,
        data: form
      }).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
        // this.userList.length > 10 ? this.isSerach = true : this.isSerach = false
        ElMessage({
            type: 'success', 
            message: msg
          });        
      })
    },
    commonAttr() {
      this.dialog = false
      if(this.isSerach){
        this.curPage = 1
        this.isSerach = false
      }
    }
  }
}
</script>

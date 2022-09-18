<template>
  <div>
    <div class="el-flex">
      <el-button @click="dialogFormVisible = true" type="primary"
        >+ 新增</el-button
      >
      <div>
        <el-input v-model="serach" placeholder="请输入内容"></el-input>
        <el-button @click="serachTab" type="primary">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="initData ? pageData[pageCurIndex] : serachData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.$index)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div v-if="initData" class="pageStyle">
      <el-pagination
        @current-change="changeCurPage"
        layout="prev, pager, next"
        hide-on-single-page
        :page-count="pageData.length"
      >
      </el-pagination>
    </div>

    <!--添加用户弹窗-->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
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
.pageStyle {
  display: block;
  background: #fff;
  .el-pagination {
    text-align: center;
    padding: 10px 0;
  }
}
</style>
<script>
export default {
  name: "UUser",
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      initData: true,
      oldSerach: "",
      serach: "",
      serachData: [],
      pageData: [],
      pageCurIndex: 0,
      form: {
        name: "",
        address: "",
        age: "",
      },
      formLabelWidth: "120px",
      tableData: [
        {
          name: "王小long",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "李小she",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "孙小niu",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "赵大虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "刘大虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王大虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王中虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "王小虎",
          age: 30,
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  beforeMount() {
    this.pageDataShow(this.tableData);
  },
  methods: {
    handleDelete() {
      this.$confirm("此操作为永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
      });
    },
    /*deleteCon() {
      this.dialogVisible = false
      this.tableData.splice(this.rowI, 1)
      this.rowI = null
    },*/
    handleAdd() {
      this.dialogFormVisible = false;
      this.tableData.unshift(this.form);
    },
    serachTab() {
      if (this.oldSerach !== this.serach) {
        this.oldSerach = this.serach;
        if (this.serach !== "") {
          let sData = (this.serachData = []);
          this.tableData.forEach((val) => {
            if (Object.values(val).toString().includes(this.serach)) {
              sData.push(val);
            }
          });
          sData.length > 10
            ? this.pageDataShow(sData)
            : (this.initData = false);
        } else {
          this.pageDataShow(this.tableData);
        }
      }
    },
    pageDataShow(data) {
      this.pageCurIndex = 0;
      this.pageData = [];
      this.initData = true;
      let size = 10;
      for (let i = 0; i < data.length; i += size) {
        this.pageData.push(data.slice(i, i + size));
      }
    },
    changeCurPage(v) {
      this.pageCurIndex = v - 1;
    }
  },
};
</script>

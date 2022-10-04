<template>
  <div class="top">
    <div class="l-content">
      <el-button
        icon="menu"
        plain
        size="small"
        @click="isCollapseMenu"
      />
      <span>{{this.$store.state.tab.pageName}}</span>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <div class="el-dropdown-link el-user">
          <img src="../assets/xs.jfif" alt="">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const isCollapseMenu = () => {
      store.commit('collapseMenu')
    }
    return {
      isCollapseMenu
    }
  }
  // methods: {
  //   isCollapseMenu(){
  //     this.$store.commit('collapseMenu')
  //   }
  // }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  height: 100%;
  justify-content: space-between;
}
.l-content span {
  margin-left: 20px;
  font-size: 14px;
}
.r-content {
  width: 50px;
  height: 50px;
  margin-top: 5px;
  border-radius: 50%;
  background: #ccc;
}
.el-user{
  cursor: pointer; 
  img{
    width:50px;
    height: 50px;
    border-radius: 50%;
  } 
}
// /deep/ .el-dropdown-menu__item {
//   font-size: 12px;
// }
:deep(.el-dropdown-menu__item) {
  font-size: 12px;
}
.el-pos {
  position: absolute;
  right: -13px;
  top: 26px;
}
</style>


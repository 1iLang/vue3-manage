<script setup>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <CommonAside /> <!--左侧导航-->
      </el-aside>

      <el-container>
        <el-header>
          <CommonHeader /> <!--头部-->
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
 .el-header {
    background-color: #000;
    color: #fff;
    height: 60px;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #fff;
  }
  
  .el-main {
    color: #333;
  }
</style>

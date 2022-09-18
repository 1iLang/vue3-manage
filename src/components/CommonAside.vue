<template>
  <el-menu
    :default-active="$route.path"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
  >
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren()" :index="item.path" :key="item.path">
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{item.label}}</span>
    </el-menu-item>

    <el-sub-menu v-for="item in hasChildren()" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><component :is="item.icon"></component></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group @click="clickMenu(subItem)" v-for="(subItem,subI) in item.children" :key="subI">
        <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'; 
export default {
  setup() {
    const store = useStore() , route = useRoute()
    const menuList = [
      {
        path:'/',
        name:'home',
        label:'首页',
        icon:'HomeFilled',
        url:'Home/Home',
      },
      {
        path:'/mall',
        name:'mall',
        label:'商品管理',
        icon:'VideoPlay',
        url:'MallManage/MallManage',
      },
      {
        path:'/user',
        name:'user',
        label:'用户管理',
        icon:'user',
        url:'Usermanage/Usermanage',
      },
      {
        label:'其他',
        path:'other',
        icon:'location',
        children:[
          {
            path:'/page1',
            name:'page1',
            label:'页面1',
            icon:'setting',
            url:'Other/PageOne',
          },
          {
            path:'/page2',
            name:'page2',
            label:'页面2',
            icon:'setting',
            url:'Other/PageTwo',
          },
        ] 
      },
    ]
    const hasChildren = () => {
      return menuList.filter(item => item.children)
    }
    const noChildren = () => {
      return menuList.filter(item => !item.children)
    }
    const upDatePageN = () => {//页面刷新header头部名称保持状态
      let path = route.path , istrue = true
      noChildren().forEach(i => {
        if(path === i.path) {
          store.commit('changePageName',i.label)
          return istrue = false
        }
        return
      });
      istrue && hasChildren().forEach(x => {
        x.children.forEach(y => {
          if(path === y.path) {
            store.commit('changePageName',y.label)
            return
          }
        })
      })
    }
    upDatePageN()
    return {
      hasChildren,
      noChildren,
    }
  },
  methods: {
    clickMenu(item){
      if(item.path === this.$route.path) return
      this.$router.push({name:item.name})
      this.$store.commit('changePageName',item.label)
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  background: #545c64;
  border: none;
  color: #fff;
  overflow: hidden;
  h3 {
    font-size: 15px;
    text-align: center;
  }
}
</style>
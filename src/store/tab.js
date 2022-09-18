export default {
  state: {
    isCollapse: false,
    pageName:'',
    tagData:[],
    menuList:[]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    changePageName(state,pName){
      state.pageName = pName
    },
    tagAdd(state,tagName){
      if(state.tagData.includes(tagName)){
        return
      }else{
        state.tagData.push(tagName)
      }
    },
    tagDelete(state,i){
      state.tagData.splice(i, 1)
    },
    addRoutes(state,res){
      let data = res.data, menuData = []
      if(!data) return
      data.forEach(item => {
        if(item.children){
          item.children = item.children.map(v => {
            v.component = () => import(`../views/${v.url}`)
            return v
          })
          menuData.push(...item.children)
        }else{
            item.component = () => import(`../views/${item.url}`)
          menuData.push(item)
        }
      });
      state.menuList = menuData
      menuData.forEach(item => {
        res.router.addRoute('Main',item)
      });
    }
  }
}
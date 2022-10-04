//mock数据模拟
import Mock from 'mockjs'

//用户数据
let userList = Mock.mock({
  'data|30-100':[{
    idCard:'@id()',
    name:'@cname()',
    age:'@integer(10,50)',
    date:'@date(yyyy-MM-dd)',
    address:'@city(true)'  //加true显示省级和市级，没有则显示市级
  }]
}) , uList = userList.data
  
let pageList = (i) => {
  let size = 10, ind = i*size
  return {
    total: uList.length,
    list: uList.slice(ind, ind + size)
  }
}

let loginUser = [
  {purview:1,userName:'lilang',passWord:'123456'},
  {purview:0,userName:'admin',passWord:'admins'},
  {purview:2,userName:'test',passWord:'123456'},
]
let getMenuData = (pur) => {
  let asiderData = null
  switch(pur){
    case 0 :
      asiderData = [
        {
          path:'/home',
          name:'home',
          label:'首页',
          icon:'s-home',
          url:'Home/index',
        },
        {
          path:'/mall',
          name:'mall',
          label:'商品管理',
          icon:'video-play',
          url:'Mall/index',
        },
        {
          path:'/user',
          name:'user',
          label:'用户管理',
          icon:'user',
          url:'User/index',
        },
        {
          label:'其他',
          path:'/other',
          name:'other',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting',
              url:'Other/page1',
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting',
              url:'Other/page2',
            },
          ]
        },
      ]
      break
    case 1 :
      asiderData = [
        {
          path:'/home',
          name:'home',
          label:'首页',
          icon:'s-home',
          url:'Home/index',
        },
        {
          path:'/mall',
          name:'mall',
          label:'商品管理',
          icon:'video-play',
          url:'Mall/index',
        },
        {
          label:'其他',
          path:'/other',
          name:'other',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting',
              url:'Other/page1',
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting',
              url:'Other/page2',
            },
          ]
        },
      ]
      break
    case 2 :
      asiderData = [
        {
          path:'/home',
          name:'home',
          label:'首页',
          icon:'s-home',
          url:'Home/index',
        },
        {
          path:'/user',
          name:'user',
          label:'用户管理',
          icon:'user',
          url:'User/index',
        },
        {
          label:'其他',
          path:'/other',
          name:'other',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting',
              url:'Other/page1',
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting',
              url:'Other/page2',
            },
          ]
        },
      ]
      break
    }
  return asiderData
}

export default {
  getUserList: (i) => {
    return pageList(i.body)
  },

  operateUser: (data) => {    
   let d = JSON.parse(data.body), searchList = null
   switch(d.type) {
      case 'add':
        uList.unshift(d.data)
        break;
      case 'edit':
        for(let i=0,l=uList.length; i<l; i++){
          if(uList[i].idCard === d.data.idCard) {
            uList.splice(i,1,d.data)
            break
          }
        }
        break;
      case 'delete':
        for(let i=0,l=uList.length; i<l; i++){
          if(uList[i].idCard === d.data.idCard) {
            uList.splice(i,1)
            break
          }
        }
        break;
      case 'serach':
        var sList = JSON.parse(JSON.stringify(uList))
        searchList = []
        sList.map((val,i) => {
          delete val.idCard
          if(JSON.stringify(val).includes(d.data)) {
            searchList.push(uList[i]);
          } 
        })
        break;
     }
   return d.type === 'serach'? 
    {
      total: searchList.length,
      list: searchList
    } : pageList(d.page)
  },

  loginCheck: (data) => {
    let d = JSON.parse(data.body) , state = false
    for(let i=0,l=loginUser.length; i<l; i++){
      if(d.userName === loginUser[i].userName && d.passWord === loginUser[i].passWord){
        state = getMenuData(loginUser[i].purview)
        break
      }
    }
    return {menuData: state}
  }
}
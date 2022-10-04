import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'

//拦截请求
Mock.mock('/api/home/getHomeData', homeApi.getHomeData)

Mock.mock('/api/home/getChartData', homeApi.getChartData)

Mock.mock('/api/user/getUserList',userApi.getUserList)

Mock.mock('/api/user/operateUser',userApi.operateUser)
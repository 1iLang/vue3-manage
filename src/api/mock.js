import Mock from 'mockjs'
import homeApi from './mockData/home'

//拦截请求
Mock.mock('/api/home/getHomeData', homeApi.getHomeData)

Mock.mock('/api/home/getChartData', homeApi.getChartData)
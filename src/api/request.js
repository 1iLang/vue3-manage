import axios from './axios'

export const getHomeData = () => {//home基础数据
  return axios.request({
    url: '/home/getHomeData',
    mock: true
  })
}

export const getChartData = () => {//home图表数据
  return axios.request({
    url: '/home/getChartData',    
  })
}

export const getUserList = (data) => {//user表格数据
  return axios.request({
    url: '/user/getUserList',
    data
  })
}

export const operateUser = (data) => {//user表格数据操作
  return axios.request({
    url: '/user/operateUser',
    data
  })
}
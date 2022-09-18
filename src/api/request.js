import axios from './axios'

export const getHomeData = () => {
  return axios.request({
    url: '/home/getHomeData',
    mock: true
  })
}

export const getChartData = () => {
  return axios.request({
    url: '/home/getChartData',    
  })
}
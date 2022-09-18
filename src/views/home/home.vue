<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <div class="u-img"></div>
          <div class="u-info">
            <p>admin</p>
            <p>超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间：<span>2022-4-9</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col style="margin-top: 20px" :span="16">
      <div class="order">
        <el-card
          style="margin-bottom: 10px"
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i class="icon" :style="{ background: item.color }">
            <component :is="item.icon"  style="width: 1em; height: 1em;"></component>
          </i>         
          <div>
            <p class="money">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="margin-top: 10px; height: 280px">
        <echart :chartData="echartData.order" style="height:280px"/>
      </el-card>

      <div class="graph">
        <el-card style="height:260px">
          <echart :chartData="echartData.user" style="height:260px"/>
        </el-card>
        <el-card style="height:260px">
          <echart :chartData="echartData.video" :isAxisChart="false" style="height:260px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/ECharts.vue'
import { getHomeData, getChartData} from '../../api/request'
import { ref, onMounted, reactive } from 'vue'
export default {
  setup() {
    let tableData = ref([]), tableLabel = ref([]), countData = ref([])
    let echartData = reactive({
          order: {
            xData: [],
            series: []
          },
          user: {
            xData: [],
            series: []
          },
          video: {
            series: []
          }
       })

    onMounted(() => {
      getHomeData().then(data => {
          tableData.value = data.tableData
          tableLabel.value = data.tableLabel
          countData.value = data.countData
      })

      getChartData().then(data => {
        const order = data.orderData
        const xData = order.date
        const series = []
        const keyArray = Object.keys(order.data[0])
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        //折线图
        echartData.order.xData = xData
        echartData.order.series = series

        //柱状图
        echartData.user.xData = data.userData.map(item => item.date)
        echartData.user.series = [
            {
              name: '新增用户',
              type: 'bar',
              data: data.userData.map(item => item.new),
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: data.userData.map(item => item.active),
            },
          ]

        //饼图
        echartData.video.series = [
            {
              type: 'pie',
              data: data.videoData
            },
          ]
      })
    })

    return {
      tableData,
      tableLabel,
      countData,
      echartData
    }
  },
  components: {
    Echart
  }
};
</script> 

<style lang="less" scoped>
p {
  margin: 10px;
}
.user {
  display: flex;
}
.u-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ccc;
}
.order {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  >div {
    width: 32.5%;
    box-sizing: border-box;
  } 
  .icon {
    display: flex;
    width: 80px;
    font-size: 30px;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  p {
    text-indent: 5px;
    white-space: nowrap;
  }
}
.money {
  font-size: 25px;
}
.txt {
  font-size: 12px;
  color: #999;
}
.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
.graph>div {
  width:49%
}
</style>


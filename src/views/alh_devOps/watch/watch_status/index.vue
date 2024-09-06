<template>
  <div class="monitor-page">
    <el-row :gutter="20">
      <!-- 服务状态监控 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3>服务状态监控</h3>
          <el-row>
            <el-col :span="12">
              <div class="monitor-info">
                <p><strong>访问成功率：</strong> {{ successRate }}%</p>
                <p><strong>访问平均耗时：</strong> {{ avgResponseTime }} ms</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div id="gauge-chart" style="height: 250px;" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 系统性能监控 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3>系统性能监控</h3>
          <el-row>
            <el-col :span="12">
              <div class="monitor-info">
                <p><strong>CPU 使用率：</strong> {{ cpuUsage }}%</p>
                <p><strong>内存使用率：</strong> {{ memoryUsage }}%</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div id="performance-chart" style="height: 250px;" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 实时监控 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card class="box-card">
          <h3>实时数据监控</h3>
          <div id="real-time-chart" style="height: 300px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      successRate: 98.5, // 模拟数据
      avgResponseTime: 250, // 模拟数据(ms)
      cpuUsage: 75, // 模拟数据(%)
      memoryUsage: 65 // 模拟数据(%)
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // 初始化访问成功率仪表盘
      const gaugeChart = echarts.init(document.getElementById('gauge-chart'))
      gaugeChart.setOption({
        series: [
          {
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: this.successRate, name: '成功率' }]
          }
        ]
      })

      // 初始化系统性能折线图
      const performanceChart = echarts.init(document.getElementById('performance-chart'))
      performanceChart.setOption({
        xAxis: {
          type: 'category',
          data: ['1分钟', '5分钟', '10分钟', '15分钟']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'CPU 使用率',
            data: [70, 72, 75, 80], // 模拟数据
            type: 'line',
            smooth: true
          },
          {
            name: '内存使用率',
            data: [60, 63, 65, 68], // 模拟数据
            type: 'line',
            smooth: true
          }
        ]
      })

      // 初始化实时数据监控折线图
      const realTimeChart = echarts.init(document.getElementById('real-time-chart'))
      realTimeChart.setOption({
        title: {
          text: ''
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'] // 模拟时间轴
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'CPU 使用率',
            type: 'line',
            stack: '总量',
            data: [65, 70, 72, 75, 73, 68, 66] // 模拟数据
          },
          {
            name: '内存使用率',
            type: 'line',
            stack: '总量',
            data: [60, 62, 64, 65, 67, 70, 69] // 模拟数据
          }
        ]
      })
    }
  }
}
</script>

  <style scoped>
  .monitor-page {
    padding: 20px;
  }

  .monitor-info {
    padding: 10px;
    font-size: 16px;
  }

  .chart-row {
    margin-top: 20px;
  }

  .box-card {
    margin-bottom: 20px;
  }
  </style>

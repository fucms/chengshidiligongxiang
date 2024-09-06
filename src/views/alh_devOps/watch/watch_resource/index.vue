<template>
  <div class="monitoring-dashboard">
    <el-row :gutter="20">
      <!-- 数据交换监控 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3>数据交换监控</h3>
          <el-table :data="dataExchangeRecords" stripe>
            <el-table-column prop="timestamp" label="时间" width="180" />
            <el-table-column prop="user" label="操作用户" />
            <el-table-column prop="operation" label="操作类型" />
            <el-table-column prop="resource" label="资源" />
            <el-table-column prop="details" label="操作详情" />
          </el-table>
        </el-card>
      </el-col>

      <!-- 服务状态监控 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3>服务状态监控</h3>
          <div id="performance-chart" style="height: 300px;" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 技术指标统计 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <h3>成功率统计</h3>
          <div id="success-rate-chart" style="height: 300px;" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <h3>平均响应时间</h3>
          <div id="response-time-chart" style="height: 300px;" />
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
      dataExchangeRecords: [
        { timestamp: '2024-09-01 08:00', user: '张三', operation: '添加', resource: '用户数据', details: '添加用户ID:1234' },
        { timestamp: '2024-09-01 09:00', user: '李四', operation: '删除', resource: '文件', details: '删除文件ID:5678' },
        { timestamp: '2024-09-01 10:00', user: '王五', operation: '修改', resource: '配置', details: '修改配置项:API_KEY' },
        { timestamp: '2024-09-01 11:00', user: '赵六', operation: '导出', resource: '日志', details: '导出日志文件ID:91011' }
      ]
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // 初始化性能指标图表
      const performanceChart = echarts.init(document.getElementById('performance-chart'))
      performanceChart.setOption({
        title: { text: '' },
        tooltip: {},
        legend: { data: ['系统负载', '性能情况'] },
        xAxis: { data: ['1小时', '2小时', '3小时', '4小时', '5小时'] },
        yAxis: {},
        series: [
          { name: '系统负载', type: 'line', data: [50, 55, 60, 65, 70] },
          { name: '性能情况', type: 'line', data: [80, 75, 70, 65, 60] }
        ]
      })

      // 初始化成功率统计图表
      const successRateChart = echarts.init(document.getElementById('success-rate-chart'))
      successRateChart.setOption({
        title: { text: '' },
        tooltip: {},
        series: [
          {
            name: '成功率',
            type: 'pie',
            data: [
              { value: 85, name: '成功' },
              { value: 15, name: '失败' }
            ]
          }
        ]
      })

      // 初始化平均响应时间图表
      const responseTimeChart = echarts.init(document.getElementById('response-time-chart'))
      responseTimeChart.setOption({
        title: { text: '' },
        tooltip: {},
        xAxis: { type: 'category', data: ['1小时', '2小时', '3小时', '4小时', '5小时'] },
        yAxis: { type: 'value' },
        series: [{ name: '响应时间', type: 'bar', data: [200, 180, 160, 140, 120] }]
      })
    }
  }
}
</script>

  <style scoped>
  .monitoring-dashboard {
    padding: 20px;
  }

  .box-card {
    margin-bottom: 20px;
  }

  .chart-row {
    margin-top: 20px;
  }
  </style>

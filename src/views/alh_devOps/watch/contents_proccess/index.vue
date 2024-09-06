<template>
  <div class="resource-audit">
    <!-- 资源列表 -->
    <el-card class="box-card">
      <h3>资源列表</h3>
      <el-table :data="resources" @row-click="handleRowClick">
        <el-table-column prop="resourceId" label="资源ID" />
        <el-table-column prop="resourceName" label="资源名称" />
        <el-table-column prop="uploadDate" label="上传日期" />
        <el-table-column prop="status" label="审核状态" />
      </el-table>
    </el-card>

    <!-- 资源详细信息 -->
    <el-dialog
      title="资源详细信息"
      :visible.sync="dialogVisible"
      width="40%"
      @close="handleClose"
    >
      <div v-if="selectedResource" class="resource-details">
        <el-row style="margin-top: 10px;">
          <el-col :span="12"><strong>资源ID:</strong></el-col>
          <el-col :span="6">{{ selectedResource.resourceId }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12"><strong>资源名称:</strong></el-col>
          <el-col :span="6">{{ selectedResource.resourceName }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12"><strong>资源描述:</strong></el-col>
          <el-col :span="6">{{ selectedResource.description }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12"><strong>元数据:</strong></el-col>
          <el-col :span="6">{{ selectedResource.metadata }}</el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="12"><strong>上传日期:</strong></el-col>
          <el-col :span="6">{{ selectedResource.uploadDate }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-around" style="margin-top: 20px;">
          <el-col :span="12">
            <el-button type="success" @click="approveResource">通过审核</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" @click="rejectResource">拒绝审核</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resources: [
        { resourceId: '001', resourceName: '资源一', uploadDate: '2024-09-01', status: '待审核' },
        { resourceId: '002', resourceName: '资源二', uploadDate: '2024-09-02', status: '待审核' },
        { resourceId: '003', resourceName: '资源三', uploadDate: '2024-09-03', status: '已审核' },
        { resourceId: '001', resourceName: '资源一', uploadDate: '2024-09-01', status: '待审核' },
        { resourceId: '002', resourceName: '资源二', uploadDate: '2024-09-02', status: '待审核' },
        { resourceId: '003', resourceName: '资源三', uploadDate: '2024-09-03', status: '已审核' }
      ],
      selectedResource: null,
      dialogVisible: false
    }
  },
  methods: {
    handleRowClick(row) {
      this.selectedResource = row
      this.dialogVisible = true
    },
    handleClose() {
      this.selectedResource = null
    },
    approveResource() {
      this.selectedResource.status = '已审核'
      this.dialogVisible = false
      // 在这里可以添加额外的逻辑，例如更新数据库中的状态
    },
    rejectResource() {
      this.selectedResource.status = '审核未通过'
      this.dialogVisible = false
      // 在这里可以添加额外的逻辑，例如记录拒绝原因或更新数据库中的状态
    }
  }
}
</script>

  <style lang="less" scoped>
  .resource-audit {
    padding: 20px;
  }

  .box-card {
    margin-bottom: 20px;
  }
  .resource-details{
    text-align: center;
  }
  </style>

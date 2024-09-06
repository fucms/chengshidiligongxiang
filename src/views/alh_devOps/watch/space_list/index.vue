<template>
  <div class="space-data-management">
    <el-card class="box-card">
      <div class="card-header">
        <el-button type="primary" @click="openAddDialog">新增空间数据</el-button>
      </div>

      <!-- 空间数据表格 -->
      <el-table :data="spaceDataList" border style="width: 100%">
        <el-table-column prop="name" label="数据名称" />
        <el-table-column prop="type" label="数据类型" />
        <el-table-column prop="source" label="数据来源" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="{ row }">
            <el-switch v-model="row.status" active-text="启用" inactive-text="禁用" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editSpaceData(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteSpaceData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog title="空间数据配置" :visible.sync="dialogVisible">
      <el-form :model="currentSpaceData" label-width="120px">
        <el-form-item label="数据名称">
          <el-input v-model="currentSpaceData.name" />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="currentSpaceData.type" placeholder="请选择数据类型">
            <el-option label="矢量数据" value="矢量数据" />
            <el-option label="栅格数据" value="栅格数据" />
            <el-option label="3D数据" value="3D数据" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-input v-model="currentSpaceData.source" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSpaceData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, // 控制弹窗显示
      spaceDataList: [ // 空间数据列表
        { name: '城区边界', type: '矢量数据', source: '系统导入', status: true },
        { name: '河流水系', type: '矢量数据', source: '外部接口', status: true },
        { name: '城市建筑', type: '3D数据', source: 'BIM平台', status: false },
        { name: '城区边界', type: '矢量数据', source: '系统导入', status: true },
        { name: '河流水系', type: '矢量数据', source: '外部接口', status: true },
        { name: '城市建筑', type: '3D数据', source: 'BIM平台', status: false }
      ],
      currentSpaceData: { // 当前编辑的空间数据
        name: '',
        type: '',
        source: '',
        status: false
      },
      editIndex: -1 // 当前编辑的数据索引
    }
  },
  methods: {
    // 打开新增空间数据的对话框
    openAddDialog() {
      this.dialogVisible = true
      this.currentSpaceData = { name: '', type: '', source: '', status: false }
      this.editIndex = -1
    },
    // 打开编辑空间数据的对话框
    editSpaceData(row) {
      this.dialogVisible = true
      this.currentSpaceData = { ...row }
      this.editIndex = this.spaceDataList.indexOf(row)
    },
    // 保存空间数据
    saveSpaceData() {
      if (this.editIndex === -1) {
        // 新增
        this.spaceDataList.push({ ...this.currentSpaceData })
      } else {
        // 编辑
        this.spaceDataList.splice(this.editIndex, 1, { ...this.currentSpaceData })
      }
      this.dialogVisible = false
    },
    // 删除空间数据
    deleteSpaceData(row) {
      this.$confirm('确定要删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.spaceDataList.indexOf(row)
        if (index !== -1) {
          this.spaceDataList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

  <style scoped>
  .space-data-management {
    padding: 20px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  </style>

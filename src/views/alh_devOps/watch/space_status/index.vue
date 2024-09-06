<template>
  <div class="data-standardization">
    <el-card class="box-card">

      <!-- 数据名称标准化表格 -->
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <h3>数据名称标准化</h3>
            <el-table :data="nameStandardData" border>
              <el-table-column prop="group" label="分组" width="120" />
              <el-table-column prop="topic" label="专题" width="120" />
              <el-table-column prop="cnServiceName" label="中文服务名称" width="180" />
              <el-table-column prop="enServiceName" label="英文服务名称" width="180" />
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column label="操作" width="150">
                <template v-slot="scope">
                  <el-button size="small" @click="editNameStandard(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteNameStandard(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

      <!-- 数据存储标准化表格 -->
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <h3>数据存储标准化</h3>
            <el-table :data="storageStandardData" border>
              <el-table-column prop="storageType" label="存储类型" width="120" />
              <el-table-column prop="structure" label="存储结构" width="180" />
              <el-table-column prop="namingConvention" label="命名方式" width="200" />
              <el-table-column label="操作" width="150">
                <template v-slot="scope">
                  <el-button size="small" @click="editStorageStandard(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteStorageStandard(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 编辑数据名称标准化的对话框 -->
    <el-dialog title="编辑数据名称标准化" :visible.sync="editNameDialogVisible">
      <el-form :model="currentNameStandard" label-width="120px">
        <el-form-item label="分组">
          <el-input v-model="currentNameStandard.group" />
        </el-form-item>
        <el-form-item label="专题">
          <el-input v-model="currentNameStandard.topic" />
        </el-form-item>
        <el-form-item label="中文服务名称">
          <el-input v-model="currentNameStandard.cnServiceName" />
        </el-form-item>
        <el-form-item label="英文服务名称">
          <el-input v-model="currentNameStandard.enServiceName" />
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="currentNameStandard.id" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editNameDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNameStandard">保存</el-button>
      </span>
    </el-dialog>

    <!-- 编辑数据存储标准化的对话框 -->
    <el-dialog title="编辑数据存储标准化" :visible.sync="editStorageDialogVisible">
      <el-form :model="currentStorageStandard" label-width="120px">
        <el-form-item label="存储类型">
          <el-input v-model="currentStorageStandard.storageType" disabled />
        </el-form-item>
        <el-form-item label="存储结构">
          <el-input v-model="currentStorageStandard.structure" />
        </el-form-item>
        <el-form-item label="命名方式">
          <el-input v-model="currentStorageStandard.namingConvention" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStorageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveStorageStandard">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据名称标准化
      nameStandardData: [
        { group: '基础数据', topic: '地理信息', cnServiceName: '地理服务', enServiceName: 'GeoService', id: '001' },
        { group: '业务数据', topic: '事件管理', cnServiceName: '事件服务', enServiceName: 'EventService', id: '002' }
      ],
      // 数据存储标准化
      storageStandardData: [
        { storageType: 'SDE', structure: '数据库表', namingConvention: 'tbl_event_data' },
        { storageType: '瓦片数据', structure: '文件夹层级', namingConvention: 'tiles_level_zoom' }
      ],
      // 当前编辑的数据项
      currentNameStandard: {},
      currentStorageStandard: {},
      // 编辑对话框显示状态
      editNameDialogVisible: false,
      editStorageDialogVisible: false
    }
  },
  methods: {
    // 编辑数据名称标准化
    editNameStandard(row) {
      this.currentNameStandard = Object.assign({}, row)
      this.editNameDialogVisible = true
    },
    // 保存数据名称标准化
    saveNameStandard() {
      // 保存逻辑
      // 使用indexOf查找对象索引时,对象是基于引用进行比较，因此不能用表单的数据直接替换数组中的对象
      const index = this.nameStandardData.findIndex((item) => item.id === this.currentNameStandard.id)
      if (index !== -1) {
        // this.$set(this.nameStandardData, index, this.currentNameStandard)
        this.nameStandardData.splice(index, 1, this.currentNameStandard) // 从index位置开始，删除1个元素，用this.currentNameStandard替换
      }
      this.editNameDialogVisible = false
    },
    // 删除数据名称标准化
    deleteNameStandard(row) {
      const index = this.nameStandardData.indexOf(row)
      if (index !== -1) {
        this.nameStandardData.splice(index, 1)
      }
    },
    // 编辑数据存储标准化
    editStorageStandard(row) {
      this.currentStorageStandard = Object.assign({}, row)
      this.editStorageDialogVisible = true
    },
    // 保存数据存储标准化
    saveStorageStandard() {
      // 保存逻辑
      const index = this.storageStandardData.findIndex((item) => item.storageType === this.currentStorageStandard.storageType)
      if (index !== -1) {
        // this.$set(this.nameStandardData, index, this.currentNameStandard)
        this.storageStandardData.splice(index, 1, this.currentStorageStandard)
      }
      this.editStorageDialogVisible = false
    },
    // 删除数据存储标准化
    deleteStorageStandard(row) {
      const index = this.storageStandardData.indexOf(row)
      if (index !== -1) {
        this.storageStandardData.splice(index, 1)
      }
    }
  }
}
</script>

  <style scoped>
  .box-card {
    margin-bottom: 20px;
  }
  </style>

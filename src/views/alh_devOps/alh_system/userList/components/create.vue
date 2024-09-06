<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="30%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="customerCode">
              <el-input v-model="temp.principal" :disabled="title === '编辑'" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门" prop="customerName">
              <el-input v-model="temp.customerName" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工号" prop="customerName">
              <el-input v-model="temp.code" :disabled="title === '编辑'" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="员工组" prop="customerName">
              <el-input v-model="temp.workerGroup" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系电话" prop="customerName">
              <el-input v-model="temp.phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      title: '新增用户信息',
      visible: false,
      temp: {
        principal: '',
        customerName: '',
        code: '',
        workerGroup: '',
        phone: ''
      },
      rules: {}
    }
  },
  methods: {
    show(row) {
      // 编辑
      if (row.principal) {
        this.title = '编辑'
        this.temp = { ...row }
      } else {
        // 新增
        this.title = '新增'
        this.temp = {}
      }
      this.visible = true
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.title === '编辑') {
            this.$emit('edit', this.temp)
          } else {
            this.$emit('create', this.temp)
          }
          this.temp = {}
          this.visible = false
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    }
  }
}
</script>

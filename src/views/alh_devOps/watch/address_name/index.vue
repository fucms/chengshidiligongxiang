<template>
  <div class="address-matching">
    <el-card class="box-card">
      <h3>地名地址匹配</h3>

      <!-- 地址输入 -->
      <el-form :model="form" label-width="120px" class="demo-form-inline">
        <el-form-item label="输入地址">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleMatchAddress">匹配地址</el-button>
        </el-form-item>
      </el-form>

      <!-- 匹配结果 -->
      <el-table v-if="matchResults.length > 0" :data="matchResults" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50" />
        <el-table-column prop="matchedAddress" label="匹配地址" />
        <el-table-column prop="longitude" label="经度" />
        <el-table-column prop="latitude" label="纬度" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 地址编辑 -->
      <el-dialog title="编辑地址" :visible.sync="dialogVisible">
        <el-form :model="editForm">
          <el-form-item label="匹配地址" label-width="120px">
            <el-input v-model="editForm.matchedAddress" />
          </el-form-item>
          <el-form-item label="经度" label-width="120px">
            <el-input v-model="editForm.longitude" />
          </el-form-item>
          <el-form-item label="纬度" label-width="120px">
            <el-input v-model="editForm.latitude" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        address: ''
      },
      matchResults: [],
      dialogVisible: false,
      editForm: {
        id: '',
        matchedAddress: '',
        longitude: '',
        latitude: ''
      }
    }
  },
  mounted() {
    this.handleMatchAddress()
  },
  methods: {
    // 模拟地址匹配的接口调用
    handleMatchAddress() {
      // 模拟返回匹配数据
      this.matchResults = [
        {
          id: 1,
          matchedAddress: '北京市朝阳区建国路93号',
          longitude: '116.4551',
          latitude: '39.9365'
        },
        {
          id: 2,
          matchedAddress: '上海市浦东新区世纪大道100号',
          longitude: '121.5444',
          latitude: '31.2212'
        },
        {
          id: 3,
          matchedAddress: '北京市朝阳区建国路93号',
          longitude: '116.4551',
          latitude: '39.9365'
        },
        {
          id: 4,
          matchedAddress: '上海市浦东新区世纪大道100号',
          longitude: '121.5444',
          latitude: '31.2212'
        }
      ]
    },
    // 编辑地址
    handleEdit(row) {
      this.editForm = { ...row }
      this.dialogVisible = true
    },
    // 保存编辑后的地址
    handleSave() {
      const index = this.matchResults.findIndex((item) => item.id === this.editForm.id)
      if (index !== -1) {
        // this.list[index] = form   数据发生了改变，但是试图没更新，这和vue的响应机制有关
        this.$set(this.matchResults, index, this.editForm)
      }
      this.dialogVisible = false
      this.$message({
        message: '地址更新成功！',
        type: 'success'
      })
    }
  }
}
</script>

  <style scoped>
  .address-matching {
    padding: 20px;
  }

  .box-card {
    margin-bottom: 20px;
  }
  </style>

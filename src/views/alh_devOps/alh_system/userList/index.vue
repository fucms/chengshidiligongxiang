<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.filter" style="width: 200px" class="filter-item"
                @keyup.enter.native="handleFilter" /> -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="姓名/工号">
          <el-input v-model="listQuery.filter1" placeholder="请输入姓名/工号" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="listQuery.filter2" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="员工组">
          <el-select v-model="listQuery.filter3" placeholder="请选择员工组">
            <el-option label="全部" value="1" />
            <el-option label="1" value="2" />
            <el-option label="2" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-plus"
            @click="handleCreate"
          >新增</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-bottom"
            @click="handleImport"
          >导入</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-top"
            @click="handleDownload"
          >导出</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="识别照片" prop="index" align="center" min-width="50">
          <template>
            <img style="width: 60px;" src="../../../../assets/logo//25-1.png" alt="">
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="code" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.principal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工组" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.workerGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleCreate(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="Delete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
      <!-- 导入 -->
      <UploadDownExcel
        ref="UploadDownExcel"
        :href="href"
        :down-load-text="downLoadText"
        @uploadTableList="uploadTableList"
      />
      <!-- 新增 -->
      <Create ref="create" @create="create" @edit="edit" />
      <!-- 编辑 -->
      <Edit ref="edit" />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/aboutDocument'
import Pagination from '@/components/Pagination'
import UploadDownExcel from '@/components/UploadDownExcel/index.vue'
import Create from './components/create.vue'
import Edit from './components/edit.vue'
import { levelTypeColor, customerStatusColor } from '@/filters/components/customerType'
export default {
  components: {
    Pagination,
    UploadDownExcel,
    Create,
    Edit
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        filter1: '',
        filter2: '',
        filter3: ''
      },
      total: 0,
      href: '/template/默认文件.xlsx',
      downLoadText: '默认文件.xlsx'
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    create(form) {
      this.list.push(form)
    },
    edit(form) {
      const index = this.list.findIndex((item) => item.code === form.code)
      if (index !== -1) {
        // this.list[index] = form   数据发生了改变，但是试图没更新，这和vue的响应机制有关
        this.$set(this.list, index, form)
      }
    },
    Delete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list = this.list.filter(item => item.code !== row.code)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    getList() {
      this.listLoading = true
      getList().then((res) => {
        this.list = res.items.map((item, index) => {
          item.levelTypeColor = levelTypeColor(item.level)
          item.customerStatusColor = customerStatusColor(item.status)
          return {
            ...item,
            index: index + 1
          }
        })
        this.total = res.total
        this.listLoading = false
      })
    },
    handleFilter() { },
    // 导入组件弹出
    handleImport() {
      this.$refs.UploadDownExcel.show()
    },
    // 导入文件
    uploadTableList(val) { },
    handleCreate(val) {
      this.$refs.create.show(val)
    },
    handleUpdate(val) {
      this.$refs.edit.show(val)
    },

    handleDownload() { }
  }
}
</script>

<style lang="less" scoped></style>

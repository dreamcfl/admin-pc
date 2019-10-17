<!-- 
   element分页器封装组件
  -->
<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    :current-page="currentPage || 1"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total || 0"
  >
  </el-pagination>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  mounted() {},
  methods: {
    handleCurrentChange() {
      this.$parent.getDataList(this.searchData, this.currentPage);
    }
  },
  created() {}
};
</script>
<style lang="scss">
.el-pagination {
  padding: 20px 20px 0 0px;
  float: right;
}
</style>

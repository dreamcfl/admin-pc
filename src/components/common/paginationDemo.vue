<template>
  <div class="app-container">
    <Pagination :total="total" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from "@c/components/pagination";
export default {
  components: { Pagination },
  data() {
    return {
      searchData: {}
    };
  },
  created() {
    this.currentPage = 1;
  },
  methods: {
    getDataList() {
      this.total = this.tableData.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>

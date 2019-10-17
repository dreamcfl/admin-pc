<template>
  <div class="app-container">
    <Table
      :tableData="tableData"
      :tableListData="tableListData"
      :tableBtn="tableBtn"
      :currentData="currentData"
      v-if="pageReset"
    ></Table>
  </div>
</template>
<script>
import Table from "@c/components/table";
export default {
  components: { Table },
  data() {
    return {
      pageReset: true
    };
  },
  created() {
    //  table表格
    this.tableListData = [
      { width: "50", label: "", type: "index" },
      { prop: "loginAccount", width: "", label: "账号" },
      { prop: "sysRole.name", width: "", label: "角色类型" },
      {
        prop: "userState",
        width: "",
        label: "用户状态",
        type: "wordbook",
        wordbookList: this.userStatus
      },
      { prop: "phone", width: "", label: "手机号" },
      {
        prop: "venueFloor",
        width: "80",
        label: "楼层",
        type: "wordbook",
        wordbookList: this.floorFilter
      },
      { prop: "activityNames", width: "", label: "活动", tooltiop: true },
      { prop: "createTime", width: "150", label: "创建时间" },
      { label: "操作", type: "btn", width: "180", fixed: "right" }
    ];
    // 按钮
    this.tableBtn = [
      {
        name: "编 辑",
        btnType: "primary",
        handleFn: "handleEdit"
      },
      {
        name: "删 除",
        btnType: "danger",
        handleFn: "handleDelete"
      }
    ];
  },
  methods: {
    // 搜索事件
    getDataList(val) {
      this.searchData = val;
      window.console.log(val);
      this.nowPage = 1;
      this.limit = 10;
      this.pageReset = false;
      this.$nextTick(() => {
        this.getList();
        this.pageReset = true;
      });
    },
    getList() {
      this.tableData = [
        {
          btnName: "添加",
          btnId: "zl01",
          btnCode: "河南省",
          attrMenu: "角色管理",
          founderTime: "2019-03-20",
          statusName: "有效",
          modifier: "zl"
        }
      ];
      this.currentData.total = this.tableData.length;
    },
    handleEdit() {
      window.console.log(this.searchData);
    },
    handleDelete() {
      window.console.log("2");
      this.confirms("此操作不可逆，确认删除？");
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>

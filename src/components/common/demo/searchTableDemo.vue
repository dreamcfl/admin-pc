<template>
  <div>
    <el-card class="anoCard">
      <div slot="header">
        <span>学员管理</span>
      </div>
      <div>
        <Search
          :searchData="searchData"
          :searchItem="searchItem"
          @getDataList="getDataList"
        ></Search>
        <div class="operate-area">
          <el-button @click="add" plain type="success" size="mini"
            >添加商品</el-button
          >
          <el-button @click="exp" plain type="success" size="mini"
            >导出</el-button
          >
        </div>
        <Table
          :tableData="tableData"
          :tableListData="tableListData"
          :tableBtn="tableBtn"
          :currentData="currentData"
          @onPageChange="onPageChange"
          @onSizeChange="onSizeChange"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
          @handleViewOther="handleViewOther"
          @handleViewUpdateStatus="handleViewUpdateStatus"
        ></Table>
      </div>
    </el-card>
    <dialog-com :dialogObj="dialogObj" @reflash="getList"></dialog-com>
  </div>
</template>

<script>
import { STUDENTSTATUSLIST, STUDENTSTATUS } from "@u/wordbook";
import dialogCom from "./dialogCom";
import Search from "@c/common/search";
import Table from "@c/common/table";
export default {
  name: "index",
  data() {
    return {
      searchItem: [],
      searchData: {
        studentNumber: "",
        name: "",
        phone: "",
        status: "",
        startTime: "",
        endTime: ""
      },
      studentStatusList: STUDENTSTATUSLIST,
      tableData: [],
      currentData: {
        currentPage: 1,
        size: 10,
        total: 0
      },
      dialogObj: {
        id: "",
        title: "",
        read: false,
        show: false,
        form: {}
      }
    };
  },
  components: {
    Search,
    Table,
    dialogCom
  },
  created() {
    // 搜索
    this.searchItem = [
      {
        type: "input",
        label: "学号：",
        prop: "studentNumber",
        placeholder: "请填写学号"
      },
      {
        type: "input",
        label: "学员姓名：",
        prop: "name",
        placeholder: "请填写学员姓名"
      },
      {
        type: "input",
        label: "学员手机号：",
        prop: "phone",
        placeholder: "请填写学员手机号"
      },
      {
        type: "select",
        label: "学员状态：",
        prop: "status",
        placeholder: "请选择学员状态",
        selectList: this.studentStatusList
      },
      {
        type: "daterange",
        label: "学员注册时间：",
        timeFormat: "yyyy-MM-dd",
        timeList: ["startTime", "endTime"]
      }
    ];
    //  table表格
    this.tableListData = [
      { width: "50", label: "", type: "index" },
      { prop: "loginAccount", width: "", label: "账号" },
      { prop: "sysMerchantName", width: "", label: "商户名称", type: "a" },
      { prop: "sysRole.name", width: "", label: "角色类型" },
      {
        prop: "sysMerchantImgurl",
        width: "120",
        label: "商户封面图",
        type: "img"
      },
      {
        prop: "userState",
        width: "",
        label: "用户状态",
        type: "wordbook",
        wordbookList: this.studentStatus
      },
      { prop: "phone", width: "", label: "手机号" },
      { prop: "activityNames", width: "", label: "活动", tooltiop: true },
      { prop: "createTime", width: "150", label: "创建时间" },
      { label: "操作", type: "btn", width: "240", fixed: "right" }
    ];
    // 按钮
    this.tableBtn = [
      //   {
      //   name: "启 用",
      //   btnType: "primary",
      //   handleFn: "handleViewUpdateStatus",
      //   type: "isShow",
      //   isShowStatus: "sysMerchantStatus",  // 是否显示的参数
      //   isShowValue: "2"  // 是否显示的参数值
      // },
      // {
      //   name: "禁 用",
      //   btnType: "warning",
      //   handleFn: "handleViewUpdateStatus",
      //   type: "isShow",
      //   isShowStatus: "sysMerchantStatus",
      //   isShowValue: "1"
      // },
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
    // 过滤
    studentStatus(val) {
      return STUDENTSTATUS[val];
    },
    // 获取search信息
    getDataList(val) {
      this.currentData.size = 10;
      this.currentData.currentPage = 1;
      this.searchData = val;
      this.getList();
    },
    // 分页
    onPageChange(val) {
      this.currentData.currentPage = val;
      this.getList();
    },
    onSizeChange(val) {
      this.currentData.size = val;
      this.currentData.currentPage = 1;
      this.getList();
    },
    //获取列表
    getList() {
      let json = {
        pageStart: this.currentData.currentPage,
        pageSize: this.currentData.size
      };
      console.log(json);
      this.tableData = [];
      this.currentData.total = this.tableData.length;
    },
    handleEdit() {
      window.console.log(this.searchData);
    },
    handleDelete() {
      window.console.log("2");
      this.$confirm("此操作将删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
      });
    },
    add() {
      this.dialogObj.id = "";
      this.dialogObj.show = true;
      this.dialogObj.title = "添加用户";
    },
    exp() {},
    handleViewOther(row) {
      window.console.log(row);
    },
    handleViewUpdateStatus(row) {
      window.console.log(row);
    }
  }
};
</script>
<style scoped lang="scss"></style>

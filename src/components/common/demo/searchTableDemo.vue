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
          v-if="pageReset"
          @onPageChange="onPageChange"
          @onSizeChange="onSizeChange"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
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
        nowPage: 1,
      total: 0,
      limit: 10,
      searchItem: [],
      pageReset: true,
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
      currentData: {},
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
      { prop: "sysRole.name", width: "", label: "角色类型" },
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
    // 过滤
    studentStatus(val) {
      return STUDENTSTATUS[val];
    },
    // 获取search信息
    getDataList(val) {
      window.console.log(val);
      this.searchData = val;
      this.nowPage = 1;
      this.limit = 10;
      this.pageReset = false;
      this.$nextTick(() => {
        this.getList();
        this.pageReset = true;
      });
    },
    // 分页
    onPageChange(val) {
      this.nowPage = val;
      this.getList();
    },
    onSizeChange(val) {
      this.nowPage = 1;
      this.limit = val;
      this.getList();
    },
    //获取列表
    getList() {
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
    exp() {}
  }
};
</script>
<style scoped lang="scss"></style>

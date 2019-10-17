<template>
  <div class="index">
    <Search :searchData="searchData" :searchItem="searchItem"></Search>
  </div>
</template>

<script>
import Search from "@c/search";
export default {
  name: "index",
  data() {
    return {
      searchData: {}
    };
  },
  components: {
    Search
  },

  created() {
    this.searchData = {};
    this.searchItem = [
      {
        type: "input",
        label: "订单号：",
        prop: "age",
        placeholder: "请填写订单号"
      },
      {
        type: "input",
        label: "姓名：",
        prop: "age",
        placeholder: "请填写姓名"
      },
      {
        type: "input",
        label: "手机号：",
        prop: "age",
        placeholder: "请填写手机号"
      },
      {
        type: "select",
        label: "城 市",
        prop: "city",
        placeholder: "请选择城市",
        selectList: [
          { id: "上海", value: "shanghai" },
          { id: "杭州", value: "HZ" }
        ]
      },
      {
        type: "time",
        label: "时 间",
        timeFormat: "yyyy-MM-dd",
        prop: "minTime"
      },
      {
        type: "daterange",
        label: "时 间",
        timeFormat: "yyyy-MM-dd",
        timeList: ["minTime", "maxTime"]
      }
    ];
  },

  methods: {
    getDataList(val) {
      window.console.log(val); // 获取search信息
    }
  }
};
</script>
<style scoped lang="scss"></style>

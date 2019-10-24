<!-- 
   elementb搜索表单封装组件
  -->
<template>
  <el-form :inline="true" :model="searchData" ref="searchData" size="mini">
    <template v-for="(item, index) in searchItem">
      <el-form-item
        v-if="item.type === 'input' || ''"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
        <el-input
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="item.type === 'select'"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
        <el-select
          v-model="searchData[item.prop]"
          @click.native="handleChange"
          :placeholder="item.placeholder"
          clearable
          filterable
        >
          <el-option
            v-for="i in item.selectList"
            :label="i.value"
            :value="i.id"
            :key="i.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="item.type === 'time'"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
        <el-date-picker
          type="date"
          :picker-options="pickerOptions"
          :format="item.timeFormat"
          :value-format="item.timeFormat"
          placeholder="选择日期"
          v-model="searchData[item.prop]"
          style="width: 140px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="item.type === 'daterange'"
        :label="item.label"
        :key="index"
      >
        <el-form-item :prop="item.timeList[0]">
          <el-date-picker
            type="date"
            :picker-options="pickerOptions0"
            :format="item.timeFormat"
            :value-format="item.timeFormat"
            placeholder="开始日期"
            v-model="searchData[item.timeList[0]]"
            style="width: 140px;"
            @change="changeValue(searchData[item.timeList[0]], 1)"
          ></el-date-picker>
        </el-form-item>
        <span class="ml-5">-</span>
        <el-form-item :prop="item.timeList[1]">
          <el-date-picker
            type="date"
            :picker-options="pickerOptions1"
            :format="item.timeFormat"
            :value-format="item.timeFormat"
            placeholder="结束日期"
            v-model="searchData[item.timeList[1]]"
            @change="changeValue(searchData[item.timeList[1]], 2)"
            style="width: 140px;"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
    </template>
    <el-form-item class="searchFloat">
      <el-button type="primary" @click="handleSearch()" plain>查 询</el-button>
      <el-button type="danger" @click="handleReset('searchData')" plain
        >重 置</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    searchData: {
      type: Object,
      required: true
    },
    searchItem: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value1: "",
      value2: "",
      // 单个时间
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      // 第一个日期限制第二个日期
      pickerOptions0: {
        disabledDate: time => {
          if (this.value2 != "" && this.value2 != null) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() > new Date(this.value2)
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return (
            time.getTime() < new Date(this.value1) - 24 * 60 * 60 * 1000 || // 减去一天 可前后时间相等
            time.getTime() > Date.now()
          );
        }
      }
    };
  },
  mounted() {},
  methods: {
    // 按钮事件
    handleClick(row, fn) {
      return this.$parent[fn](row);
    },
    handleSearch() {
      this.$parent.getDataList(this.searchData);
    },
    handleReset(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange() {
      // window.console.log(this.searchData);
    },
    // 获取第一个第二个时间
    changeValue(val, i) {
      if (i == 1) {
        this.value1 = val;
      } else if (i == 2) {
        this.value2 = val;
      }
    }
  }
};
</script>
<style scoped>
.ml-5 {
  margin-right: 10px;
  display: inline-block;
}
</style>

<style lang="scss">
// .el-form-item__label {
//   color: #37ce59;
// }
.el-input--mini .el-input__inner {
  // width: 180px;
}
.timeWidth {
  width: 120px;
}
</style>

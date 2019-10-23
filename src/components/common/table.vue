<!-- 
   element表格分页组合封装组件
  -->
<template>
  <div>
    <el-table
      :data="tableData"
      border
      align="center"
      style="width: 100%"
      size="mini"
    >
      <template v-for="(item, index) in tableListData">
        <el-table-column
          v-if="item.type === 'index'"
          align="center"
          type="index"
          :width="item.width"
          :key="index"
        >
        </el-table-column>
        <el-table-column
          v-if="item.type === undefined"
          :prop="item.prop"
          align="center"
          :label="item.label"
          :width="item.width"
          :key="index"
          :show-overflow-tooltip="'' || item.tooltiop"
        >
        </el-table-column>
        <el-table-column
          v-if="item.type === 'a'"
          :prop="item.prop"
          align="center"
          :label="item.label"
          :width="item.width"
          :key="index"
        >
          <template slot-scope="scope">
            <div>
              <span class="color-blue" @click="handleClickViewOther(scope.row)">
                {{ scope.row[item.prop] }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type === 'wordbook'"
          :prop="item.prop"
          align="center"
          :label="item.label"
          :width="item.width"
          :key="index"
        >
          <template slot-scope="scope">
            <div>
              {{ item.wordbookList(scope.row[item.prop]) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type === 'img'"
          :prop="item.prop"
          align="center"
          :label="item.label"
          :width="item.width"
          :key="index"
        >
          <template slot-scope="scope">
            <div>
              <img
                :src="scope.row[item.prop]"
                class="img-size"
                alt=""
                v-image-preview
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="item.type === 'btn'"
          :prop="item.prop"
          :label="item.label"
          :fixed="'' || item.fixed"
          :width="item.width"
          align="center"
          :key="index"
        >
          <template slot-scope="scope">
            <span
              class="span-btn-ml"
              v-for="(item, index) in tableBtn"
              :key="index"
            >
              <el-button
                v-if="item.type === undefined"
                :type="item.btnType"
                size="mini"
                plain
                @click="handleClick(scope.row, item.handleFn)"
                >{{ item.name }}</el-button
              >
              <el-button
                v-if="
                  item.type == 'isShow' &&
                    scope.row[item.isShowStatus] == item.isShowValue
                "
                :type="item.btnType"
                size="mini"
                plain
                @click="handleClick(scope.row, item.handleFn)"
                >{{ item.name }}</el-button
              >
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <template>
      <div class="page-div">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentData.currentPage || 1"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="currentData.size || 10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="currentData.total || 0"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 按钮事件
    handleClick(row, fn) {
      // return this.$parent[fn](row);
      this.$emit(fn, row);
    },
    handleClickViewOther(val) {
      this.$emit("handleViewOther", val);
    },
    // 改变页码
    handleCurrentChange(val) {
      // this.$parent.onPageChange(val);
      this.$emit("onPageChange", val);
    },
    // 改变每页数量
    handleSizeChange(val) {
      // this.$parent.onSizeChange(val);
      this.$emit("onSizeChange", val);
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableListData: {
      type: Array
    },
    tableBtn: {
      type: Array
    },
    currentData: {
      type: Object,
      required: true
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.page-div {
  margin-top: 5px;
  display: block;
  text-align: right;
}
.img-size {
  width: 100px;
  cursor: pointer;
}
.color-blue {
  color: rgb(79, 148, 212);
  cursor: pointer;
}
.span-btn-ml button {
  margin: 5px;
}
</style>

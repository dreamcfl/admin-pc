<template>
  <el-dialog
    :title="dialogObj.title"
    append-to-body
    :visible.sync="dialogObj.show"
    :close-on-click-modal="false"
    class="abow_dialog"
    width="700px"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      :disabled="dialogObj.read"
      v-if="dialogObj.show"
      status-icon
    >
      <el-form-item label="账号：" prop="loginAccount">
        <el-input
          v-model="form.loginAccount"
          style="width:200px;"
          size="mini"
          :disabled="dialogObj.id != ''"
          :placeholder="placeholderTips.userName"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="loginPassword">
        <el-input
          v-model="form.loginPassword"
          style="width:200px;"
          type="password"
          size="mini"
          :placeholder="placeholderTips.password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" @click="sub" size="mini">确 定</el-button>
      <el-button @click="dialogObj.show = false" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { _debounce } from "@u/debounce";
import { placeholderTips, validateTemplate } from "@u/validate";
export default {
  name: "dialogCom",
  props: ["dialogObj"],
  data() {
    return {
      placeholderTips: placeholderTips,
      form: {
        loginAccount: "",
        loginPassword: ""
      },
      rules: {
        loginAccount: [
          { required: true, trigger: "blur", message: "请输入账号" },
          { validator: validateTemplate }
        ],
        loginPassword: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { validator: validateTemplate }
        ]
      }
    };
  },
  methods: {
    initDialog() {
      // 回显 | 初始化
      if (this.dialogObj.id) {
        Object.keys(this.form).forEach(item => {
          this.form[item] = this.dialogObj.form[item];
        });
      } else {
        Object.keys(this.form).forEach(key => (this.form[key] = ""));
      }
    },
    sub: _debounce(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.dialogObj.id) {
            this.updateSub();
          } else {
            this.addSub();
          }
        }
      });
    }),
    updateSub() {
      // this.$emit("reflash");
    },
    addSub() {
      // this.$emit("reflash");
    }
  },
  watch: {
    "dialogObj.show"(val) {
      if (val) {
        this.initDialog();
      }
    }
  }
};
</script>
<style scoped lang="scss"></style>

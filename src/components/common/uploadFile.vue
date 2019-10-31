<!-- 
   element文件上传封装组件
  -->
<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
      :http-request="submitUploadImgUrl"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div v-if="fileUrl">{{ fileUrl }}</div> -->
      <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过5Mb</div>
    </el-upload>
  </div>
</template>
<script>
import { uploadPictureApi } from "@s/api";
export default {
  name: "uploadFile",
  data() {
    return {
      fileList: [],
      fileUrl: ""
    };
  },
  props: ["fileValue"],
  mounted() {
    this.fileUrl = this.flieValue;
  },
  methods: {
    submitUploadImgUrl(uploader) {
      //  不做处理的方式
      let form = new FormData();
      form.append("file", uploader.file);
      uploadPictureApi(form).then(res => {
        this.fileUrl = res;
        this.$emit("handleSuccess", this.fileUrl);
        //上传成功
        //处理自己的逻辑
        this.$message({
          type: "success",
          message: "上传成功！"
        });
      });
    },
    beforeAvatarUpload(file) {
      window.console.log(file.type);
      const isPDF = file.type === "application/pdf";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isPDF) {
        this.$message.error("上传文件格式只能是PDF格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isPDF && isLt5M;
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "只能上传一个文件！"
      });
    },
    handleAvatarError() {
      this.$message({
        type: "error",
        message: "上传错误！"
      });
    }
  }
};
</script>

<!-- 
   element图片上传封装组件
  -->
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
      :http-request="submitUploadImgUrl"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "uploadPicture",
  data() {
    return {
      imageUrl: "",
      url: process.env.VUE_APP_URL + "/sys/oss/upload"
      // url: "https://jsonplaceholder.typicode.com/posts/"
    };
  },
  props: ["imageValue"],
  mounted() {
    this.imageUrl = this.imageValue;
  },
  methods: {
    submitUploadImgUrl(uploader) {
      //  图片尺寸控制
      // let file = uploader.file;
      // var _this = this;
      // /**
      //  * 压缩裁剪图片
      //  */
      // resizeImage(file)
      //   .then(function(result) {
      //     return typeof result === "string"
      //       ? convertToBlob(result, file.type)
      //       : result;
      //   })
      //   .then(function(blob) {
      //     var formData = new FormData();
      //     //注意：此处第3个参数最好传入一个带后缀名的文件名，否则很有可能被后台认为不是有效的图片文件
      //     window.console.log(blob, file);
      //     formData.append("file", blob, file.name);
      //     window.console.log(blob);
      //     axios
      //       .post(_this.url, formData, {
      //         headers: {
      //           "Content-Type": "multipart/form-data"
      //         }
      //       })
      //       .then(res => {
      //         window.console.log(res.data.data.src);
      //         _this.imageUrl = res.data.data.src;
      //         _this.$emit("handleSuccess", _this.imageUrl);
      //         //上传成功
      //         //处理自己的逻辑
      //         _this.$message({
      //           type: "success",
      //           message: "上传成功！"
      //         });
      //       })
      //       .catch(() => {
      //         //上传失败
      //         //处理自己的逻辑
      //         _this.$message({
      //           type: "error",
      //           message: "上传错误！"
      //         });
      //       });
      //   });

      // function resizeImage(file) {
      //   return new Promise(function(resolve) {
      //     var reader = new FileReader();

      //     reader.onload = function() {
      //       var img = new Image();

      //       img.onload = function() {
      //         var w = this.naturalWidth;
      //         var h = this.naturalHeight;

      //         var canvas = document.createElement("canvas");

      //         canvas.width = w * 3;
      //         canvas.height = h * 3;

      //         var ctx = canvas.getContext("2d");

      //         ctx.drawImage(img, 0, 0, w * 3, h * 3);

      //         var base64Img = canvas.toDataURL(file.type, 1);
      //         var arr = base64Img.split(",");

      //         resolve(arr[1]);
      //       };

      //       img.src = this.result;
      //     };

      //     reader.readAsDataURL(file);
      //   });
      // }

      // /**
      //  * 将图片的base64字符串转换为Blob对象
      //  */
      // function convertToBlob(base64Str, fileType) {
      //   var base64 = window.atob(base64Str);
      //   var len = base64.length;
      //   var buff = new ArrayBuffer(len);
      //   var uarr = new Uint8Array(buff);

      //   for (var i = 0; i < len; i++) {
      //     uarr[i] = base64.charCodeAt(i);
      //   }

      //   var blob = null;

      //   try {
      //     blob = new Blob([buff], { type: fileType });
      //   } catch (e) {
      //     var BlobBuilder = (window.BlobBuilder =
      //       window.BlobBuilder ||
      //       window.WebKitBlobBuilder ||
      //       window.MozBlobBuilder ||
      //       window.MSBlobBuilder);

      //     if (e.name === "TypeError" && BlobBuilder) {
      //       var builder = new BlobBuilder();
      //       builder.append(buff);
      //       blob = builder.getBlob(fileType);
      //     }
      //   }

      //   return blob;
      // }
      //  图片不做处理的方式
      let form = new FormData();
      form.append("file", uploader.file);
      axios
        .post(this.url, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.imageUrl = res.data.data.src;
          this.$emit("handleSuccess", this.imageUrl);
          //上传成功
          //处理自己的逻辑
          this.$message({
            type: "success",
            message: "上传成功！"
          });
        })
        .catch(() => {
          //上传失败
          //处理自己的逻辑
          this.$message({
            type: "error",
            message: "上传错误！"
          });
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpg";
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG、JPEG、PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return (isJPG || isJPEG || isPNG) && isLt5M;
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>

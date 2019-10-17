<!-- 
   tinymce富文本编辑器封装组件
  -->
<template>
  <div class="tinymce">
    <editor id="tinymce" v-model="ediData.paramValue" :init="init"></editor>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// import "tinymce/plugins/code";
// import "tinymce/plugins/link";
// import "tinymce/plugins/wordcount";
import "tinymce/plugins/lists";
import "tinymce/plugins/autoresize";
// import "tinymce/plugins/preview";
export default {
  name: "index",
  props: ["ediData"], // 因vue单向数据流，传值为对象的属性值时， 直接写对象名即可 如 ：form.paramValue   父组件绑定 :ediData="：form"
  data() {
    return {
      showHtml: false,
      refresh: true,
      init: {
        menubar: false, // 关闭菜单栏
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "tinymce/skins/ui/oxide",
        relative_urls: false,
        remove_script_host: false, // 解决图片路径问题
        fontsize_formats: "8px 10px 12px 14px 16px 18px 24px 36px",
        plugins: " lists  autoresize",
        toolbar:
          " formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough  | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | undo redo",

        branding: false,
        min_height: 600,
        powerpaste_word_import: "propmt", // 参数可以是propmt, merge, clear
        powerpaste_html_import: "propmt", // propmt, merge, clear
        powerpaste_allow_local_images: true, // 允许带图片！
        paste_data_images: true,
        image_advtab: true,

        table_default_styles: {
          width: "100%",
          borderCollapse: "collapse"
        },
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true,
        // 图片异步上传处理函数
        images_upload_handler: () => {}
      }
    };
  },
  methods: {},
  beforeDestroy() {
    // 销毁tinymce
    window.tinymce.remove("#tinymce");
  },
  mounted() {
/* eslint-disable */
    tinymce.init({})
/* eslint-disable */

  },
  components: {Editor}
}
</script>
<style scoped >
.tinymce{
  width: 90%;
  height: 100%;
  /* margin: 0 auto; */
}
</style>

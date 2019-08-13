<template>
  <div id="category-edit">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.category">
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章">
        <vue-editor
          :editorOptions="editorSettings"
          :editor-toolbar="option"
          class="ql-editor-class"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor, Quill } from "vue2-editor";
import katex from "katex";
import "katex/dist/katex.min.css";
// import { ImageResize } from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);
console.log(Quill);
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      model: {},
      option: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "formula"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["link", "image"],
        ["clean"]
      ],
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push({ path: "/articles/list" });
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file);

      let result = await this.$http.post("/upload", formData);

      Editor.insertEmbed(cursorLocation, "image", result.data.url);
      resetUploader();
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  mounted() {
    window.katex = katex;
  }
};
</script>
<style scoped>
.ql-editor-class {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  padding: 0 !important;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  word-wrap: break-word;
}
.tips {
  display: inline-block;
  color: #ccc;
  font-size: 12px;
}
</style>




<template>
  <div class="newlyAdded">
    <el-form
      ref="form"
      label-width="100px"
      :model="form"
      class="el_form"
      label-position="right"
    >
      <el-form-item label="课题名称">
        <el-col :span="8">
          <el-input v-model="form.topic"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="系部">
        <el-col :span="4">
          <el-select v-model="form.department">
            <el-option label="电信系" value="电信系"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="专业">
        <el-col :span="6">
          <el-input v-model="form.major"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="课题简介">
        <el-col :span="12">
          <el-input
            v-model="form.introduce"
            type="textarea"
            :rows="3"
            placeholder="简单介绍使用到的技术或者课题特色等"
          ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="详细内容描述">
        <div id="div1">
          <el-col :span="12">
            <el-input v-model="form.title" placeholder="板块标题"></el-input>
          </el-col>
          <br />
          <br />
          <el-col :span="12">
            <el-input
              type="textarea"
              v-model="form.text"
              :rows="8"
              placeholder="板块内容  "
            ></el-input>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "newlyAdded",
  data() {
    return {
      labelPosition: "top",
      form: {
        topic: "毕业设计选题系统",
        department: "",
        major: "计算机技术应用",
        text: "",
        title: "",
        introduce: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(111);
      // console.log(this.form);
    },
  },
};
</script>

<style scoped>
.newlyAdded {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
}
.el_form {
  margin: 20px 0 0 30px;
  margin-bottom: 100px;
}
.button {
  float: left;
}
</style>
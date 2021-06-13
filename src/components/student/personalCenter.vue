<template>
  <div class="personalCenter">
    <el-col :span="12">
      <upload-icon />
    </el-col>
    <el-col :span="12">
      <el-form ref="form" label-width="100px" size="mini" class="el_form">
        <el-form-item label="姓名:">
          <span>{{ this.user.student_name }}</span>
        </el-form-item>
        <el-form-item label="学号:">
          <span>{{ this.user.student_no }}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span>{{ this.user.sex }}</span>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  // 导入文件下载
  import uploadIcon from "../commons/uploadIcon"

  export default {
    name: "personalCenter",
    data() {
      return {
        user: null
      }
    },
    components: {
      uploadIcon
    },
    created() {
      this.user = this.$store.getters.user
    }
  }
</script>

<style scoped>
.personalCenter {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
}

.el_form {
  margin-top: 35px;
}
.el_form >>> .el-form-item__label,
span {
  font-size: 18px;
}
/* .el-col{
  height: 500px;
} */
.upload_button {
  margin-top: 10px;
}
</style>
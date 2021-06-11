<template>
  <div class="login">
    <el-form ref="form" :model="form" class="login-box" :rules="rules">
      <h3>欢迎登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <template>
        <el-radio v-model="radio" label="学生">学生</el-radio>
        <el-radio v-model="radio" label="教师">教师</el-radio>
      </template>
      <div class="radio"></div>
      <el-form-item>
        <el-button @click="submitForm('form', form)" type="primary"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from "../network/request";

export default {
  data() {
    return {
      radio: "学生",
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(form, user) {
      var user_no = user.name;
      var password = user.password;
      var identity = this.radio;
      var obj = { user_no, password, identity };
      this.$refs[form].validate((valid) => {
        if (valid) {
          request({
            url: "login",
            method: "post",
            data: obj,
          }).then((res) => {
            // console.log(res);
            if (res.state != -1) {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              // c.$emit("submitForm",this.radio)
              // if (this.radio == "学生") {
              //   this.$store.commit("changeTop", this.radio );
              // } else {
              //   var rad = "teacherHome";
              //   this.$store.commit("changeTop", rad);
              // }
              this.radio == "学生"
                ? this.$store.commit("changeTop", this.radio)
                : this.$store.commit("changeTop", this.radio);
              this.radio == "学生"
                ? this.$store.commit("changeName", res.data.student_name)
                : this.$store.commit("changeName", res.data.teacher_name);
              this.radio == "学生"
                ? this.$store.commit("changeId", res.data.student_no)
                : this.$store.commit("changeId", res.data.teacher_no);
              // this.$router.replace({ name: "Home", params: { token: this.radio} });
              this.radio == "学生"
                ? this.$router.replace("/home/Studenthome/instructor")
                : this.$router.replace("/home/teacherhome/newlyAdded");
            } else {
              this.$message({
                message: "账号或密码错误",
                type: "error",
              });
            }
          });
        } else {
          this.$message({
            message: "请输入账号或密码",
            type: "error",
          });
        }
      });
    },
  },
};
</script>


<style scoped>
.login-box {
  width: 350px;
  margin: 50px auto;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.login-box .text {
  text-decoration: none;
}
.radio {
  margin-bottom: 20px;
}
</style>
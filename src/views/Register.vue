<template>
  <div>
    <el-form ref="form" :model="form" class="form-box" :rules="rules" method="post">
      <h3>请填写注册信息</h3>
      <el-form-item label="学号" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="年级专业班级" prop="class">
        <el-input v-model="form.class"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phoneNum">
        <el-input v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passSure">
        <el-input v-model="form.passSure" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('form')" type="primary"
          >确认注册</el-button
        >
      </el-form-item>
      <router-link to="./Login" class="text"><el-link>注册完毕!!返回登录</el-link></router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateNum = (rule, value, callback) => {
      const reg = /^\+?[1-9][0-9]*$/;
      if (
        value == "" ||
        value == undefined ||
        value == null ||
        String(value).trim() === ""
      ) {
        callback("不能为空");
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("格式错误"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.passSure !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        id: "",
        class: "",
        phoneNum: "",
        pass: "",
        passSure: "",
      },
      rules: {
        phoneNum: [{ required: true, validator: validateNum, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        passSure: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        id: [{ required: true, validator: validateNum, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "注册成功",
            type: "success",
          });
        } else {
          this.$message.error("请完善信息");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.form-box {
  width: 350px;
  margin: 50px auto;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.form-box .text {
  text-decoration: none;
}
</style>
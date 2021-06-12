<template>
  <div class="wrap">
    <el-form v-if="!showSuccess" ref="form" :model="form" class="form-box"
             :rules="rules"
             method="post">
      <h3>请填写信息</h3>
      <el-form-item label="学号" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="oldPass">
        <el-input v-model="form.oldPass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="form.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="passSure">
        <el-input v-model="form.passSure" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('form')" type="primary">确认修改</el-button>
      </el-form-item>
      <router-link to="/" class="text">
        <el-link>修改完毕!!返回登录</el-link>
      </router-link>
    </el-form>

    <h3 v-else class="backTitle">密码已修改完成，请重新
      <a href="/">登录</a>
      <p>{{num}}</p>
    </h3>
  </div>
</template>

<script>
  import {request} from "../network/request"

  export default {
    data() {
      const validatePassOld = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.form.passSure !== "") {
            this.$refs.form.validateField("checkPass")
          }
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.form.passSure !== "") {
            this.$refs.form.validateField("checkPass")
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"))
        } else if (value !== this.form.pass) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      }
      const validateId = (rule, value, callback) => {
        if(value === '') {
          callback(new Error('请输入学号'))
        }
        callback()
      }
      return {
        msg: "",
        form: {
          id: "",
          oldPass: "",
          pass: "",
          passSure: ""
        },
        rules: {
          oldPass: [{required: true, validator: validatePassOld, trigger: "blur"}],
          pass: [{required: true, validator: validatePass, trigger: "blur"}],
          passSure: [{required: true, validator: validatePass2, trigger: "blur"}],
          id: [{required: true, validator: validateId, trigger: 'blur'}]
        },
        showSuccess: false, // 控制密码修改完成
        num: 5
      }
    },
    methods: {
      // 密码修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
              url: "password/update",
              method: "post",
              params: {
                userId: this.form.id,
                oldPassword: this.form.oldPass,
                newPassword: this.form.passSure
              }
            }).then((res) => {
                console.log(res)
                if (res.state === 1) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.showSuccess = true
                } else {
                  this.$message.error(res.message)
                }
              })
          } else {
            this.$message.error("请完善信息")
            return false
          }
        })
      }
    },
    watch: {
      showSuccess() {
        setInterval(() => {
          this.num--
          if(this.num <= 0) {
            this.$router.replace('/')
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .wrap {
    height: 100vh;
    overflow: hidden;
  }

  .form-box {
    width: 350px;
    margin: 50px auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    animation: startLogin cubic-bezier(0, 1.13, 0.58, 1) 0.38s forwards;
  }

  @keyframes startLogin {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .form-box .text {
    text-decoration: none;
  }

  .backTitle {
    margin: 80px;
  }

  .backTitle span {
    text-decoration: underline;
    padding-bottom: 5px;
  }
</style>
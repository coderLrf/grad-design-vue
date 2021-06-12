<template>
  <div class="login">
    <el-form ref="form" :model="form" class="login-box" :rules="rules">
      <h3>欢迎登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input autofocus v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" @keyup.enter.native="submitForm('form', form)" ></el-input>
      </el-form-item>
      <template>
        <el-radio v-model="radio" label="学生">学生</el-radio>
        <el-radio v-model="radio" label="教师">教师</el-radio>
      </template>
      <div class="radio"></div>
      <el-form-item>
        <el-button @click="submitForm('form', form)" type="primary">登录</el-button>
      </el-form-item>
      <el-form-item @click.native="$router.push('/password/update')">
        <el-tag>密码修改</el-tag>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {request} from "../network/request"

  export default {
    data() {
      return {
        radio: "学生",
        form: {
          name: "",
          password: ""
        },
        rules: {
          name: [{required: true, message: "请输入用户名", trigger: "blur"}],
          password: [{required: true, message: "请输入密码", trigger: "blur"}],
        },
      };
    },
    created() {
      this.form.name = ''
      this.form.password = ''
    },
    methods: {
      submitForm(form, user) {
        var user_no = user.name
        var password = user.password
        var identity = this.radio
        var obj = {user_no, password, identity}
        this.$refs[form].validate((valid) => {
          if (valid) {
            request({
              url: "login",
              method: "post",
              data: obj,
            }).then(res => {
              if (res.state !== -1) {
                let path
                if (this.radio === "学生") {
                  path = '/home/studentHome'
                } else {
                  path = '/home/teacherHome'
                }
                this.$store.commit('login', res.data)
                // 等待200ms进入首页，登录成功
                setTimeout(() => {
                  this.$router.replace(path)
                }, 200)
                this.$message({
                  message: res.message,
                  type: "success"
                })
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            }).catch(err => {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
            });
          } else {
            this.$message({
              message: "请输入账号或密码",
              type: "error"
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    height: 100vh;
    overflow: hidden;
  }

  .login-box {
    width: 350px;
    margin: 50px auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: startLogin cubic-bezier(0, 1.13, 0.58, 1) 0.35s forwards;
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

  .login-box .text {
    text-decoration: none;
  }

  .radio {
    margin-bottom: 20px;
  }

  .el-form-item:nth-last-child(1) {
    margin: 0;
    cursor: pointer;

  }

  .el-form-item:nth-last-child(1):hover span {
    color: #42b983;
  }
</style>
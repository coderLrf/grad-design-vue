<template>
  <div class="studentHome">
    <el-container>
      <el-aside width="170px">
        <el-col>
          <el-menu
            style="border: 0px"
            :default-active="defaultPath"
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/home/studentHome">
              <i class="el-icon-location"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item
              index="/home/studentHome/instructor"
              :disabled="noCheck"
              ref="noCheck">
              <i class="el-icon-location"></i>
              <span slot="title">课题中心</span>
            </el-menu-item>
            <el-menu-item
              index="/home/studentHome/readyContent"
              :disabled="noCheck"
              ref="noCheck">
              <i class="el-icon-menu"></i>
              <span slot="title">我的预选</span>
            </el-menu-item>
            <el-menu-item
              index="/home/studentHome/myTopic"
              :disabled="check"
              ref="check"
              class="aaaa">
              <i class="el-icon-document"></i>
              <span slot="title">我的课题</span>
            </el-menu-item>
            <el-menu-item index="/home/studentHome/personalCenter">
              <i class="el-icon-document"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header>
          <div class="headImg">
            <span style="margin-right: 20px">{{ user.student_name }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
<!--                <img v-if="user.userIcon != null" :src='user.userIcon'>-->
                <img src="../../assets/login.jpg"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="modify">
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="changemm">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="exit">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <el-footer height="40px">
          <h6>tips:每天进步一点点</h6>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // import personalCenter from "./personalCenter.vue"

  export default {
    name: "stuHome",
    data() {
      return {
        userName: "",
        headImgSrc: "require(../../assets/login.jpg)",
        defaultActive: "/home/studenthome/instructor",
        noCheck: false,
        check: true,
        defaultPath: '/home/studentHome',
        user: null
      };
    },
    inject: ["reload"], // 引入方法
    mounted() {
      this.reload();
    },
    created() {
      this.userName = this.$store.state.userForm.student_name
      this.user = this.$store.getters.user
      console.log(this.user)
      this.reload()
      // this.cancelAttr()
      this.defaultPath = this.$route.path
    },
    methods: {
      cancelAttr() {
        var c = this.$store.state.check
        if (c != true) {
          this.noCheck = true
          this.check = !this.check
        }
      },
      exit() {
        window.localStorage.clear();
        window.sessionStorage.clear();
        this.$store.dispatch('resetVuex')
        this.reload();
        this.$notify({
          title: "消息",
          message: "退出成功",
          type: "success",
        });
        this.$router.replace("/");
      },
      modify() {
        this.personalCenter();
      },
      changemm() {
        // console.log(1)
        this.$router.push("/register");
      },
    }
  };
</script>

<style scoped>
  .studentHome,
  .el-container {
    height: 100%;
  }

  .el-aside {
    height: 100vh;
    background: #545c64;
  }

  .el-header {
    border-bottom: 2px solid #545c64;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  .el-header .headImg img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #545c64;
  }

  .el-footer {
    width: 100%;
    background: black;
    color: #fff;
    position: fixed;
    bottom: 0;
  }

  .el-footer h6 {
    line-height: 40px;
    text-align: center;
  }
</style>
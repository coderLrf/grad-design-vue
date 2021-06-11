<template>
  <div class="studentHome">
    <el-container>
      <el-aside width="170px">
        <el-col>
          <el-menu
            style="border: 0px"
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/home/studenthome/instructor" @click="instructor">
              <!-- <template slot="title"> -->
              <i class="el-icon-location"></i>
              <span slot="title">课题中心</span>
              <!-- </template>
              <el-menu-item index="1-1">吕英华老师</el-menu-item>
              <el-menu-item index="1-2">陈彬老师</el-menu-item> -->
            </el-menu-item>
            <el-menu-item index="/home/studenthome/readyContent" @click="readyContent">
              <i class="el-icon-menu"></i>
              <span slot="title">我的预选</span>
            </el-menu-item>
            <el-menu-item index="3" @click="personalCenter" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">我的课题</span>
            </el-menu-item>
            <el-menu-item index="/home/studenthome/personalCenter" @click="personalCenter">
              <i class="el-icon-document"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header>
          <div class="headImg" @click="aaa">
            <span style="margin-right: 20px">{{ userName }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../../assets/login.jpg" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="modify">
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="changeMima"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item divided @click.native="exit"
                  >退出登录</el-dropdown-item
                >
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
  name: "studentHome",
  data() {
    return {
      userName: "vic",
      headImgSrc: "require(../../assets/login.jpg)",
      defaultActive: "/home/studenthome/instructor"
    };
  },
  // beforeRouteEnter(to, form, next) {
  //   if (to.path != "/instructor") {
  //     // var p = sessionStorage.getItem("route");
  //     // next(p.path);
  //   }else{
  //     next("/instructor")
  //   }
  //   next();
  // },
  mounted() {
    window.addEventListener("beforeunload", this.beforeunloadHandler, false);
  },
  // 获取当前的子路由路径
  // 在stuhome刷新之前把当前路由存到session中
  // (){
  //   var to = JSON.parse(sessionStorage.getItem("route"))
  //   console.log(to.route);
  // this.$router.replace("/home/studenthome/"+to)
  // },
  created() {
    this.userName = this.$store.state.name;
    // console.log(this.$router.options.routes[0].children[0].children[this.token])
    // console.log(this.$store.state);
    this.$router.replace(this.$store.state.stuhomeState);
  },
  methods: {
    beforeunloadHandler(e) {
      var ob = this.$router.options.routes[0].children[0].children[this.token];
      window.sessionStorage.setItem("route", ob);
      e.returnValue = "确认刷新？";
    },
    personalCenter() {
      this.$store.commit("changeState", ["/home/studenthome/personalCenter",4]);
      this.$router.replace("/home/studenthome/personalCenter");
    },
    readyContent() {
      this.$store.commit("changeState", ["/home/studenthome/readyContent", 2]);
      this.$router.replace("/home/studenthome/readyContent");
    },
    instructor(index) {
      this.$store.commit("changeState", ["/home/studenthome/instructor", 1]);
      this.$router.replace("/home/studenthome/instructor");
    },
    aaa() {
      // console.log(1112);
    },
    exit() {
      // console.log(555);      
      this.$store.commit("changeState", [""]);
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
    changeMima() {
      console.log(1);
    },
  },
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
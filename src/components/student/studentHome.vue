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
              <i class="el-icon-s-help"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/studentHome/instructor">
              <i class="el-icon-menu"></i>
              <span slot="title">课题中心</span>
            </el-menu-item>
            <el-menu-item index="/home/studentHome/readyContent">
              <i class="el-icon-star-off"></i>
              <span slot="title">我的预选</span>
            </el-menu-item>
            <el-menu-item
              index="/home/studentHome/myTopic">
              <i class="el-icon-star-on"></i>
              <span slot="title">我的课题</span>
            </el-menu-item>
            <el-menu-item
                index="/home/studentHome/communicate"
                class="aaaa">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">沟通</span>
            </el-menu-item>
            <el-menu-item index="/home/studentHome/personalCenter">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header>
          <div class="headImg">
            <span style="margin-right: 20px">{{ this.user.student_name }}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i v-if="userIcon == null" class="el-icon-user"></i>
                <img v-else :src="userIconPath + userIcon" alt="" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/home/studentHome/personalCenter')">
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="$router.push('/password/update')">
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="exit">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="el_main">
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
  export default {
    name: "stuHome",
    data() {
      return {
        headImgSrc: "require(../../assets/login.jpg)",
        defaultPath: '/home/studentHome',
        user: null,
        iconPathState: false,
        userIconPath: 'http://localhost:9527',
        iconPath: null,
      };
    },
    created() {
      if(this.$store.getters.user) {
        this.user = this.$store.getters.user
        this.defaultPath = this.$route.path
        if(this.user.userIcon !== null && this.iconPath == null) {
          this.iconPath = this.user.userIcon
          this.iconPathState = true
        }
      }
    },
    computed: {
      userIcon() {
        return this.$store.getters.user.userIcon
      }
    },
    methods: {
      exit() {
        this.$store.dispatch('resetVuex')
        window.localStorage.clear()
        this.$notify({
          title: "消息",
          message: "退出成功",
          type: "success",
        });
        this.$router.replace("/");
      }
    },
    watch: {
      '$route.path'(newPath, oldPath) {
        // 如果在教师端的路由范围内改变default值
        if(newPath.indexOf('studentHome') !== -1) {
          this.defaultPath = newPath
        }
        // 如果用户对象不等于空
        if(this.user.userIcon !== null) {
          if(!this.iconPathState) {
            this.iconPath += this.user.userIcon
            this.iconPathState = true // 标志已用icon
          }
        }
      },
      userIcon(newIcon, oldIcon) {
        this.iconPath = newIcon
      }
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
  .el_main{
    padding: 0;
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
<template>
  <div class="teacherHome">
    <el-container>
      <el-aside width="170px">
        <el-col>
          <el-menu style="border: 0px" :default-active="defaultPath" router
                   class="el-menu-vertical-demo"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-menu-item index="/home/teacherHome">
              <i class="el-icon-message-solid"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/teacherHome/newlyAdded">
              <i class="el-icon-folder-add"></i>
              <span slot="title">新增课题</span>
            </el-menu-item>
            <el-menu-item index="/home/teacherHome/myTopic">
              <i class="el-icon-document"></i>
              <span slot="title">我的课题</span>
            </el-menu-item>
            <el-menu-item index="/home/teacherHome/topicManage">
              <i class="el-icon-menu"></i>
              <span slot="title">管理课题</span>
            </el-menu-item>
            <el-menu-item index="/home/teacherHome/myStudent">
              <i class="el-icon-coordinate"></i>
              <span slot="title">我的学生</span>
            </el-menu-item>
            <el-menu-item index="/home/teacherHome/personalCenter">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header>
          <div class="headImg">
            <span style="margin-right:20px;">{{user.teacher_name}}</span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i v-if="iconPath == null" class="el-icon-user"></i>
                <img v-else :src="userIconPath + iconPath"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/home/teacherHome/personalCenter')">个人资料
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="$router.push('/password/update')">修改密码</el-dropdown-item>
                <el-dropdown-item divided @click.native="exit">退出登录</el-dropdown-item>
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
  export default {
    name: "teacherHome",
    data() {
      return {
        userName: 'vic',
        headImgSrc: "require(../../assets/login.jpg)",
        defaultPath: '/home/teacherHome',
        user: null,
        iconPathState: false,
        userIconPath: 'http://localhost:9527',
        iconPath: null
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
        return this.$store.getters.user ? this.$store.getters.user.userIcon : null
      }
    },
    methods: {
      // 退出
      exit() {
        this.$store.dispatch('resetVuex')
        // 清空session
        window.localStorage.clear()
        this.$notify({
          title: "消息",
          message: "退出成功",
          type: "success",
        })
        this.$router.replace("/")
      }
    },
    watch: {
      '$route.path'(newPath, oldPath) {
        // 如果在教师端的路由范围内改变default值
        if(newPath.indexOf('teacherHome') !== -1) {
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

  .el-header .headImg img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #545c64;
  }

  .el-header .headImg .el-icon-user {
    font-size: 1.5em;
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
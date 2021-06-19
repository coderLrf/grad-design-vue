<template>
  <div class="conversation">
    <div class="msg" v-if="studentList.length > 0">
      <div class="aside">
        <ul>
          <li v-for="item in studentList">{{ item.student_name }}</li>
        </ul>
      </div>
      <div class="main">
        <div class="topBox">
        <ul class="list">
          <!--          收到消息-->
          <li>
            <div class="teaLeft">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>

            <div class="teaRight">
              <span>张三老师</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>
          <!--          发送的消息-->
          <li>
            <div class="meLeaf">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>

            <div class="meRight">
              <span>我</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>

          <!--          收到消息-->
          <li>
            <div class="teaLeft">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>

            <div class="teaRight">
              <span>张三老师</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>
          <!--          发送的消息-->
          <li>
            <div class="meLeaf">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>

            <div class="meRight">
              <span>我</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>

        </ul>
      </div>

        <div class="con">
          <form action="">
            <textarea class="textarea" wrap="hard" v-model="sendMsg" autofocus placeholder="请输入"></textarea>
            <!--        <button class="btn" @click="send()">发送</button>-->
            <input type="button" class="btn" value="发送" @click="send()" @keyup.enter="send()">
          </form>
      </div>
      </div>
    </div>

    <div v-else>
      <h1>还未有定选学生噢</h1>
    </div>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: 'conversation',
  data(){
    return{
      userIconPath: 'http://localhost:9527',
      iconPath: null,
      backMsg: 'abcdef',
      sendMsg: '',
      user: null,
      studentList: []
    }
  },
  created() {
    const user = this.$store.getters.user
    if(user != null && this.teacherId == null) {
      this.teacherId = user.teacher_no
    }
    // 请求数据
    this.getPrimaryTopic()
  },
  methods:{
    // 获取该教师定选的学生
    getPrimaryTopic() {
      request({
        url: '/teacher/primary/ok',
        params: {
          teacherId: this.teacherId
        }
      }).then(res => {
        if(res.state !== -1) {
          this.studentList = res.data
          console.log(res.data)
        } else {
          this.$message.error(res.message)
          console.log(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //发送事件
    send(){
      if(this.sendMsg != ''){
        console.log(111)
      }else{
        this.$message({
          type: "warning",
          message: '内容不能为空噢',
          duration: 1500
        })
      }
    }
  }
}

</script>

<style scoped>
.conversation{
  padding: 0;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.conversation .msg{
  width: 956px;
  height: 80vh;
  border: 1px solid saddlebrown;
  position: relative;
  border-radius: 0 10px 10px 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  animation: startLogin cubic-bezier(0, 1.13, 0.58, 1) 0.35s forwards;
  display: flex;
  flex-direction: row;
  background: url("../../assets/com.jpg") no-repeat fixed;
  background-size: cover;
  font-size: 16px;
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

.aside{
  width: 150px;
  height: 80vh;
  /*background: #409EFF;*/
  border-radius: 0 0 0 10px;
  border-right: 3px solid rgb(250,236,216);
;
}
.aside ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.aside ul li{
  width: 147px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  border-bottom: 1px solid paleturquoise;
}
.aside ul li:hover{
  background: pink;
}

.main{
  width: 810px;
  height: 80vh;
}


/*输入框*/
.con{
  width: 810px;
  height: 20vh;
  border-top: 1px solid rgb(250,236,216);
  padding-top: 1px;
  position: absolute;
  bottom: 0;
}
/*文本域*/
.con .textarea{
  width: 100%;
  /*margin: 15px 0 0 0;*/
  height: 10vh;
  border: 0;
  /*去掉点击textarea中显示的边框和右下角的双杠*/
  outline: none;
  -webkit-appearance: none;
  resize: none !important;
  border-radius: 0;
  background: transparent;
  /*border-style: none;*/
  color: #fff;
}
/*发送btn*/
.con .btn{
  width: 100px;
  height: 30px;
  background: #409EFF;
  color: #fff;
  line-height: 100%;
  float: right;
  margin:3vh 30px 0 0;
}

/*内容框*/
.topBox{
  width: 100%;
  height: 60vh;
  overflow: auto;
  overflow-x: hidden;
  /*background: url("../../assets/com.jpg") no-repeat fixed;*/
  background-size: cover;
  border-radius: 0px 10px 0 0;
}
.list{
  padding: 8px 0 0 0;
  list-style: none;
  color: #fff;
}
.list li{
  width: 100%;
  height: 80px;
  /*border-bottom: 1px solid red;*/
}
/*接收时，左边头像部分*/
.list li .teaLeft{
  width: 100px;
  float: left;
  line-height: 80px;
}
.list li .teaLeft img,.list li .teaLeft .user{
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: #9fa8da;
  border-radius: 100px;
}
/*接收时，右边署名加文本内容部分*/
.list li .teaRight{
  display: flex;
  flex-direction: column;
  float: left;
}
.list li .teaRight span{
  height: 40px;
  line-height: 40px;
}

/*发送时，右边头像部分*/
.list li .meLeaf{
  width: 100px;
  float: right;
  line-height: 80px;
}
.list li .meLeaf img,.list li .meLeaf .user {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: #9fa8da;
  border-radius: 100px;
}
/*发送时，左边署名加文本内容部分*/
.list li .meRight{
  display: flex;
  flex-direction: column;
  float: right;
}
.list li .meRight span{
  height: 40px;
  line-height: 40px;
}

</style>
<template>
  <div class="communicate">
    <el-button type="primary" @click.native="communicateBack()" class="backBtn btn">返回</el-button>
    <div class="msg" v-if="topic !== null">
      <div class="topBox">
        <ul class="list">
<!--          收到消息-->
          <li>
<!--            头像-->
            <div class="teaLeft">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>
<!--            消息-->
            <div class="teaRight">
              <span>{{ topic.teacher_name }}</span>
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
              <p>nullnull</p>
            </div>
          </li>

<!--          &lt;!&ndash;          收到消息&ndash;&gt;-->
<!--          <li>-->
<!--            <div class="teaLeft">-->
<!--              <i v-if="iconPath == null" class="el-icon-user user"></i>-->
<!--              <img v-else :src="userIconPath + iconPath" alt="" />-->
<!--            </div>-->

<!--            <div class="teaRight">-->
<!--              <span>张三老师</span>-->
<!--              <p>{{ backMsg }}</p>-->
<!--            </div>-->
<!--          </li>-->
<!--          &lt;!&ndash;          发送的消息&ndash;&gt;-->
<!--          <li>-->
<!--            <div class="meLeaf">-->
<!--              <i v-if="iconPath == null" class="el-icon-user user"></i>-->
<!--              <img v-else :src="userIconPath + iconPath" alt="" />-->
<!--            </div>-->

<!--            <div class="meRight">-->
<!--              <span>我</span>-->
<!--              <p>{{ backMsg }}</p>-->
<!--            </div>-->
<!--          </li>-->

        </ul>
      </div>

      <form class="con">
        <textarea class="textarea" wrap="hard" v-model="chatRecord.content" autofocus placeholder="请输入"></textarea>
<!--        <button class="btn" @click="send()">发送</button>-->
        <input type="button" class="btn" value="发送" @click="send()" @keyup.enter="send()">
      </form>
    </div>

    <div v-else>
      <h1>还未有定选的课题哟</h1>
    </div>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: 'communicate',
  data(){
    return{
      userIconPath: 'http://localhost:9527',
      iconPath: null,
      backMsg: 'abcdef',
      user: null,
      topic: null,
      teacher_no: null,
      chatRecord:{
        teacher_id: null,
        student_id: null,
        content: '',
        message_side: null
      }
    }
  },
  created() {
    this.user = this.$store.getters.user
    this.getAlreadySelectTopic()
    this.requestMessage()
  },
  computed: {
    userIcon() {
      return this.$store.getters.user.userIcon
    }
  },
  methods:{

    //返回任务父页面
    communicateBack(){
      this.$emit('func',false)
      sessionStorage.setItem('communicateBoo',JSON.stringify(false))
    },

    // 获取留言记录
    requestMessage(){
      request({
        url: 'user/get/records',
        param:{
          teacherId : this.teacher_no,
          studentId : this.user.student_no
        }
      }).then(res => {
        console.log(res)
      })
    },

    // 获取任务书列表  教师id
    getAlreadySelectTopic() {
      request({
        url: "student/topic/ok",
        params: {
          studentId: this.user.student_no
        }
      }).then( res => {
        if(res.state !== -1) {
          this.topic = res.data
          this.teacher_no = this.topic.teacher_no
          console.log(this.topic)
        }
      })
    },
    //发送事件
    // 用户进行留言
    send(){
      if(this.sendMsg != ''){
        this.chatRecord.teacher_id = this.topic.teacher_no
        this.chatRecord.student_id = this.user.student_no
        this.chatRecord.message_side = this.user.student_no
        request({
          url: 'user/record/add',
          method: 'post',
          data: this.chatRecord
        }).then(res => {
          if(res.state == 1){
            this.chatRecord.content = ''
          }
        }).then(err => {

        })
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

.backBtn{
  float:left;
  margin: 10px;
}
.btn{
  display: inline;
}
.communicate{
  padding: 0;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.communicate .msg{
  width: 806px;
  height: 80vh;
  border: 1px solid saddlebrown;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
/*输入框*/
.con{
  width: 100%;
  height: 20vh;
  border-top: 2px solid rgb(250,236,216);
  position: absolute;
  bottom: 0;
}
/*文本域*/
.con .textarea{
  width: 780px;
  margin: 15px 0 0 0;
  height: 50px;
  border: 0;
  /*去掉点击textarea中显示的边框和右下角的双杠*/
  outline: none;
  -webkit-appearance: none;
  resize: none !important;
  border-radius: 0;
  background: transparent;
}
/*发送btn*/
.con .btn{
  width: 100px;
  height: 30px;
  background: #409EFF;
  color: #fff;
  line-height: 100%;
  float: right;
  margin:20px 30px 0 0;
}

/*内容框*/
.topBox{
  width: 100%;
  height: 60vh;
  overflow: auto;
  overflow-x: hidden;
  background: url("../../assets/com.jpg") no-repeat fixed;
  background-size: cover;
  border-radius: 10px 10px 0 0;
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
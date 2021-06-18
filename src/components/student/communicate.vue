<template>
  <div class="communicate">
    <div class="msg" v-if="topic !== null">
      <div class="topBox">
        <ul class="list">
<!--          收到消息-->
          <li>
            <div class="teaLeft">
            <i v-if="userIcon == null" class="el-icon-user user"></i>
            <img v-else :src="userIconPath + userIcon" alt="" />
            </div>

            <div class="teaRight">
              <span>张三老师</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>
<!--          发送的消息-->
          <li>
            <div class="meLeaf">
              <i v-if="userIcon == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + userIcon" alt="" />
            </div>

            <div class="meRight">
              <span>我</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>

          <!--          收到消息-->
          <li>
            <div class="teaLeft">
              <i v-if="userIcon == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + userIcon" alt="" />
            </div>

            <div class="teaRight">
              <span>张三老师</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>
          <!--          发送的消息-->
          <li>
            <div class="meLeaf">
              <i v-if="userIcon == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + userIcon" alt="" />
            </div>

            <div class="meRight">
              <span>我</span>
              <p>{{ backMsg }}</p>
            </div>
          </li>

        </ul>
      </div>

      <form class="con">
        <textarea class="textarea" wrap="hard" v-model="sendMsg"></textarea>
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
      backMsg: 'abcdef',
      sendMsg: 'aaaaaaaa',
      user: null,
      topic:  null
    }
  },
  created() {
    this.user = this.$store.getters.user
    this.getAlreadySelectTopic()
  },
  computed: {
    userIcon() {
      return this.$store.getters.user.userIcon
    }
  },
  methods:{
    // 获取任务书列表
    getAlreadySelectTopic() {
      request({
        url: "student/topic/ok",
        params: {
          studentId: this.user.student_no
        }
      }).then( res => {
        if(res.state !== -1) {
          // console.log(res)
          this.topic = res.data
        }
      })
    },
    send(){
      console.log(111)
    }
  }
}
</script>

<style scoped>
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
  width: 804px;
  height: 600px;
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
  height: 199px;
  border-top: 1px solid seagreen;
  position: absolute;
  bottom: 0;
}
.con .textarea{
  width: 780px;
  margin: 15px 0 0 0;
  height: 100px;
  border: 0;
  /*去掉点击textarea中显示的边框和右下角的双杠*/
  outline: none;
  -webkit-appearance: none;
  resize: none !important;
  border-radius: 0;
}
.con .btn{
  width: 100px;
  height: 40px;
  background: #409EFF;
  text-align: center;
  float: right;
  margin:20px 30px 0 0;
}

.topBox{
  width: 100%;
  height: 400px;
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
<template>
  <div class="conversation">
    <div class="msg">
      <div class="main">

        <div class="topTop">
            <el-button type="primary" class="backBtn" @click.native="conversationBack()">返回</el-button>
            <span>{{ row.student_name }}</span>
        </div>

        <div class="topBox">
        <ul class="list">
          <!--          收到消息-->
          <li v-for="(item,index) in list">
            <!--            头像-->
            <div :class="item.message_side === teacherId ? 'meLeaf' : 'teaLeft'">
              <i v-if="iconPath == null" class="el-icon-user user"></i>
              <img v-else :src="userIconPath + iconPath" alt="" />
            </div>
            <!--            消息-->
            <div :class="item.message_side === teacherId ? 'meRight' : 'teaRight'">
              <span>{{ item.message_side === teacherId ? '我' : item.student.student_name}}</span>
              <p>{{ item.content }}</p>
            </div>
          </li>

        </ul>
      </div>

        <div class="con">
          <form action="">
            <textarea class="textarea" wrap="hard" v-model="chatRecord.content" autofocus placeholder="请输入"></textarea>
            <input type="button" class="btn" value="发送" @click="send()" @keyup.enter="send()">
          </form>
      </div>
      </div>
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
      teacherId: null,
      studentList: [],
      row: null,
      chatRecord:{
        teacher_id: null,
        student_id: null,
        content: '',
        message_side: null
      },
      list: []
    }
  },
  inject: ['reload'], // 引入方法
  // props:{
  //   obj:{type:Object,default:{}} //paramsObj为父组件传过来的对象
  // },
  // watch:{    //监听
  //   obj: {
  //     immediate:true,
  //     handler: function(value) {
  //       this.row = value
  //       console.log(this.row)
  //     }
  //   }
  // },
  created() {
    const user = this.$store.getters.user
    this.row = JSON.parse(sessionStorage.getItem('stu'))
    if(user != null && this.teacherId == null) {
      this.teacherId = user.teacher_no
    }
    this.requestMessage()
  },
  methods:{
    conversationBack(){
      this.$emit('func',false)
      sessionStorage.setItem('conversationBoo',JSON.stringify(false))
    },
    // 获取留言记录
    requestMessage(){
      request({
        url: 'user/get/records',
        params:{
          teacherId : this.teacherId,
          studentId : this.row.student_no
        }
      }).then(res => {
        this.list = res.data
        console.log(this.list)
      })
    },

    //发送事件
    // 用户进行留言
    send(){
      if(this.chatRecord.content.trim() != ''){
        this.chatRecord.teacher_id = this.teacherId
        this.chatRecord.student_id = this.row.student_no
        this.chatRecord.message_side = this.teacherId
        request({
          url: 'user/record/add',
          method: 'post',
          data: this.chatRecord
        }).then(res => {
          if(res.state == 1){
            this.chatRecord.content = ''
          }
          this.reload() //引用方法
        }).then(err => {

        })
      }else{
        this.$message({
          type: "warning",
          message: '内容不能为空噢',
          duration: 1500
        })
        this.chatRecord.content = ''
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
  width: 806px;
  height: 80vh;
  border: 1px solid saddlebrown;
  position: relative;
  border-radius: 10px;
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

.topTop{
  width: 805px;
  height: 6vh;
  border-radius: 10px 10px 0 0 ;
  border-bottom: 1px solid rgb(250,236,216);
}
.topTop .backBtn{
  border-radius: 10px;
  margin: 0.5vh;
  float: left;
}
.topTop span{
  line-height: 6vh;
  text-align: center;
  color: #fff;
  font-size: 20px;
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
  height: 54vh;
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
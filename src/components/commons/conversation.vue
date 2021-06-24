<template>
  <div class="conversation">
    <div class="msg" v-if="user != null">
      <div class="main">
        <div class="topTop">
          <el-button type="primary" class="backBtn" @click.native="conversationBack()">返回</el-button>
          <span v-if="user.identity === 'teacher'">{{ messageSide.student_name }}</span>
          <span v-else v-html="showName(messageSide.teacher_name)"></span>
        </div>
        <div class="topBox" ref="content">
          <ul class="list">
            <!--          收到消息-->
            <li v-for="item in list" :class="item.message_side == user.user_no ? 'teacher_right' : 'student_left'">
              <!--    头像-->
              <div class="icon">
                <i v-if="item.userPath == null" class="el-icon-user user"></i>
                <img v-else :src="userIconPath + item.userPath" alt=""/>
              </div>
              <!--  消息-->
              <div class="content">
                <div class="title">
                  <span class="name">{{item.message_side == user.user_no ? user.user_name : item.messageUser.user_name}}</span>
                  <span class="time">{{item.create_time | calcCreatedTime}}</span>
                </div>
                <p>{{ item.content }}</p>
              </div>
            </li>

          </ul>
        </div>
        <div class="con">
          <form action="">
            <textarea class="textarea" wrap="hard" v-model="chatRecord.content" @keyup.enter="send" autofocus placeholder="请输入"></textarea>
            <input type="button" class="btn" value="发送" @click="send">
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
    data() {
      return {
        userIconPath: 'http://localhost:9527',
        iconPath: null,
        user: null,
        messageSide: null, // 接收方的对象
        chatRecord: {
          teacher_id: null,
          student_id: null,
          content: '',
          message_side: null
        },
        list: null,
        content: null, // 滚动对象
        inter: null, // 控制滚动对象
      }
    },
    inject: ['reload'], // 引入方法
    created() {
      const user = this.$store.getters.user
      if(user != null && this.user == null) {
        // 判断用户身份
        if(user.identity === 'teacher') {
          this.messageSide = JSON.parse(sessionStorage.getItem('stu'))
        } else {
          this.messageSide = JSON.parse(sessionStorage.getItem('tea'))
        }
        this.user = user
        this.requestMessage()
      }
    },
    computed: {
      showName() {
        return name => {
          return name + "<span style='font-size: 14px; margin-left: 2px;'>(指导老师)</span>"
        }
      }
    },
    mounted() {
      // 创建滚动对象
      this.content = this.$refs.content
    },
    filters: {
      // 时间过滤
      calcCreatedTime(createdTime) {
        const created = new Date(createdTime)
        const year = created.getFullYear()
        const month = created.getMonth() + 1 < 10 ? '0' + (created.getMonth() + 1) : created.getMonth() + 1
        const day = created.getDate() < 10 ? '0' + created.getDate() : created.getDate()
        const hour = created.getHours() < 10 ? '0' + created.getHours() : created.getHours()
        const minute = created.getMinutes() < 10 ? '0' + created.getMinutes() : created.getMinutes()
        // 获取现在时间
        const now = new Date()
        if(now.getFullYear() === year) {
          return month + '月' + day + '日 ' + hour + ':' + minute
        } else {
          return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
        }
      }
    },
    methods: {
      conversationBack() {
        this.$emit('func', false)
        sessionStorage.setItem('conversationBoo', JSON.stringify(false))
      },
      // 获取留言记录
      requestMessage() {
        // 定义两个用户当做参数传递
        let teacherId = null
        let studentId = null
        // 判断身份
        if(this.user.identity === 'teacher') {
          teacherId = this.user.teacher_no
          studentId = this.messageSide.student_no
        } else {
          teacherId = this.messageSide.teacher_no
          studentId = this.user.student_no
        }
        // 获取留言数据
        request({
          url: 'user/get/records',
          params: {
            teacherId: teacherId,
            studentId: studentId
          }
        }).then(res => {
          console.log(res)
          if(this.list == null) {
            setTimeout(() => {
              this.content.scrollTop = this.content.scrollHeight
            }, 60)
          } else {
            // 设置滚动
            setTimeout(() => {
              this.setScroller()
            }, 60)
          }
          this.list = res.data

        }).catch(err => {
          console.log(err)
        })
      },
      // 设置聊天记录滚动条
      setScroller() {
        // 获取滚动对象
        this.inter = setInterval(() => {
          const oldScrollTop = this.content.scrollTop
          this.content.scrollTop += 5
          const newScrollTop = this.content.scrollTop
          if(oldScrollTop === newScrollTop) {
            clearInterval(this.inter)
            this.inter = null
          }
        }, 10)
      },
      //发送事件
      // 用户进行留言
      send() {
        if (this.chatRecord.content.trim() !== '') {
          // 定义两个用户当做参数传递
          let teacherId = null
          let studentId = null
          // 判断身份
          if(this.user.identity === 'teacher') {
            teacherId = this.user.teacher_no
            studentId = this.messageSide.student_no
          } else {
            teacherId = this.messageSide.teacher_no
            studentId = this.user.student_no
          }
          this.chatRecord.teacher_id = teacherId
          this.chatRecord.student_id = studentId
          this.chatRecord.message_side = this.user.user_no // 留言方id
          request({
            url: 'user/record/add',
            method: 'post',
            data: this.chatRecord
          }).then(res => {
            if (res.state === 1) {
              this.chatRecord.content = ''
            }
            //this.reload() //引用方法
            // 重新请求一遍记录
            this.requestMessage()
          })
        } else {
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
  .conversation {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
  }

  .conversation .msg {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
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

  .topTop {
    padding: 12px;
  }

  .topTop .backBtn {
    border-radius: 6px;
    float: left;
    padding: 8px 12px;
  }

  .topTop span {
    text-align: center;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }

  .main {
    width: 810px;
    height: 80vh;
  }


  /*输入框*/
  .con {
    width: 100%;
    position: absolute;
    padding: 8px;
    background-color: white;
  }

  /*文本域*/
  .con .textarea {
    width: 100%;
    border: 0;
    /*去掉点击textarea中显示的边框和右下角的双杠*/
    outline: none;
    -webkit-appearance: none;
    resize: none !important;
    border-radius: 0;
    /*border-style: none;*/
    color: black;
    background-color: transparent;
  }

  /*发送btn*/
  .con .btn {
    background: #409EFF;
    color: #fff;
    line-height: 100%;
    float: right;
    margin-right: 23px;
    margin-bottom: 12px;
  }

  /*内容框*/
  .topBox {
    width: 100%;
    height: 54vh;
    overflow-x: hidden;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px 8px 14px 8px;
    background: rgb(245, 245, 245);
    transition: all 0.35s ease-in-out;
  }

  .topBox::-webkit-scrollbar {
    width: 0;
  }

  .list {
    list-style: none;
    color: black;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .list li {
    display: flex;
    clear: both;
    align-items: center;
    padding: 5px 0;
    line-height: 18px;
    max-width: 50%;
  }

  .list li.teacher_right {
    float: right;
    flex-direction: row-reverse;
  }

  .list li.student_left {
    float: left;
  }

  .list li .icon i{
    padding: 8px 10px;
    background-color: #9fa8da;
  }

  .list li .icon img {
    width: 30px;
    height: 30px;
  }

  .list li.teacher_right .icon {
    margin-left: 5px;
  }

  .list li.student_left .icon {
    margin-right: 5px;
  }

  .list li .content {
    width: 100%;
  }

  .list li .content p{
    margin: 0;
  }

  .list li.teacher_right .content{
    text-align: right;
  }

  .list li.teacher_right .content .title{
    display: flex;
    flex-direction: row-reverse;
  }

  .list li .content .title .time{
    padding: 2px 8px;
    background: rgb(218, 218, 218);
    color: white;
  }

  .list li.teacher_right .content .title .name{
    margin-left: 3px;
  }

  .list li.student_left .content{
    text-align: left;
  }

  .list li.student_left .content .name{
    margin-right: 3px;
  }

  .list li .content span{
    font-size: 12px;
    color: #aaa;
  }

  .list li .content p {
    padding: 8px;
    background: white;
    font-size: 14px;
    margin-top: 5px;
    word-break: break-word;
    text-align: left;
    width: fit-content;
    display: inline-block;
    border-radius: 3px;
  }
</style>
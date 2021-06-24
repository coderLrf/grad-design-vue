<template>
  <div class="myTopic">
    <conversation v-if="boo" @func="judge" :arr="arr" />
<!--    <router-view v-if="boo" @func="judge" :arr="arr"></router-view>-->
    <div v-else>
      <div v-if="topic !== null">
        <h2>"{{ topic.title_name }}"</h2>
        <h6 class="teacher" @click="communicate()" title="快来与指导老师沟通吧" style="cursor: pointer">
          <span>指导老师：</span>
          <el-tag effect="dark">{{topic.teacher_name}}</el-tag>
        </h6>
        <el-button type="primary" class="download" @click.native="download">任务书下载</el-button>
        <el-upload :action="defaultUploadPath"
                   class="commitFile"
                   name="fileUpload"
                   :show-file-list="false"
                   :on-success="uploadSuccess">
          <el-button type="primary" class="commitFile">提交作品</el-button>
        </el-upload>
      </div>
      <div v-else>
        <h2>还未存在定选课题，快去预选课题吧~</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "@/network/request";
  import conversation from "../commons/conversation"

  export default {
    name: "myTopic",
    data() {
      return {
        user: null,
        topic: null,
        boo: false,
        arr: [],
        teacherId: null,
        defaultUploadPath: 'http://localhost:9527/api/student/uploadFile/', // 默认上传文件地址
      }
    },
    components: {
      conversation
    },
    //进communicata的第一时间没有获取到数据，试着在mytopic获取了传过去
    beforeCreate() {
      let user = this.$store.getters.user
      request({
        url: "student/topic/ok",
        params: {
          studentId: user.student_no
        }
      }).then(res => {
        if (res.state !== -1) {
          let topic = res.data
          sessionStorage.setItem('teacherId', JSON.stringify(topic.teacher_no))
        }
      })
    },
    created() {
      this.user = this.$store.getters.user
      this.defaultUploadPath += this.user.student_no
      this.getAlreadySelectTopic()
      this.boo = JSON.parse(sessionStorage.getItem('conversationBoo'))
      //再请求一边
      this.requestMessage()
    },
    methods: {
      // 成功提交作品
      uploadSuccess(res) {
        if(res.state === 1) {
          this.$message.success('成功提交作品.')
        }
      },
      // 获取留言记录
      requestMessage() {
        //在sessionStorage中拿出教师id
        this.teacherId = sessionStorage.getItem('teacherId')
        request({
          url: 'user/get/records',
          params: {
            teacherId: this.teacherId,
            studentId: this.user.student_no
          }
        }).then(res => {
          this.arr = res.data
        })
      },
      //子组件传递false
      judge(value) {
        this.boo = value
      },
      //跳转到谈话界面
      communicate() {
        this.boo = true
        sessionStorage.setItem('tea', JSON.stringify(this.topic))
        sessionStorage.setItem('conversationBoo', JSON.stringify(true));
      },
      // 下载任务书
      download() {
        // 判断任务书是否存在，如果存在则下载，反之，显示提示信息
        this.getDownloadTopic()
        // console.log(this.getAlreadySelectTopic())
      },
      // 获取任务书列表
      getAlreadySelectTopic() {
        request({
          url: "student/topic/ok",
          params: {
            studentId: this.user.student_no
          }
        }).then(res => {
          if (res.state !== -1) {
            this.topic = res.data
          }
        })
      },
      // 获取该课题任务书
      getDownloadTopic() {
        request({
          url: 'student/mission',
          params: {
            topicId: this.user.topic_no
          }
        }).then(res => {
          if (res.state !== -1) {
            // 存在任务书，下载
            window.open(res.data.filePath)
          } else {
            this.$message.warning(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

  .teacher {
    margin: 20px 0;
  }

  .commitFile {
    display: inline-block;
    margin-left: 12px;
  }

</style>
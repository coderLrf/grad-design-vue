<template>
    <div class="myTopic">
      <div v-if="boo">
        <h2>"{{ this.title_name }}"</h2>
        <el-button type="primary" class="download">任务书下载</el-button>
      </div>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
    name: "myTopic",
    data() {
      return{
        user:{},
        title_name: '',
        boo: false
      }
    },
    created(){
      this.user = this.$store.getters.user
      this.getAlreadySelectTopic()
      this.toggle()
    },
    methods:{
      getAlreadySelectTopic() {
        request({
          url: "student/already",
          params: {
            studentId: this.user.student_no,
          },
        }).then( res => {
          this.title_name = res.data.title_name
        })
      },
      toggle(){
        if(this.user.topic_no != null){
          return this.boo = true
        } else {
          this.$message({
            message: '还未定选课题哟',
            type: 'warning',
            duration: 2000
          })
          return this.boo = false
        }
      }
    }
}
</script>

<style scoped>
.el-button--primary{
  margin-top: 2em;
}
</style>
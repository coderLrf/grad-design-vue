<template>
  <div class="my_student">
    <div v-if="boo">
<!--      <router-view @func="judge"></router-view>-->
      <conversation @func="func" />
    </div>
    <div v-else>
    <el-table :data="studentList" style="width: 100%" stripe>
      <el-table-column label="序号" width="100" type="index" align="center"
                       :index="(index) => {return index + 1}"></el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级专业" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.student_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所选课题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="bookStudent(scope.row)">沟通</el-button>
          <el-button size="mini" type="info" @click="bookFile(scope.row)">下载作品</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>


</template>

<script>
  import {request} from "../../network/request"
  import conversation from "../commons/conversation"

  export default {
    name: "myStudent",
    data() {
      return {
        teacherId: null,
        studentList: null, // 保存学生数据
        boo: false
      }
    },
    components: {
      conversation
    },
    created() {
      const user = this.$store.getters.user
      if(user != null && this.teacherId == null) {
        this.teacherId = user.teacher_no
      }
      this.boo = JSON.parse(sessionStorage.getItem('conversationBoo'))
      // 请求数据
      this.getPrimaryTopic()
    },
    methods: {
      //子组件传递false
      judge(value){
        this.boo = value
      },
      func(flag) {
        this.boo = flag
      },
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
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 查看该学生
      bookStudent(row) {
        sessionStorage.setItem('stu',JSON.stringify(row))
        this.boo = true
        sessionStorage.setItem('conversationBoo',JSON.stringify(true));
      },
      // 查看该学生提交的作品
      bookFile(row) {
        const studentId = row.student_no
        request({
          url: 'teacher/get/file',
          params: {
            studentId
          }
        }).then(res => {
          if(res.state === 1) {
            // 作品获取成功...
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

</style>
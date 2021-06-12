<template>
  <div class="my_student">
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
          <el-button size="mini" type="primary" @click="bookStudent(scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {request} from "../../network/request"

  export default {
    name: "myStudent",
    data() {
      return {
        teacherId: null,
        studentList: null // 保存学生数据
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
    methods: {
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
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 查看该学生
      bookStudent(row) {
        console.log(row)
      }
    }
  }
</script>

<style scoped>

</style>
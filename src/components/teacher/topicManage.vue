<template>
  <div class="topicManagMent">
    <div class="content">
      <el-table :data="stuList" style="width: 100%" stripe ref="li">
        <el-table-column label="序号" width="100" type="index" align="center"
                         :index="indexMethod"></el-table-column>
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
            <el-button size="mini" type="primary" @click="determine(scope.$index, scope.row)">定选
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "topicManagMent",
    data() {
      return {
        stuList: null
      };
    },
    created() {
      // 创建组件，添加了一个teacherId属性
      this.teacherId = this.$store.getters.user.teacher_no
      this.getSelectPrimary()
    },
    methods: {
      // 请求获取预选自己课题的学生
      getSelectPrimary() {
        request({
          url: "teacher/selectPrimary",
          params: {
            teacherId: this.teacherId,
          },
        }).then((res) => {
          if(res.state === 1) {
            this.stuList = res.data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      indexMethod(index) {
        return (index += 1)
      },
      // 定选课题
      determine(index, row) {
        // 获取课题id和学生id
        const topicId = row.title_no
        const studentId = row.student_no
        request({
          url: "topic/selectPrimary",
          method: "post",
          params: {
            topicId,
            studentId,
          },
        }).then((res) => {
          if(res.state !== -1) {
            // 重新获取一遍数据
            this.getSelectPrimary()
            return this.$message.success(res.message)
          }
          return this.$message.error(res.message)
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将不能选择改学生课题，是否继续？', '小提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 获取课题id和学生id
          const topicId = row.title_no
          const studentId = row.student_no
          request({
            url: "topic/no/passTopic",
            method: "post",
            params: {
              topicId,
              studentId,
            },
          }).then((res) => {
            if(res.state === 1) {
              this.$message({
                type: 'success',
                message: res.message
              })
              // 重新请求一遍数据
              this.getSelectPrimary()
            }
          })
        }).catch(() => {
          return false
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
  }

  .content p {
    color: black;
  }
</style>
<template>
  <div class="readContent">
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        ref="li">
        <el-table-column
          label="序号"
          width="120"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column label="指导老师" width="200">
          <template slot-scope="scope">
            <el-tag size="medium" style="margin-left: 10px">{{ scope.row.teacher_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="课题名称" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.title_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, scope.row.title_no)">取消预选
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request"

  export default {
    name: "readContent",
    data() {
      return {
        tableData: [],
        user: null // 登录用户对象
      };
    },
    created() {
      const user = this.$store.getters.user
      if(user !== null) {
        this.user = user
        this.getAlreadySelectTopic()
      }
    },
    methods: {
      // 获取已经预选的数据
      getAlreadySelectTopic() {
        request({
          url: "student/already",
          params: {
            studentId: this.user.student_no,
          },
        }).then((res) => {
          if ((res.data.length > 0)) {
            this.tableData = res.data
          }
        })
      },
      handleDelete(index, row, id) {
        request({
          url: "student/back",
          method: "post",
          params: {
            topicId: id,
            studentId: this.user.student_no
          },
        }).then((res) => {
          if (res.state == 1) {
            this.tableData.splice(index, 1);
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
        });
      },
      indexMethod(index) {
        return (index += 1);
      },
    },
  };
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

  .el-table::before, .el-table__fixed-right::before, .el-table__fixed::before {
    height: 0;
  }
</style>
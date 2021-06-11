<template>
  <div class="topicManagMent">
    <div class="content">
      <el-table :data="stuList" style="width: 100%" stripe ref="li">
        <el-table-column
          label="序号"
          width="100"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column label="日期" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.student_name }}</span>
            <!-- <el-popover trigger="hover" placement="top">
              <p>指导老师: {{ scope.row.teacher }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.subject }}</el-tag>
              </div>
            </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="班级专业" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.stuClass }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学号" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.stuNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所选课题" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.title_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="agree(scope.$index, scope.row)"
              >同意</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";

export default {
  name: "topicManagMent",
  data() {
    return {
      topicId: 0,
      stuList: [],
    };
  },
  created() {
    request({
      url: "teacher/selectPrimary",
      params: {
        teacherId: this.$store.state.id,
      },
    }).then((res) => {
      // console.log(res.data[0].title_no)
      this.stuList = res.data;
      this.topicId = res.data[0].title_no;
    });
  },
  methods: {
    indexMethod(index) {
      return (index += 1);
    },
    agree(index, row) {
      // console.log(this.topicId)
        request({
          url: "topic/selectPrimary",
          method: "post",
          params: {
            topicId : this.topicId,studentId : 2019101044
          }
        }).then((res) => {
          console.log(res);
        });
    },
    handleDelete(index, row) {
      this.stuList.splice(index, 1);
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
</style>
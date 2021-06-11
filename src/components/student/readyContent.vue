<template>
  <div class="readContent">
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        ref="li"
      >
        <el-table-column
          label="序号"
          width="120"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column label="日期" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课题" width="300">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>指导老师: {{ scope.row.teacher_name }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.title_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row, scope.row.title_no)"
              >取消预选</el-button
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
  name: "readContent",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-06",
          subject: "毕业设计选题系统",
          teacher: "陈彬",
        },
      ],
    };
  },
  beforeCreate() {
    var studentId = this.$store.state.id;
    request({
      url: "student/already",
      params: {
        studentId: studentId,
      },
    }).then((res) => {
      // console.log(res);
      if (res.state == 1) {
        this.tableData = res.data;
        // console.log(this.tableData);
      }
    });
  },
  methods: {
    handleDelete(index, row, id) {
      var stu = this.$store.state.id;
      request({
        url: "student/back",
        method: "post",
        params: {
          topicId: id,
          studentId: 2019101044
        },
      }).then((res) => {
        if (res.state == 1) {
          this.tableData.splice(index, 1);
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
.el-table::before,.el-table__fixed-right::before,.el-table__fixed::before{
  height: 0;
}
</style>
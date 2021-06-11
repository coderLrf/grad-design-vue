<template>
  <div class="myTopic">
    <div class="content">
      <el-table
        :data="myTopicList"
        style="width: 100%"
        height="100%"
        stripe
        ref="li"
      >
        <el-table-column
          label="序号"
          width="100"
          type="index"
          :index="indexMethod"
        ></el-table-column>
        <el-table-column label="发布时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="对应专业" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.major }}</span>
            <!-- <el-popover trigger="hover" placement="top">
              <p>指导老师: {{ scope.row.teacher }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.subject }}</el-tag>
              </div>
            </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="课题名称" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.topicName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="details(scope.$index, scope.row)"
              >查看详情</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.$index, scope.row)"
              >编辑</el-button
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
export default {
  name: "myTopic",
  data() {
    return {
      myTopicList: [
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
        {
          time: "2021-05-23",
          major: "计算机技术应用(软件设计方向)",
          topicName: "毕业设计选题系统",
          state: "待审核",
        },
      ],
    };
  },
  methods:{
    indexMethod(index) {
      return (index += 1);
    },
    details(index,row){
      console.log(index,row)
    },
    edit(index,row){
      console.log(index,row)
    },
    handleDelete(index,row){
      console.log(index,row)
    }
  }
};
</script>

<style scoped>
</style>
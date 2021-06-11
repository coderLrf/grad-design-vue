<template>
  <div class="myTopic">
    <div class="content">
      <el-table
        :data="myTopicList"
        stripe
        ref="li">
        <el-table-column label="序号" type="index" :index="indexMethod" align="center"></el-table-column>
        <el-table-column label="课题名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot="header">
            <span style="margin-right: 5px">状态</span>
            <select v-model="selectType"
                    @change="selectChange"
                    style="padding: 5px; border: 1px solid #ccc; outline: none">
              <option value="all">所有</option>
              <option value="ok">已通过</option>
              <option value="pass">未通过</option>
            </select>
          </template>
          <template slot-scope="scope">
            <span v-if="scope.row.admission === '是'">
              <el-tag type="success" effect="dark">已通过审核</el-tag>
            </span>
            <span v-else-if="scope.row.admission === '否'">
              <el-tag type="danger" effect="dark">未通过审核</el-tag>
            </span>
            <span v-else>
              <el-tag type="info" effect="dark">审核中</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="任务书" fixed="right" align="center">
          <template slot-scope="scope">
            <a v-if="scope.row.file" :href="lookFilePath + scope.row.file.filePath" class="lookFile">{{scope.row.fileName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-upload :action="defaultUploadPath + scope.row.title_no"
                       v-show="scope.row.admission === '是'"
                       name="fileUpload"
                       class="uploadFile"
                       @on-success="uploadSuccess"
                       :show-file-list="false"
                       multiple
                       style="display: inline-block">
              <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
            <el-button size="mini" type="primary"
                       @click="toEdit(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger"
                       @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑课题对话框 -->
    <el-dialog
      title="编辑课题"
      :visible.sync="showEditDialog"
      width="30%">
      <el-form ref="form" :model="topicForm" label-width="80px">
        <el-form-item label="课题id：" label-width="85px">
          <el-input v-model="topicForm.topicId" readonly></el-input>
        </el-form-item>
        <el-form-item label="课题名称：" label-width="85px">
          <el-input v-model="topicForm.topicName"></el-input>
        </el-form-item>
        <el-form-item label="课题描述：" label-width="85px">
          <el-input v-model="topicForm.topicDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {request} from '../../network/request'

  export default {
    name: "myTopic",
    data() {
      return {
        myTopicList: [],
        selectType: 'all', // 默认查询所有课题
        topicForm: {},
        showEditDialog: false, // 控制编辑对话框的显示与隐藏
        defaultUploadPath: 'http://localhost:9527/api/teacher/uploadFile/', // 默认上传文件地址
        filePath: '',
        lookFilePath: 'http://localhost:9527'
      };
    },
    created() {
      this.teacherId = this.$store.getters.user.teacher_no
      this.getTopicList(this.selectType)
    },
    computed: {
      admission(admission) {
        let adm;
        adm = admission === '是' ? '已通过审核' : admission === '是' ? '未通过审核' : '审核中'
        return adm
      }
    },
    methods: {
      // 文件上传成功之后
      uploadSuccess(res) {
        if(res.state === 1) {
          this.filePath = res.data.substr(res.data.lastIndexOf('_'))
          // 重新请求一遍数据
          this.getTopicList(this.selectType)
          return this.$message.success(res.message)
        }
        return this.$message.error(res.message)
      },
      // 选择类型
      selectChange() {
        this.getTopicList(this.selectType)
      },
      // 获取该教师的课题
      getTopicList(type) {
        request({
          url: 'teacher/list',
          params: {
            teacherId: this.$store.getters.user.teacher_no,
            type
          }
        }).then(res => {
          this.myTopicList = res.data
        })
      },
      indexMethod(index) {
        return (index += 1);
      },
      toEdit(row) {
        this.showEditDialog = true
        const form = {
          topicId: row.title_no,
          topicName: row.title_name,
          topicDesc: row.title_desc,
          teacherId: this.teacherId
        }
        this.topicForm = form
      },
      edit() {
        // 检查判断
        if (this.topicForm.topicName === '' || this.topicForm.topicDesc === '') {
          return this.$message({
            type: 'success',
            message: '输入的内容不能为空哟.'
          })
        }
        // 修改课题
        request({
          url: 'teacher/update',
          method: 'post',
          data: this.topicForm
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          // 修改成功
          this.showEditDialog = false
          // 重新请求一遍数据
          this.getTopicList(this.selectType)
        })
      },
      handleDelete(row) {
        const topicId = row.title_no
        this.$confirm('此操作将会删除该课题，是否继续？', '小提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除课题
          request({
            url: 'teacher/delete',
            method: 'post',
            params: {
              topicId
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            // 删除成功
            this.getTopicList(this.selectType)
          })
        }).catch(() => {
          return false
        })
      }
    }
  };
</script>

<style scoped>
  .uploadFile {
    margin-right: 8px;
  }

  .lookFile{
    text-decoration: none;
    cursor: pointer;
  }

  .lookFile:hover {
    color: #7986cb;
  }
</style>
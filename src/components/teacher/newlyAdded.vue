<template>
  <div class="newlyAdded">
    <el-form
      ref="form"
      label-width="100px"
      :model="topicForm"
      class="el_form"
      label-position="right">
      <el-form-item label="课题名称：">
        <el-col :span="8">
          <el-input v-model="topicForm.topicName" placeholder="名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="系部：">
        <el-col :span="4">
          <span>{{user.institute_name}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="课题简介：">
        <el-col :span="12">
          <el-input
            v-model="topicForm.topicDesc"
            type="textarea"
            :rows="3"
            placeholder="简单介绍使用到的技术或者课题特色等"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "newlyAdded",
    data() {
      return {
        labelPosition: "top",
        topicForm: {
          topicName: '',
          topicDesc: '',
          teacherId: ''
        }
      };
    },
    created() {
      // 获取当前登录对象
      this.user = this.$store.getters.user
      this.topicForm.teacherId = this.user.teacher_no
    },
    methods: {
      onSubmit() {
        // 基础判断
        if (this.topicForm.topicName === '' || this.topicForm.topicDesc === '') {
          return this.$message({
            type: 'warning',
            message: '内容不能为空哟.'
          })
        }
        // 新增课题
        request({
          url: "teacher/add/topic",
          method: "post",
          data: this.topicForm,
        }).then((res) => {
          const message = res.message
          if(res.state === 1) {
            this.$message({
              type: 'success',
              message
            })
            // 清空表单
            this.emptyForm()
          }
        }).catch(err => {
          this.$message({
            type: 'success',
            message: err.message
          })
        })
      },
      // 清空表单
      emptyForm() {
        this.topicForm.topicName = ''
        this.topicForm.topicDesc = ''
      }
    }
  }
</script>

<style scoped>
  .newlyAdded {
    width: 100%;
    height: calc(100vh - 100px);
    overflow: auto;
  }

  .el_form {
    margin: 20px 0 0 30px;
    margin-bottom: 100px;
  }

  .button {
    float: left;
  }

  .upload-demo {
    text-align: center;
  }

  .upload_button {
    margin-top: 10px;
  }
</style>
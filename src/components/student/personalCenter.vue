<template>
  <div class="personalCenter">
    <el-col :span="12">
      <div class="a">
        <div class="imgheader">
          <div>
            <i v-if="userIcon == null" class="el-icon-user"></i>
            <img v-else :src="userIconPath + userIcon" alt="" />
          </div>
        </div>
      </div>
      <!-- 上传icon -->
      <el-upload :action="defaultUploadPath" name="iconUpload"
                 :show-file-list="false"
                 :before-upload="uploadBefore"
                 :on-success="uploadSuccess">
        <el-button size="small" type="primary">上传</el-button>
      </el-upload>
    </el-col>

    <el-col :span="12">
      <el-form ref="form" label-width="100px" size="mini" class="el_form">
        <el-form-item label="姓名:">
          <span>{{ this.user.student_name }}</span>
        </el-form-item>
        <el-form-item label="学号:">
          <span>{{ this.user.student_no }}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span>{{ this.user.sex }}</span>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "personalCenter",
    data() {
      return {
        fileList: [
          {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
        action: "https://jsonplaceholder.typicode.com/posts/",
        mode: {},
        defaultUploadPath: 'http://localhost:9527/api/user/upload_icon/', // 默认上传文件地址
        userIconPath: 'http://localhost:9527',
        userIcon: null,
        user: {}
      };
    },
    created() {
      this.user = this.$store.getters.user
      // console.log(this.user)
      const id = this.$store.getters.user.student_no
      this.uploadPath += id
    },
    methods: {
      // 上传之前
      uploadBefore(file) {
        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
          this.$message.error('上传的必须是图片格式，jpeg和png')
          return false
        }
        return true
      },
      // 上传成功
      uploadSuccess(res) {
        if(res.state === 1) {
          this.userIcon = res.data
          // 更新用户数据
          this.user.userIcon = res.data
          // 更新vuex的用户数据
          this.$store.dispatch('updateUser', this.user)
          return this.$message.success('用户icon上传成功.')
        }
        return this.$message.error(res.message)
      }
    },
  };
</script>

<style scoped>
.personalCenter {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
}
.a {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgheader {
  width: 300px;
  height: 300px;
  margin: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 300px;
  overflow: hidden;
  text-align: center;
}
.imgheader img {
  width: 200px;
  height: 200px;
}

.imgheader .el-icon-user {
  font-size: 12em;
}
.el_form {
  margin-top: 35px;
}
.el_form >>> .el-form-item__label,
span {
  font-size: 18px;
}
/* .el-col{
  height: 500px;
} */
.upload_button {
  margin-top: 10px;
}
</style>
<template>
  <div class="upload_icon">
    <div class="a">
      <div class="imgheader">
        <div>
          <i v-if="userIcon == null" class="el-icon-user"></i>
          <img v-else :src="userIconPath + userIcon" alt="" />
        </div>
      </div>
    </div>
    <el-upload :action="defaultUploadPath"
               name="iconUpload"
               :show-file-list="false"
               :before-upload="uploadBefore"
               :on-success="uploadSuccess">
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "uploadIcon",
    data() {
      return {
        defaultUploadPath: 'http://localhost:9527/api/user/upload_icon/', // 默认上传文件地址
        userIconPath: 'http://localhost:9527',
        userIcon: null
      }
    },
    created() {
      this.user = this.$store.getters.user
      this.defaultUploadPath += this.user.user_no
      if(this.user.userIcon !== null) {
        this.userIcon = this.user.userIcon
      }
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
          this.user.userIcon = res.data // 更新用户数据
          this.$store.dispatch('updateUser', this.user) // 更新vuex的用户数据
          return this.$message.success('用户icon上传成功.')
        }
        return this.$message.error(res.message)
      },
    }
  }
</script>

<style scoped>
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
</style>
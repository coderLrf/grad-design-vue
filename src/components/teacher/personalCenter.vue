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
      <el-form ref="form" label-width="100px" size="mini" class="el_form" @click.native="cleanUpdate">
        <el-form-item label="姓名:">
          <span>{{user.teacher_name}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{user.teacher_no}}</span>
        </el-form-item>
        <el-form-item label="系部:" class="inst"
                      @mouseover.native="showUpdateInst = true"
                      @mouseleave.native="showUpdateInst = instBox === true">
          <span v-if="!instBox">{{user.institute_name}}</span>
          <select v-else v-model="selectInstitute"
                  @click.stop="() => {return false}"
                  style="padding: 5px; border: 1px solid #ccc; outline: none">
            <option :value="inst.institute_no" v-for="inst in instList">{{inst.institute_name}}</option>
          </select>
          <el-button type="warning" class="updateBtn" v-if="showUpdateInst"
                     @click.native.stop="instBox = true">修改</el-button>
        </el-form-item>
        <el-form-item class="degree" label="职称:"
                      @mouseover.native="showUpdateDegree = true"
                      @mouseleave.native="showUpdateDegree = degreeBox === true">
          <span v-if="!degreeBox">
            <el-tag effect="dark" type="success" v-if="user.degree === '初级教师'">{{user.degree}}</el-tag>
            <el-tag v-else-if="user.degree === '中级教师'">{{user.degree}}</el-tag>
            <el-tag effect="dark" type="warning" v-else-if="user.degree === '高级教师'">{{user.degree}}</el-tag>
            <span v-else>暂无职称</span>
          </span>
          <span v-else>
            <el-radio-group v-model="selectDegree" size="medium">
              <el-radio-button @click.native.stop="() => {return false}" label="高级"></el-radio-button>
              <el-radio-button @click.native.stop="() => {return false}" label="中级"></el-radio-button>
              <el-radio-button @click.native.stop="() => {return false}" label="初级"></el-radio-button>
            </el-radio-group>
          </span>
          <el-button type="warning" class="updateBtn" v-if="showUpdateDegree"
                     @click.native.stop="degreeBox = true">修改</el-button>
        </el-form-item>
        <el-form-item label="座右铭：">
          <el-col :span="22">
            <el-input type="textarea" :rows="10"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import {request} from '../../network/request'

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
      instList: null, // 用来保存所有学院数据
      action: "https://jsonplaceholder.typicode.com/posts/",
      defaultUploadPath: 'http://localhost:9527/api/user/upload_icon/', // 默认上传文件地址
      userIconPath: 'http://localhost:9527',
      userIcon: null,

      showUpdateDegree: false, // 用来控制修改职称按钮的显示
      degreeBox: false, // 控制选择职称的box
      selectDegree: '', // 选择的职称

      selectInstitute: '', // 选择的学院
      showUpdateInst: false, // 用来控制修改学院按钮的显示
      instBox: false, // 控制选择学院

      user: null, // 当前登录用户对象
    }
  },
  created() {
    this.user = this.$store.getters.user
    this.defaultUploadPath += this.user.teacher_no
    if(this.user.userIcon !== null) {
      this.userIcon = this.user.userIcon
    }
    // 请求学院数据
    this.getInstitute()
  },
  methods: {
    // 取消修改（修改完成）
    cleanUpdate() {
      if(this.degreeBox) {
        this.updateDegree()
      }
      if(this.instList && this.selectInstitute) {
        this.updateInst()
      }
    },
    // 修改学院
    updateInst() {
      if(this.selectInstitute === '') {
        return this.$message.error('不能为空')
      }
      request({
        url: 'teacher/update/institute',
        params: {
          instituteId: this.selectInstitute,
          teacherId: this.user.teacher_no
        }
      }).then(res => {
        if(res.state !== -1) {
          for (let i = 0; i < this.instList.length; i++) {
            if(this.instList[i].institute_no === this.selectInstitute) {
              // 修改user的institute_name
              this.user.institute_name = this.instList[i].institute_name
              break
            }
          }
          this.showUpdateInst = this.instBox = false
          this.user.institute_no = this.selectInstitute // 修改$store
          this.$store.dispatch('updateUser', this.user) // 更新vuex的用户
          return this.$message.success(res.message)
        }
        return this.$message.error(res.message)
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改职称
    updateDegree() {
      if(this.selectDegree === '') {
        return this.$message.error('不能为空')
      }
      request({
        url: 'teacher/update/degree',
        params: {
          degree: this.selectDegree,
          teacherId: this.user.teacher_no
        }
      }).then(res => {
        if(res.state !== -1) {
          this.showUpdateDegree = this.degreeBox = false
          // 修改$store
          this.user.degree = this.selectDegree + "教师"
          // 更新vuex的用户
          this.$store.dispatch('updateUser', this.user)
          return this.$message.success(res.message)
        }
        return this.$message.error(res.message)
      }).catch(err => {
        console.log(err)
      })
    },
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
    // 请求所有学院数据
    getInstitute() {
      request({
        url: 'teacher/get/institute'
      }).then(res => {
        if(res.state !== -1) {
          this.instList = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
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

.degree, .inst {
  position: relative;
  cursor: pointer;
}

.updateBtn {
  position: absolute;
  right: 25px;
}

.degree label.el-radio-button  {
  margin: 0;
}
</style>
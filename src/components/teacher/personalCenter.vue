<template>
  <div class="personalCenter">
    <el-col :span="12">
      <div class="a">
        <div class="imgheader">
          <div>
            <img src="../../assets/login.jpg" alt="" />
          </div>
        </div>
      </div>

      <!-- 通过 limit和on-exceed来限制上传文件和个数定义超出限制时的行为，通过slot可以传入自定义的上传按钮类型和文字提示 -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
      >
        <el-button size="small" type="primary">点击上传头像</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-col>

    <el-col :span="12">
      <el-form ref="form" label-width="100px" size="mini" class="el_form">
        <el-form-item label="姓名:">
          <span>vic</span>
        </el-form-item>
        <el-form-item label="工号:">
          <span>6666</span>
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
export default {
  name: "personalCenter",
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {},
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
.imgheader:hover img {
  width: 300px;
  height: 300px;
  transition: 3s;
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
</style>
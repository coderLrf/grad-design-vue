<template>
  <div class="instructor">
    <ul class="ul">
      <li class="list_li" v-for="(item, key) in list" :key="key" ref="li">
        <div class="container">
          <div class="select">
            <p>题目：{{ item.title_name }}</p>
            <p>指导老师：{{ item.teacher_name }}</p>
            <span>课题介绍：{{ item.title_desc }}</span>
          </div>
          <div
            class="loading-btn"
            @click="readySelect(key, item.title_no)"
            ref="div"
          >
            <button><span ref="span">预选</span></button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { request } from "../../network/request";
import "../../assets/css/style.css";

export default {
  name: "instructor",
  data() {
    return {
      count: 0,
      list: [
        { topicName: "毕业设计选题系统", teacherName: "陈彬" },
        { topicName: "电商平台的web前端设计与实现", teacherName: "陈彬" },
        { topicName: "网站UI界面设计", teacherName: "陈彬" },
        { topicName: "小型数据库系统设计(mysql)", teacherName: "陈彬" },
        { topicName: "某个旅游景点的网站设计", teacherName: "陈彬" },
        { topicName: "电子商务类网站制作", teacherName: "陈彬" },
        { topicName: "智能手机APP-UI界面设计", teacherName: "陈彬" },
        { topicName: "H5移动融鼓某体制作", teacherName: "陈彬" },
        { topicName: "某(酒店)名宿的网站设计", teacherName: "陈彬" },
        { topicName: "个人网站制作", teacherName: "陈彬" },
        { topicName: "聊天室系统", teacherName: "陈彬" },
        { topicName: "个人博客系统", teacherName: "陈彬" },
        { topicName: "说一句我不走了", teacherName: "陈彬" },
      ],
    };
  },
  beforeCreate() {
    var studentId = this.$store.state.id;
    // console.log(typeof studentId);
    request({
      url: "student/admission",
      params: {
        studentId: studentId,
      },
    }).then((res) => {
      // console.log(res);
      if ((res.state = 1)) {
        this.list = res.data;
      }
    });
  },
  methods: {
    load() {
      this.count += 2;
    },
    readySelect(e, id) {
      var studentId = this.$store.state.id;
      request({
        url: "student/primary",
        method: "post",
        params: {
          studentId: studentId,
          topicId: id,
        },
      }).then((res) => {
        // console.log(res);
        if (res.state == 1) {
          this.$message({
            message: "预选成功",
            type: "success",
          });
          this.$store.commit("changeTableData", this.list[e]);
          this.$refs.span[e].innerHTML = "已预选";
          this.$refs.div[e].style = "pointer-events: none";
        }else{
          this.$message({
            message: "预选失败",
            type: "danger",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.instructor {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
}
.instructor .ul {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  list-style: none;
}
.instructor .ul .list_li {
  width: 300px;
  height: 300px;
  margin: 10px;
}
.instructor .ul .list_li .container {
  width: 300px;
  height: 300px;
  padding: 0;
  /* margin: 20px 20px 20px 0; */
}
.instructor .ul .list_li .container .select {
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid #909399;
  border-radius: 15px;
}
.instructor .ul .list_li .container .select p {
  height: 40px;
  width: 297px;
  border-bottom: 1px solid #909399;
  text-align: center;
  line-height: 40px;
}
.instructor .ul .list_li .select:hover {
  animation: move 3s;
  /* 让animation保持在100% */
  animation-fill-mode: forwards;
  display: block;
  /* background: #fff; */
}
@keyframes move {
  100% {
    background: pink;
    opacity: 1;
    /* font-size: 18px; */
    font-weight: bold;
  }
}

#loading-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  background: transparent;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  padding: 15px 50px;
  position: relative;
}

button:before {
  transition: all 0.8s cubic-bezier(0.7, -0.5, 0.2, 2);
  content: "";
  width: 1%;
  height: 100%;
  background: #ff5964;
  position: absolute;
  top: 0;
  left: 0;
}

button span {
  mix-blend-mode: darken;
}

button:hover:before {
  background: #ff5964;
  width: 100%;
}
</style>
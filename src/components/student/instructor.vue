<template>
  <div class="instructor">
    <ul class="ul">
      <li class="list_li" v-for="(item, key) in admissionList" :key="key" ref="li">
        <div class="container">
          <div class="select">
            <p>题目id：{{item.title_no}}</p>
            <p>题目名称：{{ item.title_name }}</p>
            <p>指导老师：{{ item.teacher_name }}</p>
            <span>课题介绍：{{ item.title_desc }}</span>
          </div>
          <div class="loading-btn" @click="readySelect(item.title_no)" ref="div">
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
      admissionList: null,
      user: null
    };
  },
  created() {
    const user = this.$store.getters.user
    if(user !== null) {
      this.user = user
      this.getAdmissionList()
    }
  },
  methods: {
    // 获取可以预选数据
    getAdmissionList() {
      request({
        url: "student/admission",
        params: {
          studentId: this.user.student_no,
        },
      }).then((res) => {
        console.log(res)
        if ((res.state == 1)) {
          this.admissionList = res.data;
        }
      })
    },
    // 预选一个课题
    readySelect(topicId) {
      const studentId = this.user.student_no
      request({
        url: "student/primary",
        method: "post",
        params: {
          studentId,
          topicId,
        },
      }).then((res) => {
        const message = res.message
        if (res.state === 1) {
          this.$message({
            message,
            type: "success",
          });
          // 成功之后获取一遍新的数据
          this.getAdmissionList()
        }else{
          this.$message({
            message,
            type: "danger",
          });
        }
      });
    },
    load() {
      this.count += 2;
    }
  },
};
</script>

<style scoped>
.instructor {
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  padding-bottom: 40px;
}
.instructor .ul {
  width: 100%;
  display: flex;
  padding: 15px 15px 0 15px;
  margin: 0;
  flex-wrap: wrap;
  list-style: none;
}

.instructor .ul .list_li {
  flex: 1;
  width: 33%;
  margin: 10px;
}
.instructor .ul .list_li .container {
  width: 300px;
  padding: 0;
  /* margin: 20px 20px 20px 0; */
}
.instructor .ul .list_li .container .select {
  /*height: 200px;*/
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
  width: 100%;
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
<template>
  <div class="cv-container">
    <aside class="sidebar">
      <div class="profile-section">
        <img :src="profileImage" alt="Profile picture" class="profile-pic"/>
        <h2 ref="nameField" @click="editField('name')">Họ Tên: {{ name }}</h2>
        <p ref="titleField" @click="editField('title')"> {{ title }}</p>
        <p ref="addressField" @click="editField('address')">Địa chỉ: {{ address }} </p>
        <p ref="phoneField" @click="editField('phone')">Số Điện thoại: {{ phone }}</p>
        <p ref="emailField" @click="editField('email')">Email: {{ email }}</p>
        <p> Website: {{ website }}</p>
        <div class="social-icons">
          <a v-for="(icon, platform) in socialLinks" :key="platform" :href="icon.link">
            <i :class="icon.class"></i>
          </a>
        </div>
      </div>
      <div class="sidebar-section">
        <h4>Project Management</h4>
        <ul>
          <li v-for="tool in projectManagement" :key="tool">{{ tool }}</li>
        </ul>
        <h4>Design & Coding</h4>
        <ul>
          <li v-for="skill in designCoding" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </aside>
    <main class="main-content">
      <div class="profile-summary">
        <h3>Profile</h3>
        <p>{{ summary }}</p>
      </div>
      <div class="experience-section">
        <h3>Experience</h3>
        <div v-for="job in experiences" :key="job.company" class="job">
          <h4>{{ job.title }} / {{ job.company }}</h4>
          <p>{{ job.date }}</p>
          <ul>
            <li v-for="task in job.tasks" :key="task">{{ task }}</li>
          </ul>
        </div>
      </div>
      <div class="education-section">
        <h3>Education</h3>
        <p>{{ education.degree }} / {{ education.school }}</p>
        <p>{{ education.date }}</p>
        <p>{{ education.remarks }}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Nguyễn Vũ",
      title: "Sinh viên FPOLY",
      address: "Xã Cư Suê , Huyện Cư'mgar, Tỉnh Đắk Lắk",
      phone: "0559743658",
      email: "nguyenvu.cusue@gmail.com  ",
      website: "shoplordche.site",
      profileImage: "https://ispacedanang.edu.vn/wp-content/uploads/2024/05/anh-hoc-sinh-cap-3-nam-2.jpg", 
      socialLinks: {
        linkedin: { link: "", class: "fab fa-linkedin" },
        github: { link: "", class: "fab fa-github" },
        twitter: { link: "", class: "fab fa-twitter" },
        instagram: { link: "", class: "fab fa-instagram" },  
      },
      projectManagement: ["Jira", "Slack", "Trello"],
      designCoding: ["HTML, CSS", "JavaScript", "Vue.js", "PHP", "Laravel", "PHP MVC"],
      summary: "Này để trống nè",
      experiences: [
        {
          title: "Back End Developer",
          company: "FPT Software",
          date: "November 2024 - currently working",
          tasks: ["Phát triển và duy trì hệ thống...", "Kiểm tra và gỡ lỗi...", "Tối ưu hóa hiệu suất..."],
        },
      ],
      education: {
        degree: "Associate in Computer Science",
        school: "Saint Maria University",
        date: "November 9, 2020 - September 5, 2024",
        remarks: "Quá trình học tập",
      },
    };
  },
  methods: {
    editField(field) {
      const newValue = prompt(`Nhập giá trị mới cho ${field}:`, this[field]);
      if (newValue !== null) {
        this[field] = newValue;
      }
    },
  },
};

</script>

<style>

.cv-container {
  display: flex;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.sidebar {
  width: 30%;
  padding: 20px;
  background-color: #fffbea;
  border-radius: 10px;
}

.main-content {
  width: 70%;
  padding: 20px;
}

.profile-section {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #ffecb3;
}

.profile-pic {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 3px solid #ffd54f;
}

.profile-section h2 {
  margin: 10px 0 5px;
  font-size: 24px;
  color: #ffb300;
}

.profile-section p {
  margin: 5px 0;
  color: #8d6e63;
  font-size: 14px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.social-icons a {
  color: #ffb300;
  font-size: 18px;
  text-decoration: none;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #ffa000;
}

.sidebar-section {
  margin-top: 20px;
}

.sidebar-section h4 {
  font-size: 18px;
  color: #795548;
  border-bottom: 2px solid #ffd54f;
  padding-bottom: 5px;
}

.sidebar-section ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
}

.sidebar-section li {
  padding: 8px 0;
  color: #6d4c41;
  font-size: 14px;
}

.profile-summary, .experience-section, .education-section {
  margin-bottom: 20px;
}

.profile-summary h3, .experience-section h3, .education-section h3 {
  color: #795548;
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ffd54f;
  padding-bottom: 5px;
}

.profile-summary p {
  color: #8d6e63;
  line-height: 1.6;
}

.job {
  margin-bottom: 20px;
}

.job h4 {
  margin: 0;
  font-size: 18px;
  color: #ffb300;
}

.job p {
  margin: 5px 0 10px;
  color: #8d6e63;
  font-size: 14px;
}

.job ul {
  padding-left: 20px;
}

.job ul li {
  list-style: disc;
  color: #795548;
  font-size: 14px;
}

.education-section p {
  color: #8d6e63;
  font-size: 14px;
  margin: 5px 0;
}

</style>

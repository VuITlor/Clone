<template>
    <div class="app-container">
      <h3>Xếp Loại Học Sinh</h3>
      <label>
        Nhập điểm trung bình:
        <input v-model.number="dtb" type="number" min="0" max="10" placeholder="Điểm trung bình" />
      </label>
      <button @click="classifyGrade">Xếp loại</button>
      <p :style="{ color: gradeColor }">{{ gradeMessage }}</p>
  
      <h3>Đăng Nhập</h3>
      <form @submit.prevent="login">
        <label>
          Tên đăng nhập:
          <input v-model="username" type="text" placeholder="Username" />
        </label>
        <label>
          Mật khẩu:
          <input v-model="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Đăng nhập</button>
      </form>
      <p :style="{ color: loginColor }">{{ loginMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dtb = ref(0);
  const gradeMessage = ref('');
  const gradeColor = ref('');
  
  const username = ref('');
  const password = ref('');
  const loginMessage = ref('');
  const loginColor = ref('');
  
  function classifyGrade() {
    if (dtb.value < 5) {
      gradeMessage.value = 'Yếu';
      gradeColor.value = 'red';
    } else if (dtb.value >= 5 && dtb.value < 6.5) {
      gradeMessage.value = 'Trung bình';
      gradeColor.value = 'orange';
    } else if (dtb.value >= 6.5 && dtb.value < 8) {
      gradeMessage.value = 'Khá';
      gradeColor.value = 'blue';
    } else if (dtb.value >= 8 && dtb.value < 9) {
      gradeMessage.value = 'Giỏi';
      gradeColor.value = 'green';
    } else if (dtb.value >= 9 && dtb.value <= 10) {
      gradeMessage.value = 'Xuất sắc';
      gradeColor.value = 'purple';
    }
    else {
      gradeMessage.value = 'Vui lòng nhập lại';
      gradeColor.value = 'black';
    }
  }
  
  function login() {
    if (username.value === 'admin' && password.value === '123456') {
      loginMessage.value = 'Đăng nhập thành công';
      loginColor.value = 'green';
    } else {
      loginMessage.value = 'Tên đăng nhập hoặc mật khẩu không đúng';
      loginColor.value = 'red';
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h3 {
    color: #333;
    text-align: center;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  input[type="number"],
  input[type="text"],
  input[type="password"] {
    padding: 8px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    width: 100%;
    font-size: 16px;
    color: white;
    background-color: #4a90e2;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #357ab8;
  }
  
  p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  
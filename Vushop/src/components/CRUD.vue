
To add a feature for creating a new user, you'll need to modify the code to handle multiple users, display a form for adding a new user, and update the user list when a new user is added. Here’s an updated version of your template with a "New User" button, a form to add new users, and a function to handle the addition.

html
Copy code
<template>
  <div class="user-info-container">
    <h3>Thông tin người dùng</h3>

    <button @click="isAdding = true" class="btn btn-primary">Thêm mới người dùng</button>

    <table class="info-table" v-if="users.length">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Tuổi</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(index)" class="btn btn-primary">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form to add new user -->
    <div v-if="isAdding" class="edit-form">
      <h4>Thêm người dùng mới</h4>
      <form @submit.prevent="addUser">
        <label>
          Tên:
          <input v-model="newUser.name" type="text" />
        </label>
        <label>
          Tuổi:
          <input v-model="newUser.age" type="number" />
        </label>
        <label>
          Email:
          <input v-model="newUser.email" type="email" />
        </label>
        <button type="submit">Lưu</button>
        <button @click="cancelAdd" type="button">Hủy</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Form to edit information -->
    <div v-if="isEditing" class="edit-form">
      <h4>Chỉnh sửa thông tin</h4>
      <form @submit.prevent="updateUserInfo">
        <label>
          Tên:
          <input v-model="userInfo.name" type="text" />
        </label>
        <label>
          Tuổi:
          <input v-model="userInfo.age" type="number" />
        </label>
        <label>
          Email:
          <input v-model="userInfo.email" type="email" />
        </label>
        <button type="submit">Lưu</button>
        <button @click="cancelEdit" type="button">Hủy</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const users = reactive([
  { name: 'Nguyễn Vũ', age: 21, email: 'nguyenvu@example.com' }
]);

const userInfo = reactive({ name: '', age: '', email: '' });
const newUser = reactive({ name: '', age: '', email: '' });

const errorMessage = ref('');
const isEditing = ref(false);
const isAdding = ref(false);

function addUser() {
  if (!newUser.name || !newUser.email || newUser.age <= 0) {
    errorMessage.value = 'Vui lòng điền đầy đủ thông tin và đảm bảo tuổi lớn hơn 0!';
    return;
  }
  users.push({ ...newUser });
  resetNewUser();
  isAdding.value = false;
}

function resetNewUser() {
  newUser.name = '';
  newUser.age = '';
  newUser.email = '';
}

function editUser(index) {
  userInfo.name = users[index].name;
  userInfo.age = users[index].age;
  userInfo.email = users[index].email;
  isEditing.value = true;
}

function updateUserInfo() {
  if (!userInfo.name || !userInfo.email || userInfo.age <= 0) {
    errorMessage.value = 'Vui lòng điền đầy đủ thông tin và đảm bảo tuổi lớn hơn 0!';
    return;
  }
  const userIndex = users.findIndex(user => user.email === userInfo.email);
  if (userIndex > -1) {
    users[userIndex] = { ...userInfo };
  }
  isEditing.value = false;
}

function cancelAdd() {
  isAdding.value = false;
  errorMessage.value = '';
}

function cancelEdit() {
  isEditing.value = false;
  errorMessage.value = '';
}
</script>

  <style scoped>
  .user-info-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h3, h4 {
    text-align: center;
    color: #333;
  }
  
  .info-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    text-align: left;
  }
  
  .info-table th, .info-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  .info-table th {
    background-color: #f0f0f0;
    color: #333;
  }
  
  button {
    padding: 6px 12px;
    font-size: 14px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .edit-form {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f7f9fc;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .edit-form label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 14px;
  }
  
  .edit-form input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  
  .edit-form input:focus {
    border-color: #4a90e2;
    outline: none;
  }
  
  .error-message {
    color: red;
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
  </style>
  
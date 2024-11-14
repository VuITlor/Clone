<template>
  <div class="container">
    <div class="abouts text-center">

      <h1>Thông Tin Cá Nhân</h1>
      <a :href="facebookUrl" target="_blank">
        <img :src="avatarUrl" alt="Avatar" class="avatar mt-3" />
      </a>
      <p>MSSV: {{ mssv }}</p>
      <p>Tên Lớp: {{ lop }}</p>
      <p>Họ Tên: {{ ten }}</p>
      <p>Tuổi: {{ tuoi }}</p>
      <p>Sở Thích: {{ soThich }}</p>
      <p>Điểm Mạnh: {{ diemManh }}</p>
      <p>Điểm Yếu: {{ diemYeu }}</p>
      <p>Status: {{ Status }}</p>
      <button @click = changeStatus type="button" class="btn btn-primary mt-5">Change Status</button>
      <br>
      <button @click = changeImg type="button" class="btn btn-primary mt-5">Change IMG</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  mssv: String,
  ten: String,
  tuoi: String,
  lop: String,
  soThich: String,
  diemManh: String,
  diemYeu: String,
  Status: String
})
const Status = ref("Đang hoạt động");
const changeStatus = () => {
  Status.value = prompt("Enter new status");
}

const changeImg = () => {
  avatarUrl.value = "https://i.pinimg.com/564x/b7/e2/c5/b7e2c514b29da340133952577576acc5.jpg"; 
}

const avatarUrl = ref("https://ispacedanang.edu.vn/wp-content/uploads/2024/05/anh-hoc-sinh-cap-3-nam-2.jpg");
const facebookUrl = "https://www.facebook.com/Vu.2091"; 
</script>

<style>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>

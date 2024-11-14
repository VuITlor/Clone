<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const categories = reactive([]);
const name = ref("");
const editingId = ref(null); 

// Fetch data from the API when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories');
    if (response.status === 200) {
      console.log(response.data);
      categories.push(...response.data);
    }
  } catch (error) {
    console.error("Error loading categories:", error);
    alert("Không thể tải danh mục, vui lòng thử lại!");
  }
});

// Handle form submission (for adding or updating categories)
const handleSubmit = async () => {
  if (name.value !== "") {
    const data = { name: name.value };

    try {
      if (editingId.value) {
        // Update existing category
        const response = await axios.put(`http://127.0.0.1:8000/api/categories/${editingId.value}`, data);
        if (response.status === 200) {
          alert("Cập nhật thành công");
          const index = categories.findIndex((item) => item.id === editingId.value);
          if (index !== -1) {
            categories[index] = response.data.data; // Update category in the list
          }
          resetForm();
        }
      } else {
        // Add new category
        const response = await axios.post('http://127.0.0.1:8000/api/categories', data);
        if (response.status === 201) {
          alert("Thêm thành công");
          categories.push(response.data.data); // Add new category to the list
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  } else {
    alert("Vui lòng nhập tên danh mục!");
  }
};

// Handle deletion of a category
const handleDelete = async (id) => {
  if (confirm("Bạn có muốn xoá không?")) {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
      if (response.status === 200) {
        alert("Xóa thành công");
        const newCategories = categories.filter((item) => item.id !== id);
        categories.splice(0, categories.length, ...newCategories);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Không thể xóa danh mục, vui lòng thử lại!");
    }
  }
};

// Handle editing a category
const handleEdit = (item) => {
  name.value = item.name;
  editingId.value = item.id; 
};

// Reset the form fields
const resetForm = () => {
  name.value = "";
  editingId.value = null; 
};
</script>

<template>
  <RouterLink to="/Products" class="btn btn-primary">CRUD Product</RouterLink>
  <div class="container py-5">
    <div class="row">
      <!-- Category Form Section -->
      <div class="col-md-4">
        <h2>{{ editingId ? "Sửa danh mục" : "Thêm danh mục" }}</h2>
        <form @submit.prevent="handleSubmit" class="d-flex">
          <input
            :class="{ 'is-invalid': !name }"
            type="text"
            class="form-control"
            name="name"
            v-model="name"
            placeholder="Tên danh mục"
          />
          <button class="btn btn-primary ml-3">{{ editingId ? "Cập nhật" : "Thêm" }}</button>
          <button v-if="editingId" @click="resetForm" type="button" class="btn btn-secondary ml-3">Hủy</button>
        </form>
      </div>
      
      <!-- Categories List Section -->
      <div class="col-md-8">
        <h2>Danh mục sản phẩm</h2>
        <!-- Display categories or a loading message -->
        <ul class="list-group col-md-6" v-if="categories.length > 0">
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="item in categories"
            :key="item.id"
          >
            <a href="#">{{ item.name }}</a>
            <div>
              <button @click="handleDelete(item.id)" class="btn btn-danger ml-3">Delete</button>
              <button @click="handleEdit(item)" class="btn btn-primary ml-3">Edit</button>
            </div>
          </li>
        </ul>
        <p v-else>Loading categories...</p> <!-- Show loading message if no categories -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.ml-3 {
  margin-left: 1rem;
}
</style>

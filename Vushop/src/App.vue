<script setup>

// import Card from './components/Card.vue';
import CV from './components/CV.vue';
import Cart from './components/Cart.vue';
import CRUD from './components/CRUD.vue';
import DB from './components/DB.vue';
import Lab2 from './components/Lab2.vue';
import Products from './components/Products.vue'
import Cate from './components/Categories.vue';
</script>

<template>
  <div class="container">
    <!-- <h1 class="text-center">Lab 1</h1> -->
    <!-- <CV /> -->
    <!-- <Card /> -->
    <!-- <h1 class="text-center">Lab 2</h1>
    <Cart />
    <CRUD />
    <DB /> -->
    <!-- <Lab2 />  -->
    <!-- <h1 class="text-center">Lab 3</h1>
    <Products /> -->
    <h1> Danh Mục</h1>
    <!-- <Cate /> -->
     <router-view></router-view>
  </div>
</template>

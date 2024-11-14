<script setup>
import { reactive } from 'vue';

const products = reactive([
  { name: "Sản phẩm 1", description: "Mô tả sản phẩm 1, rất chất lượng và đáng mua.", price: 500000, sale: false, image: "http://picsum.photos/id/1/300/300" },
  { name: "Sản phẩm 2", description: "Mô tả sản phẩm 2, chất lượng tốt và giá phải chăng.", price: 300000, sale: false, image: "http://picsum.photos/id/2/300/300" },
  { name: "Sản phẩm 3", description: "Mô tả sản phẩm 3, sản phẩm cao cấp và nhiều tính năng.", price: 1000000, sale: true, image: "http://picsum.photos/id/3/300/300" },
  { name: "Sản phẩm 4", description: "Mô tả sản phẩm 4, chất lượng tốt và giá phải chăng.", price: 500000, sale: false, image: "http://picsum.photos/id/4/300/300" },
]);
</script>

<template>
  <div class="container py-5">
    <h1 class="text-center">Danh sách sản phẩm</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="col" v-for="(product, index) in products" :key="product.name">
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" alt="Product Image">
          <div v-if="product.sale" class="sale-icon">Sale</div>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">
              <span v-if="product.sale" class="text-decoration-line-through">Giá: {{ product.price }}</span>
              <span v-if="product.sale" class="text-danger ms-2">Giá Sale: {{ (product.price * 0.9).toFixed(0) }}</span>
              <span v-else>Price: {{ product.price }}</span>
            </p>
            <a href="#" class="btn btn-primary mt-3">Mua ngay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sale-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>

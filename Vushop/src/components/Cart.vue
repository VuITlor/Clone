<template>
    <div class="cart-container">
      <h3>Giỏ hàng</h3>
      <p class="quantity">Số lượng sản phẩm: <span>{{ quantity }}</span></p>
      <div class="buttons">
        <button @click="decrement" class="decrement">-</button>
        <button @click="increment" class="increment">+</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const quantity = ref(0);
  
  function increment() {
    quantity.value++;
  }
  
  function decrement() {
    if (quantity.value > 0) {
      quantity.value--;
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }
  
  .cart-container h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .quantity {
    font-size: 18px;
    color: #555;
    margin-bottom: 20px;
  }
  
  .quantity span {
    font-weight: bold;
    color: #333;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    width: 40px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .increment {
    background-color: #4caf50;
    color: white;
  }
  
  .increment:hover {
    background-color: #45a049;
  }
  
  .decrement {
    background-color: #f44336;
    color: white;
  }
  
  .decrement:hover {
    background-color: #e53935;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  
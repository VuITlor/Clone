<template>
    <div>
      <h3>One-way và Two-way Data Binding</h3>
  
      <!-- One-way binding -->
      <div>
        <label>One-way binding:</label>
        <input :value="oneWayText" readonly />
        
      </div>
  
      <!-- Two-way binding -->
      <div>
        <label>Two-way binding:</label>
        <input v-model="twoWayText" />
        <button @click="changeOneWayText">Thay đổi One-way</button>
        <p>Giá trị nhập: {{ twoWayText }}</p>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const oneWayText = ref('Giá trị one-way');
  const twoWayText = ref('Giá trị two-way');
  
  function changeOneWayText() {
    oneWayText.value =  twoWayText.value ;
  }
  </script>
  
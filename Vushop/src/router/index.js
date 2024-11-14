import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/Products.vue';
import Categories from '@/components/Categories.vue';

const routes = [
  {
    path: '/Products',
    name: 'Products',
    component: Products
  },
  {
    path: '/Categories',
    name: 'Categories',
    component: Categories
  } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

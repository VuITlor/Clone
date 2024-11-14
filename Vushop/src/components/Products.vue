<template>
    <RouterLink to="/Categories" class="btn btn-primary">Add Categories</RouterLink>
    <h2 class="text-center">(CRUD) Products</h2>

    <table class="table table-bordered mt-4">
        <thead class="table-dark text-center">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <tr v-for="product in productList" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td><img :src="product.image" alt="Product Image" style="width: 100px; height: 100px;"></td>
                <td>{{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>
                    <button @click="actionEdit(product.id)" class="btn btn-warning me-2">Edit</button>
                    <button @click="actionDelete(product.id)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="form-add mt-5 mb-5">
        <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" v-model="name" class="form-control" :class="{ 'is-invalid': isSubmitted && !name }"
                    id="name" placeholder="Enter product name" />
                <div v-if="isSubmitted && !name" class="error-text">Name is required</div>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" v-model="description" class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !description }" id="description"
                    placeholder="Enter product description" />
                <div v-if="isSubmitted && !description" class="error-text">Description is required</div>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" v-model="price" class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !price }" id="price" placeholder="Enter product price" />
                <div v-if="isSubmitted && !price" class="error-text">Price is required</div>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">Image URL</label>
                <input type="text" v-model="image" class="form-control" :class="{ 'is-invalid': isSubmitted && !image }"
                    id="image" placeholder="Enter image URL" />
                <div v-if="isSubmitted && !image" class="error-text">Image URL is required</div>
            </div>

            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Product' : 'Add Product' }}</button>
            <button type="button" @click="resetForm" v-if="isEditing" class="btn btn-secondary ms-2">Cancel</button>
        </form>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
// npm install sweetalert2
const name = ref('');
const description = ref('');
const price = ref('');
const image = ref('');
const productList = ref([]);
const isSubmitted = ref(false);
const isEditing = ref(false);
const editingProductId = ref(null);
onMounted(async () => {
    await fetchProducts();
});
const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        productList.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
const handleSubmit = async () => {
    isSubmitted.value = true;
    if (!name.value || !description.value || !price.value || !image.value) {
        return;
    }
    try {
        if (isEditing.value) {
            const response = await axios.put(`http://127.0.0.1:8000/api/products/${editingProductId.value}`, {
                name: name.value,
                description: description.value,
                price: price.value,
                image: image.value,
            });
            if (response.status === 200) {
                Swal.fire('Success', 'Product updated successfully', 'success')
                await fetchProducts();
            }
        } else {
            const response = await axios.post('http://127.0.0.1:8000/api/products', {
                name: name.value,
                description: description.value,
                price: price.value,
                image: image.value,
            });
            if (response.status === 201) {
                Swal.fire('Success', 'Product add successfully', 'success')
                await fetchProducts();
            }
        }
        resetForm();
    } catch (error) {
        console.error('Error submitting product:', error);
    }
};
const actionDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This product will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
        }
    });
};
const actionEdit = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this product?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            editProduct(id);
        }
    });
};
const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
        if (response.status === 200) {
            productList.value = productList.value.filter((product) => product.id !== id);
            Swal.fire('Success', 'Product deleted successfully', 'success');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
const editProduct = (id) => {
    const product = productList.value.find((product) => product.id === id);
    if (product) {
        name.value = product.name;
        description.value = product.description;
        price.value = product.price;
        image.value = product.image;
        isEditing.value = true;
        editingProductId.value = id;
    }
};
const resetForm = () => {
    name.value = '';
    description.value = '';
    price.value = '';
    image.value = '';
    isSubmitted.value = false;
    isEditing.value = false;
    editingProductId.value = null;
};
</script>

<style scoped>
.form-add {
    width: 500px;
    margin: 0 auto;
}
.is-invalid {
    border: 1px solid red;
}
.error-text {
    color: red;
    font-size: 12px;
}
</style>
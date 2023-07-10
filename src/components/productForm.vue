<template>
    <div class="product-form">
      <button class="add-button" @click="showForm = true">Add Product</button>
      <form class="form" v-if="showForm" @submit.prevent="addProduct">
        <label for="productId">Product ID:</label>
        <input type="number" id="productId" v-model="newProduct.productId" required>
        
        <label for="productName">Name:</label>
        <input type="text" id="productName" v-model="newProduct.productName" required>
        
        <label for="productSize">Size:</label>
        <input type="text" id="productSize" v-model="newProduct.size" required>
        
        <label for="productPrice">Price:</label>
        <input type="text" id="productPrice" v-model="newProduct.price" required>
        
        <button class="submit-button" type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        showForm: false,
        newProduct: {
          productId: '',
          productName: '',
          size: '',
          price: ''
        }
      };
    },
    created(){
      this.emitter.on('getData', (evt) =>{
          console.log(evt.eventContent)
          this.id = evt.eventContent.id;
          this.fetchEmployee(this.id);
      })
    },
    methods: {
      addProduct() {
        this.$emit('product-added', this.newProduct);
        this.resetForm();
      },
      resetForm() {
        this.newProduct = {
          productId: '',
          productName: '',
          size: '',
          price: ''
        };
        this.showForm = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .product-form {
    text-align: center;
  }
  
  .add-button {
    margin-bottom: 10px;
    padding: 8px 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 16px;
    border-radius: 4px;
  }
  
  label {
    margin-bottom: 8px;
    color: #3498db;
  }
  
  input {
    padding: 8px;
    margin-bottom: 12px;
    width: 200px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .submit-button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: #fff;
    border: skyblue;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
  </style>
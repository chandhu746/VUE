<template>
    <div class="search-container">
  <input type="text" class="search-input" v-model="searchTerm" placeholder="Search" />
  <button class="search-button" @click="searchProduct">Search</button>
</div>
<p v-if="noResultsMessage" class="no-results">{{ noResultsMessage }}</p>
<select class="price-range-select" v-model="priceRange" @change="filterByPriceRange">
  <option value="" disabled selected>Choose a price range</option>
  <option value="">All</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>

  <table>
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Name</th>
        <th>Size</th>
        <th>Price</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.product_id }}</td>
        <td>{{ product.product_name }}</td>
        <td>{{ product.size }}</td>
        <td>{{ product.price }}</td>
        <td>
            <button @click="editProduct(product)">Edit</button>
        </td>
        <td>
            <button @click="deleteProduct(product.id)">Delete Product</button>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductForm @product-added="addProduct"></ProductForm>
</template>

<script>
import axios from "axios";
import ProductForm from "./productForm.vue";


export default {
  components: { ProductForm },
  data() {
    return {
      products: [],
      editproduct : {
        product_id: '',
        product_name: '',
        price:'',
        size:''
       },
      priceRange:''
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://127.0.0.1:3333/displayProduct")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
     addProduct(newProduct) {
      axios
        .post("http://127.0.0.1:3333/insertProduct", newProduct)
        .then((response) => {
          this.products.push(response.data);
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    },
    deleteProduct(id) {
    axios
    .get(`http://127.0.0.1:3333/deleteProduct/${id}`)
    .then((response) => {
      console.log('Data deleted successfully:', response.data);
      this.fetchProducts();
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
    });
    },
    searchProduct() {
  axios
    .get('http://127.0.0.1:3333/searchProduct', {
      params: {
        term: this.searchTerm,
      },
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.length === 0) {
        this.products = []; // Clear the existing data
        this.noResultsMessage = 'No matching products found.';
      } else {
        this.products = response.data;
        this.noResultsMessage = '';
      }
    })
    .catch((error) => {
      console.error('Error searching products:', error);
    });
},
  filterByPriceRange() {
    if (this.priceRange === '') {
      this.fetchProducts();
    } else {
      // Filter products based on price range
      const filteredProducts = this.products.filter((product) => {
        if (this.priceRange === 'low') {
          return product.price <= 1000; 
        } else if (this.priceRange === 'medium') {
          return product.price > 1000 && product.price <= 2000;
        } else if (this.priceRange === 'high') {
          return product.price > 2000;
        }
      });

      this.products = filteredProducts;
    }
  },
  editProduct(product) {
    this.showForm = true;
    this.editData = product;
    this.editproduct.product_id = editproduct.product_id;
    this.editproduct.product_name = editproduct.product_name;
    this.editproduct.price = editproduct.price;
    this.editproduct.size = editproduct.size;
    console.log(this.editproduct)
    this.emitter.emit("getData",{eventContent :this.editproduct});
  },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  font-size: 14px;
}

.search-button {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.no-results {
  color: red;
  font-style: italic;
}

.price-range-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

</style>
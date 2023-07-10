<template>
    <div>
        <h2>Sign Up Form</h2>
        <form @submit.prevent="signUp">
           <div>
            <label>Email :</label>
            <input type="email" v-model="email" required>
           </div> 
           <div>
            <label> Name :</label>
            <input type="text" v-model="name" required>
           </div>
           <div>
            <label>password</label>
            <input type="password" v-model="password" required>
           </div>
           <button type="submit" >Sign Up</button>
        </form>
    </div>
</template>
<script lang="ts"> 
import axios from 'axios';
export default{
    data(){
        return{
            email: '',
            name: '',
            password: '',
        };
    },
    methods: {
  async signUp() {
    try {
      const response = await axios.post('', {
        name: this.name,
        email: this.email,
        password: this.password
      });

      console.log(response.data); 
    } catch (error) {
      console.error(error);
     
    }
  }
}

};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
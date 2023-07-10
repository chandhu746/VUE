<template>
  <div class="new">
    <h2>ENTER DETAILS</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" pattern="[A-Za-z]+" required>
      </div>
      <div>
        <label for="roll">Roll:</label>
        <input type="text" id="roll" v-model="formData.roll" pattern="[A-Za-z0-9]+" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="form-group">
        <label>Gender:</label>
        <div class="radio-group">
          <input type="radio" id="male" value="male" v-model="formData.gender">
          <label for="male" class="icon-label">
            <img src="/src/assets/men.png" alt="Male" class="gender-icon">
          </label>
          <input type="radio" id="female" value="female" v-model="formData.gender">
          <label for="female" class="icon-label">
            <img src="/src/assets/female.png" alt="Female" class="gender-icon">
          </label>
        </div>
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="formData.phone" pattern="[0-9]{10}" required>
      </div>
      <div>
        <label for="marks">Marks:</label>
        <input type="number" id="marks" v-model="formData.marks" min="0" max="100" required>
      </div>
    
      <div>
        <label>Hobbies:</label>
        <div v-for="hobby in hobbies" :key="hobby.id">
          <input type="checkbox" :id="'hobby-' + hobby.id" :value="hobby.name" v-model="formData.hobbies">
          <label :for="'hobby-' + hobby.id">{{ hobby.name }}</label>
        </div>
      </div>
      <button type="submit">Submit</button>
      <button type="button" @click="resetForm">Reset</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formData: {
        name: '',
        roll: '',
        email: '',
        gender: '',
        phone: '',
        marks: '',
        hobbies: []
      },
      hobbies: [
        { id: 1, name: 'Reading' },
        { id: 2, name: 'Sports' },
        { id: 3, name: 'Music' },
        { id: 4, name: 'Gaming'}
      ]
    };
  },
  methods: {
    submitForm() {
  this.$emit('form-submitted', this.formData);
  this.formData = {
    name: '',
    roll: '',
    email: '',
    gender: '',
    phone: '',
    marks: '',
    hobbies: []
  };
},
resetForm() {
      this.formData = {
        name: '',
        roll: '',
        email: '',
        gender: '',
        phone: '',
        marks: '',
        hobbies: [],
      };

  }
},
}
</script>


<style>
.new {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0c0c0c;
  outline-offset: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  display: center;
  grid-gap: 20px;
}

.form-group {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px;
}

label {
  font-weight: bold;
}

.icon-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.gender-icon {
  width: 20px;
  height: 24px;
  margin-right: 8px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #5ca4db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #bfcbe6;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"] {
    width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


input[type="radio"],
input[type="checkbox"] {
  margin-right: 5px;
  background-color: #303cde;
}
</style>  
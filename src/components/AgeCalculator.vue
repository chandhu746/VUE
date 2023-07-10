<template>
    <div class="age-calculator">
      <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css"> -->
      <h2>Age Calculator</h2>
      <div class="present-date">Present Date: {{ presentDate }}</div>
  
      <div class="form-group">
        <label for="birthday">Select Birthday Date:</label>
        <input type="text" id="birthday" class="date-picker" v-model="birthdayDate" />
      </div>
  
      <button @click="calculateAge">Calculate Age</button>
  
      <div v-if="age !== null && showAge" class="result">
        <p>Your age is: {{ age }} years old.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Pikaday from 'pikaday';
  import 'pikaday/css/pikaday.css';
  import { onMounted, reactive } from 'vue';
  
  export default {
    data() {
      return {
        presentDate: new Date().toISOString().substring(0, 10),
        birthdayDate: '',
        age: 0,
        showAge: false,
      };
    },
    methods: {
      calculateAge() {
        if (this.birthdayDate) {
          const today = new Date();
          const birthday = new Date(this.birthdayDate);
          let age = today.getFullYear() - birthday.getFullYear();
  
          const monthDiff = today.getMonth() - birthday.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
            age--;
          }
  
          this.age = age;
          this.showAge = true;
        } else {
          this.age = 0;
          this.showAge = false;
        }
      },
    },
    mounted() {
      const picker = new Pikaday({
        field: document.getElementById('birthday'),
        format: 'YYYY-MM-DD',
        container: document.querySelector('.age-calculator'),
        onSelect: (date: Date) => {
          this.birthdayDate = date.toISOString().substring(0, 10);
        },
      });
      picker.show();
    },
  };
  </script>
  
  
  <style scoped>
  .age-calculator {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .present-date {
    text-align: center;
    margin-bottom: 20px;
    color: #555;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    color: #333;
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
    background-color: #00ff99;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
    text-align: center;
    color: #333;
  }
  
  .date-picker {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

  
  </style>
  
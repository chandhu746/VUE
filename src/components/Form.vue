<template>
    <form class="form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="stu_name" required>
        <span class="error" v-if="!isNameValid">Name must contain only alphabets.</span>
      </div>
      <div class="form-group">
        <label for="roll">Roll:</label>
        <input type="text" id="roll" v-model="roll_no" required>
        <span class="error" v-if="!isRollValid">Roll Num must contain only numbers.</span>
      </div>
      <div class="form-group">
        <label for="courseName">Course Name:</label>
        <input type="text" id="courseName" v-model="course_name" required>
        <span class="error" v-if="!isCourseNameValid">Course Name must contain only alphabets.</span>
      </div>
      <button type="submit" class="btn">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stu_name: '',
        roll_no: '',
        course_name: '',
        isNameValid: true,
        isRollValid: true,
        isCourseNameValid: true,
      };
    },
    methods: {
      submitForm() {
        if (!this.validateForm()) {
          return;
        }
        
        const formData = {
         stuName: this.stu_name,
          rollNo: this.roll_no,
          courseName: this.course_name,
        };
        this.$emit('form-submitted', formData);
        this.resetForm();
      },
      validateForm() {
        this.isNameValid = /^[A-Za-z]+$/.test(this.stu_name);
        this.isRollValid = /^[0-9]+$/.test(this.roll_no);
        this.isCourseNameValid = /^[A-Za-z]+$/.test(this.course_name);
        
        return this.isNameValid && this.isRollValid && this.isCourseNameValid;
      },
      resetForm() {
        this.stu_name = '';
        this.roll_no = '';
        this.course_name = '';
        this.isNameValid = true;
        this.isRollValid = true;
        this.isCourseNameValid = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .form {
    max-width: 300px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .error {
    color: red;
  }
  
  .btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  
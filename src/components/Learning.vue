<template>
    <div>
      <h2>{{ formTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="stu_name" required>
        </div>
        <div class="form-group">
          <label for="roll">Roll Number:</label>
          <input type="number" id="roll"  v-model="roll_no">
        </div>
       
        <div class="form-group">
          <label for="courseName">Course Name:</label>
          <input type="text" id="courseName" v-model="course_name" required>
        </div>
        <div>
          <label for="marks">Marks:</label>
          <input type="number" id="marks" v-model="marks" readonly>
        </div>
        <button v-if="formMode === 'add'" type="submit">Add</button>
        <button v-if="formMode === 'edit'" type="submit">update</button>
      </form>
    
      
    </div>
  </template>
  
  <script>
  // import {ref , onMounted} from 'vue';

  import { eventBus } from '../eventBus';

  export default {
  
    
    props: {
      editedStudent: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        formMode: 'add',
        formTitle: 'Add Student',
        stu_name: '', 
        roll_no: '', 
        course_name: '' ,
        marks:0,
        // edit:false
      };
    },
    mounted(){
      eventBus.subscribe('total-marks',totalMarks =>{
        this.marks=totalMarks;   
      })
    },
    watch: {
      editedStudent: {
        immediate: true,
        handler(student) {
          if (student) {
            this.formMode = 'edit';
            this.formTitle = 'Edit Student';
            this.stu_name = student.stu_name; 
            this.roll_no = student.roll_no; 
            this.course_name = student.course_name;
            // this.edit=true;
          } else {
            this.formMode = 'add';
            this.formTitle = 'Add Student';
            this.stu_name = ''; 
            this.roll_no = ''; 
            this.course_name = ''; 
            // this.add=false;
          }
        }
      }
    },
    methods: {
      
      handleSubmit() {      
        if (this.stu_name && this.roll_no && this.course_name) {
          const student = {
            stuName: this.stu_name, 
            rollNo: this.roll_no,
            courseName: this.course_name 
          };
  
          if (this.formMode === 'add') {
            this.$emit('add-student', student);
          } else if (this.formMode === 'edit') {
            if (this.stu_name !== this.editedStudent.stuName) {
              student.stuName = this.stu_name;
            }
            if (this.course_name !== this.editedStudent.courseName) {
              student.courseName = this.course_name;
            }
            this.$emit('update-student', student);
          }
  
          this.stu_name = '';
          this.roll_no = '';
          this.course_name = '';
        }
      }
    }
  };
  </script>
  
  
  
    
    <style scoped>
    .form-group {
      margin-bottom: 10px;
    }
    label {
      display: block;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .marks{
      background-color: #ccc;
    }
    </style>
    
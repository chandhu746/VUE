<template>
    <div>
      <Learning :edited-student="editedStudent" @add-student="addStudent" @update-student="updateStudent" />
      <!-- <StudentMark /> -->

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Course Name</th>
            <th>Actions</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index">
            <td>{{ student.stu_name }}</td>
            <td>{{ student.roll_no }}</td>
            <td>{{ student.course_name }}</td>

            <td>
              <button @click="editStudent(student)">Edit</button>
              <button @click="deleteStudent(student.roll_no)">Delete</button>
            </td>
            <td>{{ student.marks }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </template>
  
  <script >
import Learning from '../components/Learning.vue';
import axios from 'axios';
// import StudentMark from '../components/StudentMarks.vue';


export default {
  components: {
    Learning
  },
  data() {
    return {
      students: [],
      editedStudent: null
    };
  },
  mounted() {
    this.fetchStu();
  },
  methods: {
    fetchStu() {
      axios
        .get("http://127.0.0.1:3333/infoStu")
        .then((response) => {
          this.students = response.data;
          console.log(this.students);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    },
    addStudent(student) {
      axios
        .post("http://127.0.0.1:3333/writeData", student)
        .then((response) => {
          console.log(response);
          this.students.push(response.data);
        })
        .catch((error) => {
          console.error("Error while pushing", error);
        });
    },
    editStudent(student) {
      this.editedStudent = { ...student };
    },
    updateStudent(updatedStudent) {
      axios
        .put(`http://127.0.0.1:3333/up/${updatedStudent.rollNo}`, updatedStudent)
        .then((response) => {
          console.log(response);
          const index = this.students.findIndex((s) => s.roll_no === updatedStudent.rollNo); //finds the index of the student in the students array based on roll
          if (index !== -1) {                                                      
            Object.assign(this.students[index], updatedStudent);
            this.editedStudent = null;
          }
          this.fetchStu();
        })
        .catch((error) => {
          console.error("Error while updating", error);
        });
    },
    
    deleteStudent(roll_no) {
  axios
    .delete(`http://127.0.0.1:3333/delete/${roll_no}`)
    .then((response) => {
      console.log('Data deleted successfully:', response.data);
      
      window.alert("Data deleted succesfully");
      this.fetchStu();
    })
    .catch((error) => {
      console.error('Error while deleting', error);
    });
    },
  }
};
</script>

  
  
<style scoped>
.parent-component {
  margin: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #140404;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #1e1b1b;
}

.table th {
  background-color: #545ca4;
  font-weight: bold;
}

.button-container {
  margin-top: 10px;
}

.button-container button {
  margin-right: 10px;
  background-color: #4caf50;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #45a049;
}
</style>

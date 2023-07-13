<template>
    <div>
      <h1>Student Marks</h1>
      <form @submit.prevent="calculateTotalMarks">
        <label for="telugu">Telugu:</label>
        <input id="telugu" type="number" min=0 max= 100 v-model="marks.telugu" required><br>
  
        <label for="english">English:</label>
        <input id="english" type="number" min=0  max=100 v-model="marks.english" required><br>
  
        <label for="algorithm">Algorithm:</label>
        <input id="algorithm" type="number" min=0 max=100 v-model="marks.algorithm" required><br>
  
        <label for="dataMining">Data Mining:</label>
        <input id="dataMining" type="number" min=0 max= 100 v-model="marks.dataMining" required><br>
  
        <label for="crypto">Crypto:</label>
        <input id="crypto" type="number" min=0 max= 100 v-model="marks.crypto" required><br>
  
        <button type="submit">Calculate Total Marks</button>
      </form>
    </div>
  </template>
  
  <script >
  import { ref } from 'vue';
  import { eventBus } from '../eventBus';
  
  export default {
    name:'StudentMarks',
    data() {
      return {
        marks: {
          telugu: 0,
          english: 0,
          algorithm: 0,
          dataMining: 0,
          crypto: 0
        }
      };
    },
    methods: {
      calculateTotalMarks() {
        const totalMarks = Object.values(this.marks).reduce((sum, mark) => sum + Number(mark), 0);
        eventBus.publish('total-marks', totalMarks);
      }
    }
  };
  </script>

<style scoped>
.student-marks {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.student-marks h1 {
  text-align: center;
}

.student-marks form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.student-marks label {
  font-weight: bold;
}

.student-marks input[type="number"] {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.student-marks button[type="submit"] {
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.student-marks button[type="submit"]:hover {
  background-color: #45a049;
}

</style>
  
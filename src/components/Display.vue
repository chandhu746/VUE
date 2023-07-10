<template>
  <div class="data-display">
    <h2>Form Data is Played Here</h2>
    <table v-if="formDataArray.length > 0" class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Marks</th>
          <th>Hobbies</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(formData, index) in formDataArray" :key="index">
          <td>
            <template v-if="index === editIndex">
              <input type="text" v-model="formData.name" />
            </template>
            <template v-else>
              {{ formData.name }}
            </template>
          </td>
          <td>
            <template v-if="index === editIndex">
              <input type="text" v-model="formData.roll" />
            </template>
            <template v-else>
              {{ formData.roll }}
            </template>
          </td>
          <td>
            <template v-if="index === editIndex">
              <input type="email" v-model="formData.email" />
            </template>
            <template v-else>
              {{ formData.email }}
            </template>
          </td>
          <td>
            <template v-if="index === editIndex">
              <input type="text" v-model="formData.gender" />
            </template>
            <template v-else>
              {{ formData.gender }}
            </template>
          </td>
          <td>
            <template v-if="index === editIndex">
              <input type="tel" v-model="formData.phone" />
            </template>
            <template v-else>
              {{ formData.phone }}
            </template>
          </td>
          <td class="markmawa">
            <template v-if="index === editIndex">
              <input type="number" v-model="formData.marks" min="0" max="100" />
            </template>
            <template v-else>
              {{ formData.marks }}
            </template>
            <td :class="getGradeClass(formData.marks)">{{ getGradeText(formData.marks) }}</td>          </td>
          <td>{{ formData.hobbies.join(', ') }}</td>
          <td>
            <template v-if="index === editIndex">
              <button @click="updateFormData">Update</button>
            </template>
            <template v-else>
              <button @click="editFormData(index)">Edit</button>
            </template>
            <button @click="deleteFormData(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No Value is inserted.</p>
  </div>
</template>


<script  lang="ts">
import { defineComponent } from 'vue';
import {filterMarks} from '../../src/filterMarks';

interface FormDataInterface {
  name: string;
  roll: string;
  email: string;
  gender: string;
  phone: string;
  marks: string;
  hobbies: string[];
}

export default defineComponent({
  props: {
    formDataArray: {
      type: Array as () => FormDataInterface[],
      default: () => [],
    },
  },
  data() {
    return {
      editIndex: -1,
      formData: {} as FormDataInterface,
    };
  },
  computed: {
    filterMarks(): (marks: number) => string {
      return filterMarks;
    },
  },
  
  methods: {
    editFormData(index: number) {
      const formData = this.formDataArray[index];
      this.editIndex = index;
      this.formData = {
        name: formData.name,
        roll: formData.roll,
        email: formData.email,
        gender: formData.gender,
        phone: formData.phone,
        marks: formData.marks,
        hobbies: [...formData.hobbies],
      };
    },
    getGradeClass(marks: string): string {
      const grade = filterMarks(parseFloat(marks));
      return `grade-${grade.toLowerCase()}`;
    },
    getGradeText(marks: string): string {
      const grade = this.filterMarks(parseFloat(marks));
      return `Your grade: ${grade}`;
    },
    updateFormData() {
      const index = this.editIndex;
      if (index !== -1) {
        this.formDataArray.splice(index, 1, { ...this.formData });
        this.editIndex = -1; // reset to -1 no edit in progress
        this.formData = {} as FormDataInterface; // obj is empty
      }
    },
    deleteFormData(index: number) {
      this.formDataArray.splice(index, 1);
    },
  },
});
</script>

<style scoped>
.data-display {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #080101;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-display p {
  margin: 5px 0;
}

.data-display strong {
  font-weight: bold;
}

button {
  padding: 8px 12px;
  background-color: #5ca4db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #4a8ac7;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
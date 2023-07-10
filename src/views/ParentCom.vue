<template>
  <div class="parent-component">
    <div class="form-section">
      <StudentTable @form-submitted="handleFormSubmitted" />
    </div>
    <div class="data-display-section">
      <DataDisplay :formDataArray="submittedFormData" />
    </div>
  </div>
</template>

<script  lang="ts">
// import filterMarks from '../src/filterMarks.js'
import { defineComponent } from 'vue';
import StudentTable from '../components/StudentTable.vue';
import DataDisplay from '../components/Display.vue';

interface FormDataInterface {
  name: string;
  roll: string;
  email: string;
  gender: string;
  phone: string;
  marks: number;
  hobbies: string[];
}

export default defineComponent({
  components: {
    StudentTable,
    DataDisplay,
  },
  data() {
    return {
      submittedFormData: [] as FormDataInterface[]
    };
  },
  methods: {
    handleFormSubmitted(formData: FormDataInterface) {
      this.submittedFormData.push(formData);
    },
  },
});
</script>

  
  <style>
  .parent-component {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
  
  .parent-component h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .parent-component .form-container {
    max-width: 500px;
    margin-bottom: 20px;
  }
  
  .parent-component .data-display {
    max-width: 500px;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .parent-component .data-display h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .parent-component .data-display p {
    margin-bottom: 5px;
  }
  
  .parent-component button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .parent-component button:hover {
    background-color: #45a049;
  }

  .data-display-section {
  border: 1px solid #ccc;
  padding: 20px;
  flex-grow: 1;
}

.form-section {
  margin-right: 20px;
}
</style>
  
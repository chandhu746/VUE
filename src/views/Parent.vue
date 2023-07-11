<template>
    <div class="new" >
      <Form @form-submitted="handleFormSubmitted" />
  
      <table class="table-class">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(formData, index) in formDatas" :key="index">
            <td>{{ formData.stu_name }}</td>
            <td>{{ formData.roll_no }}</td>
            <td>{{ formData.course_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import Form from "@/components/Form.vue";
  import axios from 'axios'
  export default {
    components: {
      Form,

    },
    data() {
      return {
        formDatas:[],
      };
    },
    mounted(){
        this.fetchStu();
    },
    methods: {
    
        
    
      fetchStu(){
        axios
        .get("http://127.0.0.1:3333/infoStu")
                .then((response) =>{
            this.formDatas = response.data;
            console.log(this.formDatas)
        }).catch((error)=>{
            console.error("Error",error);
        });
      },
      handleFormSubmitted(formData){
        axios
        .post("http://127.0.0.1:3333/writeData",formData)
               .then( (response) =>{
                console.log(response);
            this.formDatas.push(response.data);
        })
      }
     
    },
  };
  </script>
  
  <style scoped> 
  .new{
    border-radius: 2%;
    width: auto;
    color: white;

  }
  table, th, td {
  border: 1px solid;
}
table{
    width: 100%;
    border-collapse: collapse;
}
  
</style>
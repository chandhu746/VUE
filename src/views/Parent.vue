<template>
    <div class="new" >
      <Form @form-submitted="handleFormSubmitted" :formData="form" ></Form>
    </div>
    <div>
      <table class="table-class">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Course Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(formData, index) in formDatas" :key="index">
           <td>{{ formData.stu_name }}</td>
           <td> {{  formData.roll_no }}</td>
           <td> {{  formData.course_name }}</td>
          <td><button type="button" @click="editFormData(index)">Edit</button></td>
         <td><button type="button" @click="deleteFormData(formData.roll_no)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script >
  import Form from "../components/Form.vue";
  import axios from 'axios';
  export default {
    components: {
      Form,

    },
    data() {
    return {
      formDatas: [],
     form:null,
     selectedFormIndex: -1

      };
    },
  
    mounted(){
        this.fetchStu();
    },
    updated(){
      this.fetchStu();
    },
    methods:{
    
        
    
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
        // this.form = formData;

        axios
        .post("http://127.0.0.1:3333/writeData",formData)
               .then( (response) =>{
                console.log(response);
            this.formDatas.push(response.data);
          
        })
        .catch((error) =>{
          console.error("Error while pushing",error);
        });
      },
      
      editFormData(index){

      //  this.form= this.formDatas[index];
      //  console.log("edit",this.form);
      this.form = index;
      this.selectedFormIndex = { ...this.formDatas[index] };
      
      },
      deleteFormData(roll_no) {
  axios
    .delete(`http://127.0.0.1:3333/delete/${roll_no}`)
    .then((response) => {
      console.log('Data deleted successfully:', response.data);
      this.fetchStu();
      window.alert("Data deleted succesfully");
    })
    .catch((error) => {
      console.error('Error', error);
    });
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
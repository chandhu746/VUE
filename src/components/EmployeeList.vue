<template>
    <div id="app">
      <h1>Learning API</h1>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import Vue from 'vue';
  
  Vue.use(VueAxios, axios);
  
  export default {
    name: 'EmployeeList',
    mounted() {
      Vue.axios
        .get('https://dummy.restapiexample.com/api/v1/employees')
        .then((response) => {
          console.warn(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  
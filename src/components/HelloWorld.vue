<script setup>
import {ref} from 'vue'
import axios from "axios"
defineProps({
  msg: String,
})

const apiUrl = import.meta.env.VITE_APP_SERVICE_URL;
console.log(apiUrl);

axios.get(apiUrl + '/admin-api/test')
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error('There was an error!', error)
    });
const count = ref(0)
</script>

<template>
  <h1>你好，千与！</h1>
  {{apiUrl}}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

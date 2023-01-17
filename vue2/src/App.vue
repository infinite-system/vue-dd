<template>
  <div id="app">
    <VueDdTest msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import VueDdTest from './components/VueDdTest.vue'

export default {
  name: 'App',
  components: {
    VueDdTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>

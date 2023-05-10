<script setup lang="ts">
import VueDdTest from '../components/VueDdTest.vue'
</script>

<template>
  <main>
    <router-link :to="{name:'vue-dd'}">Test 1</router-link> <br />
    <router-link :to="{name:'vue-dd-test-2'}">Test 2</router-link> <br />
    <router-view />
  </main>
</template>

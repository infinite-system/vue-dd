<script setup lang="ts">
import { reactive } from 'vue'
 const w = window
 const test = reactive({ 'test': 'test' })
</script>
<template>
Test
  <vue-dd name="window" v-model="w" />
  <br />
  <vue-dd name="test" v-model="test" />
</template>


<style>
.rendererParent {
  width: 100%;
  height: 580px;
  border: 1px solid black;
}
</style>

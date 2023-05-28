<script setup lang="ts">
import { reactive, ref } from 'vue'
 const w = window
 const test = reactive({ 'test': 'test' })
 const test2 = { 'test': ref({test: 'test'}), 'array':['test','test2'] }
</script>
<template>
Test
  <vue-dd name="window" v-model="w" />
  <br />
  <vue-dd name="test" v-model="test" />
  <br />
  <vue-dd name="test2" v-model="test2" />
</template>


<style>
.rendererParent {
  width: 100%;
  height: 580px;
  border: 1px solid black;
}
</style>

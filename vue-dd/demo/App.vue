<script setup lang="ts">
import { reactive, ref } from 'vue'
import { action, computed, inject, makeObservable, observable } from "*";
 const w = window
 const test = reactive({ 'test': 'test' })
 const test2 = { 'test': ref({test: 'test'}), 'array':['test','test2'] }

abstract class MessagesPresenter {


  showValidationWarning = null


  constructor() {
  }

  init = () => {
  }

  abstract reset(): void

  get messages() {
  }

  unpackRepositoryPmToVm = (pm, userMessage) => {
  }
}

class LoginRegisterPresenter extends MessagesPresenter {


  email = null
  password = null
  option = null

  getVm () {

  }

  constructor () {
    super()
  }

  //
  get viewTest () {
    return ''
  }

  set viewTest (value) {

  }

  setAuthRepoTest () {

  }

  reset () {

  }

  async login () {

  }

  register = async () => {

  }

  logOut = async () => {

  }
}

const presenter = new LoginRegisterPresenter()
</script>
<template>
<h1>Basic Tests</h1>
  <vue-dd name="window" :get-all-properties="true" v-model="w" />
  <br />
  <vue-dd name="test" :get-all-properties="true" v-model="test" />
  <br />
  <vue-dd name="test2" :get-all-properties="true" v-model="test2" />
  <br />
  <vue-dd name="presenter" :get-all-properties="true" v-model="presenter" />
</template>


<style>
.rendererParent {
  width: 100%;
  height: 580px;
  border: 1px solid black;
}
</style>

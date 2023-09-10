<script setup lang="ts">
import { reactive, ref } from 'vue'
import { action, computed, inject, makeObservable, observable } from "*";

const w = window
const test = reactive({ 'test': 'test' })
const test2 = { 'test': ref({ test: 'test' }), 'array': ['test', 'test2'] }

abstract class GrandParent {
  grandParent = 'test'

  get grandParentGetter () {
    return 'fun'
  }
}

abstract class MessagesPresenter extends GrandParent {

  showValidationWarning = null

  static _name = 'hi'

  constructor () {
    super()

  }

  init = () => {}

  abstract reset (): void

  get messages () {
    return 'yes'
  }

  unpackRepositoryPmToVm = (pm, userMessage) => {}
}
class Auth {
  test = 1
}
class LoginRegisterPresenter extends MessagesPresenter {

  static test = 2
  static test2 = 2

  auth = new Auth()

  static testF () {
    return 1
  }

  email = null
  password = null
  option = null

  constructor () {
    super()
    this.auth = new Auth()
  }

  //
  get viewTest () {
    this.auth.test = 2
    console.log('yo')
    return 'yes'
  }

  set viewTest (value) {

  }

  setAuthRepoTest () {

  }

  reset () {

  }

  async login () {

  }

  register () {

  }

  logOut () {

  }
}

const presenter = new LoginRegisterPresenter()

const proto = Object.getPrototypeOf(presenter)

let val = ref({  })
setTimeout(() => {
  val.value = reactive({
    test: 1
  })
}, 1000)

</script>
<template>
  <h1>vue-dd integration tests</h1>
  <vue-dd name="val" v-model="val" />
  <br />
  <vue-dd name="window" :save-focus="false" :get-all-properties="false" v-model="w" />
  <br />
  <vue-dd name="test" get-all-properties v-model="test" />
  <br />
  <vue-dd name="test2" get-all-properties v-model="test2" />
  <br />
  <vue-dd name="presenter" :get-all-properties="true" v-model="presenter" />
  <vue-dd name="LoginRegisterPresenter" :get-all-properties="true" v-model="LoginRegisterPresenter" />



</template>


<style>
.rendererParent {
  width: 100%;
  height: 580px;
  border: 1px solid black;
}
</style>

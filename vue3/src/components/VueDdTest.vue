<script setup lang="ts">
import { ref, getCurrentInstance, reactive, defineAsyncComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseCheckbox from './BaseCheckbox.vue'

const route = useRoute()

const npm = ref('npm' in route.query && route.query.npm == 1)

function getVueDd(){
  if (npm.value){
    return defineAsyncComponent(async (resolve) => (await import(`../../node_modules/vue-dd/dist/index.es.js`)).VueDd)
  } else {
    return defineAsyncComponent(() => import(`../../../vue-dd/src/VueDd.vue`))
  }
}

let VueDd = getVueDd()

watch(npm, () => VueDd = getVueDd())

// VueDd = npm ? VueDd.VueDd : VueDd.default
// console.log(VueDd.VueDd)
const bool = true
const text = { ref: ref('text') }
const refObject = { ref: ref({hello:'hello',bye:'bye'}) }
const refBoolean = { ref: ref({hello:'hello',bye:'bye'}) }
let j = 0;
setInterval(() => {
  refObject.ref.value.hello = 'hello'+j++
  // console.log(refObj.ref.value.hello)
}, 100)
setInterval(() => {
  refBoolean.ref.value = !refBoolean.ref.value
  // console.log(refObj.ref.value.hello)
}, 500)

const w = window
const instance = getCurrentInstance()
const dark = ref(true)
const symbols = [Symbol('id'), Symbol('name')]
const arr = ['a','b','c','d','e','f']
const arr2 = ['a','b','c','d','e','f']
const arr3 = ['a','b','c','d','e','f']
const reactive_arr = reactive([0,100,200,300,500,1000,2000])
const openLevel = reactive([0, { test: 'open' },200,300,500,1000,2000])


const multilevel = reactive({
  test: {
    test: [1],
    prop: {
      hey: reactive_arr
    }
  }
})
watch(() => multilevel.test.prop, () => {

  }, {deep: true})

watch(() => multilevel.test, () => {

}, {deep: true})

setInterval(() => reactive_arr[0]--, 200 )
setInterval(() => reactive_arr[1]++, 300 )
setInterval(() => reactive_arr[2]++, 500 )
setInterval(() => reactive_arr[3]--, 10 )
setInterval(() => reactive_arr[4]--, 50 )
const fromTest = [{ obj: { subobj: 'hello', obj:{ unreachable: true} } }, { obj: 2 }]
const map = reactive(new Map([
    // ['a', 1]
    // ['test', openLevel],
    // ['test2', reactive_arr]
]))
let i = 0;
setInterval(() => {
  if (i < 30){
    map.set('key_'+i, 'value_'+i)
    i++
  }
}, 1500)
const obj = reactive({})
let m = 0;
setInterval(() => {
  if (m < 30) {
    obj['key_' + m] = 'value_' + m
    m++
  }
},1500)

let k = 0;
const set = reactive(new Set())
  setInterval(() => {
    if (k < 30){
      set.add(['Harry '+k, ['Berry']])
      k++
    }
  }, 1500)

const darkObj = reactive({ dark: dark})
setInterval(() => {
  if (k < 30){
    darkObj[k] = 1
    k++
  }
}, 1500)


</script>

<template>
  <h2>Test 1</h2>
  NPM: <base-checkbox v-model="npm" /><br />

  <br />
  dark: <base-checkbox v-model="dark" /><br />
  <vue-dd name="setupState" :dark="dark" v-model="instance.setupState" :deep="false" max-height="300px" />
  <vue-dd name="test" delimiter="$" :dark="dark" v-model="bool" />
  <vue-dd name="ref" :dark="dark" v-model="text" />
  <vue-dd name="dark" :dark="dark" v-model="darkObj" />
  <vue-dd name="refObject" :dark="dark" v-model="refObject" />
  <vue-dd name="refBoolean" :dark="dark" v-model="refBoolean" />
  <vue-dd name="window" :dark="dark" v-model="w" :open-specific="['history.state']" />
  <vue-dd name="window" :dark="dark" :preview-initial="false" v-model="w" padding-left="25px" />
  <vue-dd name="symbols[preview-initial='false']" :dark="dark" v-model="symbols" :preview-initial="false" />
  <vue-dd name="symbols" :dark="dark" v-model="symbols" />
  <vue-dd name="arr" :dark="dark" v-model="arr" />
  <vue-dd name="arr2" :dark="dark" v-model="arr2" />
  <vue-dd name="arr3" :dark="dark" v-model="arr3" />
  <vue-dd name="reactive_arr" :dark="dark" v-model="reactive_arr" />
  <vue-dd name="openLevel[open-level='2']" :dark="dark" v-model="openLevel" open-level="2" />
  <vue-dd name="map" :dark="dark" v-model="map" />
  <vue-dd name="obj" :dark="dark" v-model="obj" />
  <vue-dd name="set" :dark="dark" v-model="set" />
  <vue-dd open-level="3" :preview="0" v-model="fromTest" />
  <br />
  <br />
  <vue-dd v-model="multilevel" />
</template>

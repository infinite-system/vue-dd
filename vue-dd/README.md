## vue-dd &mdash; object viewer &nbsp; &nbsp; [![npm](https://img.shields.io/npm/v/vue-dd.svg)](https://www.npmjs.com/package/vue-dd) [![build status](https://github.com/infinite-system/vue-dd/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/infinite-system/vue-dd/actions/workflows/ci.yml)

> **vue-dd** is a Vue 3 & 2 object viewer for displaying complex JavaScript objects, Vue reactive and ref objects, functions, maps, sets, symbols and primitives in order to monitor their changes **live** with full reactivity. Inspired by the Laravel's **dd()** function.

https://user-images.githubusercontent.com/150185/213549880-e6b645bd-11f0-461a-b1a9-29c70c52f2ad.mov

https://user-images.githubusercontent.com/150185/213549905-360698e2-0c6b-4fd1-8023-803e22b68e27.mov

Video example code in Vue 3 `<script setup>` style:
```js
import VueDd from 'vue-dd'
import { getCurrentInstance } from 'vue'

// get Vue instance
const instance = getCurrentInstance()
```
In `<template>` add:
```html
<vue-dd name="setupState" v-model="instance.setupState" :deep="false" max-height="300px" />
```
> In the example above `:deep="false"` means, disable deep watching. Deep watching is `true` by default, but watching Vue instance or `instance.setupState` deeply can create a flood of Vue.js warnings because we start watching Vue itself. To prevent flooding, set `:deep="false"`, otherwise for simpler objects it can be simply omitted.
## About
The component renders object as a tree that can be expanded to display nested values, very similar to inspecting JavaScript objects using the Developer Tools, but with full reactivity & advanced UI and UX designed specifically for ease of use and joy for the developer.

## Install
> At the moment vue-dd has no build step, so it supports only SFC based versions of Vue.
```bash
# npm
npm install vue-dd
# yarn
yarn add vue-dd
```


Add globally in `main.js`:
```js
import { VueDd } from 'vue-dd'
// create app
const app = createApp(App)
// register component
app.component('VueDd', VueDd)
```
or add locally in component:
```js
import { VueDd } from 'vue-dd'
```
## Usage

Use it just like any other Vue.js component.

The value to display is passed as `v-model` or `:model-value`:

### Usage in **Vue 3**
```html
<vue-dd v-model="object" />
```
### Usage in **Vue 2**
Use `:model-value` instead of `v-model`
```html
<vue-dd :model-value="object" />
```
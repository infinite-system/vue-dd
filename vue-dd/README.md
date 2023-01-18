## Vue-dd

> Vue-dd is a component for live display of VueJS refs, reactive objects, primitives and JavaScript objects supporting circular references

## About
Vue-dd is a zero dependency, Vue 3 & >2.7.5 object viewer for displaying complex JavaScript objects, Vue reactive and ref objects, functions, maps, sets, symbols and primitives and monitor their changes **live**.

The component renders object as a tree that can be expanded to display nested values, very similar to inspecting JavaScript objects using the Developer Tools, but with full reactivity & advanced UI and UX designed specifically for ease of use and joy for the developer.

## Install
```bash
# npm
npm install vue-dd
# yarn
yarn add vue-dd
```

Use it just like any other Vue.js component. The value to display is passed as `v-model` or `:model-value`:

### Usage in **Vue 3**
```html
<vue-dd v-model="object" />
```
### Usage in **Vue 2**
Use `:model-value` instead of `v-model`
```html
<vue-dd :model-value="object" />
```


Read the full README doc: **https://github.com/infinite-system/vue-dd**
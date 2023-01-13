## vue-dd

> Vue component for live display of Vue Refs, Reactive objects, primitives and JavaScript objects (with circular references)

## About
Easily display complex JavaScript objects, Vue Reactive and Ref objects, functions, and primitives and monitor their changes in LIVE mode. 

The component renders the value as a *tree* that can be manually expanded to display nested values.

The experience is very similar to inspecting JavaScript objects using the Developer Tools. 

Initially this component was created to build the in-browser **JavaScript debugger** for the [PARAPPLE](http://emanuelbuzek.eu/parapple/#/) project.

This is a fork of *vue-object-view* project by Emanuel Buzek. Thank's to his initial work back in 2017, I've used it to created a hugely improved and expanded version with functionality to create a world class reactive object viewer for Vue 3 and backwards compatibility for Vue 2.


## Usage
```bash
# Install the component
npm install vue-dd --save-dev
# or
yarn add -D vue-dd
```

Use it just like any other Vue.js component. The value to display is passed as `v-model` or `:model-value`:

```html
<vue-dd v-model="object" />
<vue-dd v-model="anotherObject" />
```

## More Documentation

Coming soon...

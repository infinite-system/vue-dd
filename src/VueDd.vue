<template>
  <div
    ref="root"
    :id="rootId"
    :class="['vue-dd', {
      'vue-dd-inline': inline,
      'vue-dd-open': openClass,
      'vue-dd-dark': dark,
    }, css]"
    :style="style">
    <node-primitive
      v-if="primitive"

      :root="$refs.root"
      :rootId="rootId"

      :modelValue="modelValue"
      :name="name"
      :focus="useFocus"
      :escapeQuotes="escapeQuotes"
      :save="save"
      :saveFocus="saveFocus"

      pointer=""
      :type="type"

      :escapeQuotesFn="escapeQuotesFn"
      :emitFn="emitFn"

      @focus="focusEmit"
    />
    <node-complex
      v-else

      :root="$refs.root"
      :rootId="rootId"

      :modelValue="modelValue"
      :name="name"
      :openLevel="openLevel"
      :openSpecific="useOpenSpecific"
      :focus="useFocus"
      :escapeQuotes="escapeQuotes"
      :longText="longText"
      :preview="preview"
      :previewInitial="previewInitial"
      :deep="isSet ? false : deep"
      :watch="watch"
      :save="save"
      :saveFocus="saveFocus"

      pointer=""
      :type="type"
      :shared="shared"

      :getTypeFn="getTypeFn"
      :isPrimitiveFn="isPrimitiveFn"
      :escapeQuotesFn="escapeQuotesFn"
      :unwrapSpecificFn="unwrapSpecificFn"
      :emitFn="emitFn"

      @toggle="toggle"
      @open="open"
      @focus="focusEmit"
      @forget="forget"
    />
  </div>
</template>
<script>
import NodeComplex, { isObject } from "./NodeComplex.vue";
import NodePrimitive from "./NodePrimitive.vue";

// this is important
let uniqueId = 1
let unwrapCache = {}

export default {
  name: 'VueDd',
  inheritAttrs: false,
  emits: ['open', 'toggle', 'focus', 'forget'],
  props: {
    // main options
    modelValue: undefined,
    id: { type: [String, Number], default: '' },
    name: { type: String, default: '' },
    openLevel: { type: [Number, Array], default: 0 },
    openSpecific: { type: Array, default: () => [] },
    focus: { type: String, default: null },
    preview: { type: [Number, Boolean], default: 5 },
    previewInitial: { type: Boolean, default: true },
    escapeQuotes: { type: Boolean, default: false },
    longText: { type: Number, default: 50 },
    // styling options
    style: { type: [String, Array, Object], default: '' },
    class: { type: [String, Array, Object], default: '' },
    inline: { type: Boolean, default: true },
    dark: { type: Boolean, default: true },
    fontFamily: { type: String, default: '"JetBrains Mono", "Courier", serif' },
    fontSize: { type: String, default: '.7rem' },
    lineHeight: { type: String, default: '1rem' },
    paddingLeft: { type: String, default: '.7rem' },
    maxHeight: { type: String, default: '500px' },
    maxWidth: { type: String, default: '100%' },
    // save
    save: { type: Boolean, default: false },
    saveFocus: { type: Boolean, default: true },
    storage: { type: String, default: 'local' }, // session | local
    // watch options
    watch: { type: Boolean, default: true },
    deep: { type: Boolean, default: true },
  },
  data () {
    return {
      rootId: this.makeId(),
      openClass: false,
      css: this.class,
      useOpenSpecific: this.openSpecific,
      memory: null,
      shared: { hiddenPointers: {} },
      useFocus: null
    }
  },

  created () {

    if (this.save || this.saveFocus) {
      // this is very important for save functionality
      this.initMemory();
    }

    this.useFocus = this.getFocus()
    this.useOpenSpecific = this.getOpenSpecific()
  },
  mounted () {
    this.setFocus()
  },
  computed: {
    unwrapSpecific () {
      return this.unwrapSpecificFn(this.useOpenSpecific)
    },
    type () {
      return this.getTypeFn(this.modelValue)
    },
    primitive () {
      return this.isPrimitiveFn(this.type)
    },
    isSet () {
      return this.type === 'object' && this.modelValue instanceof Set
    },
  },
  methods: {
    forget () {
      if (this.save) {
        // alert('yes')
        this.memory.open = {}
        this.shared.hiddenPointers = {}
        this.useOpenSpecific = this.baseOpenSpecific()
        this.store().set(this.memory)
      }
    },
    setFocus () {
      if (this.useFocus !== '') {
        setTimeout(() => {

          const pointerEl = this.getElement(this.useFocus)

          if (pointerEl) {
            // console.log('pointerEl.offsetLeft', pointerEl.offsetLeft, pointerEl.offsetLeft - pointerEl.clientWidth)
            // console.log('pointerEl.offsetTop', pointerEl.offsetTop, pointerEl.offsetTop - pointerEl.clientHeight)
            this.$refs.root.scrollLeft = pointerEl.offsetLeft - 15

            // setting scrollLeft and scrollTop at the same time
            // does not work in browsers right now
            setTimeout(() => {
              this.$refs.root.scrollTop = pointerEl.offsetTop - 15
            }, 300)

            pointerEl.classList.add('vue-dd-highlight')
          }
        }, 0)
      }
    },
    getElement (pointer) {
      pointer = pointer === '' ? '' : `.${pointer}`
      return document.getElementById(`_${this.rootId}${pointer}`)
    },
    getFocus () {
      let focus = this.focus
      if (this.saveFocus && 'focus' in this.memory && this.memory.focus !== null) {
        focus = this.memory.focus
      }
      return focus
    },
    initMemory () {

      // init memory
      this.memory = this.store().get()

      if (!isObject(this.memory)) {
        this.memory = {}
      }

      // if 'open' is not set create it
      if (!('open' in this.memory) || !isObject(this.memory.open)) {
        this.memory.open = {}
      }

      // if 'open' is not set create it
      if (!('focus' in this.memory)) {
        this.memory.focus = null
      }
    },

    getOpenSpecific () {
      if (this.save) {
        // merge memory and specific params
        // console.log('this.unwrapSpecific', this.unwrapSpecific)
        this.memory.open = { ...this.memory.open, ...this.unwrapSpecific }
        this.store().set(this.memory)

        let openSpecific = []
        for (let pointer in this.memory.open) {
          openSpecific.push(pointer)
        }
        //console.log('memopen', this.memory, openSpecific, this.unwrapSpecific)

        return openSpecific

      } else {
        return this.baseOpenSpecific()
      }
    },

    baseOpenSpecific () {
      return [...this.openSpecific, ...(this.useFocus === null ? [] : [this.useFocus])]
    },

    makeId () {
      if (this.id !== '') {
        return this.id
      } else {
        return `dd_${uniqueId++}`
      }
    },

    focusEmit (setup) {
      let { pointer, focusElement } = setup
      if (this.saveFocus) {

        const oldFocus = this.useFocus

        // save focus


        if (pointer === oldFocus && pointer !== this.focus) {
          // unset focus if it's already set to same value
          pointer = null
          // focusElement.classList.remove('vue-dd-focus')
          focusElement.classList.remove('vue-dd-focus-selected')


          // alert(JSON.stringify(focusElement.classList.values()))
        } else {

          const oldFocusContainerEl = this.getElement(oldFocus)
          if (oldFocusContainerEl) {
            const oldFocusEl = oldFocusContainerEl.querySelector('.vue-dd-focus')
            if (oldFocusEl) {
              oldFocusEl.classList.remove('vue-dd-focus-selected')

            }
          }

          // add focused class
          focusElement.classList.add('vue-dd-focus-selected')

        }

        // setting to null, then reset to the initial this.focus
        // if it is set to anything
        this.memory.focus = pointer === null ? this.focus : pointer
        this.store().set(this.memory)

        // change prop
        this.useFocus = this.memory.focus
      }
    },
    open (setup) {
      const { open, pointer, level } = setup

      if (level === 0) {
        this.openClass = open
      }

      // console.log('open', open, 'pointer', pointer, 'level', level)

      this.$emit('open', setup)
    },
    toggle (setup) {

      const { event, open, pointer, level } = setup

      if (this.save) {

        if (open) {

          // remove shared pointer to prevent re-opening
          delete this.shared.hiddenPointers[pointer]

          // add specific pointer
          this.useOpenSpecific.push(pointer)

          // add to memory store
          this.memory.open[pointer] = true

        } else {

          // set shared pointer so that NodeComplex knows
          // not to hide this pointer as this is being hidden right now
          // via user toggle click
          this.shared.hiddenPointers[pointer] = true

          // if we find this specific opened pointer
          const findKey = this.useOpenSpecific.indexOf(pointer)
          if (findKey >= 0) {
            delete this.useOpenSpecific[findKey]
          }

          // delete from memory
          delete this.memory.open[pointer]

        }
        // save memory state to storage
        this.store().set(this.memory)
        //console.log('set memory', this.memory, this.useOpenSpecific)
      }

      // console.log('toggle', open, 'pointer', pointer, 'level', level)


      this.$emit('toggle', setup)
    },

    store () {
      const key = 'dd.' + this.rootId
      return {
        get: () => {
          try {
            return JSON.parse(window[`${this.storage}Storage`].getItem(key));
          } catch (e) {}
        },
        set: (value) => window[`${this.storage}Storage`].setItem(key, JSON.stringify(value))
      }
    },
    hasMemoryOpen () {
      return isObject(this.memory)
        && 'open' in this.memory
        && isObject(this.memory.open)
    },

    getTypeFn (value) {
      let _type = typeof value;

      if (_type === 'object') {
        if (value === null) {
          return "null";
        }
        if (Array.isArray(value)) {
          return "array";
        }
        return "object";
      }
      if (_type === 'string') {
        if (value.length > this.longText) {
          _type = 'longtext'
        }
      }
      return _type;
    },
    isPrimitiveFn (type) {
      return !(type === 'array' || type === 'object' || type === 'function' || type === 'longtext');
    },
    escapeQuotesFn (text) {
      return this.escapeQuotes ? text.replaceAll('"', '\\"') : text
    },
    unwrapSpecificFn (openSpecific) {
      let unwrap = {}

      if (openSpecific.length) {

        const index = openSpecific

        if (index in unwrapCache) {
          // console.log('using cache')
          return unwrapCache[index]
        } else {
          openSpecific.forEach((el) => {
            const parts = String(el).split('.')
            let pointer = '', i = 0
            for (let k in parts) {
              pointer += (i > 0 ? '.' : '') + parts[k]
              unwrap[pointer] = true
              i++
            }
            // if there are any points found
            // unwrap level 0
            if (i > 0) {
              unwrap[''] = true
            }
          })

          // this.useFocus is specifically here inside the function
          // not outside in the computed property,
          // because if it is computed, it becomes too heavy
          // and does too many renders, this is enough
          if (this.useFocus !== null) {
            // add focus to elements to be unwrapped
            unwrap[this.useFocus] = true
          }
          // console.log('unwrap', unwrap)
          unwrapCache[index] = unwrap
        }

      }
      return unwrap
    },
    // recursive emit function
    emitFn (vm, name, ...args) {
      while (vm) {
        // recurse only within VueDd own components
        if (vm.$options.name !== 'VueDd'
          && vm.$options.name !== 'NodeComplex'
          && vm.$options.name !== 'NodePrimitive') {
          break;
        }
        vm.$emit(name, ...args)
        vm = vm.$parent
      }
    }
  },
  components: {
    NodeComplex,
    NodePrimitive
  }
}
</script>
<style>
@font-face {
  font-family: 'icomoon';
  src:  url('./assets/fonts/icomoon.eot?3mtojq');
  src:  url('./assets/fonts/icomoon.eot?3mtojq#iefix') format('embedded-opentype'),
  url('./assets/fonts/icomoon.ttf?3mtojq') format('truetype'),
  url('./assets/fonts/icomoon.woff?3mtojq') format('woff'),
  url('./assets/fonts/icomoon.svg?3mtojq#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="vue-dd-icon-"], [class*=" vue-dd-icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vue-dd-icon-eye:before {
  content: "\e900";
}

.vue-dd, .vue-dd pre {
  font-family: v-bind(fontFamily);
  font-size: v-bind(fontSize);
  line-height: v-bind(lineHeight);
}

.vue-dd {
  max-height: v-bind(maxHeight);
  max-width: v-bind(maxWidth);

  position: relative;
  text-align: left;
  color: #4e5e6b;
  padding: 2px 5px 2px 3px;
  transition: 0.2s;
  margin-bottom: 2px;
  background: #f9ffff;
  border-radius: 3px;
  border: 1px solid #d2dbe8;
  overflow-y: auto;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.vue-dd-open {

}

.vue-dd-open.vue-dd-inline {
  display: block;
}

.vue-dd-inline:not(.vue-dd-open) {
  display: inline-block;
  margin-right: 3px;
}

.vue-dd.vue-dd-dark {
  background: #000;
  border: 1px solid #000
}

.vue-dd::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
}

.vue-dd::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0.05);
}

.vue-dd::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
}

.vue-dd.vue-dd-dark::-webkit-scrollbar {
  background: rgba(255, 255, 255, 0.05);
}

.vue-dd.vue-dd-dark::-webkit-scrollbar-corner {
  background: rgba(255, 255, 255, 0.05);
}

.vue-dd.vue-dd-dark::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.vue-dd-box {
  display: block;
  overflow: visible;
  scrollbar-color: #ccc white;
  scrollbar-width: thin;
}

.vue-dd-box > div {
  /*float: left;*/
  display: block;
  overflow: visible;
}

.vue-dd-box > div > div {
  display: block;
  padding-left: v-bind(paddingLeft);
}

.vue-dd-box-inline, .vue-dd-box-inline div, .vue-dd-box-inline div div {
  display: inline-block;
  cursor: default;
  white-space: nowrap;
}

div.vue-dd-start {
  display: inline-block;
}

/** focus **/

.vue-dd-start .vue-dd-focus, .vue-dd-primitive .vue-dd-focus {
  color: #ccc;
  margin: 0 2px ;
  display: inline-block;
  font-size: 150%;
  vertical-align: middle;
  cursor: default;
  transition: 0.17s
}


.vue-dd-start .vue-dd-focus-hover, .vue-dd-primitive .vue-dd-focus-hover {
  color: #555;
}

.vue-dd-start .vue-dd-focus-selected, .vue-dd-primitive .vue-dd-focus-selected {
  display: inline-block;
  transform: rotate(360deg);
  color: #116dea;
}

/** dark focus **/

.vue-dd-dark .vue-dd-start .vue-dd-focus, .vue-dd-dark .vue-dd-primitive .vue-dd-focus {
  color: #333;
}


.vue-dd-dark .vue-dd-start .vue-dd-focus-hover, .vue-dd-dark .vue-dd-primitive .vue-dd-focus-hover {
  color: #666;
}


.vue-dd-dark .vue-dd-start .vue-dd-focus-selected, .vue-dd-dark .vue-dd-primitive .vue-dd-focus-selected {
  color: #116dea;
}


button.vue-dd-expand {
  vertical-align: middle;
  background: none;
  border: 0;
  border-radius: 3px;
  padding: 3px 0 3px 0;
  line-height: 10px;
  cursor: default;
  color: grey;
  -webkit-user-select: none;
  user-select: none;
}

button.vue-dd-expand:hover {
  background: rgba(50, 50, 50, 0.2);
  color: #21BA45;
}

button.vue-dd-expand:active {
  padding-top: 4px;
  padding-bottom: 2px !important;
}

.vue-dd-ref {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  color: grey;
  font-family: Georgia, 'Courier', serif;
  font-size: 90%;
  font-style: italic;
  letter-spacing: -0.5px;
  display: inline-block;
  padding: 0 3px 0 0;
}

.vue-dd-r {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  color: grey;
  font-family: Georgia, 'Courier', serif;
  font-size: 90%;
  font-style: italic;
  letter-spacing: -0.5px;
  display: inline-block;
  padding: 0 3px 0 0;
}

.vue-dd-f {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  color: grey;
  font-style: italic;
  font-family: Georgia, serif;
  font-size: 90%;
  letter-spacing: -1px;
  display: inline-block;
  padding: 0 5px 0 3px;
}

.vue-dd-f-inline {
  color: #4e5e6b;
  font-style: italic;
}

.vue-dd-f-start {
  display: inline;
  color: #55606a;
}


.vue-dd-dark pre.vue-dd-f-start {
  padding: 0;
  margin: 0;
  color: #cbeaff;
}

.vue-dd-dark pre.vue-dd-f-start .hljs-property {
  color: #6ec3ff;
}

.vue-dd-f-content {
  padding: 0;
}

.vue-dd-f-content pre {
  padding: 0;
  margin: 0;
  color: #333;
}

.vue-dd-dark .vue-dd-f-content pre .hljs-property {
  color: #6ec3ff;
}

.vue-dd-dark .vue-dd-f-content pre {
  padding: 0;
  margin: 0;
  color: #cbeaff;
}

button.vue-dd-arrow {
  border: none;
  display: inline-block;
  background: none;
  color: slategrey;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  font-size: 80%;
  padding: 0 2px 0 2px;
  transition: 0.2s;
}

button.vue-dd-arrow:hover {
  color: darkgrey;
}

button.vue-dd-arrow-collapsed {
  padding: 0 2px 0 2px;
  transform: rotate(-90deg);
}

.vue-dd-name {
  padding-right: 3px;
  cursor: default;
  color: #1b7ccf;
}

.vue-dd-dark .vue-dd-name {
  cursor: default;
  color: #09BAFF;
}

.vue-dd-name.vue-dd-f-name {
  color: #d114d1;
  font-weight: normal;
}

.vue-dd-instance {
  user-select: none;
  padding-left: 3px;
  font-style: italic;
  color: #21BA45;
  -webkit-user-select: none;
}

.vue-dd-size {
  user-select: none;
  margin-left: 1px;
  padding: 0 3px;
  border-radius: 10px;
  background: #fff;
  color: #999;
  font-size: 80%;
  line-height: 100%;
}

.vue-dd-dark .vue-dd-size {
  background: #131313;
  color: #555;
}

.vue-dd-promise-prototype {
  padding-right: 5px;
  padding-left: 0;
}

.vue-dd-promise-content {
  -webkit-user-select: none;
  user-select: none;
  padding: 0 4px;
  font-style: italic;
}

.vue-dd-highlight {
  animation: vue-dd-highlight 1s;
}

.vue-dd-dark .vue-dd-highlight {
  animation: vue-dd-highlight-on-dark 1s;
}

@keyframes vue-dd-highlight-on-dark {
  from {
    background-color: #0f99cb;
    border-radius: 5px;
  }
}

@keyframes vue-dd-highlight {
  from {
    background-color: #83cb0f;
    border-radius: 5px;
  }
}

.vue-dd-null, .vue-dd-undefined {
  color: slategrey;
}

.vue-dd-boolean {
  color: green;
}

.vue-dd-false {
  cursor: default;
  color: #f34747;
}

.vue-dd-string {
  color: orangered;
  word-break: break-word;
}

.vue-dd-dark .vue-dd-key {
  color: #c7e5fe;
}

.vue-dd-key {
  color: #384e61;
  padding-left: 1px;
  padding-right: 2px;
  font-weight: normal;
}


.vue-dd-box > div > div > div > span > .vue-dd-key {
  /*padding-left: 9px;*/
}

.vue-dd-forget {
  margin-left: 10px;
  cursor: pointer;
  font-size: 80%;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2px 5px;
  border-radius: 10px;
  transition:0.2;
  opacity: 0.8;
}

.vue-dd-forget:hover {
  opacity: 1;
}

.vue-dd-dark .vue-dd-forget {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.vue-dd .vue-dd-forget-q-ask {
  border: 0;
  background: none;
  padding: 2px 0;
  cursor: default;
}

.vue-dd .vue-dd-forget-yes {
  margin-left: 0;
}

.vue-dd .vue-dd-forget-no {
  margin-left: 0;
  background:none;
}

.vue-dd-forget-cleared {
  font-size: 80%;
  margin-right: 10px;
  padding: 2px 5px;
}
</style>
<style>
/* highlight.js styles */
.vue-dd pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

.vue-dd code.hljs {
  padding: 3px 5px;
}

.vue-dd .hljs {
  color: #abb2bf;
  background: #282c34;
}

.vue-dd .hljs-comment, .vue-dd .hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.vue-dd .hljs-doctag, .vue-dd .hljs-formula, .vue-dd .hljs-keyword {
  color: #c678dd;
}

.vue-dd .hljs-deletion, .vue-dd .hljs-name, .vue-dd .hljs-section, .vue-dd .hljs-selector-tag, .vue-dd .hljs-subst {
  color: #e06c75;
}

.vue-dd .hljs-literal {
  color: #56b6c2;
}

.vue-dd .hljs-addition, .vue-dd .hljs-attribute, .vue-dd .hljs-meta .hljs-string, .vue-dd .hljs-regexp, .vue-dd .hljs-string {
  color: #98c379;
}

.vue-dd .hljs-attr, .vue-dd .hljs-number, .vue-dd .hljs-selector-attr, .vue-dd .hljs-selector-class, .vue-dd .hljs-selector-pseudo, .vue-dd .hljs-template-variable, .vue-dd .hljs-type, .vue-dd .hljs-variable {
  color: #d19a66;
}

.vue-dd .hljs-bullet, .vue-dd .hljs-link, .vue-dd .hljs-meta, .vue-dd .hljs-selector-id, .vue-dd .hljs-symbol, .vue-dd .hljs-title {
  color: #61aeee;
}

.vue-dd .hljs-built_in, .vue-dd .hljs-class .hljs-title, .vue-dd .hljs-title.class_ {
  color: #e6c07b;
}

.vue-dd .hljs-emphasis {
  font-style: italic;
}

.vue-dd .hljs-strong {
  font-weight: 700;
}

.vue-dd .hljs-link {
  text-decoration: underline;
}
</style>

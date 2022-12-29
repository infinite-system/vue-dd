<template>
  <div :id="id" :class="{'vue-dd-box-inline': !open}">
    <div class="vue-dd-start">
      <!--arrow-->
      <button
        @click="toggleOpen"
        class="vue-dd-arrow"
        :class="{'vue-dd-arrow-collapsed': !open}"
        v-html="'&#x25BC;'"></button>

      <!--name-->
      <span
        v-if="String(name)"

        @click="toggleOpen"
        @mousedown="preventSelect($event)"
        class="vue-dd-name"
        :class="{'vue-dd-f-name': isFunction}">{{ name }}<span v-if="level !== 0">:</span>
      </span>

      <!--R-->
      <span v-if="isIterable && isReactive"
            @click="toggleOpen"
            @mousedown="preventSelect($event)"
            class="vue-dd-r"
            title="Reactive">R</span>

      <!--Ref-->
      <span v-else-if="isIterable && isRef"
            @click="toggleOpen"
            @mousedown="preventSelect($event)"
            class="vue-dd-ref"
            title="Ref">Ref</span>

      <!--f-->
      <span v-else-if="isFunction"
            @click="toggleOpen"
            @mousedown="preventSelect($event)"
            class="vue-dd-f"
            title="Function">f</span>

      <!--function start-->
      <pre v-if="isFunction && open"
           @click="toggleOpen"
           class="vue-dd-f-start"
           v-html="functionName"></pre>

      <!--{-->
      <span v-if="isIterable && open"
            @click="toggleOpen"
            @mousedown="preventSelect($event)"
            v-html="charOpen" />

      <!--instanceof-->
      <span v-if="isIterable && open && instanceOf"
            class="vue-dd-instance">{{ instanceOf }}</span>

      <!--size-->
      <span v-if="isIterable && open && getSize"
            class="vue-dd-size">{{ getSize }}</span>


      <!--focus-->
      <span v-if="open && saveFocus"
            ref="focusElement"
            class="vue-dd-focus vue-dd-icon-eye"
            @click="focusEmit"
            @mouseenter="hover=true"
            @mouseup="hover=false"
            @mouseleave="hover=false"
            :class="{
              'vue-dd-focus-hover':hover,
              'vue-dd-focus-selected':pointer === focus
            }"
            ></span>

      <!--promise-->
      <span v-if="isIterable && isPromise && !open"
            class="vue-dd-instance vue-dd-promise-prototype">Promise</span>

      <!--forget-->
      <span v-if="open && level === 0 && save && !cleared"
            @click="askForget=true"
            class="vue-dd-forget vue-dd-forget-q"
      :class="{'vue-dd-forget-q-ask':askForget}">
        <span v-if="askForget">clear save?</span>
        <span v-else>forget</span>
      </span>

      <span v-if="askForget">
        <span class="vue-dd-forget vue-dd-forget-yes" @click="forget">yes</span>
        <span  class="vue-dd-forget vue-dd-forget-no" @click="askForget=false">no</span>
      </span>
      <span class="vue-dd-forget-cleared" v-if="cleared">
        cleared
      </span>


    </div>
    <div
      :class="{
      'vue-dd-box': open,
      'vue-dd-box-inline': !open,
      'vue-dd-box-complex': true
    }">
      <div>

        <!--{-->
        <span v-if="isIterable && !open" v-html="charOpen" />

        <!--size-->
        <span v-if="isIterable && allowPreview && !open && getSize"
              class="vue-dd-size">{{ getSize }}</span>

        <!--promise content-->
        <span v-if="isIterable && isPromise" class="vue-dd-promise-content">&lt;pending&gt;</span>

        <!--expand button-->
        <button
          v-if="isIterable && !open && !expanded && !allowPreview"
          @click="expand"
          class="vue-dd-expand">...
        </button>

        <div v-if="isIterable && (open || expanded)">

          <!--iterate arrays/objects/maps/sets-->
          <div v-for="index in open
                  // show all
                  ? items.length
                  // show preview
                  : (allowPreview < items.length ? allowPreview : items.length)"
               :key="index">

            <!-- string | number | boolean | null | undefined -->
            <node-primitive
              v-if="isPrimitiveFn(getSpecialType(items[index-1]))"

              :root="root"
              :rootId="rootId"

              :modelValue="getModelValue(items[index-1])"
              :name="getName(items[index-1])"
              :escapeQuotes="escapeQuotes"
              :focus="focus"
              :save="save"
              :saveFocus="saveFocus"

              :pointer="getPointer(items[index-1])"
              :open="open"
              :type="getSpecialType(items[index-1])"
              :size="getSize"
              :position="index"

              :escapeQuotesFn="escapeQuotesFn"
              :emitFn="emitFn"

              @openParent="openParent"
            />
            <!-- object, array, map, set, function, longtext -->
            <node-complex
              v-else

              :root="root"
              :rootId="rootId"

              :modelValue="getModelValue(items[index-1])"
              :name="getName(items[index-1])"
              :deep="isSet ? false : deep"
              :watch="watch"
              :preview="open ? preview : false"
              :openLevel="useOpenLevel"
              :openSpecific="useOpenSpecific"
              :longText="longText"
              :escapeQuotes="escapeQuotes"
              :focus="focus"
              :save="save"
              :saveFocus="saveFocus"

              :pointer="getPointer(items[index-1])"
              :type="getSpecialType(items[index-1])"
              :shared="shared"
              :level="level+1"
              :size="getSize"
              :position="index"

              :escapeQuotesFn="escapeQuotesFn"
              :getTypeFn="getTypeFn"
              :isPrimitiveFn="isPrimitiveFn"
              :unwrapSpecificFn="unwrapSpecificFn"
              :emitFn="emitFn"

              @openParent="openParent"
            />

          </div>
        </div>

        <!--function content-->
        <div v-if="isFunction" class="vue-dd-f-content">

          <!--if open and function content exists-->
          <pre v-if="open && functionContent" v-html="functionContent"></pre>
          <!--if open and function content does not exist-->
          <span v-else-if="open && !functionContent"></span>
          <!--if not open, display inline-->
          <span @click="toggleOpen" v-else class="vue-dd-f-inline">{{
              allowPreview ? functionInlinePreview : functionInline
            }}<span v-if="shouldComma">,&nbsp;</span>
          </span>
        </div>

        <!--long text-->
        <div v-if="isLongText" class="vue-dd-string">
          <span v-if="open">{{ longTextContent }}</span>
          <span v-else>{{ longTextInline }}</span>
        </div>

        <span v-if="isIterable" v-html="charClose" />
        <span v-if="isIterable && shouldComma">,&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { isReactive, isRef } from 'vue';
import NodePrimitive from "./NodePrimitive.vue";

import hljs from './highlight.js/core.min.js';
import javascript from './highlight.js/javascript.min.js';

hljs.registerLanguage('javascript', javascript);

export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function isPromise (p) {
  return p !== null &&
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function';
}


let allPointerCache = {}
// let unwrapCache = {}

function getAllPointer (pointer) {
  let allPointer = '*'
  pointer = String(pointer)

  if (pointer in allPointerCache) {
    // console.log('using pointer cache', pointer)
    allPointer = allPointerCache[pointer]
  } else {
    const pointerParts = pointer.split('.')
    pointerParts.pop()
    if (pointerParts.length) {
      allPointer = pointerParts.join('.') + '.*'
    }
    allPointerCache[pointer] = allPointer
  }
  return allPointer
}

export default {
  name: 'NodeComplex',
  inheritAttrs: false,
  emits: ['open', 'toggle', 'focus', 'openParent', 'forget'],
  props: {
    // ref
    root: undefined,
    rootId: [String, Number],
    // options
    modelValue: undefined,
    name: [String, Number],
    openLevel: [Number, Array],
    openSpecific: Array,
    longText: Number,
    escapeQuotes: Boolean,
    deep: Boolean,
    watch: Boolean,
    preview: [Boolean, Number],
    previewInitial: Boolean,
    focus: String,
    save: Boolean,
    saveFocus: Boolean,
    // helpers
    shared: Object,
    type: String,
    pointer: { type: [String, Number], default: '' },
    level: { type: Number, default: 0 },
    size: Number,
    position: Number,
    // functions
    escapeQuotesFn: Function,
    isPrimitiveFn: Function,
    getTypeFn: Function,
    unwrapSpecificFn: Function,
    emitFn: Function
  },
  data () {
    return {
      id: this.getId(),
      hideTimes: 0,
      open: false,
      expanded: false,
      items: [],
      getMapSet: {},
      getSize: 0,
      useOpenLevel: this.openLevel,
      useOpenSpecific: this.openSpecific,
      originalOpenLevel: this.openLevel,
      askForget:false,
      cleared:false,
      hover:false
    }
  },
  created () {

    this.expanded = this.allowPreview

    this.items = this.makeItems()
    if (this.watch) {
      this.watchModelValue(this.deep)
    }

    this.useOpenSpecific = this.openSpecific

  },
  methods: {
    forget() {
      this.emitFn(this, 'forget', { askForget: this.askForget})
      this.askForget = false
      this.cleared = true
      setTimeout(() => this.cleared = false,1000)
    },
    openParent () {
      if (!this.open) {
        this.toggleOpen(null, true)
      }
    },
    setFocus() {
      if (this.save){

      }
    },
    getId () {
      return this.level === 0
        ? `_${this.rootId}`
        : `_${this.rootId}.${this.pointer}`
    },
    watchModelValue: function(deep) {
      return this.$watch('modelValue', () => {
          this.items = this.makeItems()
        },
        { deep: deep })
    },
    getPointer (index) {
      return this.pointer ? this.pointer + '.' + index : index
    },
    getSpecialType (index) {
      if (this.isMapSet) {
        return this.getTypeFn(this.getMapSet[index])
      } else {
        return this.getTypeFn(this.modelValue[index])
      }
    },
    getModelValue (index) {
      if (this.isMapSet) {
        return this.getMapSet[index]
      } else {
        return this.modelValue[index]
      }
    },
    // prevent select on double click
    preventSelect (event) {
      if (event.detail > 1) {
        event.preventDefault();
      }
    },
    /**
     * Get the name of key of an object or array
     * If it is an array, those keys are not named
     * @param key
     * @returns {string|*}
     */
    getName (key) {
      return this.isArray ? '' : key
    },
    expand () {
      if (!this.open) {
        this.toggleOpen(null, true)
      }
      this.expanded = true
    },
    toggleOpen (event, value) {

      this.open = value === undefined ? !this.open : value
      this.expanded = this.allowPreview

      if (this.open) {
        this.$emit('openParent')
      }

      this.emit('toggle', {
        event: event,
        open: this.open,
        level: this.level,
        pointer: this.pointer
      })
    },
    // recursive emit
    // more info: https://stackoverflow.com/a/55650245/1502706
    emit (name, ...args) {
      this.emitFn(this, name, ...args)
    },
    makeItems () {
      switch (true) {
        case this.isObject:
          let keys = [], i = 0;
          switch (true) {
            case this.isSet:
              this.getMapSet = Array.from(this.modelValue)
              keys = [...Array(this.getMapSet.length).keys()]
              this.getSize = this.getMapSet.length
              break;
            case this.isMap:
              this.modelValue.forEach((value, key) => {
                this.getMapSet[key] = value
                keys[i] = key
                i++
              });
              this.getSize = i
              break;
            default:
              for (let k in this.modelValue) {
                keys[i] = k
                i++
              }
              this.getSize = i
          }
          return keys;
        case this.isArray:
          this.getSize = this.modelValue.length
          return [...Array(this.modelValue.length).keys()]
        default:
          return this.modelValue
      }
    },

    parentIsOpen () {
      // this function is necessary for proper functioning of 'save' mode
      // together with open-specific option
      return (this.$parent.$options.name === 'NodeComplex' && this.$parent.open)
        // VueDd is the root so no open parent check for it
        || this.$parent.$options.name === 'VueDd'
    },

    focusEmit () {
      this.emit('focus', {
        pointer: this.pointer,
        focusElement: this.$refs.focusElement
      })
    }

  },
  computed: {
    unwrapSpecific () {
      return this.unwrapSpecificFn(this.openSpecific)
    },
    allowPreview () {
      return !this.previewInitial && this.level === 0 ? false : this.preview
    },
    isMap () {
      return this.isObject && this.modelValue instanceof Map
    },
    isSet () {
      return this.isObject && this.modelValue instanceof Set
    },
    isMapSet () {
      return this.isMap || this.isSet
    },
    instanceOf () {
      const name = this.isObject
      && 'constructor' in this.modelValue
      && 'name' in this.modelValue.constructor
        ? this.modelValue.constructor.name
        : ''
      return name === 'Object' ? '' : name
    },
    nextLevel () {
      return this.level + 1
    },
    charOpen () {
      return this.isObject ? "{" : "["
    },
    charClose () {
      return this.isObject ? "}" : "]"
    },
    functionInlinePreview () {
      const length = this.items.toString().length
      const maxLength = 100
      if (length > maxLength) {
        return this.items.toString().substring(0, maxLength) + '...}'
      } else {
        return this.items.toString()
      }
    },
    functionInline () {
      let f = this.modelValue.toString()
      switch (true) {
        case f.startsWith('function '):
          f = f.substring(9).trim()
          if (f.startsWith(this.name)) {
            f = f.substring(this.name.length)
          }
          break
        case f.startsWith('()'):
          f = '(){...}'
          break
        case f.startsWith(this.name):
          f = f.substring(this.name.length)
          break
      }
      const maxFuncLength = 25
      if (f.length > maxFuncLength) {
        f = f.substring(0, maxFuncLength) + '...'
      }
      return f
    },
    functionName () {
      let code = String(this.items)

      const newLinePosition = code.indexOf('\n')
      if (newLinePosition >= 0) {
        code = code.substring(0, newLinePosition)
      }
      const highlight = hljs.highlight(code, { language: 'javascript' }).value
      const comma = !this.functionContent && this.shouldComma ? ',' : ''

      return highlight + comma
    },
    functionContent () {

      let lines = String(this.items).trim().split('\n')
      if (lines.length) {
        // calculate extra white space
        const lastLine = lines.length - 1
        const trimLeftSize = lines[lastLine].indexOf('}')

        // trim extra white space on the left, extra tabs/spaces
        lines = lines.map(val => val.substring(trimLeftSize))

        // remove first line as we want to show only content
        lines.shift()

        const code = lines.join('\n')

        const highlight = hljs.highlight(code, { language: 'javascript' }).value

        const comma = code && this.shouldComma ? ',' : ''

        return highlight + comma
      }

      return ''
    },
    shouldComma () {
      return this.size && this.position && this.position !== this.size
    },
    longTextInline () {

      let text = this.modelValue.substring(0, this.longText)
      text = this.escapeQuotesFn(text)
      text = `"${text}..."`

      const comma = this.shouldComma ? ',' : ''

      return text + comma
    },
    longTextContent () {
      let text = this.modelValue
      text = this.escapeQuotesFn(text)
      text = `"${text}"`

      const comma = this.shouldComma ? ',' : ''

      return text + comma
    },
    isLongText () {
      return this.type === 'longtext'
    },
    isRefReactive () {
      return this.isRef || this.isReactive
    },
    isIterable () {
      return this.isArray || this.isObject
    },
    isArray () {
      return this.type === 'array'
    },
    isObject () {
      return this.type === 'object'
    },
    isFunction () {
      return this.type === 'function'
    },
    isPromise () {
      return isPromise(this.modelValue)
    },
    isReactive () {
      return isReactive(this.modelValue)
    },
    isRef () {
      return isRef(this.modelValue)
    }
  },
  watch: {

    // opens levels
    openLevel: {
      handler (value) {

        // open levels up to this one
        if (typeof this.openLevel === 'number') {
          if (this.level < this.openLevel) {
            this.open = true
          }
        }

        // handle several levels to pre-open [1,2,3,4]
        if (this.getTypeFn(this.openLevel) === 'array') {
          for (let i = 0; i < this.openLevel.length; i++) {
            if (this.level === parseInt(this.openLevel[i])) {
              this.open = true
            }
          }
        }

      },
      immediate: true
    },

    // opens specific pointers
    unwrapSpecific: {
      handler (value) {

        if (this.openSpecific.length
          && typeof this.pointer !== 'undefined'
          && this.pointer !== null) {

          let allPointer = getAllPointer(this.pointer)

          // check existence within the list
          if (this.pointer in value || allPointer in value) {

            if (this.pointer in this.shared.hiddenPointers) {
              /**
               * this prevents save: true mode from colliding
               * with open-specific parameters
               * those items that are being hidden should not
               * be opening up again, this prevents them from
               * opening up, so this line is very important
               * for seamless integration between save: true and
               * open-specific: ['node','node1.node2'] modes
               */
              return void 0 // do not open, hiding is in progress
            }

            // $nextTick is necessary here!
            this.$nextTick(() => {
              if (this.parentIsOpen()) {
                this.open = true
              }
            })

          }
        }
      },
      immediate: true
    },

    // fires events on open and closing
    open: {
      handler (value, oldValue) {


        if (!value) {
          const hideEverything = () => {
            this.useOpenLevel = 0
            this.useOpenSpecific = []
          }
          // on initial load this will hide everything
          // even if openSpecific is specified, this semi-complicated
          // logic is necessary
          if (this.hideTimes === 0) {
            hideEverything()
          } else {
            // setTimeout:1 speeds up hiding significantly
            setTimeout(() => hideEverything(), 1)
          }
          // all later hiding is sped up with setTimeout
          this.hideTimes++
        } else {
          this.useOpenLevel = this.openLevel
          this.useOpenSpecific = this.openSpecific
        }

        this.emit('open', {
          open: this.open,
          level: this.level,
          pointer: this.pointer
        })

      },
      immediate: true
    },

    // expand previews
    preview (preview) {
      this.expanded = preview;
      this.open = this.open && preview;
    }
  },
  components: {
    NodePrimitive
  }
}
</script>

<template>
  <span
    :id="id"
    class="vue-dd-primitive"
    @click="$emit('openParent')">
    <span
      v-if="nameString"
      class="vue-dd-key">{{ name }}:</span><span
      v-if="nameString && open && saveFocus"
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
    <span v-if="type === 'null'"
          class="vue-dd-null">null</span>
    <span v-else-if="type === 'undefined'"
          class="vue-dd-undefined">undefined</span>
    <span v-else-if="type === 'number'"
          class="vue-dd-number">{{ modelValue }}</span>
    <span v-else-if="type === 'string'"
          class="vue-dd-string">"{{ escapeQuotesFn(modelValue) }}"</span>
    <span v-else-if="type === 'boolean'"
          class="vue-dd-boolean"
          :class="{'vue-dd-false':!modelValue}">{{ modelValue }}</span>
    <span v-else
          class="vue-dd-false">[unknown_type]{{ modelValue }}</span>
    <span v-if="shouldComma">,&nbsp;</span>
  </span>
</template>
<script>
export default {
  name: 'NodePrimitive',
  inheritAttrs: false,
  emits: ['openParent', 'focus'],
  props: [
    // ref
    'root',
    'rootId',
    // options
    'modelValue',
    'name',
    'escapeQuotes',
    'save',
    'saveFocus',
    'focus',
    // helpers
    'open',
    'pointer',
    'type',
    'size',
    'position',
    // functions
    'escapeQuotesFn',
    'emitFn'
  ],
  data () {
    return {
      id: `_${this.rootId}.${this.pointer}`,
      hover: false,
    }
  },
  methods: {
    focusEmit () {
      this.emit('focus', {
        pointer: this.pointer,
        focusElement: this.$refs.focusElement
      })
    },
    emit (name, ...args) {
      this.emitFn(this, name, ...args)
    }
  },
  computed: {
    nameString () {
      return String(this.name)
    },
    shouldComma () {
      return this.size && this.position && this.position !== this.size
    }
  }
}
</script>

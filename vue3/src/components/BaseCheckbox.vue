<template>
  <input
    v-bind="{ ...$attrs, onChange: updateValue }"
    :checked="modelValue"
    :id="uuid"
    type="checkbox"
    class="field"
  />
  <label
    :for="uuid"
    v-if="label"
  >
    {{ label }}
  </label>
</template>

<script>
import uniqueId from '../features/uniqueId'
import setupFormComponent from '../features/setupFormComponent.js'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const uuid = uniqueId()

    const { updateValue } = setupFormComponent(props, context)

    return {
      updateValue,
      uuid
    }
  }
}
</script>

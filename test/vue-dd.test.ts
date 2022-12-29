import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import VueDd from '../src/VueDd.vue'

describe('vue dd init', () => {

  test('import', () => {
    expect(VueDd).toBeTruthy()
  })

  describe('primitives', () => {

    test('null', () => {

      const modelValue = null

      const wrapper = mount(VueDd, {
        props: { modelValue }
      })

      await nextTick()

      const text = wrapper.text()

      expect(text).toContain('null')
    })

    test('undefined', () => {

      const modelValue = undefined
      // const promise = new Promise(_resolve => resolve = _resolve)
      const wrapper = mount(VueDd, {
        props: { modelValue }
      })

      await nextTick()

      const text = wrapper.text()

      // console.log(text)
      expect(text).toContain('undefined')
    })

    test('string', () => {

      const modelValue = 'string'
      // const promise = new Promise(_resolve => resolve = _resolve)
      const wrapper = mount(VueDd, {
        props: { modelValue }
      })

      await nextTick()

      const text = wrapper.text()
      console.log(text)

      expect(text).toContain('string')
    })

    test('number', () => {

      const modelValue = 1000

      const wrapper = mount(VueDd, {
        props: { modelValue }
      })

      await nextTick()

      const text = wrapper.text()

      // console.log(text)

      expect(text).toContain(modelValue)
    })

    describe('complex', () => {

      test('object', () => {

        const modelValue = { test : 1 }

        const wrapper = mount(VueDd, {
          props: { modelValue }
        })

        await nextTick()

        const text = wrapper.text()

        expect(text).toContain('test:1')
      })

      test('array', () => {

        const modelValue = ['test']

        const wrapper = mount(VueDd, {
          props: { modelValue }
        })

        await nextTick()

        const text = wrapper.text()

        console.log(text)
        expect(text).toContain('test')
      })
    })


  })
})



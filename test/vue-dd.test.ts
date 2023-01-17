import { nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import VueDd from '../src/VueDd.vue'

describe('vue dd init', () => {

  test('import', () => {
    expect(VueDd).toBeTruthy()
  })

  describe('primitives', () => {

    test('null', async () => {


      const modelValue = null

      const wrapper = mount(VueDd, {
        props: { modelValue }
      })

      await nextTick()

      const text = wrapper.text()

      expect(text).toContain('null')
    })

    test('undefined', async () => {

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

    test('string', async () => {

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

    test('number', async () => {

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

      test('object', async () => {

        const modelValue = { test: 1 }

        const wrapper = mount(VueDd, {
          props: { modelValue }
        })

        await nextTick()

        const text = wrapper.text()

        expect(text).toContain('test:1')
      })

      test('array', async () => {

        const modelValue = ['test']

        const wrapper = mount(VueDd, {
          props: { modelValue }
        })

        await nextTick()

        const text = wrapper.text()

        console.log(text)
        expect(text).toContain('test')
      })

      test('array of objects', async () => {

        const modelValue = [{ obj: 1 }, { obj: 2 }]

        const wrapper = mount(VueDd, {
          props: {
            modelValue,
            openLevel: 3
          },
        })

        await nextTick()

        const text = wrapper.text()

        console.log(text)
        expect(text).toContain('obj:1')
        expect(text).toContain('obj:2')
      })
    })

    test('array of objects with refs', async () => {

      const modelValue = ref([22, { obj: ref(false) }, { obj: ref(true) }])

      console.log(modelValue)
      const wrapper = mount(VueDd, {
        props: {
          modelValue,
          openLevel: 1,
          openSpecific: ['_rawValue.1','_rawValue.2']
        },
      })

      await nextTick()

      const text = wrapper.text()

      console.log(text)
      expect(text).toContain('obj:1')
      expect(text).toContain('obj:2')

    })

  })

})



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

#### Usage in **Vue 3**
```html
<vue-dd v-model="object" />
```
#### Usage in **Vue 2**
Use `:model-value` instead of `v-model`
```html
<vue-dd :model-value="object" />
```

## Features
- deep live reactive watching of objects like in developer console but fully reactive
- even VueJS internal refs *deps* can be watched
- pre-open multiple levels of an object with `open-level`
- pre-open multiple specific parts of an object with `open-specific`
- `focus` window on certain parts of an object
- `save` and `save-focus` modes to remember the focused item and also everything that was previously opened
- performance optimized, even large objects like `window` can be vue-dd
- expessive short syntax
- modern reactive `Maps`, `Sets`, `Symbols` are supported

## Beautiful & Pixel Perfect
  - dark and light modes are built in
  - fully configurable & fully themeable via CSS
  - functions content are highlighted with highlight.js 
  - highlight.js is built in to retain 0 dependecy architecture

## Zero dependencies
This component does not depend on any other package, except Vue 3, >2.7.5

## Props

| Name            | Default                              | Type                    | Details                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|-----------------|--------------------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| modelValue      | *none*                               | undefined               | JS or VueJS object or primitive                                                                                                                                                                                                                                                                                                                                                                                                                       |
| id              | *empty*                              | String, Number          | If empty, id will be auto-generated, id is used in `save` and `saveFocus` modes, to store opened & focused elements                                                                                                                                                                                                                                                                                                                                   |
| name            | *empty*                              | String                  | The name of the object                                                                                                                                                                                                                                                                                                                                                                                                                                |
| open-level      | `0`                                  | Number, String, Array   | Default is `0` or folded. Number or String like (1 or '2' or 3) will open all levels up to that level.   Array of levels like [2,3,5] will pre-open specifically those levels only, if 0 is not specified, it will still be folded initially.                                                                                                                                                                                                         |
| open-specific   | `[]`                                 | Array                   | Array of elements to pre-open. For ex. `window` object, has `window.navigator` and `window.history`, history has `window.history.state` objects. To pre-open them specify  [`'window'`,`'window.history'`,`'window.history.state'`] or just `['window.history.state']` as it requires all of the above objects to be open already. If objects are not descendants then specify separately like this `['window.history.state',` ` 'window.navigator']` |
| focus           | `null`                               | String, Number          | Focus element to open, similar to òpen-specific`, but just 1 item. The browser will open and scroll to that element if it is specified.                                                                                                                                                                                                                                                                                                               |
| preview         | `5`                                  | Number, Boolean `false` | Number of elements to preview when viewing an object or an array. This can be made less or more depending on performance needs. Less is faster, because there is less rendering. It can also be fully turned off by setting `0` or `false`                                                                                                                                                                                                            |
| preview-initial | `true`                               | Boolean                 | Initial object's preview can be turned off, to make the item take less space on the screen. Instead of `obj {1, 2, 3, 4, 5}`, it will just be `obj {...}` on the first level, when you open it, it will use `preview` value for the rest of the items.                                                                                                                                                                                                |
| escape-quotes   | `false`                              | Boolean                 | Strings will have escaped double quotes, " will be converted to \\"                                                                                                                                                                                                                                                                                                                                                                                   |
| long-text       | `50`                                 | Number                  | Determines if the string is too long, and will concatenate it to the specified number of characters, you can open full text like a function or an object                                                                                                                                                                                                                                                                                              |
| delimiter       | `.`                                  | String                  | Delimiter to determine the open-specific element, you can modify this to allow for dots in the object attributes                                                                                                                                                                                                                                                                                                                                      |
| more            | `...`                                | String                  | Text for the expand button                                                                                                                                                                                                                                                                                                                                                                                                                            |
| arrow           | `▼`                                  | String                  | Text for the arrow button                                                                                                                                                                                                                                                                                                                                                                                                                             |
| inline          | `true`                               | Boolean                 | Inline mode makes the object, when folded to be a simple `display:inline-block`, but when expanded it becomes `display:block`                                                                                                                                                                                                                                                                                                                         |
| dark            | `true`                               | Boolean                 | Dark / light modes                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| font-family     | `"JetBrains Mono", "Courier", serif` | Boolean                 | Font family                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| font-size       | `0.7rem`                             | String                  | Font size                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| line-height     | `1rem`                               | String                  | Line height                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| padding-left    | `0.7rem`                             | String                  | Padding left for sub-elements                                                                                                                                                                                                                                                                                                                                                                                                                         |
| max-height      | `500px`                              | String                  | Max height                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| max-width       | `100%`                               | String                  | Max width                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| save            | `false`                              | Boolean                 | Save mode, will save all opened elements, to remember closed elements, all sub-elements must be closed in this mode                                                                                                                                                                                                                                                                                                                                   |
| save-focus      | `true`                               | Boolean                 | Save-focus mode, will save save an element to open if you select an eye icon on it, very useful to quickly open and scroll to the needed sub-object / value                                                                                                                                                                                                                                                                                           |
| storage         | `session`                            | Boolean                 | Storage `'local'` or `'session'` can be used, to store data for `save` and `save-focus` modes. `'local'` storage will save data for the whole browser, `'session'` will save elements for specific tab only.                                                                                                                                                                                                                                          |
| watch           | `true`                               | Boolean                 | Should objects be watched? Watching can be disabled for big data sets. Reactive objects will still be watched by VueJS, but refs will lose their reactivity in displayed object.                                                                                                                                                                                                                                                                      |
| deep            | `true`                               | Boolean                 | Should objects be watched deeply? Watching deeply can be disabled for big data sets. Reactive objects will still be watched by VueJS, refs will still be reactive, but regular objects will lose their reactivity when they contain reactive objects within themselves (this is a useful side-effect that was discovered)                                                                                                                             |



## Emits

| Emit   | Function           | Args                                                                           | Details                                                         |
|--------|--------------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------|
| toggle | `(setup) => {...}` | `{ event, open, pointer, level } = setup`                                      | Emit fired when a user clicks to open or close any element      |
| open   | `(setup) => {...}` | `{ open, pointer, level } = setup`                                             | On open by vue-dd itself or by a user, this emit will be called |
| focus  | `(setup) => {...}` | `{ focus: <String>'window.navigator'``, focusElement: <HTMLElement> } = setup` | When element is focused this emit is called                     |

## Develop Your Own Tools
- Vue-dd allows you to create advanced debugging tools on top of it as it is very customizable and feature rich
- There are many things that can be done with this package, for ex. here is what I am doing with it right now:
    - Create a VueJS based developer console, write a name of an object / primitive and it will output it
    - Create mobile debugging, by putting this output above all modals, tooltips in your app, track reactive changes, as you browse mobile or desktop versions of your app
    - All of these features area currently in development in **XRay** component, that will soon be part of **vue-dd**, but feel free to develop your own versions with this package


## Modern JavaScript Support
This component supports modern javascript features such as Maps, Sets and Symbols. Reactive `reactive(new Map())` and `reactive(new Set())` can be watched and updated reactively.

## Licence
The licence is MIT, so any extension, forking is welcome. Vue-dd is designed to create a low level, zero dependency tooling for VueJS, that has potential to become a standard for reactivity tracking.

All contributions are welcome to improve this package. It is pretty feature rich at this point, but things always can be improved and I am always looking for feedback.
## Need More?
What other features, props, emits would be useful to create a world class debugging tool in Vue? Please, write to me in feature requests or submit a PR request with your code.

## Credits & Thanks
> This was initially a fork of **[vue-object-view](https://github.com/ebuzek/vue-object-view)** project by **[Emanuel Buzek](https://github.com/ebuzek)**. <br />
> **Huge Thank You to Emanuel Buzek** and his initial work back in 2017, as it was used as the base to create this hugely expanded version with advanced functionality.

> **Highlight.js** is built into vue-dd to provide JavaScript function highlighting.

> Kudos to **VueJS & Evan You** for creating a superb reactive framework that allows this to be built!

> Vue-dd name is inspired by **Laravel's dd()** function, as it used to output objects in PHP Laravel framework, shout out to **Taylor Otwell**, as Laravel is also a truly inspiring work of art in PHP world that also enlivened VueJS Open Source Development to be what it is today!
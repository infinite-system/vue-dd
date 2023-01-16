## Vue-dd

> Vue-dd is a component for live display of VueJS refs, reactive objects, primitives and JavaScript objects supporting circular references

## About
Vue-dd is a zero dependency, Vue 3 & 2 object viewer for displaying complex JavaScript objects, Vue reactive and ref objects, functions, maps, sets, symbols and primitives and monitor their changes **live**. 

The component renders object as a tree that can be manually expanded to display nested values, very similar to inspecting JavaScript objects using the Developer Tools, but with full reactivity.

## Usage
```bash
# Install the component
npm install vue-dd
# or
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
- Deep live reactive watching of objects, like in developer console
- Even VueJS' internal refs `deps` can be watched
- Focus on certain parts of an object
- Pre-open multiple specific levels of an object
- Pre-open multiple specific parts of an object
- Memory mode to remember the focused item and also everything that was previously opened
- Performance optimized, even large objects like `window` can be viewed
- Expessive short syntax

## Beautiful & Pixel Perfect
  - dark and light modes are built in
  - fully configurable & fully themeable via CSS
  - functions content are highlighted with highlight.js 
  - highlight.js is built in to retain 0 dependecy architecture

## Zero dependencies
This component does not depend on any other package, except Vue 3, >2.7.5

## Props


| Name            | Type                     | Default                              | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------|--------------------------|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| modelValue      | undefined                | *none*                               | JS or VueJS object or primitive                                                                                                                                                                                                                                                                                                                                                                                                                        |
| id              | String, Number           | *empty*                              | If empty, id will be auto-generated, id is used in `save` and `saveFocus` modes, to store opened & focused elements                                                                                                                                                                                                                                                                                                                                    |
| name            | String                   | *empty*                              | The name of the object                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| open-level      | Number, String, Array    | `0`                                  | Default is `0` or folded. Number or String like (1 or '2' or 3) will open all levels up to that level. <br/><br/>Array of levels like [2,3,5] will pre-open specifically those levels only, if 0 is not specified, it will still be folded initially.                                                                                                                                                                                                  |
| open-specific   | Array                    | `[]`                                 | Array of elements to pre-open. For ex. `window` object, has `window.navigator` and `window.history`, history has `window.history.state` objects. To pre-open them specify <br/>[`'window'`,`'window.history'`,`'window.history.state'`] or just `['window.history.state']` as it requires all of the above objects to be open already. If objects are not descendants then specify separately like this `['window.history.state', 'window.navigator']` |
| focus           | String, Number           | `null`                               | Focus element to open, similar to òpen-specific`, but just 1 item. The browser will open and scroll to that element if it is specified.                                                                                                                                                                                                                                                                                                                |
| preview         | Number, Boolean(`false`) | `5`                                  | Number of elements to preview when viewing an object or an array. This can be made less or more depending on performance needs. Less is faster, because there is less rendering. It can also be fully turned off by setting `0` or `false`                                                                                                                                                                                                             |
| preview-initial | Boolean                  | `true`                               | Initial object's preview can be turned off, to make the item take less space on the screen. Instead of `obj {1, 2, 3, 4, 5}`, it will just be `obj {...}` on the first level, when you open it, it will use `preview` value for the rest of the items.                                                                                                                                                                                                 |
| escape-quotes   | Boolean                  | `false`                              | Strings will have escaped double quotes, " will be converted to \\"                                                                                                                                                                                                                                                                                                                                                                                    |
| long-text       | Number                   | `50`                                 | Determines if the string is too long, and will concatenate it to the specified number of characters, you can open full text like a function or an object                                                                                                                                                                                                                                                                                               |
| delimiter       | String                   | `.`                                  | Delimiter to determine the open-specific element, you can modify this to allow for dots in the object attributes                                                                                                                                                                                                                                                                                                                                       |
| more            | String                   | `...`                                | Text for the expand button                                                                                                                                                                                                                                                                                                                                                                                                                             |
| arrow           | String                   | `&#x25BC;`                           | Text for the arrow button                                                                                                                                                                                                                                                                                                                                                                                                                              |
| inline          | Boolean                  | `true`                               | Inline mode makes the object, when folded to be a simple `display:inline-block`, but when expanded it becomes `display:block`                                                                                                                                                                                                                                                                                                                          |
| dark            | Boolean                  | `true`                               | Dark / light modes                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| font-family     | Boolean                  | `"JetBrains Mono", "Courier", serif` | Font family                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| font-size       | String                   | `0.7rem`                             | Font size                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| line-height     | String                   | `1rem`                               | Line height                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| padding-left    | String                   | `0.7rem`                             | Padding left for sub-elements                                                                                                                                                                                                                                                                                                                                                                                                                          |
| max-height      | String                   | `500px`                              | Max height                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| max-width       | String                   | `100%`                               | Max width                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| save            | Boolean                  | `false`                              | Save mode, will save all opened elements, to remember closed elements, all sub-elements must be closed in this mode                                                                                                                                                                                                                                                                                                                                    |
| save-focus      | Boolean                  | `true`                               | Save-focus mode, will save save an element to open if you select an eye icon on it, very useful to quickly open and scroll to the needed sub-object / value                                                                                                                                                                                                                                                                                            |
| storage         | Boolean                  | `session`                            | Storage 'local' or 'session' can be used, to store data for `save` and `save-focus` modes. 'local' storage will save data for the whole browser, 'session' will save elements for specific tab only.                                                                                                                                                                                                                                                   |
| watch           | Boolean                  | `true`                               | Should objects be watched? Watching can be disabled for big data sets. Reactive objects will still be watched by VueJS, but refs will lose their watch-ability                                                                                                                                                                                                                                                                                         |
| deep            | Boolean                  | `true`                               | Should objects be watched deeply? Watching deeply can be disabled for big data sets. Reactive objects will still be watched by VueJS, refs will still be watchable, but regular objects will lose their reactivity when they contain reactive objects within themselves (this is a useful side-effect that was discovered)                                                                                                                             |



## Develop Your Own Tools
- Vue-dd allows you to create advanced debugging tools on top of it as it is very customizable and feature rich


## Modern JavaScript Support
This component supports modern javascript features such as Maps, Sets and Symbols. Reactive `reactive(new Map())` and `reactive(new Set())` can be watched and updated reactively.

## Licence
The licence is MIT, so any extension, forking is welcome. Vue-dd is designed to create a low level, zero dependency tooling for VueJS, that has potential to become a standard for reactivity tracking.

All contributions are welcome to improve this package. It is pretty feature rich at this point, but things always can be improved and I am always looking for feedback.



> This was initially a fork of [vue-object-view](https://github.com/ebuzek/vue-object-view) project by [Emanuel Buzek](https://github.com/ebuzek). Thanks to his initial work back in 2017, I used it to created this hugely expanded version with advanced functionality.

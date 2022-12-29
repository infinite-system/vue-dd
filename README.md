## vue-dd

> Vue.js component for displaying arbitrary JavaScript values (supporting circular references)

See the [live demo](http://emanuelbuzek.eu/vov-demo/) to try it out. *([demo app](https://github.com/ebuzek/vue-dd-demo) on github)*

## About
The main purpose of this component is to display complex JavaScript values that may contain **circular references**. The component renders the value as a *tree* that can be manually expanded to display nested values.

The experience is very similar to inspecting JavaScript objects using the browser developer tools. The component was created to build the in-browser **JavaScript debugger** for the [PARAPPLE](http://emanuelbuzek.eu/parapple/#/) project.

## Usage
```bash
# Install the component
npm install --save vue-dd
```

Use it just like any other Vue.js component. The value to display is passed as `v-model` or `:value`:

```html
<VueObjectView v-model="object" />
<VueObjectView :value="anotherObject" />
```

## Properties

|  Property | Meaning  | Default  |
|----|----|----|
|  `nowrap` | Prevent word wrap (display the unexpanded value on a single line)  | **true**  |
|  `expandButtonText` | Content of the expand button  | '...'  |

## Styling
If you wish to change the visual appearance of the component, set the following CSS classes in your application stylesheet:

- `vue-dd` - Main component element
- `vue-dd-primitive` - Element wrapping primitive values
- `vue-dd-box-complex` - Element wrapping Objects and Arrays
- `vue-dd-open` - The open button (chevron right/down)
- `vue-dd-expand` - The expand button (...)

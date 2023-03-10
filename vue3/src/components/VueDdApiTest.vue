<template>
  <br />
  <strong>My vue-dd plugin is useful for this:</strong>

  <pre class="pre">&lt;vue-dd v-model="api" name="api" :open-level="2"&gt;</pre>
  <vue-dd name="api" v-model="api" open-level="2" />

  Basic API Requests:<br />
  <div class="url"><strong>fetch:</strong> {{ url }}</div>

  <div v-if="loading" class="api loading">Loading...</div>
  <div v-else-if="!loading && api" class="api">
    <div class="btns">
      <button class="btn btn--previous" v-if="previous" @click="getPrevious">
        previous
      </button>
      <button class="btn btn--next" v-if="next" @click="getNext">next</button>
    </div>
    <div class="table-wrap">
      <table class="table">
        <tr class="labels">
          <td>Name</td>
          <td>Height</td>
          <td>Mass</td>
          <td>Hair color</td>
          <td>Skin color</td>
        </tr>
        <!--
        * Loop through returned data
        * Note that I used
        * :key="index" but it is recommended to have a 100% unique value,
        * so index won't always work, but for this simple case it's fine
        -->
        <tr v-for="(row, index) in api.results" :key="index">
          <td>{{ row.name }}</td>
          <td>{{ row.height }}</td>
          <td>{{ row.mass }}</td>
          <td>{{ row.hair_color }}</td>
          <td>{{ row.skin_color }}</td>
        </tr>
      </table>
    </div>
  </div>
  <br />
  <strong>vue-dd advanced example 1:</strong>
  You can pre-open specific pointer in the object. Right now
  <strong>'results.0'</strong> is opened, you can open specific object arguments
  with <strong>:open-specific="['obj.prop','obj.prop2',...]"</strong>
  <pre class="pre">
&lt;vue-dd v-model="api" max-height="400px" :open-specific="['results.0']" /&gt;</pre
  >
  <vue-dd v-model="api" :open-specific="['results.0']" max-height="400px" />
  <br />
  <strong>vue-dd advanced example 2:</strong>
  You can pre-open levels with <strong>:open-level</strong> prop. Example below
  will open 2 levels deep right away, and scroll to the latest
  <strong>'results.9'</strong>,using <strong>focus="results.9"</strong> prop
  <pre class="pre">
&lt;vue-dd v-model="api" name="api" focus="results.9" max-height="400px" :open-level="2" /&gt;</pre
  >
  <vue-dd
      name="api"
      v-model="api"
      focus="results.9"
      max-height="400px"
      :open-level="2"
  />
  <br />
  <strong>vue-dd advanced example 3:</strong>
  Open 3 levels deep, and scroll to the midpoint <strong>'results.5'</strong>,
  <strong>'focus-sticky'</strong>
  prop will return the focus to correct element, even when data changes and you
  scrolled it somewhere, try scrolling somewhere, and then click 'next /
  previous' above in the API table.
  <pre class="pre">
&lt;vue-dd v-model="api" name="api" focus="results.5" :focus-sticky="true" max-height="400px" :open-level="3" /&gt;</pre
  >
  <vue-dd
      name="api"
      v-model="api"
      focus="results.5"
      :focus-sticky="true"
      max-height="400px"
      :open-level="3"
  />
  <br />
  <strong>vue-dd</strong> sessionStorage like this:
  <pre class="pre">
&lt;vue-dd name="session" v-model="sessionStorage" :open-level="1" /&gt;</pre
  >
  <vue-dd name="session" v-model="sessionStorage" :open-level="1" />
  <br />
  <strong>How to install vue-dd?</strong>
  <pre class="pre">
yarn add vue-dd
# or
npm install vue-dd
</pre
>
  <pre class="pre">
import { VueDd } from 'vue-dd'
</pre
>

  <pre class="pre">&lt;vue-dd v-model="object" /&gt;</pre>
  <div style="padding: 20px 0">
    <a target="_blank" href="https://github.com/infinite-system/vue-dd"
    >Read Documentation: https://github.com/infinite-system/vue-dd</a
    >
  </div>
</template>

<script>
// import the ref
import { ref } from 'vue';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// import php from 'highlight.js/lib/languages/php';
// hljs.registerLanguage('php', php);
hljs.configure({ languages: ['html', 'javascript', 'bash'] });
import { VueDd } from 'vue-dd';

export default {
  components: { VueDd },
  data() {
    return {
      previous: null,
    };
  },
  mounted() {
    document.querySelectorAll('pre').forEach((el) => {
      hljs.highlightElement(el);
    });
  },
  setup() {
    // create api ref
    const api = ref(null);
    const previous = ref('');
    const next = ref('');
    const url = ref('');

    const loading = ref(false);
    // use async function to await API calls
    // this function can also be called onMount, or before
    // the router changes to this component
    // or even in the Pinia store, it depends on how we architecture our app
    // this is the most basic example
    async function getApi(url) {
      // get the resource
      // api.value = null;
      loading.value = true;
      const result = await fetch(url);
      // convert to json
      const json = await result.json();
      loading.value = false;

      return json;
    }

    async function getNext() {
      previous.value = url.value;
      url.value = next.value;
      api.value = await getApi(next.value);
      next.value = api.value.next;
      previous.value = api.value.previous;
    }

    async function getPrevious() {
      url.value = previous.value;
      api.value = await getApi(previous.value);
      previous.value = api.value.previous;
      next.value = api.value.next;
    }

    // async closure to be able to use await on the API call
    (async () => {
      // try & catch if any of the Promised() awaits failed
      // use refs .value to assign the result
      setTimeout(async () => {
        try {
          loading.value = true;
          url.value = 'https://swapi.dev/api/people';
          api.value = await getApi(url.value);

          next.value = api.value.next;
          previous.value = api.value.previous;
          console.log(api.value);
        } catch (e) {
          loading.value = false;
          // log error if promises failed
          console.log('error', e);
        }
      }, 100);
    })();

    return {
      // expose api to template
      api,
      loading,
      previous,
      next,
      url,
      getNext,
      getPrevious,
      sessionStorage,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  color: #2c3e50;
}

.url {
  padding: 3px 10px;
  margin: 5px 0;
  background: #f3f3f3;
  border: 1px solid #eee;
  border-radius: 3px;
}

.btns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
.btn {
  border: 0;
  background: #eeeeff;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 3px solid grey;
  background: #333;
  color: #fff;
}

.btn--next {
  margin-left: auto;
}

.btn:hover {
  background: #000;
}

.loading {
  text-align: center;
}

.api {
  min-height: 400px;
}

.table {
  width: 100%;
}
.table tr.labels {
  font-weight: bold;
}
table tr td {
  margin: 0;
  border-bottom: 1px solid #e1e1e1;
}
.pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  border-radius: 3px;
  margin-bottom: 3px;
  line-height: 18px;
  padding: 2px 5px;
}
.table-wrap {
  padding: 15px;
  border: 1px solid #e3e3e3;
  margin-top: 10px;
  border-radius: 5px;
  background: #eaeaea;
}
</style>

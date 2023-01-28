<template>
  <br />
  <strong>My vue-dd plugin in action below:</strong>

  <vue-dd v-model="api" open-level="2" />

  <div class="url">{{ url }}</div>

  <div v-if="!api" class="loading">Loading...</div>
  <div v-else class="api">
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

    <button class="btn btn--previous" v-if="previous" @click="getPrevious">
      previous
    </button>

    <button class="btn btn--next" v-if="next" @click="getNext">next</button>
  </div>
  <br />

  <strong>vue-dd advanced example 2:</strong>
  You can open specific result: Right now results.0 is opened, you can even
  pre-open specific array keys!
  <pre>&lt;vue-dd v-model="api"  max-height="400px" :open-specific="['results.0']" /&gt;</pre>
  <vue-dd v-model="api" :open-specific="['results.0']" max-height="100px"  />

  <strong>vue-dd advanced examples:</strong>
  Open 3 levels deep, and scroll to the latest result.9
  <pre>&lt;vue-dd v-model="api" focus="results.9" max-height="400px" :open-level="3" /&gt;</pre>
  <vue-dd v-model="api" focus="results.9" :focus-sticky="true" max-height="100px" :open-level="3" />
</template>

<script>
// import the ref
import { ref } from 'vue';

// import { VueDd } from 'vue-dd';

export default {
  // components: { VueDd },
  data() {
    return {
      previous: null,
    };
  },
  setup() {
    // create api ref
    const api = ref(null);
    const previous = ref('');
    const autoplay = ref('');
    const next = ref('');
    const url = ref('');
    // use async function to await API calls
    // this function can also be called onMount, or before
    // the router changes to this component
    // or even in the Pinia store, it depends on how we architecture our app
    // this is the most basic example
    async function getApi(url) {
      // get the resource
      // api.value = null;
      const result = await fetch(url);
      // convert to json
      return await result.json();
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
      try {
        // try & catch if any of the Promised() awaits failed
        // use refs .value to assign the result
        url.value = 'https://swapi.dev/api/people';
        api.value = await getApi(url.value);

        next.value = api.value.next;
        previous.value = api.value.previous;

        console.log(api.value);
      } catch (e) {
        // log error if promises failed
        console.log('error', e);
      }
    })();

    return {
      // expose api to template
      api,
      previous,
      next,
      url,
      autoplay,
      getNext,
      getPrevious,
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

.btn {
  border: 0;
  background: #eeeeff;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn--next {
  float: right;
  border: 0;
  background: #eeeeff;
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

</style>

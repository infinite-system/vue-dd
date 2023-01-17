<template>
  <div class="hello">

    <img width="12" alt="Vue logo" src="../assets/logo.png">
    Vue 2 test for <strong>vue-dd</strong>
    <br />

    <VueDd name="window.navigator" class="test" font-family="arial" :model-value="w" />
  </div>
</template>

<script>
import VueDd from '../../../vue-dd/src/VueDd.vue'
export default {
  name: 'VueDdTest',
  props: {
    msg: String
  },
  data() {
    return {
      w: window.navigator
    }
  },
  components: {
    VueDd
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template lang="pug">
  div
     mapbox

</template>


<script>
import mapbox from './components/mapboxTest/mapboxLayer'
export default {
  name: 'App',
  components: {
   mapbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

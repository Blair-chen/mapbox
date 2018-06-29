<template lang="pug">

</template>
<script>
    import {events} from "./layerEvent.js";
import _ from "lodash";
export default {
  props: {
    layerId: String,
    layerType: String,
    data: Array
  },
  data() {
    return {
      source: null,
      layer: null
    };
  },
  mounted() {
    if (!_.isEmpty(this.data)) {
      this.beforeLayer();
    }
  },
  watch: {
    data(nv) {
      if (!_.isEmpty(this.data)) {
        this.beforeLayer();
      }
    }
  },
  methods: {
    beforeLayer() {
      this.source = {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: this.data
          }
        }
      },
        this.layer = {
          id: this.layerId,
          type: this.layerType,
          source: this.source,
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#0000FF",
            "line-width": 8
          }
        };
      if (!_.isEmpty(this.layer)) {
        this.addLayer();
      }
    },
    addLayer() {
      this.$parent.$refs.map._map.addLayer(this.layer);
      this.$_bindEvents(events);
    },
    $_bindEvents(events) {
      let vm = this;
      if (events.length === 0) return;
      events.forEach(eventName => {
        vm.$parent.$refs.map._map.on(eventName, this.layerId, event => {
          vm.$emit(eventName, { mapEvent: event });
        });
      });
    }
  }
};
</script>

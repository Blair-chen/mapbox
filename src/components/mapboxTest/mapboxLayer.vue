<template lang="pug">
div.mapbox-tab
  mapbox(@map-load="loadHandler" ref="map" :access-token="mapkey" :map-options="options"
   :geolocate-control="control" :scale-control="scalecontrol" :fullscreen-control="fullscreencontrol")
  div.search-box
    Input.ml10(type="text" icon="search" v-model="key" style="width:200px;height:0px;position: absolute;top: 8px;left:50px" placeholder="编号" @on-enter="search()" @on-click="search()")
  ployline(ref="ployline" @click="clickHandler" @mouseout="mouseoutHandler" @mouseover="mouseoverHandler"
  :layerId="layerId" :sourceId="sourceId" :replaceSource="replaceSource" :replace="replace" :type="type" :layout="layout" :paint="paint" :source="source")
</template>
<script>
import mapboxgl from "mapbox-gl";
import ployline from "../utils/geoJsonLayer";
import mapbox from "../utils/map";
import api from "store/search/api/inidex.js";
import _ from 'lodash';
export default {
  components: {
    mapboxgl,
    mapbox,
    ployline
  },
  data() {
    return {
      replaceSource:true,
      replace:true,
      sourceId:'linetest',
      type:'line',
      layout:{
         "line-join": "round",
            "line-cap": "round"
      },
      paint: {
         "line-color": "#0000FF",
            "line-width": 8
      },
      source:null,
      mapitem: null,
      data: [],
      key: null,
      layerType: "line",
      layerId: "maplayertest",
      options: {
        style: "mapbox://styles/mapbox/streets-v10",
        center: [-122.48369693756104, 37.83381888486939],
        zoom: 13
      },
      control: {
        show: true,
        position: "top-left"
      },
      scalecontrol: {
        show: false,
        position: "top-left"
      },
      fullscreencontrol: {
        show: true,
        position: "top-left"
      },
      mapkey:
        "pk.eyJ1IjoiYmxhaXItY2hlbiIsImEiOiJjaml0d2tkaXYxNXJpM3drYjNreDNhanY5In0.pC79Wh1HPeYqjZXYQOth9g"
    };
  },

  methods: {
    search() {
       if (this.key) {
        let result = api.search(this.key);
        this.data = result.positions;
         this.source= {
         "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": this.data
                }
            }
      }
        this.$refs.map._map.setZoom(result.zoom);
        this.$refs.map._map.setCenter(result.center);
      }
    },
    loadHandler(){

    },
    mouseoverHandler() {
      this.$refs.map._map.getCanvas().style.cursor = "pointer";
    },
    mouseoutHandler() {
      this.$refs.map._map.getCanvas().style.cursor = "";
    },
    clickHandler(e) {
      new mapboxgl.Popup()
        .setLngLat([e.mapEvent.lngLat.lng, e.mapEvent.lngLat.lat])
        .setHTML(
          '<div>这是位置经度'+e.mapEvent.lngLat.lng+'纬度'+e.mapEvent.lngLat.lat+'</div>'
        )
        .addTo(this.$refs.map._map);
    }
  }
};
</script>
<style lang="less">
@import "../../assets/style/global.less";
.mapbox-tab{
  width: 1500px;
  height:700px
}
#marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}
</style>



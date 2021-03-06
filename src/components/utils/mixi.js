// @ts-check
/**
 * @mixin
 */
export default {
  created() {
    this.map = null
  },
  mounted() {
    // debugger
    // this.$_checkMapTree()
    // We wait for "load" event from map component to ensure mapbox is loaded and map created
  },

  methods: {
    $_findBaseMap() {
      let baseMapComponent = null
      function walkParents(component) {
        if (component.$refs.map._map) {
          baseMapComponent = component.$refs.map
        } else {
          if (component.$parent !== undefined) {
            walkParents(component.$parent.$refs.map)
          }
        }
      }
      walkParents(this.$parent)
      if (baseMapComponent === undefined) {
        throw new Error('Component must have root map')
      }
      return baseMapComponent
    },
    $_checkMapTree() {
      let mapComponent = this.$_findBaseMap()
      if (mapComponent) {
        // if (mapComponent.mapLoaded) {
          this.$_deferredMount({ component: mapComponent, map: mapComponent._map })
        // } else {
        //   mapComponent.$on('load', this.$_deferredMount)
        // }
      }
    },
    $_emitMapEvent(name, data = {}) {
      this.$emit(name, {
        map: this.map,
        component: this,
        ...data
      })
    },

    $_bindSelfEvents(events, emitter = null) {
      if (events.length === 0) return
      emitter = emitter || this.map
      events.forEach(eventName => {
        emitter.on(eventName, event => {
          this.$_emitMapEvent(`${eventName}`, { mapEvent: event })
        })
      })
    },

    $_unbindSelfEvents(events, emitter = null) {
      if (events.length === 0) return
      emitter = emitter || this.map
      events.forEach(eventName => {
        emitter.off(eventName, this.layerId)
      })
    }
  }
}

<template>
  <div class="w-full h-full text-left">
    <div id="map" :style="mapSize">
    </div>
  </div>
</template>

<style scoped>
@import url("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css");
</style>

<style>
.mapboxgl-ctrl-bottom-left {
  width: 0;
  height: 0;
}

.mapboxgl-ctrl-bottom-right {
  width: 0;
  height: 0;
}
</style>

<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    mapWidth: {
      type: String,
      required: true
    },
    mapHeight: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    mapSize() {
      const styleObj = {
        width: this.mapWidth,
        height: this.mapHeight
      }
      return styleObj
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZmlsZm94IiwiYSI6ImNrZTNyaWxyNTBsd24zMXFudzU2ODBnYWEifQ.M_qCo2pfIbBsGLETsldKNg'

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/filfox/ckedq5it006cu19o5e910f14o',
        center: [164.6898, 24.2053],
        zoom: 1.2496,
        minZoom: 1.1,
        maxZoom: 7
      })

      let hoveredContinentId = null

      map.on('load', () => {
        map.addSource('continents', {
          type: 'geojson',
          data: '/continents.geojson'
        })

        map.addLayer({
          id: 'continent-fills',
          type: 'fill',
          source: 'continents',
          layout: {},
          paint: {
            'fill-color': '#627BC1',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.5,
              0
            ]
          }
        })

        map.addLayer({
          id: 'continent-borders',
          type: 'line',
          source: 'continents',
          layout: {},
          paint: {
            'line-color': '#627BC1',
            'line-width': 1,
            'line-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0
            ]
          }
        })


        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })

        map.on('mousemove', 'continent-fills', e => {
          if (e.features.length > 0) {
            if (hoveredContinentId) {
              map.setFeatureState(
                { source: 'continents', id: hoveredContinentId },
                { hover: false }
              )
            }
            if (hoveredContinentId !== e.features[0].id) {
              popup.remove()
            }
            popup
              .setLngLat(e.lngLat)
              .setHTML(`<strong :style="margin:auto">${e.features[0].properties.CONTINENT}</strong><p>一共有20个矿工正在工作</p>`)
              .addTo(map)
            hoveredContinentId = e.features[0].id
            map.setFeatureState(
              { source: 'continents', id: hoveredContinentId },
              { hover: true }
            )
          }
        })

        map.on('mouseleave', 'continent-fills', () => {
          if (hoveredContinentId) {
            map.setFeatureState(
              { source: 'continents', id: hoveredContinentId },
              { hover: false }
            )
          }
          hoveredContinentId = null
          map.getCanvas().style.cursor = ''
          popup.remove()
        })
      })

      // map.on('move', () => {
      //   console.log('A move event occurred.')
      //   console.log(map.getCenter(), map.getZoom())
      // })
    }
  }
}
</script>

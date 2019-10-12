<template>
  <gmap-map :center="center" :zoom="12">
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      @click="clickMarker(m)"
    ></gmap-marker>

    <gmap-info-window
      :opened="infoWindowOpen"
      :position="selectedMarker.position"
      @closeclick="infoWindowOpen = false"
    >Date : {{selectedMarker.Date}}<br>
    Quantité : {{selectedMarker.Quantité}}<br>
    Qualité : {{selectedMarker.Qualité}}<br>
    Humidité : {{selectedMarker.Humidité}}<br>
    Température : {{selectedMarker.Température}}<br>
    Irradiance : {{selectedMarker.Irradiance}}<br></gmap-info-window>
  </gmap-map>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      infoWindowOpen: false,
      selectedMarker: {
        position: { lat: 45.508, lng: -65.587 },
        Date: "2019-09-01 8h35",
        Quantité: "512 L",
        Qualité: "Moyenne",
        Humidité: "90%",
        Température: "18°C",
        Irradiance: "5 Wm2"
      },
      center: { lat: 45.508, lng: -65.587 },
      markers: [
        {
          position: { lat: 45.508, lng: -65.587 },
          Date: "2019-09-01 8h35",
          Quantité: "512 L",
          Qualité: "Moyenne",
          Humidité: "90%",
          Température: "18°C",
          Irradiance: "5 Wm2"
        },
        {
          position: { lat: 45.508, lng: -30.587 },
          Date: "2019-09-01 8h35",
          Quantité: "512 L",
          Qualité: "Moyenne",
          Humidité: "90%",
          Température: "18°C",
          Irradiance: "5 Wm2"
        },
        {
          position: { lat: 45.508, lng: -20.587 },
          Date: "2019-09-01 8h35",
          Quantité: "512 L",
          Qualité: "Moyenne",
          Humidité: "90%",
          Température: "18°C",
          Irradiance: "5 Wm2"
        },
        {
          position: { lat: 45.508, lng: -10.587 },
          Date: "2019-09-01 8h35",
          Quantité: "512 L",
          Qualité: "Moyenne",
          Humidité: "90%",
          Température: "18°C",
          Irradiance: "5 Wm2"
        }
      ]
    };
  },

  mounted() {},

  methods: {
    addMarker(latitude, longitude) {
      const marker = {
        lat: latitude,
        lng: longitude
      };
      this.markers.push({ position: marker });
      this.center = marker;
    },
    clickMarker(marker) {
      this.center = marker.position;
      this.selectedMarker = marker;
      this.infoWindowOpen = true;
    }
  }
};
</script>

<style>
.vue-map-container {
  width: 100% !important;
  height: 100% !important;
}
</style>
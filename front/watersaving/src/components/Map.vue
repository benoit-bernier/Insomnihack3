<template>
  <gmap-map :center="center" :zoom="5">
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
    >
      Nom : {{selectedMarker.name}}
      <br />
      Date : {{selectedMarker.datetime}}
      <br />
      Quantité : {{selectedMarker.quantity}}L
      <br />
      Qualité : {{selectedMarker.quality}}
      <br />
      Humidité : {{selectedMarker.humidity}}
      <br />
      Température : {{selectedMarker.temp}}
      <br />
      Irradiance : {{selectedMarker.irradiance}}
      <br/>
      <br/>
      <v-btn color="success" title="Plus de détails" @click="goToStats(selectedMarker.id)">Plus de détails</v-btn>
    </gmap-info-window>
  </gmap-map>
</template>

<script>
import wellService from "@/services/WellService";
export default {
  name: "GoogleMap",
  data() {
    return {
      infoWindowOpen: false,
      selectedMarker: {
        id: 0,
        position: { lat: 0, lng: 0 },
        name: "",
        datetime: "",
        quantity: "",
        quality: "",
        huidity: "",
        temp: "",
        irradiance: ""
      },
      center: { lat: 0, lng: 0 },
      markers: []
    };
  },

  mounted() {
    wellService.get_all_last().then(result => {
      if (result) {
        result.data.forEach(element => {
          if (element.data != null) {
              element.lat = parseFloat(element.lat);
              element.long = parseFloat(element.long);
            if (this.center.lat == 0) {
              this.center = { lat: element.lat, lng: element.long };
            }

            this.markers.push({
              position: { lat: element.lat, lng: element.long },
              id: element.id,
              name: element.name,
              datetime: element.data.datetime,
              quantity: element.data.quantity,
              quality: element.data.quality,
              humidity: element.data.humidity,
              temp: element.data.temp,
              irradiance: element.data.irradiance
            });
          }
        });
      }
    });
  },

  methods: {
      goToStats(MarkerId){
          localStorage.setItem("propsWellId", MarkerId)
          this.$router.push({ name: 'stats'})
      },
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

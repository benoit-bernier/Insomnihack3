<template>
  <v-container fluid>
    <v-row>
      <v-col style="margin-left:30px;magin-top:30px!important" cols="4">
        <v-row>
          <v-autocomplete
            v-model="name_select"
            style="margin-top: 12px;"
            item-text="name"
            label="Nom du site"
            return-object
            :items="components"
            v-on:change="get_all_detail()"
          ></v-autocomplete>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-select v-model="value" :items="items" label="Graphiques" multiple>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-col>
      <!-- <v-col cols="3">
        <v-row>
          <v-select style="margin-top: 12px;" :items="date_filter" label="Date"></v-select>
        </v-row>
      </v-col>
      -->
    </v-row>
    <apexchart
      ref="chartQuantity"
      v-if="is_show[0]"
      type="line"
      height="300"
      :options="chart_quantity"
      :series="series_quantity"
    />

    <apexchart
      ref="chartQuality"
      v-if="is_show[1]"
      type="line"
      height="300"
      :options="chart_quality"
      :series="series_quality"
    />
    <apexchart
      ref="chartTemperature"
      v-if="is_show[2]"
      type="line"
      height="300"
      :options="chart_temperature"
      :series="series_temperature"
    />
    <apexchart
      ref="chartHumidity"
      v-if="is_show[3]"
      type="line"
      height="300"
      :options="chart_humidity"
      :series="series_humidity"
    />
    <apexchart
      ref="chartIrradiance"
      v-if="is_show[4]"
      type="line"
      height="300"
      :options="chart_irradiance"
      :series="series_irradiance"
    />
  </v-container>
</template>

<script>
import well_service from "@/services/WellService";

export default {
  data() {
    return {
      components: [],
      show: true,
      name_select: {
        name: "",
        id: -1
      },
      date_filter: ["1 an", "6 mois", "1 mois", "Aujourd'hui"],
      items: ["Quantité", "Qualité", "Température", "Humidité", "Irradiance"],
      value: ["Quantité", "Qualité", "Température", "Humidité", "Irradiance"],
      is_show: [true, true, true, true, true],
      series_quantity: [
        {
          name: "Quantité",
          data: []
        }
      ],
      series_quality: [
        {
          name: "Qualité",
          data: []
        }
      ],
      series_temperature: [
        {
          name: "Température",
          data: []
        }
      ],
      series_humidity: [
        {
          name: "Humidité",
          data: []
        }
      ],
      series_irradiance: [
        {
          name: "irradiance",
          data: []
        }
      ],
      chart_quality: {
        chart: {
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Qualité de l'eau",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#c3c3c3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      },
      chart_quantity: {
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Quantité en litres",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#c3c3c3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      },
      chart_temperature: {
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Température en °C",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#c3c3c3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      },
      chart_humidity: {
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Humidité en %",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#c3c3c3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      },
      chart_irradiance: {
        chart: {
          height: 350,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Irradiance en W/m²",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#c3c3c3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      }
    };
  },
  created() {
    this.$store.dispatch("changeToolbarState", "Statistiques");
    if (localStorage.getItem("propsWellId") != null) {
      if (parseInt(localStorage.getItem("propsWellId"))) {
        this.name_select.id = parseInt(localStorage.getItem("propsWellId"));
        this.get_all_detail();
        localStorage.removeItem("propsWellId");
      }
    }
    this.get_all_name();
    this.$options.sockets.onmessage = ms => {
      var resp = JSON.parse(ms.data);
      console.log("new entry :" + resp);
      if (
        resp.alert[0] != "nodata" &&
        resp.data.sensor_id == this.name_select.id
      ) {
        if(this.series_quantity[0].data.length == 10){
        this.series_quantity[0].data.shift();
        this.series_quality[0].data.shift();
        this.series_temperature[0].data.shift();
        this.series_humidity[0].data.shift();
        this.series_irradiance[0].data.shift();
        }
        this.series_quantity[0].data.push({
          x: resp.data.datetime,
          y: resp.data.quantity
        });
        this.series_quality[0].data.push({
          x: resp.data.datetime,
          y: resp.data.quality
        });
        this.series_temperature[0].data.push({
          x: resp.data.datetime,
          y: resp.data.temp
        });
        this.series_humidity[0].data.push({
          x: resp.data.datetime,
          y: resp.data.humidity
        });
        this.series_irradiance[0].data.push({
          x: resp.data.datetime,
          y: resp.data.irradiance
        });
      }
      this.$refs.chartQuantity.updateSeries([
        { data: this.series_quantity[0].data }
      ]);
      this.$refs.chartQuality.updateSeries([
        { data: this.series_quality[0].data }
      ]);
      this.$refs.chartTemperature.updateSeries([
        { data: this.series_temperature[0].data }
      ]);
      this.$refs.chartHumidity.updateSeries([
        { data: this.series_humidity[0].data }
      ]);
      this.$refs.chartIrradiance.updateSeries([
        { data: this.series_irradiance[0].data }
      ]);
    };
  },
  methods: {
    async get_all_name() {
      await well_service.get_all_name().then(resp => {
        if (this.name_select.id != -1) {
          resp.data.forEach(data => {
            if (data.id == this.name_select.id) {
              this.name_select.name = data.name;
            }
          });
        }
        this.components = resp.data;
      });
    },
    async get_all_detail() {
      await well_service.get_all_data(this.name_select.id).then(response => {
        this.series_quantity[0].data = [];
        this.series_quality[0].data = [];
        this.series_temperature[0].data = [];
        this.series_humidity[0].data = [];
        this.series_irradiance[0].data = [];
        response.data.data.forEach(element => {
          this.series_quantity[0].data.push({
            x: element.datetime,
            y: element.quantity
          });
          this.series_quality[0].data.push({
            x: element.datetime,
            y: element.quality
          });
          this.series_temperature[0].data.push({
            x: element.datetime,
            y: element.temp
          });
          this.series_humidity[0].data.push({
            x: element.datetime,
            y: element.humidity
          });
          this.series_irradiance[0].data.push({
            x: element.datetime,
            y: element.irradiance
          });
        });
        let tempValue = this.value;
        this.value = [];
        setTimeout(() => {
          this.value = tempValue;
        }, 0.0001);
      });
    }
  },

  watch: {
    value() {
      this.items.forEach((element, index) => {
        this.is_show[index] = this.value.includes(element);
      });
    }
  }
};
</script>
<style>
.apexcharts-menu-icon {
  display: none;
}
</style>

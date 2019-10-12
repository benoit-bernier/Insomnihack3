<template>
<v-container fluid>
    <v-row>
      <v-col style="margin-left:30px;magin-top:30px!important" cols="4">
        <v-row>
            <v-autocomplete
            style="margin-top: 12px;"
            label="Nom du site"
            :items="components"
            ></v-autocomplete>       
        </v-row>
      </v-col>
      <v-col cols="4">
           <v-select
            v-model="value"
            :items="items"
            label="Graphiques"
            multiple
            >
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                <span>{{ item }}</span>
                </v-chip>
                <span
                v-if="index === 1"
                class="grey--text caption"
                >(+{{ value.length - 1 }} others)</span>
            </template>
        </v-select>
      </v-col>
      <v-col cols="3">
        <v-row>
            <v-select
            style="margin-top: 12px;"
            :items="date_filter"
            label="Date"
            ></v-select>     
        </v-row>
      </v-col>
    </v-row>
    <apexchart v-if="is_show[0]" type="line" height="300" :options="chartOptions" :series="series_quantity" />
    <apexchart v-if="is_show[1]" type="line" height="300" :options="chartOptions" :series="series_quality" />
    <apexchart v-if="is_show[2]" type="line" height="300" :options="chartOptions" :series="series_temparature" />
    <apexchart v-if="is_show[3]" type="line" height="300" :options="chartOptions" :series="series_humidity" />
    <apexchart v-if="is_show[4]" type="line" height="300" :options="chartOptions" :series="series_irradiance" />

  </v-container>
</template>

<script>
export default {
  data() {
    return {
        components: [
          'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
        ],
        date_filter:['1 ans','6 mois','1 mois','Aujourd\'hui'],
        items: ['Quantité', 'Qualité', 'Température', 'Humidité','Irradiance'],
        value: ['Quantité', 'Qualité', 'Température', 'Humidité','Irradiance'],
        is_show:[true,true,true,true,true],
        series_quantity: [{
            name: "Quantité",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        series_quality: [{
            name: "Qualité",
            data: [1, 2, 3, 5, 4, 5, 2, 1, 1]
        }],
        series_temparature: [{
            name: "Température",
            data: [25, 27, 22, 30, 35, 32, 31, 26, 37]
        }],
        series_humidity: [{
            name: "Humidité",
            data: [85, 96, 79, 84, 98, 65, 69, 91, 78]
        }],
        series_irradiance: [{
            name: "irradiance",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
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
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        }
    };
  },

  watch: {
    value() {
        this.items.forEach((element, index)=>{this.is_show[index] = this.value.includes(element)})
    }
  }
};
</script>
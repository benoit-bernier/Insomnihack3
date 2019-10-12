  
<template>
   <v-card style="margin:20px">
    <v-card-title>
      Gestions des capteurs
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Recherche"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    :headers="headers" :items="items" :search="search" 
    class="elevation-1"
  >
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>

  </v-card>
</template>

<script>
  export default {
  
    data: () => ({
 search: '',
        headers: [
          {
            text: 'Noms',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Latitude', value: 'latitude' },
          { text: 'Longitude', value: 'longitude' },
          { text: 'Actions', value: 'action', sortable: false }
        ],
        items: [
          {
            name: 'Gingerbread',
            longitude: 356,
            latitude: 16.0,
          },
          {
            name: 'Jelly bean',
            longitude: 375,
            latitude: 0.0,
          },
          {
            name: 'Lollipop',
            longitude: 392,
            latitude: 0.2,
          },
          {
            name: 'Honeycomb',
            longitude: 408,
            latitude: 3.2,
          },
          {
            name: 'Donut',
            longitude: 452,
            latitude: 25.0,
          },
          {
            name: 'KitKat',
            longitude: 518,
            latitude: 26.0,
          },
        ],
      
    }),
    methods:{

    }
  }
</script>
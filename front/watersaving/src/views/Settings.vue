  
<template>
   <v-card style="margin:20px">
    <v-card-title>
      Gestions des puits
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
        @click="dialog_edit = true"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="dialog_delete=true"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
   <v-dialog
      v-model="dialog_delete"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">Suppression d'un puit</v-card-title>
        <div style="display:block;height:4px;background-color:red; margin-bottom:20px"></div>

        <v-card-text>
          Etes-vous sur de vouloir supprimer ce puit ?
        </v-card-text>

        <v-card-actions style="margin-top:-10px">
          <div class="flex-grow-1"></div>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog_delete = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog_delete = false"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


     <v-dialog v-model="dialog_edit" persistent max-width="600px">

      <v-card>
        <v-card-title>
          <span class="headline">Edition d'un puit</span>
        </v-card-title>
          <div style="display:block;height:4px;background-color:green; margin-bottom:20px"></div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID référent*" :value="well.id" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nom*" type="text" :value="well.name" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="Latitude*" type="text" :value="well.latitude" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="Longitude*" type="text" :value="well.longitude" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog_edit = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="dialog_edit = false">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-card>


  
</template>

<script>
  export default {
  
    data: () => ({
      dialog_delete: false,
      dialog_edit: false,
      well:{
        'id': '',
        'name': '',
        'latitude': '',
        'longitude': '',
      },
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
            id: 124,
            name: 'Gingerbread',
            longitude: 356,
            latitude: 16.0,
          },
          {
            id: 145,
            name: 'Jelly bean',
            longitude: 375,
            latitude: 0.0,
          },
          {
            id: 14,
            name: 'Lollipop',
            longitude: 392,
            latitude: 0.2,
          },
          {
            id: 12,
            name: 'Honeycomb',
            longitude: 408,
            latitude: 3.2,
          },
          {
            id: 4,
            name: 'Donut',
            longitude: 452,
            latitude: 25.0,
          },
          {
            id: 2,
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
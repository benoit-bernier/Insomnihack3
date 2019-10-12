  
<template>
  <v-card style="margin:20px">
    <v-card-title>
      Gestion des puits 
      <v-btn style="margin-left:10px;color:white" @click="reset_open()" color="blue">Créer</v-btn>

      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Recherche"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="edit_well(item)">mdi-pencil</v-icon>
        <v-icon  style="margin-left:10px" @click="delete_b_well(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" >Reset</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog_delete" max-width="350">
      <v-card>
        <v-card-title class="headline">Suppression d'un puit</v-card-title>
        <div style="display:block;height:4px;background-color:red; margin-bottom:20px"></div>

        <v-card-text>Etes-vous sûr de vouloir supprimer ce puit ?</v-card-text>
        <v-card-actions style="margin-top:-10px">
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog_delete = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="delete_well()">Valider</v-btn>
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
                <v-text-field :disabled="false" label="ID référent*" v-model="well.id" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nom*" type="text" v-model="well.name" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="lat*" type="text" v-model="well.lat" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="long*" type="text" v-model="well.long" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog_edit = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="update_well()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_create" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Création d'un puit</span>
        </v-card-title>
        <div style="display:block;height:4px;background-color:blue; margin-bottom:20px"></div>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ID référent*" v-model="well.id" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nom*" type="text" v-model="well.name" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="lat*" type="text" v-model="well.lat" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="long*" type="text" v-model="well.long" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog_create = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="create_well()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-snackbar
      v-model="snackbar_error"
      color="red"
    >
      {{ text_snack }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar_success"
      color="green"
    >
      {{ text_snack }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import well_service from "@/services/WellService";

export default {
  data: () => ({
    dialog_delete: false,
    dialog_edit: false,
    dialog_create: false,
    snackbar_error: false,
    snackbar_success: false,
    text_snack: "",
    well: {
      id: "",
      name: "",
      lat: "",
      long: "",
    },
    search: "",
    headers: [
      { text: "ID Référent", value: "id" },
      {
        text: "Noms",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Latitude", value: "lat" },
      { text: "Longitude", value: "long" },
      { text: "Actions", value: "action", sortable: false }
    ],
    items: []
  }),
  created() {
    this.$store.dispatch("changeToolbarState", "Paramètres")
    this.get_all_well();
  },
  methods: {
    reset_open(){
      this.dialog_create = true
    },
    async create_well(){
      await well_service.post_well(this.well).then(response => {
        if(response.data.status){
          this.text_snack = "Succès de la création du puit"
          this.snackbar_success = true
          setInterval(function(){this.snackbar_success = false }, 500);
          this.items.push(this.well)
        }else{
          this.text_snack = "Erreur de la création du puit"
          this.snackbar_error = true
          setInterval(function(){this.snackbar_error = false }, 500);
        }
      });
      this.dialog_create = false
    },
    edit_well(item){
      this.well = item
      this.dialog_edit = true
    },
    delete_b_well(item){
      this.well = item
      this.dialog_delete=true
    },
    async get_all_well() {
      await well_service.get_all_detail().then(response => {
        response.data.forEach(element => {
          this.items.push({
            'name': element.name,
            'id': element.id,
            'lat': element.lat,
            'long': element.long
          })  
        });
      });
    },
    async update_well() {
      await well_service.put_well(this.well).then(response => {
        if(response.data.status){
          this.text_snack = "Succès de la modification du puit"
          this.snackbar_success = true
          setInterval(function(){this.snackbar_success = false }, 500);
        }else{
          this.text_snack = "Erreur de la modification du puit"
          this.snackbar_error = true
          setInterval(function(){this.snackbar_error = false }, 500);
        }
      });
      this.dialog_edit = false

    },
    async delete_well() {
      await well_service.delete_well(this.well.id).then(response => {
        if(response.data.status){
          let tamp = []
          this.items.forEach(element =>{
            if(element.id != this.well.id){
              tamp.push(element)
            }
          })
          this.items = tamp
          this.text_snack = "Succès de la suppression du puit"
          this.snackbar_success = true
          setInterval(function(){this.snackbar_success = false }, 500);
        }else{
          this.text_snack = "Erreur de la suppression du puit"
          this.snackbar_error = true
          setInterval(function(){this.snackbar_error = false }, 500);
        }
        this.dialog_delete = false

      });
    }
  }
};
</script>

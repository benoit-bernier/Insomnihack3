  
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
    </v-row>
    <v-row>
      <v-col cols="4">
       <v-card
          class="mx-auto"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h3>Materiel sur place</h3></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <div style="display:block;height:4px;background-color:green; margin-bottom:20px"></div>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Version logiciel : 1.2.6</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Version materiel : 0.2.9</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="mx-auto"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h3>Données démographiques</h3></v-list-item-title>
            </v-list-item-content>
          </v-list-item>        
          <div style="display:block;height:4px;background-color:green; margin-bottom:20px"></div>


          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Adultes</v-list-item-title>
              <v-list-item-subtitle>1681 personnes</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Enfants</v-list-item-title>
              <v-list-item-subtitle>
                141 personnes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="mx-auto"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h3>Note d'installation</h3></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <div style="display:block;height:4px;background-color:green; margin-bottom:20px"></div>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>- Ajout d'un renfort</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>- Ajout d'une antenne plus puissante</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item four-line>
            <v-list-item-content>
              <v-list-item-title>- Terrain peu dégagé</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import well_service from "@/services/WellService";

export default {
  data(){
    return {
      components: [],
      history:{
        'id': 0,
        'nbrHabitant': 0,
        'nbrChildren':0,
        'note':[
            "tesyt",
            "test"
        ],
      },
          name_select: {
            id:0,
            name: ''
          }
    }
  },
  created() {
    this.get_all_name();
    this.$store.dispatch("changeToolbarState", "Historique")
  },
  methods: {
    async get_all_name() {
      await well_service.get_all_name().then(response => {
        this.components = response.data;
      });
    },
    async get_all_detail() {    
     /* await well_service.get_all_history(this.name_select.id).then(response => {

      });
      */
    }
  }
};
</script>
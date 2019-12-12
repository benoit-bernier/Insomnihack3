  
<template>
  <v-container fluid>
    <v-row>
      <v-col style="margin-left:30px;magin-top:30px!important" cols="4">
        <v-row>
          <v-autocomplete
            v-model="current_well"
            style="margin-top: 12px;"
            item-text="name"
            label="Nom du site"
            return-object
            :items="components"
            v-on:change="change_history()"
          ></v-autocomplete>
          <v-btn style="margin-left:10px;color:white" @click="open()" color="blue">Modifier</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto" tile>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>Materiels déployés</h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div style="display:block;height:4px;background-color:#44A4FF; margin-bottom:20px"></div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Version logiciel : {{well.history.stuff.software_version}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Version materiel : {{well.history.stuff.hardware_version}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto" tile>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>Données démographiques</h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div style="display:block;height:4px;background-color:#44A4FF; margin-bottom:20px"></div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Adultes</v-list-item-title>
                  <v-list-item-subtitle>{{well.history.data_person.adult}} personnes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Enfants</v-list-item-title>
                  <v-list-item-subtitle>{{well.history.data_person.child}} personnes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto" tile>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>Données budgétaires</h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div style="display:block;height:4px;background-color:#44A4FF; margin-bottom:20px"></div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Terrasement : {{ well.history.costing.earthwork }} €</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Construction : {{ well.history.costing.build }} €</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Transport : {{ well.history.costing.transport }} €</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto" tile>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>Note d'installation</h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <div style="display:block;height:4px;background-color:#44A4FF; margin-bottom:20px"></div>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>- Ajout d'un renfort</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog_update " persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Information du site</span>
        </v-card-title>
        <div style="display:block;height:4px;background-color:#44A4FF; margin-bottom:20px"></div>
        <v-card-text>
          <v-container>
            <h3>Matériels déployés</h3>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Software version"
                  v-model="well.history.stuff.software_version"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Hardware version"
                  type="text"
                  v-model="well.history.stuff.hardware_version"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>Données démographiques</h3>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Nombre d'adult"
                  type="text"
                  v-model="well.history.data_person.adult"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Nombre d'enfant"
                  type="text"
                  v-model="well.history.data_person.child"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>Notes sur l'installation</h3>
            <v-row v-for="comment in comments" :key="comment">
              <v-col cols="10">
                <v-text-field
                  label="Construction"
                  type="text"
                  v-model="well.history.costing.build"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn color="blue darken-1" text @click="add()" >Ajouter</v-btn>
              </v-col>
            </v-row>

            <h3>Coût de l'installation</h3>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Terrasement"
                  type="text"
                  v-model="well.history.costing.earthwork"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Construction"
                  type="text"
                  v-model="well.history.costing.build"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Transport"
                  type="text"
                  v-model="well.history.costing.transport"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog_update  = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="update()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar_error" color="red">
      {{ text_snack }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar_success" color="green">
      {{ text_snack }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import well_service from "@/services/WellService";

export default {
  data() {
    return {
      dialog_update: false,
      components: [{}],
      comments: [],
      snackbar_error: false,
      snackbar_success: false,
      text_snack: "",
      current_well: {
        id: ""
      },

      well: {
        id: "",
        name: "",
        lat: "",
        long: "",
        history: {
          stuff: {
            software_version: "1.1.1",
            hardware_version: "1.1.1"
          },
          data_person: {
            adult: 0,
            child: 0
          },
          comment: [],
          costing: {
            earthwork: 0,
            build: 0,
            transport: 0
          }
        }
      }
    };
  },
  created() {
    this.get_all_name();
    this.$store.dispatch("changeToolbarState", "Historique");
  },
  methods: {
    open() {
      this.dialog_update = true;
    },
    async update() {
      console.log("WELL : " + JSON.stringify(this.well));
      await well_service.put_well(this.well).then(response => {
        console.log("rep : " + JSON.stringify(response));
        if (response.data.status) {
          this.text_snack = "Succès de la modification du puit";
          this.snackbar_success = true;
          setInterval(function() {
            this.snackbar_success = false;
          }, 500);
          this.dialog_update = false;
        } else {
          this.text_snack = "Erreur de la modification du puit";
          this.snackbar_error = true;
          setInterval(function() {
            this.snackbar_error = false;
          }, 500);
        }
      });
      this.dialog_edit = false;
    },
    async get_all_name() {
      await well_service.get_all_name().then(response => {
        this.components = response.data;
      });
    },
    add(){
      this.comment.push({})
    },
    change_history() {
      this.well = this.current_well;
    }
  }
};
</script>
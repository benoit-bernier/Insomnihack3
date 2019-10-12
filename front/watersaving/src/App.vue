  
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list dense>
        <v-list-item v-for="item in alarms" :key="item.id" @click.stop="dialog = true">
          <v-list-item-action>
            <v-icon v-if="item.level == 0" color="yellow">mdi-alert</v-icon>
            <v-icon v-if="item.level == 1" color="red">mdi-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-title>Date: {{ item.date }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="light-blue accent-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{toolBarState}}</v-toolbar-title>
      <div class="flex-grow-1"></div>
       <v-badge style="margin-right:20px">
        <template v-slot:badge>{{ nb_alarms }}</template>
         <v-icon @click.stop="drawerRight = !drawerRight">mdi-bell</v-icon>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-img style="margin-top:10px" src="./assets/logo_water.jpeg"></v-img>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item style="margin-bottom:10px" @click="change_route('map')">
          <v-list-item-action>
            <v-icon>mdi-google-maps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Carte</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item style="margin-top:10px;margin-bottom:10px" @click="change_route('stats')">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Statistiques</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-divider></v-divider>
        <v-list-item style="margin-top:10px" @click="change_route('settings')">
          <v-list-item-action>
            <v-icon>mdi-settings-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Paramètres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

    </v-navigation-drawer>



    <v-content>
      <router-view/>
    </v-content>    

    <template>
 

    <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <v-card>
          <v-card-title class="headline">Détail site Lalibela </v-card-title>
          <v-card-text>
            <v-alert type="warning">
              Nous avons pu detecter un problème au niveau de la qualité
            </v-alert>
            <template>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Date</th>
                      <th class="text-left">Quantité</th>
                      <th class="text-left">Qualité</th>
                      <th class="text-left">Humidité</th>
                      <th class="text-left">Température</th>
                      <th class="text-left">Irradiance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2019-09-01 8h35</td>
                      <td>512 L</td>
                      <td>Moyenne</td>
                      <td>90%</td>
                      <td>18°C</td>
                      <td>55 Wm2</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              color="blue darken-2"
              text
              @click="dialog = false"
            >
              Fermer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>


    <v-footer
      app
      color="light-blue accent-2"
      class="white--text"
    >
      <span>M'hackron</span>
      <div class="flex-grow-1"></div>
      <span>&copy; Parceque c'est notre projet</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      alarms:[
        {
          'id': 0,
          'level': 0,
          'name': 'Test alarmes',
          'date': '2019-01-01 8h35'
        },
        {
          'id': 1,
          'level': 1,
          'name': 'Test alarmes',
          'date': '2019-01-01 8h35'
        }
      ]
    }),
    methods:{
      change_route(value){
       this.$router.push(value)
      }
    },
    computed:{
      toolBarState() {
        return this.$store.getters.toolbarState
      },
      nb_alarms(){
        return this.alarms.length
      }
    }
  }
</script>
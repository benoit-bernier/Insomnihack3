  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isAuth" v-model="drawerRight" app clipped right>
      <div v-if="alarms.length == 0">
        <p style="margin:auto;margin-top:10px; ">Il n'y pas d'alarmes</p>
      </div>
      <v-list v-else dense>
        <v-list-item v-for="item in alarms" :key="item.id" @click="show_notif(item)">
          <v-list-item-action>
            <v-icon v-if="item.level == 1" color="yellow">mdi-alert</v-icon>
            <v-icon v-else-if="item.level == 2" color="orange">mdi-alert</v-icon>
            <v-icon
              v-else-if="item.level == 3 && item.alert[0] != 'la connexion'"
              color="red"
            >mdi-alert</v-icon>
            <v-icon v-else-if="item.alert[0] == 'la connexion'" color="black">mdi-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-title>Date: {{ item.date }}</v-list-item-title>
            <v-list-item-title>
              Motif:
              <span>{{item.alert[0]}}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="light-blue accent-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isAuth"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="isAuth">{{toolBarState}}</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" v-if="isAuth">
            <v-icon @click="logout()">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Déconnexion</span>
      </v-tooltip>

      <v-badge style="margin-right:20px" v-if="isAuth">
        <template v-slot:badge>{{ nb_alarms }}</template>
        <v-icon @click.stop="drawerRight = !drawerRight">mdi-bell</v-icon>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuth" v-model="drawer" app>
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
        <v-list-item style="margin-top:10px;margin-bottom:10px" @click="change_route('history')">
          <v-list-item-action>
            <v-icon>mdi-card-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Historique</v-list-item-title>
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
      <router-view />
    </v-content>
    <template>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="headline">Détail site {{ current_alarm.name }}</v-card-title>
          <v-card-text>
            <v-alert
              type="warning"
            >Nous avons pu detecter un problème au niveau de {{ current_alarm.alert[0] }}</v-alert>
            <template>
              <v-simple-table v-if="!current_alarm.is_down">
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
                      <td>{{ current_alarm.name }}</td>
                      <td>{{ current_alarm.quantity }}</td>
                      <td>{{ current_alarm.quality }}</td>
                      <td>{{ current_alarm.humidity }}</td>
                      <td>{{ current_alarm.temp }}</td>
                      <td>{{ current_alarm.irradiance }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-2" text @click="dialog = false">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-snackbar
      style="margin-right:60px"
      v-model="snackbar"
      :timeout="timeout"
      top="top"
      right="right"
    >
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>

    <v-footer app color="light-blue accent-2" class="white--text">
      <span>M'hackron</span>
      <div class="flex-grow-1"></div>
      <span>&copy; Parceque c'est notre projet</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    current_alarm: {
      name: "Alertes en Libie",
      level: 2,
      humidity: 90,
      irradiance: 152,
      quality: 1,
      quantity: 152,
      sensor_id: 15,
      temp: 20,
      date: "2019 09 03 8h35",
      alert: ["Humidité"]
    },
    snackbar: false,
    text: "",
    timeout: 4000,
    alarms: []
  }),
  created() {
    this.connectAndListenWS();
  },
  watch: {
    isAuth: function() {
      this.connectAndListenWS();
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    connectAndListenWS() {
      console.log("connectAndListenWS");
      if (this.isAuth) {
        this.$connect("ws://"+process.env.VUE_APP_SERVER_URL+":3001/", { format: "json" });
        this.$socket.onopen = () => {
          this.$socket.sendObj({ token: this.$store.getters.AccessToken }); //send the jwt
        };
        this.$options.sockets.onmessage = ms => {
          var resp = JSON.parse(ms.data);
          console.log(resp);
        
          let tempArrayAlert = [];
          resp.alert.forEach(elt => {
            switch (elt) {
              case "quantity":
                tempArrayAlert.push("la quantité d'eau");
                break;
              case "quality":
                tempArrayAlert.push("la qualité de l'eau");
                break;
              case "temp":
                tempArrayAlert.push("la température");
                break;
              case "humidity":
                tempArrayAlert.push("l'humidité");
                break;
              case "irradiance":
                tempArrayAlert.push("l'irradiance");
                break;
              case "nodata":
                tempArrayAlert.push("la connection");
            }
          });
          if (resp.alert[0] == "nodata") {
              (this.snackbar = true),
            (this.text = "Nouvelle alerte detectée " + resp.name);
            this.alarms.push({
              is_down: true,
              name: resp.name,
              level: resp.level,
              date: resp.datetime,
              alert: tempArrayAlert
            });
          } else if(resp.alert[0] != "none") {
              (this.snackbar = true),
            (this.text = "Nouvelle alerte detectée " + resp.name);
            this.alarms.push({
              name: resp.name,
              level: resp.level,
              date: resp.data.datetime,
              humidity: resp.data.humidity,
              irradiance: resp.data.irradiance,
              quality: resp.data.quality,
              quantity: resp.data.quantity,
              sensor_id: resp.data.sensor_id,
              temp: resp.data.temp,
              alert: tempArrayAlert
            });
          }
        };
      } else {
        this.$disconnect();
      }
    },
    change_route(value) {
      this.$router.push(value);
    },
    show_notif(value) {
      this.current_alarm = value;
      this.dialog = true;
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    toolBarState() {
      return this.$store.getters.toolbarState;
    },
    nb_alarms() {
      return this.alarms.length;
    }
  }
};
</script>
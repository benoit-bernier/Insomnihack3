<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm5 class="lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card>
            <v-layout row justify-center>
              <v-flex xs10 ma-4>
                <div v-if="!isAuth">
                  <h3 class="headline mb-0">Connexion</h3>
                  <v-form>
                    <v-text-field v-model="user.username" label="Username ou email" name= "Username ou email" v-validate="'required'" :error-messages="errors.collect('Username ou email')" v-on:keyup.enter="onSubmit()"></v-text-field>
                    <v-text-field v-model="user.password" label='Mot de passe' name= "mot de passe" type="password" v-validate="'required'" ref="mot de passe" :error-messages="errors.collect('mot de passe')" v-on:keyup.enter="onSubmit()"></v-text-field>
                      <v-btn mb-4 @click="onSubmit()" >Connexion</v-btn>
                  </v-form>
                </div>
                <div v-if="isAuth">
                  <h3 class="headline mb-0">Bienvenue !</h3>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      snackbar : false,
      color:"success",
      timeout : 4000,
      text : "",
      user :{
        username :"",
        password :""
      }
    }
  },
  mounted(){
    if (this.isAuth){
      this.$router.push("/home")
    }
  },
  methods: {
    onSubmit(){
      this.$validator.validate().then(result => {
        if(result) this.login()
      })
    },
    login: function () {
      let username = this.user.username
      let password = this.user.password
      this.$store.dispatch('login', {username, password})
        .then((res) => {
          if(!res.data.success){
            this.text = "connexion refusée : "+res.data.errorMessage
            this.color = 'error'
            this.snackbar = true
          }
          else{
            this.$router.push('/home')
          }
        })
        .then(this.fillOutForm)
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    },
    fillOutForm () {
      this.user.username = ''
      this.user.password = ''
    }
  },
  computed: {
    isAuth: function () {
      return this.$store.getters.isAuth
    }
  }
}
</script>
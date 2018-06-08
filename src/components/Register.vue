<template>

    <v-app id="inspire" dark>

      <v-toolbar app fixed clipped-right>
        <v-toolbar-title>CryptoChecker</v-toolbar-title>
      </v-toolbar>

      <v-content>
          <v-btn  to="/" block color="blue-grey darken-1" dark >the list of cryptocurrencies</v-btn>
          <br>
          <v-btn  to="/login" block color="teal" dark >log into existing acount</v-btn>
          <v-btn   block color="primary" dark  >create your account</v-btn>

          <v-layout row justify-center>

              <v-form @submit.prevent="submit" v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          required
                  ></v-text-field>
                  <v-alert outline type="success" :value="success">
                      {{message}}
                  </v-alert>
                  <v-alert outline type="error" :value="error">
                      {{error1}}
                  </v-alert>
                  <v-btn color="primary" block type="submit" :disabled="!valid" >create</v-btn>
                  <v-btn block @click="clear">clear</v-btn>
              </v-form>


          </v-layout>

      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>

</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    success: false,
    error: false,
    message: '',
    error1: '',

    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('register', {
          email: this.email
        }).then(result => {
          if(result.data.message) {
            this.message = result.data.message
            this.success = true
          }else if(result.data.error.email[0]){
          this.error1 = result.data.error.email[0]
          this.error = true}
        })
      }
    },

    clear() {
      this.$refs.form.reset()
      this.message = ''
      this.error1 = ''
      this.error = false
      this.success = false
    }
  }
}



</script>

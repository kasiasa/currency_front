<template>
    <v-app id="inspire" dark>

        <v-toolbar app fixed clipped-right>
            <v-toolbar-title>CryptoChecker</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-btn  to="/" block color="blue-grey darken-1" dark >the list of cryptocurrencies</v-btn>
            <br>
            <v-btn to="/register" block color="primary" dark >create your account</v-btn>
            <v-btn  to="/login" block color="teal" dark >log into existing acount</v-btn>

            <v-layout row justify-center>
                <v-form @submit.prevent="submit" v-model="valid" ref="form" lazy-validation>

                    <v-text-field
                            label="E-mail"
                            v-model="email"
                            :rules="emailRules"
                            required
                    ></v-text-field>

                    <v-text-field
                            name="input-10-1"
                            label="Password"
                            v-model="password"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e1 = !e1)"
                            :type="e1 ? 'password' : 'text'"
                            :rules="passwordRules"
                            required
                    ></v-text-field>
                    <v-alert outline type="error" :value="error">
                        {{error1}}
                    </v-alert>
                    <v-btn
                            color="teal"
                            type="submit"
                            :disabled="!valid"
                    >
                        log in
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>

                </v-form>
            </v-layout>
            <br>
            <v-layout row justify-center>
                <v-btn to="/reset" flat color="blue-grey darken-1" >Forgot Your Password?</v-btn>
            </v-layout>
        </v-content>

    </v-app>
</template>

<script>
  export default {
    name: "Login",

    data: () => ({
      error: false,
      error1:'',

      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      e1: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required']
    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          axios.post('login', {
            email: this.email,
            password: this.password
          }).then(result => {
            localStorage.setItem('token', result.data.access_token)
            this.$router.push({path:'/currencies'})
          }).catch(error => {
            if(error.response.data.error){
              this.error1 = error.response.data.error
              this.error = true
            };
          })
        }
      },
      clear() {
        this.$refs.form.reset()
        this.error = false
      }
    },
    created () {
      if(this.$route.params.error) {
        this.error = true,
        this.error1 = 'Incorrect login or password'
      }
    }
  }
</script>

<style scoped>

</style>
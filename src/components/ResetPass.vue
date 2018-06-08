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
                <br>


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
                        <v-btn
                                color="blue-grey darken-1"
                                type="submit"
                                :disabled="!valid"
                                block
                        >
                            send password reset link
                        </v-btn>
                        <v-btn block @click="clear">clear</v-btn>
                    </v-form>
                </v-layout>


            </v-content>

        </v-app>


</template>

<script>
  export default {
    name: "ResetPass",

    data: () => ({
      valid: true,
      success: false,
      error: false,
      message: 'A password reset link has been sent to your email address!',
      error1: 'You are not registered',

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          axios.post('password/email', {
            email: this.email,
          }).then(result => {
            if(result.data.send === 1){
              this.error = false
              this.success = true}
              else{
              this.success = false
              this.error = true
            }

          })
        }
      },
      clear() {
        this.$refs.form.reset()
        this.success = false
        this.error = false
      }
    }
  }
</script>

<style scoped>

</style>
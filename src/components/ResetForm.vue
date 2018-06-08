<template>

        <v-app id="inspire" dark>

            <v-toolbar app fixed clipped-right>
                <v-toolbar-title>CryptoChecker</v-toolbar-title>
            </v-toolbar>

            <v-content>
                <v-btn  to="/" block color="blue-grey darken-1" dark >the list of cryptocurrencies</v-btn>
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
                                label="Enter your new password"
                                hint="At least 6 characters"
                                v-model="password"
                                min="6"
                                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (e1 = !e1)"
                                :type="e1 ? 'password' : 'text'"
                                counter
                                :rules="passwordRules"
                                required
                        ></v-text-field>
                        <v-text-field
                                name="input-10-1"
                                label="Confirm your new passsword"
                                hint="At least 6 characters"
                                v-model="password_confirmation"
                                min="6"
                                :append-icon="e2 ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (e2 = !e2)"
                                :type="e2 ? 'password' : 'text'"
                                counter
                                :rules="password_confirmationRules"
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
                            reset password
                        </v-btn>
                        <v-btn block @click="clear">clear</v-btn>
                    </v-form>
                </v-layout>

            </v-content>
        </v-app>
</template>

<script>
  export default {
    name: "ResetForm",
    data: () => ({
      success: false,
      error: false,
      message: 'Your password has been reset successfully!',
      error1: '',

      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      e1: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'],

      e2: true,
      password_confirmation: '',
      password_confirmationRules: [
        v => !!v || 'Confirmation is required']

    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {

          axios.post('password/reset', {
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.$route.params.token
          }).then(result => {
              if(result.data.status == 1){
                this.error = false
                this.success = true
              }
          }).catch(error => {
            if(error.response.data.message){
              this.error1 = error.response.data.message
              this.error = true
              this.success = false
            };
          })
        }
      },
      clear() {
        this.$refs.form.reset()
        this.error = false
        this.success = false
      }
    }
  }
</script>

<style scoped>

</style>
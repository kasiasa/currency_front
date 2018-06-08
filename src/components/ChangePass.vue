<template>

        <v-content>

            <v-layout row justify-center>
                <v-form @submit.prevent="submit" v-model="valid" ref="form" lazy-validation>

                    <v-text-field
                            name="input-10-1"
                            label="Enter your new password"
                            hint="At least 6 characters"
                            v-model="password1"
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
                            label="Confirm your new password"
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
                       change password
                    </v-btn>
                    <v-btn block @click="clear">clear</v-btn>

                </v-form>
            </v-layout>
        </v-content>

</template>

<script>
  export default {
    name: "changepass",
    data: () => ({

      success: false,
      error: false,
      message: '',
      error1: '',

      valid: true,
      e1: true,
      password1: '',
      passwordRules: [v => !!v || 'Password is required'],

      e2: true,
      password_confirmation: '',
      password_confirmationRules: [v => !!v || 'Password is required'],

    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          axios.post('change', {
            password: this.password1,
            password_confirmation: this.password_confirmation
          }).then(result => {
              if(result.data.message){
                this.message = result.data.message
                this.success = true
                this.error = false
              }
              if(result.data.error.password){
                this.error1 = result.data.error.password[0]
                this.error = true
                this.success = false
              }
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


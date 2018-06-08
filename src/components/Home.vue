<template>
    <v-app id="inspire" dark>

        <v-toolbar app fixed clipped-right>
            <v-toolbar-title>CryptoChecker</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-btn  to="/login" block color="teal" dark >log into existing acount</v-btn>
            <v-btn  to="/register" block color="primary" dark  >create your account</v-btn>
            <currencies admin="0"/>

        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
  import env from './../env'
  import Currencies from '@/components/Currencies'


  export default {
    components: {
      Currencies
    },
    name: 'Home',
    data() {
      return {
        loading: true,
      }
    }
  }
</script>
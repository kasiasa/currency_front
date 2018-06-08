<template>
  <v-app id="inspire" dark>
    <div v-if="$store.state.loading" class="loading">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <br>
      <v-btn  @click="logout" block color="teal" >log out</v-btn>
      <br>
      <v-list>


        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CryptoChecker</v-toolbar-title>

    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      fixed: false,
      test123: '',
      loading: false,
      items: [
        {
          icon:'perm_identity',
          title: 'PASSWORD CHANGE',
          path: '/changepass'
        },
        {
          icon: 'monetization_on',
          title: 'CRYPTOCURRENCY LIST',
          path: '/currencies'
        },
        {
          icon:'settings_applications',
          title: 'MY NOTIFICATIONS',
          path: '/notifications'
        }

      ],
      miniVariant: false,
      title: 'Vuetify.js'
    }
  },
  name: 'Admin',
  methods: {
    logout(){
      axios.post('logout').then(result => {
        localStorage.removeItem('token')
        this.$router.push({path:'/'})
      })
    }
  }
}
</script>

<style>
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .spinner {
    max-width: 64px;
    width: 100%;
    height: 200px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

  }

  .spinner > div {

    width: 18px;
    height: 18px;
    background-color: white;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
  }
</style>

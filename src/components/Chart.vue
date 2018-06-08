<template>
    <v-app id="inspire" dark>
        <div v-if="$store.state.loading" class="loading">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
        <v-toolbar app fixed clipped-right>
            <v-toolbar-title>CryptoChecker</v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-btn  to="/" block color="blue-grey darken-1" dark >the list of cryptocurrencies</v-btn>
            <v-container fluid >

        <div v-if="currencyObj">
            <img :src="`${en}storage/${currencyObj.coin_id}.png`">
            <h1> {{currencyObj.name}} <span style="color: #EF6C00">{{currencyStatObj.price/100}}$</span></h1>
            <br><br>
        </div>

        <hr>
        <v-data-table
                :items="currency"
                hide-actions
                :headers="headers"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props" >
                <td>{{Number(props.item.market_cap)}}</td>
                <td>{{Number(props.item.volume)}}</td>
            </template>
        </v-data-table>
        <hr>
        <v-data-table
                :items="currency"
                hide-actions
                :headers="headers2"
                class="elevation-1"
        >
            <template slot="items" slot-scope="props" >
                <td>{{Number(props.item.circulating_supply)}}</td>
                <td>{{props.item.change}}</td>
            </template>
        </v-data-table>
        <hr>
        <div class="butt">
            <v-btn :to="`/chart/${id}/1`" small color="blue-grey darken-1">1d</v-btn>
            <v-btn :to="`/chart/${id}/7`"  small color="blue-grey darken-1">7d</v-btn>
            <v-btn :to="`/chart/${id}/30`"  small color="blue-grey darken-1">30d</v-btn>
            <v-btn :to="`/chart/${id}/-1`"  small color="blue-grey darken-1">all</v-btn>
        </div>
        <hr>
        <line-chart
                :data="datacollection"
                :height = 200
        >
        </line-chart>
        <hr>
    </v-container>
            <v-footer app fixed>
                <span>&copy; 2018</span>
            </v-footer>
        </v-content>
    </v-app>
</template>

<script>
  import env from './../env'
  import LineChart from './../charts/LineChart'

  export default {
    name: "Chart",

    components: {
      LineChart
    },

    data() {

      return {
        en: env.APP_URL,
        loading: true,
        id: this.$route.params.id,
        time: this.$route.params.time,
        currencyObj: null,
        currencyStatObj: null,
        datacollection: null,
        headers: [
          { text: 'Market Cap' ,sortable: false},
          { text: 'Volume (24h)',sortable: false},
        ],
        headers2: [
          { text: 'Circulating Supply',sortable: false},
          { text: 'Change (24h)',sortable: false},
        ],
        currency: []
      }
    },

    methods: {

      fetchCurrency(id) {
        axios('currencies/'+ id)
          .then(result => {
            //this.currencies = result.data
            this.currency.push(result.data)
            this.currencyObj = result.data
          })
      },
      fetchPriceStats(id) {
        axios('get-price/'+ id)
          .then(result => {
            this.currencyStatObj =result.data
            }
          )
      },

      fetchCurrencyStats(id, time) {

        this.$store.state.loading = true;

        axios(`get-selected?id=${id}&time=${time}`)
          .then(result => {
            this.data = result.data

            let labels = this.data.map(item => item.created_at)
            let data = this.data.map(item => item.price/100)
            this.datacollection = {
              labels: labels,
              datasets: [{
                label: 'Currency Price ($)',
                backgroundColor: '#009688',
                data,
              }],
            }
            this.$store.state.loading = false;
          })
      }
    },
    created() {
      this.$store.state.loading = true;
      this.fetchCurrency(this.id)
      this.fetchCurrencyStats(this.id, this.time)
      this.fetchPriceStats(this.id)

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        display: inline;
    }
    .butt{
        text-align: center;
    }
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

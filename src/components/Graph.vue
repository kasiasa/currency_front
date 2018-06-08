<template>
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
        <v-btn :to="`/graph/${id}/1`" small color="blue-grey darken-1">1d</v-btn>
        <v-btn :to="`/graph/${id}/7`"  small color="blue-grey darken-1">7d</v-btn>
        <v-btn :to="`/graph/${id}/30`"  small color="blue-grey darken-1">30d</v-btn>
        <v-btn :to="`/graph/${id}/-1`"  small color="blue-grey darken-1">all</v-btn>
        </div>
        <hr>
        <line-chart
                :data="datacollection"
                :height = 200
        >
        </line-chart>
        <hr>
    </v-container>
</template>

<script>
  import env from './../env'
  import LineChart from './../charts/LineChart'

  export default {
    name: "Graph",

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
</style>

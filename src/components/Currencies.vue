<template>
            <v-card>
                <v-card-title>
                    Cryptocurrencies
                    <v-spacer></v-spacer>
                    <v-text-field
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                            v-model="search"
                    ></v-text-field>
                </v-card-title>
                <v-data-table

                        :headers="headers"
                        :items="currencies"
                        class="elevation-1"
                        :rows-per-page-items="rows"
                        :pagination.sync="pagination"
                        :loading="loading"
                        :total-items="pagination.totalItems"
                >
                    <template slot="items" slot-scope="props">
                        <td><img :src="`${en}storage/${props.item.coin_id}.png`"></td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.price }}</td>
                        <td v-if="admin == 0">
                            <v-btn icon class="mx-0" :to="'/chart/'+ props.item.id+'/1'">
                                <v-icon color="primary">show_chart</v-icon>
                            </v-btn>
                        </td>
                        <td v-else>
                            <v-btn icon class="mx-0" :to="'/graph/'+ props.item.id+'/1'">
                                <v-icon color="primary">show_chart</v-icon>
                            </v-btn>
                        </td>
                        <td :style="(props.item.change < 0) ? red : green">{{ Number(props.item.change).toFixed(2) + '%'}}</td>
                        <td>{{ Number(props.item.market_cap) }}</td>
                        <td>{{ Number(props.item.volume) }}</td>
                        <td>{{ Number(props.item.circulating_supply)}}</td>

                    </template>
                </v-data-table>
            </v-card>
</template>

<script>
  import env from './../env'

  export default {
    props: ['admin'],
    name: 'Currencies',
    data() {
      return {

        value: false,
        search: '',
        rows:[10, 25, 50, 100, {"text":"All","value":-1}],
        en: env.APP_URL,
        red: 'color: red',
        green: 'color: green',

        pagination: {
          rowsPerPage: 10,
          totalItems: 0
        },
        loading: true,

        headers: [
          { text: ' ', value: 'id',sortable: false},
          { text: 'Name', value: 'name',sortable: false },
          { text: 'Price', value: 'price',sortable: false},
          { text: 'Price Graph', value: 'graph', sortable: false},
          { text: 'Change (24h)', value: 'change',  align: 'left',sortable: false},
          { text: 'Market Cap', value: 'market_cap',sortable: false},
          { text: 'Volume (24h)', value: 'volume' ,sortable: false},
          { text: 'Circulating Supply', value: 'circgulating_supply',sortable: false},

        ],
        currencies: [],
      }
    },
    methods: {
      searchCurrencies (page, rows, search) {
        if(this.search === ''){
          search = 'cryptocurrencies'
        }
        axios(`query-currencies/${search}/${rows}?page=${page}`)
          .then(result => {
            this.currencies = result.data.data;
            this.pagination.totalItems = result.data.total;
            this.loading = false;
          })
      }
    },
    watch: {
      search () {
        this.searchCurrencies(this.pagination.page, this.pagination.rowsPerPage, this.search)
      },
      'pagination.page': function () {
        this.searchCurrencies(this.pagination.page, this.pagination.rowsPerPage, this.search)
      }
    },

    created() {
      this.searchCurrencies(1,10,'')
    }
  }
</script>
<style scoped>

</style>
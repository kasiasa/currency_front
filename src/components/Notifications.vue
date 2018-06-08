<template>

    <!--<div v-for="(currency, key) in currencies" :key="key">-->
      <!--{{currency.name}}-->
    <!--</div>-->

      <v-container fluid >

      <v-dialog v-model="dialog" max-width="500px">

        <v-btn color="primary" block dark slot="activator" class="mb-2">add new notification</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-select
                          :items="currencies"
                          item-text="name"
                          item-value="id"
                          v-model="editedItem.currency_id"
                          label="cryptocurrency"
                          autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                          label="price will bee"
                          v-model="editedItem.operator"
                          :items="operators"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                          v-model="editedItem.limit"
                          @keyup="editedItem.limit = editedItem.limit.replace(',', '.')"
                          label="amount in dollars"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <v-data-table

              :items="items"
              hide-actions
              :headers="headers"
              class="elevation-1"
        >

        <template slot="items" slot-scope="props" >
          <td>{{props.item.currency.name}}</td>
          <td class="text-xs-left">{{ props.item.operator }}</td>
          <td class="text-xs-left">{{ props.item.limit/100}}</td>
          <td>{{props.item.status}}</td>
          <td>
            <v-btn icon class="mx-0" @click="activate(props.item.id, props.item.status)">
              <v-icon color="primary">{{(props.item.status === 'active')? 'stop':'replay'}}</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>

      </v-data-table>
        </v-container>
</template>

<script>
  export default {
    name: 'Notifications',
    data: () => ({
      dialog: false,
      selected:[],
      headers: [
        {text: 'Cryptocurrency', align: 'left', value: 'currency.name'},
        {text: 'Price', value: 'operator', sortable: false},
        {text: 'Amount ($)', sortable: false},
        {text: 'Status', value: 'activation',sortable: false},
        {text: 'Activate',sortable: false},
        {text: 'Edit', sortable: false },
        {text: 'Delete', sortable: false },
      ],
      operators: ['below', 'above'],
      editedIndex: -1,
      editedItem: {
        currency_id: '',
        operator: '',
        limit: ''
      },
      items: [],
      currencies: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Notify me if' : 'Edit notification'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize ()
    },

    methods: {

      initialize () {
        axios('notifications')
          .then(result => {
            this.items = result.data
          })
        axios('currencies')
          .then(result => {
            this.currencies = result.data
        })
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.limit = this.editedItem.limit / 100;
        this.dialog = true
      },

      deleteItem (id) {
        axios.delete('notifications/' + id)
          .then(() => {
            this.initialize()
          })
      },

      activate (id, status){
        if(status === 'inactive')
        axios.patch('notifications/' + id +'/activate', {
          status: 'active'
        }).then(() => {
            this.initialize()
          })
        else{
          axios.patch('notifications/' + id +'/activate', {
            status: 'inactive'
          }).then(() => {
            this.initialize()
          })
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          this.editedItem.limit = this.editedItem.limit * 100;
          axios.put('notifications/'+ this.editedItem.id, this.editedItem )
            .then(() => {
              this.initialize()
              this.close ()
          })

        } else {

          this.editedItem.limit = parseFloat(this.editedItem.limit) * 100;
          axios.post('notifications', this.editedItem )
            .then(() => {
              this.initialize()
              this.close ()
          })

        }

      },
    },
  }
</script>
<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>

    <v-row class="row-auto">
      <v-col cols="12">
        <FTypeDatePeriod name='period' @updateFiled="updateFiled"/>
      </v-col>
    </v-row>
    <v-row class="row-auto">
      <v-col cols="4">
        <Summary :payments="summary.payments" :tasks="summary.tasks"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="table-list-style-nospacing">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="finances"
            class="elevation-0"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <div class="color-black" @click="openRequest(item.uuid)">
                {{ item.name }}
                <div class="name-description">
                  {{item.description}}
                </div>
              </div>
            </template>

            <template v-slot:item.sum="{ item }">
            <div class="request-pay">
              {{item.payment}}
            </div>
          </template>

            <template v-slot:item.period="{ item }">
              <div class="color-black">
               {{formatDate(item.start_date)}} - {{formatDate(item.end_date)}}
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <div class="color-green">
                {{item.status}}
              </div>
            </template>

          </v-data-table>
        </div>
        <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage"
                     @setCurrentPage="setCurrentPage"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {
    if (store.getters['finances/finances'].length === 0) {
      await store.dispatch('finances/fetchFinances')
    }
    if (store.getters['finances/summary'].length === 0) {
      await store.dispatch('finances/fetchSummary')
    }
  },
  data() {
    return {
      title: 'Финансы',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      defSort: [{name: 'Все', uuid: '0000'}],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      headers: [
        {text: 'заявка', align: 'start', value: 'name',},
        {text: 'Сумма', value: 'sum'},
        {text: 'период работ', value: 'period'},
        {text: 'вид оплаты', value: 'type'},
        {text: 'статус', value: 'status'},
      ],
      formValues: [],

    }
  },
  created() {

    this.sortSpecializations = this.defSort.concat(this.specializations);
    this.sortRegions = this.defSort.concat(this.regions);
  },
  methods: {
    ...mapActions('finances', ['fetchFinances',]),
    ...mapActions('finances', ['fetchSummary',]),

    openRequest(id) {
      this.$router.push('/clients/' + id);
    },
    filter() {
      let start_date = this.formValues.period[0],
          end_date = this.formValues.period[1],
          newRequet = {};

      if (start_date < end_date){
        newRequet = {
          "start_date": start_date,
          "end_date": end_date,
        };
      }
      else{
        newRequet = {
          "start_date": end_date,
          "end_date": start_date,
        };
      }

      console.log('фильтрация ----',  newRequet);
      this.fetchFinances(newRequet);
      this.fetchSummary(newRequet);
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.substring(0, 10).split('-')
      return `${day}.${month}.${year}`
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);

      this.filter();
    },
  },
  computed: {
    finances() {
      return this.$store.getters['finances/finances'];
    },
    summary() {
      return this.$store.getters['finances/summary'];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
  },
  async mounted() {
    await this.fetchFinances();
    await this.fetchSummary();
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/scss/colors';

.request-pay {
  display: inline-flex;
  background: $light_blue;
  color: $blue;
  padding: 7px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
}

.name-description{
  font-size: 14px;
  color: $grey;
  margin-top: 6px;
}

</style>

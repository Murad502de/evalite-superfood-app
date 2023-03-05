<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>
    <v-row no-gutters class="table-filter-row">
      <v-col
        cols="2"
      >
        <v-select
          :items="sortRegions"
          v-model="region"
          outlined
          hide-details="true"
          label="Расположение"
          item-text="name"
          @change="filter('region', region)"
        ></v-select>
      </v-col>
      <v-col
        cols="2"
      >
        <v-select
          :items="sortSpecializations"
          v-model="specialization"
          outlined
          hide-details="true"
          label="Категория"
          item-text="name"
          @change="filter('specialization', specialization)"
        ></v-select>
      </v-col>
      <v-col
        cols="2"
      >
        <v-select
          :items="sortActive"
          v-model="active"
          outlined
          hide-details="true"
          label="Активность"
          item-text="title"
          @change="filter('active', active)"
        ></v-select>
      </v-col>

      <v-col
        cols="6"
        class="d-flex justify-end"
      >

        <Search :searchText="searchText" @updateSearchText="updateSearchText"/>
        <v-tabs right class="icon-tabs"
                height="40"
                v-model="tab">
          <v-tab>
            <img src="/img/ico_list.svg" alt="list">
          </v-tab>
          <v-tab>
            <v-icon
              size="24"
              color="gray"
            >
              mdi-map-outline
            </v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row no-gutters class="mt-8" v-if="user.type == 'superManager' || user.type == 'manager'">
      <v-col>
        <v-btn
          text
          height="48"
          outlined
          class="btn-blue"
          href="/objects/create"
        >
          Создать новый объект
        </v-btn>
      </v-col>
    </v-row>

    <v-window v-model="tab">
      <v-tab-item>
        <div class="table-list-style">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="objects"
            class="elevation-0"
            item-key="uuid"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <div class="color-black" @click="openRequest(item.uuid)">
                <span class="request-i"></span>
                {{ item.name }}
              </div>

            </template>

            <template v-slot:item.rating="{ item }">
              <Rating :rating="item.raiting"/>
            </template>

            <template v-slot:item.request="{ item }">
              <div class="color-black">
                {{ item.count_tasks }}
              </div>
            </template>

            <template v-slot:item.dispatcher="{ item }">
              <UserAvatar :first_name="item.dispatchers.firstname" :last_name="item.dispatchers.lastname"
                          :color="avatarColor" v-if="item.dispatchers.firstname"/>
            </template>

            <template v-slot:item.address="{ item }">
              <div>
                {{ item.region }}, {{ item.city }}
              </div>
            </template>

            <template v-slot:item.actions="{ item }" v-if="user.type != 'dispatcher'">
              <v-menu
                bottom
                rounded="10"
                offset-y
                nudge-bottom="10"
                left
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon
                         v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-start">
                    <div class="mx-auto text-left">
                      <nuxt-link :to="'/objects/'+ item.uuid +'/edit'">
                        <span>Редактировать</span>
                      </nuxt-link>
                      <v-divider class="my-3"></v-divider>
                      <a href="#" @click.prevent="removeRequest(item.uuid)">Удалить</a>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </template>
          </v-data-table>
        </div>
        <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage"
                     @setCurrentPage="setCurrentPage"/>
      </v-tab-item>
      <v-tab-item>
        <v-row class="mt-11">
          <v-col cols="12">
            <Map :center_coords="coords" :markers="objects_map" zoom="8" height="546"/>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-window>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  meta: {
    title: 'Объекты'
  },
  async fetch({store}) {
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetchSpecializations')
    }
    if (store.getters['dictionary/regions'].length === 0) {
      await store.dispatch('dictionary/fetchRegions')
    }
  },
  data() {
    return {
      title: 'Объекты',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      sortSpecializations: [],
      sortRegions: [],
      sortActive: [
        {title: 'Неделя', value: 1},
        {title: 'Месяц', value: 4},
        {title: 'Полгода ', value: 26},
        {title: 'Год', value: 52},
      ],
      defSort: [{name: 'Все', uuid: '0000'}],
      specialization: '',
      region: '',
      active: '',
      searchText: '',
      selectObject: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: '#EFCD4F',
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Рейтинг', value: 'rating'},
        {text: 'Заявки', value: 'request'},
        {text: 'Диспетчер', value: 'dispatcher'},
        {text: 'Расположен', value: 'address'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      tab: null,
      coords: [45.04, 38.98],
    }
  },
  created() {
    this.sortSpecializations = this.defSort.concat(this.specializations);
    this.sortRegions = this.defSort.concat(this.regions);

    this.initBreadcrumbs(this.$route.fullPath);
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('objects', ['fetchObjectsMap',]),
    ...mapActions('objects', ['removeRequest',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dictionary', ['fetchRegions',]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs",]),

    openRequest(id) {
      this.$router.push('/objects/' + id);
    },
    updateSearchText(value) {
      this.searchText = value;
      this.filter();
    },
    filter() {
      const newRequet = this.postBody;
      if (this.tab == 0) {
        this.fetchObjects(newRequet);
      } else if (this.tab == 1) {
        this.fetchObjectsMap(newRequet);
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },
    setCurrentPage(value) {
      this.page = value;
    }

  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    objects() {
      return this.$store.getters['objects/objects'];
    },
    objects_map() {
      return this.$store.getters['objects/objects_map'];
    },
    specializations() {
      return this.$store.getters['specializations/specializations'];
    },
    regions() {
      return this.$store.getters['dictionary/regions'];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
    postBody() {
      let type, order = '';
      let specialization = this.specialization,
        region = this.region,
        search = this.searchText;

      if (specialization == 'Все') {
        specialization = '';
      }
      if (region == 'Все') {
        region = '';
      }
      if (this.tab == 1) {
        type = 'map';
      }
      if (specialization != '' || region != ''){
        order = "asc";
      }
      console.log(specialization, region, order);
      let postBody = {
        "specialization": specialization,
        "region": region,
        "active": this.active,
        "sort": "city",
        "order": order,
        "type": type,
        "name": search,
      }
      console.log(postBody);
      return postBody;
    },
  },
  async mounted() {
    await this.fetchObjects();
    await this.fetchObjectsMap({"type": "map"});

    console.log('$route - ', this.$route.meta);
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


.v-divider {
  margin: 24px 0;
}

</style>

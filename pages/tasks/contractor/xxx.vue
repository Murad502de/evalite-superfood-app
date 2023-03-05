<template lang="pug">
.contractor-applications__container
  Header( :content="title" :size="title_size" :isnew="false" :isback="false" )

  v-row.haupt-tabs__container
    v-tabs( v-model="tab_haupt" )
      v-tab( @click="handlers().onTaskTypeTabClick({ type: 'active' })" ) Активные
      v-tab( @click="handlers().onTaskTypeTabClick({ type: 'responded' })" ) Откликнулся
      v-tab( @click="handlers().onTaskTypeTabClick({ type: 'completed' })" ) Завершенные

  v-row.table-filter-row
    v-col( cols="3" )
      v-select.sort-select(
        :items="sortActive"
        v-model="active"
        prefix="Порядок:"
        outlined
        hide-details="true"
        item-text="name"
        item-value="id"
        @change="handlers().onSortSelectChange({ $event })"
      )

    v-col( cols="9" class="d-flex justify-end align-center" )
      Search( :searchText="searchText" @updateSearchText="onSearchInput" )
      //- .map-tabs
      //-   .map-tab.list(
      //-     :class="{ 'active' : !tab_list_map }"
      //-     @click="handlers().onMapTabClick( { tab : 0 } )"
      //-   )
      //-     svg( width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" )
      //-       path(
      //-         v-if="!tab_list_map"
      //-         d="M0 0.993C0.00183004 0.730378 0.1069 0.479017 0.292513 0.293218C0.478126 0.107418 0.72938 0.00209465 0.992 0H19.008C19.556 0 20 0.445 20 0.993V17.007C19.9982 17.2696 19.8931 17.521 19.7075 17.7068C19.5219 17.8926 19.2706 17.9979 19.008 18H0.992C0.728813 17.9997 0.476497 17.895 0.290489 17.7088C0.104482 17.5226 -1.33455e-07 17.2702 0 17.007V0.993ZM9 2H2V16H9V2ZM11 2V16H18V2H11ZM12 4H17V6H12V4ZM12 7H17V9H12V7Z" fill="#0082DE"
      //-       )
      //-       path(
      //-         v-else
      //-         d="M0 0.993C0.00183004 0.730378 0.1069 0.479017 0.292513 0.293218C0.478126 0.107418 0.72938 0.00209465 0.992 0H19.008C19.556 0 20 0.445 20 0.993V17.007C19.9982 17.2696 19.8931 17.521 19.7075 17.7068C19.5219 17.8926 19.2706 17.9979 19.008 18H0.992C0.728813 17.9997 0.476497 17.895 0.290489 17.7088C0.104482 17.5226 -1.33455e-07 17.2702 0 17.007V0.993ZM9 2H2V16H9V2ZM11 2V16H18V2H11ZM12 4H17V6H12V4ZM12 7H17V9H12V7Z" fill="#7A91A9"
      //-       )
      //-     .titel Списком
      //-   .map-tab.map(
      //-     :class="{ 'active' : tab_list_map }"
      //-     @click="handlers().onMapTabClick( { tab : 1 } )"
      //-   )
      //-     svg( width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" )
      //-       path(
      //-         v-if="tab_list_map"
      //-         d="M13 3L7 1M7 17L1.79 18.737C1.69973 18.7671 1.60358 18.7754 1.5095 18.761C1.41542 18.7467 1.32611 18.7101 1.24893 18.6544C1.17175 18.5988 1.10893 18.5255 1.06565 18.4408C1.02236 18.356 0.999861 18.2622 1 18.167V3.433C1.00003 3.30714 1.03963 3.18447 1.11321 3.08236C1.18679 2.98025 1.29062 2.90386 1.41 2.864L7 1V17ZM7 17L13 19L7 17ZM7 17V1V17ZM13 19L18.59 17.137C18.7095 17.0971 18.8135 17.0205 18.8871 16.9182C18.9607 16.8159 19.0002 16.693 19 16.567V1.832C19 1.73692 18.9774 1.6432 18.934 1.55857C18.8907 1.47394 18.8278 1.40083 18.7507 1.34526C18.6735 1.28969 18.5843 1.25325 18.4902 1.23895C18.3962 1.22465 18.3002 1.23289 18.21 1.263L13 3V19ZM13 19V3V19Z" stroke="#0082DE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      //-       )
      //-       path(
      //-         v-else
      //-         d="M13 3L7 1M7 17L1.79 18.737C1.69973 18.7671 1.60358 18.7754 1.5095 18.761C1.41542 18.7467 1.32611 18.7101 1.24893 18.6544C1.17175 18.5988 1.10893 18.5255 1.06565 18.4408C1.02236 18.356 0.999861 18.2622 1 18.167V3.433C1.00003 3.30714 1.03963 3.18447 1.11321 3.08236C1.18679 2.98025 1.29062 2.90386 1.41 2.864L7 1V17ZM7 17L13 19L7 17ZM7 17V1V17ZM13 19L18.59 17.137C18.7095 17.0971 18.8135 17.0205 18.8871 16.9182C18.9607 16.8159 19.0002 16.693 19 16.567V1.832C19 1.73692 18.9774 1.6432 18.934 1.55857C18.8907 1.47394 18.8278 1.40083 18.7507 1.34526C18.6735 1.28969 18.5843 1.25325 18.4902 1.23895C18.3962 1.22465 18.3002 1.23289 18.21 1.263L13 3V19ZM13 19V3V19Z" stroke="#7A91A9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      //-       )
      //-     .titel На карте

  v-window( v-model="tab_list_map" )
    v-tab-item
      .table-list-style
        v-data-table(
          v-model="selected"
          :headers="headers"
          :items="userTasks"
          class="elevation-0"
          item-key="uuid"
          :page.sync="page"
          :items-per-page="itemsPerPageTable"
          hide-default-footer
          @page-count="pageCount = $event"
          @update:sort-by="handlers().updateSortBy({ $event })"
          @update:sort-desc="handlers().updateSortDesc({ $event })"
        )
          template( v-slot:item.name="{ item }" )
            div.color-black( @click="handlers().onNameTaskClick({ uuid: item.uuid })" )
              span {{ item.info.name }}

          template( v-slot:item.status="{ item }" )
            .task-status(
              :class="getters().classStatusObj({ status: item.my_status })"
            )
              .task-status__wrapper
                .task-status__inner( v-if="!item.my_status" ) {{ 'открыт набор' }}
                .task-status__inner( v-else )
                  .task-status__icon( v-if="item.my_status === 'invited'" )
                    svg( width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" )
                      path( d="M6.75 12.75V12C6.33579 12 6 12.3358 6 12.75H6.75ZM11.25 12.75H12C12 12.3358 11.6642 12 11.25 12V12.75ZM6.75 13.5H11.25V12H6.75V13.5ZM10.5 12.75V13.5H12V12.75H10.5ZM7.5 13.5V12.75H6V13.5H7.5ZM9 15C8.17157 15 7.5 14.3284 7.5 13.5H6C6 15.1569 7.34315 16.5 9 16.5V15ZM10.5 13.5C10.5 14.3284 9.82843 15 9 15V16.5C10.6569 16.5 12 15.1569 12 13.5H10.5Z" fill="white" )
                      path( d="M3.21967 11.0303L2.68934 10.5H2.68934L3.21967 11.0303ZM3.60279 10.6472L4.13312 11.1776H4.13312L3.60279 10.6472ZM14.3972 10.6472L14.9275 10.1169L14.9275 10.1169L14.3972 10.6472ZM14.7803 11.0303L15.3107 10.5L15.3107 10.5L14.7803 11.0303ZM8.99999 2.25L8.99999 3L8.99999 2.25ZM14.25 12H3.75V13.5H14.25V12ZM3.75 12V11.5607H2.25V12H3.75ZM3.75 11.5607L4.13312 11.1776L3.07246 10.1169L2.68934 10.5L3.75 11.5607ZM4.5 10.2918V7.5H3V10.2918H4.5ZM13.5 7.5V10.2918H15V7.5H13.5ZM13.8669 11.1775L14.25 11.5607L15.3107 10.5L14.9275 10.1169L13.8669 11.1775ZM14.25 11.5607V12H15.75V11.5607H14.25ZM14.25 11.5607L14.25 11.5607H15.75C15.75 11.1628 15.592 10.7813 15.3107 10.5L14.25 11.5607ZM13.5 10.2918C13.5 10.624 13.632 10.9426 13.8669 11.1775L14.9275 10.1169C14.9739 10.1633 15 10.2262 15 10.2918H13.5ZM15 7.5C15 4.18629 12.3137 1.49999 8.99998 1.5L8.99999 3C11.4853 2.99999 13.5 5.01471 13.5 7.5H15ZM4.5 7.5C4.5 5.01472 6.51471 3.00001 8.99999 3L8.99998 1.5C5.68628 1.50001 3 4.1863 3 7.5H4.5ZM4.13312 11.1776C4.36803 10.9426 4.5 10.624 4.5 10.2918H3C3 10.2262 3.02606 10.1633 3.07246 10.1169L4.13312 11.1776ZM3.75 11.5607H3.75L2.68934 10.5C2.40804 10.7813 2.25 11.1628 2.25 11.5607H3.75ZM3.75 12H2.25C2.25 12.8284 2.92157 13.5 3.75 13.5V12ZM14.25 13.5C15.0784 13.5 15.75 12.8284 15.75 12H14.25V13.5Z" fill="white" )
                      path( d="M13.5137 1.51025C14.5481 2.28974 15.363 3.32382 15.8791 4.5118" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" )
                      path( d="M4.48647 1.51025C3.45206 2.28974 2.63715 3.32382 2.12109 4.5118" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" )
                  .task-status__title {{ item.my_status_name }}


          template( v-slot:item.payment="{ item }" )
            .payment( :class="{ close: userTaskStatus === 'close' }" )
              .wrapper
                span.value {{ `${item.info.payment.value || '0'} р. / смена` }}

          template( v-slot:item.object_name="{ item }" )
            .color-black {{ item.info.object.name }}

          template( v-slot:item.start_date="{ item }" )
            div {{ helpers().parseDate({ date: item.info.start_date }) }}

          template(
            v-slot:item.actions="{ item }"
          )
            v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              left
            )
              template(
                v-slot:activator="{ on }"
              )
                v-btn(
                  v-show="userTaskStatus !== 'close'"
                  icon v-on="on"
                )
                  v-icon mdi-dots-vertical
              v-card(
                v-if="getters().tableItemIndex({ status: item.my_status }).length"
              )
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    .actions
                      .action(
                        v-for="( action, index ) in getters().tableItemIndex({ status: item.my_status })" :key="action.slug"
                        @click="handlers().onActionClick({ action: action.slug, uuid: item.uuid })"
                      )
                        .action-item {{ action.name }}
                        v-divider.my-3( v-if="index !== getters().tableItemIndex({ status: item.my_status }).length - 1" )
      FooterTable(
        :itemsPerPage="itemsPerPage"
        :pageCount="pageCount"
        :page="page"
        @setItemsPerPage="setItemsPerPage"
        @setCurrentPage="setCurrentPage"
      )
    v-tab-item
      v-row.mt-11
        v-col( cols="12" )
          Map(
            :center_coords="coords"
            :markers="userTasks"
            :entity="'contractor'"
            zoom="8"
            height="546"
          )
</template>

<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';

export default {
  components: {},

  async fetch({ store }) {
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dictionary/regions'].length === 0) {
      await store.dispatch('dictionary/fetchRegions')
    }
  },
  meta: {
    title: 'Мои заявки'
  },
  data() {
    return {
      title: 'Мои заявки',
      title_size: 'big',
      title_create: false,
      title_page_create: 'create',
      sortSpecializations: [],
      sortRegions: [],
      sortActive: [
        {
          id: 0,
          name: 'Сначала ближайшие (по локации)',
        },

        {
          id: 1,
          name: 'Сначала дорогие (по стоимости ставки)',
        },

        {
          id: 2,
          name: 'Сначала ближайший старт работ (по дате старта)',
        },
      ],
      defSort: [{ name: 'Все', uuid: '0000' }],
      specialization: '',
      region: '',
      active: '',
      searchText: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selected: [],
      avatarColor: '#EFCD4F',
      headers: [
        { text: 'Название', align: 'start', value: 'name', },
        { text: '', align: 'start', value: 'status', sortable: false, },
        { text: 'оплата', value: 'payment' },
        { text: 'Объект', value: 'object_name' },
        { text: 'Начало работ', value: 'start_date' },
        { text: '', value: 'actions', sortable: false, align: 'right' },
      ],
      tab_haupt: null,
      tab_list_map: null,
      coords: [45.04, 38.98],

      userTaskStatus: 'open',

      tableSortParams: { // BUG sort und order müssen getauscht werden
        sort: null,
        order: null,
      }
    }
  },

  created() {
    this.sortSpecializations = this.defSort.concat(this.specializations);
    this.sortRegions = this.defSort.concat(this.regions);
  },

  methods: {
    ...mapActions('user', ['fetchUserTasks', 'setUserTasksParams',]),
    ...mapActions('contractors', ['acceptTask', 'canceltTask', 'rejectTask', 'requestTask',]),

    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('objects', ['fetchObjectsMap',]),
    ...mapActions('objects', ['removeRequest',]),
    ...mapActions('specializations', ['fetch',]),
    ...mapActions('dictionary', ['fetchRegions',]),

    updateSearchText(value) {
      console.log('updateSearchText', this);
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
    },

    getters() {
      return {
        classStatusObj: (payload = {}) => {
          return {
            open: !payload.status,
            requested: payload.status === 'requested',
            rejected: payload.status === 'rejected',
            accepted: payload.status === 'accepted',
            invited: payload.status === 'invited',
          }
        },

        tableItemIndex: (payload = {}) => {
          switch (payload.status) {
            case 'requested':
              return [
                { name: 'отменить', slug: 'cancel' },
              ];

            case 'rejected':
              return [];

            case 'accepted':
              return [
                { name: 'отменить', slug: 'cancel' },
              ];

            case 'invited':
              return [
                { name: 'принять', slug: 'accept' },
                { name: 'отказаться', slug: 'refuse' },
              ];

            default:
              return [
                { name: 'участвовать', slug: 'participate' },
              ];
          }
        },
      }
    },

    helpers() {
      return {
        parseDate: (payload = {}) => {
          if (!payload.date) {
            return '';
          }

          let day = payload.date.split('T')[0].split('-')[2];
          let month = payload.date.split('T')[0].split('-')[1];
          let year = payload.date.split('T')[0].split('-')[0];
          let time = `${payload.date.split('T')[1].split(':')[0]}:${payload.date.split('T')[1].split(':')[1]}`;

          return `${day}.${month}.${year} ${time}`;
        },
      }
    },

    handlers() {
      return {
        onTaskTypeTabClick: async (payload = {}) => {
          console.log('onTaskTypeTabClick', payload); // DELETE

          console.log('objects_map', this.objects_map);

          switch (payload.type) {
            case 'active':
              await this.setUserTasksParams({ ...this.userTasksParams, type: 'accepted', });
              await this.fetchUserTasks({ params: this.tableSortParams });

              this.userTaskStatus = 'open';
              break;

            case 'responded':
              await this.setUserTasksParams({ ...this.userTasksParams, type: 'requested', });
              await this.fetchUserTasks({ params: this.tableSortParams });

              this.userTaskStatus = 'open';
              break;

            case 'completed':
              await this.setUserTasksParams({ ...this.userTasksParams, type: null, });
              await this.fetchUserTasks({ params: this.tableSortParams });

              this.userTaskStatus = 'close';
              break;

            default:
              break;
          }
        },

        onSortSelectChange: async (payload = {}) => {
          console.log('onSortSelectChange', payload); // DELETE

          switch (payload.$event) {
            case 0:
              await this.setUserTasksParams({ ...this.userTasksParams, distance: 1, date: 0, payment: 0, }); // FIXME
              await this.fetchUserTasks({ params: this.tableSortParams });
              break;

            case 1:
              await this.setUserTasksParams({ ...this.userTasksParams, distance: 0, date: 0, payment: 1, }); // FIXME
              await this.fetchUserTasks({ params: this.tableSortParams });
              break;

            case 2:
              await this.setUserTasksParams({ ...this.userTasksParams, distance: 0, date: 1, payment: 0, }); // FIXME
              await this.fetchUserTasks({ params: this.tableSortParams });
              break;

            default:
              break;
          }
        },

        onNameTaskClick: (payload = {}) => {
          this.$router.push(
            {
              name: "tasks-contractor-id",
              params: {
                id: payload.uuid,
              }
            }
          );
        },

        onMapTabClick: (payload = {}) => {
          this.tab_list_map = payload.tab;
        },

        onActionClick: (payload = {}) => {
          console.log('onActionClick', payload); // DELETE

          switch (payload.action) {
            case 'accept':
              this.acceptTask({ uuid: payload.uuid })
                .then(
                  () => {
                    this.fetchUserTasks({ params: this.tableSortParams });
                  }
                );
              break;

            case 'cancel':
              this.canceltTask({ uuid: payload.uuid })
                .then(
                  () => {
                    this.fetchUserTasks({ params: this.tableSortParams });
                  }
                );
              break;

            case 'refuse':
              this.rejectTask({ uuid: payload.uuid })
                .then(
                  () => {
                    this.fetchUserTasks({ params: this.tableSortParams });
                  }
                );
              break;

            case 'participate':
              this.requestTask({ uuid: payload.uuid })
                .then(
                  () => {
                    this.fetchUserTasks({ params: this.tableSortParams });
                  }
                );
              break;
          }
        },

        updateSortBy: (payload = {}) => {
          console.log('updateSortBy', payload); // DELETE

          this.tableSortParams.sort = !!payload.$event.length ? payload.$event[0] : null;

          this.sortTable();
        },

        updateSortDesc: (payload = {}) => {
          console.log('updateSortDesc', payload); // DELETE

          this.tableSortParams.order = payload.$event.length ? payload.$event[0] ? 'desc' : 'asc' : null;

          this.sortTable();
        },
      }
    },

    onSearchInput: _.debounce(
      function (payload = {}) {
        this.setUserTasksParams({ ...this.userTasksParams, search: payload }).then(
          () => {
            this.fetchUserTasks({ params: this.tableSortParams });
          }
        );
      },

      400
    ),

    sortTable: _.debounce(
      function (payload = {}) {
        console.debug('[helper]::sortTable', payload, this.tableSortParams); // DELETE

        this.fetchUserTasks({ params: this.tableSortParams });
      },

      200
    ),
  },

  computed: {
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
      let type;
      let specialization = this.specialization,
        region = this.region;
      if (specialization == 'Все') {
        specialization = '';
      }
      if (region == 'Все') {
        region = '';
      }
      if (this.tab == 1) {
        type = 'map';
      }
      let postBody = {
        "specialization": specialization,
        "region": region,
        "active": this.active,
        "sort": "city",
        "order": "asc",
        "type": type
      }
      console.log(postBody);
      return postBody;
    },

    ...mapGetters('user', ['userTasks', 'userTasksParams',]),
  },

  async mounted() {
    await this.setUserTasksParams({ ...this.userTasksParams, type: 'accepted', });
    await this.fetchUserTasks({ params: this.tableSortParams });
  },
}

</script>

<style lang="scss">
@import '@/assets/scss/colors';


.v-divider {
  margin: 24px 0;
}

/* OBJECTS STYLES START */
.haupt-tabs__container {
  width: max-content !important;
}

.payment {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  background: #E4F1FA;
  border-radius: 6px;
  padding: 7px 8px;
  width: max-content;

  &.close {
    background: #F2F4F5;

    .value {
      color: #7A91A9 !important;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;

    .value {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 125%;
      letter-spacing: 0.01em;
      color: #0082DE;
    }
  }
}

.sort-select {
  .item {
    width: 245px;
    height: 44px;

    .v-input__slot {
      margin: 0 !important;
      background: #FFFFFF;
      border: 1px solid #D5DEE8 !important;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: unset !important;
    }
  }
}

.map-tabs {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;

  background: #E9F6FF;
  border-radius: 9px;
  padding: 4px;

  .map-tab {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    cursor: pointer;
    color: #7A91A9;
    padding: 10px;

    &.active {
      background: #FFFFFF;
      border-radius: 5px;

      color: #0082DE !important;
    }

    .titel {
      margin-left: 10px;
    }
  }
}

.task-status {
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  width: max-content;

  .task-status__wrapper {
    .task-status__inner {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;

      .task-status__icon {
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      }

      .task-status__title {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 125%;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
    }
  }

  &.open {
    background: #E4F4FF;
    border: 1px solid #0082DE;

    .task-status__wrapper {
      .task-status__inner {
        .task-status__icon {}

        .task-status__title {
          color: #0082DE;
        }
      }
    }
  }

  &.requested {
    background: #FFFCF0;
    border: 1px solid #F4D150;

    .task-status__wrapper {
      .task-status__inner {
        .task-status__icon {}

        .task-status__title {
          color: #F4D150;
        }
      }
    }
  }

  &.rejected {
    background: #FAFAFA;
    border: 1px solid #666666;

    .task-status__wrapper {
      .task-status__inner {
        .task-status__icon {}

        .task-status__title {
          color: #666666;
        }
      }
    }
  }

  &.accepted {
    background: #ECFFEC;
    border: 1px solid #71D472;

    .task-status__wrapper {
      .task-status__inner {
        .task-status__icon {}

        .task-status__title {
          color: #71D472;
        }
      }
    }
  }

  &.invited {
    background: #0082DE;
    border: 1px solid #0082DE;

    .task-status__wrapper {
      .task-status__inner {
        .task-status__icon {}

        .task-status__title {
          color: #FFFFFF;
        }
      }
    }
  }

}

.action-item {
  text-decoration: none;
  text-transform: uppercase;
  color: #7A91A9;
  padding: 0 16px;
  cursor: pointer;
}

/* OBJECTS STYLES END */
</style>

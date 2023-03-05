<template>

  <v-overlay
    class="addPerformersOverlay"
    :opacity="addPerformersOpacity"
    :value="addPerformersOverlay"
  >
    <div class="addPerformersOverlay__content_wrapper">
      <div class="back-to-app" @click="handlers().onBackToAppClick()">
        <v-icon class="back-to-app__icon mdi mdi-menu-left"></v-icon>

        <div class="back-to-app__title">
          Вернуться к заявке
        </div>

      </div>


      <div class="addPerformersOverlay__content">
        <div class="addPerformersOverlay__content_header">
          Добавить исполнителей в заявку
        </div>

        <div class="addPerformersOverlay__content_body">
          <v-tabs
            v-model="tab"
            class="form-tabs"
            light
          >
            <v-tab>Категория</v-tab>
            <v-tab>Категория</v-tab>
          </v-tabs>

          <AddPerformersFilter
            class="filter"
            @apply_filter="handlers().applyFilter()"
          />

          <div class="table-list-style">
            <v-data-table
              v-model="selected"
              show-select
              :headers="PerformersTableHeaders"
              :items="contractors"
              class="elevation-0"
              item-key="uuid"
              hide-default-footer
              :items-per-page="-1"
              light
              :disable-sort="true"
            >
              <template v-slot:header.name="{ header }">
                <div class="tb-column" @click="sortieren( header.sortColumn )">
                  <span class="">{{ header.text }}</span>
                  <i
                    :class="[ 'v-icon', 'sort-icon', 'mdi', 'mdi-arrow-up', { active : sortTable.parameters.firstname.active, asc : sortTable.parameters.firstname.orderBy == 'asc', desc : sortTable.parameters.firstname.orderBy == 'desc', } ]"
                  ></i>
                </div>
              </template>

              <template v-slot:header.rating="{ header }">
                <div class="tb-column" @click="sortieren( header.sortColumn )">
                  <span class="">{{ header.text }}</span>

                  <i
                    :class="[ 'v-icon', 'sort-icon', 'mdi', 'mdi-arrow-up', { active : sortTable.parameters.value.active, asc : sortTable.parameters.value.orderBy == 'asc', desc : sortTable.parameters.value.orderBy == 'desc', } ]"
                  ></i>
                </div>
              </template>

              <template v-slot:header.address="{ header }">
                <div class="tb-column" @click="sortieren( header.sortColumn )">
                  <span class="">{{ header.text }}</span>

                  <i
                    :class="[ 'v-icon', 'sort-icon', 'mdi', 'mdi-arrow-up', { active : sortTable.parameters.location_address.active, asc : sortTable.parameters.location_address.orderBy == 'asc', desc : sortTable.parameters.location_address.orderBy == 'desc', } ]"
                  ></i>
                </div>
              </template>

              <template v-slot:header.onobject="{ header }">
                <div class="tb-column" @click="sortieren( header.sortColumn )">
                  <span class="">{{ header.text }}</span>

                  <i
                    :class="[ 'v-icon', 'sort-icon', 'mdi', 'mdi-arrow-up', { active : sortTable.parameters.count_tasks.active, asc : sortTable.parameters.count_tasks.orderBy == 'asc', desc : sortTable.parameters.count_tasks.orderBy == 'desc', } ]"
                  ></i>
                </div>
              </template>

              <template v-slot:item.name="{ item }">
                <UserAvatar
                  :first_name="item.firstname"
                  :last_name="item.lastname"
                  :radius="avatarBorderRadius"
                  :date="item.birthday"
                  response="true"
                  :color="avatarColorManager"
                  :ist_detail_erlaubt="true"
                  :uuid="item ? item.uuid : ''"
                />
              </template>

              <template v-slot:item.rating="{ item }">
                <Rating :rating="item.raiting" />
              </template>

              <template v-slot:item.address="{ item }">
                <div class="performer-address">
                  {{ item.address }}
                </div>
              </template>

              <template v-slot:item.onobject="{ item }">
                <div class="d-flex table-on-object">
                  <v-icon>mdi-home-variant-outline</v-icon>
                  <span class="num">
                    {{ item.count_tasks }}
                  </span>
                </div>
              </template>

              <template v-slot:item.invited="{ item }">
                <v-btn icon>
                  <img src="/img/ico_mail.svg" alt="mail">
                </v-btn>
                <v-btn icon>
                  <img src="/img/ico_telegram.svg" alt="telegram">
                </v-btn>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>

    <AddPerformersSelectedPanel
      v-show="selected.length"
      :selected="selected.length"
      @select_performers="handlers().selectPerformers()"
    />
  </v-overlay>

</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import Rating from "~/components/Rating";

  export default {
    components  : { Rating },

    props : {
      addPerformersOverlay  : {
        type      : Boolean,
        default   : false,
      }
    },

    computed : {
      ...mapGetters( 'contractors', [ 'contractors', ] ),

      request_id ()
      {
        return this.$store.getters[ 'request_id/request_id' ];
      },
    },

    data ()
    {
      return {
        addPerformersAbsolute : true,
        addPerformersOpacity  : 1,
        selected              : [],
        page                  : 1,
        itemsPerPageTable     : 10, //FIXME
        pageCount             : 3, //FIXME
        searchText            : '',
        avatarBorderRadius    : 'rounded',
        avatarColorManager    : '#36B368',
        tab: null,

        PerformersTableHeaders  : [
          { text: 'фио', align: 'start',  value: 'name',                        sortColumn : 'firstname' },
          { text: 'Рейтинг',              value: 'rating',                      sortColumn : 'value' },
          { text: 'География работ',      value: 'address',                     sortColumn : 'location_address' },
          { text: 'Работал',              value: 'onobject',                    sortColumn : 'count_tasks' },
          { text: 'Приглашен',            value: 'invited',                     sortColumn : '' },
          { text: '',                     value: 'actions',   sortable: false,  sortColumn : '' } ,
        ],

        sortTable : {
          activeParameter : '',

          parameters : {
            firstname   : { active : false, orderBy : '' },
            value       : { active : false, orderBy : '' },
            location_address        : { active : false, orderBy : '' },
            count_tasks : { active : false, orderBy : '' },
          }
        },
      }
    },

    methods: {
      ...mapActions( 'contractors', [ 'getContractors', 'inviteContractorsToVacancy', 'setSortColumn', 'setSortOrder' ] ),

      sortieren ( column )
      {
        console.log( 'sortTable' );
        console.log( column );

        if ( column != this.sortTable.activeParameter )
        {
          this.helpers().resetSortTable( { this : this, activeParameter : column, } );
        }

        console.log( 'activeParameter' );
        console.log( this.sortTable );

        switch ( this.sortTable.parameters[ column ].orderBy )
        {
          case '' :
            this.sortTable.parameters[ column ].orderBy = 'asc';
          break;

          case 'asc' :
            this.sortTable.parameters[ column ].orderBy = 'desc';
          break;

          case 'desc' :
            this.sortTable.parameters[ column ].orderBy = '';
          break;
        }

        if ( this.sortTable.activeParameter && this.sortTable.parameters[ column ].orderBy )
        {
          this.sortTable.parameters[ column ].active = true;

          console.debug("check active " + this.sortTable.activeParameter );
        }
        else
        {
          this.sortTable.parameters[ column ].active = false;

          console.debug("check active " + this.sortTable.activeParameter );
        }

        console.debug("TEST DATA OUT " );
        console.debug( this.sortTable );

        this.setSortColumn( this.sortTable.activeParameter );
        this.setSortOrder( this.sortTable.parameters[ column ].orderBy );
        this.getContractors();
      },

      handlers ()
      {
        return {
          onBackToAppClick : ( params = {} ) => {
            console.debug( "onBackToAppClick" );

            this.helpers().backToApp(
              {
                _this : this,
              }
            );
          },

          selectPerformers : ( params = {} ) => {
            console.debug( "selectPerformers" );
            console.debug( this.selected );

            let selectedContractors = [];

            if ( this.selected.length )
            {
              for ( let ctrId = 0; ctrId < this.selected.length; ctrId++ )
              {
                selectedContractors.push( this.selected[ ctrId ].uuid );
              }
            }

            console.debug( "selectedContractors" );
            console.debug( selectedContractors );

            console.debug( "request_id" );
            console.debug( this.request_id.uuid );

            let inviteContractorsToVacancyData = {
              contractors : selectedContractors,
              taskId      : this.request_id.uuid,
            };

            this.inviteContractorsToVacancy( inviteContractorsToVacancyData )
            .then(
              ( response = {} ) => {
                console.debug( 'inviteContractorsToVacancy success' ); //TODO //FIXME muss weg
                console.debug( response ); //TODO //FIXME muss weg

                this.helpers().backToApp(
                  {
                    _this : this,
                  }
                );
              }
            )
            .catch(
              ( error ) => {
                console.debug( 'inviteContractorsToVacancy error' ); //TODO //FIXME muss weg
                console.debug( error ); //TODO //FIXME muss weg
              }
            );
          },

          applyFilter : () => {
            console.debug( 'applyFilter' ); //FIXME muss weg

            this.getContractors();
          },
        }
      },

      helpers : () => {
        return {
          backToApp : ( params = {} ) => {
            console.debug( "backToApp" ); // FIXME muss weg

            params._this.selected = [];
            params._this.$emit( 'close' );
          },

          resetSortTable : ( params = {} ) => {
            console.debug( 'resetSortTable' );
            console.debug( params );

            params.this.sortTable.activeParameter = params.activeParameter;

            params.this.sortTable.parameters.firstname.active   = false;
            params.this.sortTable.parameters.firstname.orderBy  = '';

            params.this.sortTable.parameters.value.active   = false;
            params.this.sortTable.parameters.value.orderBy  = '';

            params.this.sortTable.parameters.location_address.active   = false;
            params.this.sortTable.parameters.location_address.orderBy  = '';

            params.this.sortTable.parameters.count_tasks.active   = false;
            params.this.sortTable.parameters.count_tasks.orderBy  = '';
          },
        }
      },
    },

    mounted ()
    {
      console.debug( 'this.contractors: ', this.contractors );
      //this.getContractors();
    },
  }
</script>

<style lang="scss">

  /* OBJECTS STYLES START */
    .addPerformersOverlay {
      .v-overlay__content {
        width       : 100%;
        height      : 100%;
        overflow    : scroll;
        background  : #FFFFFF;
      }

      .addPerformersOverlay__content_wrapper {
        background    : #fff;
        width         : 100%;
        color         : #0082DE;
        padding-left  : 24px;
        padding-top   : 27px;
        padding-right : 140px;

        .back-to-app {
          width           : max-content;
          display         : flex;
          flex-direction  : row;
          flex-wrap       : nowrap;
          align-content   : center;
          justify-content : flex-start;
          align-items     : center;
          cursor          : pointer;
          margin-bottom   : 38px;

          .back-to-app__icon {
            color : inherit;
          }
        }

        .addPerformersOverlay__content {
          .addPerformersOverlay__content_header {
            font-weight   : bold;
            font-size     : 32px;
            line-height   : 125%;
            color         : #263043;
            margin-bottom : 20px;
          }
        }
      }

      .performer-address {
        width: 400px;
        white-space: pre-line;
      }
    }

    .tb-column {
      cursor : pointer;

      .sort-icon {
        opacity   : 0;
        font-size : 18px;

        &:hover {
          opacity : 1;
        }

        &.active {
          opacity : 1;
          color   : #000000;
        }

        &.asc {
          transform: rotate( 0deg );
        }

        &.desc {
          transform: rotate( 180deg );

          &:hover {
            transform: rotate( 180deg ) !important;
          }
        }
      }
    }

  /* OBJECTS STYLES START */

  .v-tabs-bar {
    border-bottom: 1px solid #D5DEE8;
  }

  .form-tabs {
    margin-bottom : 21px !important;
  }

  .filter {
    margin-bottom: 32px;
  }

</style>

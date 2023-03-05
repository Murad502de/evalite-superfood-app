<template lang="pug">

.activity
  TableDisplaySettings(
    :sort_select_items="sort_select_items"
    @input_search="onSearchInput( { $event } )"
    @sort_select_change="handlers().onSortSelectChange( { $event } )"
  )

  .table-activity
    .table-list-activity
      v-data-table(
        :headers="headers"
        :items="activity"
        class="activity-table"
        item-key="uuid"
        :item-class="rowClass"
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.date="{ item }" )
          .date-activity
            .date {{ helpers().parseDate( { date : item.created_at, type : 'date' } ) }}
            .time {{ helpers().parseDate( { date : item.created_at, type : 'time' } ) }}

        template( v-slot:item.name="{ item }" )
          a.name-activity(:href="'/'+item.type+'s/'+item.uuid")
            .titel {{ item.name }}
            .untertitel {{ item.id }}

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE } from '@/constants/';
  import _ from 'lodash';

  export default {

    components : {},

    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    computed : {
      ...mapGetters( 'contractors', [ 'contractor', 'searchParams', ] ),

      activity ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractorActive' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id_active' ];

          default :
          return [];
        }
      },
    },

    data ()
    {
      return {
        headers : [
          {text: 'date',   value: 'date', width: '16px'},
          {text: 'name',   value: 'name'},
        ],

        sort_select_items : [
          {
            uuid : 'uuid_date_up',
            name : 'Дата по возрастанию',
            sort : 'asc',
            order : 'created_at',
          },

          {
            uuid : 'uuid_date_down',
            name : 'Дата по убыванию',
            sort : 'desc',
            order : 'created_at',
          },
        ],

      }
    },

    methods : {
      ...mapActions( 'contractors', [ 'fetchContractorActive', 'setSearchParams', ] ),
      ...mapActions( 'employee_id', [ 'fetchEmployeeActive', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          onSortSelectChange : ( payload = {} ) => {
            let selectedOption = this.sort_select_items.find( item => item.uuid === payload.$event );

            console.log( "onSortSelectChange", payload, selectedOption ); // DELETE

            switch ( this.user_type )
            {
              case CONTRACTOR :
                this.setSearchParams( { ...this.searchParams, order : selectedOption.order, sort : selectedOption[ 'sort' ] } ).then(
                  () => {
                    this.fetchContractorActive( { uuid : this.contractor.uuid } );
                  }
                );
              break;

              case EMPLOYEE :
                let filter = {order : selectedOption.order, sort : selectedOption[ 'sort' ]};
                this.fetchEmployeeActive( { requestId: this.$route.params.id, params  : filter } );
              break;
            }
          },
        }
      },

      helpers ()
      {
        return {

          /**
           *
           * @param { object } params
           * {
           *    date : '2021-12-23T12:59:03.000000Z'
           * }
           */
          parseDate : ( payload = {} ) => {
            let splitedPayloadDate = payload.date.split( 'T' );

            let date = splitedPayloadDate[ 0 ].split( '-' );
            let time = splitedPayloadDate[ 1 ].split( '.' )[ 0 ].split( ':' );

            if ( payload.type === 'date' )
            {
              return `${ date[ 2 ] }.${ date[ 1 ] }.${ date[ 0 ] }`;
            }

            if ( payload.type === 'time' )
            {
              return `${ time[ 0 ] }:${ time[ 1 ] }`;
            }

            return `${ date[ 2 ] }.${ date[ 1 ] }.${ date[ 0 ] } ${ time[ 0 ] }:${ time[ 1 ] }`;
          },
        }
      },

      init ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
            this.fetchContractorActive( { uuid : this.contractor.uuid } );
            break;

          case EMPLOYEE :
            this.fetchEmployeeActive( { requestId: this.$route.params.id, params  : {} } );
            break;
        }
      },

      bindActions (){},

      rowClass( item )
      {
        const rowClass = 'activity-row';

        return rowClass;;
      },

      onSearchInput : _.debounce(
        function( payload = {} ) {
          console.log( "onSearchInput", payload ); // DELETE

          switch ( this.user_type )
          {
            case CONTRACTOR :
              this.setSearchParams( { ...this.searchParams, search : payload.$event } ).then(
                () => {
                  this.fetchContractorActive( { uuid : this.contractor.uuid } );
                }
              );
            break;

            case EMPLOYEE :
              let search_text = {"search": payload.$event};
              this.fetchEmployeeActive( { requestId: this.$route.params.id, params  : search_text } );
            break;
          }
        },

        400
      ),
    },

    mounted ()
    {
      this.init();
    },
  }

</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .activity-table
  {
    background-color  : unset !important;

    .v-data-table__wrapper
    {
      background    : #FFFFFF;
      border        : 1px solid #E0E0E0;
      box-sizing    : border-box;
      box-shadow    : 0px 6px 73px rgba(0, 0, 0, 0.07);
      border-radius : 14px;
    }

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }

    .activity-row
    {
      background-color  : #FFFFFF !important;

      .color-black
      {
        position : relative;

        &::before
        {
          content           : "";
          position          : absolute;
          width             : 10px;
          height            : 10px;
          background-color  : #19A74A;
          border-radius     : 100%;
          left              : -35px;
          top               : 5px;
        }
      }

      .text-start
      {
        padding: 16px 25px !important;

        &:last-child
        {
          padding-right : 90px !important;
        }
      }
    }

    .date-activity
    {
      font-weight: normal;
      font-size: 16px;
      line-height: 125%;
      color: #7A91A9;
    }

    .name-activity
    {
      //width: 230px;
      font-style: normal;
      font-weight: 600;

      .titel
      {
        white-space   : nowrap;
        overflow      : hidden;
        text-overflow : ellipsis;

        font-size: 16px;
        line-height: 125%;

        color: #0082DE;
      }

      .untertitel
      {
        font-size: 14px;
        line-height: 18px;
        color: #7A91A9;
      }
    }

    .status-activity
    {
      font-style  : normal;
      font-weight : 600;
      font-size   : 16px;
      line-height : 125%;
      color       : #272833;

      width: 140px;
    }

    .activity-crt
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;

      .logo
      {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        margin: 0 16px;
      }

      .from, .to
      {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 125%;
        color: #7A91A9;
      }
    }
  }


/* OBJECTS STYLES END */

</style>

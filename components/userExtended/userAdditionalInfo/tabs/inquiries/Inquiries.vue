<template lang="pug">

.inquiries
  TableDisplaySettings(
    :sort_select_items="sort_select_items"
    @input_search="onSearchInput( { $event } )"
    @sort_select_change="handlers().onSortSelectChange( { $event } )"
  )

  .table-inquiries
    .table-list-style
      v-data-table(
        :headers="headers"
        :items="tasks"
        class="inquiries-table"
        item-key="uuid"
        :item-class="rowClass"
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.bunte_seite="{ item }" )
          div.bunte_seite

        template( v-slot:item.nummer="{ item }" )
          div
            span {{ `№6438` }}

        template( v-slot:item.name="{ item }" )
          .name-inquiries
            span( class="color-black" ) {{ item.name }}

        template( v-slot:item.payment="{ item }" )
          .payment
            .wrapper
              span.value {{ `${ item.payment.value || '0' } р. / смена` }}

        template( v-slot:item.object="{ item }" ) {{ item.object.name }}

        template( v-slot:item.date="{ item }" ) {{ helpers().parseDate( { date : item.created_at } ) }}

        template( v-slot:item.actions="{ item }" )
          div( class="d-flex justify-end" )
            v-menu( bottom rounded="10" offset-y nudge-bottom="10" )
              template( v-slot:activator="{ on }" )
                v-btn.icon( v-on="on" class="mix-edit-btn" )
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content( class="justify-start" )
                  div( class="mx-auto text-left" )
                    nuxt-link( :to="'/tasks/'+ item.uuid +'/edit/'" )
                      span Редактировать

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/';

  export default {

    components : {},

    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    computed : {
      tasks ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractorTasks' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id_tasks' ];

          default :
          return {};
        }
      },
    },

    data ()
    {
      return {
        headers : [
          {text: 'bunte_seite', value: 'bunte_seite',},
          {text: 'nummer',      value: 'nummer',},
          {text: 'name',        value: 'name',},
          {text: 'payment',     value: 'payment'},
          {text: 'object',      value: 'object'},
          {text: 'date',        value: 'date', },
          {text: 'actions',     value: 'actions', sortable: false},
        ],

        sort_select_items : [
          {
            uuid : 'uuid_date_up',
            name : 'Последняя активность по возрастанию',
            sort : 'asc',
            order : 'date',
          },

          {
            uuid : 'uuid_date_down',
            name : 'Последняя активность по убыванию',
            sort : 'desc',
            order : 'date',
          },

          {
            uuid : 'uuid_payment_up',
            name : 'Завершение по возрастанию',
            sort : 'asc',
            order : 'end_date',
          },

          {
            uuid : 'uuid_payment_down',
            name : 'Завершение по убыванию',
            sort : 'desc',
            order : 'end_date',
          },
        ],

        searchParams : {},
      }
    },

    methods : {
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
        return {}
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

            let result = `${ date[ 2 ] }.${ date[ 1 ] }.${ date[ 0 ] } ${ time[ 0 ] }:${ time[ 1 ] }`;

            return result;
          },
        }
      },

      init (){},

      bindActions (){},

      rowClass( item )
      {
        const rowClass = 'inquiries-row';

        return rowClass;;
      },

      onSearchInput : _.debounce(
        function( payload = {} ) {
          console.log( "onSearchInput", payload ); // DELETE

          switch ( this.user_type )
          {
            case CONTRACTOR :
              this.searchParams = { ...this.searchParams, search : payload.$event, }
              this.getContractorTasks( { uuid : this.contractor.uuid, params : this.searchParams, } );
            break;

            case EMPLOYEE :
            break;
          }
        },

        400
      ),
    }

  }

</script>

<style lang="scss">

/* OBJECTS STYLES START */
  .inquiries-table
  {
    background-color  : unset !important;

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }

    .inquiries-row
    {
      background-color  : #FFFFFF !important;

      .text-start
      {
        &:first-child
        {
          padding : 0;

          .bunte_seite
          {
            height: 100%;
            background: #6EC7A4;
            width: 10px;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            left: -1px;
          }
        }
      }

      .color-black
      {
        position : relative;

        &::before
        {
          content           : "";
          position          : absolute;
          width             : 10px;
          height            : 10px;
          background-color  : #0082DE;
          border-radius     : 100%;
          left              : -25px;
          top               : 5px;
        }
      }

      .name-inquiries
      {
        width         : 200px;
        white-space   : nowrap;
        overflow      : hidden;
        text-overflow : ellipsis;
      }
    }
  }

  .payment
  {
    display         : flex;
    flex-direction  : row;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : center;
    align-items     : center;
    background      : #E4F1FA;
    border-radius   : 6px;
    padding         : 7px 8px;

    .wrapper
    {
      display         : flex;
      flex-direction  : column;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : center;
      align-items     : center;

      .value
      {
        font-style      : normal;
        font-weight     : bold;
        font-size       : 14px;
        line-height     : 125%;
        letter-spacing  : 0.01em;
        color           : #0082DE;
        white-space     : nowrap;
      }
    }
  }
/* OBJECTS STYLES END */

</style>

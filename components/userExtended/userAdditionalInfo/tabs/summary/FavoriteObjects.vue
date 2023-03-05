<template lang="pug">

.favorite-objects
  .wrapper
    .header
      h3.titel {{ titles.header }}

    .table-list-style
      v-data-table(
        :headers="headers"
        :items="user[nameObjectsArray]"
        class="favorite-objects-table"
        item-key="uuid"
        :item-class="rowClass"
        show-select
        hide-default-footer
        hide-default-header
      )
        template( v-slot:item.name="{ item }" )
          div
            span.request-i
            span( class="color-black" ) {{ item.name }}

        template( v-slot:item.rating="{ item }" )
          Rating(:rating="item.raiting")

        template( v-slot:item.tasks="{ item }" )
          span( class="color-black" ) {{ item.tasks }}

        template( v-slot:item.address="{ item }" ) {{ item.address }}

        template( v-slot:item.actions="{ item }" )
          div( class="d-flex justify-end" )
            v-menu( bottom rounded="10" offset-y nudge-bottom="10" )
              template( v-slot:activator="{ on }" )
                v-btn.icon( v-on="on" class="mix-edit-btn" )
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content( class="justify-start" )
                  div( class="mx-auto text-left" )
                    nuxt-link( :to="'/objects/'+ item.uuid +'/edit/'" )
                      span Редактировать

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR, EMPLOYEE }                           from '@/constants/'

  export default {
    components : {},

    props : {
      user_type : {
        type      : String,
        required  : true,
      },
    },

    computed : {
      user ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
          return this.$store.getters[ 'contractors/contractor' ];

          case EMPLOYEE :
          return this.$store.getters[ 'employee_id/employee_id' ];

          default :
          return {};
        }
      },
      titles ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
            return {
              header  : 'Любимые объекты',
            };

          case EMPLOYEE :
            return {
              header  : 'Активные объекты',
            };

          default :
            return {
            header  : 'Объекты',
          };
        }
      },
      nameObjectsArray ()
      {
        switch ( this.user_type )
        {
          case CONTRACTOR :
            return 'favorite_objects';

          case EMPLOYEE :
            return 'objects';

          default :
            return 'objects';
        }
      },
    },

    data ()
    {
      return {
        headers : [
          {text: 'Фио',       value: 'name',},
          {text: 'Рейтинг',   value: 'rating'},
          {text: 'Заявки',    value: 'tasks'},
          {text: 'Адрес',     value: 'address', },
          {text: '',          value: 'actions', sortable: false, align: 'right'},
        ],
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
        return {}
      },

      init (){},

      bindActions (){},

      rowClass( item )
      {
        const rowClass = 'favorite-row';

        return rowClass;;
      }

    },
    mounted() {}

  }

</script>

<style lang="scss">

@import '../../../../../assets/scss/colors.scss';

/* OBJECTS STYLES START */
  .favorite-objects-table
  {
    background-color  : unset !important;

    .v-data-table__empty-wrapper
    {
      background-color  : #FFFFFF;
    }

    .favorite-row
    {
      background-color  : #FFFFFF !important;

    }
    .request-i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: $green;
      margin-right: 8px;
      border-radius: 10px;
    }

  }
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
  .mix-edit-btn
  {
    background: transparent !important;
    border: 0;
    box-shadow: none;
    border-radius: 100%;
    height: 36px;
    width: 30px;
    min-width: 36px !important;
    margin: 0;
    padding: 0;
  }
/* MIXINS STYLES END */

</style>

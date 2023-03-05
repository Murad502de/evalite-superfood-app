<template lang="pug">
.rq-ptestl
  TasksList
    template( v-slot:desktop )
      .table-list-style
        v-data-table(
          :headers="headers"
          :items="tasks"
          item-key="uuid"
          hide-default-footer
          hide-default-header
        )
          template( v-slot:item.name="{ item }" )
            div.rq-ptestl__desktop-name
              .rq-ptestl-title {{ item.info.name }}
              .rq-ptestl__desktop-date {{ '01.10.2021 08:00' }}

          template( v-slot:item.status="{ item }" )
            Status(:status="item.my_status" :text="item.my_status_name")

          template( v-slot:item.payment="{ item }" )
            div {{ item.info.payment.value || '20 000 р./смена' }}

          template( v-slot:item.object_name="{ item }" )
            div {{ item.info.description || 'Водитель высотного электр... +2' }}

          template( v-slot:item.start_date="{ item }" )
            div {{ item.info.object.name || 'test_string' }}

          template( v-slot:item.actions="{ item }" )
            v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              left
            )
              template(v-slot:activator="{ on }")
                v-btn(icon v-on="on")
                  v-icon mdi-dots-vertical

              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    .actions
                      .action
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}
    template( v-slot:mobile )
      div(
        v-for="task in tasks"
        class="rq-ctwsr__mobile-card rq-ptestl-card"
      )
        .rq-ptestl-card__fields
          .rq-ptestl-card__fields-item.rq-ptestl__mobile-title {{ 'Нужны кладовщики в Леруа длинное название заявки' }}
          .rq-ptestl-card__fields-item
            Status(:status="task.my_status" :text="task.my_status_name")
          .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-payment {{ '20 000 р./смена' }}
          .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-text {{ 'Водитель высотного электроштабелера' }}
          .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-text {{ 'Грузчик' }}
          .rq-ptestl-card__fields-item.rq-ptestl__mobile-title-object {{ 'Озон  Мытищи' }}
        .rq-ptestl-card__actions
          v-menu(
              bottom
              rounded="10"
              offset-y
              nudge-bottom="10"
              left
            )
              template(v-slot:activator="{ on }")
                v-btn(icon v-on="on")
                  v-icon mdi-dots-horizontal

              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left
                    .actions
                      .action
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}
                        .action-item {{ 'action-item' }}

</template>

<script>
import TasksList from '@/components/composite/TableWithSeparatedRows';
import Status from '@/components/UI/Status';

export default {
  components: {
    TasksList,
    Status,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  },
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  data() {
    return {
      headers: [
        { text: 'Название', align: 'start', value: 'name', },
        { text: 'status', align: 'start', value: 'status', sortable: false, },
        { text: 'оплата', value: 'payment' },
        { text: 'Объект', value: 'object_name' },
        { text: 'Начало работ', value: 'start_date' },
        { text: '', value: 'actions', sortable: false, align: 'right' },
      ],
    }
  },
  created() { },
  mounted() {
    console.debug('mounted TasksList', this.tasks);
  },
}
</script>

<style lang="scss">
.rq-ptestl {
  &__desktop {
    &-name {
      min-width: 280px;
      max-width: 382px;
    }
  }

  &__mobile {
    &-title {
      max-width: 280px;
      min-width: 150px;
      white-space: normal;
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;

      &-object {
        max-width: 280px;
        min-width: 150px;
        font-size: 14px;
        line-height: 125%;
      }
      &-payment {
        max-width: 280px;
        min-width: 150px;
        font-weight: 700;
        font-size: 16px;
        line-height: 125%;
        letter-spacing: 0.01em;
        color: #263043;
      }
      &-text {
        max-width: 280px;
        min-width: 150px;
        font-size: 14px;
        line-height: 125%;
        color: #666666;
      }
    }
  }

  &-title {
    white-space: normal;
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
  }

  &-card {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    &__fields {
      &-item {
        margin-top: 16px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
    &__actions{}
  }
}
</style>

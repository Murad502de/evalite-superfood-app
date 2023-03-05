<template lang="pug">

  .contractor-applications-id__container(:class="{'close': task_id.status == 'close'}")
    v-row
      v-col(cols="9")
        .wrap-composite-header
          Header(:content="task_id.name" :size="title_size" :isnew="false" :isback="false")
        .wrap-composite-details
          .num №{{ task_id.number }}
          .views
            v-icon(color="#7A91A9") mdi-eye-outline
            span {{ task_id.view }}

        .wrap-composite-details
          .pay(v-if="task_id.works && task_id.works.length") {{task_id.works[0].payment}} {{task_id.works[0].currency}} / {{task_id.works[0].period}}
          .date.d-flex
            .date-title Дата и время работ:
            span.color-black {{ getters().getRegDate( { created_at : task_id.start_date } ) }} {{ `${getters().getRegTime( { time : task_id.start_date } )} - `}}
            span.color-black {{ getters().getRegTime( { time : task_id.end_date } ) }}

        .selection(v-if="task_id.status != 'close'")
          .selection-info
            .selection-title Подбор закончится через:
            .selection-time {{task_id.hours_left}} ч. {{task_id.minutes_left}} мин.
          .selection-btns(v-if="my_status != 'rejected'")
            v-btn.btn-blue(text height="48" outlined @click="taskAction(my_status, task_id.uuid)") {{btnText}}
            v-btn.btn-blue(text height="48" v-if="my_status == 'invited'" outlined @click="rejectToTask({ requestId : task_id.uuid })") Отказаться

          .selection-info(v-if="my_status == 'rejected'") Набор закрыт


        .selection.close(v-if="task_id.status == 'close'")
          v-row
            v-col(cols="7")
              .selection-info
                .selection-title
                  v-icon(color="#6EC7A4") mdi-check-circle
                  span Заявка завершена
                .selection-details
                  .worked
                    .selection-details-title Отработано
                    .selection-details-details {{task_id.hours}} ч
                  .working-out
                    .selection-details-title Выработка
                    .selection-details-details -
                  .paid
                    .selection-details-title Оплачено
                    .selection-details-details {{task_id.my_payment}} р.

            v-col(cols="5")
              .selection-support
                .selection-support-text Если мы неправильно зафиксировали фактически отработанное время или выработку - напишите, разберемся.
                .selection-support-bt
                  v-btn.btn-blue.w-100(text height="48" outlined to="/appeal" nuxt) написать в поддержку

        .wrap-composite-state
          v-container(class="pa-0")
            v-row(no-gutters)
              v-col(cols="12" no-gutters)
                v-subheader Описание
                div {{task_id.description}}

            v-row(no-gutters)
              v-col(cols="12" no-gutters)
                v-subheader Дополнительные условия
                div
                  CloudTag(:listTag="additionalTag" listStyle="outline")

            v-divider(v-if="task_id.status != 'close'")

        .wrap-support(v-if="task_id.status != 'close'")
          v-row(no-gutters)
            v-col(cols="8" no-gutters) Если у вас возникли проблемы с откликом на заявку, отклонение без причин, несвоевременная оплата итд, напишите в поддержку.
            v-col.d-flex.justify-end(cols="4" no-gutters)
              v-btn.w-100(text height="40" outlined to="/appeal" nuxt) написать в поддежку


      v-col(cols="3" v-if="task_id.location")
        .bar-element
          Map(:center_coords="mapCenter" :markers="mapMarker" zoom="12" height="124")

          .inner-indent
            .bar-element-row
              .bar-element-title Адрес
              .color-black {{ task_id.location.region }}, {{ task_id.location.city }}

        .bar-element
          .inner-indent
            .bar-element-row
              .bar-element-title Типы работ:
              CloudTag(:listTag="listTag")

        .bar-element.object(v-if="task_id.object")
          .inner-indent

            .bar-element-row.d-flex
              .title-row Объект:
              .color-black.object-name {{task_id.object.name}}

            .bar-element-row.d-flex
              .title-row Рейтинг:
              Rating(:rating="task_id.object.raiting")

            .bar-element-row.d-flex
              .title-row Зарегистрирован:
              .color-black {{ getters().getRegDate( { created_at : task_id.created_at } ) }}

            .bar-element-row.d-flex
              .title-row Заявок:
              .color-black {{task_id.object.count_tasks}}

            v-divider

            .bar-element-row.subscribe.d-flex(:class="{'active': task_id.subscribe}")
              v-icon.subscribe-icon(color="#7A91A9") mdi-bell
              .subscribe-text
                span(v-if="task_id.subscribe") Вы подписаны на новые заявки объекта
                a(v-if="task_id.subscribe" @click="subscribeToObject({requestId: task_id.uuid, objectId: [task_id.object.uuid]})") Отписаться
                a(@click="subscribeToObject({requestId: task_id.uuid, objectId: [task_id.object.uuid]})" v-if="!task_id.subscribe") Подписаться на новые заявки объекта


</template>

<script>

import {mapActions, mapMutations} from "vuex";

export default {

  components: {},

  data() {
    return {
      title_size: 'large',
      title_create: false,
      additionalTag: ['Первый разряд', 'Униформа', 'Инструмент', 'Первый разряд', 'Униформа'],
    }
  },
  computed: {
    task_id() {
      return this.$store.getters['request_id/request_id'];
    },
    my_status() {
      console.log('status ----- ', this.task_id.my_status);
      return this.task_id.my_status;
    },
    mapCenter() {
      return [this.task_id.location.coordinates.lat, this.task_id.location.coordinates.lon];
    },
    mapMarker() {
      return [
        {
          "geometry": {
            "type": "Point",
            "coordinates": [this.task_id.location.coordinates.lat, this.task_id.location.coordinates.lon]
          },
          "properties": {
            "hintContent": this.task_id.name
          },
          "uuid": this.task_id.uuid,
          "info": this.task_id.description
        }
      ]
    },
    listTag() {
      let listWorks = [];
      for (let i = 0; i < this.task_id.works.length; i++) {
        listWorks.push(this.task_id.works[i].name);
      }
      return listWorks;
    },
    btnText() {
      let btn_text = 'Откликнуться',
        status = this.my_status;
      if (status == 'requested' || status == 'accepted') {
        btn_text = 'Отменить';
      } else if (status == 'invited') {
        btn_text = 'Принять';
      }
      return btn_text;
    },
  },

  methods: {
    ...mapActions('request_id', ['fetchRequestId',]),
    ...mapActions('request_id', ['subscribeToObject',]),
    ...mapActions('request_id', ['respondToTask',]),
    ...mapActions('request_id', ['acceptToTask',]),
    ...mapActions('request_id', ['cancelToTask',]),
    ...mapActions('request_id', ['rejectToTask',]),
    ...mapMutations('breadcrumbs', ["setBreadcrumbs",]),

    getters() {
      return {
        /**
         *
         * @param { object } params
         * {
         *    created_at : "2021-12-15T11:39:40.000000Z",
         * }
         */
        getRegDate: (params = {}) => {

          if (!params.created_at) {
            return '';
          }

          let splitedCreat_at = params.created_at.split('T')[0].split('-');

          return `${splitedCreat_at[2]} ${this.helpers().parseMonth({month: splitedCreat_at[1]})} ${splitedCreat_at[0]}`;
        },
        getRegTime: (params = {}) => {

          if (!params.time) {
            return '';
          }

          return params.time.substr(11, 5);
        },
      }
    },

    handlers() {
      return {}
    },

    helpers() {
      return {

        /**
         *
         * @param { object } params
         * {
         *    month : "12" || "01" || "09",
         * }
         */
        parseMonth: (params = {}) => {
          switch (params.month) {
            case '01' :
              return 'января';

            case '02' :
              return 'февраля';

            case '03' :
              return 'марта';

            case '04' :
              return 'апреля';

            case '05' :
              return 'мая';

            case '06' :
              return 'июня';

            case '07' :
              return 'июля';

            case '08' :
              return 'августа';

            case '09' :
              return 'сентября';

            case '10' :
              return 'октября';

            case '11' :
              return 'ноября';

            case '12' :
              return 'декабря';

            default :
              return '';
          }
        },
      }
    },

    taskAction(my_status, uuid) {
      if (my_status == 'requested' || my_status == 'accepted') {
        this.cancelToTask({requestId: uuid});
      } else if (my_status == 'invited') {
        this.acceptToTask({requestId: uuid});
      } else {
        this.respondToTask({requestId: uuid});
      }
    }
  },
  async created() {
    await this.fetchRequestId(this.$route.params.id);

    this.$route.meta.title = this.request_id.name;
    this.setBreadcrumbs(this.$route.fullPath);

  }

}

</script>

<style lang="scss">

@import '../../../../assets/scss/colors';

.contractor-applications-id__container {

  .wrap-composite-header {
    display: flex;
    align-items: center;
    margin-bottom: 28px;
  }

  .wrap-composite-details {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: $grey;
    margin-bottom: 32px;

    > div {
      margin-right: 24px;
    }

    .object {
      color: $black;
      font-weight: 700;
    }

    .views {
      .v-icon {
        margin-right: 10px;
      }
    }

    .pay {
      font-size: 18px;
      font-weight: 700;
      color: $blue;
      background: $light-blue;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .date {
      font-size: 16px;
      font-weight: 600;

      .date-title {
        margin-right: 8px;
      }
    }
  }

  .selection {
    background: #F6FBFF;
    border-radius: 14px;
    border: 1px solid #E4E9EE;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);

    .selection-info {
      display: flex;
      align-items: center;

      .selection-title {
        color: $grey;
        font-weight: 600;
      }

      .selection-time {
        font-size: 36px;
        color: $blue;
        margin-left: 16px;
      }
    }

    .selection-btns {
      display: flex;

      .v-btn {
        min-width: 218px;
        text-transform: uppercase;

        &:last-child {
          margin-left: 32px;
        }
      }
    }


    &.close {

      .selection-info {
        flex-direction: column;
        align-items: flex-start;

        .selection-title {
          color: $black;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 36px;

          .v-icon {
            margin-right: 6px;
          }
        }

        .selection-details {
          display: flex;

          .selection-details-title {
            margin-bottom: 10px;
            margin-right: 58px;
            font-weight: 600;
          }

          .selection-details-details {
            font-size: 26px;
            font-weight: 700;
          }

          .paid {
            .selection-details-details {
              color: $green;
            }
          }
        }
      }

      .selection-support {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .v-btn {
          margin: 0;
        }
      }

    }
  }

  .wrap-composite-state {
    .v-subheader {
      padding: 0;
      margin-top: 32px;
      margin-bottom: 8px;
    }
  }

  .wrap-support {
    color: $grey;
    font-size: 14px;
    line-height: 1.25;

    .v-btn--outlined.v-btn--text {
      border-color: rgba(0, 0, 0, 0.12);
      font-weight: 700;
      text-transform: uppercase;
      max-width: 298px;
    }
  }


  .bar-element {
    font-weight: 400;

    &.object {
      .bar-element-row {
        margin-bottom: 8px;

      }
    }

    .bar-element-title {
      font-weight: 600;
    }

    .object-name {
      font-weight: 700;
    }


    .wrap-rating {
      .text-caption {
        font-size: 16px !Important;
        color: $blue !Important;
        font-weight: 600;
        margin-top: 3px;
      }
    }
  }

  .subscribe {
    font-weight: 400;
    align-items: flex-start;
    line-height: 1;

    &:not(.active) {
      color: $blue;
      font-weight: 600;
    }

    .v-icon {
      margin-right: 10px;
    }

    a {
      display: block;
      font-weight: 600;
      margin-top: 4px;
    }

    &.active {

      a {
        margin-top: 8px;
      }
    }

  }

  &.close {
    .wrap-composite-state,
    .cloud-tag.outline li,
    .v-subheader {
      color: $grey;
    }

    .wrap-composite-details {
      .pay {
        color: $grey;
        background: #F6FBFF;
      }
    }
  }

}


</style>

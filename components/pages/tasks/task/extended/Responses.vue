<template lang="pug">
  .table-row.table-executor
    .table-list-style-minify
      v-data-table.elevation-0(
        :headers="headers",
        :items="items",
        item-key="uuid"
        hide-default-footer,
        show-select,
        disable-pagination
        v-model="newModel"
        :options.sync="optionsFilter"
      )

        template(v-slot:body.prepend="{ headers }" v-if="isAddElement")
          tr
            td.row-add-element(:colspan="headers.length")
              .button-add-element(@click="$emit('addSelection')")
                v-icon.mr-2(color="#0082DE") mdi-magnify
                span Добавить из общего списка

        template(v-slot:item.actions="{ item }")
          .d-flex.justify-end.card-actions
            v-menu(
              bottom,
              rounded="10",
              offset-y,
              nudge-bottom="10",
              content-class="card-actions-menu"
            )
              template(v-slot:activator="{ on }")
                v-btn.actions-btn(icon, v-on="on")
                  v-icon mdi-dots-horizontal

              v-card
                v-list-item-content.justify-start
                  .mx-auto.text-left.card-action(v-for="action in actions")

                    v-menu(
                      open-on-hover right offset-x
                      v-if="action.sub_actions"
                      content-class="card-actions-menu"
                    )
                      template(v-slot:activator="{ on, attrs }")
                        a.d-flex.justify-space-between(v-bind="attrs" v-on="on")
                          div
                            v-icon {{ action.icon }}
                            span {{ action.text }}
                          v-icon mdi-menu-right
                      v-card
                        v-list-item-content.justify-start
                          .mx-auto.text-left.card-action(v-for="(sub_action, index) in action.sub_actions" :key="index")
                            a.d-flex.align-center(@click.prevent="callAction(action.action, [item.uuid], sub_action.params)")
                              CommunicationIcon(v-if="sub_action.custom_icon" :iconType="sub_action.icon")
                              v-icon(v-else) {{ sub_action.icon }}
                              span.select-status-title {{ sub_action.text }}

                    a(@click.prevent="callAction(action.action, [item.uuid])" v-else)
                      v-icon {{ action.icon }}
                      span {{ action.text }}


        template(v-slot:item.lastname="{ item }")
          ExecutorStatus(:status_alias="item.last_active" :middlename="item.middlename" :firstname="item.firstname" :lastname="item.lastname" :link="'/performers/'+ item.uuid")

        template(v-slot:item.shortname="{ item }")
          ExecutorStatus(:status_alias="item.last_active" :middlename="item.middlename" :firstname="item.firstname" :lastname="item.lastname" :link="'/performers/'+ item.uuid" :short_name="true")

        template(v-slot:item.trust="{ item }")
          span {{ item.trust }}%

        template(v-slot:item.status="{ item }")
          Status(:status_alias="item.status")

        template(v-slot:item.communication="{ item }")
          Communication(:communications="item.communication")

        template(v-slot:item.phone="{ item }")
          a.wrap-phone(href="tel:item.phone")
            v-icon(color="#263043") mdi-phone
            span.phone {{ item.phone }}

        template(v-slot:item.professions="{ item }")
          v-menu(
            bottom,
            rounded="10",
            offset-y,
            nudge-bottom="10",
            content-class="card-actions-menu"
            v-if="item.professions && item.professions.length > 0"
          )
            template(v-slot:activator="{ on }")
              a.professions(v-on="on" @click.prevent) {{ item.professions[0] }}
                span.count + {{item.professions.length - 1}}

            v-card.pa-5
              .simple-list
                div(v-for="(profession, index) in item.professions.slice(1)", :key="index") {{ profession }}

        template(v-slot:item.location="{ item }")
          .wrap-location(v-if="item.location" :class="returnDistanceClass(item.location.distance)") {{ previewText(item.location.address) }}


</template>

<script>

import Status from "@/components/pages/tasks/task/extended/Status";
import ExecutorStatus from "@/components/pages/tasks/task/extended/ExecutorStatus";
import Communication from "@/components/pages/tasks/task/extended/Communication";
import CommunicationIcon from "@/components/pages/tasks/task/extended/CommunicationIcon";

export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
    headers: {
      type: Array,
      default: [],
    },
    model:{
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    isAddElement: {
      type: Boolean,
      default: false,
    },
  },
  components: {Status, Communication, ExecutorStatus, CommunicationIcon},
  data() {
    return {
      newModel: [],
      optionsFilter: {},
    }
  },
  watch: {
    newModel: function () {
      this.$emit('setSelected', this.newModel)
    },
    model: function () {
      this.newModel = this.model;
    },
    optionsFilter: {
      handler() {
        console.log('Serverside sorted .....');
        this.$emit('getDataFromApi', this.optionsFilter);
      },
      deep: true,
    },
  },
  methods: {
    callAction(action, uuids) {
      console.log(action, uuids);
      this.$emit('callAction', {action, uuids})
    },

    previewText(value) {
      if (value && value.length > 30) {
        return value.substring(0, 30) + '...';
      } else {
        return value;
      }
    },

    returnDistanceClass(distance) {
      let css_class = 'green_location';

      if (distance > 5) {
        css_class = 'yellow_location';
      } else if (distance > 15) {
        css_class = 'red_location';
      }

      return css_class;
    },
  }
}
</script>


<style lang="scss">

.table-executor {

  td {
    position: relative;
  }

  .wrap-phone {
    display: inline-flex;
    align-items: center;
    padding: 9px 14px;
    background: #F7F7F7;
    border-radius: 30px;
    color: #263043;
    font-weight: 600;
    text-decoration: none;

    .v-icon {
      font-size: 20px;
    }

    .phone {
      margin-left: 8px;
    }
  }

  .button-add-element {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    background: #F6FBFF;
    color: #0082DE;
    padding: 21px;
    margin: 8px 0;
    border-radius: 10px;
    border: 1px dashed #0082DE;
    cursor: pointer;
  }

  .wrap-location {
    background: #BEE6BF;
    color: #263043;
    font-weight: 600;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 5px 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    &.yellow_location {
      background: #BEE6BF;
    }

    &.red_location {
      background: #EFB0A9;
    }
  }
}

.v-card {
  .simple-list {
    line-height: 2;
  }
}
</style>

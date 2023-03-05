<template lang="pug">
  .inner-task-page
    v-container
      v-row.d-flex.pa-4.action-row(no-gutters)
        v-col.d-flex.w-100.align-center(cols="12")
          .wrap-tabs
            v-tabs.form-tabs-minify(v-model="tab", hide-slider, height="36" )
              v-tab(v-for="(item, index) in tabs_list", :key="index" @click="selectedItems = []") {{ item.title }}
                span.count {{ item.count }}

          .filter-row.d-flex.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
            .filter-row-left.d-flex
              TableFilter.ml-8(v-if="request_id_responses_filters.length > 0"
                v-show="tab == 0"
                :fields="request_id_responses_filters"
                :headers="headers_response_filter"
                name="filter_responses"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchResponseParams', 'optionsResponse', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_selection_filters.length > 0"
                v-show="tab == 1"
                :fields="request_id_selection_filters"
                :headers="headers_response_filter"
                name="filter_selection"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchSelectionParams', 'optionsSelection', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_invitations_filters.length > 0"
                v-show="tab == 2"
                :fields="request_id_invitations_filters"
                :headers="headers_response_filter"
                name="filter_invitations"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchInvitationsParams', 'optionsInvitations', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              TableFilter.ml-8(v-if="request_id_assigned_filters.length > 0"
                v-show="tab == 3"
                :fields="request_id_assigned_filters"
                :headers="headers_assigned_filter"
                name="filter_assigned"
                :page_uuid="request_id.uuid"
                @applyFilter="applyFilter('fetchAssignedParams', 'optionsAssigned', ...arguments)" @blurSearch="blurSearch" @focusSearch="focusSearch")

              .filter-col-after-left
                TableGroupAction(v-if="selectedItems.length > 0"
                  :actions="groupListAction" :selected="selectedItems"
                  @selectAction="callGroupAction" @clearSelected="clearSelected")

            .filter-row-right.d-flex
              v-btn.btn-blue.add(
                text,
                height="48",
                outlined,
                @click="openTimesheet"
              )
                span табель

              .card-actions
                v-menu(
                  bottom,
                  offset-y,
                  nudge-bottom="10",
                  content-class="card-actions-menu"
                )
                  template(v-slot:activator="{ on }")
                    v-btn.actions-btn(icon, v-on="on", height="48px", width="48px")
                      v-icon mdi-dots-horizontal

                  v-card
                    v-list-item-content.justify-start
                      .mx-auto.text-left.card-action.card-action-task(v-for="action in actions_tasks")
                        div(v-if="action.display")
                          v-menu(
                            open-on-hover left offset-x
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
                                  a.select-status(@click.prevent="callActionTask(action.action, [$route.params.id], sub_action.params)")
                                    v-icon(:color="sub_action.color") {{ sub_action.icon }}
                                    span.select-status-title {{ sub_action.text }}

                          a(@click.prevent="callActionTask(action.action, [$route.params.id])" v-else)
                            v-icon {{ action.icon }}
                            span {{ action.text }}


      v-row.d-flex(no-gutters)
        v-col(cols="12")
          v-window(v-model="tab")
            v-tab-item(eager)
              Responses(:items="request_id_responses" :headers="headers" :actions="actions_responses" :model="selectedItems"
                @callAction="callAction"
                @setSelected="setSelected"
                @getDataFromApi ="getDataFromApi('fetchResponseParams', 'optionsResponse', 'fetchRequestIdResponses', ...arguments)")

            v-tab-item(eager)
              Responses(:items="request_id_selection" :headers="headers_selection" :actions="actions_selection" :isAddElement="true" :model="selectedItems"
                @addSelection="addArtist"
                @callAction="callAction"
                @setSelected="setSelected"
                @getDataFromApi ="getDataFromApi('fetchSelectionParams', 'optionsSelection', 'fetchRequestIdSelection', ...arguments)")

            v-tab-item(eager)
              Responses(:items="request_id_invitations" :headers="headers_invitations" :actions="actions_invitations" :model="selectedItems"
                @callAction="callAction"
                @setSelected="setSelected"
                @getDataFromApi ="getDataFromApi('fetchInvitationsParams', 'optionsInvitations', 'fetchRequestIdInvitations', ...arguments)")

            v-tab-item(eager)
              Responses(:items="request_id_assigned" :headers="headers_assigned" :actions="actions_assigned" :model="selectedItems"
                @callAction="callAction"
                @setSelected="setSelected"
                @getDataFromApi ="getDataFromApi('fetchAssignedParams', 'optionsAssigned', 'fetchRequestIdAssigned', ...arguments)")


    Confirm(
      :isConfirmModal="isConfirmModal",
      :content="confirmModalContent",
      @confirmRemove="confirmRemove"
    )

</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from "vuex";
import Rating from "~/components/Rating";
import TableFilter from "@/components/composite/TableFilter";
import TableGroupAction from "@/components/composite/TableGroupAction";
import Responses from "@/components/pages/tasks/task/extended/Responses";
import Selection from "@/components/pages/tasks/task/extended/Selection";

export default {
  components: {Rating, TableFilter, TableGroupAction, Responses, Selection},
  props: [],
  data() {
    return {
      tab: null,
      headers: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "lastname"},
        {text: "Возраст", value: "age", width: '112px'},
        {text: "%БН", value: "trust", width: '112px'},
        {text: "ранг", value: "rank", width: '112px'},
        {text: "на объекте", value: "on_object", width: '112px'},
        {text: "Статус", value: "status", width: '150px'},
        {text: "профессия", value: "professions", sortable: false},
      ],
      headers_selection: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "lastname"},
        {text: "Возраст", value: "age", width: '112px'},
        {text: "ранг", value: "rank", width: '112px'},
        {text: "%БН", value: "trust", width: '112px'},
        {text: "на объекте", value: "on_object", width: '112px'},
        {text: "Статус набора", value: "status", width: '150px'},
      ],
      headers_invitations: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "lastname", width: '300px'},
        {text: "Возраст", value: "age", width: '107px'},
        {text: "%БН", value: "trust", width: '128px'},
        {text: "ранг", value: "rank", width: '107px'},
        {text: "Приглашен", value: "communication", width: '184px', sortable: false},
        {text: "Статус", value: "status", width: '150px'},
      ],
      headers_assigned: [
        {
          text: "",
          value: "actions",
          sortable: false,
          width: "30px",
          class: "actions",
          align: "center",
        },
        {text: "фио", align: "start", value: "lastname", width: '300px'},
        {text: "Возраст", value: "age", width: '107px'},
        {text: "рейтинг", value: "trust", width: '128px'},
        {text: "ранг", value: "rank", width: '107px'},
        {text: "ставка", value: "rate", width: '107px'},
        {text: "Статус выхода", value: "status", width: '184px'},
        {text: "телефон", value: "phone",},
      ],
      headers_history: [
        {text: "Дата", value: "date"},
        {text: "Автор", value: "author"},
        {text: "Элемент", value: "element"},
        {text: "Изменение", value: "change"},
      ],

      actions_responses: [
        {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
        {text: "Отклонить", icon: "mdi-close-box-outline", action: 'reject'},
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
      ],

      actions_selection: [
        {
          text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite',
          sub_actions: [
            {text: "SMS", icon: "sms", params: 'sms', custom_icon: true},
            {text: "Telegram", icon: "telegram", params: 'telegram', custom_icon: true},
            {text: "Email", icon: "email", params: 'email', custom_icon: true}
          ],
        },
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {text: "Удалить", icon: "mdi-close-box-outline", action: 'delete'},
      ],

      actions_invitations: [
        {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
        {text: "В карточку исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {
          text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite',
          sub_actions: [
            {text: "SMS", icon: "sms", params: 'sms', custom_icon: true},
            {text: "Telegram", icon: "telegram", params: 'telegram', custom_icon: true},
            {text: "Email", icon: "email", params: 'email', custom_icon: true}
          ],
        },
      ],

      actions_assigned: [
        {text: "Поставить отказ", icon: "mdi-close-box-outline", action: 'refuse'},
        {text: "Карточка исполнителя", icon: "mdi-clipboard-account-outline", action: 'openDetails'},
        {text: "Можно приезжать", icon: "mdi-check", action: 'accepted'},
      ],

      isSearchFocus: false,

      /* data for Overlay of adding Performers START*/
      addPerformersOverlay: false,
      /* data for Overlay of adding Performers END*/

      dispatchMetod: "fetchRequestIdDispatchers",

      selectedItems: [],
      headers_response_filter: [
        {field: 'trust', translit: 'Благонадежность', unit: '%'},
        {field: 'age', translit: 'Возраст',},
        {field: 'on_object', translit: 'На объекте',},
        {field: 'rank', translit: 'Ранг',},
        {field: 'status', translit: 'Статус',},
      ],
      headers_assigned_filter: [
        {field: 'trust', translit: 'Рейтинг', unit: '%'},
        {field: 'rank', translit: 'Ранг',},
        {field: 'rate', translit: 'Ставка', unit: 'р.'},
        {field: 'age', translit: 'Возраст',},
        {field: 'on_object', translit: 'На объекте',},
        {field: 'status', translit: 'Статус выхода',},
      ],
      actions_tasks: [
        {text: "Закрепить", icon: "mdi-pin-outline", action: 'onPinTabClicked', display: true},
        {text: "Открепить", icon: "mdi-pin-off-outline", action: 'onUnpinTabClicked', display: false},
        {text: "Создать копию", icon: "mdi-content-copy", action: 'copyTask', display: true},
        {text: "Перейти к объекту", icon: "mdi-exit-to-app", action: 'goToObject', display: true},
        {text: "Пометить на удаление", icon: "mdi-close-box-outline", action: 'markForDeletion', display: true},
        {text: "История изменений", icon: "mdi-timer-sand-empty", action: 'goToHistory', display: true},
        {text: "Редактировать", icon: "mdi-pencil-outline", action: 'editTask', display: true},
        {
          text: "Изменить статус", icon: "mdi-email-outline", action: 'editStatus', display: true,
          sub_actions: [
            {text: "Ведется набор", icon: "mdi-circle", params: 'isRecruiting', color: '#F4D150', display: true},
            {
              text: "Набор завершен",
              icon: "mdi-circle",
              params: 'recruitmentCompleted',
              color: '#71D472',
              display: true
            },
            {text: "В работе", icon: "mdi-circle", params: 'working', color: '#D7D7D7', display: true},
            {text: "Подтверждение", icon: "mdi-circle", params: 'confirmation', color: '#7B61FF', display: true},
            {text: "Не подтверждена", icon: "mdi-circle", params: 'notConfirmed', color: '#EB4D3D', display: true},
            {text: "Подтверждена", icon: "mdi-circle", params: 'confirmed', color: '#71D472', display: true},
          ],
        },
      ],
      optionsResponse: {},
      optionsSelection: {},
      optionsInvitations: {},
      optionsAssigned: {},
      fetchResponseParams: {
        "page": 1,
        "per_page": 15
      },
      fetchSelectionParams: {
        "page": 1,
        "per_page": 15
      },
      fetchInvitationsParams: {
        "page": 1,
        "per_page": 15
      },
      fetchAssignedParams: {
        "page": 1,
        "per_page": 15
      },
      isConfirmModal: false,
      confirmModalContent: {
        title: "Удалить эту заявку?",
        description: "",
        text_btn_ok: "Удалить",
        text_btn_cancel: "Отмена",
      },

    };
  },

  computed: {
    ...mapGetters("rqTabs", [
      'RQ_TABS_TASKS',
    ]),

    rqTab() {
      // console.debug('cmp RQ_TABS_TASKS', this.RQ_TABS_TASKS, this.$route.params); // DELETE

      const RQ_TABS_TASKS_FILTERED = this.RQ_TABS_TASKS.filter(
        (tab) => tab.params?.id === this.$route.params.id
      );

      return RQ_TABS_TASKS_FILTERED.length ? RQ_TABS_TASKS_FILTERED[0] : null;
    },

    isPined() {
      const RQ_TABS_TASKS_FILTERED = this.RQ_TABS_TASKS.filter(
        (tab) => tab.params?.id === this.$route.params.id
      );

      return RQ_TABS_TASKS_FILTERED[0].isPinned;
    },

    user() {
      return this.$store.getters["user/user"];
    },
    request_id() {
      return this.$store.getters["request_id/request_id"];
    },
    request_id_responses() {
      return this.$store.getters["request_id_dispatchers/request_id_responses"];
    },
    request_id_selection() {
      return this.$store.getters["request_id_dispatchers/request_id_selection"];
    },
    request_id_invitations() {
      return this.$store.getters["request_id_dispatchers/request_id_invitations"];
    },
    request_id_assigned() {
      return this.$store.getters["request_id_dispatchers/request_id_assigned"];
    },
    request_id_responses_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_responses_filters"];
    },
    request_id_selection_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_selection_filters"];
    },
    request_id_invitations_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_invitations_filters"];
    },
    request_id_assigned_filters() {
      return this.$store.getters["request_id_dispatchers/request_id_assigned_filters"];
    },
    request_id_history() {
      return this.$store.getters["request_id_dispatchers/request_id_history"];
    },
    tabs_list() {
      return [
        {title: "Отклики", count: this.request_id_responses.length},
        {title: "Подбор", count: this.request_id_selection.length},
        {title: "Инвайт", count: this.request_id_invitations.length},
        {title: "Назначенные", count: this.request_id_assigned.length},
      ]
    },

    groupListAction() {
      let actions_list = [];

      if (this.tab == 0) {
        actions_list = [
          {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
          {text: "Отклонить", icon: "mdi-close-box-outline", action: 'reject'},
        ]
      } else if (this.tab == 1) {
        actions_list = [
          {text: "Отправить приглашение", icon: "mdi-email-outline", action: 'invite'},
          {text: "Удалить", icon: "mdi-close-box-outline", action: 'delete'},
        ];
      } else if (this.tab == 2) {
        actions_list = [
          {text: "В назначенные", icon: "mdi-check", action: 'appoint'},
          {text: "Отменить", icon: "mdi-close-box-outline", action: 'delete'},
        ];
      } else if (this.tab == 3) {
        actions_list = [
          {text: "Поставить отказ", icon: "mdi-close-box-outline", action: 'refuse'},
          {text: "Можно приезжать", icon: "mdi-check", action: 'accepted'},
        ];
      }

      return actions_list;
    }
  },

  methods: {
    ...mapActions("request_id", ["fetchRequestId", "putStatus"]),
    ...mapActions("request_id_dispatchers", ["fetchRequestIdResponses", "fetchRequestIdSelection", "fetchRequestIdInvitations", "fetchRequestIdAssigned", "fetchRequestIdHistory"]),
    ...mapActions("request_id_dispatchers", ["acceptRequest", "rejectRequest", "appointExecutor", "rejectExecutor", "inviteExecutor", "deleteExecutor", "refuseExecutor", "acceptedExecutor"]),
    ...mapActions("requests", ["copyRequest", "removeRequest"]),
    ...mapActions("rqTabs", [
      'addRqTabsTaskNew',
      'setRqTabsTaskActive',
      'pinRqTabTasks',
      'unPinRqTabTasks',
    ]),

    /* HANDLERS */

    onPinTabClicked() {
      this.pinRqTabTasks({rqTabTasks: this.rqTab});
      this.detectedPin();
    },

    onUnpinTabClicked() {
      this.unPinRqTabTasks({rqTabTasks: this.rqTab});
      this.detectedPin();
    },

    detectedPin() {

      if (this.isPined) {
        this.actions_tasks[0].display = false;
        this.actions_tasks[1].display = true;
      } else {
        this.actions_tasks[0].display = true;
        this.actions_tasks[1].display = false;
      }
    },

    openTimesheet() {
      this.$router.push("/tasks/" + this.request_id.uuid + "/timesheet");
    },

    setCurrentPage(value) {
      this.page = value;
    },

    addArtist() {
      this.$router.push("/tasks/" + this.request_id.uuid + "/selection");
    },

    applyFilter(fetchParams, watcherParams, filter, search) {
      this[fetchParams].value = search;
      this[fetchParams].filters = filter;

      let params = {
        "settings": {
          "value": search,
          //"sort": this[watcherParams].sortBy[0],
          //"order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": filter
        }
      };

      console.log('params-----', filter, params);

      if (fetchParams == 'fetchResponseParams') {
        this.fetchRequestIdResponses({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (fetchParams == 'fetchSelectionParams') {
        this.fetchRequestIdSelection({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (fetchParams == 'fetchInvitationsParams') {
        this.fetchRequestIdInvitations({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      } else if (fetchParams == 'fetchAssignedParams') {
        this.fetchRequestIdAssigned({requestId: this.$route.params.id, params: params, concat: false, unit: false})
      }
    },

    clearSelected() {
      this.selectedItems = [];
    },

    focusSearch() {
      this.isSearchFocus = 1;
    },

    blurSearch() {
      this.isSearchFocus = 0;
    },

    callAction({action, uuids, params}) {
      console.log('callAction ------', action, uuids);
      this[action](uuids, params);
    },

    callActionTask(action, uuids, params) {
      console.log('callActionTask------', uuids);
      this[action](uuids, params);
    },

    callGroupAction(action){
      let sendUuids = [];
      for (let i = 0; i < this.selectedItems.length; i++) {
        sendUuids.push(this.selectedItems[0].uuid);
      }

      console.log(action, sendUuids)
      this[action](sendUuids);

      this.selectedItems = [];
    },

    setSelected(selected) {
      this.selectedItems = selected;
    },

    appoint(uuids) {
      this.appointExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    reject(uuids) {
      console.log('Отклонить ------');
      this.rejectExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    openDetails(uuids) {
      this.$router.push("/performers/" + uuids[0]);
    },

    invite(uuids, params) {
      this.inviteExecutor({task_uuid: this.$route.params.id, user_uuids: uuids, params: {variant: params}});
    },

    delete(uuids) {
      console.log('Отмена  ------');
      this.deleteExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    refuse(uuids) {
      console.log('Отказ ------');
      this.refuseExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    accepted(uuids) {
      console.log('Можно приезжать ------');
      this.acceptedExecutor({task_uuid: this.$route.params.id, user_uuids: uuids});
    },

    goToObject() {
      this.$router.push("/objects/" + this.request_id.object.uuid);
    },

    confirmRemove(confirm) {
      if (confirm) {
        //this.$router.push("/tasks/");
        //this.removeRequest(this.$route.params.id);
        console.log('Удаляю');
      }
      this.isConfirmModal = false;
    },

    markForDeletion() {
      this.isConfirmModal = true;
    },

    editTask(TaskId) {
      this.$router.push("/tasks/" + TaskId[0] + "/edit");
    },

    editStatus(uuids, status) {
      this.putStatus({requestId: this.$route.params.id, status: status});
    },

    goToHistory() {
      this.$router.push("/tasks/" + this.$route.params.id + "/history");
    },

    getDataFromApi(fetchParams, watcherParams, action, options) {

      this[watcherParams] = options;

      const params = {
        "settings": {
          "value": this[fetchParams].value,
          "sort": this[watcherParams].sortBy[0] ? this[watcherParams].sortBy[0]  : 'lastname',
          "order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": this[fetchParams].filters,
        }
      };

      this[action]({
        requestId: this.$route.params.id,
        params: params,
        concat: false,
        unit: false
      }).then(data => {
        this[fetchParams].page = 1;
        console.log('пришел ответ')
      })
    },

  },
  watch: {},

  async created() {
    await this.fetchRequestId(this.$route.params.id);
    await this.fetchRequestIdResponses({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdSelection({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdInvitations({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdAssigned({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });
    await this.fetchRequestIdHistory({requestId: this.$route.params.id});

    this.$route.meta.title = this.request_id.name;

    this.addRqTabsTaskNew({route: this.$route}).then(
      () => this.setRqTabsTaskActive({route: this.$route})
    );

    this.detectedPin();


  },

  async mounted() {

  },
};
</script>

<style lang="scss">
@import "../../../assets/scss/colors";

.ruqi.page--tasks-id {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-task-page {

    background: #fff;

    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }

  .card-actions-menu {
    .card-action-task{
      margin-bottom: 0;

      > div {
        margin-bottom: 12px;
      }
    }
  }
}

.bt-table-action {
  display: flex;
  align-items: center;
  margin-right: 24px;

  .v-btn {
    box-shadow: none;
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }

  .text {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    color: $grey;
  }
}

.action-row {
  height: 80px;
}

.wrap-tabs {
  flex: 0;
}
</style>


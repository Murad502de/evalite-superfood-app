<template>
  <div class="timesheet">
    <Header :content="title" :size="title_size" :isnew="false" :isback="true"/>
    <v-row>
      <v-col cols="12">
        <div class="timesheet-info">
          <div class="timesheet-info-row" v-if="request_id_timesheet.name">
            Заявка: <span>{{ request_id.number }} {{ request_id_timesheet.name }}</span>
          </div>
          <div class="timesheet-info-row" v-if="request_id_timesheet.start_date">
            Дата начала работ: <span>{{ request_id_timesheet.start_date.substr(0, 10) }}</span>
          </div>
          <div class="timesheet-info-row" v-if="request_id_timesheet.object">
            Объект: <span>{{ request_id_timesheet.object }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="timesheet-info">
      <v-col cols="12" class="d-flex">
        <v-btn
          text
          height="48"
          outlined
          class="bt-time-sheet"
          @click="$router.go(-1)"
        >
          Закрыть
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="divider-mar"></v-divider>

    <v-row no-gutters class="table-filter-row large">
      <v-col
        cols="12"
        sm="12"
        class="d-flex"
      >
        <div v-show="selectedItems.length === 0">
          <div class="d-flex">
            <div class="bt-table-action" v-if="request_id_timesheet.status != 'close'">
              <v-btn
                height="40"
                fab
                @click="fill"
                color="#F6FBFF"
              >
                <v-icon color="#0082DE">
                  mdi-chevron-double-down
                </v-icon>
              </v-btn>
              <div class="text">
                заполнить из назначенных
              </div>
            </div>

            <div class="bt-table-action">
              <v-btn
                height="40"
                fab
                @click=""
                color="#F6FBFF"
              >
                <v-icon color="#0082DE">
                  mdi-table-large
                </v-icon>
              </v-btn>
              <div class="text">
                сохранить в xls
              </div>
            </div>
          </div>

        </div>

        <div v-show="selectedItems.length > 0 && request_id_timesheet.status != 'close'">
          <div class="d-flex wrap-action">
            <div class="selected-items">
              Выделено: {{ selectedItems.length }} позиций
            </div>

            <FTypeSelectUIID
              name="action"
              :params="selectAction"
              @input="updateActionSelect('action', $event)"
            />

            <v-form
              ref="form_group"
              v-model="valid_group"
              lazy-validation
            >
              <div v-if="actionParamsComponent.type" class="">
                <component
                  class="mass"
                  :is="actionParamsComponent.type"
                  :name="actionParamsComponent.name"
                  :params="actionParamsComponent.params"
                  :value="actionParamsComponent.value"
                  :validation="actionParamsComponent.validation"
                  @input="updateFiledAction('action_value', $event)"
                />
              </div>
            </v-form>

            <v-btn
              text
              height="33"
              outlined
              class="bt-time-sheet"
              @click="saveGroupItem"
            >
              Применить
            </v-btn>

          </div>
        </div>

        <v-divider v-if="request_id_timesheet.status != 'close'"
          vertical
        ></v-divider>

        <div class="bt-table-action" v-if="request_id_timesheet.status != 'close'">
          <v-btn
            height="40"
            fab
            @click="selectAll"
            color="#F6FBFF"
            active-class="active"
            class="check-btn"
          >
            <v-icon color="#0082DE">
              {{ activeSelectBtnOption.icon }}
            </v-icon>
          </v-btn>
          <div class="text">
            {{ activeSelectBtnOption.text }}
          </div>
        </div>
        <div class="bt-table-action" v-if="user.type != 'contractor' && request_id_timesheet.status != 'close'">
          <v-btn
            height="40"
            fab
            @click="loadPayments"
            color="#F6FBFF"
            active-class="active"
            class="check-btn"
          >
            <v-icon color="#0082DE">
              mdi-sync
            </v-icon>
          </v-btn>
          <div class="text">
            загрузить ставки из объекта
          </div>
        </div>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="table-list-style-nospacing">
          <v-data-table
            ref="dataTable"
            :headers="(user.type == 'manager') ? headersManager : headers"
            :items="request_id_timesheet.assigned"
            class="elevation-0 table-history"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
            show-select
            item-key="id"
            :expanded="expanded"
            v-model="selectedItems"
          >
            <template v-slot:item.num="{ item }">
              <div>
                {{ item.id }}
              </div>
            </template>

            <template v-slot:item.name="{ item }">
              <div class="color-black no-wrap">
                {{ item.name }}
              </div>
            </template>

            <template v-slot:item.position="{ item }">
              <div class="color-black no-wrap">
                {{ item.position.name }}
              </div>
            </template>

            <template v-slot:item.begin="{ item }">
              <div class="color-black">
                {{ item.begin.substring(0, 5) }}
              </div>
            </template>

            <template v-slot:item.end="{ item }">
              <div class="color-black">
                {{ item.end.substring(0, 5) }}
              </div>
            </template>

            <template v-slot:item.hours="{ item }">
              <div class="color-black">
                {{ item.hours }} ч
              </div>
            </template>

            <template v-slot:item.end="{ item }">
              <div class="color-black">
                {{ item.end.substring(0, 5) }}
              </div>
            </template>

            <template v-slot:item.hours="{ item }">
              <div class="color-black">
                {{ item.hours }} ч
              </div>
            </template>

            <template v-slot:item.actions="{ item }" v-if="request_id_timesheet.status != 'close'">
              <v-btn
                height="31"
                @click="editItem(item)"
                color="#F2F4F5"
                class="elevation-0"
              >
                {{ changeButtonSettings[item.activeChangeButton].text }}
                <v-icon color="#7A91A9">
                  {{ changeButtonSettings[item.activeChangeButton].icon }}
                </v-icon>

              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-data-table
                    :headers="headersRowEdit"
                    :items="[item]"
                    class="elevation-0"
                    hide-default-footer
                    disable-sort
                  >
                    <template v-slot:item.position="{ item }">
                      <div>
                        <FTypeSelectUIID name="position" :value="setProfessionItem(item.position.name)"
                                         :params="positionListOptions"
                                         @input="updateFiled('position', $event)"/>
                      </div>
                    </template>
                    <template v-slot:item.zone="{ item }">
                      <div>
                        <FTypeText name="zone" :value="item.zone" @input="updateFiled('zone', $event)"/>
                      </div>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <div>
                        <FTypeSelect name="status" :value="item.status" :params="statusListOptions"
                                     @input="updateFiled('status', $event)"/>
                      </div>
                    </template>

                    <template v-slot:item.calculation="{ item }">
                      <div>
                        <FTypeSelect name="calculation" :value="item.calculation" :params="calculationListOptions"
                                     @input="updateFiled('calculation', $event)"/>
                      </div>
                    </template>

                    <template v-slot:item.begin="{ item }">
                      <div>
                        <FTypeTime name="begin" :value="item.begin.substring(0, 5)"
                                   @input="updateFiled('begin', $event)"/>
                      </div>
                    </template>
                    <template v-slot:item.end="{ item }">
                      <div>
                        <FTypeTime name="end" :value="item.end.substring(0, 5)" @input="updateFiled('end', $event)"/>
                      </div>
                    </template>
                    <template v-slot:item.hours="{ item }">
                      <div>
                        <FTypeText class="ein" name="hours" :value="item.hours" :validation="['number']"
                                   @input="updateFiled('hours', $event)"/>
                      </div>
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        height="31"
                        @click="saveItem(item.id)"
                        color="#0082DE"
                        class="elevation-0"
                      >
                        Сохранить
                      </v-btn>
                    </template>

                  </v-data-table>
                </v-form>
              </td>
            </template>

            <template slot="body.append" v-if="user.type == 'manager'">
              <tr>
                <td colspan="8" class="total"></td>
                <td class="total">{{ summary.hours }} ч</td>
                <td class="total">{{ summary.payments }}</td>
                <td class="total"></td>
              </tr>
            </template>


          </v-data-table>
        </div>

        <FooterTable :itemsPerPage="itemsPerPage" :pageCount="pageCount" :page="page" @setItemsPerPage="setItemsPerPage"
                     @setCurrentPage="setCurrentPage"/>

      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import FTypeText from "@/components/FTypeText";
import Vue from "vue";
import FTypeSelectUIID from "@/components/FTypeSelectUIID";

export default {
  meta: {
    title: 'Табель учета рабочего времени'
  },
  components: {FTypeSelectUIID, FTypeText},
  props: [],
  data() {
    return {
      title: 'Табель учета рабочего времени',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      headers: [
        {text: '№', value: 'num',},
        {text: 'фио', value: 'name'},
        {text: 'профессия', value: 'position'},
        {text: 'статус', value: 'status'},
        {text: 'начало', value: 'begin'},
        {text: 'конец', value: 'end'},
        {text: 'выполнено', value: 'hours'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      headersManager: [
        {text: '№', value: 'num',},
        {text: 'фио', value: 'name'},
        {text: 'профессия', value: 'position'},
        {text: 'статус', value: 'status'},
        {text: 'начало', value: 'begin'},
        {text: 'конец', value: 'end'},
        {text: 'Ставка руб', value: 'payment'},
        {text: 'выполнено', value: 'hours'},
        {text: 'сумма итого', value: 'sum_payment'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      headersRowEdit: [
        {text: 'профессия', value: 'position'},
        {text: 'статус', value: 'status'},
        {text: 'начало', value: 'begin'},
        {text: 'конец', value: 'end'},
        {text: 'выполнено', value: 'hours'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      selectedItems: [],
      activeSelectAll: 0,
      formValues: [],
      formGroupAction: {
        action_value: ''
      },
      valid: true,
      valid_group: true,
      expanded: [],
      changeButtonSettings: [
        {
          text: 'Изменить',
          icon: 'mdi-menu-down'
        },
        {
          text: 'Закрыть',
          icon: 'mdi-menu-up'
        },
      ],
      activeChangeItemIndex: null,
      indexedItems: [],
      selectAction: {
        options: [
          {title: 'Изменить профессию', uuid: 'position'},
          {title: 'Изменить статус', uuid: 'status'},
          {title: 'Изменить время начала', uuid: 'begin'},
          {title: 'Изменить время конца', uuid: 'end'},
          {title: 'Изменить часы', uuid: 'hours'},
        ],
        item_text: 'title',
        label: 'Выберите действие'
      },
      actionParamsComponent: {
        type: '',
        name: '',
        params: {},
        value: '',
        label: '',
        validation: [],
      },
      smenaListOptions: {
        options: [
          'дневная',
          'ночная'
        ],
      },
      statusListOptions: {
        options: [
          'работает',
          'не работает'
        ],
      },
      calculationListOptions: {
        options: [
          'час',
          'штука'
        ],
      },
      activeSelectBtn: 0,
    }
  },
  computed: {
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
    user() {
      return this.$store.getters['user/user']
    },
    request_id() {
      return this.$store.getters['request_id/request_id']
    },
    professions() {
      return this.$store.getters['request_id_timesheet/request_id_professions']
    },
    summary() {
      return this.$store.getters['request_id_timesheet/request_id_summary']
    },
    positionListOptions() {
      return {
        options: this.professions,
        item_text: 'name',
      }
    },
    request_id_timesheet() {
      return this.$store.getters['request_id_timesheet/request_id_timesheet']
    },
    activeSelectBtnOption() {
      switch (this.activeSelectBtn) {
        case 0 :
          return {text: 'выделить все', icon: 'mdi-checkbox-blank-circle-outline'}
        case 1:
          return {text: 'снять выделение', icon: 'mdi-check-circle-outline'}
        default:
          return {}
      }
    },

  },
  methods: {
    ...mapActions('request_id', ['fetchRequestId',]),
    ...mapActions('request_id_timesheet', ['fetchRequestIdTimeSheetSummary',]),
    ...mapActions('request_id_timesheet', ['fetchRequestIdProfessions',]),
    ...mapActions('request_id_timesheet', ['fetchRequestIdTimeSheet',]),
    ...mapActions('request_id_timesheet', ['fillOutAssigned',]),
    ...mapActions('request_id_timesheet', ['putRequestIdTimeSheet',]),
    ...mapActions('request_id_timesheet', ['putRequestIdLoadPayments',]),
    ...mapMutations('request_id_timesheet', ['updateChangeButton',]),
    ...mapMutations('breadcrumbs', ["setBreadcrumbs",]),

    selectAll(val) {
      this.activeSelectBtn = +!this.activeSelectBtn;
      if (this.activeSelectAll == 0) {
        this.$refs.dataTable.toggleSelectAll(val);
        this.activeSelectAll += 1;
      } else {
        this.$refs.dataTable.toggleSelectAll();
        this.activeSelectAll = 0;
      }
    },

    updateFiled(field, value) {
      if (field == 'position') {
        let profession_params = this.professions.filter(obj => obj.uuid === value);
        this.formValues[0][field] = {
          uuid: value,
          name: profession_params[0].name,
        }
      } else {
        this.formValues[0][field] = value;
      }
      console.log(field, value);
    },

    updateFiledAction(field, value) {
      if (this.actionParamsComponent.name == 'position') {
        let profession_params = this.professions.filter(obj => obj.uuid === value);
        this.formGroupAction[field] = {
          uuid: value,
          name: profession_params[0].name,
        }
      } else {
        this.formGroupAction[field] = value;
      }
      console.log(field, value);

    },

    updateActionSelect(field, value) {
      this.actionParamsComponent.name = value;

      if (value == 'hours') {
        this.actionParamsComponent.type = 'FTypeText'
        if (value == 'hours') {
          this.actionParamsComponent.validation = ['number'];
        }
      } else if (value == 'status' || value == 'position') {
        this.actionParamsComponent.type = 'FTypeSelectUIID'
        this.actionParamsComponent.params = this[value + 'ListOptions'];
        this.actionParamsComponent.params.label = 'Выберите вариант';
      } else if (value == 'begin' || value == 'end') {
        this.actionParamsComponent.type = 'FTypeTime'
      }
    },

    fill() {
      this.fillOutAssigned(this.$route.params.id);
    },

    editItem(value) {
      this.expanded = [];
      this.formValues = [];

      let array_index = value.id - 1,
        current_status_change = this.request_id_timesheet.assigned[array_index].activeChangeButton,
        object = {};

      Object.assign(object, value);

      if (!current_status_change) {
        this.expanded.push(object);
        this.formValues.push(object);

        if (this.activeChangeItemIndex != null) {
          this.updateChangeButton({id: this.activeChangeItemIndex, activeStatus: 0});
        }
        this.activeChangeItemIndex = array_index;
      }

      this.updateChangeButton({id: array_index, activeStatus: !current_status_change});
      console.log(this.formValues)
    },

    saveItem(id) {
      this.$refs.form.validate();

      this.$nextTick(() => {
        if (this.valid) {
          delete this.formValues.id;
          delete this.formValues.activeChangeButton;

          const newRequet = JSON.stringify(this.formValues);
          console.log(newRequet);
          this.putRequestIdTimeSheet({uuid: this.$route.params.id, body: newRequet});

          this.expanded = [];
        }
      });
    },
    setProfessionItem(name) {
      let profession_params = this.professions.filter(obj => obj.name === name);
      if (profession_params.length) {
        return profession_params[0].uuid;
      } else {
        return '';
      }

    },
    saveGroupItem() {
      this.$refs.form_group.validate();

      this.$nextTick(() => {
        if (this.valid_group) {
          let field = this.actionParamsComponent.name,
            objects = [];

          for (let i = 0; i < this.selectedItems.length; i++) {

            let object = {};
            Object.assign(object, this.selectedItems[i]);

            delete object.id;
            delete object.activeChangeButton;
            object[field] = this.formGroupAction.action_value;
            objects.push(object);
          }

          const newRequet = JSON.stringify(objects);
          console.log(newRequet);
          this.putRequestIdTimeSheet({uuid: this.$route.params.id, body: newRequet});

          this.selectedItems = [];
        }
      });
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },

    setCurrentPage(value) {
      this.page = value;
    },
    loadPayments() {
      this.putRequestIdLoadPayments({uuid: this.$route.params.id});
    }

  },
  async created() {
    await this.fetchRequestId(this.$route.params.id);
    await this.fetchRequestIdTimeSheetSummary(this.$route.params.id);
    await this.fetchRequestIdTimeSheet(this.$route.params.id);
    await this.fetchRequestIdProfessions(this.$route.params.id);

    this.$route.meta.pre_title = this.request_id.name;
    this.setBreadcrumbs(this.$route.fullPath);
  },


}
</script>

<style lang="scss">

@import '../../../assets/scss/colors';

.timesheet {
  .timesheet-info {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.25;
    color: $grey;
    padding-left: 66px;

    .timesheet-info-row {
      margin-bottom: 8px;

      span {
        color: $black;
      }
    }

  }

  .bt-time-sheet {
    background: $blue;
    color: white;
    margin-right: 10px;
    border: none;
  }

  .bt-table-action {
    display: flex;
    align-items: center;
    margin-right: 24px;


    .v-btn {
      box-shadow: none;
      width: 40px;
      height: 40px;
      border-radius: 100px;
      margin-right: 6px;
    }

    .text {
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      color: $grey;
    }
  }

  .bt-table-action:last-child {
    margin-right: 0;
  }

  .table-filter-row {
    .wrap-action {
      padding: 14px 16px;
      background: #E9F6FF;
      border-radius: 10px;
      align-items: center;
      justify-content: space-between;

      .selected-items {
        font-weight: 700;
        margin-right: 16px;
      }

      .v-text-field--outlined > .v-input__control > .v-input__slot {
        border-radius: 4px;
      }

      .v-input {
        margin-right: 16px;
        max-width: 238px;
      }

      .v-text-field__details{
        position: absolute;
        bottom: -17px;
        left: 0;
        padding: 0;
      }

    }

    .v-divider--vertical {
      margin: 0 24px;
      align-self: center;
      height: 40px;
    }
  }

  .v-data-table__wrapper {
    .v-data-table__wrapper {
      max-width: 800px;
    }
  }
}


</style>

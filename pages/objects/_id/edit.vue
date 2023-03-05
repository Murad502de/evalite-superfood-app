<template>
  <div>
    <Header :content="object_id.name" :size="title_size" :isnew="false" :isback="true"/>
    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <div class="wrap-form" :class="{'full': tab == 4}">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-window v-model="tab">
          <v-tab-item eager>
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Информация об объекте
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                  расположение.
                </div>
                <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
              </div>
              <div class="form-part">

                <div class="form-part-title">
                  Расположение
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать
                </div>
                <FormBuilder :meta="meta.meta_object_location" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item eager>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part min-padding">
                <div class="form-part-title">
                  Виды работ и оплата
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                  расположение.
                </div>
                <v-row class="ma-0">
                  <v-col
                    cols="12"
                    lg="7"
                    class="pl-0 pb-0"
                  >
                    <div class="form-part-label">Наименование работ</div>

                  </v-col>
                  <v-col
                    cols="12"
                    lg="5"
                    class="pl-0 pb-0"
                  >
                    <div class="form-part-label">Стоимость</div>

                  </v-col>

                  <v-row class="d-flex w-100">
                    <v-col cols="12" :lg="item.col"
                           v-for="(item, index) in meta.meta_object_pay" :key="index">
                      <div class="form-part-label" v-if="item.label">{{ item.label }}</div>
                      <div class="d-flex w-100">
                        <FormBuilder :meta="meta.meta_object_pay[index]" @removeItem="removeItem"
                                     @updateFiled="updateFiledinArray(index, ...arguments)"/>
                        <a href="#" @click.prevent="removeItem(index, 'meta_object_pay')" class="remove-item">
                          <img src="/img/ico_close.svg" alt="Удалить">
                        </a>
                      </div>
                    </v-col>
                  </v-row>

                  <a href="#" @click.prevent="addTypeWork" class="add_link">Добавить вид работ</a>
                </v-row>

              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item eager>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-label">Наше юр.лицо</div>
                <FormBuilder :meta="meta.meta_object_entity" @updateFiled="updateFiled"/>
              </div>
              <div class="form-part">
                <div class="form-part-label">Менеджеры</div>
                <FormBuilder :meta="meta.meta_object_manager" @removeItem="removeItem" @updateFiled="updateFiledResp"/>
                <a href="#" @click.prevent="addResponsible('manager')" class="add_link">Добавить менеджера</a>
              </div>
              <div class="form-part">
                <div class="form-part-label">Диспетчеры</div>
                <FormBuilder :meta="meta.meta_object_dispatchers" @removeItem="removeItem"
                             @updateFiled="updateFiledResp"/>
                <a href="#" @click.prevent="addResponsible('dispatchers')" class="add_link">Добавить диспетчера</a>
              </div>
            </v-form>
          </v-tab-item>

          <v-tab-item eager>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part form-part-contact"
                   v-for="(item, index) in meta.meta_object_contact"
                   :key="index">
                <a v-show="index != 0" href="#" @click.prevent="removeItem(index, 'meta_object_contact')"
                   class="remove-item">
                  <img src="/img/ico_close.svg" alt="Удалить">
                </a>
                <FormBuilder :meta="item" @updateFiled="updateFiledinArray(index, ...arguments)"/>
              </div>
              <AddFormPart :text="addContactPersText" @addFormPart="addFormPart"/>
            </v-form>
          </v-tab-item>

          <v-tab-item eager>
            <v-form ref="form_part_3" v-model="valid" lazy-validation>
              <AddFormPart text="Создать новую заявку" @addFormPart="addRequest"/>

              <div class="table-list-style">
                <v-data-table
                  :headers="headers"
                  :items="object_id_requests"
                  class="elevation-0"
                  item-key="table_1"
                  :page.sync="page"
                  :items-per-page="itemsPerPageTable"
                  @page-count="pageCount = $event"
                  hide-default-footer
                  hide-default-header
                  :search="searchText"
                >
                  <template v-slot:item.name="{ item }">
                    <div @click="openRequest(item.uuid)">
                      <span class="request-i"></span>
                      <span class="color-black">{{ item.name }}</span>
                    </div>

                  </template>

                  <template v-slot:item.pay="{ item }">
                    <span class="request-pay">{{ item.payment.value }} {{ item.payment.current }} / {{
                        item.payment.period
                      }}</span>
                  </template>

                  <template v-slot:item.object="{ item }">
                    {{ item.object.name }}
                  </template>

                  <template v-slot:item.date="{ item }">
                    <div v-if="item.created_at">
                      {{ item.created_at.substr(0, 10) }}
                    </div>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex justify-end">
                      <v-menu
                        bottom
                        rounded="10"
                        offset-y
                        nudge-bottom="10"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn icon
                                 v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-list-item-content class="justify-start">
                            <div class="mx-auto text-left">
                              <nuxt-link :to="'/tasks/'+ item.uuid +'/edit/'">
                                <span>Редактировать</span>
                              </nuxt-link>
                            </div>
                          </v-list-item-content>
                        </v-card>
                      </v-menu>
                    </div>
                  </template>

                </v-data-table>
              </div>
            </v-form>
          </v-tab-item>

          <FNavigation :indexTab="tab" :nextButtonsText="nextButtonsText" @nextFromButton="nextFromButton"
                       @prevFromButton="prevFromButton"/>

        </v-window>
      </v-form>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {

    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dictionary/dispatchers'].length === 0) {
      await store.dispatch('dictionary/fetchDispatchers')
    }
    if (store.getters['dictionary/managers'].length === 0) {
      await store.dispatch('dictionary/fetchManagers')
    }
    if (store.getters['dictionary/clients'].length === 0) {
      await store.dispatch('dictionary/fetchClients')
    }
    if (store.getters['dictionary/organizations'].length === 0) {
      await store.dispatch('dictionary/fetchOrganizations')
    }
    if (store.getters['dictionary/objectType'].length === 0) {
      await store.dispatch('dictionary/fetchObjectType')
    }
    if (store.getters['dictionary/professions'].length === 0) {
      await store.dispatch('dictionary/fetcProfessions')
    }
  },
  meta: {
    title: 'Редактирование объекта'
  },
  data() {
    return {
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Оплата', value: 'pay'},
        {
          text: 'Объект', value: 'object',
          filter: item => {
            if (!this.selectObject) return true;
            return item.uuid == this.selectObject;
          },
        },
        {text: 'Дата', value: 'date'},
        {text: '', value: 'actions', sortable: false},
      ],
      formValues: {},
      title: 'Создание нового объекта',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Оплата и ставки', 'Ответственные', 'Контактные лица', 'Заявки'
      ],
      tab: null,
      nextButtonsText: [
        'Указать стоимость работ',
        'Указать ответственных',
        'указать контактных лиц',
        'добавить заявки',
        'сохранить'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeSelectUIID',
            label: 'Клиент',
            col: 12,
            id: 'object_client',
            name: 'object_client',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Название объекта',
            col: 12,
            id: 'object',
            name: 'object',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Вид объекта',
            col: 12,
            id: 'object_type',
            name: 'object_type',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Специализация',
            col: 12,
            id: 'object_spec',
            name: 'object_spec',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 12,
            id: 'object_desc',
            name: 'object_desc',
            value: ''
          },

        ],
        meta_object_location: [
          {
            type: 'FTypeText',
            label: 'Область, край',
            col: 12,
            id: 'object_region',
            name: 'object_region',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            id: 'object_city',
            name: 'object_city',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Предлагаемая схема проезда',
            col: 12,
            id: 'object_driving_directions',
            name: 'object_driving_directions',
            value: ''
          },
        ],
        meta_object_contact: [
          [
            {
              type: 'FTypeText',
              label: 'ФИО',
              col: 12,
              id: 'object_contact_fio',
              name: 'object_contact_fio_0',
              validation: ['required'],
              value: '',
              parent_array: 'meta_object_contact',
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
              value: '',
              parent_array: 'meta_object_contact',
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required', 'phone'],
              value: '',
              parent_array: 'meta_object_contact',
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: ['required', 'email'],
              value: '',
              parent_array: 'meta_object_contact',
            },
          ],
        ],
        meta_object_entity: [
          {
            type: 'FTypeSelectUIID',
            label: '',
            col: 12,
            id: 'object_entity',
            name: 'object_entity',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано',
            },
            validation: 'required',
            value: ''
          },

        ],
        meta_object_manager: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_manager',
            name: 'object_manager_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
              label: 'Не выбрано',
            },
            parent_array: 'meta_object_manager',
            validation: 'required',
            value: '',
          },
        ],
        meta_object_dispatchers: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_dispatchers',
            name: 'object_dispatchers_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
              label: 'Не выбрано',
            },
            parent_array: 'meta_object_dispatchers',
            validation: 'required',
            value: '',
          },
        ],
        meta_object_pay: [
          [
            {
              type: 'FTypeSelectUIID',
              label: '',
              col: 7,
              name: 'object_pay_title_0',
              params: {
                options: [],
                item_text: 'name',
                cost: [],
              },
              validation: 'required',
              value: '',
              parent_array: 'meta_object_pay',
              remove: false,
            },
            {
              type: 'FTypeText',
              label: '',
              icon: '',
              col: 2,
              name: 'object_pay_salary_0',
              remove: false,
              parent_array: 'meta_object_pay',
              value: '',
            },
            {
              type: 'FTypeSelect',
              label: '',
              col: 3,
              name: 'object_pay_time_0',
              params: {
                options: [
                  'за смену',
                  'за час',
                ],
              },
              parent_array: 'meta_object_pay',
              value: '',
            },
          ],
        ],
      },
      valid: true,
      select: null,
      addContactPersText: 'Добавить контактное лицо',
      formHasErrors: false,
      searchText: '',
      page: 1,
      nameCounter: 1,
    }
  },

  computed: {
    object_id() {
      return this.$store.getters['object_id/object_id']
    },
    specializations() {
      return this.$store.getters['specializations/specializations'];
    },
    dispatchers() {
      return this.$store.getters['dictionary/dispatchers'];
    },
    managers() {
      return this.$store.getters['dictionary/managers'];
    },
    clients() {
      return this.$store.getters['dictionary/clients'];
    },
    organizations() {
      return this.$store.getters['dictionary/organizations'];
    },
    objectType() {
      return this.$store.getters['dictionary/objectType'];
    },
    professions() {
      return this.$store.getters['dictionary/professions']
    },
    postBody() {
      let contacts = [];

      for (let i = 0; i < this.meta.meta_object_contact.length; i++) {
        let index_name = this.meta.meta_object_contact[i][0].name.substr(19, 20);

        contacts.push(
          {
            "fullname": this.formValues['object_contact_fio_' + index_name],
            "position": this.formValues['object_contact_post_' + index_name],
            "phone": this.formValues['object_contact_phone_' + index_name],
            "email": this.formValues['object_contact_email_' + index_name],
          }
        )
      }

      let managers = [];

      for (let i = 0; i < this.meta.meta_object_manager.length; i++) {
        let name = this.meta.meta_object_manager[i].name;
        managers.push(
          this.formValues[name]
        )
      }

      let dispatchers = [];

      for (let i = 0; i < this.meta.meta_object_dispatchers.length; i++) {
        let name = this.meta.meta_object_dispatchers[i].name;
        dispatchers.push(
          this.formValues[name]
        )
      }

      let works = [];
      for (let i = 0; i < this.meta.meta_object_pay.length; i++) {
        let index_name = this.meta.meta_object_pay[i][0].name.substr(17, 18);
        works.push(
          {
            "uuid": this.formValues['object_pay_title_' + index_name],
            "payment": this.formValues['object_pay_salary_' + index_name],
            "period": this.formValues['object_pay_time_' + index_name],
          }
        )
      }

      let postBody = {
        "name": this.formValues.object,
        "organization": this.formValues.object_entity,
        "type": this.formValues.object_type,
        "specialization": this.formValues.object_spec,
        "description": this.formValues.object_desc,
        "region": this.formValues.object_region,
        "city": this.formValues.object_city,
        "scheme": this.formValues.object_driving_directions,
        "account": this.formValues.object_client,
        "managers": managers,
        "dispatchers": dispatchers,
        "contacts": contacts,
        "works": works
      };

      console.log(postBody);
      return postBody;
    },

    object_id_requests() {
      return this.$store.getters['object_id/object_id_requests'];
    },
    itemsPerPageTable() {
      if (this.itemsPerPage) {
        return parseInt(this.itemsPerPage, 10)
      } else {
        return 1;
      }
    },
  },
  methods: {
    ...mapActions('object_id', ['fetchObjectId',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dictionary', ['fetchDispatchers',]),
    ...mapActions('dictionary', ['fetchManagers',]),
    ...mapActions('objects', ['createRequest',]),
    ...mapActions('objects', ['putRequest',]),
    ...mapActions('dictionary', ['fetchClients',]),
    ...mapActions('dictionary', ['fetchOrganizations',]),
    ...mapActions('object_id', ['fetchObjectIdRequest',]),
    ...mapActions('dictionary', ['fetcProfessions',]),
    ...mapMutations('breadcrumbs', ["setBreadcrumbs",]),

    addResponsible(resp_name, isInit = false) {

      let flag = false;

      if (!isInit) {
        if (!this.meta['meta_object_' + resp_name].length) {
          flag = false;
        } else if (!this.formValues[this.meta['meta_object_' + resp_name][this.meta['meta_object_' + resp_name].length - 1].name]) {
          flag = true;
        }
        if (flag) {
          return;
        }
      }

      let resp = [];

      switch (resp_name) {
        case 'manager' :
          resp = this.managers;
          break;

        case 'dispatchers' :
          resp = this.dispatchers;
          break;
      }

      console.log('было - ', this.nameCounter);

      this.meta['meta_object_' + resp_name].push(
        {
          type: 'FTypeSelectUIID',
          icon: 'mdi-account',
          label: '',
          col: 12,
          name: 'object_' + resp_name + '_' + this.nameCounter++,
          remove: true,
          params: {
            options: resp,
            item_text: 'fullname',
            label: 'Не выбрано'
          },
          parent_array: 'meta_object_' + resp_name,
          validation: 'required',
          value: '',
        },
      );
      console.log('стало - ', this.nameCounter);
    },

    addFormPart() {
      this.meta.meta_object_contact.push(
        [
          {
            type: 'FTypeText',
            label: 'ФИО',
            col: 12,
            id: 'object_contact_fio',
            name: 'object_contact_fio_' + this.nameCounter,
            validation: ['required'],

            parent_array: 'meta_object_contact',
          },
          {
            type: 'FTypeText',
            label: 'Должность',
            col: 12,
            id: 'object_contact_post',
            name: 'object_contact_post_' + this.nameCounter,
            validation: ['required'],
            parent_array: 'meta_object_contact',
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            id: 'object_contact_phone',
            name: 'object_contact_phone_' + this.nameCounter,
            validation: ['required', 'phone'],
            parent_array: 'meta_object_contact',
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.nameCounter,
            validation: ['required', 'email'],
            parent_array: 'meta_object_contact',
          },
        ],
      );
      this.nameCounter++;
    },

    addRequest() {
      this.$router.replace({ name: 'tasks-create', params: { objectId: this.object_id.uuid }});
    },

    addTypeWork() {
      this.meta.meta_object_pay.push(
        [
          {
            type: 'FTypeSelectUIID',
            label: '',
            col: 7,
            name: 'object_pay_title_' + this.nameCounter,
            params: {
              options: [],
              item_text: 'name',
              cost: []
            },
            validation: 'required',
            value: '',
            parent_array: 'meta_object_pay',
            remove: false,
          },
          {
            type: 'FTypeText',
            label: '',
            icon: '',
            col: 2,
            name: 'object_pay_salary_' + this.nameCounter,
            remove: false,
            parent_array: 'meta_object_pay',
            value: '',
          },
          {
            type: 'FTypeSelect',
            label: '',
            col: 3,
            name: 'object_pay_time_' + this.nameCounter,
            params: {
              options: [
                'за смену',
                'за час',
              ],
            },
            parent_array: 'meta_object_pay',
            value: '',
          },
        ],
      );
      this.meta.meta_object_pay[this.meta.meta_object_pay.length - 1][0].params.options = this.professions;
      this.nameCounter++;
    },

    removeItem(index, array) {

      if (index >= 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
        delete this.formValues[`${array.replace('meta_', '')}_${index}`];
      }
    },

    nextFromButton() {
      if (this.tab < this.tabs_list.length - 1) {
        let formPart = 'form_part_' + this.tab;
        this.$refs[formPart].validate();

        this.$nextTick(() => {
          if (this.valid) {
            this.tab += 1;
          } else {
            let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
            this.$vuetify.goTo(el);
          }
        });
      } else {
        const newRequet = JSON.stringify(this.postBody);
        console.log(newRequet);
        this.putRequest({uuid: this.object_id.uuid, body: newRequet});
      }
    },

    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    updateFiledResp(field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index].value = value;
      console.log(field, value);
    },
    updateFiledinArray(index_block, field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index_block][index].value = value;
      console.log(field, value);
    },
    addFileds(length, method, args) {
      if (length > 1) {
        for (let i = 1; i < length; i++) {
          this[method](args, true);
        }
      }
    },
    openRequest(id) {
      this.$router.push('/objects/' + id);
    },
  },

  async created() {
    await this.fetchObjectId(this.$route.params.id);
    await this.fetchObjectIdRequest(this.$route.params.id);

    this.$route.meta.pre_title = this.object_id.name;
    this.setBreadcrumbs(this.$route.fullPath);

    let contact_length = this.object_id.contacts.length,
        dispatchers_length = this.object_id.dispatchers.length,
        managers_length = this.object_id.managers.length,
        works_length = 0;

    if (this.object_id.works){
      works_length = this.object_id.works.length
    }


    await this.addFileds(contact_length, 'addFormPart', '');
    await this.addFileds(dispatchers_length, 'addResponsible', 'dispatchers');
    await this.addFileds(managers_length, 'addResponsible', 'manager');
    await this.addFileds(works_length, 'addTypeWork', '');

    this.meta.meta_object_info[0].params.options = this.clients;
    this.meta.meta_object_entity[0].params.options = this.organizations;
    this.meta.meta_object_pay[0][0].params.options = this.professions;

    this.meta.meta_object_info[2].params.options = this.objectType;
    this.meta.meta_object_info[3].params.options = this.specializations;
    this.meta.meta_object_manager[0].params.options = this.managers;
    this.meta.meta_object_dispatchers[0].params.options = this.dispatchers;

    this.meta.meta_object_info[0].value = this.object_id.account.uuid;
    this.meta.meta_object_entity[0].value = this.object_id.organization.uuid;

    this.meta.meta_object_info[2].value = this.object_id.type.uuid;
    this.meta.meta_object_info[3].value = this.object_id.specialization.uuid;

    this.meta.meta_object_info[1].value = this.object_id.name;
    this.meta.meta_object_info[4].value = this.object_id.description;

    this.meta.meta_object_location[0].value = this.object_id.region;
    this.meta.meta_object_location[1].value = this.object_id.city;
    this.meta.meta_object_location[2].value = this.object_id.scheme;


    for (let i = 0; i < contact_length; i++) {
      this.meta.meta_object_contact[i][0].value = this.object_id.contacts[i].fullname;
      this.meta.meta_object_contact[i][1].value = this.object_id.contacts[i].position;
      this.meta.meta_object_contact[i][2].value = this.object_id.contacts[i].phone;
      this.meta.meta_object_contact[i][3].value = this.object_id.contacts[i].email;
    }

    for (let i = 0; i < managers_length; i++) {
      this.meta.meta_object_manager[i].value = this.object_id.managers[i].uuid;
    }
    for (let i = 0; i < dispatchers_length; i++) {
      this.meta.meta_object_dispatchers[i].value = this.object_id.dispatchers[i].uuid;
    }

   for (let i = 0; i < works_length; i++) {

      this.meta.meta_object_pay[i][0].params.options = this.professions;

      this.meta.meta_object_pay[i][0].value = this.object_id.works[i].uuid;
      this.meta.meta_object_pay[i][1].value = this.object_id.works[i].payment;
      this.meta.meta_object_pay[i][2].value = this.object_id.works[i].period;

    }

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_location.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_entity.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));
    this.meta.meta_object_dispatchers.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_manager.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));

  }
}
</script>

<style lang="scss" scoped>


</style>

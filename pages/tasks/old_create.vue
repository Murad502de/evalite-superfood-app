<template>
  <div>
    <Header :content="title" :size="title_size" :isnew="false" :isback="true"/>
    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <div class="wrap-form">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-window v-model="tab">
          <v-tab-item>
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Объект
                </div>
                <FormBuilder :meta="meta.meta_object_name" @updateFiled="updateFiled"/>
              </div>
              <div class="form-part">
                <div class="form-part-title">
                  Информация о заявке
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
          <v-tab-item>
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
                    lg="5"
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
                  <v-col
                    cols="12"
                    lg="2"
                    class="pl-0 pb-0"
                  >
                    <div class="form-part-label">Нужно человек</div>

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
          <v-tab-item>
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
          <v-tab-item>
            <v-form ref="form_part_3" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-label">Диспетчеры</div>
                <FormBuilder :meta="meta.meta_object_responsible" @removeItem="removeItem"
                             @updateFiled="updateFiledResp"/>
                <a href="#" @click.prevent="addResponsible('responsible')" class="add_link">Добавить диспетчера</a>
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
  meta: {
    title: 'Создание новой заявки'
  },
  async fetch({store}) {
    if (store.getters['objects/objects'].length === 0) {
      await store.dispatch('objects/fetchObjects')
    }
    if (store.getters['specializations/specializations'].length === 0) {
      await store.dispatch('specializations/fetch')
    }
    if (store.getters['dispatchers/dispatchers'].length === 0) {
      await store.dispatch('dispatchers/fetch')
    }
    if (store.getters['dictionary/professions'].length === 0) {
      await store.dispatch('dictionary/fetcProfessions')
    }
  },
  data() {
    return {
      formValues: {},
      title: 'Создание новой заявки',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Оплата и ставки', 'Контакты', 'Ответственные'
      ],
      tab: null,
      nextButtonsText: [
        'Указать стоимость работ',
        'указать контактных лиц',
        'Добавить ответственных',
        'опубликовать заявку'
      ],
      meta: {
        meta_object_name: [
          {
            type: 'FTypeSelectUIID',
            label: 'Наименование объекта',
            col: 12,
            id: 'object_name',
            name: 'object_name',
            params: {
              options: [],
              item_text: 'name',
            },
            validation: 'required',
            value: ''
          },
        ],
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Название заявки',
            col: 12,
            id: 'object_id',
            name: 'object_id',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 12,
            id: 'object_cat',
            name: 'object_cat',
            params: {
              options: [],
              item_text: 'name',
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Начало работ',
            col: 4,
            id: 'object_start_date',
            name: 'object_start_date',
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 4,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelect',
            label: 'Тип смены',
            col: 12,
            id: 'object_work_shift',
            name: 'object_work_shift',
            params: {
              options: [
                'Дневная',
                'Ночная',
              ],
            },
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
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 12,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 12,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required', 'phone'],
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 12,
              id: 'object_contact_email',
              name: 'object_contact_email_0',
              validation: ['required', 'email'],
              parent_array: 'meta_object_contact',
              value: ''
            },
          ],
        ],
        meta_object_responsible: [
          {
            type: 'FTypeSelectUIID',
            icon: 'mdi-account',
            label: '',
            col: 12,
            id: 'object_resp',
            name: 'object_resp_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
            },
            parent_array: 'meta_object_responsible',
            validation: 'required',
            value: '',
          },
        ],
        meta_object_pay: [
          [
            {
              type: 'FTypeSelectUIID',
              label: '',
              col: 5,
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
              params: {
                readonly: true
              },
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
                readonly: true
              },
              parent_array: 'meta_object_pay',
              value: '',
            },
            {
              type: 'FTypeText',
              label: '',
              icon: '',
              col: 2,
              id: 'object_pay_cw_0',
              name: 'object_pay_cw_0',
              remove: false,
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
      nameCounter: 1,
    }
  },
  computed: {
    objects() {
      return this.$store.getters['objects/objects']
    },
    specializations() {
      return this.$store.getters['specializations/specializations']
    },
    dispatchers() {
      return this.$store.getters['dispatchers/dispatchers']
    },
    professions() {
      return this.$store.getters['request_id/request_id_professions']
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

      let dispatchers = [];
      for (let i = 0; i < this.meta.meta_object_responsible.length; i++) {
        let name = this.meta.meta_object_responsible[i].name;
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
            "requires_people": this.formValues['object_pay_cw_' + index_name],
          }
        )
      }

      let postBody = {
        "name": this.formValues.object_id,
        "description": this.formValues.object_desc,
        "start_date": this.formValues.object_start_date,
        "end_date": this.formValues.object_end_date,
        "until_date": this.formValues.object_end_date,
        "object": this.formValues.object_name,
        "specialization": this.formValues.object_cat,
        "region": this.formValues.object_region,
        "city": this.formValues.object_city,
        "schema": this.formValues.object_driving_directions,
        "contacts": contacts,
        "dispatchers": dispatchers,
        "works": works
      };
      console.log(postBody);
      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dispatchers', ['fetchDispatchers',]),
    ...mapActions('requests', ['createRequest',]),
    ...mapActions('dictionary', ['fetcProfessions',]),
    ...mapActions('request_id', ['fetchRequestIdProfessions',]),

    addResponsible(resp_name, isInit = false) {
      let flag = false;

      if (!isInit) {
        let name = this.meta['meta_object_' + resp_name][this.meta['meta_object_' + resp_name].length - 1].name;
        if (!this.meta['meta_object_' + resp_name].length) {
          flag = false;
        } else if (!this.formValues[name]) {
          flag = true;
        }
        if (flag) {
          return;
        }
      }

      let dispatchers = this.dispatchers;
      this.meta.meta_object_responsible.push({
          type: 'FTypeSelectUIID',
          icon: 'mdi-account',
          label: '',
          col: 12,
          id: 'object_resp',
          name: 'object_resp_' + this.nameCounter++,
          remove: true,
          params: {
            options: dispatchers,
            item_text: 'fullname',
          },
          parent_array: 'meta_object_responsible',
          validation: 'required',
          value: ''
        },
      );
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
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Должность',
            col: 12,
            id: 'object_contact_post',
            name: 'object_contact_post_' + this.nameCounter,
            validation: ['required'],
            parent_array: 'meta_object_contact',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            id: 'object_contact_phone',
            name: 'object_contact_phone_' + this.nameCounter,
            validation: ['required', 'phone'],
            parent_array: 'meta_object_contact',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            id: 'object_contact_email',
            name: 'object_contact_email_' + this.nameCounter,
            validation: ['required', 'email'],
            parent_array: 'meta_object_contact',
            value: ''
          },
        ],
      );
      this.nameCounter++;
    },
    removeItem(index, array) {
      if (index != 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
      }
    },
    addTypeWork() {
      this.meta.meta_object_pay.push(
        [
          {
            type: 'FTypeSelectUIID',
            label: '',
            col: 5,
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
            params: {
              readonly: true
            },
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
              readonly: true
            },
            parent_array: 'meta_object_pay',
            value: '',
          },
          {
            type: 'FTypeText',
            label: '',
            icon: '',
            col: 2,
            name: 'object_pay_cw_' + this.nameCounter,
            remove: false,
            parent_array: 'meta_object_pay',
            value: '',
          },
        ],
      );
      this.meta.meta_object_pay[this.meta.meta_object_pay.length - 1][0].params.options = this.professions;
      this.nameCounter++;
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
        this.createRequest(newRequet);
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    async updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value)

      if (field == 'object_name') {
        await this.fetchRequestIdProfessions(value);
        this.clearMetaObjectPay();
      }
    },
    clearMetaObjectPay() {
      this.meta.meta_object_pay.splice(1, this.meta.meta_object_pay.length - 1);
      this.meta.meta_object_pay[0][0].params.options = this.professions;
      this.meta.meta_object_pay[0][1].value = '';
      this.meta.meta_object_pay[0][2].value = 'за смену';
      this.meta.meta_object_pay[0][3].value = '';

    },
    updateFiledResp(field, value, index) {
      this.formValues[field] = value;
      this.meta.meta_object_responsible[index].value = value;
    },
    updateFiledinArray(index_block, field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index_block][index].value = value;

      if (field.includes('object_pay_title')) {
        let profession_params = this.professions.filter(obj => obj.uuid === value);
        this.meta[parent_array][index_block][1].value = profession_params[0].payment;
        this.meta[parent_array][index_block][2].value = profession_params[0].period;

        this.formValues['object_pay_salary_' + index_block] = profession_params[0].payment;
        this.formValues['object_pay_time_' + index_block] = profession_params[0].period;
      }

      console.log(field, value);

    },
  },
  async created() {

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_responsible[0].params.options = this.dispatchers;
    this.meta.meta_object_pay[0][0].params.options = this.professions;

    if (this.$route.params.objectId) {
      this.meta.meta_object_name[0].value = this.$route.params.objectId;
      await this.fetchRequestIdProfessions(this.$route.params.objectId);
      this.clearMetaObjectPay();
    }

    this.meta.meta_object_name.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_location.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));
    this.meta.meta_object_responsible.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));
  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


</style>

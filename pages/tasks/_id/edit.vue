<template lang="pug">
  .add-task
    PageHeader(:header_text="request_id.name" button_text="Сохранить изменения" :disabled="disabled" @createAction = "updateTask(false)" @closeAction="$router.push('/tasks/')")

    v-container.object-info-container
      v-row
        v-col.pa-6(cols="12")
          .object-info
            v-row.object-info-row-rate
              v-col(cols="12")
                .wrap-form
                  v-form(ref="form_part_static" v-model="valid" lazy-validation)
                    .form-part-single
                      FormBuilder(:meta="meta.meta_object_name" @updateFiled="updateFiled")

                  v-divider.my-8

            v-row.d-flex.pa-4.action-row.align-center(no-gutters)
              v-col(cols="12")
                v-tabs.form-tabs-minify.mt-1(v-model="tab" hide-slider, height="36" )
                  v-tab(v-for="(item, index) in tabs_list", :key="index" @click="selectTab(tab, index)" ) {{ item }}

            v-row.object-info-row-rate
              v-col(cols="12")
                .wrap-form
                  v-window(v-model="tab")
                    v-tab-item(eager)
                      v-form(ref="form_part_0" v-model="valid" lazy-validation)
                        .form-part-single
                          FormBuilder(:meta="meta.meta_object_info" @updateFiled="updateFiled")

                    v-tab-item(eager)
                      v-form(ref="form_part_1" v-model="valid" lazy-validation)
                        .form-part-single
                          .form-part-title Вакансии и ставки
                          .form-part-description Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.

                          v-row.flex-column
                            v-col(:cols="item.col" v-for="(item, index) in meta.meta_object_pay" :key="index")
                              .ruqi-rate-task
                                v-row.d-flex.justify-space-between
                                  v-col(cols="6")
                                    .form-part-label Наименование работ
                                  v-col.text-right(cols="6")
                                    .form-part-label Нужно человек

                                v-row
                                  v-col(cols="12")
                                    FormBuilder(:meta="meta.meta_object_pay[index]" @removeItem="removeItem" @updateFiled="updateFiledinArray(index, ...arguments)")

                                v-row
                                  v-col(cols="12")
                                    RateTask(:rate="rate")

                    v-tab-item(eager)
                      v-form(ref="form_part_2" v-model="valid" lazy-validation)
                        .form-part-single
                          .form-part-title Контакты
                          .form-part-description Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                          v-divider.my-6

                          div(v-for="(item, index) in meta.meta_object_contact"
                            :key="index")
                            FormBuilder(:meta="item" @updateFiled="updateFiledinArray(index, ...arguments)")

                            a.remove-field.pt-6( @click.prevent="removeItem(index, 'meta_object_contact')") Удалить контактное лицо

                            v-divider.my-8(v-if="meta.meta_object_contact.length")

                          a.add-field.my-8(@click.prevent="addFormPart")
                            v-icon(color="#0082DE" size="24") mdi-plus-circle
                            span Добавить контактное лицо

                    v-tab-item(eager)
                      v-form(ref="form_part_3" v-model="valid" lazy-validation)
                        .form-part-single
                          .form-part-title Ответственные
                          .form-part-description Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                          v-divider.my-6

                          .form-part-label ФИО

                          FormBuilder(:meta="meta.meta_object_responsible" @removeItem="removeItem" @updateFiled="updateFiledResp")

                          a.add-field.my-8(@click.prevent="addResponsible('responsible')")
                            v-icon(color="#0082DE" size="24") mdi-plus-circle
                            span Добавить ответственного

                  v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="updateTask(false)") Cохранить изменения

    Confirm(
      :isConfirmModal="isConfirmModal",
      :content="confirmModal",
      @confirmRemove="confirmTab"
    )


</template>

<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import PageHeader from "@/components/composite/PageCreateEditHeader";
import RateTask from "@/components/composite/RateTask";

export default {
  meta: {
    title: 'Редактирование заявки'
  },
  components: {PageHeader, RateTask},
  data() {
    return {
      formValues: {},
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Вакансии и ставки', 'Контакты', 'Ответственные'
      ],
      tab: null,
      tabIndexReserved: null,
      meta: {
        meta_object_name: [
          {
            type: 'FTypeSelectUIID',
            label: 'Наименование объекта',
            col: 9,
            id: 'object_name',
            name: 'object_name',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeNote',
            label: '',
            col: 10,
            name: 'object_place_note',
            params: {
              label: 'Место проведения работ'
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Начало работ',
            col: 3,
            id: 'object_start_date',
            name: 'object_start_date',
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Окончание работ',
            col: 3,
            id: 'object_end_date',
            name: 'object_end_date',
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'График работ',
            col: 3,
            name: 'object_schedule',
            validation: [],
            value: '',
            params: {
              readonly: true
            },
          },
        ],
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Общедоступное название заявки',
            col: 9,
            id: 'object_id',
            name: 'object_id',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 7,
            id: 'object_cat',
            name: 'object_cat',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeSelect',
            label: 'Тип смены',
            col: 7,
            id: 'object_work_shift',
            name: 'object_work_shift',
            params: {
              options: [
                'Дневная',
                'Ночная',
              ],
              label: 'Не выбрано'
            },
            value: ''
          },
          {
            type: 'FTypeTextarea',
            label: 'Описание',
            col: 9,
            id: 'object_desc',
            name: 'object_desc',
            value: ''
          },

        ],
        meta_object_contact: [
          [
            {
              type: 'FTypeText',
              label: 'ФИО',
              col: 9,
              id: 'object_contact_fio',
              name: 'object_contact_fio_0',
              validation: ['required'],
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Должность',
              col: 9,
              id: 'object_contact_post',
              name: 'object_contact_post_0',
              validation: ['required'],
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Телефон',
              col: 9,
              id: 'object_contact_phone',
              name: 'object_contact_phone_0',
              validation: ['required', 'phone'],
              parent_array: 'meta_object_contact',
              value: ''
            },
            {
              type: 'FTypeText',
              label: 'Email',
              col: 9,
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
            icon: '',
            label: '',
            col: 9,
            id: 'object_resp',
            name: 'object_resp_0',
            remove: true,
            params: {
              options: [],
              item_text: 'fullname',
              label: 'Не выбрано'
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
              col: 8,
              name: 'object_pay_title_0',
              params: {
                options: [],
                item_text: 'name',
                cost: [],
                label: 'Не выбрано'
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
              col: 4,
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
      disabled: true,
      rate: {
        rate: '',
        end_date: '-',
        rates: []
      },
      isConfirmModal: false,
      confirmModal: {
        title: "Внимание!",
        description: "Есть несохраненные изменения. Хотите сохранить изменения и перейти к следующей вкладке?",
        text_btn_ok: "Да",
        text_btn_cancel: "Нет",
      },
    }
  },
  computed: {
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),

    request_id() {
      return this.$store.getters['request_id/request_id']
    },
    objects() {
      return this.$store.getters['objects/objects']
    },
    vacancies() {
      return this.$store.getters['object_id/object_id_vacancies']
    },
    specializations() {
      return this.$store.getters['specializations/specializations']
    },
    dispatchers() {
      return this.$store.getters['dispatchers/dispatchers']
    },
    postBody() {

      let postBody = {
        "uuid": this.request_id.uuid,
        "name": this.formValues.object_id,
        "description": this.formValues.object_desc,
        "start_date": this.formValues.object_start_date,
        "end_date": this.formValues.object_end_date,
        "object": this.formValues.object_name,
        "specialization": this.formValues.object_cat,
        "shift": this.formValues.object_work_shift
      };

      return postBody;
    },
    postBodyWorks() {
      let works = [];

      for (let i = 0; i < this.meta.meta_object_pay.length; i++) {
        let index_name = this.meta.meta_object_pay[i][0].name.substr(17, 18);
        works.push(
          {
            "uuid": this.formValues['object_pay_title_' + index_name],
            "requires_people": this.formValues['object_pay_cw_' + index_name],
          }
        )
      }

      return works;
    },
    postBodyContacts() {

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

      return contacts;
    },
    postBodyDispatchers() {

      let dispatchers = [];
      for (let i = 0; i < this.meta.meta_object_responsible.length; i++) {
        let name = this.meta.meta_object_responsible[i].name;
        dispatchers.push(
          this.formValues[name]
        )
      }

      return dispatchers;
    },

  },
  methods: {
    ...mapActions('request_id', ['fetchRequestId', 'putTaskWorks', 'putTaskContacts', 'putTaskDispatchers',]),
    ...mapActions('requests', ['putRequest',]),
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('dispatchers', ['fetchDispatchers',]),
    ...mapActions('object_id', ['fetchObjectIdVacancies',]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs", "setBreadcrumbs"]),

    selectTab(currentTab, nextTab) {
      if (!this.disabled) {
        this.isConfirmModal = true;
        this.tabIndexReserved = nextTab;

        this.$nextTick(() => {
          this.tab = currentTab;
        });
      }
    },

    confirmTab(confirm) {
      if (confirm) {
        this.updateTask(true);
      }

      this.isConfirmModal = false;
    },

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
          icon: '',
          label: '',
          col: 9,
          id: 'object_resp',
          name: 'object_resp_' + this.nameCounter++,
          remove: true,
          params: {
            options: dispatchers,
            item_text: 'fullname',
          },
          parent_array: 'meta_object_responsible',
          validation: 'required',
          value: '',
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

    updateTask(autosave) {

      let formPart = 'form_part_' + this.tab;
      this.$refs[formPart].validate();

      this.$nextTick(() => {
        if (this.valid) {

          if (this.tab == 0) {
            const newRequet = JSON.stringify(this.postBody);
            console.log(newRequet);
            this.putRequest({uuid: this.request_id.uuid, body: newRequet});
          } else if (this.tab == 1) {
            this.putTaskWorks({uuid: this.request_id.uuid, body: this.postBodyWorks});
          } else if (this.tab == 2) {
            this.putTaskContacts({uuid: this.request_id.uuid, body: this.postBodyContacts});
          } else if (this.tab == 3) {
            this.putTaskDispatchers({uuid: this.request_id.uuid, body: this.postBodyDispatchers});
          }

          this.disabled = true;
          if(autosave){
            this.tab = this.tabIndexReserved;
          }

        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      });

    },

    async updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value)

      if (field == 'object_name') {
        this.clearMetaObjectPay(value);
        await this.fetchObjectIdVacancies({
          requestId: value,
          params: {settings: {"per_page": 1000}},
          concat: false,
          unit: false
        });
      }

      this.disabled = false;

    },

    clearMetaObjectPay(value) {
      let object_info = this.objects.filter(obj => obj.uuid === value)[0];

      this.meta.meta_object_name[1].value = object_info.region + ', ' + object_info.city;
      this.meta.meta_object_name[4].value = object_info.schedule;
    },

    updateFiledResp(field, value, index) {
      this.formValues[field] = value;
      this.meta.meta_object_responsible[index].value = value;
      console.log(field, value);

      this.disabled = false;

    },

    updateFiledinArray(index_block, field, value, index, parent_array) {
      this.formValues[field] = value;
      this.meta[parent_array][index_block][index].value = value;

      if (field.includes('object_pay_title')) {
        this.setRate(value);
      }

      this.disabled = false;

      console.log(field, value);
    },

    setRate(uuid) {
      let vacancy_params = this.vacancies.filter(obj => obj.uuid === uuid)[0];

      this.rate.rate = vacancy_params.rate;
      this.rate.end_date = vacancy_params.end_date;
      this.rate.rates = vacancy_params.rates;

    },

    addFileds(length, method, args) {
      if (length > 1) {
        for (let i = 1; i < length; i++) {
          this[method](args, true);
        }
      }
    }
  },
  beforeDestroy() {
    this.setBreadcrumbs({
      crumbs: this.BREADCRUMBS.slice(0, this.BREADCRUMBS.length - 1),
    });
  },
  async created() {

    await this.fetchRequestId(this.$route.params.id);
    await this.fetchObjects();
    await this.fetchSpecializations();
    await this.fetchDispatchers();
    await this.fetchObjectIdVacancies({
      requestId: this.request_id.object.uuid,
      params: {settings: {"per_page": 1000}},
      concat: false,
      unit: false
    });

    this.clearMetaObjectPay(this.request_id.object.uuid);

    this.$route.meta.pre_title = this.request_id.name;

    let works_length = this.request_id.works.length,
      contact_length = this.request_id.contacts.length,
      dispatchers_length = this.request_id.dispatchers.length;

    await this.addFileds(contact_length, 'addFormPart', '');
    await this.addFileds(dispatchers_length, 'addResponsible', 'responsible');

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_pay[0][0].params.options = this.vacancies;
    this.meta.meta_object_name[0].value = this.request_id.object.uuid;

    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_responsible[0].params.options = this.dispatchers;

    this.meta.meta_object_info[1].value = this.request_id.specialization.uuid;

    let start_date = '';
    if (this.request_id.start_date != null) {
      start_date = this.request_id.start_date.substring(0, 10) + ' ' + this.request_id.start_date.substring(11, 16);
    }

    let end_date = '';
    if (this.request_id.start_date != null) {
      end_date = this.request_id.end_date.substring(0, 10) + ' ' + this.request_id.end_date.substring(11, 16);
    }

    this.meta.meta_object_name[2].value = start_date;
    this.meta.meta_object_name[3].value = end_date;

    this.meta.meta_object_info[0].value = this.request_id.name;
    this.meta.meta_object_info[3].value = this.request_id.description;

    for (let i = 0; i < works_length; i++) {

      if (this.request_id.works[i].uuid) {
        this.meta.meta_object_pay[i][0].value = this.request_id.works[i].uuid;
        this.meta.meta_object_pay[i][1].value = this.request_id.works[i].requires_people;

        this.setRate(this.request_id.works[i].uuid);
      }
    }

    for (let i = 0; i < contact_length; i++) {
      this.meta.meta_object_contact[i][0].value = this.request_id.contacts[i].fullname;
      this.meta.meta_object_contact[i][1].value = this.request_id.contacts[i].position;
      this.meta.meta_object_contact[i][2].value = this.request_id.contacts[i].phone;
      this.meta.meta_object_contact[i][3].value = this.request_id.contacts[i].email;
    }

    for (let i = 0; i < dispatchers_length; i++) {
      this.meta.meta_object_responsible[i].value = this.request_id.dispatchers[i].uuid;
    }

    this.meta.meta_object_name.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_info.map(f => {
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

    await this.initBreadcrumbs(this.$route.fullPath);

  },
  async mounted() {
    this.disabled = true;
  }
}
</script>

<style lang="scss">

@import '../../../assets/scss/colors';

.ruqi.page--tasks-id-edit {
  padding: 0;
  background: #F5F5F5;

  .theme--light.v-application {
    background: #F5F5F5;
  }

  .inner-object-page {
    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }

  .ruqi-rate-task {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    max-width: 520px;
  }

}

</style>

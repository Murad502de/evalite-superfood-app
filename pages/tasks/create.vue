<template lang="pug">
  .add-task
    PageHeader(header_text="Создание новой заявки" :disabled="disabled" button_text="сохранить изменения" @createAction = "nextFromButton" @closeAction="$router.push('/tasks/')")

    v-container.object-info-container
      v-row
        v-col.pa-6(cols="12")
          .object-info.wrap-form
            v-form(ref="form_part_0" v-model="valid" lazy-validation)
              v-row.object-info-row-rate
                v-col(cols="12")
                  .form-part-single
                    FormBuilder(:meta="meta.meta_object_name" @updateFiled="updateFiled")

                  v-divider.my-8

              v-row.d-flex.pa-4.action-row.align-center(no-gutters)
                v-col(cols="12")
                  v-tabs.form-tabs-minify.mt-1(v-model="tab", hide-slider, height="36")
                    v-tab(v-for="(item, index) in tabs_list", :key="index" :disabled="index > 0 ? true : false") {{ item }}

              v-row.object-info-row-rate
                v-col(cols="12")
                  v-window(v-model="tab")
                    v-tab-item(eager)
                      .form-part-single
                        FormBuilder(:meta="meta.meta_object_info" @updateFiled="updateFiled")

                  v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="nextFromButton") сохранить изменения


</template>
<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import PageHeader from "@/components/composite/PageCreateEditHeader";
import RateTask from "@/components/composite/RateTask";

export default {
  meta: {
    title: 'Создание новой заявки'
  },
  components: {PageHeader, RateTask},
  data() {
    return {
      formValues: {},
      title: 'Создание новой заявки',
      tabs_list: [
        'Общее', 'Вакансии и ставки', 'Контакты', 'Ответственные'
      ],
      tab: null,
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
      formHasErrors: false,
      disabled: false,
    }
  },
  computed: {
    objects() {
      return this.$store.getters['objects/objects']
    },
    specializations() {
      return this.$store.getters['specializations/specializations']
    },
    postBody() {
      let postBody = {
        "name": this.formValues.object_id,
        "description": this.formValues.object_desc,
        "start_date": this.formValues.object_start_date,
        "end_date": this.formValues.object_end_date,
        "until_date": this.formValues.object_end_date,
        "object": this.formValues.object_name,
        "specialization": this.formValues.object_cat,
        "shift": this.formValues.object_work_shift,
      };
      console.log(postBody);
      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('requests', ['createRequest',]),
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('breadcrumbs', ["setBreadcrumbs",]),

    nextFromButton() {

      let formPart = 'form_part_' + this.tab;
      this.$refs[formPart].validate();

      this.$nextTick(() => {
        if (this.valid) {
          const newRequet = JSON.stringify(this.postBody);
          console.log(newRequet);
          this.createRequest(newRequet);
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
      }
    },
    clearMetaObjectPay(value) {

      let object_info = this.objects.filter(obj => obj.uuid === value)[0];

      this.meta.meta_object_name[1].value = object_info.region + ', ' + object_info.city;
      this.meta.meta_object_name[4].value = object_info.schedule;

    },
  },
  async created() {

    await this.fetchObjects();
    await this.fetchSpecializations();

    console.log('this.specializations ----- ', this.specializations);

    this.meta.meta_object_name[0].params.options = this.objects;
    this.meta.meta_object_info[1].params.options = this.specializations;

    if (this.$route.params.objectId) {
      this.meta.meta_object_name[0].value = this.$route.params.objectId;
      this.clearMetaObjectPay(this.$route.params.objectId);
    }

    this.meta.meta_object_name.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
  }
}
</script>

<style lang="scss">

@import '../../assets/scss/colors';

.ruqi.page--tasks-create {
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

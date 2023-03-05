<template lang="pug">
  .create-perfomer
    Header(:content="title" :size="title_size" :isnew="false" :isback="true")
    v-tabs(v-model="tab" class="form-tabs")
      v-tab(v-for="(item, index) in tabs_list" :key="index") {{ item }}

    v-window(v-model="tab")
      .wrap-form
        .v-form(ref="form" v-model="valid" lazy-validation)
          v-tab-item
            v-form(ref="form_part_0" v-model="valid" lazy-validation)
              .form-part
                FormBuilder(:meta="meta.meta_object_info" @updateFiled="updateFiled")

              .form-part
                .form-part-title Внешний вид профиля
                FormBuilder(:meta="meta.meta_object_cover" @updateFiled="updateFiled")

          v-tab-item
            v-form(ref="form_part_1" v-model="valid" lazy-validation)
              .form-part
                .form-part-title Платежные данные
                .form-part-description Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                FormBuilder(:meta="meta.meta_object_pay_type" @updateFiled="updateFiled")
                FormBuilder(:meta="meta.meta_object_pay_card" @updateFiled="updateFiled" v-if="formValues.object_pay_type == 'банковская карта'")
                FormBuilder(:meta="meta.meta_object_pay" @updateFiled="updateFiled")

          v-tab-item
            v-form(ref="form_part_2" v-model="valid" lazy-validation)
              .form-part
                .form-part-title Виды работ
                .form-part-description Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.
                FormBuilder(:meta="meta.meta_object_works" @updateFiled="updateFiledWorks" @removeItem="removeItemProfession")
                a.add_link(href="#" @click.prevent="addTypeWork") Добавить вид работ

          v-tab-item
            v-form(ref="form_part_3" v-model="valid" lazy-validation)
              .form-part
                .form-part-title Желаемый график работ
                .form-part-description Укажите дни, в которые вы хотели бы получать приглашения в заявки
                FormBuilder(:meta="meta.meta_object_schedule" @updateFiled="updateFiled")

          v-tab-item
            v-form(ref="form_part_4" v-model="valid" lazy-validation)
              .form-part
                .form-part-title Фото документов
                FormBuilder(:meta="meta.meta_object_doc" @updateFiled="updateDocs" @removeItem="removeItemDoc")
                FormBuilder(:meta="meta.meta_object_doc_text" @updateFiled="updateFiled")

                .form-part-title.second Дополнительные документы
                .form-part-description Следующий перечень документов требуется для участия в заявках по выбранных Вами профессиям:
                FormBuilder(:meta="meta.meta_object_doc_med" @updateFiled="updateDocs" @removeItem="removeItemDoc")
                FormBuilder(:meta="meta.meta_object_doc_driver" @updateFiled="updateDocs" @removeItem="removeItemDoc")

          v-tab-item
            v-form(ref="form_part_5" v-model="valid" lazy-validation)
              .form-part
                .form-part-title Уведомлять о событиях
                FormBuilder(:meta="meta.meta_object_notification" @updateFiled="updateFiled")

          FNavigation(:indexTab="tab" :nextButtonsText="nextButtonsText" @nextFromButton="nextFromButton" @prevFromButton="prevFromButton")
</template>


<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  meta: {
    title: 'Создание нового исполнителя'
  },
  data() {
    return {
      formValues: {},
      formDocs: [
        {
          value: '',
          file: null
        }
      ],
      title: 'Создание нового исполнителя',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее',
        'Платежные данные',
        'Профессии',
        'График работ',
        'Документы',
        'Уведомления',
      ],
      tab: null,
      nextButtonsText: [
        'Далее',
        'Далее',
        'Далее',
        'Далее',
        'Далее',
        'Сохранить'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeText',
            label: 'Имя',
            col: 12,
            name: 'firstname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Фамилия',
            col: 12,
            name: 'lastname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Отчество',
            col: 12,
            name: 'middlename',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeDate',
            label: 'Дата рождения',
            col: 4,
            name: 'birthday',
            validation: 'required',
            value: '',
            params: {
              time: false
            },
          },
          {
            type: 'FTypeRadio',
            label: 'Пол',
            col: 12,
            name: 'gender',
            validation: 'required',
            params: {
              options: [
                {label: 'Мужской', value: 'male'},
                {label: 'Женский', value: 'female'},
              ],
              row: true,
            },
            value: 'male'
          },
          {
            type: 'FTypeText',
            label: 'Город',
            col: 12,
            name: 'city',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 5,
            name: 'phone',
            validation: ['required', 'phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Электронная почта',
            col: 7,
            name: 'email',
            validation: ['required', 'email'],
            value: ''
          },
        ],
        meta_object_cover: [
          {
            type: 'FTypeFile',
            label: 'Фото профиля',
            col: 12,
            name: 'doc_file_' + this.nameCounter++,
            value: null,
            remove: false,
            parent_array: 'meta_object_doc',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug: 'profile_photo_main'
            },
          },
        ],
        meta_object_pay_type: [
          {
            type: 'FTypeSelect',
            label: 'Тип оплаты',
            col: 12,
            name: 'object_pay_type',
            params: {
              options: [
                'банковская карта',
                'наличные',
              ],
            },
            parent_array: 'meta_object_pay',
            value: 'банковская карта',
          },
        ],
        meta_object_pay_card: [
          {
            type: 'FTypeText',
            label: 'Номер карты',
            col: 12,
            name: 'card',
            validation: [],
            value: ''
          },
        ],
        meta_object_pay: [
          {
            type: 'FTypeText',
            label: 'ИНН',
            col: 4,
            name: 'inn',
            validation: ['inn'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'КПП',
            col: 4,
            name: 'kpp',
            validation: ['kpp'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'БИК',
            col: 4,
            name: 'bik',
            validation: ['bik'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Расчетный счет',
            col: 6,
            name: 'payment_account',
            validation: ['rs'],
            value: '',
            params: {
              bik: ''
            }
          },
          {
            type: 'FTypeText',
            label: 'Корреспондентский счёт',
            col: 6,
            name: 'cor_account',
            validation: ['ks'],
            value: '',
            params: {
              bik: ''
            }
          },
          {
            type: 'FTypeText',
            label: 'Банк',
            col: 12,
            name: 'bank',
            validation: [],
            value: ''
          },
        ],
        meta_object_works: [
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
            parent_array: 'meta_object_works',
            remove: true,
          },
        ],
        meta_object_schedule: [
          {
            type: 'FTypeRadio',
            label: '',
            col: 12,
            name: 'schedule',
            validation: 'required',
            params: {
              options: [
                {label: '2 через 2', value: 'two'},
                {label: '3 через 3', value: 'three'},
                {label: 'индивидуальный', value: 'individual'},
              ],
              row: false,
            },
            value: 'two'
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'monday',
            params: {
              label: 'пн',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'tuesday',
            params: {
              label: 'вт',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'wednesday',
            params: {
              label: 'ср',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'thursday',
            params: {
              label: 'чт',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'friday',
            params: {
              label: 'пт',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'saturday',
            params: {
              label: 'сб',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 0,
            name: 'sunday',
            params: {
              label: 'вс',
              class: 'style2'
            },
            validation: [],
            value: false
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_weekend_free',
            params: {
              label: 'не приглашать в выходные и праздничные дни',
              note: 'Мы не будем приглашать вас на объекты во время официальных праздников и выходных'
            },
            validation: [],
            value: ''
          },
          {
            type: 'FTypeLabel',
            label: 'Время',
            col: 12,
            name: 'label',
            params: {},
            validation: [],
            value: '',
          },
          {
            type: 'FTypeTime',
            label: '',
            col: 0,
            name: 'object_time_start',
            params: {
              prepend: 'c'
            },
            validation: [],
            value: '',
          },
          {
            type: 'FTypeTime',
            label: '',
            col: 0,
            name: 'object_time_end',
            params: {
              prepend: 'до'
            },
            validation: [],
            value: '',
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_night_free',
            params: {
              label: 'не приглашать в ночные смены',
              note: 'Мы не будем приглашать в вас на заявки, время работы которых попадает в промежуток 22:00 – 06:00'
            },
            validation: [],
            value: ''
          },
        ],
        meta_object_notification: [
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Доступна новая заявка на объекте',
            },
            col: 12,
            name: 'notification_new_task',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Появился новый объект в моем месте',
            },
            col: 12,
            name: 'notification_new_object',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Заканчивается время набора на заявку',
            },
            col: 12,
            name: 'notification_low_time',
            value: ''
          },
        ],
        meta_object_doc: [
          {
            type: 'FTypeFile',
            label: 'Паспорт - основной разворот',
            col: 12,
            name: 'doc_file_passport_01',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'passport_main_spread',
              slug_doc: 'passport'
            },
          },
          {
            type: 'FTypeFile',
            label: 'Паспорт - страница регистрации',
            col: 12,
            name: 'doc_file_passport_02',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'passport_registration_page',
              slug_doc: 'passport'
            },
          },
          {
            type: 'FTypeFile',
            label: 'Фото с паспортом',
            col: 12,
            name: 'doc_file_passport_03',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'photo_with_passport',
              slug_doc: 'passport'
            },
          },
        ],
        meta_object_doc_text: [
          {
            type: 'FTypeText',
            label: 'СНИЛС',
            col: 12,
            name: 'snils',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Свидетельство ИНН',
            col: 12,
            name: 'svid_inn',
            validation: ['required'],
            value: ''
          },
        ],
        meta_object_doc_med: [
          {
            type: 'FTypeFile',
            label: 'Медицинская книжка',
            col: 12,
            name: 'doc_file_med_00',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc_med',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'medical_book_main_spread',
            },
          },
          {
            type: 'FTypeFile',
            label: 'Медицинская книжка - доп. страница 1',
            col: 12,
            name: 'doc_file_med_01',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc_med',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'medical_book_page_1',
            },
          },
          {
            type: 'FTypeFile',
            label: 'Медицинская книжка - доп. страница 2',
            col: 12,
            name: 'doc_file_med_02',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc_med',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'medical_book_page_2',
            },
          },
          {
            type: 'FTypeFile',
            label: 'Медицинская книжка - доп. страница 3',
            col: 12,
            name: 'doc_file_med_03',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc_med',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'medical_book_page_3',
            },
          },
        ],
        meta_object_doc_driver: [
          {
            type: 'FTypeFile',
            label: 'Права на управление штабелером - основной разворот',
            col: 12,
            name: 'doc_file_driver_license',
            value: null,
            remove: true,
            parent_array: 'meta_object_doc_driver',
            exist: 'exist',
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              slug_file: 'stacker_driving_license',
            },
          },
        ],

      },
      valid: true,
      select: null,
      formHasErrors: false,
      nameCounter: 1,
    }
  },
  computed: {
    ...mapGetters('contractors', ['statusCreateContractor',]),
    ...mapGetters('contractorDocs', ['documents',]),

    professions() {
      return this.$store.getters['dictionary/professions']
    },

    postBody() {

      let schedule = this.formValues.schedule,
        schedule_type = {
          "two": false,
          "three": false,
          "individual": false,
        };
      schedule_type[schedule] = true;

      let works = [];
      for (let i = 0; i < this.meta.meta_object_works.length; i++) {
        let name = this.meta.meta_object_works[i].name;
        works.push(
          this.formValues[name]
        )
      }

      let postBody = {
        "firstname": this.formValues.firstname,
        "middlename": this.formValues.middlename,
        "lastname": this.formValues.lastname,
        "birthday": this.formValues.birthday,
        "logo": [],
        "email": this.formValues.email,
        "phone": this.formValues.phone,
        "gender": this.formValues.gender,
        "settings": {
          "notification_new_task": this.formValues.notification_new_task,
          "notification_new_object": this.formValues.notification_new_object,
          "notification_low_time": this.formValues.notification_low_time,
          "city": this.formValues.city,
          "bik": this.formValues.bik,
          "payment_account": this.formValues.payment_account,
          "correspondent_account": this.formValues.cor_account,
          "bank": this.formValues.bank,
          "type_payment": this.formValues.object_pay_type,
          "inn": this.formValues.inn,
          "ogrn": this.formValues.ogrn,
          "kpp": this.formValues.kpp,
          "bank_card": this.formValues.card,
          "document_inn": this.formValues.svid_inn,
          "document_snils": this.formValues.snils,
        },
        "work_times": {
          "start_date": this.formValues.object_time_start,
          "end_date": this.formValues.object_time_end,
          "night_shift": this.formValues.object_night_free,
          "two": schedule_type.two,
          "three": schedule_type.three,
          "individual": schedule_type.individual,
          "monday": this.formValues.monday,
          "tuesday": this.formValues.tuesday,
          "wednesday": this.formValues.wednesday,
          "thursday": this.formValues.thursday,
          "friday": this.formValues.friday,
          "saturday": this.formValues.saturday,
          "sunday": this.formValues.sunday,
          "weekend": this.formValues.object_weekend_free,
          "night_start_date": this.formValues.object_time_start,
          "night_end_date": this.formValues.object_time_end
        },
        "professions": works,
        "type": 'contractor'
      };

      return postBody;
    },
  },
  watch: {
    'statusCreateContractor.status': function () {
      if (this.statusCreateContractor.status) {
        this.processingDocs(this.statusCreateContractor.uuid);
      }
    },
  },
  methods: {
    ...mapActions('contractorDocs', ['createDoc',]),
    ...mapActions('contractorDocs', ['loadPhoto',]),
    ...mapActions('contractorDocs', ['getDocuments',]),

    ...mapActions('contractors', ['createContractor',]),
    ...mapActions('dictionary', ['fetcProfessions',]),

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
        this.createContractor(newRequet);
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;

      if (field == 'bik') {

        this.meta.meta_object_pay[3].params.bik = value;
        this.meta.meta_object_pay[4].params.bik = value;
        this.meta.meta_object_pay[3].value = '';
        this.meta.meta_object_pay[4].value = '';

        this.formValues.cor_account = '';
        this.formValues.payment_account = '';

      }
      console.log(field, value);
    },
    updateFiledWorks(field, value, index) {
      this.formValues[field] = value;
      this.meta.meta_object_works[index].value = value;
      console.log(field, value);
    },
    updateDocs(field, value, index, parent_array) {
      this.meta[parent_array][index].value = value;
      console.log(field, value);
    },
    removeItemProfession(index, array) {
      if (index >= 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
        delete this.formValues[`${array.replace('meta_', '')}_${index}`];
      }
    },
    removeItemDoc(index, parent_array) {
      this.meta[parent_array][index].value = null;
    },
    processingDocs(clientId) {

      let document = [
          {name: 'Паспорт', slug: 'passport', parent_array: 'meta_object_doc'},
          {name: 'Медицинская книжка', slug: 'medical_book', parent_array: 'meta_object_doc_med'},
          {name: 'Права на управление штабелером', slug: 'stacker_driving_license', parent_array: 'meta_object_doc_driver'},
          {name: 'Фото профиля', slug: 'profile_photo', parent_array: 'meta_object_cover'},
        ],
        self = this;

      document.forEach(function (item, i) {
        let files = [];
        for (let i = 0; i < self.meta[item.parent_array].length; i++) {
          if (self.meta[item.parent_array][i].value){
            files.push(
              {
                "media": self.meta[item.parent_array][i].value,
                "name_media": self.meta[item.parent_array][i].label,
                "slug": self.meta[item.parent_array][i].params.slug_file,
              }
            )
          }
        }

        self.createDoc({clientId: clientId, docName: item.name, docSlug: item.slug, docFiles: files,});
      });
    },
    addTypeWork() {
      this.meta.meta_object_works.push(
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
          parent_array: 'meta_object_works',
          remove: true,
        }
      );
      this.meta.meta_object_works[this.meta.meta_object_works.length - 1].params.options = this.professions;
      this.nameCounter++;
    },
  },
  async created() {
    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay_type.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_pay_card.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_works.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_schedule.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_notification.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    await this.fetcProfessions();

    this.meta.meta_object_works[0].params.options = this.professions;

  }
}
</script>

<style lang="scss">


</style>

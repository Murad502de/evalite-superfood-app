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
                  Данные для регистрации нового пользователя
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                  расположение.
                </div>
                <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
                <FormBuilder :meta="meta.meta_object_object" @updateFiled="updateFiled" @removeItem="removeItem"/>
                <a href="#" @click.prevent="addObject('object')" class="add_link">Добавить объект</a>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part">
                <div class="form-part-title">
                  Действия доступные пользователю
                </div>
                <div class="form-part-description">
                  Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное
                  расположение.
                </div>
                <div class="form-part-label" v-if="this.formValues.object_role == 'manager'">Действия</div>
                <FormBuilder v-if="this.formValues.object_role == 'manager'" :meta="meta.meta_object_rights" @updateFiled="updateFiled"/>

                <div class="form-part-label spacer">Оповещения</div>
                <FormBuilder :meta="meta.meta_object_notification" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="form_part_2" v-model="valid" lazy-validation>
              <div class="form-part">
                <FormBuilder :meta="meta.meta_object_contact" @updateFiled="updateFiled"/>
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
    if (store.getters['objects/objects'].length === 0) {
      await store.dispatch('objects/fetchObjects')
    }
  },
  meta: {
    title: 'Создание нового сотрудника'
  },
  data() {
    return {
      formValues: {},
      title: 'Создание нового сотрудника',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Общее', 'Права', 'Способы связи',
      ],
      tab: null,
      nextButtonsText: [
        'создать нового пользователя',
        'создать нового пользователя',
        'создать нового пользователя',
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeSelectUIID',
            label: 'Роль',
            col: 8,
            name: 'object_role',
            params: {
              options: [
                {name: 'Менеджер', uuid: 'manager'},
                {name: 'Диспетчер', uuid: 'dispatcher'},
              ],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Имя',
            col: 8,
            name: 'firstname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Фамилия',
            col: 8,
            name: 'lastname',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Описание',
            col: 8,
            name: 'description',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 12,
            name: 'email',
            params: {
              note: 'На данный email будет отправлена ссылка-приглашение для регистрации '
            },
            validation: ['required', 'email'],
            value: ''
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 12,
            name: 'object_contact_rule',
            params: {
              label: 'Разрешить регистрацию без подтверждения'
            },
            validation: ['required',],
            value: ''
          },
        ],
        meta_object_object: [
          {
            type: 'FTypeSelectUIID',
            label: 'Назначить на объекты',
            col: 12,
            name: 'object_0',
            remove: true,
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            parent_array: 'meta_object_object',
            value: ''
          },
        ],
        meta_object_rights: [
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешить добавлять новых менеджеров',
            },
            col: 12,
            name: 'right_create_manager',
            value: ''
          },
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Разрешить добавлять новых диспетчеров',
            },
            col: 12,
            name: 'right_create_dispatcher',
            value: ''
          },
        ],
        meta_object_notification: [
          {
            type: 'FTypeSwitch',
            params: {
              label: 'Уведомлять о новых связанных объектах',
            },
            col: 12,
            name: 'notification_new_object',
            value: ''
          },
        ],
        meta_object_contact: [
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 8,
            name: 'object_contact_phone',
            validation: ['required', 'phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Email',
            col: 8,
            name: 'object_contact_email',
            validation: ['email'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Whatsapp',
            col: 8,
            name: 'object_contact_whatsapp',
            validation: ['phone'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Telegram',
            col: 8,
            name: 'object_contact_telegram',
            validation: ['phone'],
            value: ''
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
    objects() {
      return this.$store.getters['objects/objects'];
    },
    postBody() {
      let objects = [];
      for (let i = 0; i < this.meta.meta_object_object.length; i++) {
        let name = this.meta.meta_object_object[i].name;
        objects.push(
          this.formValues[name]
        );
      }

      let postBody = {
        "type": this.formValues.object_role,
        "firstname": this.formValues.firstname,
        "lastname": this.formValues.lastname,
        "email": this.formValues.email,
        "phone": this.formValues.object_contact_phone,
        "objects": objects,
        "settings": {
          "create_manager": this.formValues.right_create_manager,
          "create_dispatcher": this.formValues.right_create_dispatcher,
          "notification_new_object": this.formValues.notification_new_object,
          "contact_phone": this.formValues.object_contact_phone,
          "contact_email": this.formValues.object_contact_email,
          "whatsapp": this.formValues.object_contact_whatsapp,
          "telegram": this.formValues.object_contact_telegram
        }

      };

      return postBody;
    },
  },
  methods: {
    ...mapActions('objects', ['fetchObjects',]),
    ...mapActions('employees', ['createRequest',]),

    nextFromButton() {
      let formPart = 'form_part_' + this.tab;
      this.$refs[formPart].validate();
      if (this.tab < this.tabs_list.length - 1) {
        this.$nextTick(() => {
          if (this.valid) {
            this.tab += 1;
          } else {
            let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
            this.$vuetify.goTo(el);
          }
        });
      } else {
        if (this.valid) {
          const newRequet = JSON.stringify(this.postBody);
          console.log(newRequet);
          this.createRequest(newRequet);
        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
      if(field == 'email' && !this.meta.meta_object_contact[1].value){
        this.meta.meta_object_contact[1].value = value;
        this.formValues.object_contact_email = value;
      }
    },
    removeItem(index, array) {
      if (index >= 0 || this.meta[array].length > 1) {
        this.meta[array].splice(index, 1);
        delete this.formValues[`${array.replace('meta_', '')}_${index}`];
      }
    },
    addObject(resp_name, isInit = false) {

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

      this.meta['meta_object_' + resp_name].push(
        {
          type: 'FTypeSelectUIID',
          label: '',
          col: 12,
          name: 'object_' + this.nameCounter++,
          remove: true,
          params: {
            options: this.objects,
            item_text: 'name',
            label: 'Не выбрано'
          },
          validation: 'required',
          parent_array: 'meta_object_object',
          value: ''
        },
      );
    },
  },
  created() {

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_contact.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })

    this.meta.meta_object_object[0].params.options = this.objects;

  }
}
</script>

<style lang="scss" scoped>

@import '../../assets/scss/colors';


</style>

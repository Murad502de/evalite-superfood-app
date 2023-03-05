<template>
  <div>
    <Header :content="client_id.name" :size="title_size" :isnew="false" :isback="true"/>
    <v-tabs
      v-model="tab"
      class="form-tabs"
    >
      <v-tab v-for="(item, index) in tabs_list"
             :key="index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <div class="wrap-form">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-tab-item>
            <v-form ref="form_part_0" v-model="valid" lazy-validation>
              <div class="form-part">
                <FormBuilder :meta="meta.meta_object_info" @updateFiled="updateFiled"/>
                <FormBuilder v-if="formValues.object_type == 'entity'" :meta="meta.meta_object_entity" @updateFiled="updateFiled"/>
                <FormBuilder v-if="formValues.object_type == 'personal'" :meta="meta.meta_object_personal" @updateFiled="updateFiled"/>
              </div>
            </v-form>
          </v-tab-item>

          <v-tab-item>
            <v-form ref="form_part_1" v-model="valid" lazy-validation>
              <div class="form-part form-part-contact"
                   v-for="(item, index) in meta.meta_object_doc"
                   :key="index">
                <a href="#" @click.prevent="removeItem(index, 'meta_object_doc')"
                   class="remove-item">
                  <img src="/img/ico_close.svg" alt="Удалить">
                </a>
                <FormBuilder :meta="item" @updateFiled="updateDocs(index, ...arguments)"
                             @removeItem="removeItemDoc(index, false, ...arguments)"/>
                <a href="#" @click.prevent="addPhoto(index, 'new')" class="add_link">Добавить
                  фото</a>
              </div>
              <AddFormPart text="Добавить документ" @addFormPart="addDocumentClick('new')"/>
            </v-form>
          </v-tab-item>

          <FNavigation v-show="tab < 2" :indexTab="tab" :nextButtonsText="nextButtonsText"
                      @nextFromButton="nextFromButton"
                      @prevFromButton="prevFromButton"/>
        </v-form>
      </div>

      <v-tab-item>
        <div class="table-list-style">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="objects"
            class="elevation-0"
            item-key="uuid"
            :page.sync="page"
            :items-per-page="itemsPerPageTable"
            @page-count="pageCount = $event"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <div class="color-black" @click="openRequest(item.uuid)">
                <span class="request-i"></span>
                {{ item.name }}
              </div>

            </template>

            <template v-slot:item.rating="{ item }">
              <Rating :rating="item.raiting"/>
            </template>

            <template v-slot:item.request="{ item }">
              <div class="color-black">
                {{ item.count_tasks }}
              </div>
            </template>

            <template v-slot:item.dispatcher="{ item }">
              <UserAvatar :first_name="item.dispatchers.firstname" :last_name="item.dispatchers.lastname"
                          :color="avatarColor" v-if="item.dispatchers.firstname"/>
            </template>

            <template v-slot:item.address="{ item }">
              <div>
                {{ item.region }}, {{ item.city }}
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu
                bottom
                rounded="10"
                offset-y
                nudge-bottom="10"
                left
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
                      <nuxt-link :to="'/objects/'+ item.uuid +'/edit/'">
                        <span>Редактировать</span>
                      </nuxt-link>
                      <v-divider class="my-3"></v-divider>
                      <a href="#" @click.prevent="removeRequest(item.uuid)">Удалить</a>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </template>
          </v-data-table>
        </div>
      </v-tab-item>

    </v-window>
  </div>

</template>

<script>

import Vue from "vue";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  async fetch({store}) {
    if (store.getters['dictionary/specializations'].length === 0) {
      await store.dispatch('dictionary/fetchSpecializations')
    }
  },
  meta: {
    title: 'Редактирование клиента'
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
      title: 'Создание нового клиента',
      title_size: 'large',
      title_create: false,
      title_page_create: '',
      tabs_list: [
        'Данные', 'Документы', 'Объекты',
      ],
      tab: null,
      nextButtonsText: [
        'Добавить документы',
        'Сохранить'
      ],
      meta: {
        meta_object_info: [
          {
            type: 'FTypeSelectUIID',
            label: 'Вид контрагента',
            col: 12,
            name: 'object_type',
            params: {
              options: [
                {name: 'Юр. лицо', uuid: 'entity'},
                {name: 'Физ. лицо', uuid: 'personal'},
              ],
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
            name: 'object_spec',
            params: {
              options: [],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: ''
          },
        ],
        meta_object_entity: [
          {
            type: 'FTypeText',
            label: 'Полное наименование организации',
            col: 12,
            name: 'name',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Юридический адрес',
            col: 12,
            name: 'legal_address',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Почтовый адрес',
            col: 12,
            name: 'post_address',
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ОГРН',
            col: 6,
            name: 'ogrn',
            validation: ['ogrn'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ОКАТО',
            col: 6,
            name: 'okato',
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ИНН',
            col: 4,
            name: 'inn',
            validation: ['required', 'inn'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'КПП',
            col: 4,
            name: 'kpp',
            validation: ['required', 'kpp'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'БИК',
            col: 4,
            name: 'bik',
            validation: ['required', 'bik'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Банк',
            col: 12,
            name: 'bank',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Расчетный счет',
            col: 6,
            name: 'payment_account',
            validation: ['required', 'rs'],
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
            validation: ['required', 'ks'],
            value: '',
            params: {
              bik: ''
            }
          },
          {
            type: 'FTypeText',
            label: 'Генеральный директор',
            col: 12,
            name: 'general_manager',
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Электронная почта',
            col: 12,
            name: 'object_contact_email',
            validation: ['required', 'email'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            name: 'object_contact_phone',
            validation: ['required', 'phone'],
            value: ''
          },
        ],
        meta_object_personal: [
          {
            type: 'FTypeText',
            label: 'ФИО',
            col: 12,
            name: 'name',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Почтовый адрес',
            col: 12,
            name: 'post_address',
            validation: [],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ОГРНИП',
            col: 12,
            name: 'ogrnip',
            validation: ['ogrnip'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'ИНН',
            col: 6,
            name: 'inn',
            validation: ['required', 'inn'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'БИК',
            col: 6,
            name: 'bik',
            validation: ['required', 'bik'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Банк',
            col: 12,
            name: 'bank',
            validation: ['required'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Расчетный счет',
            col: 6,
            name: 'payment_account',
            validation: ['required', 'rs'],
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
            validation: ['required', 'ks'],
            value: '',
            params: {
              bik: ''
            }
          },
          {
            type: 'FTypeText',
            label: 'Номер свидетельства',
            col: 6,
            name: 'number_certificate',
            validation: ['required',],
            value: '',
          },
          {
            type: 'FTypeText',
            label: 'Дата свидетельства',
            col: 6,
            name: 'date_certificate',
            validation: ['required',],
            value: '',
          },
          {
            type: 'FTypeText',
            label: 'Электронная почта',
            col: 12,
            name: 'object_contact_email',
            validation: ['required', 'email'],
            value: ''
          },
          {
            type: 'FTypeText',
            label: 'Телефон',
            col: 12,
            name: 'object_contact_phone',
            validation: ['required', 'phone'],
            value: ''
          },
        ],
        meta_object_doc: [],
      },
      valid: true,
      select: null,
      formHasErrors: false,
      headers: [
        {text: 'Название', align: 'start', value: 'name',},
        {text: 'Рейтинг', value: 'rating'},
        {text: 'Заявки', value: 'request'},
        {text: 'Диспетчер', value: 'dispatcher'},
        {text: 'Расположен', value: 'address'},
        {text: '', value: 'actions', sortable: false, align: 'right'},
      ],
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      avatarColor: '#EFCD4F',
      nameCounter: 1,

    }
  },
  computed: {
    objects() {
      return this.$store.getters['objects/objects'];
    },
    specializations() {
      return this.$store.getters['dictionary/specializations'];
    },
    client_id() {
      return this.$store.getters['client_id/client_id'];
    },
    documents() {
      return this.$store.getters['client_id/documents'];
    },
    postBody() {
      let postBody = {
        "name": this.formValues.name,
        "type": this.formValues.object_type,
        "address": this.formValues.post_address,
        "specialization_uuid": this.formValues.object_spec,
        "legal_address": this.formValues.legal_address,
        "inn": this.formValues.inn,
        "ogrn": this.formValues.ogrn,
        "kpp": this.formValues.kpp,
        "okato": this.formValues.okato,
        "bik": this.formValues.bik,
        "payment_account": this.formValues.payment_account,
        "correspondent_account": this.formValues.cor_account,
        "bank": this.formValues.bank,
        "gen_director": this.formValues.general_manager,
        "mail": this.formValues.object_contact_email,
        "phone": this.formValues.object_contact_phone,
        "ogrnip": this.formValues.ogrnip,
        "date_certificate": this.formValues.date_certificate,
        "number_certificate": this.formValues.number_certificate,
      };

      return postBody;
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
    ...mapActions('objects', ['fetchObjectsAccount',]),
    ...mapActions('dictionary', ['fetchSpecializations',]),
    ...mapActions('client_id', ['fetchClientId',]),
    ...mapActions('client_id', ['createDoc',]),
    ...mapActions('client_id', ['changeDoc',]),
    ...mapActions('client_id', ['loadPhoto',]),
    ...mapActions('client_id', ['getDocs',]),
    ...mapActions('client_id', ['removeDoc',]),
    ...mapActions('client_id', ['removePhoto',]),
    ...mapActions('clients', ['putRequest',]),
    ...mapActions('objects', ['removeRequest',]),
    ...mapMutations('breadcrumbs', ["setBreadcrumbs",]),

    async nextFromButton() {
      if (this.tab < this.tabs_list.length - 2) {
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

        await this.processingDocs();
        this.putRequest({uuid: this.client_id.uuid, body: newRequet});

      }
    },
    prevFromButton() {
      this.tab -= 1;
    },
    updateFiled(field, value) {
      this.formValues[field] = value;

      if (field == 'bik'){

        if (this.formValues.object_type == 'entity'){
          this.meta.meta_object_entity[9].params.bik = value;
          this.meta.meta_object_entity[10].params.bik = value;
          this.meta.meta_object_entity[9].value = '';
          this.meta.meta_object_entity[10].value = '';
        }
        else{
          this.meta.meta_object_personal[6].params.bik = value;
          this.meta.meta_object_personal[7].params.bik = value;
          this.meta.meta_object_personal[6].value = '';
          this.meta.meta_object_personal[7].value = '';
        }

        this.formValues.cor_account = '';
        this.formValues.payment_account = '';

      }
      console.log(field, value);
    },
    updateDocs(index_block, field, value, index) {
      if (index > 0 && this.meta.meta_object_doc[index_block][index].exist == 'loaded' && this.meta.meta_object_doc[index_block][index].value) {
        this.removeItemDoc(index, true, ...arguments);
        this.meta.meta_object_doc[index_block][index].exist = 'new';
      }
      if (this.meta.meta_object_doc[index_block][index].exist == 'loaded'){
        this.meta.meta_object_doc[index_block][index].exist = 'changed';
      }
      this.meta.meta_object_doc[index_block][index].value = value;
      console.log(field, value);
    },
    addDocumentClick(exist) {
      let formPart = 'form_part_' + this.tab;
      this.$refs[formPart].validate();

      this.$nextTick(() => {
        if (this.valid) {
          this.addDocument(exist)
        } else {
          let el = this.$el.querySelector(".v-messages.error--text:first-of-type");
          this.$vuetify.goTo(el);
        }
      });

    },
    addDocument(exist) {
      this.meta.meta_object_doc.push(
        [
          {
            type: 'FTypeText',
            label: 'Введите название и загрузите документ',
            col: 12,
            name: 'doc_title_' + this.nameCounter++,
            validation: ['required'],
            value: '',
            parent_array: 'meta_object_doc',
            exist: exist,
            uuid: null
          },
          {
            type: 'FTypeFile',
            label: '',
            col: 12,
            name: 'doc_file_' + this.nameCounter++,
            value: null,
            remove: true,
            parent_array: 'meta_object_doc',
            exist: exist,
            params: {
              placeholder: 'Документ не загружен',
              uuid: null,
              preview_url: null,
              original_url: null
            },
          },
        ]
      );
    },
    addPhoto(index_document, exist) {
      if (this.meta.meta_object_doc[index_document].length == 1
        || this.meta.meta_object_doc[index_document][this.meta.meta_object_doc[index_document].length - 1].value
        || this.meta.meta_object_doc[index_document][this.meta.meta_object_doc[index_document].length - 1].exist == "loaded"
        && this.meta.meta_object_doc[index_document][this.meta.meta_object_doc[index_document].length - 1].params.placeholder != "Документ не загружен") {
        this.meta.meta_object_doc[index_document].push(
          {
            type: 'FTypeFile',
            label: '',
            col: 12,
            name: 'doc_file_' + this.nameCounter++,
            value: null,
            remove: true,
            parent_array: 'meta_object_doc',
            exist: exist,
            params: {
              placeholder: 'Документ не загружен',
              uuid: null
            },
          },
        );
        if(this.meta.meta_object_doc[index_document][0].exist != 'new'){
          this.meta.meta_object_doc[index_document][0].exist = 'changed';
        }
      }
    },
    removeItem(index, array) {
      if (this.meta[array][index][0].uuid) {
        this.removeDoc({clientId: this.client_id.uuid, docId: this.meta[array][index][0].uuid});
      }
      this.meta[array].splice(index, 1);
    },
    removeItemDoc(index_block, isChange, index, array) {
      if (this.meta[array][index_block][index].placeholder != 'Документ не загружен') {
        this.removePhoto({
          clientId: this.client_id.uuid,
          docId: this.meta[array][index_block][0].uuid,
          imageId: this.meta[array][index_block][index].params.uuid
        });
      }
      if (!isChange) {
        this.meta[array][index_block].splice(index, 1);
      }
    },
    processingDocs() {
      let clientId = this.client_id.uuid,
        self = this;

      this.meta.meta_object_doc.forEach(function (item, i) {
        if (item[0].exist == 'new' && item[0].value) {
          self.createDoc({clientId: clientId, docName: item[0].value, docFiles: item.slice(1)});
        } else if (item[0].exist == 'changed') {
          self.changeDoc({clientId: clientId, docId: item[0].uuid, docName: item[0].value, docFiles: item.slice(1)});
        }
      });
    },
    openRequest(id) {
      this.$router.push('/objects/' + id);
    },
    addFileds(length, method, args) {
      if (length) {
        for (let i = 0; i < length; i++) {
          this[method](args.exist, true);
        }
      }
    },
  },
  async created() {
    await this.fetchClientId(this.$route.params.id);

    this.$route.meta.pre_title = this.client_id.name;
    this.setBreadcrumbs(this.$route.fullPath);

    await this.fetchObjectsAccount(this.$route.params.id);
    await this.getDocs(this.$route.params.id);

    let documents = this.documents.length;
    await this.addFileds(documents, 'addDocument', {exist: 'loaded', length: documents});

    for (let i = 0; i < documents; i++) {

      this.meta.meta_object_doc[i][0].uuid = this.documents[i].uuid;
      this.meta.meta_object_doc[i][0].value = this.documents[i].name;

      if (this.documents[i].media.length > 0) {
        for (let j = 0; j < this.documents[i].media.length; j++) {
          await this.addPhoto(i, 'loaded');
          this.meta.meta_object_doc[i][j + 1].params.placeholder = 'Документ загружен';
          this.meta.meta_object_doc[i][j + 1].params.uuid = this.documents[i].media[j].uuid;
          this.meta.meta_object_doc[i][j + 1].params.preview_url = this.documents[i].media[j].preview_url;
          this.meta.meta_object_doc[i][j + 1].params.original_url = this.documents[i].media[j].original_url;
        }
      }
    }

    this.meta.meta_object_info[1].params.options = this.specializations;
    this.meta.meta_object_info[0].value = this.client_id.type;
    this.meta.meta_object_info[1].value = this.client_id.specialization;

    this.meta.meta_object_entity[0].value = this.client_id.name;
    this.meta.meta_object_entity[1].value = this.client_id.legal_address;
    this.meta.meta_object_entity[2].value = this.client_id.address;
    this.meta.meta_object_entity[3].value = this.client_id.ogrn;
    this.meta.meta_object_entity[4].value = this.client_id.okato;
    this.meta.meta_object_entity[5].value = this.client_id.inn;
    this.meta.meta_object_entity[6].value = this.client_id.kpp;
    this.meta.meta_object_entity[7].value = this.client_id.bik;
    this.meta.meta_object_entity[8].value = this.client_id.bank;
    this.meta.meta_object_entity[9].value = this.client_id.payment_account;
    this.meta.meta_object_entity[10].value = this.client_id.correspondent_account;
    this.meta.meta_object_entity[11].value = this.client_id.gen_director;
    this.meta.meta_object_entity[12].value = this.client_id.mail;
    this.meta.meta_object_entity[13].value = this.client_id.phone;

    this.meta.meta_object_personal[0].value = this.client_id.name;
    this.meta.meta_object_personal[1].value = this.client_id.address;
    this.meta.meta_object_personal[2].value = this.client_id.ogrnip;
    this.meta.meta_object_personal[3].value = this.client_id.inn;
    this.meta.meta_object_personal[4].value = this.client_id.bik;
    this.meta.meta_object_personal[5].value = this.client_id.bank;
    this.meta.meta_object_personal[6].value = this.client_id.payment_account;
    this.meta.meta_object_personal[7].value = this.client_id.correspondent_account;
    this.meta.meta_object_personal[8].value = this.client_id.number_certificate;
    this.meta.meta_object_personal[9].value = this.client_id.date_certificate;
    this.meta.meta_object_personal[10].value = this.client_id.mail;
    this.meta.meta_object_personal[11].value = this.client_id.phone;

    if (this.client_id.type == 'entity'){
      this.meta.meta_object_entity[9].params.bik = this.client_id.bik;
      this.meta.meta_object_entity[10].params.bik = this.client_id.bik;
    }
    else{
      this.meta.meta_object_personal[6].params.bik = this.client_id.bik;
      this.meta.meta_object_personal[7].params.bik = this.client_id.bik;
    }

    this.meta.meta_object_info.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_entity.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_personal.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
  }
}
</script>

<style lang="scss">


</style>

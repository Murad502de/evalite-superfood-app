<template lang="pug">

  .add-service
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog Добавить услугу

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text height="48" outlined @click="createServiceHandler")
          span {{ submitBtnText }}

        v-btn.add.ml-4(text height="48" outlined @click="closeCreateEditForm")
          span закрыть

    v-container.object-info-container
      v-row
        v-col(cols="12")
          .object-info
            v-row.object-info-row-rate
              v-col(cols="12")
                .wrap-form
                  v-form(ref="form_part_0" v-model="valid" lazy-validation)
                    .form-part-single
                      .form-part-title Данные
                      FormBuilder(:meta="meta.meta_object_service" @updateFiled="updateFiled")
                      v-btn.btn-blue.mt-6(text :disabled="disabled" height="48" outlined  @click="createServiceHandler") {{ submitBtnText }}

</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";

export default {
  meta: {
    title: "Добавить услугу",
  },
  data() {
    return {
      valid: true,
      formValues: {},
      disabled: false,
      meta: {
        meta_object_service: [
          {
            type: 'FTypeSelectUIID',
            label: 'Категория',
            col: 12,
            name: 'object_category',
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
            label: 'Наименование',
            col: 12,
            name: 'object_vacancy',
            validation: ['required'],
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
          {
            type: 'FTypeSelect',
            label: 'Юнит',
            col: 4,
            name: 'object_unit',
            params: {
              options: [
                'шт', 'часы', 'палеты', 'пики', 'линии'
              ],
              item_text: 'name',
              label: 'Не выбрано'
            },
            validation: 'required',
            value: 'шт'
          },
          {
            type: 'FTypeText',
            label: 'Норматив',
            col: 4,
            name: 'object_norma',
            validation: [],
            value: '0'
          },
        ],
        meta_object_rate: [
          [
            {
              type: 'FTypeLabel',
              label: 'Введите новое значение',
              col: 12,
              name: 'object_new_rate',
              parent_array: 'meta_object_rate',
              params: {},
              validation: [],
              value: '',
            },
            {
              type: 'FTypeText',
              label: 'ставка',
              icon: '',
              col: 4,
              name: 'object_rate_rate_0',
              remove: false,
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                readonly: false
              },
            },
            {
              type: 'FTypeDate',
              label: 'действует с',
              col: 4,
              name: 'object_rate_date_0',
              validation: 'required',
              parent_array: 'meta_object_rate',
              value: '',
              params: {
                time: false
              },
            },
          ],
        ],
      },
    }
  },
  computed: {
    specializations() {
      return this.$store.getters['specializations/specializations'];
    },
    service_id() {
      return this.$store.getters['service_id/service_id'];
    },
    submitBtnText() {
      return 'создать услугу'
    },
    postBody() {
      let postBody = {
        "specialization": {
          "uuid": this.formValues.object_category
        },
        "name": this.formValues.object_vacancy,
        "description": this.formValues.object_desc,
        "standart": this.formValues.object_norma,
        "unit": this.formValues.object_unit,
      };

      console.log(postBody);
      return postBody;
    },

  },
  methods: {
    ...mapActions('specializations', ['fetchSpecializations',]),
    ...mapActions('service_id', ['createService',]),
    ...mapActions('service_id', ['putService',]),
    ...mapActions('service_id', ['fetchServiceId',]),


    closeCreateEditForm() {
     // this.$router.go(-1);
      this.$router.push({
        name: "objects-id",
        params: { ServiceId: "",  objectId: this.$route.params.objectId, activeTab: 0 },
      });
    },
    updateFiled(field, value) {
      this.formValues[field] = value;
      console.log(field, value);
    },
    createServiceHandler() {
      let formPart = 'form_part_0',
        object_uuid = this.$route.params.objectId;

      this.$refs[formPart].validate();

      this.$nextTick(() => {
        if (this.valid) {
          const newRequest = JSON.stringify(this.postBody);
          this.createService({newRequest: newRequest, object_uuid: object_uuid});
        }
      });
    },
  },
  async created() {

    await this.fetchSpecializations();
    this.meta.meta_object_service[0].params.options = this.specializations;

    this.$route.meta.title = 'Добавить услугу';

    this.meta.meta_object_service.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_object_rate.map(subarray => subarray.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    }));


  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi.page--objects-id-service {
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

}

.add-service {
  .action-row {
    background: #fff;

    .header-dialog {
      font-weight: 600;
      font-size: 20px;
    }
  }

  .object-info{
    padding: 24px 0;
  }

  .object-info-container {
    background: whitesmoke;
    padding: 24px;

    .object-info-header {
      font-size: 20px;
    }
  }


}


</style>

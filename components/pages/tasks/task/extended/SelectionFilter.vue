<template lang="pug">
  .selection-filter
    .wrap-form-filter
      v-form(ref="form")
        .header Подбор исполнителей
        .form-part.form-part-1
          div.mr-6(v-for="(filed, index) in meta.meta_filter_row_1" :key="index" :style="{maxWidth: filed.max_width + 'px' }")
            component(:is="filed.type"
              :name="filed.name"
              :icon="filed.icon"
              :params="filed.params"
              :validation="filed.validation"
              :value = "filed.value"
              @input="updateFiled(filed.name, $event, index, filed.parent_array)")

          div.mr-6(style="max-width: 230px;")
            FTypeButton.toggle_filter(
              name="show_filter"
              :params="buttonSubmitParams"
              @input="sendFilter()"
            )


        v-divider.my-6(v-show="isShowFilter")

        .form-part.form-part-2.align-end.mb-12(v-show="isShowFilter")
          div.mr-6(v-for="(filed, index) in meta.meta_filter_row_2" :key="index" :style="{maxWidth: filed.max_width + 'px' }")
            .form-part-label(:class="filed.type") {{ filed.label }}
            component(:is="filed.type"
              :name="filed.name"
              :icon="filed.icon"
              :params="filed.params"
              :validation="filed.validation"
              :value = "filed.value"
              @input="updateFiled(filed.name, $event, index, filed.parent_array)")

          a.clear-filter.mb-3(@click.prevent="clearFields")
            v-icon(size="20") mdi-trash-can-outline
            span сбросить все

        .wrap-toggle-filter
          v-divider.my-6
          FTypeButton.toggle_filter(
            name="show_filter"
            :params="buttonToggleFilterParams"
            @input="isShowFilter = $event"
          )


</template>

<script>
import Vue from "vue";

export default {
  props: {
    filter_professions: {
      type: Array,
      default() {
        return {}
      }
    },
    filter_rank: {
      type: Array,
      default() {
        return {}
      }
    },
    filter_active: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      formValues: {},
      meta: {
        meta_filter_row_1: [
          {
            type: 'FTypeText',
            label: '',
            col: 3,
            name: 'region',
            validation: [],
            value: '',
            icon: 'mdi-magnify',
            params: {
              placeholder: 'Выберите регион',
              clearable: true,
            },
            max_width: '240'
          },
          {
            type: 'FTypeSelect',
            label: 'Радиус',
            col: 1,
            name: 'radius',
            params: {
              options: [1, 3, 5, 10, 15],
              label: 'Не выбрано',
              readonly: false
            },
            validation: [],
            value: 1,
            max_width: '110'
          },
          {
            type: 'FTypeText',
            label: '',
            col: 3,
            name: 'lastname',
            validation: [],
            value: '',
            icon: 'mdi-magnify',
            params: {
              placeholder: 'Поиск по фамилии',
              clearable: true,
            },
            max_width: '240'
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 2,
            name: 'subscribe',
            params: {
              label: 'Подписан на объект',
            },
            validation: [],
            value: '',
            max_width: '178'
          },
          {
            type: 'FTypeCheckBox',
            label: '',
            col: 2,
            name: 'working',
            params: {
              label: 'Работал на объекте',
            },
            validation: [],
            value: '',
            max_width: '178'
          },
        ],
        meta_filter_row_2: [
          {
            type: 'FTypeSelectUIID',
            label: 'Профессия',
            col: 2,
            name: 'professions',
            params: {
              options: [
                {uuid: 1, name: 'Профессия 1'},
                {uuid: 2, name: 'Профессия 2'},
                {uuid: 3, name: 'Профессия 3'},
              ],
              item_text: 'name',
              item_value: 'stub',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: '',
            max_width: '264'
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Активность',
            col: 2,
            name: 'activity',
            params: {
              options: [
                {uuid: 1, name: 'Любой 1'},
                {uuid: 2, name: 'Любой 2'},
                {uuid: 3, name: 'Любой 3'},
              ],
              item_text: 'name',
              item_value: 'stub',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: '',
            max_width: '197'
          },
          {
            type: 'FTypeText',
            label: 'Ставка до',
            col: 1,
            name: 'rate',
            validation: [],
            value: '',
            max_width: '128'
          },
          {
            type: 'FTypeSelectUIID',
            label: 'Ранг',
            col: 1,
            name: 'rank',
            params: {
              options: [
                {uuid: 1, name: 'Ранг 1'},
                {uuid: 2, name: 'Ранг 2'},
                {uuid: 3, name: 'Ранг 3'},
              ],
              item_text: 'name',
              item_value: 'stub',
              label: 'Не выбрано',
              multiple: true,
              hideDetails: true
            },
            validation: [],
            value: '',
            max_width: '148'
          },
          {
            type: 'FTypeText',
            label: 'Благонадежность от',
            col: 2,
            name: 'trust',
            validation: [],
            value: '',
            max_width: '162'
          },
          {
            type: 'FTypeText',
            label: 'Возраст',
            col: 1,
            name: 'age_from',
            validation: [],
            value: '',
            max_width: '48'
          },
          {
            type: 'FTypeText',
            label: '',
            col: 1,
            name: 'age_to',
            validation: [],
            value: '',
            max_width: '48'
          },
        ]
      },
      buttonToggleFilterParams: {
        icon: 'mdi-chevron-double-down',
        icon_action: 'mdi-chevron-double-up',
        text: 'показать фильтры',
        text_action: 'скрыть фильтры',
        is_apply: true,
        style: 'grey-noborder'
      },
      buttonSubmitParams: {
        icon: '',
        icon_action: '',
        text: 'Найти',
        text_action: '',
        is_apply: true,
        style: 'filled'
      },
      isShowFilter: false,
    }
  },
  computed: {
    postBody() {


      let postBody = {
          "settings": {
            "filters": []
          },
        },
        list_params = ['region', 'radius', 'subscribe', 'working',];

      for (let i = 0; i < list_params.length; i++) {
        if (this.formValues[list_params[i]]) {
          postBody[list_params[i]] = this.formValues[list_params[i]];
        }
      }

      if(this.formValues.lastname){
        postBody.settings.value = this.formValues.lastname;
      }

      if(this.formValues.professions && this.formValues.professions.length > 0) {
        postBody.professions = JSON.stringify(this.formValues.professions);
      }


        if(this.formValues.rate){
        postBody.settings.filters.push(
          {
            "field": "rate",
            "type": "range",
            "value": { to: this.formValues.rate }
          }
        )
      }

      if(this.formValues.trust){
        postBody.settings.filters.push(
          {
            "field": "trust",
            "type": "range",
            "value": { from: this.formValues.trust }
          },
        )
      }

      if(this.formValues.age_from || this.formValues.age_to){
        postBody.settings.filters.push(
          {
            "field": "age",
            "type": "range",
            "value": { from: this.formValues.age_from, to: this.formValues.age_to }
          },
        )
      }

      if(this.formValues.activity  && this.formValues.activity.length > 0){
        postBody.settings.filters.push(
          {
            "field": "last_active",
            "type": "list",
            "value":  this.formValues.activity
          },
        )
      }

      if(this.formValues.rank && this.formValues.rank.length > 0){
        postBody.settings.filters.push(
          {
            "field": "rank",
            "type": "list",
            "value":  this.formValues.rank
          },
        )
      }

      return postBody;
    },
  },
  methods: {
    updateFiled(field, value) {
      this.formValues[field] = value;

      if (field == 'region'){
        if(value){
          this.meta.meta_filter_row_1[1].params.readonly = true;
          this.meta.meta_filter_row_1[1].value = null;
          this.formValues.radius = null;
        }else{
          this.meta.meta_filter_row_1[1].params.readonly = false;
          this.meta.meta_filter_row_1[1].value = 5;
          this.formValues.radius = 5;
        }
      }
      console.log(field, value);
    },
    sendFilter() {

      console.log(this.postBody);

     this.$emit('sendFilter', this.postBody);

    },
    clearFields() {
      this.$refs.form.reset();

      this.meta.meta_filter_row_1.map(f => {
        Vue.set(this.formValues, f.name, null);
      })
      this.meta.meta_filter_row_2.map(f => {
        Vue.set(this.formValues, f.name, null);
      })

    },
  },
  created() {

    this.meta.meta_filter_row_2[0].params.options = this.filter_professions;
    this.meta.meta_filter_row_2[1].params.options = this.filter_active;
    this.meta.meta_filter_row_2[3].params.options = this.filter_rank;

    this.meta.meta_filter_row_1.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
    this.meta.meta_filter_row_2.map(f => {
      Vue.set(this.formValues, f.name, f.value);
    })
  }
}

</script>

<style lang="scss">

.selection-filter {
  padding: 24px;
  background: #F7F7F7;

  .header {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 16px;
  }

  .wrap-form-filter {

    .form-part {
      display: flex;
      align-items: center;

      > div {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      .form-part-label {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 16px;
      }
    }

    .v-text-field {
      .v-input__control {
        background: #fff;
      }
    }

    .v-input--checkbox {
      font-weight: 600;
      margin-bottom: 10px;
    }


    .clear-filter {
      font-weight: 700;
      font-size: 14px;
      color: #7A91A9;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      box-shadow: none;
      padding: 0;

      .v-icon {
        margin-right: 9px;
      }

      &:hover {
        color: #263043;
      }
    }

    .wrap-toggle-filter {
      position: relative;

      .toggle_filter {
        position: absolute;
        top: -24px;
        background: #f7f7f7;
        left: 50%;
        margin-left: -110px;
      }
    }

  }

}

</style>

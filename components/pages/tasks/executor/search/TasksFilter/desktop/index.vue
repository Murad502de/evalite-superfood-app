<template lang="pug">
.rqtes-taskfilter
  .rqtes-taskfilter__row
    .select-single.rqtes-taskfilter__select-pofession.rqtes-taskfilter__row-item
      .select-single_titel {{ "Профессии" }}
      v-select(
        v-model="selectedProfessions"
        item-text="name"
        item-value="uuid"
        required
        single-line
        outlined
        filled
        multiple
        hide-details="true"
        :items="professions"
        :item-color="'#000000'"
        @change="selectProfession"
      )
        template(v-slot:selection="{ item, index }")
          span(v-if="index === 0") {{ item.name }}
          span(
            v-if="index === 1"
            class="grey--text text-caption"
          ) (+{{ selectedProfessions.length - 1 }} others)

    .select-single.rqtes-taskfilter__select--regions.rqtes-taskfilter__row-item
      .select-single_titel {{ "Район поиска" }}
      v-select(
        :value="''"
        :items="regions"
        item-text="name"
        item-value="uuid"
        required
        single-line
        outlined
        filled
        hide-details="true"
        :item-color="'#000000'"
        @change="selectRegion"
      )

    .select-single.rqtes-taskfilter__select-radius.rqtes-taskfilter__row-item
      .select-single_titel {{ "Ищу не далее" }}
      v-select(
        item-text="name"
        item-value="uuid"
        required
        single-line
        outlined
        filled
        hide-details="true"
        :item-color="'#000000'"
        :items="radii"
        @change="selectRadius"
      )

    .rqtes-taskfilter__confirm.rqtes-taskfilter__row-item
      v-btn(
        class="ma-2 rqtes-taskfilter__confirm-btn"
        color="info"
        style="margin: 0 !important; margin-top: 16px !important;"
        :loading="loader"
        :disabled="loader"
        @click="apply"
      ) показать заявки
        template(v-slot:loader)
          span.custom-loader
            v-icon(style="color: rgba(0,0,0,.26) !important") mdi-cached

  .rqtes-taskfilter__row
    dateInputWithTitle.rqtes-taskfilter__row-item.rqtes-taskfilter__date(
      title="Дата работ"
      value="01.01.2022"
      @date_change="setStartDate"
    )

    .rqtes-taskfilter__row-item
      .rqtes-taskfilter__input--title Зарплата от
      v-text-field.mix-input.rqtes-taskfilter__input--salary(
        solo
        @input="setSalary"
      )

    .rqtes-taskfilter__row-item.rqtes-taskfilter__checkbox
      v-checkbox.rqtes-taskfilter__checkbox-property(
        label="Без мед. книжки"
        color="info"
        :value="medicalBook"
        @change="setMedicalBook"
        hide-details
      )

    .rqtes-taskfilter__row-item.rqtes-taskfilter__checkbox
      v-checkbox.rqtes-taskfilter__checkbox-property(
        label="Без водительских прав"
        color="info"
        :value="driverLicense"
        @change="setDriverLicense"
        hide-details
      )
</template>

<script>
import selectSingle from '@/components/UI/selectSingle';
import Input from '@/components/UI/input';
import dateInputWithTitle from '@/components/UI/dateInputWithTitle';

export default {
  components: {
    selectSingle,
    Input,
    dateInputWithTitle,
  },
  props: {
    loader: {
      type: Boolean,
      default: false,
    },
    regions: {
      type: Array,
      default: () => ([]),
    },
    region: {
      type: Object,
      default: null,
    },
    professions: {
      type: Array,
      default: () => ([]),
    },
    radii: {
      type: Array,
      default: () => ([]),
    },
    radius: {
      type: Object,
      default: null,
    },
    salary: {
      type: String,
      default: "",
    },
    medicalBook: {
      type: Boolean,
      default: false,
    },
    driverLicense: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    selectProfession() {
      this.$emit(
        'selectProfessionDesktop',
        this.professions.filter((profession) => {
          if (this.selectedProfessions.includes(profession.uuid)) {
            return profession;
          }
        })
      );
    },
    selectRadius(payload = null) {
      if (payload) {
        this.$emit(
          'selectRadius',
          this.radii.find(
            radius => radius.uuid === payload
          )
        );
      }
    },
    setSalary(payload = null) {
      this.$emit('setSalary', payload);
    },
    setMedicalBook(payload = null) {
      this.$emit('setMedicalBook', payload);
    },
    setDriverLicense(payload = null) {
      this.$emit('setDriverLicense', payload);
    },
    selectRegion(payload = null) {
      if (payload) {
        this.$emit(
          'selectRegion',
          this.regions.find(
            region => region.uuid === payload
          )
        );
      }
    },
    setStartDate(payload) {
      this.$emit('setStartDate', payload);
    },
    apply() {
      this.$emit('apply');
    },
    reset() {
      this.$emit('reset');
    },

    /* HANDLERS */
    /* HELPERS */
  },

  data: () => ({
    selectedProfessions: [],
    textInputDefaultSettings: {
      type: 'text',
      value: '',
      hauptTitel: '',
      solo: true,
      hint: '',
    },
  }),
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.rqtes-taskfilter {
  box-sizing: border-box;
  padding: 32px 32px 38px 32px;
  background: #F6FBFF;
  border: 1px solid #D5DEE8;
  box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 14px;
  min-width: 334px;
  max-width: 1272px;

  &__input {
    &-search {
      width: 273px;
    }

    &--title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
      white-space: nowrap;
    }

    &--salary {
      width: 200px;

      .v-input__slot {
        box-shadow: none !important;
        border: 1px solid #E0E0E0 !important;
        margin: 0 !important;
      }

      .v-text-field__details {
        display: none !important;
      }
    }

    /* MIXINS */
    .v-text-field__details {
      display: none;
    }
  }

  &__select {
    &-salary {
      width: 116px;

      .select-single_titel {
        opacity: 0;
      }

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    &-pofession {
      width: 507px;

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    &-radius {
      width: 98px;

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    &--regions {
      width: 273px;

      .v-input__slot {
        height: 48px;
        margin: 0 !important;
        box-shadow: none !important;

        fieldset {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }
  }

  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 0 !important;
    margin-top: 24px !important;

    &:first-child {
      margin-top: 0 !important;
    }

    &-item {
      margin-left: 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  &__confirm {
    display: flex;
    align-items: flex-end;
    height: 84px;

    &-btn {
      height: 48px !important;
      width: 270px !important;
    }
  }

  &__checkbox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;

    &-property {
      margin-top: 30px;
    }
  }

  &__salary {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-left: 20px;

    &-item {
      margin-left: 20px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .select-single {
    .select-single_titel {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
      white-space: nowrap;
    }
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 800px) {
    &__input {
      &-search {
        width: 100%;
      }

      /* MIXINS */
      .v-text-field__details {
        display: none;
      }
    }

    &__select {
      &-salary {
        width: 100%;

        .select-single_titel {
          opacity: 0;
        }

        .v-input__slot {
          height: 48px;
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }

      &-pofession {
        width: 100%;

        .v-input__slot {
          height: 48px;
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }

      &-radius {
        width: 100%;

        .v-input__slot {
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }

      &--regions {
        width: 100%;

        .v-input__slot {
          margin: 0 !important;
          box-shadow: none !important;

          fieldset {
            background: #FFFFFF;
            border: 1px solid #E2E4E5;
            box-sizing: border-box;
            border-radius: 4px !important;
          }
        }
      }
    }

    &__row {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      margin: 0 !important;
      margin-top: 24px !important;
      align-items: flex-start;

      &:first-child {
        margin-top: 0 !important;
      }

      &-item {
        margin-left: 0;
      }
    }

    &__confirm {
      display: flex;
      align-items: flex-end;
      height: auto;
      width: 100%;

      &-btn {
        height: 48px !important;
        width: 100% !important;
      }
    }

    &__checkbox {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      align-content: center;

      &-property {
        margin-top: 30px;
      }
    }

    &__salary {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      margin-left: 0;
      width: 100%;

      &-item {
        margin-left: 20px;
        width: 50%;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    &__date {
      width: 100%;
    }
  }
}
</style>

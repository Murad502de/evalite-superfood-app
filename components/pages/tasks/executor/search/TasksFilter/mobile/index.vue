<template lang="pug">
.m-task-search-filter
  .m-task-search-filter--component(v-if="isFilterShowed")
    .m-task-search-filter--component__header
      .m-task-search-filter--component__header--title Фильтр
      .m-task-search-filter--component__header--clear-all(@click="reset") Очистить все

    .m-task-search-filter__filter-content
      v-form(ref="form" v-model="valid" lazy-validation)
        v-expansion-panels(accordion multiple v-model="panel")
          v-expansion-panel
            v-expansion-panel-header Профессии
            .m-task-search-filter__filter-content--items
              v-expansion-panel-content.m-task-search-filter__filter-content--item(
                v-for="profession in professions"
                :key="profession.uuid"
              )
                v-checkbox(
                  :label='profession.name'
                  v-model="profession.selected"
                  @change="selectProfession(profession)"
                )

          v-expansion-panel
            v-expansion-panel-header Район поиска
            .m-task-search-filter__filter-content--items
              v-expansion-panel-content.m-task-search-filter__filter-content--item
                v-select.m-task-search-filter__radius(
                  :value="region"
                  :items="regions"
                  :item-color="'#FFFFFF'"
                  item-text="name"
                  item-value="uuid"
                  required
                  single-line
                  outlined
                  filled
                  hide-details="true"
                  @change="selectRegion"
                )

          v-expansion-panel
            v-expansion-panel-header Ищу не далее
            .m-task-search-filter__filter-content--items
              v-expansion-panel-content.m-task-search-filter__filter-content--item
                v-select.m-task-search-filter__radius(
                  :value="radius"
                  :items="radii"
                  :item-color="'#FFFFFF'"
                  item-text="name"
                  item-value="uuid"
                  required
                  single-line
                  outlined
                  filled
                  hide-details="true"
                  @change="selectRadius"
                )

          v-expansion-panel
            v-expansion-panel-header Зарплата
            .m-task-search-filter__filter-content--items
              v-expansion-panel-content.m-task-search-filter__filter-content--item
                v-text-field.m-task-search-filter__salary(
                  solo
                  :value="salary"
                  @input="setSalary"
                )

      .m-task-search-filter__filter-content--items.m-task-search-filter__checkbox
        v-checkbox.m-task-search-filter__filter-content--item.m-task-search-filter__checkbox-property(
          label="Без мед. книжки"
          color="info"
          :value="medicalBook"
          @change="setMedicalBook"
          hide-details
        )

      .m-task-search-filter__filter-content--items.m-task-search-filter__checkbox
        v-checkbox.m-task-search-filter__filter-content--item.m-task-search-filter__checkbox-property(
          label="Без водительских прав"
          color="info"
          :value="driverLicense"
          @change="setDriverLicense"
          hide-details
        )

    .m-task-search-filter--component__actions
      v-btn.m-task-search-filter--component__cancel(
        elevation="0"
        color="#FFFFFF"
        @click="hideFilter"
      )
        .m-task-search-filter--component__cancel--title отмена

      v-btn.m-task-search-filter--component__confirm(
        elevation="0"
        :loading="loader"
        :disabled="loader"
        color="#0082DE"
        @click="apply"
      )
        .m-task-search-filter--component__confirm--title применить
        template(v-slot:loader)
          span.custom-loader
            v-icon(style="color: rgba(0,0,0,.26) !important") mdi-cached

  .m-task-search-filter--bbar(v-else)
    v-btn.m-task-search-filter--bbar__container(
      @click="showFilter"
    )
      svg.m-task-search-filter--bbar__container--icon(
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      )
        path(
          d="M14.5 1H0.5C0.2 1 0 0.8 0 0.5C0 0.2 0.2 0 0.5 0H14.5C14.8 0 15 0.2 15 0.5C15 0.8 14.8 1 14.5 1ZM12.5 5.5C12.5 5.2 12.3 5 12 5H3C2.7 5 2.5 5.2 2.5 5.5C2.5 5.8 2.7 6 3 6H12C12.3 6 12.5 5.8 12.5 5.5ZM10 10.5C10 10.2 9.8 10 9.5 10H5.5C5.2 10 5 10.2 5 10.5C5 10.8 5.2 11 5.5 11H9.5C9.8 11 10 10.8 10 10.5Z"
          fill="white"
        )

      v-badge.m-task-search-filter--bbar__container--badge(
        v-show="isFilterActive()"
        dot
        color="#EB4D3D"
      )
        .m-task-search-filter--bbar__container--title Фильтры

      .m-task-search-filter--bbar__container--title(v-show="!isFilterActive()") Фильтры
</template>

<script>
export default {
  components: {},
  props: {
    loader: {
      type: Boolean,
      default: false,
    },
    isFilterShowed: {
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
    /* HANDLERS */
    showFilter() {
      this.$emit('showFilter');
    },
    hideFilter() {
      this.$emit('hideFilter');
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
    selectProfession(payload = null) {
      if (payload) this.$emit('selectProfession', payload);
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
    setSalary(payload = null) {
      this.$emit('setSalary', payload);
    },
    setMedicalBook(payload = null) {
      this.$emit('setMedicalBook', payload);
    },
    setDriverLicense(payload = null) {
      this.$emit('setDriverLicense', payload);
    },
    apply() {
      this.$emit('apply');
    },
    reset() {
      this.$emit('reset');
    },

    /* HELPERS */
    isFilterActive() {
      return this.region ||
        this.radius ||
        this.salary ||
        this.medicalBook ||
        this.driverLicense ||
        this.professions.filter(profession => profession.selected).length;
    }
  },

  data() {
    return {}
  },
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.m-task-search-filter {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;

  &--component {
    position: fixed;
    top: 190px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E2E4E5;
    border-radius: 10px;
    font-family: 'Source Sans Pro';
    font-style: normal;
    max-width: 345px;
    flex: 1;
    z-index: 1;
    max-height: calc(100% - 280px);
    overflow: scroll;

    &__header {
      padding: 24px 24px 18px 14px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: space-between;
      align-items: center;

      &--title {
        font-weight: 700;
        font-size: 18px;
        line-height: 125%;
        color: #263043;
      }

      &--clear-all {
        font-weight: 600;
        font-size: 14px;
        line-height: 125%;
        color: #0082DE;
      }
    }

    &__actions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      padding: 24px 15px 20px 24px;
    }

    &__cancel {
      width: 117px;
      border: 1px solid #E2E4E5 !important;

      &--title {
        font-weight: 700;
        font-size: 14px;
        line-height: 125%;
        text-transform: uppercase;
        color: #263043;
      }
    }

    &__confirm {
      width: 175px;
      margin-left: 12px;

      &--title {
        font-weight: 700;
        font-size: 14px;
        line-height: 125%;
        text-transform: uppercase;
        color: #FFFFFF;
      }
    }
  }

  &--bbar {
    position: fixed;
    bottom: 99px;
    width: 100%;
    z-index: 100;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    &__container {
      padding: 16px 24px !important;
      background: #0082DE !important;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      height: auto !important;

      &--badge {
        .v-badge__badge {
          width: 11px;
          height: 11px;
          inset: auto auto calc(100% - 8px) calc(100% - 2px) !important;
        }
      }

      &--title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: #FFFFFF;
        margin-left: 8px;
      }
    }
  }

  &__filter-content {
    .v-expansion-panel-header {
      height: 52px;
      min-height: 52px;
      font-weight: 600;
    }

    .v-expansion-panel-content {
      background: #F7F7F7;

      .v-expansion-panel-content__wrap {
        padding: 0 !important;
      }
    }

    .v-expansion-panel::before {
      box-shadow: none;
    }

    &--items {
      max-height: 200px;
      overflow: scroll;
    }

    &--item {
      padding: 16px 24px 0px;

      &:last-child {
        padding: 16px 24px;
      }

      .v-input--checkbox {
        margin: 0 !important;
        padding: 0 !important;

        .v-input__slot {
          margin: 0 !important;
        }

        .v-messages {
          display: none;
        }
      }
    }
  }

  &__checkbox {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;

    &-property {
      margin: 0 !important;
    }
  }

  &__radius {
    background: #FFFFFF !important;
  }

  &__salary {
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
}

.v-menu__content {
  z-index: 100 !important;
}
</style>

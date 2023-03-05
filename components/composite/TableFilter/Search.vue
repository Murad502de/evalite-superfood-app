<template>
  <div class="wrap-search-filter">
    <v-text-field
      v-model="newSearchText"
      prepend-inner-icon="mdi-magnify"
      label=""
      single-line
      outlined
      @input="$emit('updateSearchText', newSearchText)"
      hide-details="true"
      full-width
      @blur="$emit('blurSearch')"
      @focus="$emit('focusSearch')"
      clearable
    ></v-text-field>
  </div>

</template>

<script>
export default {
  props: ['searchText'],
  data() {
    return {
      newSearchText: '',
    }
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi {
  .wrap-search-filter {
    flex: 1;
    max-width: 44px;

    .v-input {

      fieldset {
        border: none;
        border-radius: 30px;
      }

      .v-input__slot {
        border-radius: 30px;

      }

      .v-label {
        top: 0;
        display: flex;
        align-items: center;
        height: 100%;
      }

      &:not(.v-input--is-focused ) {
        .v-input__slot {

          .v-input__icon--clear {
            display: none;
          }
        }
      }

      &.v-input--is-focused {
        .v-input__slot {
          background: #F1F1F1;
        }

      }
    }

    .v-text-field--full-width .v-input__prepend-outer,
    .v-text-field--full-width .v-input__prepend-inner,
    .v-text-field--enclosed .v-input__prepend-outer,
    .v-text-field--enclosed .v-input__prepend-inner {
      margin-top: 10px;
    }

    .v-icon {
      color: #7A91A9;
    }

  }

  .filter-row {
    &.search-is-focus {

      .wrap-search-filter {
        max-width: 100%;
      }

    }

  }
}

</style>

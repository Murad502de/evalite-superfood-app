<template>
  <div class="wrap-search">
    <v-text-field
      v-model="newSearchText"
      prepend-inner-icon="mdi-magnify"
      label="Найти"
      single-line
      outlined
      @input="$emit('updateSearchText', newSearchText)"
      hide-details="true"
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
  .wrap-search {
    .v-input {
      max-width: 264px;

      fieldset {
        border-radius: 50px;
      }

      .v-label {
        top: 0;
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
    .v-text-field--full-width .v-input__prepend-outer,
    .v-text-field--full-width .v-input__prepend-inner,
    .v-text-field--enclosed .v-input__prepend-outer,
    .v-text-field--enclosed .v-input__prepend-inner {
      margin-top: 10px;
    }
  }
}

</style>

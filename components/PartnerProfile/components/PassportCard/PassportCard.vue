<template lang="pug">
AppCard.passport-card
  .passport-card__header
    .passport-card__title Паспорт
    .passport-card__title-edit(@click="edit") Изменить

  v-divider.passport-card__divider

  .passport-card__main
    .passport-card__field(v-for="(field, index) in fields", :key="index")
      .passport-card__field-title {{ field.title }}
      .passport-card__field-value {{ field.value }}
</template>

<script src="./PassportCard.js" />
<style lang="scss" src="./PassportCard.scss" />

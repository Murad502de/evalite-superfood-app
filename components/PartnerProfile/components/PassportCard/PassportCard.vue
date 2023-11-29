<template lang="pug">
AppCard.passport-card
  .passport-card__header
    .passport-card__title Паспорт
    .passport-card__title-edit(@click="edit") Изменить
  v-divider.passport-card__divider
</template>

<script src="./PassportCard.js" />
<style lang="scss" src="./PassportCard.scss" />

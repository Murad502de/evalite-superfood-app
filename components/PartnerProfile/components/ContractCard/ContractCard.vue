<template lang="pug">
AppCard.contract-card
  .contract-card__header
    .contract-card__title Договор
    .contract-card__title-edit(@click="edit") Изменить
  v-divider
</template>

<script src="./ContractCard.js" />
<style lang="scss" src="./ContractCard.scss" />

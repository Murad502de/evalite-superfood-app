<template lang="pug">
AppCard.payment-details-card
  .payment-details-card__header
    .payment-details-card__title Платежные данные
    .payment-details-card__title-edit(@click="edit") Изменить
  v-divider.payment-details-card__divider
</template>

<script src="./PaymentDetailsCard.js" />
<style lang="scss" src="./PaymentDetailsCard.scss" />
